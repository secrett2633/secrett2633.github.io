---
title: "[Final] PEP 8001 - Python Governance Voting Process"
excerpt: "Python Enhancement Proposal 8001: 'Python Governance Voting Process'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/8001/
toc: true
toc_sticky: true
date: 2025-09-27 19:25:35+0900
last_modified_at: 2025-09-27 19:25:35+0900
published: true
---
> **원문 링크:** [PEP 8001 - Python Governance Voting Process](https://peps.python.org/pep-8001/)
>
> **상태:** Final | **유형:** Process | **작성일:** 24-Aug-2018


## PEP 8001 – Python 거버넌스 투표 절차 (Python Governance Voting Process)

**저자:** Brett Cannon 외 다수
**상태:** Final (최종)
**유형:** Process (절차)
**주제:** Governance (거버넌스)
**생성일:** 2018년 8월 24일

---

### 개요 (Abstract)

이 PEP는 귀도 반 로섬(Guido van Rossum)의 BDFL(Benevolent Dictator For Life) 역할 은퇴 이후, 새로운 Python 거버넌스 모델을 선정하는 과정을 설명합니다. 이 문서에 명시된 절차에 따라 모델이 선택되면, 해당 내용은 PEP 13에 공식적으로 명문화될 것입니다.

### 동기 및 배경 (Motivation and Rationale)

Guido가 BDFL 역할에서 물러나면서, Python 프로젝트가 앞으로 어떻게 운영될지 결정하는 방법을 선택해야 하는 메타 문제가 발생했습니다. 이 문서는 이러한 선택을 할 수 있는 구체적인 제안을 제시하며, 2018년 9월 Redmond에서 열린 핵심 개발자 스프린트(core sprint) 워킹 그룹의 논의와 결론을 요약합니다. 또한, 이후 discuss.python.org에서 진행된 스레드(thread)의 내용도 포함합니다.

거버넌스 상황은 신속하게 해결되어야 했습니다. 이상적으로는 2018년 말까지 완료되어 Python 3.8에 중요한 개선 사항이 통합될 수 있도록 해야 했으며, 늦어도 PyCon US 2019까지는 해결되어야 PR 위기를 피할 수 있었습니다.

### 구현 (Implementation)

#### 무엇을 투표하는가? (What are we voting for?)

Python 프로젝트에 어떤 거버넌스 PEP를 구현할지 선택하기 위해 투표합니다. 후보 PEP 목록은 PEP 8000에 명시되어 있으며, 801X 범위의 모든 PEP들로 구성됩니다. 투표의 정당성을 보장하기 위해, 언급된 PEP들은 투표 기간 동안 수정되어서는 안 됩니다.

#### 누가 투표할 수 있는가? (Who gets to vote?)

모든 CPython 핵심 개발자(core developer)는 투표에 초대됩니다. 투명성과 공정성을 위해, 핵심 개발자들이 거버넌스 상황이 자신에게 직접적인 영향을 미치는지 여부에 따라 자율적으로 판단하여 투표하도록 요청됩니다. 즉, 비활동적인 핵심 개발자 중 앞으로도 계속 비활동적으로 남을 의도가 있는 경우 투표를 자제할 것을 권장합니다.

#### 투표는 언제 진행되는가? (When is the vote?)

2018년 11월 16일부터 11월 30일까지가 공식적인 거버넌스 PEP 검토 기간이었습니다. 이 논의 기간 동안 사소한 수정은 예상되지만, PEP 저자들이 중대한 실질적인 변경을 하는 것은 권장되지 않았습니다. 투표는 2018년 12월 1일부터 12월 16일까지 (Anywhere on Earth, AoE 기준으로) 2주 동안 진행되었습니다.

#### 투표는 어디서 진행되는가? (Where is the vote?)

투표는 Condorcet Internet Voting Service (CIVS)를 이용한 "비공개(private)" 설문 방식으로 진행되었습니다. 모든 커미터(committer)는 PEP들의 선호도 순위를 매길 수 있는 링크가 담긴 이메일을 받았습니다.

선거는 PSF(Python Software Foundation) 인프라 디렉터인 Ee Durbin이 감독했습니다. 선거 결과는 익명화된 투표용지(ballots)를 포함하여, 선거 종료 후 12월 17일에 공개되었습니다.

CIVS 시스템의 투표 설정은 다음과 같았습니다:
*   **설문 이름:** Python governance vote (December 2018)
*   **설문 설명:** Guido의 BDFL 은퇴 발표 이후 CPython 프로젝트가 스스로를 어떻게 거버넌스할지 선택하는 투표입니다.
    *   모든 투표는 2018년 12월 16일 Anyware on Earth 기준으로 마감되어야 합니다.
    *   모든 CPython 핵심 개발자는 투표 자격이 있습니다.
    *   비활동적이며 앞으로도 비활동적으로 남을 의도가 있는 핵심 개발자는 투표를 자제할 것을 요청했습니다.
    *   **주의:** 투표는 한 번만 가능하며, 모든 투표는 최종입니다. "Submit ranking"을 클릭하면 변경할 수 없습니다.
    *   모든 투표용지는 투표 종료 시점에 게시되지만, **어떤 이름도 첨부되지 않습니다.** Python 프로젝트나 PSF와 관련된 누구도 투표자의 투표 방식이나 투표 여부를 알 수 없습니다.
*   **후보 옵션:** 7개의 거버넌스 모델을 제안하는 PEP들과 "Further discussion" 옵션이 포함되었습니다. "Further discussion"은 현 시점에서 결정을 내리지 않고 논의를 계속하는 옵션을 의미했습니다. 투표자는 이 옵션을 다른 제안들보다 더 좋다고 생각하면 더 높은 순위를 매기고, 모든 제안이 "Further discussion"보다 낫다고 생각하면 "Further discussion"을 가장 낮은 순위에 두도록 했습니다.

    *   [PEP 8010: The Technical Leader Governance Model](https://peps.python.org/pep-8010/)
    *   [PEP 8011: Python Governance Model Lead by Trio of Pythonistas](https://peps.python.org/pep-8011/)
    *   [PEP 8012: The Community Governance Model](https://peps.python.org/pep-8012/)
    *   [PEP 8013: The External Council Governance Model](https://peps.python.org/pep-8013/)
    *   [PEP 8014: The Commons Governance Model](https://peps.python.org/pep-8014/)
    *   [PEP 8015: Organization of the Python community](https://peps.python.org/pep-8015/)
    *   [PEP 8016: The Steering Council Model](https://peps.python.org/pep-8016/)
    *   Further discussion (추가 논의)

*   **CIVS 시스템 설정 결과:**
    *   선거는 "비공개(private)", 즉 초대 전용으로 진행되었습니다.
    *   선거 결과는 모든 투표자에게 공개되었습니다.
    *   모든 투표용지의 내용과 당선자 결정 방법에 대한 상세 보고서가 대중에게 공개되었습니다.
    *   상세 투표용지에는 어떠한 식별 정보도 포함되지 않았으며, CIVS 시스템은 투표 링크가 포함된 이메일이 발송되는 즉시 투표자의 이메일 주소를 폐기했습니다.
    *   투표자들은 새로운 선택지를 기입할 수 없었으며, 선거에 지정된 옵션으로만 제한되었습니다.
    *   투표자들은 투표 후 자신의 투표를 변경할 수 없었습니다.
    *   각 투표용지의 기본 순서는 투표 순서가 선거에 미칠 수 있는 영향을 제거하기 위해 무작위화되었습니다.
    *   투표자들은 모든 선택지에 순위를 매겨야 했지만, 여러 선택지에 동일한 순위를 매길 수 있었습니다.

#### 투표 방식 (Voting mechanics)

투표는 순위 투표(ranked ballot) 방식으로 진행됩니다. 각 투표자는 모든 후보 PEP를 가장 선호하는 것부터 가장 덜 선호하는 것까지 순서대로 정렬합니다. 투표는 콘도르세 방식(Condorcet method)을 사용하여 집계되고 당선자가 선택됩니다.

**참고:** 각 투표자는 단 한 번의 투표만 할 수 있으며, 이후 투표를 수정할 수 없습니다. 선택에 대해 확실하지 않은 경우, 투표 기간의 후반까지 투표를 보류하는 것이 권장됩니다.

CIVS 시스템은 "순수한(Pure)" 콘도르세 선거 옵션을 제공하지 않지만, 어떤 콘도르세 방식이든 "순수한" 콘도르세 당선자가 존재하면 그 당선자를 선택하며, 존재하지 않는 경우에만 달라집니다. CIVS 시스템은 당선자가 콘도르세 당선자인지, 아니면 단순히 다른 어떤 옵션에 의해서도 패배하지 않았는지를 명시하여 이를 구분합니다. 따라서 CIVS 시스템에서 당선자는 콘도르세 당선자로 명시될 때만 수용됩니다.

동점(tie)이나 순환(cycle)이 발생하는 드문 경우(콘도르세 방식에서 가능함), 동점이나 순환에 관련된 옵션으로 제한된 새로운 선거가 열려 새로운 당선자를 선택합니다. 이 새로운 선거는 일주일 동안 진행되며, 단일 당선자가 결정될 때까지 반복됩니다.

### 질문 및 답변 (Questions and Answers)

#### 콘도르세 방식을 채택한 이유는 무엇인가? (Why the Condorcet method?)

*   투표자들이 PEP들의 순위를 매겨 선호도를 표현할 수 있도록 합니다.
*   합의(consensus) 의사 결정 방식입니다.
*   핵심 개발자만을 대상으로 승인 투표(Approval voting) 방식으로 진행된 설문에서, 이 방식이 명확한 선호도를 보였습니다.

#### 순위 매김에서 일부 후보 PEP를 제외하는 것이 허용되는가? (Is omitting any candidate PEPs in the ranking allowed?)

순위 매김에서 후보를 제외하는 투표는 유효하지 않습니다. 이러한 투표는 위에서 언급된 바람직한 특성(투표자들이 대안을 고려하고, 단일 선거에서 결론에 도달하기 위해 가능한 모든 것을 하는 것)과 양립할 수 없기 때문입니다.

#### 비활동적인 핵심 개발자가 투표하지 않도록 권장하는 이유는 무엇인가? (Why recommend for dormant core developers to not vote?)

거버넌스 모델의 선택은 Python과 커뮤니티에 광범위하고 장기적인 영향을 미칠 것입니다. 핵심 개발자들에게 그들의 "피부(skin in the game)"를 평가하도록 요청하는 것입니다.

**참고:** 이는 명령이 아니며, 강제되지 않습니다. 모든 핵심 팀 구성원이 Python의 최선의 이익을 위해 행동할 것이라고 신뢰합니다.

#### 투표가 비공개여야 하는 이유는 무엇인가? (Why should the vote be private?)

선거 시스템을 논의할 때, 여러 핵심 개발자들이 공개 투표용지(public ballots)에 대한 우려를 표명했으며, 적어도 한 명의 핵심 개발자는 공개 투표용지 사용 때문에 아예 투표를 기권할 계획이라고 밝혔습니다. Discourse에서 진행된 설문 조사에서는 대다수의 투표자들이 비공개 투표용지를 선호한다는 것이 확인되었습니다.

비밀 투표(secret ballot)는 많은 이들에게 자유롭고 공정한 선거의 필수 요건으로 간주되며, 사회적 압력이나 투표 방식에 따른 잠재적 파급 효과에 대한 걱정 없이 구성원들이 자신의 진정한 선호도를 투표할 수 있도록 합니다.

#### CIVS를 사용하는 이유는 무엇인가? (Why the use of CIVS?)

이 PEP의 논의 결과, 핵심 개발자들은 비밀 투표를 원했습니다. 불행히도 비밀 투표는 새로운 암호화 기술(novel cryptography) 또는 투표용지를 익명화할 신뢰할 수 있는 제3자(trusted party)를 필요로 합니다. 콘도르세 투표용지를 위한 기존의 새로운 암호화 시스템은 알려진 바가 없으므로, CIVS 시스템이 신뢰할 수 있는 제3자 역할을 하도록 선택되었습니다.

악의적인 투표자, 선거 감독관 또는 CIVS 관리자가 선거에 어떻게 영향을 미칠 수 있는지 등 CIVS가 제공하는 보안 및 개인 정보 보호에 대한 자세한 정보는 [CIVS 웹사이트](http://condorcet.org/civs/info.html)에서 찾을 수 있습니다.

#### 투표자가 투표를 변경할 수 없는 이유는 무엇인가? (Why cannot voters change their vote?)

CIVS는 투표자가 투표를 업데이트하는 것을 허용하지 않으며, 이는 선거 감독관이 투표에 영향을 미치는 것을 방지하려는 목표의 일환입니다.

#### 콘도르세 방식에 결함은 없는가? (Are there any deficiencies in the Condorcet method?)

완벽한 투표 방법은 없습니다. 기버드-새터스웨이트 정리(Gibbard-Satterthwaite theorem)에 따르면, 독재적이지 않은 단일 당선자 순위 투표 방식은 소위 "전략적 투표(tactical voting)"에 취약할 수 있습니다. 이는 사람들이 결과에 영향을 미치기 위해 자신의 진정한 신념대로 투표하지 않을 수 있습니다.

콘도르세 방식은 또한 순환(cycles) 가능성(콘도르세 역설, Condorcet paradox)을 가집니다. 콘도르세 방식이 일대일 대결에서 다른 옵션을 이길 수 있는지 여부에 따라 당선자를 선택하기 때문에, PEP A > PEP B > PEP C > PEP A와 같은 순환이 발생할 수 있습니다 (가위바위보 게임에서 세 명의 플레이어가 각각 바위, 보, 가위를 냈을 때 누구도 이기지 못하는 상황과 유사). 21명 이상의 투표자가 참여한 실제 선거 데이터 분석 결과에 따르면, 순환은 1.5% 미만으로 발생했습니다.

### 참고 자료 (References)

*   [discuss.python.org 스레드](https://discuss.python.org/t/pep-8001-public-or-private-ballots/374/20)
*   [비공개 투표에 대한 논의](https://discuss.python.org/t/pep-8001-public-or-private-ballots/374/4)

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.