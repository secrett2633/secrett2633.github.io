---
title: "[Withdrawn] PEP 462 - Core development workflow automation for CPython"
excerpt: "Python Enhancement Proposal 462: 'Core development workflow automation for CPython'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/462/
toc: true
toc_sticky: true
date: 2025-09-26 22:10:21+0900
last_modified_at: 2025-09-26 22:10:21+0900
published: true
---
> **원문 링크:** [PEP 462 - Core development workflow automation for CPython](https://peps.python.org/pep-0462/)
>
> **상태:** Withdrawn | **유형:** Process | **작성일:** 23-Jan-2014


# PEP 462 – CPython 핵심 개발 워크플로우 자동화

*   **작성자:** Alyssa Coghlan
*   **상태:** 철회됨 (Withdrawn)
*   **유형:** 프로세스 (Process)
*   **생성일:** 2014년 1월 23일
*   **필요 PEP:** 474

## 요약 (Abstract)

이 PEP는 CPython에 변경 사항을 통합하기 위해 핵심 개발팀이 현재 수행하는 지루하고 시간이 많이 소요되는 여러 활동을 자동화하는 데 투자할 것을 제안합니다. 이 제안은 핵심 개발자가 CPython에 기여할 수 있는 시간을 보다 효과적으로 활용할 수 있도록 하고, 이는 또한 핵심 팀에 의존하여 변경 사항을 통합하는 다른 기여자들에게 더 나은 경험을 제공할 것으로 기대됩니다.

## PEP 철회 (PEP Withdrawal)

이 PEP는 GitLab 기반의 제안인 [PEP 507](https://peps.python.org/pep-0507/)에 찬성하여 작성자에 의해 철회되었습니다.

## 핵심 개발 워크플로우 변경을 위한 배경 (Rationale for changes to the core development workflow)

현재 CPython의 핵심 개발 워크플로우는 새로운 기능을 POSIX 시스템에 병합하는 과정이 다음과 같이 진행됩니다.

1.  **CLA (Contributor Licensing Agreement) 확인:** 다른 사용자가 bugs.python.org에 제출한 변경 사항을 적용하는 경우, 먼저 PSF Contributor Licensing Agreement 서명 여부를 확인합니다.
2.  **변경 사항 로컬 적용:** CPython 메인 저장소의 최신 체크아웃에 변경 사항을 로컬로 적용합니다.
3.  **로컬 테스트 스위트 실행:** `make test` 또는 `./python -m test`를 실행합니다. 시스템 사양에 따라 수 분에서 상당한 시간이 소요될 수 있습니다.
4.  **`make patchcheck` 실행:** 공백 문제 수정 및 `Misc/ACKS`, `Misc/NEWS` 파일 업데이트 등 필요한 변경 사항을 확인합니다.
5.  **변경 사항 커밋 및 푸시:** 변경 사항을 커밋하고 메인 저장소에 푸시합니다. 새 Head가 생성될 경우 `hg pull --rebase`를 실행합니다. (이론적으로 이 시점에서 테스트를 다시 실행해야 하지만, 종종 생략됩니다.)
6.  **Buildbot 모니터링:** 푸시 후 안정적인 Buildbot에서 변경으로 인한 새로운 실패가 있는지 모니터링합니다. 특히 POSIX 시스템 개발자는 Windows 빌드봇을 망가뜨리는 경우가 많습니다.

버그 수정(bug fix) 워크플로우는 새로운 기능(new feature)보다 더 복잡합니다. 버그 수정은 기본 브랜치 외에 유지보수 브랜치에도 적용될 필요가 있기 때문입니다. 예를 들어 Python 2.7에 적용되는 버그 수정은 2.7 브랜치에 별도로 적용되고, 현재 3.x 유지보수 릴리스에 적용되는 버그 수정은 유지보수 브랜치에 먼저 적용된 다음 기본 브랜치로 병합됩니다.

문서 패치는 기능 패치보다 간단하지만, 테스트 스위트 실행 대신 문서 빌드 성공 여부만 확인하면 됩니다.

작성자는 모든 것이 순조롭게 진행되어도 깔끔하게 적용되는 버그 수정 패치를 커밋하는 데 최소 20~30분이 소요된다고 추정했습니다. 이는 현재 관행이 부족한 핵심 개발자 리소스를 효과적으로 사용하지 못하고 있음을 의미합니다.

**현재 워크플로우의 문제점 (Frustrations with current workflow):**

*   **오버헤드:** 패치 적용 건당 발생하는 오버헤드로 인해 작고 고립된 변경보다는 큰 커밋(large commits)을 장려합니다.
*   **신규 기능 편향:** 버그 수정 작업의 추가 오버헤드는 개발자들이 이미 본질적으로 더 흥미로운 신규 기능 작업에 집중하게 만듭니다.
*   **선행 리뷰(Preceding review) 소홀:** bugs.python.org에서의 선행 리뷰는 추가 작업으로 인식되어 변경 사항을 직접 커밋하려는 유인을 만듭니다.
*   **패치 지연:** 완료되고 정확하며 병합 준비가 된 트래커(tracker)의 패치가 핵심 개발자의 시간 부족으로 인해 오랫동안 지연될 수 있습니다.
*   **푸시 경쟁(Push races) 위험:** 푸시 경쟁 위험은 로컬 테스트 전체 실행을 건너뛰도록 유도하여 Buildbot을 망가뜨릴 가능성을 높입니다.
*   **불안정한 Buildbot:** Buildbot이 장기간 실패 상태일 때가 있어 로컬 테스트 실행에 오류를 유발하고, 패치가 크로스 플랫폼 문제를 일으켰는지 여부를 신뢰할 수 있는 지표가 되지 못합니다.
*   **사고 발생 가능성:** Mercurial 브랜치 관리 및 Buildbot 고장 발생 시 핵심 개발자가 실수할 여지가 많아, 새로운 개발자에게 커밋 권한을 부여하는 데 신중하게 됩니다.
*   **감정적 에너지 소모:** 자원봉사 기반 오픈소스 프로젝트에서 핵심 리소스인 기여자의 감정적 에너지를 소모시킵니다.

## 현재 사용 중인 도구 (Current Tools)

CPython 핵심 개발 워크플로우의 다양한 부분을 관리하기 위해 현재 다음 도구들이 사용되고 있습니다.

*   **Mercurial (hg.python.org):** 버전 관리 (Version Control)
*   **Roundup (bugs.python.org):** 이슈 트래킹 (Issue Tracking)
*   **Rietveld (bugs.python.org에서 호스팅):** 코드 리뷰 (Code Review)
*   **Buildbot (buildbot.python.org):** 자동화된 테스트 (Automated Testing)

이 제안은 코드 리뷰를 위해 Rietveld 대신 PEP 474에서 제안된 더 많은 기능을 갖춘 Kallithea 기반의 forge.python.org 서비스로 대체할 것을 제안합니다. 또한, 워크플로우의 추가적인 부분을 자동화하기 위해 새로운 도구 도입과 기존 도구의 검토를 제안합니다.

## 제안 (Proposal)

이 제안의 핵심은 CPython이 OpenStack 프로젝트에서 사용하는 것과 유사한 "핵심 리뷰어(core reviewer)" 개발 모델을 채택하는 것입니다. OpenStack 인프라팀은 다음과 같은 목표를 달성하도록 설계된 잘 자동화된 워크플로우를 개발했습니다.

*   패치가 검토되면 자동화된 테스트가 실패하지 않는 한 더 이상의 개발자 개입이 필요 없습니다.
*   패치는 현재 브랜치 상태에 대해 테스트되지 않고 병합되지 않습니다.
*   메인 개발 브랜치(main development branch)는 항상 "녹색(green, 통과)" 상태를 유지합니다. 자동화된 테스트를 통과하지 못하는 패치는 병합되지 않습니다.

이 워크플로우의 핵심은 OpenStack 프로젝트를 위해 특별히 생성된 Python 웹 서비스인 **Zuul**을 사용하여 구현됩니다. Zuul은 플러그인 기반 트리거 및 액션 시스템을 갖추고 있어 다른 코드 리뷰 시스템, 이슈 트래커 및 CI 시스템에 쉽게 적용할 수 있도록 설계되었습니다.

이 PEP에서 특히 관심 있는 Zuul 워크플로우는 "**Merge Gating (병합 게이팅)**"입니다.

*   Zuul은 Gerrit 코드 리뷰 시스템에서 "승인(Approved)"으로 표시된 패치를 모니터링합니다.
*   승인된 패치를 발견하면, Zuul은 이를 "후보 병합(candidate merges)" 대기열에 추가합니다.
*   이후 Jenkins에서 병렬로 실행되는 테스트 실행 파이프라인(pipeline)을 생성하고, 통과하는 대로 병합됩니다.
*   패치가 테스트에 실패하면 Zuul은 대기열에서 해당 패치를 제거하고, 실패한 패치 이후의 테스트 실행을 취소한 후 대기열을 재구성합니다.
*   간헐적인(intermittent) 실패로 인해 테스트가 실패한 경우 개발자는 패치를 다시 제출하여 병합을 재시도할 수 있습니다.

CPython에 이 프로세스를 적용하려면 Zuul이 Kallithea에서 승인된 Pull Request를 모니터링하고 (Kallithea에 기능 추가 필요), 안정적인 Buildbot에서 테스트를 위해 제출한 다음, Mercurial에서 변경 사항을 적절하게 병합하도록 하는 것이 가능해야 합니다.

## 연기된 제안 (Deferred Proposals)

OpenStack 팀은 Zuul을 사용하여 다른 활동도 조정합니다.

*   Gerrit에 게시된 패치에 대한 예비 "체크(check)" 테스트 실행.
*   변경 사항이 병합될 때 업데이트된 릴리스 아티팩트(artefacts) 생성 및 문서 재게시.
*   ElasticSearch와 스팸 필터를 사용하여 테스트 출력을 모니터링하고 간헐적인 실패의 원인을 제안하는 "Elastic recheck" 기능.

이러한 기능들은 미래에 탐색할 가치가 있지만, 병합 게이팅이 제공하는 것과 동일한 종류의 근본적인 워크플로우 개선을 제공한다고 보지 않습니다. 다만, 병합 게이트(merge gate)에서 간헐적인 테스트 실패 문제가 너무 많이 발생한다면 "Elastic recheck" 기능을 초기 배포의 일부로 고려해야 할 수도 있습니다.

## 제안된 변형 (Suggested Variants)

*   **문서 전용 패치 필터링:** 승인된 문서 전용 패치에 대한 초기 필터를 제안했습니다. 이는 불안정한 테스트 및 크로스 플랫폼 테스트와 관련된 여러 문제를 피하면서도 다른 자동화 흐름을 개발할 수 있게 합니다.
*   **문서 빌드만 확인:** 패치가 "Docs" 트리 외부의 파일을 수정하지 않았음을 감지하면 테스트 스위트를 실행하지 않고 문서가 오류 없이 빌드되는지 여부만 확인하도록 병합 게이팅 기준을 조정할 수 있습니다.
*   **문서 일부 분리:** 튜토리얼(tutorial) 및 HOWTO 가이드와 같은 문서의 일부를 메인 소스 저장소에서 분리하여 PEP 474에서 설명된 더 간단한 Pull Request 기반 모델로 관리하는 것도 고려할 수 있습니다.

## 예상되는 이점 (Perceived Benefits)

이 제안의 이점은 핵심 개발팀에 가장 직접적으로 영향을 미칩니다.

*   **시간 절약:** 패치를 "승인"으로 표시하면, 패치를 적용하고, 테스트를 실행하고, Mercurial에 병합하는 20~30분(또는 그 이상)의 시간이 Zuul에 의해 자동으로 처리됩니다.
*   **푸시 경쟁 해소:** 푸시 경쟁은 과거의 일이 됩니다. 많은 핵심 개발자가 스프린트(sprint) 중에 패치를 승인해도 Zuul의 대기열이 길어질 뿐, 개발자들이 병합 실패로 좌절하는 일은 없어집니다.
*   **안정적인 메인 브랜치:** 테스트 실패가 발생해도 영향을 받는 패치가 병합 대기열에서 제거될 뿐, 메인 저장소의 코드를 망가뜨리지 않습니다.
*   **"리뷰 용이성" 개발 장려:** 테스트를 여러 번 실행하는 오버헤드가 Zuul에 의해 처리되므로, 작고 리뷰하기 쉬운 패치(reviewable patches) 개발을 장려합니다.
*   **기여자 경험 개선:** 패치가 "바닥에 떨어지는(dropped on the floor)" 기회를 제거하고, 핵심 개발자들이 기여된 패치를 검토하는 데 더 많은 시간을 할애할 수 있게 하여 다른 기여자들의 CPython 개발 경험을 향상시킵니다.
*   **새로운 핵심 개발자 진입 장벽 완화:** 변경 사항 커밋 시 실수를 유발할 수 있는 대부분의 방법이 자동화되므로, 핵심 개발자가 될 때 배워야 할 새로운 사항이 크게 줄어듭니다.
*   **안정적인 `default` 브랜치:** CPython의 더 안정적인 `default` 브랜치(trunk)는 다른 Python 프로젝트가 새로운 릴리스의 릴리스 후보(release candidate) 단계까지 기다릴 필요 없이 메인 저장소에 대해 직접 지속적 통합(CI)을 수행하기 쉽게 만듭니다.

## 기술적 과제 (Technical Challenges)

OpenStack 인프라에서 CPython 인프라로 Zuul을 적용하려면 추가 Zuul 트리거 및 액션 플러그인 개발과 기존 도구의 추가 개발이 필요할 것입니다.

### Kallithea vs Gerrit

*   Kallithea는 Gerrit의 투표/승인 기능과 동등한 기능을 현재 포함하고 있지 않습니다. CPython의 경우, Zuul을 트리거하는 간단한 핵심 개발자 전용 "승인" 마커(marker)로 충분할 것입니다.
*   기존 Zuul 트리거 중 일부는 특정 댓글을 모니터링하여 작동하는데, Kallithea에서도 유사한 명시적 트리거가 필요할 수 있습니다.
*   Kallithea 활동을 모니터링하는 Zuul 플러그인을 개발하는 노력이 필요합니다.

### Mercurial vs Gerrit/git

*   Gerrit은 git을 저장 메커니즘으로 사용하고 승인된 패치의 병합을 자동으로 처리합니다. Kallithea는 RhodeCode가 만든 `vcs` 라이브러리를 DVCS 구현(Mercurial 및 git 백엔드 지원) 위에 추상화 레이어로 사용합니다.
*   Zuul은 패치 조작을 위해 git과 직접 통합되어 있습니다. 하지만 Mercurial 핵심 개발자들이 Zuul을 Mercurial과 함께 사용할 수 있도록 협력하는 데 관심을 표명했습니다. Zuul이 Python 애플리케이션이므로, RhodeCode 및 Kallithea와 동일한 DVCS 추상화 라이브러리를 사용하도록 마이그레이션하는 것이 타당한 방법일 수 있습니다.

### Buildbot vs Jenkins

*   Zuul과 CI 시스템 간의 상호작용은 Gearman을 선호하는 인터페이스로 사용하여 플러그인 방식으로 구현됩니다. 따라서 CI 작업을 Jenkins 대신 Buildbot에서 실행하도록 조정하는 것은 Gearman 클라이언트를 작성하여 Zuul의 요청을 처리하고 Buildbot 마스터에게 전달하는 문제입니다.
*   초기 단계에서는 테스트 실행을 파이프라인 방식으로 처리하지 않고, 병합 대기열의 Head에 있는 패치만 Buildbot에서 테스트하도록 할 것을 제안합니다.
*   만약 파이프라인 테스트 모델을 지원해야 한다면, Buildbot 대신 동적으로 프로비저닝(provisioning)된 클라우드 이미지로 테스트 실행을 옮기거나 OpenStack 팀의 노력에 참여하여 Jenkins 대신 순수 Python 테스트 러너를 사용하는 것을 고려할 수 있습니다.

### 유지보수 브랜치 처리 (Handling of maintenance branches)

*   OpenStack 프로젝트는 유지보수 브랜치 문제를 주로 다운스트림(downstream) 벤더에 맡깁니다. CPython은 Zuul을 유지보수 브랜치에 어떻게 적용할지 결정해야 합니다.
*   Python 2.7은 별도의 패치 대기열로 취급하여 Kallithea에서 별도의 Pull Request를 제출하여 업데이트하면 됩니다.
*   Python 3.x 유지보수 브랜치는 더 복잡할 수 있습니다. Mercurial 병합 대신 Python 2.7 브랜치처럼 독립적인 Head로 처리하고, 활성 Python 3 유지보수 브랜치와 기본 개발 브랜치에 대해 별도의 Pull Request를 제출하는 것을 권장합니다.

### 보안 브랜치 처리 (Handling of security branches)

보안 수정 전용 브랜치(security-fix only branches)는 기존대로 릴리스 관리자(release managers)가 수동으로 백포트(backport)하도록 두는 것을 제안합니다. 유일한 변경 사항은 Kallithea Pull Request 워크플로우를 사용하여 백포트를 수행하고 다른 사람들이 병합 전에 업데이트를 검토할 수 있도록 하는 것입니다.

### NEWS 파일 업데이트 처리 (Handling of NEWS file updates)

현재 `NEWS` 파일 업데이트 처리 방식은 활성 유지보수 브랜치에서 이후 브랜치로 버그 수정을 병합할 때 종종 불필요한 충돌을 일으킵니다. Issue #18967에서 개선 방안을 논의하고 있으며, 이는 Zuul 채택 여부와 관계없이 유익할 것입니다.

### "안정적인(stable)" Buildbot 슬레이브의 안정성 (Stability of “stable” Buildbot slaves)

이 제안 하에서는 명목상 안정적인 Buildbot의 불안정성이 훨씬 더 큰 영향을 미칩니다. 각 시스템이 개발 브랜치로의 병합을 게이팅(gating)하는 데 정말 만족하는지 확인해야 합니다.

### 간헐적인 테스트 실패 (Intermittent test failures)

일부 테스트, 특히 타이밍 테스트는 기존 Buildbot에서 간헐적인 실패를 보입니다. OpenStack CI 인프라에는 간헐적인 실패를 처리하는 여러 추가 기능이 포함되어 있으며, 개발자가 특정 실패가 알려진 간헐적인 실패로 인한 것으로 보일 때 패치 병합을 다시 시도하도록 요청할 수 있는 기능이 있습니다. 보다 정교한 "Elastic recheck" 기능도 고려할 가치가 있습니다.

### 사용자 정의 Mercurial 클라이언트 워크플로우 지원 (Custom Mercurial client workflow support)

OpenStack 워크플로우의 유용한 부분 중 하나는 로컬 git 클론에서 Gerrit으로 브랜치를 푸시하여 리뷰를 쉽게 할 수 있는 "git review" 플러그인입니다. PEP 474에서는 기존 CPython 핵심 개발 워크플로우의 일부 측면을 자동화하는 Mercurial 확장 초안이 언급되어 있습니다. 이 제안의 일환으로, 해당 확장은 기존 Roundup/Rietveld 기반 리뷰 워크플로우 외에 새로운 Kallithea 기반 리뷰 워크플로우와도 작동하도록 확장될 것입니다.

## 사회적 과제 (Social Challenges)

주요 사회적 과제는 핵심 개발팀이 관행을 변경하도록 하는 것입니다. 그러나 이 제안으로 자동화되는 지루하지만 필요한 단계들은 기존 개발자들이 아이디어를 따르도록 강력한 동기를 부여할 것입니다.

기존 개발자들이 이 워크플로우 자동화에 단점이 없음을 확신시키기 위해 세 가지 특정 기능이 필요할 수 있습니다.

1.  **단일 핵심 개발자 승인:** 패치 통합을 위해 단일 핵심 개발자의 승인만 요구합니다. (초기 롤아웃 시 현상 유지)
2.  **자기 패치 승인 권한 유지:** 릴리스 후보 단계(release candidate phase)를 제외하고 핵심 개발자가 자신의 패치를 자유롭게 승인할 수 있도록 명시적으로 명시합니다. (초기 롤아웃 시 현상 유지)
3.  **"지금 병합(merge it now)" 기능:** 릴리스 관리자에게 특정 패치를 병합 대기열의 최상단으로 강제 이동시킬 수 있는 "merge it now" 기능을 보장합니다.

## 실질적 과제 (Practical Challenges)

PSF(Python Software Foundation)는 과거 대중에게 무료로 제공되는 인프라의 허용할 수 없는 낮은 성능과 유연성 부족 경험 때문에 자체적으로 직간접적으로 후원하는 워크플로우 인프라를 운영합니다. 이 제안은 이러한 역사를 존중하여, 후원 또는 PSF 자금 지원 인프라로 자체 호스팅(self-hosting)이 가능하며, CPython 핵심 개발팀의 요구를 충족하도록 사용자 정의할 수 있는 오픈소스 Python 프로젝트 도구만 권장합니다.

그러나 이 제안이 성공하려면 필요한 구성, 사용자 정의, 통합 및 배포 작업을 어떻게 수행할지 이해해야 합니다. 과거 `speed.python.org` 프로젝트와 같이 핵심 개발자 및 PSF 이사회 구성원의 시간 부족으로 실패한 사례가 있습니다.

다행히 이 제안과 PEP 474의 여러 측면이 Red Hat의 Beaker 오픈소스 하드웨어 통합 테스트 시스템 및 기타 업무 관련 프로젝트를 위한 다양한 워크플로우 개선 사항과 일치하므로, 작성자는 CPython 인프라 프로젝트에 주당 약 1일을 할애할 수 있도록 조치했습니다.

## 열린 질문 (Open Questions)

PEP의 거의 모든 내용이 질문의 여지를 남깁니다.

*   Merge gating과 Zuul을 채택할 것인가?
*   다양한 기술적 과제를 어떻게 해결할 것인가?
*   Kallithea 및 Zuul 개발 커뮤니티가 이 노력의 성공에 필요한 종류의 협력에 개방적인가?
*   작성자는 자신의 업무 시간을 일부 할애하기로 했지만, OpenStack 자체가 CPython의 주요 의존성이고, Zuul이 OpenStack 인프라 팀의 창작물이며, OpenStack의 개발 리소스가 현재 CPython보다 훨씬 많다는 점을 고려할 때 OpenStack Foundation에 추가 지원을 요청할 것인가?
*   Python 재배포자(redistributors) 및 주요 사용자들을 위해 일하는 다른 заинтересо된 사람들도 이 노력에 개발자 시간을 투자하는 것에 대해 상사에게 비즈니스 사례를 제시할 수 있는 위치에 있는가?

## 다음 단계 (Next Steps)

이 제안이 추진된다면, PEP 474의 Kallithea 기반 forge.python.org 제안에 대한 후속 프로젝트가 될 것입니다. 현재 진행 중인 논의, 검토 및 개념 증명(proof-of-concept) 파일럿 프로세스에 대한 자세한 내용은 해당 PEP를 참조하십시오.

## 감사의 말 (Acknowledgements)

제시 놀러(Jesse Noller), 알렉스 게이너(Alex Gaynor), 제임스 블레어(James Blair)에게 이 제안의 예비 초안에 대한 소중한 피드백을 제공해 주셔서 감사드립니다. 또한 제임스 블레어와 몬티 테일러(Monty Taylor)에게 초기 초안 발행 후 추가 기술 피드백에 감사드립니다.

브래들리 쿤(Bradley Kuhn), 매즈 킬러리치(Mads Kiellerich) 및 기타 Kallithea 개발자들에게 PEP 474에 대한 논의를 통해 이 제안이 기존 Rietveld 설치 대신 Kallithea를 리뷰 구성 요소로 사용하도록 크게 수정된 것에 감사드립니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.