---
title: "[Final] PEP 347 - Migrating the Python CVS to Subversion"
excerpt: "Python Enhancement Proposal 347: 'Migrating the Python CVS to Subversion'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/347/
toc: true
toc_sticky: true
date: 2025-09-26 18:56:24+0900
last_modified_at: 2025-09-26 18:56:24+0900
published: true
---
> **원문 링크:** [PEP 347 - Migrating the Python CVS to Subversion](https://peps.python.org/pep-0347/)
>
> **상태:** Final | **유형:** Process | **작성일:** 14-Jul-2004

PEP 347 – Python CVS를 Subversion으로 마이그레이션

## 개요
이 문서는 Python 소스 코드를 SourceForge.net의 CVS 저장소에서 svn.python.org의 Subversion 저장소로 이전할 것을 제안합니다.

## 도입 배경 (Rationale)
이번 변경은 두 가지 측면을 가집니다: CVS에서 Subversion으로의 전환, 그리고 SourceForge에서 python.org로의 전환입니다. 각각의 배경은 다음과 같습니다.

### Subversion으로의 전환 (Moving to Subversion)
CVS는 Subversion에서 개선된 여러 가지 한계를 가지고 있었습니다. Python 개발에 있어 가장 주목할 만한 개선 사항들은 다음과 같습니다.

*   **파일 및 디렉터리 이름 변경 및 삭제 이력 유지:** 파일 및 디렉터리 이름을 변경하거나 디렉터리를 삭제할 때도 해당 파일들의 이력을 계속 유지할 수 있습니다.
*   **Change Sets 지원:** 전역 리비전 번호를 통해 여러 파일에 대한 연관된 변경 사항(change sets)을 지원합니다. Change sets는 트랜잭션 방식으로 처리됩니다.
*   **원자적이고 빠른 태그 지정 (Tagging):** CVS 태그 작업은 몇 분이 걸릴 수 있었지만, Subversion 태그( `svn cp` )는 빠르고 원자적으로 완료됩니다. 브랜치(Branch) 작업 또한 매우 효율적입니다.
*   **오프라인 Diff 지원:** 패치를 생성할 때 유용한 오프라인 Diff 기능을 지원합니다.

### python.org로의 전환 (Moving to python.org)
SourceForge는 지난 몇 년간 중요한 인프라를 제공해 주었습니다. 하지만 SourceForge에 대한 관심은 과거에 반복적인 과부하 상황을 야기했으며, SourceForge 운영자들은 항상 제때 대응할 수 없었습니다. 특히 CVS의 경우, 익명 접근을 위한 두 번째 읽기 전용 CVS 서버를 도입하여 주 CVS 서버의 부하를 줄여야 했습니다. 이 서버는 주기적으로 동기화되지만, 읽기-쓰기 CVS 저장소와 동기화 사이에 지연이 발생했습니다. 결과적으로 커밋 권한이 없는 사용자들은 최근 저장소 변경 사항을 지연 후에야 볼 수 있었습니다.

python.org에서는 저장소를 익명으로 접근할 수 있도록 만들 수 있을 것입니다.

## 마이그레이션 절차 (Migration Procedure)
Python CVS 저장소를 이전하기 위해 다음 단계들이 실행되어야 합니다. 각 단계는 아래 섹션에서 더 자세히 설명됩니다.

1.  **SSH 키 수집:** 현재 모든 커미터(committer)들의 SSH 키와 커밋 메시지에 표시될 사용자 이름을 수집합니다.
2.  **SourceForge 저장소 폐쇄 공지:** 마이그레이션 시작 시 SourceForge 저장소 폐쇄를 공지합니다.
3.  **CVS 저장소 다운로드:** 마지막 커밋으로부터 24시간 후에 CVS 저장소를 다운로드합니다.
4.  **CVS 저장소 변환:** CVS 저장소를 Subversion 저장소로 변환합니다.
5.  **저장소 공개:** 커미터들에게는 쓰기 권한을, 익명 사용자들에게는 읽기 전용 접근 권한을 부여하여 저장소를 공개합니다.
6.  **SourceForge의 CVS 접근 비활성화:** SourceForge에서 CVS 접근을 비활성화합니다.

### SSH 키 수집 (Collect SSH keys)
`svn+ssh` 가 저장소에 대한 쓰기 접근을 위한 최적의 방법으로 선택되었습니다. 개발자들은 기존 SSH 키를 계속 사용할 수 있지만, python.org에 설치되어야 합니다.

각 개발자마다 새로운 Unix 사용자를 생성하는 것을 피하기 위해, `authorized_keys` 파일에 `command=` 속성을 가진 단일 계정을 사용해야 합니다.

`authorized_keys` 파일의 라인 예시는 다음과 같습니다 (가독성을 위해 줄 바꿈).

```
command="/usr/bin/svnserve --root=/svnroot -t --tunnel-user='<username>'",no-port-forwarding, no-X11-forwarding,no-agent-forwarding,no-pty ssh-dss <key> <comment>
```

사용자 이름으로는 SourceForge 계정 이름 대신 실제 이름을 사용하여 로그 메시지에서 사람들을 더 잘 식별할 수 있도록 합니다.

### 관리자 접근 (Administrator Access)
`pythondev` 계정에 대한 관리자 접근 권한은 현재 Python SourceForge 프로젝트의 모든 관리자에게 부여되어야 합니다. 셸(shell) 로그인과 `svnserve` 로그인을 구별하기 위해 관리자는 두 개의 키를 유지해야 합니다. OpenSSH를 사용하여 두 번째 키를 생성하는 절차는 다음과 같습니다.

```bash
cd .ssh
ssh-keygen -t DSA -f pythondev -C <user>@pythondev
vi config
```

`config` 파일에 다음 줄을 추가해야 합니다.

```
Host pythondev
Hostname dinsdale.python.org
User pythondev
IdentityFile ~/.ssh/pythondev
```

그러면 " `ssh pythondev` "를 통해 셸 로그인이 가능해집니다.

### CVS 저장소 다운로드 (Downloading the CVS Repository)
CVS 저장소는 다음 URL에서 다운로드할 수 있습니다.

`http://cvs.sourceforge.net/cvstarballs/python-cvsroot.tar.bz2`

이 `tarball`은 하루에 한 번만 생성되므로, 저장소 동결(repository freeze) 후에 `tarball`을 가져오기까지 시간이 좀 걸릴 수 있습니다. `python-commits` 메일링 리스트에 기록된 마지막 커밋이 `tarball`에 실제로 포함되었는지 확인해야 합니다.

변환 후 변환된 CVS `tarball`은 `www.python.org/archive/python-cvsroot-<date>.tar.bz2` 에 영구적으로 보관해야 합니다.

### CVS 저장소 변환 (Converting the CVS Repository)
Python CVS 저장소는 `distutils` 와 `python` 두 개의 모듈을 포함합니다. `python` 모듈은 다시 `dist` 와 `nondist` 로 구성되며, `dist` 는 `src` (실제 Python 코드)만 포함합니다. `nondist` 에는 다양한 하위 디렉터리가 있습니다.

이들은 `<project>/{trunk,tags,branches}` 구조를 따라 더 짧은 URL을 얻기 위해 Subversion 저장소에서 재구성되어야 합니다. 각 `nondist` 디렉터리, `src` ( `python` 이라고 명명), 그리고 `distutils` 에 대해 프로젝트가 생성될 것입니다. 저장소 재구성은 아래와 같이 CVS 트리에서 수행하는 것이 가장 좋습니다.

저장소 형식으로 `fsfs` 백엔드(Subversion 1.1 필요)를 사용해야 합니다. `fsfs` 백엔드는 `dump` 명령을 실행할 필요 없이 점진적 저장소 백업을 허용하므로 백업에 더 유리하다는 장점이 있습니다.

변환은 `cvs2svn` 유틸리티(예: `cvs2svn` Debian 패키지에서 사용 가능)를 사용하여 수행해야 합니다. `cvs2svn` 은 현재 `project/trunk` 구조를 지원하지 않으므로, 각 프로젝트는 개별적으로 변환되어야 합니다. 각 변환 결과를 대상 저장소의 별도 디렉터리에 넣으려면 `svnadmin load` 를 사용해야 합니다.

Subversion은 이진 파일과 텍스트 파일에 대해 CVS와 다른 관점을 가집니다. CVS 의미론을 올바르게 전달하기 위해, CVS에서 이진 파일로 표시되지 않은 모든 파일에 `svn:eol-style` 을 `native` 로 설정해야 합니다.

요약하자면, 변환 스크립트는 다음과 같습니다.

```sh
#!/bin/sh
rm cvs2svn-*
rm -rf python py.new
tar xjf python-cvsroot.tar.bz2
rm -rf python/CVSROOT
svnadmin create --fs-type fsfs py.new
mv python/python python/orig
mv python/orig/dist/src python/python
mv python/orig/nondist/* python # nondist/nondist is empty
rmdir python/nondist
rm -rf python/orig
for a in python/*
do
  b=`basename $a`
  cvs2svn -q --dump-only --encoding=latin1 --force-branch=cnri-16-start \
    --force-branch=descr-branch --force-branch=release152p1-patches \
    --force-tag=r16b1 $a
  svn mkdir -m"Conversion to SVN" file:///`pwd`/py.new/$b
  svnadmin load -q --parent-dir $b py.new < cvs2svn-dump
  rm cvs2svn-dump
done
```

이 변환의 샘플 결과는 `http://www.dcl.hpi.uni-potsdam.de/pysvn/` 에서 확인할 수 있습니다.

### 저장소 공개 (Publish the Repository)
저장소는 `http://svn.python.org/projects` 에 공개되어야 합니다. 모든 현재 SourceForge 커미터에게는 `svn+ssh://pythondev@svn.python.org/` 를 통해 읽기-쓰기 접근 권한을 부여하고, 웹DAV(WebDAV)를 통한 읽기 전용 익명 접근 권한도 부여해야 합니다.

선택적으로 `websvn` (예: Debian `websvn` 패키지에서 사용 가능)을 제공할 수 있습니다. 하지만 테스트 설치에서는 `websvn` 이 메모리 부족으로 인해 작동이 중단되었습니다.

현재 SourceForge 프로젝트 관리자는 `pythondev` 계정의 `authorized_keys2` 파일에 대한 쓰기 권한을 얻어야 합니다.

### CVS 비활성화 (Disable CVS)
CVS를 완전히 비활성화하는 것은 불가능한 것으로 보입니다. 프로젝트 페이지에서 사용자 인터페이스만 제거할 수 있으며, 저장소 자체는 계속 사용할 수 있습니다. 필요하다면, `python` 및 `distutils` 모듈에 대한 쓰기 접근은 CVS `commitinfo` 항목을 통해 비활성화할 수 있습니다.

## 논의 (Discussion)
위 절차에 대한 몇 가지 대안이 제안되었습니다. 거부된 대안들은 여기서 간략하게 논의됩니다.

*   **다중 저장소 생성:** `python` 과 `distutils` 에 대해 각각 하나의 저장소를 생성하는 방안이 있었습니다. 이는 URL을 더 짧게 만들 수 있었겠지만, 단일 저장소가 프로젝트 간 코드 이동을 지원하므로 거부되었습니다.
*   **표준 `cvs2svn` 및 이름 변경을 통한 `project/trunk` 구조 생성:** 이는 이전 리비전이 최근 리비전과 다른 경로 이름을 사용한다는 단점이 있었습니다. `dump` 파일을 통한 제안된 접근 방식은 이름 변경 없이 작동합니다.
*   **python.org 호스팅에 대한 관리 부담:** 여러 사람이 python.org에 저장소를 호스팅하는 것이 `pydotorg` 관리자에게 발생시킬 관리 오버헤드에 대해 우려를 표했습니다. `BerliOS` 가 특정 대안으로 제안되기도 했습니다. `pydotorg` 관리자들 자신은 추가 작업량에 반대하지 않았으며, 과중한 업무가 발생할 경우 저장소를 다시 마이그레이션하는 것이 대안으로 제시되었습니다.
*   **다른 인증 전략:** `svn+ssh` 의 대안으로 다음과 같은 것들이 제안되었습니다.
    *   **SSL 및 기본 인증을 사용한 웹DAV(WebDAV)를 통한 Subversion:** `pydotorg` 에서 생성된 비밀번호를 사용자에게 메일로 보내는 방식이었습니다. 사람들이 이 접근 방식을 좋아하지 않았는데, 비밀번호를 기억할 수 없어 디스크에 저장해야 했기 때문이며, 이는 보안 위험이 됩니다.
    *   **SSL 클라이언트 인증서를 사용한 웹DAV(WebDAV)를 통한 Subversion:** 작동은 하겠지만, 인증 기관을 관리해야 하는 부담이 있었습니다.
*   **다른 호스팅 위치:** python.org 대신 다른 곳에서 호스팅하는 방안도 제안되었습니다. 이 대안이 무료여야 하는지 상업적이어야 하는지가 쟁점이었으며, 자원봉사자들의 부담을 줄이기 위해 상업적인 것이 더 낫다는 의견이 많았습니다.
    *   특히 `Greg Stein` 은 `http://www.wush.net/subversion.php` 를 제안했습니다. 이들은 월 90달러에 5GB, 월 200GB 다운로드를 제공하며, 데이터는 RAID 드라이브에 있고 완전히 백업됩니다. 익명 접근 및 이메일 커밋 알림이 지원됩니다. `wush.net` 에서 제공한 세부 정보는 다음과 같습니다.
        *   머신은 PowerVPS에서 호스팅되는 Virtuozzo Virtual Private Server (VPS)입니다.
        *   기본 저장소 URL은 `http://python.wush.net/svn/projectname/` 이지만, 다른 것도 가능합니다.
        *   sudo 기능이 있는 SSH 로그인을 머신에 제공받을 수 있습니다.
        *   관리용 웹 인터페이스가 있으며, 다양한 SVN 저장소와 사용자 계정을 관리할 수 있습니다.
        *   `svn+ssh` 는 지원되지만, 사용자 인터페이스는 아직 지원하지 않습니다.
        *   오프사이트 미러링/백업을 위해 저장소 `tarball` 다운로드 대신 `rsync` 사용을 제안했습니다.
    *   `Bob Ippolito` 는 상업 프로젝트에 `wush.net` 을 약 6개월간 사용했지만, 서비스가 3일 동안 중단되고 연락 가능한 사람이 없었으며, 서비스 재개 시 설명도 없었기 때문에 `wush.net` 을 떠났다고 보고했습니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.