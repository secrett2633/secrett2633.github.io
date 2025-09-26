---
title: "[Active] PEP 101 - Doing Python Releases 101"
excerpt: "Python Enhancement Proposal 101: 'Doing Python Releases 101'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/101/
toc: true
toc_sticky: true
date: 2025-09-26 16:02:21+0900
last_modified_at: 2025-09-26 16:02:21+0900
published: true
---
> **원문 링크:** [PEP 101 - Doing Python Releases 101](https://peps.python.org/pep-0101/)
>
> **상태:** Active | **유형:** Informational | **작성일:** 22-Aug-2001


# PEP 101 – Python 릴리스 수행 101

**저자:** Barry Warsaw, Guido van Rossum
**상태:** 활성 (Active)
**유형:** 정보 (Informational)
**생성일:** 2001년 8월 22일
**이전 문서:** PEP 102

## 초록 (Abstract)

Python 릴리스를 만드는 것은 흥미진진하면서도 복잡한 과정입니다. "고양이 떼를 모으는 것"이라는 표현을 들어보셨을 겁니다. 이 과정은 마치 그 고양이들을 안장 위에 태우고 도시로 데려가는 것과 같으며, 몇몇 고양이는 새로 날카롭게 간 발톱으로 등 뒤에 단단히 붙어 있는 상황을 상상해 볼 수 있습니다. 적어도 그들은 귀엽다고 스스로를 다독이게 될 것입니다.

사실, 이것은 약간의 과장입니다 😉. Python 릴리스 프로세스는 수년 동안 꾸준히 개선되어 왔으며, 이제는 놀라운 커뮤니티의 도움 덕분에 그리 어렵지 않습니다. 이 PEP는 Python 릴리스를 만드는 데 필요한 모든 단계를 한곳에 모으려고 합니다. 대부분의 단계는 현재 자동화되거나 자동화의 안내를 받으므로, 이 목록을 수동으로 따를 필요는 더 이상 없습니다.

## 필요한 것들 (Things You'll Need)

릴리스 관리자는 많은 리소스에 접근해야 합니다. 다음은 필요한 것들의 목록입니다.

*   **GPG 키:** Python 3.14 이전 릴리스는 GPG로 디지털 서명됩니다. 이를 위해서는 키가 필요하며, 이 키는 다른 릴리스 관리자 중 적어도 한 명과 "신뢰의 웹(web of trust)"에 포함되어야 합니다.
    *   **참고:** Python 3.14 이후부터는 이 PEP의 GPG 지침을 무시해도 됩니다. 자세한 내용은 [PEP 761](https://peps.python.org/pep-0761/)을 참조하십시오.
*   **소프트웨어:**
    *   `python/release-tools` 저장소 체크아웃. 이 저장소에는 종속성을 먼저 설치해야 하는 `requirements.txt` 파일이 포함되어 있습니다. 그 후 이 PEP에서 나중에 다룰 스크립트를 실행할 수 있습니다.
    *   `blurb`, Misc/NEWS 관리 도구. `pip install blurb`로 설치할 수 있습니다.
*   **파일을 업로드할 서버 접근 권한:**
    *   `downloads.nyc1.psf.io`: 다운로드 파일을 호스팅하는 서버.
    *   `docs.nyc1.psf.io`: 문서를 호스팅하는 서버.
*   `python/cpython`에 대한 관리자 접근 권한.
*   `www.python.org`에 대한 관리자 계정, "API 키" 포함.
*   `python/peps` 저장소에 대한 쓰기 권한. (이 문서를 읽고 있다면 아마 이미 가지고 있을 것입니다. 릴리스 관리자의 첫 번째 임무는 릴리스 일정을 초안하는 것이기 때문입니다.)
*   Blogger에서 호스팅되는 웹로그인 `blog.python.org`에 대한 게시 권한. 이 블로그의 RSS 피드는 `www.python.org`의 'Python News' 섹션에 사용됩니다.
*   `python-cabal`이라고 불릴 수도 있고 아닐 수도 있는 극비 릴리스 관리자 메일링 리스트 구독. Barry에게 문의하십시오.
*   릴리스 서명에 사용할 `@python.org` 이메일 주소. `postmaster@`에게 주소를 요청할 수 있습니다. 전체 계정을 받거나, 리디렉션 별칭과 SMTP 자격 증명을 받아 주요 이메일 제공업체에 합법적으로 보이는 이메일을 보낼 수 있습니다.
*   Python Security Response Team에 추가될 것.

## 릴리스 유형 (Types of Releases)

만들어야 할 몇 가지 릴리스 유형이 있습니다. 여기에는 다음이 포함됩니다.

*   `alpha`
*   `begin beta` (beta 1 또는 new branch라고도 함)
*   `beta 2+`
*   `release candidate 1`
*   `release candidate 2+`
*   `final`
*   `new branch`
*   `begin bugfix mode`
*   `begin security-only mode`
*   `end-of-life`

이러한 릴리스 유형 중 일부는 둘 이상의 릴리스 브랜치(branch)를 포함합니다. 특히, "새 브랜치(new branch)"는 새로운 기능 릴리스 사이클이 시작되는 릴리스 사이클의 지점입니다. 현재 CPython Git 저장소의 구성에 따르면 `main` 브랜치는 항상 새로운 기능의 대상이 됩니다. 다음 기능 릴리스의 릴리스 사이클의 어느 시점에서, 새로운 브랜치 릴리스가 만들어져 현재 진행 중인 기능 릴리스(예: `3.n.0`)의 안정화 및 향후 유지보수를 위한 새로운 별도 브랜치를 생성하고, `main` 브랜치는 새로운 버전(결국 `3.n+1.0`으로 릴리스될 버전)을 빌드하도록 수정됩니다.

새 브랜치 릴리스 단계는 릴리스 사이클의 여러 지점 중 한 곳에서 발생할 수 있지만, 현재 관행은 첫 번째 베타 릴리스로 예정된 릴리스의 기능 코드 마감 시점에 발생합니다.

아래 설명에서는 릴리스 유형에 따라 구체적인 단계가 레이블링되어 있으며, 현재는 `new branch`와 `final`이 있습니다.

## 릴리스를 만드는 방법 (How To Make A Release)

다음은 Python 릴리스를 만드는 단계입니다. 일부 단계는 자동화될 수 있는 부분이 거의 없기 때문에 (예: NEWS 항목 작성) 다른 단계보다 모호합니다. 일반적으로 "전문가(An Expert)"가 수행하는 단계의 경우 해당 전문가의 역할이 명시됩니다. 그렇지 않은 경우, 해당 단계는 릴리스를 수행하는 지정된 사람인 릴리스 관리자(RM)가 수행하는 것으로 가정합니다.

역할 및 현재 전문가:

*   **RM (Release Manager):**
    *   Hugo van Kemenade
    *   Thomas Wouters
    *   Pablo Galindo Salgado
    *   Łukasz Langa
*   **WE (Windows Expert):** Steve Dower
*   **ME (Mac Expert):** Ned Deily
*   **DE (Docs Expert):** Julien Palard

**참고:** RM은 릴리스 전날 전문가들에게 연락하는 것이 좋습니다. 전 세계가 다양한 시간대에 있기 때문에, RM은 전문가들이 바이너리 릴리스를 만들기에 충분한 시간에 릴리스 태그가 생성되도록 해야 합니다.

모든 전문가가 자신의 작업을 업데이트하기 전에 릴리스를 공개(웹사이트 업데이트 및 공지 전송)해서는 안 됩니다. Windows 또는 Mac 전문가가 부재중인 드문 경우, "(플랫폼) 바이너리는 곧 제공될 예정입니다"라는 메시지를 추가하고 진행할 수 있습니다.

아래 예시에서는 다음 규칙을 사용합니다. 릴리스 번호는 `3.X.YaN` 형식입니다. 예를 들어, Python 3.13.0 alpha 3의 경우 `3.13.0a3`이며, 여기서 "a"는 alpha, "b"는 beta, "rc"는 release candidate를 의미합니다.

릴리스 태그는 `v3.X.YaN`으로 명명됩니다. 마이너 릴리스 유지보수 브랜치의 이름은 `3.X`입니다.

가능한 한 릴리스는 `python/release-tools`라는 별도 저장소에 있는 `run_release.py` 스크립트에 의해 자동화되고 안내됩니다. 이는 다음 단계 중 많은 부분을 자동화하고, 일부 수동 단계를 수행하도록 안내합니다.

1.  **Discord에 로그인하여 Python Core Devs 서버에 가입합니다.** Thomas 또는 Łukasz에게 초대장을 요청하십시오. 전 세계의 다른 사람들과 조율해야 할 가능성이 높으므로, 이 통신 채널이 만남을 위한 장소입니다.

2.  **쇼스토퍼 버그(showstopper bugs)가 있는지 확인합니다.** `https://github.com/python/cpython/issues`로 이동하여 이 릴리스를 차단할 수 있는 열린 버그를 찾습니다. 두 가지 관련 레이블을 확인합니다:
    *   `release-blocker`: 릴리스를 즉시 중단시킵니다. 열린 `release-blocker` 버그가 있는 한 릴리스를 만들 수 없습니다.
    *   `deferred-blocker`: 이 릴리스를 차단하지는 않지만, 미래의 릴리스를 차단할 것입니다. 열린 `deferred-blocker` 버그가 있는 한 최종(final) 또는 후보(candidate) 릴리스를 만들 수 없습니다.
    릴리스 블로커를 검토하고 해결하거나, `deferred`로 낮추거나, 릴리스를 중단하고 커뮤니티의 도움을 요청합니다. 최종 또는 후보 릴리스를 만들 경우, 열린 `deferred` 버그에 대해서도 동일하게 수행합니다.

3.  **안정적인 빌드봇(buildbots)을 확인합니다.** `https://buildbot.python.org/all/#/release_status`로 이동합니다. 만들고 있는 릴리스의 빌드봇을 확인합니다. 오프라인 상태인 빌드봇은 무시합니다 (또는 커뮤니티에 알려 다시 시작하도록 합니다). 남은 빌드봇이 (대부분) 녹색이면 진행할 수 있습니다. 오프라인이 아닌 빨간색 빌드봇이 있다면, 수정될 때까지 릴리스를 보류하는 것이 좋습니다. 문제점을 검토하고, 알파, 베타 또는 최종 릴리스 중 어떤 것을 만들고 있는지 고려하여 판단을 내리십시오.

4.  **릴리스 클론(release clone)을 만듭니다.** GitHub의 CPython 저장소 포크(fork)에서 릴리스 브랜치를 생성합니다 (이제부터 "릴리스 클론"이라고 부릅니다). CPython 개발에 사용하는 동일한 GitHub 포크를 사용할 수 있습니다. Python 개발자 가이드에서 권장하는 표준 설정에 따라, 포크는 `origin`으로, 표준 CPython 저장소는 `upstream`으로 참조됩니다. 포크의 브랜치를 사용하여 릴리스 태그 지정 및 바이너리 생성을 위해 다른 전문가들과 공유하는 등 릴리스 엔지니어링 작업을 수행합니다.

    최종 또는 릴리스 후보 2+ 릴리스의 경우, 마지막 릴리스 후보 이후 병합된 모든 변경 사항 중에서 다음 RC 또는 최종 릴리스를 위한 변경 사항의 하위 집합을 `cherry-pick`할 예정이라면, 가장 최근 릴리스 후보 태그(예: `v3.8.0rc1`)부터 시작하는 릴리스 엔지니어링 브랜치를 생성해야 합니다. 그런 다음 필요한 경우 표준 릴리스 브랜치에서 변경 사항을 릴리스 엔지니어링 브랜치로 `cherry-pick`하고 평소대로 진행합니다. 이전 RC 이후의 모든 변경 사항을 가져올 예정이라면 평소대로 진행할 수 있습니다.

    릴리스 클론의 현재 브랜치가 릴리스하려는 브랜치인지 확인합니다 (`git status`).

5.  **`blurb release <version>`을 실행하여 버전 번호를 지정합니다.** (예: `blurb release 3.4.7rc1`). 이는 모든 최근 뉴스 요약(news blurbs)을 이 릴리스의 버전 번호가 표시된 단일 파일로 병합합니다.

6.  **`Lib/pydoc-topics.py`를 재생성합니다.** Doc 디렉토리에서 다음을 실행합니다.
    ```bash
    make pydoc-topics
    cp build/pydoc-topics/topics.py ../Lib/pydoc_data/topics.py
    ```

7.  **`pydoc_topics.py` 변경 사항을 커밋합니다** (및 문서에서 수정한 모든 내용).

8.  **`configure` 또는 기타 Autoconf 생성 파일이 이전 또는 이후 버전으로 마지막으로 커밋되어 잘못되거나 해로운 차이가 포함될 수 있는 경우, 현재 승인된 표준 버전을 사용하여 `autoconf`를 실행하는 것을 고려합니다.** 현재 Autoconf 2.71이 사실상의 표준입니다. 차이가 있다면 커밋합니다.

9.  **`Doc/tools/extensions/pyspecific.py`의 `SOURCE_URI`가 Git 저장소의 올바른 브랜치(`main` 또는 `3.X`)를 가리키는지 확인합니다.** 새 브랜치 릴리스의 경우, 파일의 브랜치를 `main`에서 새로 생성할 릴리스 브랜치(`3.X`)로 변경합니다.

10. **릴리스 스크립트를 통해 버전 번호를 업데이트합니다:**
    ```bash
    .../release-tools/release.py --bump 3.X.YaN
    ```
    **알림:** `X`, `Y`, `N`은 정수여야 합니다. `a`는 `a`, `b`, 또는 `rc` 중 하나여야 합니다 (예: `3.4.3rc1`). 최종 릴리스의 경우 `aN`을 생략합니다 (예: `3.4.3`). 새 버전의 첫 번째 릴리스의 경우 `Y`는 `0`이어야 합니다 (예: `3.6.0`).

    이것은 다양한 릴리스 번호 업데이트를 자동화하지만, 몇몇 파일은 수동으로 수정해야 합니다. `$EDITOR` 환경 변수가 올바르게 설정되어 있으면 `release.py`가 편집해야 할 파일이 있는 편집기 창을 띄울 것입니다.

11. **`blurb`가 생성한 `Misc/NEWS` 파일을 검토하고 필요에 따라 편집합니다.** 모든 변경 사항이 커밋되었는지 확인합니다 (`release.py --bump`는 변경 사항을 커밋하지 않습니다). 최종 주요 릴리스의 경우, `Doc/whatsnew/3.X.rst`의 첫 번째 단락을 실제 릴리스 날짜를 포함하도록 편집합니다. 예를 들어, "Python 2.5 was released on August 1, 2003."과 같이 말입니다. 알파 또는 베타 릴리스의 경우 이를 편집할 필요는 없습니다. 이 디렉토리에서 `git status`를 수행합니다. 어떠한 파일도 보이지 않아야 합니다. 즉, 작업 디렉토리에 커밋되지 않은 변경 사항이 없어야 합니다.

12. **`3.X.YaN`에 대한 릴리스 태그를 지정합니다:**
    ```bash
    .../release-tools/release.py --tag 3.X.YaN
    ```
    이것은 `-s` 옵션과 함께 `git tag` 명령을 실행하여 저장소의 릴리스 태그가 GPG 키로 서명되도록 합니다. 릴리스 타볼(tarballs) 등에 서명하는 데 사용하는 개인 키를 선택하라는 메시지가 나타나면 선택합니다.

    `begin security-only mode` 및 `end-of-life` 릴리스의 경우, 두 파일을 검토하고 모든 활성 브랜치에서 버전을 accordingly 업데이트합니다.

13. **커밋을 GitHub 포크의 원격 릴리스 브랜치로 푸시합니다:**
    ```bash
    # 먼저 dry run을 수행합니다.
    git push --dry-run --tags origin
    # GitHub 포크로 푸시하는지 확인합니다.
    # *메인 python/cpython 저장소가 아닙니다!*
    git push --tags origin
    ```

14. **`python/release-tools`에서 `build-release` 워크플로로 이동하여 "Run workflow"를 선택하고 방금 생성한 태그의 세부 정보를 입력합니다.** 이는 다음 단계를 수행합니다.
    *   소스 gzip 및 xz 타볼을 생성합니다.
    *   문서 tar 및 zip 파일을 생성합니다.
    *   완전히 깨끗하고 순수한 빌드가 회귀 테스트를 통과하는지 확인하기 위해 소스 타볼을 검사합니다.
    *   Android 바이너리를 빌드하고 테스트합니다 (Python 3.14 이상인 경우).
    결과 아티팩트는 GitHub 워크플로의 요약 페이지에 첨부됩니다. 소스 타볼을 사용할 수 있게 되면, 다운로드하여 압축을 풀어 내용이 합리적인지, 불필요한 `.pyc` 파일 등이 없는지 확인합니다. 테스트가 통과하면 타볼이 괜찮다고 확신할 수 있습니다. 일부 테스트가 실패하거나, 새로 압축 해제된 디렉토리에 이상한 점이 있다면 즉시 중단하고 문제점을 파악해야 합니다.

15. **전문가들에게 바이너리 빌드를 시작할 수 있다고 알립니다.**
    **경고: 중단!** 이 시점에서 릴리스를 생성하려면 다른 전문가들로부터 "녹색 신호(green light)"를 받아야 합니다. 기다리는 동안 할 수 있는 일들이 있으므로 다음 "중단" 지점까지 계속 읽으십시오.

    WE는 `.azure-pipelines/windows-release/`의 Azure Pipelines 빌드 스크립트(현재 `https://dev.azure.com/Python/cpython/_build?definitionId=21`에 설정됨)를 사용하여 Windows 파일을 생성하고 게시합니다.

    빌드 프로세스는 여러 단계로 실행되며, 각 단계의 출력은 다운로드 가능한 아티팩트로 제공됩니다. 단계는 다음과 같습니다.
    *   프로필 가이드 최적화(profile-guided optimization) 실행을 포함하여 모든 바이너리 변형(32비트, 64비트, debug/release)을 컴파일합니다.
    *   Python 문서가 포함된 HTML Help 파일을 컴파일합니다.
    *   PSF의 인증서로 모든 바이너리에 코드 서명을 합니다.
    *   `python.org`, `nuget.org`, 임베더블 배포판(embeddable distro) 및 Windows 스토어용 패키지를 생성합니다.
    *   설치 프로그램에 대한 기본 검증을 수행합니다.
    *   `python.org` 및 `nuget.org`에 패키지를 업로드하고, 다운로드 캐시를 제거하며, 테스트 다운로드를 실행합니다.
    업로드가 완료되면 WE는 빌드 로그에서 생성된 해시(hash)를 복사하여 RM에게 이메일로 보냅니다. Windows 스토어 패키지는 WE가 수동으로 `https://partner.microsoft.com/dashboard/home`에 업로드합니다.

    ME는 Mac 설치 프로그램 패키지를 빌드하고 GPG 서명 파일과 함께 `downloads.nyc1.psf.io`에 업로드합니다.

16. **`build-release` 워크플로에 의해 빌드된 모든 파일을 서명, SBOM(Software Bill of Materials) 등과 함께 `downloads.nyc1.psf.io`의 홈 디렉토리로 `scp` 또는 `rsync`를 사용하여 전송합니다.** 파일을 업로드하는 동안 나머지 작업을 계속할 수 있습니다. 또한 Discord 및/또는 `discuss.python.org`의 사람들에게 파일 업로드가 완료되면 다운로드하여 각자의 플랫폼에서 테스트해 달라고 요청할 수 있습니다.

17. **이제 `downloads.nyc1.psf.io`로 이동하여 모든 파일을 제자리에 옮겨야 합니다.** 우리의 정책은 모든 Python 버전이 자체 디렉토리를 갖지만, 각 디렉토리에는 해당 버전의 모든 릴리스가 포함되는 것입니다.
    `downloads.nyc1.psf.io`에서 `/srv/www.python.org/ftp/python/3.X.Y`로 이동하고 필요한 경우 생성합니다. `downloads` 그룹이 소유하고 그룹 쓰기 가능하도록 확인합니다. 위에서 홈 디렉토리에 업로드한 파일을 릴리스 디렉토리로 이동합니다. Windows/Mac 바이너리는 일반적으로 전문가들이 직접 그곳에 배치합니다.

    파일이 전 세계적으로 읽기 가능하도록 확인합니다. 또한 그룹 쓰기 가능하고 `downloads` 그룹이 소유해야 합니다. `gpg --verify`를 사용하여 파일이 손상 없이 업로드되었는지 확인합니다.

    이것이 최종(final) 또는 RC(Release Candidate) 릴리스인 경우: `doc` zip 파일과 타볼을 `/srv/www.python.org/ftp/python/doc/3.X.Y[rcA]`로 이동하고, 필요한 경우 디렉토리를 생성한 다음 `.../doc`의 "current" 심볼릭 링크(symlink)를 해당 디렉토리를 가리키도록 조정합니다. 그러나 이전 버전의 유지보수 릴리스를 릴리스하는 경우 "current" 링크를 변경하지 마십시오.

    이것이 최종 또는 RC 릴리스인 경우 (유지보수 릴리스라도), HTML 문서도 `docs.nyc1.psf.io`의 `/srv/docs.python.org/release/3.X.Y[rcA]`에 압축 해제합니다. 파일이 `docs` 그룹에 속하고 그룹 쓰기 가능하도록 확인합니다. DE가 문서가 제대로 빌드되고 작동하는지 확인하도록 합니다. 문서와 다운로드 모두 캐싱 CDN 뒤에 있습니다. 웹사이트를 통해 다운로드한 후 아카이브를 변경하면 CDN에서 오래된 데이터를 다음과 같이 제거해야 합니다.
    ```bash
    curl -X PURGE https://www.python.org/ftp/python/3.12.0/Python-3.12.0.tar.xz
    ```
    사람들이 릴리스 파일을 탐색하는 데 사용하므로 항상 디렉토리 목록의 캐시를 제거해야 합니다.
    ```bash
    curl -X PURGE https://www.python.org/ftp/python/3.12.0/
    ```

18. **극도로 신중하다면, 릴리스에 대한 완전히 깨끗한 테스트를 수행합니다.** 여기에는 `www.python.org`에서 타볼을 다운로드하는 것이 포함됩니다. md5 체크섬이 일치하는지 확인합니다. 그런 다음 타볼의 압축을 해제하고 깨끗하게 `make test`를 수행합니다.
    ```bash
    make distclean
    ./configure
    make test
    ```
    회귀 테스트 스위트가 통과하는지 확인하기 위함입니다. 그렇지 않으면 어딘가에서 잘못된 것입니다!

    **경고: 중단 및 확인!**
    *   WE로부터 녹색 신호를 받았습니까?
    *   ME로부터 녹색 신호를 받았습니까?
    *   DE로부터 녹색 신호를 받았습니까?
    녹색 신호를 받았다면, 릴리스 엔지니어링 브랜치를 메인 저장소로 다시 병합할 시간입니다.

19. **변경 사항을 GitHub에 푸시하려면, 일시적으로 관리자에 대한 브랜치 보호를 비활성화해야 합니다.** `Settings | Branches` 페이지로 이동합니다. `https://github.com/python/cpython/settings/branches`
    릴리스하는 브랜치의 설정을 "편집"합니다. 해당 브랜치의 설정 페이지가 로드됩니다. "Include administrators" 상자의 체크를 해제하고 하단의 "Save changes" 버튼을 누릅니다.

20. **릴리스 클론을 메인 개발 저장소로 병합합니다:**
    ```bash
    # upstream 저장소 브랜치의 깨끗한 복사본
    git clone git@github.com:python/cpython.git merge
    cd merge
    # 올바른 브랜치를 체크아웃합니다:
    # 1. 새로운 브랜치 릴리스를 포함하는 기능 사전 릴리스,
    #    즉 알파 및 첫 번째 베타의 경우
    git checkout main
    # 2. 그 외 모든 다른 릴리스의 경우, 적절한 릴리스 브랜치를 체크아웃합니다.
    git checkout 3.X
    # 클론 저장소에서 새로 생성되고 서명된 태그를 가져옵니다.
    git fetch --tags git@github.com:your-github-id/cpython.git v3.X.YaN
    # 임시 릴리스 엔지니어링 브랜치를 다시 병합합니다.
    git merge --no-squash v3.X.YaN
    git commit -m 'Merge release engineering branch'
    ```

    이것이 `new branch` 릴리스, 즉 첫 번째 베타인 경우, 이제 새로운 릴리스 브랜치를 생성합니다.
    ```bash
    git checkout -b 3.X
    ```

    새로운 릴리스 브랜치를 설정하는 데 필요한 단계를 수행합니다. 여기에는 다음이 포함됩니다.
    *   `README.rst`에서 `main`에 대한 모든 참조를 새 브랜치로 변경합니다 (특히 GitHub 저장소 URL).

21. **모든 릴리스에 대해 릴리스 스크립트를 사용하여 안내된 릴리스 후 단계를 수행합니다:**
    ```bash
    .../release-tools/release.py --done 3.X.YaN
    ```

    최종(final) 또는 릴리스 후보 2+ 릴리스의 경우, 병합 후 일부 정리가 필요할 수 있습니다. 최상위 `README.rst` 및 `include/patchlevel.h` 파일을 확인하여 현재 진행 중인 개발에 대한 원하는 릴리스 후 값을 반영하는지 확인합니다. `patchlevel`은 릴리스 태그에 `+`가 붙어야 합니다. 또한, 이 릴리스를 위해 표준 릴리스 브랜치에서 릴리스 엔지니어링 브랜치로 변경 사항을 `cherry-pick`한 경우, 이제 `Misc/NEWS.d/next` 디렉토리에서 `cherry-pick`된 각 `blurb` 항목을 수동으로 제거해야 합니다. 이는 해당 `blurb` 항목이 새 릴리스의 병합된 `x.y.z.rst` 파일에 이미 캡처되었기 때문입니다. 그렇지 않으면 `blurb` 항목이 `changelog.html` 파일에 두 번 나타납니다 (한 번은 Python `next` 아래, 다른 한 번은 `x.y.z` 아래).

    이러한 변경 사항을 검토하고 커밋합니다.
    ```bash
    git commit -m 'Post release updates'
    ```

    이것이 `new branch` 릴리스(예: 첫 번째 베타)인 경우, 다음 기능 릴리스 개발을 시작하기 위해 `main` 브랜치를 업데이트합니다. 완료되면 `main` 브랜치는 이제 Python `X.Y+1`을 빌드할 것입니다.

    먼저, `main`을 다음 릴리스, 즉 `X.Y+1.a0`로 설정합니다.
    ```bash
    git checkout main
    .../release-tools/release.py --bump 3.9.0a0
    ```

    *   `README.rst`의 모든 버전 참조를 편집합니다.
    *   `Doc/tutorial/interpreter.rst`를 편집합니다 (두 개의 '[Pp]ython3x' 참조, 하나의 'Python 3.x' 참조, 또한 배너의 날짜를 일관성 있게 만듭니다).
    *   `Doc/tutorial/stdlib.rst` 및 `Doc/tutorial/stdlib2.rst`를 편집합니다 (각각 하나의 '[Pp]ython3x' 참조가 있습니다).
    *   새로운 `whatsnew/3.x.rst` 파일을 추가하고 (`whatsnew/index.rst`의 `toctree`에 추가) 이전 파일에서 상단 근처의 주석과 최상위 섹션을 복사합니다. 하지만 `blurb`에 대한 초기 중간 스트림 변경으로 인해 이전 릴리스에서 `whatsnew/3.x.rst`의 초기 체크인이 잘못될 수 있으므로 주의해야 합니다! 순환을 끊는 데 도움을 주십시오: 필요한 경우 다음 변경을 수행하십시오.
        ```diff
        -For full details, see the :source:`Misc/NEWS` file.
        +For full details, see the :ref:`changelog <changelog>`.
        ```
    *   `configure.ac`의 버전 번호를 업데이트하고 `autoconf`를 다시 실행합니다.
    *   `Doc/tools/extensions/pyspecific.py`의 `SOURCE_URI`가 `main`을 가리키는지 확인합니다.
    *   `python38`을 참조하는 Windows 빌드의 버전 번호를 업데이트합니다.
        ```bash
        ls PC/pyconfig.h.in PCbuild/rt.bat | xargs sed -i 's/python3\(\.\?\)[0-9]\+/python3\19/g'
        ```
    *   `.github/ISSUE_TEMPLATE/`의 `bug.yml` 및 `crash.yml` 이슈 템플릿을 편집하여 "versions" 드롭다운에 새 브랜치를 추가합니다.
    이러한 변경 사항을 `main` 브랜치에 커밋합니다.
    ```bash
    git status
    git add ...
    git commit -m 'Bump to 3.9.0a0'
    ```
    이 디렉토리에서 다시 `git status`를 수행합니다. 어떠한 파일도 보이지 않아야 합니다. 즉, 작업 디렉토리에 커밋되지 않은 변경 사항이 없어야 합니다.

22. **메인 저장소에 커밋하고 푸시합니다:**
    ```bash
    # 먼저 dry run을 수행합니다.
    # **new branch** 릴리스 이전의 기능 사전 릴리스,
    # 즉 기능 알파 릴리스의 경우:
    git push --dry-run --tags git@github.com:python/cpython.git main
    # 괜찮아 보인다면 실행합니다. 되돌릴 수 없습니다!
    git push --tags git@github.com:python/cpython.git main

    # **new branch** 릴리스, 즉 첫 번째 베타의 경우:
    git push --dry-run --tags git@github.com:python/cpython.git 3.X
    git push --dry-run --tags git@github.com:python/cpython.git main
    # 괜찮아 보인다면 실행합니다. 되돌릴 수 없습니다!
    git push --tags git@github.com:python/cpython.git 3.X
    git push --tags git@github.com:python/cpython.git main

    # 그 외 모든 릴리스의 경우:
    git push --dry-run --tags git@github.com:python/cpython.git 3.X
    # 괜찮아 보인다면 실행합니다. 되돌릴 수 없습니다!
    git push --tags git@github.com:python/cpython.git 3.X
    ```

    이것이 `new branch` 릴리스인 경우, 새로 생성된 브랜치(`3.X`)에 대한 브랜치 보호 규칙을 추가합니다. 이전 릴리스 브랜치(`3.X-1`)의 값을 템플릿으로 사용합니다. `https://github.com/python/cpython/settings/branches`

    또한 `3.x` 및 `needs backport to 3.X` 레이블을 GitHub 저장소에 추가합니다. `https://github.com/python/cpython/labels`

23. **이제 GitHub에서 관리자에 대한 브랜치 설정 적용을 다시 활성화할 수 있습니다.** `Settings | Branch` 페이지로 돌아갑니다. `https://github.com/python/cpython/settings/branches`
    릴리스하는 브랜치의 설정을 "편집"합니다. "Include administrators" 상자를 다시 체크하고 하단의 "Save changes" 버튼을 누릅니다.

24. **이제 웹사이트를 조정할 시간입니다.** 죄송하지만 이 중 거의 자동화된 것은 없습니다. 이 단계를 수행하려면 웹사이트를 편집할 권한이 있어야 합니다. 권한이 없다면 `pydotorg@python.org`의 누군가에게 적절한 권한을 요청하십시오.

25. **`https://www.python.org/admin`에 로그인합니다.** 릴리스에 대한 새로운 "릴리스"를 생성합니다. 현재 "Releases"는 "Downloads" 아래에 정렬되어 있습니다. 가장 쉬운 방법은 아마도 기존 Python 릴리스 "페이지"에서 필드를 복사하여 편집하는 것입니다. 양식의 "Release page" 필드는 비워둡니다. 릴리스를 "저장"합니다.

26. **다운로드 가능한 파일로 릴리스를 채웁니다.** 여러분의 친구 Georg Brandl이 `add_to_pydotorg.py`라는 멋진 도구를 만들었습니다. `python/release-tools` 저장소( `release.py` 옆)에서 찾을 수 있습니다. `downloads.nyc1.psf.io`에서 다음과 같이 도구를 실행합니다.
    ```bash
    AUTH_INFO=<username>:<python.org-api-key> python add_to_pydotorg.py <version>
    ```
    이것은 `<version>`에 대한 올바른 다운로드 디렉토리를 탐색하고 `<version>`으로 표시된 파일을 찾아 웹사이트의 올바른 "release"에 대한 "Release Files"를 이러한 파일로 채웁니다. 이 스크립트가 실행될 때마다 해당 버전의 "Release Files"가 지워진다는 점에 유의하십시오. 원하는 디렉토리에서 실행할 수 있으며, 파일이 변경되는 경우 원하는 만큼 여러 번 실행할 수 있습니다. `dl-files`의 홈 디렉토리에 복사본을 보관하고 최신 상태로 유지하십시오.

    릴리스에 새로운 유형의 파일이 추가되면, 누군가는 `add_to_pydotorg.py`를 업데이트하여 이 새로운 파일을 인식하도록 해야 합니다. (파일 유형이 제거될 때도 `add_to_pydotorg.py`를 업데이트하는 것이 가장 좋습니다.)

    이 스크립트는 이 시점까지 Sigstore로 서명되지 않은 나머지 파일도 서명합니다. 다시 말하지만, 이 경우 `@python.org` 주소를 이 과정에 사용하십시오. 추가 정보: `https://www.python.org/download/sigstore/`

    CDN이 파일이 없는 다운로드 페이지 버전을 이미 캐시한 경우, 다음을 사용하여 캐시를 무효화할 수 있습니다.
    ```bash
    curl -X PURGE https://www.python.org/downloads/release/python-XXX/
    ```

27. **이것이 최종(final) 릴리스인 경우:**
    *   새 버전을 Python Documentation by Version 페이지(`https://www.python.org/doc/versions/`)에 추가하고, 현재 버전을 'in development' 섹션에서 제거합니다.
    *   `3.X.Y`의 경우, 이전 `X.Y` 릴리스의 페이지를 모두 편집하여 새 릴리스를 가리키도록 합니다. 여기에는 다운로드 -> 릴리스 항목의 `content` 필드가 포함됩니다.
        ```text
        Note: Python 3.x.(y-1) has been superseded by `Python 3.x.y </downloads/release/python-3xy/>`_.
        ```
        또한 별도의 릴리스 페이지 항목이 있는 릴리스의 경우 (단계적으로 폐지되고 있나요?), 해당 페이지도 업데이트합니다. 예를 들어 `download/releases/3.x.y`와 같이 말입니다.
        ```text
        Note: Python 3.x.(y-1) has been superseded by `Python 3.x.y </download/releases/3.x.y/>`_.
        ```

28. **"Current Pre-release Testing Versions" 웹 페이지를 업데이트합니다.** 현재 테스트 중인 모든 Python 버전을 나열하는 페이지가 있습니다. `https://www.python.org/download/pre-releases/`
    릴리스를 만들 때마다 어떤 식으로든 이 페이지를 업데이트해야 합니다.
    *   `3.x.0` 이전 버전을 릴리스하는 경우, 이 페이지에 추가하고 필요에 따라 이전 `3.x` 사전 릴리스를 제거해야 합니다.
    *   `3.x.0 final`을 릴리스하는 경우, 이 페이지에서 사전 릴리스 버전을 제거해야 합니다.
    이것은 Django 기반 웹사이트의 "Pages" 카테고리에 있으며, 해당 UI를 통해 찾는 것은 다소 번거롭습니다. 하지만! 관리 인터페이스에 이미 로그인되어 있다면 (이 시점에서는 로그인되어 있어야 합니다), Django는 페이지 상단에 편리한 "Edit this page" 링크를 추가할 것입니다. 따라서 위 링크를 따라가서 "Edit this page" 링크를 클릭하고 필요에 따라 변경 사항을 적용하기만 하면 됩니다. 정말 편리하죠!

29. **적절하다면, "Python Documentation by Version" 페이지를 업데이트합니다:** `https://www.python.org/doc/versions/`
    이 페이지는 버전 번호별로 모든 Python 릴리스를 나열하고 해당 정적(매일 빌드되지 않는) 온라인 문서로 연결됩니다. 하단에는 개발 중인 버전 목록이 있으며, 모든 알파/베타/RC가 여기에 포함되어야 합니다. 위 링크를 클릭한 다음 멋진 "Edit this page" 버튼을 누를 수 있어야 합니다.

30. **`discuss.python.org`에 공지사항을 작성합니다.** 이 부분은 자동화할 수 있는 것이 거의 없기 때문에 모호한 부분입니다. 이전 공지사항을 템플릿으로 사용할 수 있지만, 내용을 편집해야 합니다! 공지사항이 Discourse에 올라오면 다음 메일링 리스트에 동일한 내용을 보냅니다.
    *   `python-list@python.org`
    *   `python-announce@python.org`
    또한 Python Insider 블로그에도 공지사항을 게시합니다. 새 항목을 추가하려면 Blogger 홈 페이지로 이동하십시오.

31. **릴리스 PEP(예: PEP 719)를 릴리스 날짜로 업데이트합니다.**

32. **`https://github.com/python/cpython/issues`의 레이블을 업데이트합니다:**
    *   모든 `deferred-blocker` 이슈를 다음 릴리스를 위해 다시 `release-blocker`로 전환합니다.
    *   열린 이슈를 검토합니다. 이는 숨어 있는 쇼스토퍼 버그를 찾거나, 사람들이 잊었던 쉬운 버그를 수정하도록 상기시켜 줄 수 있습니다.

33. **원격 릴리스 클론 브랜치를 저장소 클론에서 삭제할 수 있습니다.** 이것이 `new branch` 릴리스인 경우, 새로운 브랜치를 위해 개발 인프라의 다양한 부분을 업데이트해야 합니다. 여기에는 다음이 포함됩니다.
    *   새로운 브랜치에 대한 이슈 트래커를 업데이트합니다: 새 버전을 버전 목록에 추가합니다.
    *   새로운 브랜치와 버전을 반영하도록 devguide를 업데이트합니다.
    *   다운로드 페이지의 지원되는 릴리스 테이블을 업데이트하기 위한 PR을 생성합니다 ( `python/pythondotorg#1302` 참조).
    *   새로운 브랜치에 대한 빌드봇이 정의되었는지 확인합니다 (Łukasz 또는 Zach Ware에게 문의).
    *   새로운 브랜치에 필요한 경우 다양한 GitHub 봇이 업데이트되었는지 확인합니다. 특히 새로운 브랜치로의 백포트가 작동하는지 확인합니다 (core-workflow 팀에 문의).
    *   `main` 및 새로운 릴리스 브랜치의 가장 최근 커밋 기록을 검토하여 릴리스 엔지니어링 단계 중에 `main` 브랜치에 병합되었을 수 있는 변경 사항을 식별하고 릴리스 브랜치로 백포트합니다.
    *   `main` 및 새로운 릴리스 브랜치에 대한 새로운 PR에 대해 CI가 작동하는지, 릴리스 브랜치가 제대로 보호되는지 (직접 푸시 금지 등) 확인합니다.
    *   온라인 문서가 제대로 빌드되는지 확인합니다 (웹사이트에서 완전한 빌드에는 최대 24시간이 걸릴 수 있습니다).

## 다음 단계 (What Next?)

**확인!** 사용자인 척하십시오: `www.python.org`에서 파일을 다운로드하고, 그것으로 Python을 만드십시오. 이 단계는 간과하기 너무 쉽고, 여러 번 쓸모없는 릴리스 파일이 발생했습니다. 한 번은 일반적인 서버 문제로 모든 파일이 알 수 없는 방식으로 손상되었고, 한 번은 소스 타볼이 잘못 빌드되었으며, 여러 번 SF의 파일 업로드 프로세스가 파일을 잘라냈습니다.

기뻐하십시오. 마시고. 즐기십시오. 이와 같은 PEP를 작성하십시오. 아니면 Guido처럼 휴가를 떠나십시오.

방금 Python 릴리스를 만들었습니다!

## 수명 종료 (End-of-life)로 이동 (Moving to End-of-life)

현재 정책에 따라, 릴리스 브랜치는 일반적으로 초기 릴리스 후 5년이 지나면 수명 종료 상태에 도달합니다. 이 정책은 Python 개발자 가이드에서 더 자세히 논의됩니다. 수명 종료에 도달하면 릴리스 관리자로서 직접 수행하거나 다른 사람이 수행하도록 보장해야 하는 여러 작업이 있습니다. 그 작업 중 일부는 다음과 같습니다.

*   선택적으로 최종 릴리스를 만들어 아직 릴리스되지 않은 변경 사항을 게시합니다.
*   현재 HEAD의 태그를 생성한 다음 CPython 저장소에서 브랜치를 삭제하여 릴리스 브랜치의 상태를 고정합니다. 현재 HEAD는 브랜치의 최종 보안 릴리스와 같거나 그 이후여야 합니다.
    ```bash
    git fetch upstream
    git tag --sign -m 'Final head of the former 3.3 branch' 3.3 upstream/3.3
    git push upstream refs/tags/3.3
    ```
    모든 것이 잘 보인다면 브랜치를 삭제합니다. 이를 위해서는 저장소 관리자 권한이 있는 사람의 도움이 필요할 수 있습니다.
    ```bash
    git push upstream --delete 3.3
    # 또는 GitHub 설정 페이지에서 수행
    ```
*   다운로드 페이지의 "Active Python Releases" 목록에서 릴리스를 제거합니다. 이렇게 하려면 `python.org`의 관리 페이지에 로그인하여 `Boxes`로 이동하고 `downloads-active-releases` 항목을 편집합니다. 해당 릴리스의 관련 HTML 단락을 제거합니다. (변경 사항을 올바르게 적용했는지 확인하려면 `curl -X PURGE` 트릭을 사용하여 캐시를 제거해야 할 것입니다.)
*   은퇴한 브랜치에 대한 `python.org`의 각 릴리스 페이지에 은퇴 알림을 추가합니다. 예를 들어:
    *   `https://www.python.org/downloads/release/python-337/`
    *   `https://www.python.org/downloads/release/python-336/`
*   개발자 가이드에서 브랜치 상태를 `end-of-life`로 설정하고, devguide의 다른 곳에 있는 브랜치 참조를 업데이트하거나 제거합니다.
*   이슈 트래커에서 릴리스를 은퇴시킵니다. 작업에는 다음이 포함됩니다.
    *   이 버전의 이슈를 다음 지원 버전으로 업데이트합니다.
    *   버전 목록에서 버전 레이블을 제거합니다.
    *   은퇴한 버전에 대한 `needs backport to` 레이블을 제거합니다.
    *   이 브랜치로 표시된 열린 이슈를 검토하고 처리합니다.
*   온라인 문서의 최종 빌드를 실행하여 `end-of-life` 배너를 추가합니다.
*   일반적인 장소에 브랜치 은퇴를 공지합니다.
    *   `discuss.python.org`
    *   메일링 리스트 (`python-dev`, `python-list`, `python-announcements`)
    *   Python Dev 블로그
*   은퇴를 즐기고 잘 해낸 일의 영광을 누리십시오!

## Windows 관련 참고 사항 (Windows Notes)

Windows에는 MSI 설치 프로그램이 있으며, 다양한 Windows 버전에는 "특별한 제한 사항"이 있고, Windows 설치 프로그램은 사전 컴파일된 "외부" 바이너리(Tcl/Tk, expat 등)도 포함합니다.

설치 프로그램은 Azure Pipeline의 일부로 테스트됩니다. 과거에는 이러한 단계가 수동으로 수행되었습니다. 이는 기록을 위해 보관하고 있습니다.

설치 프로그램을 업로드하는 동시에, WE는 설치 프로그램을 사용하여 Python을 두 번 설치합니다. 한 번은 설치 프로그램이 제안하는 기본 디렉토리에, 다른 한 번은 이름에 공백이 포함된 디렉토리에 설치합니다. 각 설치에 대해 WE는 DOS 상자에서 전체 회귀 스위트를 실행하며, `-0` 옵션 사용 여부와 관계없이 실행합니다. 유지보수 릴리스의 경우, WE는 업그레이드 설치가 성공하는지 여부도 테스트합니다.

WE는 또한 시작 -> 메뉴 -> Python 그룹 아래에 생성된 모든 단축키를 시도합니다. 이 방식으로 IDLE을 시도할 때, 도움말 -> Python Documentation이 작동하는지 확인해야 합니다. 이 방식으로 pydoc을 시도할 때 ("Module Docs" 시작 메뉴 항목), "Start Browser" 버튼이 작동하는지 확인하고, 임의의 모듈(예: "random" <wink>)을 검색할 수 있는지, 그리고 "go to selected" 버튼이 작동하는지 확인해야 합니다.

여기서 얼마나 많은 것이 잘못될 수 있는지 놀랍습니다. 그리고 막판 체크인으로 이러한 것들 중 하나가 얼마나 자주 깨지는지 더욱 놀랍습니다. 당신이 "Windows 전문가"라면, 당신이 Windows에서 일상적으로 테스트하는 유일한 사람일 가능성이 높다는 것과 Windows가 단순히 엉망진창이라는 것을 명심하십시오.

각 대상 아키텍처에 대해 테스트를 반복합니다. 관리자 계정과 일반 사용자(Power User 아님) 계정 모두를 시도합니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.