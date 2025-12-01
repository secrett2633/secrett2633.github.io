---
title: "[Accepted] PEP 753 - Uniform project URLs in core metadata"
excerpt: "Python Enhancement Proposal 753: 'Uniform project URLs in core metadata'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/753/
toc: true
toc_sticky: true
date: 2025-09-27 13:40:57+0900
last_modified_at: 2025-09-27 13:40:57+0900
published: true
---
> **원문 링크:** [PEP 753 - Uniform project URLs in core metadata](https://peps.python.org/pep-0753/)
>
> **상태:** Accepted | **유형:** Standards Track | **작성일:** 29-Aug-2024



---
# PEP 753 – 코어 메타데이터 내 통일된 프로젝트 URL (Uniform project URLs in core metadata)

## 개요 (Abstract)
PEP 753은 PyPI와 같은 인덱스 및 기타 코어 메타데이터 소비자(consumer)가 코어 메타데이터를 처리하는 방식에 두 가지 개별적인 변경 사항을 권고합니다.

1.  `Home-page` 및 `Download-URL` 필드를 `Project-URL` 필드로 대체하고 사용 중단(Deprecation)합니다.
2.  소비자 측 메타데이터 처리 과정에서 `Project-URL` 레이블을 정규화하고 의미를 할당하기 위한 일련의 규칙을 정의합니다.

## 도입 배경 및 동기 (Rationale and Motivation)
Python의 표준 코어 메타데이터는 여러 해 동안 개정을 거쳐 다양한 표준화된 버전이 도입되었습니다. 이러한 개정 과정에서 외부 리소스와의 관계를 URL을 통해 표현하기 위한 다양한 메커니즘이 생겨났습니다.

*   **Metadata 1.0** : 배포판의 홈페이지 URL을 포함하는 단일 사용 필드인 `Home-page`를 도입했습니다.
    ```
    Home-page: https://example.com/sampleproject
    ```
*   **Metadata 1.1** : 현재 배포판을 다운로드하는 데 적합한 URL을 포함하는 보완적인 단일 사용 필드인 `Download-URL`을 도입했습니다.
    ```
    Download-URL: https://example.com/sampleproject/sampleproject-1.2.3.tar.gz
    ```
*   **Metadata 1.2** : 레이블과 URL 쌍을 포함하는 다중 사용 필드인 `Project-URL`을 도입했습니다. 각 레이블은 URL의 의미를 전달하는 자유 형식 텍스트입니다.
    ```
    Project-URL: Homepage, https://example.com/sampleproject
    Project-URL: Download, https://example.com/sampleproject/sampleproject-1.2.3.tar.gz
    Project-URL: Documentation, https://example.com/sampleproject/docs
    ```

`Project-URL` 필드는 자유 텍스트 레이블을 허용하고 다중 사용이 가능하기 때문에, `Home-page` 및 `Download-URL`의 값을 `Project-URL` 내에서 표현하는 비공식적인 관례가 생겨났습니다. 이러한 관례는 널리 채택되었으며, PEP 621은 `project.home-page` 필드 대신 `project.urls` 테이블만을 제공하도록 명시적으로 선택하기도 했습니다.

이 PEP는 이러한 비공식적인 관례를 공식화하고, `Home-page` 및 `Download-URL`을 해당 `Project-URL` 표현으로 대체하여 사용 중단되었음을 명시적으로 문서화하기 위해 마련되었습니다.

## 명세 (Specification)

이 PEP는 `Home-page`와 `Download-URL`을 사용 중단(deprecated)으로 간주할 것을 제안합니다. 이러한 사용 중단은 패키지 메타데이터 생산자(예: 빌드 백엔드 및 패키징 도구)와 패키지 인덱스(예: PyPI) 모두에 영향을 미칩니다.

### 메타데이터 생산자 (Metadata producers)
이 PEP는 메타데이터 생산자에 대해 다음을 규정합니다.

*   메타데이터 1.2 이상을 생성할 때, 생산자는 `Project-URL`만 발행해야 하며(`SHOULD`), `Home-page` 또는 `Download-URL` 필드는 발행하지 않아야 합니다(`SHOULD NOT`).
*   이 규정은 코어 메타데이터에서 URL 필드의 선택 사항을 변경하지 않습니다. 즉, 생산자는 재량에 따라 `Project-URL`을 완전히 생략할 수 있습니다.
*   이 PEP는 `Home-page` 또는 `Download-URL` 지원의 완전한 제거를 제안하지 않습니다. 그러나 새로운 (아직 지정되지 않은) 주요 코어 메타데이터 버전이 이러한 사용 중단된 필드를 제거하여 사용 중단 주기를 완료하는 방법에 대한 내용은 "향후 고려 사항(Future Considerations)"을 참조하십시오.
*   마찬가지로, 이 PEP는 메타데이터 생산자가 정규화된 레이블을 발행할 것을 제안하지 않습니다. 레이블 정규화는 처리 및 소비 측(즉, 인덱스 및 배포 메타데이터의 다른 소비자 내)에서만 수행됩니다.

### 패키지 인덱스 (Package indices)
이 PEP는 패키지 인덱스에 대해 다음을 규정합니다.

*   버전 1.2 이상의 배포판 메타데이터를 해석할 때(예: 웹 페이지에 렌더링하기 위해), 인덱스는 `Home-page` 및 `Download-URL`보다 `Project-URL` 필드를 URL 소스로 선호해야 합니다(`MUST`). 후자의 필드가 명시적으로 제공되더라도 마찬가지입니다.
*   배포판 메타데이터에 `Home-page` 및 `Download-URL` 필드만 포함되어 있는 경우, 인덱스는 해당 필드를 무시하고 메타데이터에 URL이 제공되지 않은 것처럼 동작하도록 선택할 수 있습니다(`MAY`). 이 경우, 인덱스는 업로드 당사자에게 적절한 경고 또는 알림을 제시해야 합니다(`SHOULD`).
*   배포판 메타데이터에 두 필드 세트가 모두 포함되어 있는 경우, 인덱스는 해당 배포판을 완전히 거부하도록 선택할 수 있습니다(`MAY`). 그러나 향후 지정되지 않은 주요 메타데이터 버전에서 `Home-page` 및 `Download-URL` 지원이 공식적으로 제거될 때까지는 **권장되지 않습니다(`NOT RECOMMENDED`)** .
*   버전 1.2 이상 메타데이터 해석의 변경으로 인해 이전에 인식되던 URL이 더 이상 인식되지 않는 경우, 이전에 업로드된 패키지에 소급 적용되어서는 안 됩니다(`SHOULD NOT`).
*   이러한 규정은 인덱스의 URL 처리 선택 사항을 변경하지 않습니다. 즉, 업로드된 배포판 내 URL을 처리하지 않는 인덱스는 모든 URL 필드를 계속 완전히 무시할 수 있습니다.
*   마찬가지로, 이러한 규정은 인덱스가 배포판 메타데이터에 수행하는 정규화를 유지해야 함을 의미하지 않습니다. 즉, 이 PEP는 사용자 표시를 위한 레이블 정규화를 규정하며, 업로드된 배포판 또는 해당 "sidecar" PEP 658 메타데이터 파일을 수정하기 위한 것이 아닙니다.

### `Project-URL` 레이블에 대한 관례 (Conventions for Project-URL labels)
위에서 제안된 사용 중단은 `Home-page`, `Download-URL` 및 해당 `Project-URL` 동등물 간의 현재 비공식적인 관계를 공식화해야 합니다. 이 공식화에는 두 가지 부분이 있습니다.

1.  인덱스 측 처리 중 `Project-URL` 레이블을 정규화하기 위한 일련의 규칙
2.  인덱스가 URL 표시를 전문화할 수 있는 "잘 알려진(well-known)" 정규화된 레이블 값 세트

#### 레이블 정규화 (Label normalization)
코어 메타데이터 명세는 `Project-URL` 레이블이 32자로 제한된 자유 텍스트임을 규정합니다. 이 PEP는 코어 메타데이터 명세에 "정규화된(normalized)" 레이블 개념을 추가할 것을 제안합니다. 레이블 정규화는 다음 Python 함수를 통해 정의됩니다.

```python
import string

def normalize_label(label: str) -> str:
    chars_to_remove = string.punctuation + string.whitespace
    removal_map = str.maketrans("", "", chars_to_remove)
    return label.translate(removal_map).lower()
```

쉽게 설명하자면, 레이블은 모든 ASCII 구두점(punctuation)과 공백(whitespace)을 삭제한 다음 결과를 소문자로 변환하여 정규화됩니다.

다음 표는 정규화 전후의 레이블 예시를 보여줍니다.

| Raw (원문) | Normalized (정규화됨) |
|---|---|
| Homepage | homepage |
| Home-page | homepage |
| Home page | homepage |
| Change_Log | changelog |
| What's New? | whatsnew |

배포 메타데이터를 처리할 때, 패키지 인덱스는 주어진 레이블이 후속 특수 처리를 위해 잘 알려져 있는지 확인하기 위해 레이블 정규화를 수행해야 합니다(`SHOULD`). 잘 알려지지 않은 레이블은 정규화되지 않은 형태로 처리되어야 합니다(`MUST`).

정규화는 중복된 `Project-URL` 레이블에 대한 기존의 의미를 변경하지 않습니다. 즉, 정규화로 인해 프로젝트 메타데이터에 중복된 레이블이 발생할 수 있지만, 이는 이전에 허용되었던 방식과 동일한 방식으로만 허용됩니다(코어 메타데이터 명세는 레이블이 고유해야 한다고 규정하지 않으므로).

정규화된 메타데이터 필드의 발췌 예시는 **부록 A (Appendix A)** 에 제공됩니다.

#### 잘 알려진 레이블 (Well-known labels)
위의 정규화 규칙 외에도, 이 PEP는 고정적이지만 확장 가능한 "잘 알려진(well-known)" `Project-URL` 레이블 세트와 별칭(aliases) 및 사람이 읽을 수 있는(human-readable) 동등물을 제안합니다.

다음 표는 정규화된 형태로 이러한 레이블을 나열합니다.

| Label (Human-readable equivalent) | Description (설명) | Aliases (별칭) |
|---|---|---|
| `homepage` (Homepage) | The project's home page (프로젝트의 홈페이지) | (없음) |
| `source` (Source Code) | The project's hosted source code or repository (프로젝트의 호스팅된 소스 코드 또는 저장소) | `repository`, `sourcecode`, `github` |
| `download` (Download) | A download URL for the current distribution, equivalent to `Download-URL` (현재 배포판의 다운로드 URL, `Download-URL`과 동일) | (없음) |
| `changelog` (Changelog) | The project's comprehensive changelog (프로젝트의 종합 변경 로그) | `changes`, `whatsnew`, `history` |
| `releasenotes` (Release Notes) | The project's curated release notes (프로젝트의 선별된 릴리스 노트) | (없음) |
| `documentation` (Documentation) | The project's online documentation (프로젝트의 온라인 문서) | `docs` |
| `issues` (Issue Tracker) | The project's bug tracker (프로젝트의 버그 추적기) | `bugs`, `issue`, `tracker`, `issuetracker`, `bugtracker` |
| `funding` (Funding) | Funding Information (자금 지원 정보) | `sponsor`, `donate`, `donation` |

인덱스는 적절한 경우 UI 요소에서 위에 제안된 사람이 읽을 수 있는 동등물을 사용할 수 있습니다(`MAY`). 또는 인덱스는 UI 요소를 위해 자체적으로 적절한 사람이 읽을 수 있는 동등물을 선택할 수 있습니다(`MAY`).

패키지 제작자 및 메타데이터 생산자는 이러한 레이블(또는 그 별칭)로 정규화되는 모든 레이블을 사용하여 특정 URL 의도를 패키지 인덱스 및 다운스트림에 전달할 수 있습니다(`MAY`).

마찬가지로, 인덱스는 이러한 레이블이 있는 URL의 렌더링 또는 표시를 전문화할 수 있습니다(`MAY`). 예를 들어, 각 레이블에 적절한 아이콘이나 툴팁을 표시할 수 있습니다.

인덱스는 추가 레이블 또는 URL의 렌더링 또는 표시를 전문화할 수도 있습니다(`MAY`). 여기에는 잘 알려진 레이블로 시작하는 레이블, 알려진 서비스 제공자 도메인(예: 문서 호스팅 또는 이슈 추적)을 참조하는 URL 등이 포함됩니다(이에 국한되지 않음).

이 PEP는 잘 알려진 레이블 목록이 정적 상태로 유지될 가능성이 낮으며, 이후의 추가 사항에 공식적인 PEP 프로세스 또는 새로운 메타데이터 버전과 관련된 오버헤드가 필요해서는 안 된다는 점을 인정합니다. 따라서 이 PEP는 위의 목록이 PyPA 명세 내에서 "살아있는(living)" 목록이 될 것을 제안합니다.

## 하위 호환성 (Backwards Compatibility)

### 제한적인 영향 (Limited Impact)
이 PEP는 기존 패키징 도구 또는 패키지 인덱스에 거의 또는 전혀 영향을 미치지 않을 것으로 예상됩니다.

*   **패키징 도구** : 코어 메타데이터의 정확성 또는 올바른 형식에 변경 사항이 없습니다. 이 PEP는 사용 중단 및 동작 개선을 제안하지만, 현재(및 과거에) 생성된 모든 메타데이터는 해당 버전의 규칙에 따라 계속 유효합니다.
*   **패키지 인덱스** : 인덱스는 올바른 형식의 코어 메타데이터를 계속 기대하며, 동작 변경은 없습니다. 인덱스는 위에 따라 이제 사용 중단된 필드의 존재에 대해 경고 또는 알림을 발행하도록 선택할 수 있습니다(`MAY`).

## 향후 고려 사항 (Future Considerations)
이 PEP는 향후 메타데이터 변경을 규정하거나 요구하지 않습니다.

그러나 메타데이터 생산자 및 `Project-URL` 레이블에 대한 관례에 따라, 코어 메타데이터 표준의 새로운 주요 릴리스를 위한 다음과 같은 잠재적인 미래 목표를 식별합니다.

*   다음 주요 코어 메타데이터 버전에서 `Home-page` 및 `Download-URL` 지원을 완전히 제거합니다. 제거될 경우, 패키지 인덱스 및 소비자는 해당 메타데이터가 새 주요 버전인 경우 이러한 필드를 포함하는 메타데이터를 거부해야 합니다(`MUST`).
*   레이블 정규화의 강제 적용. 강제될 경우, 패키지 생산자는 배포 메타데이터를 생성할 때 정규화된 `Project-URL` 레이블만 발행해야 하며(`MUST`), 패키지 인덱스 및 소비자는 정규화되지 않은 레이블을 포함하는 배포판을 거부해야 합니다(`MUST`).
    *   참고: 정규화를 요구하는 것은 레이블을 소문자 텍스트로만 제한하고 공백과 구두점을 제외합니다. `Project-URL`을 "잘 알려진" 레이블만 사용하도록 제한하는 것은 아닙니다.

이러한 잠재적인 변경 사항은 하위 호환성을 깨뜨릴 수 있으므로 이 섹션에만 포함되었습니다. 이 PEP의 수락이 향후 메타데이터 개정이 실제로 이러한 변경 사항을 만들도록 의무화하는 것은 아닙니다.

## 보안 영향 (Security Implications)
이 PEP는 `Home-page` 및 `Download-URL`의 사용 중단 또는 레이블 정규화와 관련된 긍정적 또는 부정적인 보안 영향을 식별하지 않습니다.

## 교육 방법 (How To Teach This)
이 PEP의 변경 사항은 패키징 생태계 사용자 대다수에게 투명해야 합니다. 이 PEP 변경 사항의 주요 수혜자는 패키징 도구 작성자 및 인덱스 유지 관리자이며, 이들은 생성 및 확인되는 고유 URL 필드의 수를 줄일 수 있습니다.

소수의 패키지 관리자는 인덱스가 `Home-page` 및 `Download-URL`을 무시하도록 선택하는 경우, 선택한 인덱스에서 새로운 경고 또는 알림을 관찰할 수 있습니다. 마찬가지로, 소수의 패키지 관리자는 URL이 사용 중단된 필드에만 있는 경우 선택한 인덱스에서 URL이 더 이상 렌더링되지 않는 것을 관찰할 수 있습니다. 그러나 이 PEP에서 제안하는 변경 사항으로 인해 패키지 관리자가 패키지 업로드 거부 또는 기타 패키징 워크플로의 파괴적인 변경 사항을 관찰해서는 안 됩니다.

인덱스에서 URL 표시의 경고 또는 변경 사항을 관찰하는 모든 사람은 Python Packaging User Guide 및 PyPI의 사용자 문서와 같은 공식 패키징 리소스를 통해 이 PEP의 동작에 대해 배울 수 있습니다. PyPI의 사용자 문서는 이미 PyPI의 URL 처리 동작에 대한 비공식적인 설명을 포함하고 있습니다.

이 PEP가 수락되면, 이 PEP의 작성자는 위에 언급된 리소스를 업데이트하고 상호 연결하기 위해 협력할 것입니다.

## 부록 A: 레이블 정규화 예시 (Appendix A: Label normalization examples)
이 부록은 인덱스 측 처리 전후의 배포판 메타데이터 발췌본을 보여줍니다.

**Before (처리 전):**
```
Project-URL: Home-page, https://example.com
Project-URL: Homepage, https://another.example.com
Project-URL: Source, https://github.com/example/example
Project-URL: GitHub, https://github.com/example/example
Project-URL: Another Service, https://custom.example.com
```

**After (처리 후):**
```
Project-URL: homepage, https://example.com
Project-URL: homepage, https://another.example.com
Project-URL: source, https://github.com/example/example
Project-URL: github, https://github.com/example/example
Project-URL: Another Service, https://custom.example.com
```

특히 다음을 관찰하십시오.

*   정규화된 중복은 유지됩니다(`Home-page`와 `Homepage` 모두 `homepage`가 됨).
*   `Source`와 `GitHub`는 모두 해당 형식으로 정규화되지만, `github`는 `source`로 변환되지 않습니다.
*   `Another Service`는 정규화된 형태(`anotherservice`)가 잘 알려진 레이블이 아니므로 정규화되지 않습니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스 하에 배포됩니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.