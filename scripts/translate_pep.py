import os
import re
import time
import traceback
from datetime import datetime
from typing import List, Dict, Any, Set
from urllib.parse import urljoin
from tenacity import retry, stop_after_attempt, wait_random, retry_if_exception_type
import requests
from bs4 import BeautifulSoup
from google import genai
from google.genai.types import GenerateContentConfig


# --- API 키 및 클라이언트 설정 ---
# 실행 전 환경변수 `GEMINI_API_KEY`를 설정해주세요.
if "GEMINI_API_KEY" not in os.environ:
    raise ValueError("GEMINI_API_KEY 환경변수가 설정되지 않았습니다.")

# API와 상호작용하기 위한 클라이언트 인스턴스 생성
client = genai.Client()

# --- 템플릿 및 프롬프트 정의 ---
# Jekyll 포스트 템플릿
CONTENT_TEMPLATE = """
---
title: "[{status}] PEP {pep_number} - {title}"
excerpt: "Python Enhancement Proposal {pep_number}: '{title}'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/{pep_number}/
toc: true
toc_sticky: true
date: {date_str}+0900
last_modified_at: {date_str}+0900
published: true
---
> **원문 링크:** [PEP {pep_number} - {title}]({link})
>
> **상태:** {status} | **유형:** {type} | **작성일:** {created}

{content}

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.
"""

# PEP 번역 프롬프트 (URL이 프롬프트 내에 제공될 것을 명시)
PEP_TRANSLATION_PROMPT = """
당신은 숙련된 Python 개발자이자 전문 기술 번역가입니다.
이어지는 메시지에 포함된 Python Enhancement Proposal (PEP) 문서 URL의 내용을 바탕으로, 한국어 사용자가 이해하기 쉽게 번역해주세요.

## 목표
Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할 수 있도록 돕는 것입니다.

## 번역 및 작성 지침
1. **전문성 유지:** Python 생태계에서 통용되는 전문 용어를 정확하게 사용하세요.
2. **용어 처리:**
   - 널리 쓰이는 한국어 용어가 있다면 사용합니다.
   - 모호하거나 한국어보다 영어가 더 익숙한 용어는 영어 원문을 그대로 사용하거나 병기합니다. (예: `List Comprehension`, `Generator (제너레이터)`)
   - 코드 내의 키워드(예: `async`, `await`, `class`, `def`)나 변수명은 절대 번역하지 마세요.
3. **가독성:** 마크다운을 적극 활용하여 구조적으로 정리해주세요.
4. **번역 정확성:** 번역 정확성을 보장하기 위해 원문 내용을 빠짐없이 마크다운 형태로 번역해주세요.
"""


