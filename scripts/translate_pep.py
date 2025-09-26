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

    # 4. client.models.generate_content를 사용하여 API를 호출합니다.
    response = client.models.generate_content(
        model=model_name,
        contents=full_prompt_with_url,
        config=config,
    )

    # 선택 사항: 모델이 어떤 URL을 참조했는지 확인
    # print(response.candidates[0].url_context_metadata)

    return response.text

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
        "https://peps.python.org/pep-0335/",  # Standard image protocol and class
        "https://peps.python.org/pep-0343/",  # Post import hooks
        "https://peps.python.org/pep-0355/",  # Per user site-packages directory
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

    for url in pep_urls[:]:
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