@retry(
    stop=stop_after_attempt(20),
    wait=wait_random(min=1, max=2),
    retry=retry_if_exception_type(Exception),
    reraise=True,
)
def fetch_pep_metadata(pep_url: str) -> Dict[str, Any]:
    """파일 생성을 위해 PEP의 제목, 번호 등 메타데이터만 스크래핑합니다."""
    print(f"Fetching metadata from: {pep_url}...")
    # ... (이전 코드와 동일, 변경 없음)
    response = requests.get(pep_url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    pep_number_match = re.search(r"pep-(\d{4})", pep_url)
    pep_number = int(pep_number_match.group(1)) if pep_number_match else 0
    title_tag = soup.find("h1", class_="page-title")
    full_title = title_tag.get_text(strip=True) if title_tag else f"PEP {pep_number}"
    parts = full_title.split("–", 1)
    title = parts[1].strip() if len(parts) > 1 else full_title
    header_info = {}
    dl = soup.find("dl", class_="rfc2822 field-list simple")
    if dl:
        for dt, dd in zip(dl.find_all("dt"), dl.find_all("dd")):
            key = dt.get_text(strip=True).replace(":", "")
            value = dd.get_text(strip=True)
            header_info[key] = value
    return {
        "pep_number": pep_number,
        "url": pep_url,
        "title": title,
        "header": header_info,
    }


@retry(
    stop=stop_after_attempt(20),
    wait=wait_random(min=1, max=2),
    retry=retry_if_exception_type(Exception),
    reraise=True,
)
def translate_pep_with_url_context_tool(pep_url: str, model_name: str) -> str:
    """공식 문서의 'url_context' 도구를 사용하여 PEP 내용을 번역 및 정리합니다."""

    # 1. 사용할 도구를 정의합니다.
    tools = [{"url_context": {}}]

    # 2. 도구 설정을 포함하는 GenerateContentConfig 객체를 생성합니다.
    config = GenerateContentConfig(tools=tools)

    # 3. 프롬프트와 번역할 URL을 하나의 문자열로 결합합니다.
    # 모델은 이 문자열 내의 URL을 인식하고 'url_context' 도구를 사용하여 콘텐츠를 가져옵니다.
    full_prompt_with_url = (
        f"{PEP_TRANSLATION_PROMPT}\n\n"
        f"--- 아래 URL의 내용을 번역하고 정리해주세요 ---\n"
        f"{pep_url}"
    )

    print(f"Translating with url_context tool: {pep_url} using {model_name}...")
    try:
        # 4. client.models.generate_content를 사용하여 API를 호출합니다.
        response = client.models.generate_content(
            model=model_name,
            contents=full_prompt_with_url,
            config=config,
        )

        # 선택 사항: 모델이 어떤 URL을 참조했는지 확인
        # print(response.candidates[0].url_context_metadata)

        return response.text
    except Exception as e:
        print(f"Gemini API call failed for URL {pep_url}: {e}")
        return f"## 번역 실패\n\nGemini API 호출 중 오류가 발생했습니다: {e}"


def sanitize_filename(text: str) -> str:
    """파일 이름으로 사용할 수 있도록 문자열을 정리합니다."""
    sanitized = re.sub(r"[^\w\s\-.]", "", text)
    sanitized = re.sub(r"\s+", "_", sanitized)
    return sanitized.strip("_ ")


def save_post(result: Dict[str, Any]) -> None:
    """번역된 결과를 Jekyll 포스트 파일로 저장합니다."""
    # ... (이전 코드와 동일, 변경 없음)
    date_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    today = datetime.now()
    if not os.path.exists("_posts"):
        os.makedirs("_posts")
    pep_num = result["pep_number"]
    header = result["header"]
    content = CONTENT_TEMPLATE.format(
        pep_number=pep_num,
        title=result["title"],
        date_str=date_str,
        link=result["url"],
        status=header.get("Status", "N/A"),
        type=header.get("Type", "N/A"),
        created=header.get("Created", "N/A"),
        content=result["translated_content"],
    ).strip()
    safe_title = sanitize_filename(result["title"]).lower()
    file_name = f"{today.year}-{today.month:02d}-{today.day:02d}-pep-{pep_num:04d}-{safe_title}.md"
    file_path = os.path.join("_posts", file_name)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved: {file_path}")


def main() -> None:
    pep_urls = [
        "https://peps.python.org/pep-0326/",  # A Case for Top and Bottom Values
        "https://peps.python.org/pep-0329/",  # Treating Builtins as Constants in the Standard Library
        "https://peps.python.org/pep-0335/",  # Overloadable Boolean Operators
        "https://peps.python.org/pep-0343/",  # The “with” Statement
        "https://peps.python.org/pep-0355/",  # Path - Object oriented filesystem paths
        "https://peps.python.org/pep-0366/",  # Main module explicit relative imports
        "https://peps.python.org/pep-0367/",  # New Super
        "https://peps.python.org/pep-0368/",  # Standard image protocol and class
        "https://peps.python.org/pep-0369/",  # Post import hooks
        "https://peps.python.org/pep-0370/",  # Per user site-packages directory
        "https://peps.python.org/pep-0371/",  # Addition of the multiprocessing package to the standard library
        "https://peps.python.org/pep-0372/",  # Adding an ordered dictionary to collections
        "https://peps.python.org/pep-0373/",  # Python 2.7 Release Schedule
        "https://peps.python.org/pep-0374/",  # Choosing a distributed VCS for the Python project
        "https://peps.python.org/pep-0375/",  # Python 3.1 Release Schedule
        "https://peps.python.org/pep-0376/",  # Database of Installed Python Distributions
        "https://peps.python.org/pep-0377/",  # Allow __enter__() methods to skip the statement body
        "https://peps.python.org/pep-0378/",  # Format Specifier for Thousands Separator
        "https://peps.python.org/pep-0379/",  # Adding an Assignment Expression
        "https://peps.python.org/pep-0380/",  # Syntax for Delegating to a Subgenerator
        "https://peps.python.org/pep-0381/",  # Mirroring infrastructure for PyPI
        "https://peps.python.org/pep-0382/",  # Namespace Packages
        "https://peps.python.org/pep-0383/",  # Non-decodable Bytes in System Character Interfaces
        "https://peps.python.org/pep-0384/",  # Defining a Stable ABI
        "https://peps.python.org/pep-0385/",  # Migrating from Subversion to Mercurial
        "https://peps.python.org/pep-0386/",  # Changing the version comparison module in Distutils
        "https://peps.python.org/pep-0387/",  # Backwards Compatibility Policy
        "https://peps.python.org/pep-0389/",  # argparse - New Command Line Parsing Module
        "https://peps.python.org/pep-0390/",  # Static metadata for Distutils
        "https://peps.python.org/pep-0391/",  # Dictionary-Based Configuration For Logging
        "https://peps.python.org/pep-0392/",  # Python 3.2 Release Schedule
        "https://peps.python.org/pep-0393/",  # Flexible String Representation
        "https://peps.python.org/pep-0394/",  # The “python” Command on Unix-Like Systems
        "https://peps.python.org/pep-0395/",  # Qualified Names for Modules
        "https://peps.python.org/pep-0396/",  # Module Version Numbers
        "https://peps.python.org/pep-0397/",  # Python launcher for Windows
        "https://peps.python.org/pep-0398/",  # Python 3.3 Release Schedule
        "https://peps.python.org/pep-0399/",  # Pure Python/C Accelerator Module Compatibility Requirements
        "https://peps.python.org/pep-0400/",  # Deprecate codecs.StreamReader and codecs.StreamWriter
        "https://peps.python.org/pep-0401/",  # BDFL Retirement
        "https://peps.python.org/pep-0402/",  # Simplified Package Layout and Partitioning
        "https://peps.python.org/pep-0403/",  # General purpose decorator clause (aka “@in” clause)
        "https://peps.python.org/pep-0404/",  # Python 2.8 Un-release Schedule
        "https://peps.python.org/pep-0405/",  # Python Virtual Environments
        "https://peps.python.org/pep-0406/",  # Improved Encapsulation of Import State
        "https://peps.python.org/pep-0407/",  # New release cycle and introducing long-term support versions
        "https://peps.python.org/pep-0408/",  # Standard library __preview__ package
        "https://peps.python.org/pep-0409/",  # Suppressing exception context
        "https://peps.python.org/pep-0410/",  # Use decimal.Decimal type for timestamps
        "https://peps.python.org/pep-0411/",  # Provisional packages in the Python standard library
        "https://peps.python.org/pep-0412/",  # Key-Sharing Dictionary
        "https://peps.python.org/pep-0413/",  # Faster evolution of the Python Standard Library
        "https://peps.python.org/pep-0414/",  # Explicit Unicode Literal for Python 3.3
        "https://peps.python.org/pep-0415/",  # Implement context suppression with exception attributes
        "https://peps.python.org/pep-0416/",  # Add a frozendict builtin type
        "https://peps.python.org/pep-0417/",  # Including mock in the Standard Library
        "https://peps.python.org/pep-0418/",  # Add monotonic time, performance counter, and process time functions
        "https://peps.python.org/pep-0419/",  # Protecting cleanup statements from interruptions
        "https://peps.python.org/pep-0420/",  # Implicit Namespace Packages
        "https://peps.python.org/pep-0421/",  # Adding sys.implementation
        "https://peps.python.org/pep-0422/",  # Simpler customisation of class creation
        "https://peps.python.org/pep-0423/",  # Naming conventions and recipes related to packaging
        "https://peps.python.org/pep-0424/",  # A method for exposing a length hint
        "https://peps.python.org/pep-0425/",  # Compatibility Tags for Built Distributions
        "https://peps.python.org/pep-0426/",  # Metadata for Python Software Packages 2.0
        "https://peps.python.org/pep-0427/",  # The Wheel Binary Package Format 1.0
        "https://peps.python.org/pep-0428/",  # The pathlib module – object-oriented filesystem paths
        "https://peps.python.org/pep-0429/",  # Python 3.4 Release Schedule
        "https://peps.python.org/pep-0430/",  # Migrating to Python 3 as the default online documentation
        "https://peps.python.org/pep-0431/",  # Time zone support improvements
        "https://peps.python.org/pep-0432/",  # Restructuring the CPython startup sequence
        "https://peps.python.org/pep-0433/",  # Easier suppression of file descriptor inheritance
        "https://peps.python.org/pep-0434/",  # IDLE Enhancement Exception for All Branches
        "https://peps.python.org/pep-0435/",  # Adding an Enum type to the Python standard library
        "https://peps.python.org/pep-0436/",  # The Argument Clinic DSL
        "https://peps.python.org/pep-0437/",  # A DSL for specifying signatures, annotations and argument converters
        "https://peps.python.org/pep-0438/",  # Transitioning to release-file hosting on PyPI
        "https://peps.python.org/pep-0439/",  # Inclusion of implicit pip bootstrap in Python installation
        "https://peps.python.org/pep-0440/",  # Version Identification and Dependency Specification
        "https://peps.python.org/pep-0441/",  # Improving Python ZIP Application Support
        "https://peps.python.org/pep-0442/",  # Safe object finalization
        "https://peps.python.org/pep-0443/",  # Single-dispatch generic functions
        "https://peps.python.org/pep-0444/",  # Python Web3 Interface
        "https://peps.python.org/pep-0445/",  # Add new APIs to customize Python memory allocators
        "https://peps.python.org/pep-0446/",  # Make newly created file descriptors non-inheritable
        "https://peps.python.org/pep-0447/",  # Add __getdescriptor__ method to metaclass
        "https://peps.python.org/pep-0448/",  # Additional Unpacking Generalizations
        "https://peps.python.org/pep-0449/",  # Removal of the PyPI Mirror Auto Discovery and Naming Scheme
        "https://peps.python.org/pep-0450/",  # Adding A Statistics Module To The Standard Library
        "https://peps.python.org/pep-0451/",  # A ModuleSpec Type for the Import System
        "https://peps.python.org/pep-0452/",  # API for Cryptographic Hash Functions v2.0
        "https://peps.python.org/pep-0453/",  # Explicit bootstrapping of pip in Python installations
        "https://peps.python.org/pep-0454/",  # Add a new tracemalloc module to trace Python memory allocations
        "https://peps.python.org/pep-0455/",  # Adding a key-transforming dictionary to collections
        "https://peps.python.org/pep-0456/",  # Secure and interchangeable hash algorithm
        "https://peps.python.org/pep-0457/",  # Notation For Positional-Only Parameters
        "https://peps.python.org/pep-0458/",  # Secure PyPI downloads with signed repository metadata
        "https://peps.python.org/pep-0459/",  # Standard Metadata Extensions for Python Software Packages
        "https://peps.python.org/pep-0460/",  # Add binary interpolation and formatting
        "https://peps.python.org/pep-0461/",  # Adding % formatting to bytes and bytearray
        "https://peps.python.org/pep-0462/",  # Core development workflow automation for CPython
        "https://peps.python.org/pep-0463/",  # Exception-catching expressions
        "https://peps.python.org/pep-0464/",  # Removal of the PyPI Mirror Authenticity API
        "https://peps.python.org/pep-0465/",  # A dedicated infix operator for matrix multiplication
        "https://peps.python.org/pep-0466/",  # Network Security Enhancements for Python 2.7.x
        "https://peps.python.org/pep-0467/",  # Minor API improvements for binary sequences
        "https://peps.python.org/pep-0468/",  # Preserving the order of **kwargs in a function.
        "https://peps.python.org/pep-0469/",  # Migration of dict iteration code to Python 3
        "https://peps.python.org/pep-0470/",  # Removing External Hosting Support on PyPI
        "https://peps.python.org/pep-0471/",  # os.scandir() function – a better and faster directory iterator
        "https://peps.python.org/pep-0472/",  # Support for indexing with keyword arguments
        "https://peps.python.org/pep-0473/",  # Adding structured data to built-in exceptions
        "https://peps.python.org/pep-0474/",  # Creating forge.python.org
        "https://peps.python.org/pep-0475/",  # Retry system calls failing with EINTR
        "https://peps.python.org/pep-0476/",  # Enabling certificate verification by default for stdlib http clients
        "https://peps.python.org/pep-0477/",  # Backport ensurepip (PEP 453) to Python 2.7
        "https://peps.python.org/pep-0478/",  # Python 3.5 Release Schedule
        "https://peps.python.org/pep-0479/",  # Change StopIteration handling inside generators
        "https://peps.python.org/pep-0480/",  # Surviving a Compromise of PyPI: End-to-end signing of packages
        "https://peps.python.org/pep-0481/",  # Migrate CPython to Git, Github, and Phabricator
        "https://peps.python.org/pep-0482/",  # Literature Overview for Type Hints
        "https://peps.python.org/pep-0483/",  # The Theory of Type Hints
        "https://peps.python.org/pep-0484/",  # Type Hints
        "https://peps.python.org/pep-0485/",  # A Function for testing approximate equality
        "https://peps.python.org/pep-0486/",  # Make the Python Launcher aware of virtual environments
        "https://peps.python.org/pep-0487/",  # Simpler customisation of class creation
        "https://peps.python.org/pep-0488/",  # Elimination of PYO files
        "https://peps.python.org/pep-0489/",  # Multi-phase extension module initialization
        "https://peps.python.org/pep-0490/",  # Chain exceptions at C level
        "https://peps.python.org/pep-0491/",  # The Wheel Binary Package Format 1.9
        "https://peps.python.org/pep-0492/",  # Coroutines with async and await syntax
        "https://peps.python.org/pep-0493/",  # HTTPS verification migration tools for Python 2.7
        "https://peps.python.org/pep-0494/",  # Python 3.6 Release Schedule
        "https://peps.python.org/pep-0495/",  # Local Time Disambiguation
        "https://peps.python.org/pep-0496/",  # Environment Markers
        "https://peps.python.org/pep-0497/",  # A standard mechanism for backward compatibility
        "https://peps.python.org/pep-0498/",  # Literal String Interpolation
        "https://peps.python.org/pep-0499/",  # python -m foo should also bind ‘foo’ in sys.modules
        "https://peps.python.org/pep-0500/",  # A protocol for delegating datetime methods to their tzinfo implementations
        "https://peps.python.org/pep-0501/",  # General purpose template literal strings
        "https://peps.python.org/pep-0502/",  # String Interpolation - Extended Discussion
        "https://peps.python.org/pep-0503/",  # Simple Repository API
        "https://peps.python.org/pep-0504/",  # Using the System RNG by default
        "https://peps.python.org/pep-0505/",  # None-aware operators
        "https://peps.python.org/pep-0506/",  # Adding A Secrets Module To The Standard Library
        "https://peps.python.org/pep-0507/",  # Migrate CPython to Git and GitLab
        "https://peps.python.org/pep-0508/",  # Dependency specification for Python Software Packages
        "https://peps.python.org/pep-0509/",  # Add a private version to dict
        "https://peps.python.org/pep-0510/",  # Specialize functions with guards
        "https://peps.python.org/pep-0511/",  # API for code transformers
        "https://peps.python.org/pep-0512/",  # Migrating from hg.python.org to GitHub
        "https://peps.python.org/pep-0513/",  # A Platform Tag for Portable Linux Built Distributions
        "https://peps.python.org/pep-0514/",  # Python registration in the Windows registry
        "https://peps.python.org/pep-0515/",  # Underscores in Numeric Literals
        "https://peps.python.org/pep-0516/",  # Build system abstraction for pip/conda etc
        "https://peps.python.org/pep-0517/",  # A build-system independent format for source trees
        "https://peps.python.org/pep-0518/",  # Specifying Minimum Build System Requirements for Python Projects
        "https://peps.python.org/pep-0519/",  # Adding a file system path protocol
        "https://peps.python.org/pep-0520/",  # Preserving Class Attribute Definition Order
        "https://peps.python.org/pep-0521/",  # Managing global context via ‘with’ blocks in generators and coroutines
        "https://peps.python.org/pep-0522/",  # Allow BlockingIOError in security sensitive APIs
        "https://peps.python.org/pep-0523/",  # Adding a frame evaluation API to CPython
        "https://peps.python.org/pep-0524/",  # Make os.urandom() blocking on Linux
        "https://peps.python.org/pep-0525/",  # Asynchronous Generators
        "https://peps.python.org/pep-0526/",  # Syntax for Variable Annotations
        "https://peps.python.org/pep-0527/",  # Removing Un(der)used file types/extensions on PyPI
        "https://peps.python.org/pep-0528/",  # Change Windows console encoding to UTF-8
        "https://peps.python.org/pep-0529/",  # Change Windows filesystem encoding to UTF-8
        "https://peps.python.org/pep-0530/",  # Asynchronous Comprehensions
        "https://peps.python.org/pep-0531/",  # Existence checking operators
        "https://peps.python.org/pep-0532/",  # A circuit breaking protocol and binary operators
        "https://peps.python.org/pep-0533/",  # Deterministic cleanup for iterators
        "https://peps.python.org/pep-0534/",  # Improved Errors for Missing Standard Library Modules
        "https://peps.python.org/pep-0535/",  # Rich comparison chaining
        "https://peps.python.org/pep-0536/",  # Final Grammar for Literal String Interpolation
        "https://peps.python.org/pep-0537/",  # Python 3.7 Release Schedule
        "https://peps.python.org/pep-0538/",  # Coercing the legacy C locale to a UTF-8 based locale
        "https://peps.python.org/pep-0539/",  # A New C-API for Thread-Local Storage in CPython
        "https://peps.python.org/pep-0540/",  # Add a new UTF-8 Mode
        "https://peps.python.org/pep-0541/",  # Package Index Name Retention
        "https://peps.python.org/pep-0542/",  # Dot Notation Assignment In Function Header
        "https://peps.python.org/pep-0543/",  # A Unified TLS API for Python
        "https://peps.python.org/pep-0544/",  # Protocols: Structural subtyping (static duck typing)
        "https://peps.python.org/pep-0545/",  # Python Documentation Translations
        "https://peps.python.org/pep-0546/",  # Backport ssl.MemoryBIO and ssl.SSLObject to Python 2.7
        "https://peps.python.org/pep-0547/",  # Running extension modules using the -m option
        "https://peps.python.org/pep-0548/",  # More Flexible Loop Control
        "https://peps.python.org/pep-0549/",  # Instance Descriptors
        "https://peps.python.org/pep-0550/",  # Execution Context
        "https://peps.python.org/pep-0551/",  # Security transparency in the Python runtime
        "https://peps.python.org/pep-0552/",  # Deterministic pycs
        "https://peps.python.org/pep-0553/",  # Built-in breakpoint()
        "https://peps.python.org/pep-0554/",  # Multiple Interpreters in the Stdlib
        "https://peps.python.org/pep-0555/",  # Context-local variables (contextvars)
        "https://peps.python.org/pep-0556/",  # Threaded garbage collection
        "https://peps.python.org/pep-0557/",  # Data Classes
        "https://peps.python.org/pep-0558/",  # Defined semantics for locals()
        "https://peps.python.org/pep-0559/",  # Built-in noop()
        "https://peps.python.org/pep-0560/",  # Core support for typing module and generic types
        "https://peps.python.org/pep-0561/",  # Distributing and Packaging Type Information
        "https://peps.python.org/pep-0562/",  # Module __getattr__ and __dir__
        "https://peps.python.org/pep-0563/",  # Postponed Evaluation of Annotations
        "https://peps.python.org/pep-0564/",  # Add new time functions with nanosecond resolution
        "https://peps.python.org/pep-0565/",  # Show DeprecationWarning in __main__
        "https://peps.python.org/pep-0566/",  # Metadata for Python Software Packages 2.1
        "https://peps.python.org/pep-0567/",  # Context Variables
        "https://peps.python.org/pep-0568/",  # Generator-sensitivity for Context Variables
        "https://peps.python.org/pep-0569/",  # Python 3.8 Release Schedule
        "https://peps.python.org/pep-0570/",  # Python Positional-Only Parameters
        "https://peps.python.org/pep-0571/",  # The manylinux2010 Platform Tag
        "https://peps.python.org/pep-0572/",  # Assignment Expressions
        "https://peps.python.org/pep-0573/",  # Module State Access from C Extension Methods
        "https://peps.python.org/pep-0574/",  # Pickle protocol 5 with out-of-band data
        "https://peps.python.org/pep-0575/",  # Unifying function/method classes
        "https://peps.python.org/pep-0576/",  # Rationalize Built-in function classes
        "https://peps.python.org/pep-0577/",  # Augmented Assignment Expressions
        "https://peps.python.org/pep-0578/",  # Python Runtime Audit Hooks
        "https://peps.python.org/pep-0579/",  # Refactoring C functions and methods
        "https://peps.python.org/pep-0580/",  # The C call protocol
        "https://peps.python.org/pep-0581/",  # Using GitHub Issues for CPython
        "https://peps.python.org/pep-0582/",  # Python local packages directory
        "https://peps.python.org/pep-0583/",  # A Concurrency Memory Model for Python
        "https://peps.python.org/pep-0584/",  # Add Union Operators To dict
        "https://peps.python.org/pep-0585/",  # Type Hinting Generics In Standard Collections
        "https://peps.python.org/pep-0586/",  # Literal Types
        "https://peps.python.org/pep-0587/",  # Python Initialization Configuration
        "https://peps.python.org/pep-0588/",  # GitHub Issues Migration Plan
        "https://peps.python.org/pep-0589/",  # TypedDict: Type Hints for Dictionaries with a Fixed Set of Keys
        "https://peps.python.org/pep-0590/",  # Vectorcall: a fast calling protocol for CPython
        "https://peps.python.org/pep-0591/",  # Adding a final qualifier to typing
        "https://peps.python.org/pep-0592/",  # Adding “Yank” Support to the Simple API
        "https://peps.python.org/pep-0593/",  # Flexible function and variable annotations
        "https://peps.python.org/pep-0594/",  # Removing dead batteries from the standard library
        "https://peps.python.org/pep-0595/",  # Improving bugs.python.org
        "https://peps.python.org/pep-0596/",  # Python 3.9 Release Schedule
        "https://peps.python.org/pep-0597/",  # Add optional EncodingWarning
        "https://peps.python.org/pep-0598/",  # Introducing incremental feature releases
        "https://peps.python.org/pep-0599/",  # The manylinux2014 Platform Tag
        "https://peps.python.org/pep-0600/",  # Future ‘manylinux’ Platform Tags for Portable Linux Built Distributions
        "https://peps.python.org/pep-0601/",  # Forbid return/break/continue breaking out of finally
        "https://peps.python.org/pep-0602/",  # Annual Release Cycle for Python
        "https://peps.python.org/pep-0603/",  # Adding a frozenmap type to collections
        "https://peps.python.org/pep-0604/",  # Allow writing union types as X | Y
        "https://peps.python.org/pep-0605/",  # A rolling feature release stream for CPython
        "https://peps.python.org/pep-0606/",  # Python Compatibility Version
        "https://peps.python.org/pep-0607/",  # Reducing CPython’s Feature Delivery Latency
        "https://peps.python.org/pep-0608/",  # Coordinated Python release
        "https://peps.python.org/pep-0609/",  # Python Packaging Authority (PyPA) Governance
        "https://peps.python.org/pep-0610/",  # Recording the Direct URL Origin of installed distributions
        "https://peps.python.org/pep-0611/",  # The one million limit
        "https://peps.python.org/pep-0612/",  # Parameter Specification Variables
        "https://peps.python.org/pep-0613/",  # Explicit Type Aliases
        "https://peps.python.org/pep-0614/",  # Relaxing Grammar Restrictions On Decorators
        "https://peps.python.org/pep-0615/",  # Support for the IANA Time Zone Database in the Standard Library
        "https://peps.python.org/pep-0616/",  # String methods to remove prefixes and suffixes
        "https://peps.python.org/pep-0617/",  # New PEG parser for CPython
        "https://peps.python.org/pep-0618/",  # Add Optional Length-Checking To zip
        "https://peps.python.org/pep-0619/",  # Python 3.10 Release Schedule
        "https://peps.python.org/pep-0620/",  # Hide implementation details from the C API
        "https://peps.python.org/pep-0621/",  # Storing project metadata in pyproject.toml
        "https://peps.python.org/pep-0622/",  # Structural Pattern Matching
        "https://peps.python.org/pep-0623/",  # Remove wstr from Unicode
        "https://peps.python.org/pep-0624/",  # Remove Py_UNICODE encoder APIs
        "https://peps.python.org/pep-0625/",  # Filename of a Source Distribution
        "https://peps.python.org/pep-0626/",  # Precise line numbers for debugging and other tools.
        "https://peps.python.org/pep-0627/",  # Recording installed projects
        "https://peps.python.org/pep-0628/",  # Add math.tau
        "https://peps.python.org/pep-0629/",  # Versioning PyPI’s Simple API
        "https://peps.python.org/pep-0630/",  # Isolating Extension Modules
        "https://peps.python.org/pep-0631/",  # Dependency specification in pyproject.toml based on PEP 508
        "https://peps.python.org/pep-0632/",  # Deprecate distutils module
        "https://peps.python.org/pep-0633/",  # Dependency specification in pyproject.toml using an exploded TOML table
        "https://peps.python.org/pep-0634/",  # Structural Pattern Matching: Specification
        "https://peps.python.org/pep-0635/",  # Structural Pattern Matching: Motivation and Rationale
        "https://peps.python.org/pep-0636/",  # Structural Pattern Matching: Tutorial
        "https://peps.python.org/pep-0637/",  # Support for indexing with keyword arguments
        "https://peps.python.org/pep-0638/",  # Syntactic Macros
        "https://peps.python.org/pep-0639/",  # Improving License Clarity with Better Package Metadata
        "https://peps.python.org/pep-0640/",  # Unused variable syntax
        "https://peps.python.org/pep-0641/",  # Using an underscore in the version portion of Python 3.10 compatibility tags
        "https://peps.python.org/pep-0642/",  # Explicit Pattern Syntax for Structural Pattern Matching
        "https://peps.python.org/pep-0643/",  # Metadata for Package Source Distributions
        "https://peps.python.org/pep-0644/",  # Require OpenSSL 1.1.1 or newer
        "https://peps.python.org/pep-0645/",  # Allow writing optional types as x?
        "https://peps.python.org/pep-0646/",  # Variadic Generics
        "https://peps.python.org/pep-0647/",  # User-Defined Type Guards
        "https://peps.python.org/pep-0648/",  # Extensible customizations of the interpreter at startup
        "https://peps.python.org/pep-0649/",  # Deferred Evaluation Of Annotations Using Descriptors
        "https://peps.python.org/pep-0650/",  # Specifying Installer Requirements for Python Projects
        "https://peps.python.org/pep-0651/",  # Robust Stack Overflow Handling
        "https://peps.python.org/pep-0652/",  # Maintaining the Stable ABI
        "https://peps.python.org/pep-0653/",  # Precise Semantics for Pattern Matching
        "https://peps.python.org/pep-0654/",  # Exception Groups and except*
        "https://peps.python.org/pep-0655/",  # Marking individual TypedDict items as required or potentially-missing
        "https://peps.python.org/pep-0656/",  # Platform Tag for Linux Distributions Using Musl
        "https://peps.python.org/pep-0657/",  # Include Fine Grained Error Locations in Tracebacks
        "https://peps.python.org/pep-0658/",  # Serve Distribution Metadata in the Simple Repository API
        "https://peps.python.org/pep-0659/",  # Specializing Adaptive Interpreter
        "https://peps.python.org/pep-0660/",  # Editable installs for pyproject.toml based builds (wheel based)
        "https://peps.python.org/pep-0661/",  # Sentinel Values
        "https://peps.python.org/pep-0662/",  # Editable installs via virtual wheels
        "https://peps.python.org/pep-0663/",  # Standardizing Enum str(), repr(), and format() behaviors
        "https://peps.python.org/pep-0664/",  # Python 3.11 Release Schedule
        "https://peps.python.org/pep-0665/",  # A file format to list Python dependencies for reproducibility of an application
        "https://peps.python.org/pep-0666/",  # Reject Foolish Indentation
        "https://peps.python.org/pep-0667/",  # Consistent views of namespaces
        "https://peps.python.org/pep-0668/",  # Marking Python base environments as “externally managed”
        "https://peps.python.org/pep-0669/",  # Low Impact Monitoring for CPython
        "https://peps.python.org/pep-0670/",  # Convert macros to functions in the Python C API
        "https://peps.python.org/pep-0671/",  # Syntax for late-bound function argument defaults
        "https://peps.python.org/pep-0672/",  # Unicode-related Security Considerations for Python
        "https://peps.python.org/pep-0673/",  # Self Type
        "https://peps.python.org/pep-0674/",  # Disallow using macros as l-values
        "https://peps.python.org/pep-0675/",  # Arbitrary Literal String Type
        "https://peps.python.org/pep-0676/",  # PEP Infrastructure Process
        "https://peps.python.org/pep-0677/",  # Callable Type Syntax
        "https://peps.python.org/pep-0678/",  # Enriching Exceptions with Notes
        "https://peps.python.org/pep-0679/",  # New assert statement syntax with parentheses
        "https://peps.python.org/pep-0680/",  # tomllib: Support for Parsing TOML in the Standard Library
        "https://peps.python.org/pep-0681/",  # Data Class Transforms
        "https://peps.python.org/pep-0682/",  # Format Specifier for Signed Zero
        "https://peps.python.org/pep-0683/",  # Immortal Objects, Using a Fixed Refcount
        "https://peps.python.org/pep-0684/",  # A Per-Interpreter GIL
        "https://peps.python.org/pep-0685/",  # Comparison of extra names for optional distribution dependencies
        "https://peps.python.org/pep-0686/",  # Make UTF-8 mode default
        "https://peps.python.org/pep-0687/",  # Isolating modules in the standard library
        "https://peps.python.org/pep-0688/",  # Making the buffer protocol accessible in Python
        "https://peps.python.org/pep-0689/",  # Unstable C API tier
        "https://peps.python.org/pep-0690/",  # Lazy Imports
        "https://peps.python.org/pep-0691/",  # JSON-based Simple API for Python Package Indexes
        "https://peps.python.org/pep-0692/",  # Using TypedDict for more precise **kwargs typing
        "https://peps.python.org/pep-0693/",  # Python 3.12 Release Schedule
        "https://peps.python.org/pep-0694/",  # Upload 2.0 API for Python Package Indexes
        "https://peps.python.org/pep-0695/",  # Type Parameter Syntax
        "https://peps.python.org/pep-0696/",  # Type Defaults for Type Parameters
        "https://peps.python.org/pep-0697/",  # Limited C API for Extending Opaque Types
        "https://peps.python.org/pep-0698/",  # Override Decorator for Static Typing
        "https://peps.python.org/pep-0699/",  # Remove private dict version field added in PEP 509
        "https://peps.python.org/pep-0700/",  # Additional Fields for the Simple API for Package Indexes
        "https://peps.python.org/pep-0701/",  # Syntactic formalization of f-strings
        "https://peps.python.org/pep-0702/",  # Marking deprecations using the type system
        "https://peps.python.org/pep-0703/",  # Making the Global Interpreter Lock Optional in CPython
        "https://peps.python.org/pep-0704/",  # Require virtual environments by default for package installers
        "https://peps.python.org/pep-0705/",  # TypedDict: Read-only items
        "https://peps.python.org/pep-0706/",  # Filter for tarfile.extractall
        "https://peps.python.org/pep-0707/",  # A simplified signature for __exit__ and __aexit__
        "https://peps.python.org/pep-0708/",  # Extending the Repository API to Mitigate Dependency Confusion Attacks
        "https://peps.python.org/pep-0709/",  # Inlined comprehensions
        "https://peps.python.org/pep-0710/",  # Recording the provenance of installed packages
        "https://peps.python.org/pep-0711/",  # PyBI: a standard format for distributing Python Binaries
        "https://peps.python.org/pep-0712/",  # Adding a “converter” parameter to dataclasses.field
        "https://peps.python.org/pep-0713/",  # Callable Modules
        "https://peps.python.org/pep-0714/",  # Rename dist-info-metadata in the Simple API
        "https://peps.python.org/pep-0715/",  # Disabling bdist_egg distribution uploads on PyPI
        "https://peps.python.org/pep-0718/",  # Subscriptable functions
        "https://peps.python.org/pep-0719/",  # Python 3.13 Release Schedule
        "https://peps.python.org/pep-0720/",  # Cross-compiling Python packages
        "https://peps.python.org/pep-0721/",  # Using tarfile.data_filter for source distribution extraction
        "https://peps.python.org/pep-0722/",  # Dependency specification for single-file scripts
        "https://peps.python.org/pep-0723/",  # Inline script metadata
        "https://peps.python.org/pep-0724/",  # Stricter Type Guards
        "https://peps.python.org/pep-0725/",  # Specifying external dependencies in pyproject.toml
        "https://peps.python.org/pep-0726/",  # Module __setattr__ and __delattr__
        "https://peps.python.org/pep-0727/",  # Documentation in Annotated Metadata
        "https://peps.python.org/pep-0728/",  # TypedDict with Typed Extra Items
        "https://peps.python.org/pep-0729/",  # Typing governance process
        "https://peps.python.org/pep-0730/",  # Adding iOS as a supported platform
        "https://peps.python.org/pep-0731/",  # C API Working Group Charter
        "https://peps.python.org/pep-0732/",  # The Python Documentation Editorial Board
        "https://peps.python.org/pep-0733/",  # An Evaluation of Python’s Public C API
        "https://peps.python.org/pep-0734/",  # Multiple Interpreters in the Stdlib
        "https://peps.python.org/pep-0735/",  # Dependency Groups in pyproject.toml
        "https://peps.python.org/pep-0736/",  # Shorthand syntax for keyword arguments at invocation
        "https://peps.python.org/pep-0737/",  # C API to format a type fully qualified name
        "https://peps.python.org/pep-0738/",  # Adding Android as a supported platform
        "https://peps.python.org/pep-0739/",  # build-details.json 1.0 — a static description file for Python build details
        "https://peps.python.org/pep-0740/",  # Index support for digital attestations
        "https://peps.python.org/pep-0741/",  # Python Configuration C API
        "https://peps.python.org/pep-0742/",  # Narrowing types with TypeIs
        "https://peps.python.org/pep-0743/",  # Add Py_COMPAT_API_VERSION to the Python C API
        "https://peps.python.org/pep-0744/",  # JIT Compilation
        "https://peps.python.org/pep-0745/",  # Python 3.14 Release Schedule
        "https://peps.python.org/pep-0746/",  # Type checking Annotated metadata
        "https://peps.python.org/pep-0747/",  # Annotating Type Forms
        "https://peps.python.org/pep-0748/",  # A Unified TLS API for Python
        "https://peps.python.org/pep-0749/",  # Implementing PEP 649
        "https://peps.python.org/pep-0750/",  # Template Strings
        "https://peps.python.org/pep-0751/",  # A file format to record Python dependencies for installation reproducibility
        "https://peps.python.org/pep-0752/",  # Implicit namespaces for package repositories
        "https://peps.python.org/pep-0753/",  # Uniform project URLs in core metadata
        "https://peps.python.org/pep-0754/",  # IEEE 754 Floating Point Special Values
        "https://peps.python.org/pep-0755/",  # Implicit namespace policy for PyPI
        "https://peps.python.org/pep-0756/",  # Add PyUnicode_Export() and PyUnicode_Import() C functions
        "https://peps.python.org/pep-0757/",  # C API to import-export Python integers
        "https://peps.python.org/pep-0758/",  # Allow except and except* expressions without parentheses
        "https://peps.python.org/pep-0759/",  # External Wheel Hosting
        "https://peps.python.org/pep-0760/",  # No More Bare Excepts
        "https://peps.python.org/pep-0761/",  # Deprecating PGP signatures for CPython artifacts
        "https://peps.python.org/pep-0762/",  # REPL-acing the default REPL
        "https://peps.python.org/pep-0763/",  # Limiting deletions on PyPI
        "https://peps.python.org/pep-0764/",  # Inline typed dictionaries
        "https://peps.python.org/pep-0765/",  # Disallow return/break/continue that exit a finally block
        "https://peps.python.org/pep-0766/",  # Explicit Priority Choices Among Multiple Indexes
        "https://peps.python.org/pep-0767/",  # Annotating Read-Only Attributes
        "https://peps.python.org/pep-0768/",  # Safe external debugger interface for CPython
        "https://peps.python.org/pep-0769/",  # Add a ‘default’ keyword argument to ‘attrgetter’, ‘itemgetter’ and ‘getitem’
        "https://peps.python.org/pep-0770/",  # Improving measurability of Python packages with Software Bill-of-Materials
        "https://peps.python.org/pep-0771/",  # Default Extras for Python Software Packages
        "https://peps.python.org/pep-0772/",  # Packaging Council governance process
        "https://peps.python.org/pep-0773/",  # A Python Installation Manager for Windows
        "https://peps.python.org/pep-0774/",  # Removing the LLVM requirement for JIT builds
        "https://peps.python.org/pep-0775/",  # Make zlib required to build CPython
        "https://peps.python.org/pep-0776/",  # Emscripten Support
        "https://peps.python.org/pep-0777/",  # How to Re-invent the Wheel
        "https://peps.python.org/pep-0778/",  # Supporting Symlinks in Wheels
        "https://peps.python.org/pep-0779/",  # Criteria for supported status for free-threaded Python
        "https://peps.python.org/pep-0780/",  # ABI features as environment markers
        "https://peps.python.org/pep-0781/",  # Make TYPE_CHECKING a built-in constant
        "https://peps.python.org/pep-0782/",  # Add PyBytesWriter C API
        "https://peps.python.org/pep-0783/",  # Emscripten Packaging
        "https://peps.python.org/pep-0784/",  # Adding Zstandard to the standard library
        "https://peps.python.org/pep-0785/",  # New methods for easier handling of ExceptionGroups
        "https://peps.python.org/pep-0787/",  # Safer subprocess usage using t-strings
        "https://peps.python.org/pep-0788/",  # PyInterpreterRef: Interpreter References in the C API
        "https://peps.python.org/pep-0789/",  # Preventing task-cancellation bugs by limiting yield in async generators
        "https://peps.python.org/pep-0790/",  # Python 3.15 Release Schedule
        "https://peps.python.org/pep-0791/",  # intmath — module for integer-specific mathematics functions
        "https://peps.python.org/pep-0792/",  # Project status markers in the simple index
        "https://peps.python.org/pep-0793/",  # PyModExport: A new entry point for C extension modules
        "https://peps.python.org/pep-0794/",  # Import Name Metadata
        "https://peps.python.org/pep-0798/",  # Unpacking in Comprehensions
        "https://peps.python.org/pep-0799/",  # A dedicated profiling package for organizing Python profiling tools
        "https://peps.python.org/pep-0800/",  # Disjoint bases in the type system
        "https://peps.python.org/pep-0801/",  # Reserved
        "https://peps.python.org/pep-0802/",  # Display Syntax for the Empty Set
        "https://peps.python.org/pep-0803/",  # Stable ABI for Free-Threaded Builds
        "https://peps.python.org/pep-0804/",  # An external dependency registry and name mapping mechanism
        "https://peps.python.org/pep-0806/",  # Mixed sync/async context managers with precise async marking
        "https://peps.python.org/pep-2026/",  # Calendar versioning for Python
        "https://peps.python.org/pep-3000/",  # Python 3000
        "https://peps.python.org/pep-3001/",  # Procedure for reviewing and improving standard library modules
        "https://peps.python.org/pep-3002/",  # Procedure for Backwards-Incompatible Changes
        "https://peps.python.org/pep-3003/",  # Python Language Moratorium
        "https://peps.python.org/pep-3099/",  # Things that will Not Change in Python 3000
        "https://peps.python.org/pep-3100/",  # Miscellaneous Python 3.0 Plans
        "https://peps.python.org/pep-3101/",  # Advanced String Formatting
        "https://peps.python.org/pep-3102/",  # Keyword-Only Arguments
        "https://peps.python.org/pep-3103/",  # A Switch/Case Statement
        "https://peps.python.org/pep-3104/",  # Access to Names in Outer Scopes
        "https://peps.python.org/pep-3105/",  # Make print a function
        "https://peps.python.org/pep-3106/",  # Revamping dict.keys(), .values() and .items()
        "https://peps.python.org/pep-3107/",  # Function Annotations
        "https://peps.python.org/pep-3108/",  # Standard Library Reorganization
        "https://peps.python.org/pep-3109/",  # Raising Exceptions in Python 3000
        "https://peps.python.org/pep-3110/",  # Catching Exceptions in Python 3000
        "https://peps.python.org/pep-3111/",  # Simple input built-in in Python 3000
        "https://peps.python.org/pep-3112/",  # Bytes literals in Python 3000
        "https://peps.python.org/pep-3113/",  # Removal of Tuple Parameter Unpacking
        "https://peps.python.org/pep-3114/",  # Renaming iterator.next() to iterator.__next__()
        "https://peps.python.org/pep-3115/",  # Metaclasses in Python 3000
        "https://peps.python.org/pep-3116/",  # New I/O
        "https://peps.python.org/pep-3117/",  # Postfix type declarations
        "https://peps.python.org/pep-3118/",  # Revising the buffer protocol
        "https://peps.python.org/pep-3119/",  # Introducing Abstract Base Classes
        "https://peps.python.org/pep-3120/",  # Using UTF-8 as the default source encoding
        "https://peps.python.org/pep-3121/",  # Extension Module Initialization and Finalization
        "https://peps.python.org/pep-3122/",  # Delineation of the main module
        "https://peps.python.org/pep-3123/",  # Making PyObject_HEAD conform to standard C
        "https://peps.python.org/pep-3124/",  # Overloading, Generic Functions, Interfaces, and Adaptation
        "https://peps.python.org/pep-3125/",  # Remove Backslash Continuation
        "https://peps.python.org/pep-3126/",  # Remove Implicit String Concatenation
        "https://peps.python.org/pep-3127/",  # Integer Literal Support and Syntax
        "https://peps.python.org/pep-3128/",  # BList: A Faster List-like Type
        "https://peps.python.org/pep-3129/",  # Class Decorators
        "https://peps.python.org/pep-3130/",  # Access to Current Module/Class/Function
        "https://peps.python.org/pep-3131/",  # Supporting Non-ASCII Identifiers
        "https://peps.python.org/pep-3132/",  # Extended Iterable Unpacking
        "https://peps.python.org/pep-3133/",  # Introducing Roles
        "https://peps.python.org/pep-3134/",  # Exception Chaining and Embedded Tracebacks
        "https://peps.python.org/pep-3135/",  # New Super
        "https://peps.python.org/pep-3136/",  # Labeled break and continue
        "https://peps.python.org/pep-3137/",  # Immutable Bytes and Mutable Buffer
        "https://peps.python.org/pep-3138/",  # String representation in Python 3000
        "https://peps.python.org/pep-3139/",  # Cleaning out sys and the “interpreter” module
        "https://peps.python.org/pep-3140/",  # str(container) should call str(item), not repr(item)
        "https://peps.python.org/pep-3141/",  # A Type Hierarchy for Numbers
        "https://peps.python.org/pep-3142/",  # Add a “while” clause to generator expressions
        "https://peps.python.org/pep-3143/",  # Standard daemon process library
        "https://peps.python.org/pep-3144/",  # IP Address Manipulation Library for the Python Standard Library
        "https://peps.python.org/pep-3145/",  # Asynchronous I/O For subprocess.Popen
        "https://peps.python.org/pep-3146/",  # Merging Unladen Swallow into CPython
        "https://peps.python.org/pep-3147/",  # PYC Repository Directories
        "https://peps.python.org/pep-3148/",  # futures - execute computations asynchronously
        "https://peps.python.org/pep-3149/",  # ABI version tagged .so files
        "https://peps.python.org/pep-3150/",  # Statement local namespaces (aka “given” clause)
        "https://peps.python.org/pep-3151/",  # Reworking the OS and IO exception hierarchy
        "https://peps.python.org/pep-3152/",  # Cofunctions
        "https://peps.python.org/pep-3153/",  # Asynchronous IO support
        "https://peps.python.org/pep-3154/",  # Pickle protocol version 4
        "https://peps.python.org/pep-3155/",  # Qualified name for classes and functions
        "https://peps.python.org/pep-3156/",  # Asynchronous IO Support Rebooted: the “asyncio” Module
        "https://peps.python.org/pep-3333/",  # Python Web Server Gateway Interface v1.0.1
        "https://peps.python.org/pep-8000/",  # Python Language Governance Proposal Overview
        "https://peps.python.org/pep-8001/",  # Python Governance Voting Process
        "https://peps.python.org/pep-8002/",  # Open Source Governance Survey
        "https://peps.python.org/pep-8010/",  # The Technical Leader Governance Model
        "https://peps.python.org/pep-8011/",  # Python Governance Model Lead by Trio of Pythonistas
        "https://peps.python.org/pep-8012/",  # The Community Governance Model
        "https://peps.python.org/pep-8013/",  # The External Council Governance Model
        "https://peps.python.org/pep-8014/",  # The Commons Governance Model
        "https://peps.python.org/pep-8015/",  # Organization of the Python community
        "https://peps.python.org/pep-8016/",  # The Steering Council Model
        "https://peps.python.org/pep-8100/",  # January 2019 Steering Council election
        "https://peps.python.org/pep-8101/",  # 2020 Term Steering Council election
        "https://peps.python.org/pep-8102/",  # 2021 Term Steering Council election
        "https://peps.python.org/pep-8103/",  # 2022 Term Steering Council election
        "https://peps.python.org/pep-8104/",  # 2023 Term Steering Council election
        "https://peps.python.org/pep-8105/",  # 2024 Term Steering Council election
        "https://peps.python.org/pep-8106/",  # 2025 Term Steering Council election
    ]

    model_name = "gemini-2.5-flash"

    for url in pep_urls[:50]:
        try:
            pep_metadata = fetch_pep_metadata(url)

            translated_content = translate_pep_with_url_context_tool(
                pep_url=url,
                model_name=model_name,
            )

            result_data = {**pep_metadata, "translated_content": translated_content}
            save_post(result_data)

            print("Sleeping for 5 seconds...")
            time.sleep(5)

        except Exception as e:
            print(f"Fatal error processing {url}: {e}")
            print(traceback.format_exc())
            continue


if __name__ == "__main__":
    main()
