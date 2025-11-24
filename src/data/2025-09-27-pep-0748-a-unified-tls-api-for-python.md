---
title: "[Draft] PEP 748 - A Unified TLS API for Python"
excerpt: "Python Enhancement Proposal 748: 'A Unified TLS API for Python'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/748/
toc: true
toc_sticky: true
date: 2025-09-27 13:35:46+0900
last_modified_at: 2025-09-27 13:35:46+0900
published: true
---
> **원문 링크:** [PEP 748 - A Unified TLS API for Python](https://peps.python.org/pep-0748/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 27-Jun-2024



# PEP 748 – Python을 위한 통합 TLS API

## 개요 (Abstract)
이 PEP는 프로토콜 클래스(protocol classes) 모음의 형태로 표준 TLS 인터페이스를 정의합니다. 이 인터페이스는 Python 구현체(implementations)와 서드파티 라이브러리가 `OpenSSL` 외의 다른 TLS 라이브러리에 대한 바인딩을 제공할 수 있도록 합니다. 이러한 바인딩은 Python 표준 라이브러리가 제공하는 인터페이스를 예상하는 도구에서 사용될 수 있으며, Python 생태계가 `OpenSSL`에 대한 의존성을 줄이는 것을 목표로 합니다.

## 배경 (Rationale)
견고하고 사용자 친화적인 TLS 지원은 모든 인기 프로그래밍 언어 생태계에서 매우 중요한 부분입니다. 오랫동안 Python 생태계에서 이 역할은 주로 `OpenSSL` 라이브러리에 대한 Python API를 제공하는 `ssl` 모듈에 의해 수행되어 왔습니다.

`ssl` 모듈이 Python 표준 라이브러리와 함께 배포되기 때문에, 이는 Python에서 TLS를 처리하는 가장 압도적으로 인기 있는 방법이 되었습니다. 표준 라이브러리와 Python Package Index의 대다수 Python 라이브러리가 TLS 연결을 위해 `ssl` 모듈에 의존하고 있습니다.

그러나 `ssl` 모듈의 우위는 Python 생태계 전체를 `OpenSSL`에 강하게 묶어버리는 여러 문제를 야기했습니다. 이로 인해 Python 사용자는 다른 TLS 구현체가 더 나은 사용자 경험을 제공할 수 있는 상황에서도 `OpenSSL`을 사용해야 했으며, 이는 인지적 부담을 주고 "플랫폼 고유(platform-native)" 경험을 제공하기 어렵게 만들었습니다.

### 문제점 (Problems)
`ssl` 모듈이 표준 라이브러리에 내장되어 있다는 사실은 모든 표준 라이브러리 Python 네트워킹 라이브러리가 Python 구현체가 링크된 `OpenSSL`에 전적으로 의존한다는 것을 의미합니다. 이는 다음과 같은 문제로 이어집니다:

*   새로운 고보안 TLS 기능을 활용하려면 새로운 `OpenSSL` 버전을 얻기 위해 Python을 재컴파일하는 것이 어렵습니다.
*   Python 배포판은 `OpenSSL` 사본과 함께 제공되어야 합니다. 이는 CPython 개발팀이 `OpenSSL` 재배포자가 되어 `OpenSSL` 취약점이 발표될 때 Windows Python 배포판에 보안 업데이트를 제공해야 할 수도 있다는 부담을 줍니다.
*   사용자는 유지보수 부담이나 `OpenSSL`이 플랫폼에 너무 크고 다루기 어렵다는 이유(예: 임베디드 Python)로 `OpenSSL` 외의 다른 TLS 라이브러리와 통합하기를 원할 수 있습니다.
*   현재 구현된 `ssl` 모듈은 CPython 자체가 대체 TLS 구현체에 대한 지원을 추가하거나, 필요한 경우 `OpenSSL` 지원을 완전히 제거하는 능력을 제한합니다. `ssl` 모듈은 너무 많은 `OpenSSL` 특정 함수 호출 및 기능을 노출하여 대체 TLS 구현체에 쉽게 매핑하기 어렵습니다.

## 제안 (Proposal)
이 PEP는 Python 3.14에 `OpenSSL`에 강력하게 묶여 있지 않은 TLS 기능을 제공하기 위해 몇 가지 새로운 프로토콜 클래스(Protocol Classes)를 도입할 것을 제안합니다. 또한, 가능한 한 이러한 프로토콜 클래스가 노출하는 인터페이스만 사용하도록 표준 라이브러리 모듈을 업데이트할 것을 제안합니다. 목표는 세 가지입니다:

1.  **공통 API 표면 제공:** 코어 개발자와 서드파티 개발자 모두가 TLS 구현을 대상으로 할 수 있는 공통 API를 제공합니다.
2.  **`OpenSSL` 특정 개념 유출 방지:** `ssl` 모듈에 `OpenSSL` 개념이 유출되어 발생하는 문제들을 새 프로토콜 클래스에서는 제거합니다.
3.  **`OpenSSL`을 여러 TLS 구현체 중 하나로:** Python이 TLS 지원을 위해 `OpenSSL`이 시스템에 존재해야 한다는 요구 사항 대신, `OpenSSL`을 여러 TLS 구현체 중 하나로 만들 수 있는 경로를 제공합니다.

제안된 인터페이스는 아래에 설명되어 있습니다.

## 인터페이스 (Interfaces)
표준화가 필요한 몇 가지 인터페이스가 있습니다.

*   **TLS 구성:** 현재 `ssl` 모듈의 `SSLContext` 클래스에 의해 구현됩니다.
*   **소켓 래핑:** 현재 `ssl` 모듈의 `SSLSocket` 클래스에 의해 구현됩니다.
*   **버퍼 래핑 (비동기 I/O를 위한 인메모리 암호화/복호화):** 현재 `ssl` 모듈의 `SSLObject` 클래스에 의해 구현됩니다.
*   **TLS 버전 지정:** `TLSVersion` 열거형을 사용하여 지원할 TLS 버전을 제한할 수 있습니다.
*   **오류 보고:** 현재 `ssl` 모듈의 `SSLError` 클래스에 의해 구현됩니다.

단순화를 위해 이 PEP는 (3)과 (4) 인터페이스를 제거하고, 소켓을 통해 이루어지는 모든 통신이 TLS로 보호되도록 하는 더 간단한 인터페이스로 대체할 것을 제안합니다. 즉, 이 인터페이스는 소켓 초기화, TLS 핸드셰이크, SNI(Server Name Indication) 등의 개념을 클라이언트 또는 서버 연결 생성의 원자적 부분으로 취급합니다. 그러나 인메모리 버퍼는 비동기 통신에 유용하므로 여전히 지원됩니다.

이 API는 현재 `SSLContext` 객체가 가정하는 책임, 특히 구성(configuration)을 보유하고 관리하는 책임과 해당 구성을 사용하여 버퍼 또는 소켓을 구축하는 책임을 분리할 것입니다.

이를 위해 `SSLContext`의 책임을 두 개의 별도 객체로 분리하며, 각각 클라이언트 및 서버 버전으로 나뉩니다. `TLSServerConfiguration` 및 `TLSClientConfiguration` 객체는 TLS 구성의 컨테이너 역할을 합니다. `ClientContext` 및 `ServerContext` 객체는 각각 `TLSClientConfiguration` 및 `TLSServerConfiguration` 객체로 인스턴스화되며, 버퍼 또는 소켓을 생성하는 데 사용됩니다. 네 객체 모두 변경 불가능(immutable)해야 합니다.

### 구성 (Configuration)
`TLSServerConfiguration` 및 `TLSClientConfiguration` 구체적인 클래스는 TLS 구성을 보유하고 관리할 수 있는 객체를 정의합니다. 이 클래스의 목표는 다음과 같습니다:

*   **오류 위험 감소:** 오타로 인한 오류 위험을 피하면서 TLS 구성을 지정하는 방법을 제공합니다 (단순 딕셔너리 사용은 제외).
*   **구성 변경 감지:** SNI 콜백과 함께 사용하기 위해 다른 구성 객체와 안전하게 비교하여 TLS 구성 변경을 감지할 수 있는 객체를 제공합니다.

이 클래스들은 프로토콜 클래스가 아닙니다. 주로 구현체별 동작을 가질 것으로 예상되지 않기 때문입니다. 이들은 변경 불가능하며, 이는 좋은 엔지니어링 관행이며 딕셔너리 키로 사용될 수 있는 부가적인 이점을 제공합니다.

#### `TLSClientConfiguration` 클래스 (예시)

```python
class TLSClientConfiguration:
    __slots__ = (
        "_certificate_chain",
        "_ciphers",
        "_inner_protocols",
        "_lowest_supported_version",
        "_highest_supported_version",
        "_trust_store",
    )
    def __init__(
        self,
        certificate_chain: SigningChain | None = None,
        ciphers: Sequence[CipherSuite] | None = None,
        inner_protocols: Sequence[NextProtocol | bytes] | None = None,
        lowest_supported_version: TLSVersion | None = None,
        highest_supported_version: TLSVersion | None = None,
        trust_store: TrustStore | None = None,
    ) -> None:
        if inner_protocols is None:
            inner_protocols = []
        self._certificate_chain = certificate_chain
        self._ciphers = ciphers
        self._inner_protocols = inner_protocols
        self._lowest_supported_version = lowest_supported_version
        self._highest_supported_version = highest_supported_version
        self._trust_store = trust_store
    
    # ... (properties for each attribute)
```

`TLSServerConfiguration` 객체는 `certificate_chain` 매개변수로 `Sequence[SigningChain]`을 받는다는 점을 제외하고 클라이언트 객체와 유사합니다.

### 컨텍스트 (Context)
두 가지 컨텍스트 프로토콜 클래스가 정의됩니다: `ClientContext`와 `ServerContext`. 이 클래스들은 TLS 구성이 특정 연결에 적용될 수 있도록 하는 객체를 정의하며, `TLSSocket` 및 `TLSBuffer` 객체를 위한 팩토리(factories)로 생각할 수 있습니다.

현재 `ssl` 모듈과 달리, 하나의 컨텍스트 클래스 대신 두 개의 컨텍스트 클래스를 제공하여 API를 단순화하고 구현체가 TLS 연결의 어느 측면을 담당할지 최대한 빨리 알 수 있도록 합니다.

#### `ClientContext` 프로토콜 클래스 (예시)

```python
class ClientContext(Protocol):
    @abstractmethod
    def __init__(self, configuration: TLSClientConfiguration) -> None:
        """주어진 TLS 클라이언트 구성에서 새 클라이언트 컨텍스트 객체를 생성합니다."""
        ...
    @property
    @abstractmethod
    def configuration(self) -> TLSClientConfiguration:
        """클라이언트 컨텍스트를 생성하는 데 사용된 TLS 클라이언트 구성을 반환합니다."""
        ...
    @abstractmethod
    def connect(self, address: tuple[str | None, int]) -> TLSSocket:
        """socket.socket처럼 작동하며 TLS 교환에 대한 정보(cipher, negotiated_protocol, negotiated_tls_version 등)를 포함하는 TLSSocket을 생성합니다."""
        ...
    @abstractmethod
    def create_buffer(self, server_hostname: str) -> TLSBuffer:
        """인메모리 채널 역할을 하며 TLS 교환에 대한 정보(cipher, negotiated_protocol, negotiated_tls_version 등)를 포함하는 TLSBuffer를 생성합니다."""
        ...
```

`ServerContext`는 `TLSServerConfiguration`을 받는다는 점을 제외하고 유사합니다.

### 소켓 (Socket)
컨텍스트는 `TLSSocket` 프로토콜 클래스의 사양을 따라야 하는 소켓을 생성하는 데 사용될 수 있습니다. 구현체는 `recv`, `send`, `listen`, `accept`, `close`, `getsockname`, `getpeername`과 같은 `socket.socket`과 유사한 메서드를 구현해야 합니다. 또한 협상된 암호(cipher), 프로토콜(`negotiated_protocol`), TLS 버전(`negotiated_tls_version`)과 같은 TLS 연결에 대한 정보를 제공하는 인터페이스도 구현해야 합니다.

### 버퍼 (Buffer)
컨텍스트는 `TLSBuffer` 프로토콜 클래스의 사양을 따라야 하는 버퍼를 생성하는 데 사용될 수도 있습니다. 구현체는 `read`, `write`, `do_handshake`, `shutdown`, `process_incoming`, `process_outgoing` 등의 메서드를 구현해야 합니다. 소켓과 유사하게, 기본 컨텍스트 객체, 협상된 암호, 프로토콜, TLS 버전과 같은 TLS 연결에 대한 정보를 제공하는 인터페이스도 구현해야 합니다.

### 암호 스위트 (Cipher Suites)
라이브러리 독립적인 방식으로 암호 스위트(cipher suites)를 지원하는 것은 매우 어려운 일입니다. `CipherSuite` 열거형을 제공하여 TLS에 대해 정의된 암호 스위트의 큰 하위 집합을 포함하는 가장 간단한 접근 방식이 제안됩니다. 열거형 멤버의 값은 TLS 핸드셰이크에 사용되는 두 옥텟 암호 식별자(16비트 정수로 저장)이며, 이름은 IANA 등록 암호 스위트 이름입니다.

#### `CipherSuite` 클래스 (예시)

```python
class CipherSuite(IntEnum):
    """
    알려진 암호 스위트.
    참조: <https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml>
    """
    TLS_AES_128_GCM_SHA256 = 0x1301
    TLS_AES_256_GCM_SHA384 = 0x1302
    TLS_CHACHA20_POLY1305_SHA256 = 0x1303
    # ... 기타 암호 스위트
```

`Network Framework`와 같은 일부 구현체에서는 이러한 열거형 멤버가 암호 스위트 상수의 값과 직접적으로 일치합니다. `SChannel`의 경우 직접적인 매핑이 어렵습니다. 대부분의 사용자를 위해 안전한 기본값이 충분할 것으로 예상됩니다. 암호 목록을 지정하지 않으면 구현체는 안전한 기본값(시스템 권장 설정에서 파생될 수 있음)을 사용해야 합니다.

### 프로토콜 협상 (Protocol Negotiation)
ALPN(Application-Layer Protocol Negotiation)은 HTTP/2 핸드셰이크의 일부로 프로토콜 협상을 허용합니다. 이 모듈은 프로토콜 협상 구현체가 전달하고 전달받을 수 있는 타입을 정의합니다. 이 타입은 잘 알려진 프로토콜에 대한 별칭(aliases)을 허용하도록 바이트 문자열을 래핑합니다.

#### `NextProtocol` 클래스 (예시)

```python
class NextProtocol(Enum):
    """기본 협상된 ("다음") 프로토콜."""
    H2 = b"h2"
    H2C = b"h2c"
    HTTP1 = b"http/1.1"
    WEBRTC = b"webrtc"
    C_WEBRTC = b"c-webrtc"
    FTP = b"ftp"
    STUN = b"stun.nat-discovery"
    TURN = b"stun.turn"
```

### TLS 버전 (TLS Versions)
지원할 TLS 버전을 제한하는 것이 유용할 때가 많습니다. `TLSVersion` 열거형을 사용하여 TLS 버전을 제한할 수 있습니다. 대부분의 사용자를 위해 안전한 기본값이 충분할 것으로 예상됩니다.

#### `TLSVersion` 클래스 (예시)

```python
class TLSVersion(Enum):
    """
    TLS 버전.
    `MINIMUM_SUPPORTED` 및 `MAXIMUM_SUPPORTED` 변형은 "개방형"이며,
    각각 "가장 낮은 상호 지원" 및 "가장 높은 상호 지원" TLS 버전을 나타냅니다.
    """
    MINIMUM_SUPPORTED = "MINIMUM_SUPPORTED"
    TLSv1_2 = "TLSv1.2"
    TLSv1_3 = "TLSv1.3"
    MAXIMUM_SUPPORTED = "MAXIMUM_SUPPORTED"
```

### 오류 (Errors)
이 모듈은 오류 처리에 사용할 네 가지 기본 클래스를 정의합니다. 이 클래스들은 추상적이지 않으며, 특정 공통 동작을 알리기 위해 존재합니다. TLS 구현체는 자체 패키지에서 이 예외들을 서브클래스화해야 하지만, 동작을 정의할 필요는 없습니다.

*   `TLSError`: 모든 TLS 관련 오류의 기본 예외입니다.
*   `WantWriteError`: 논블로킹(non-blocking) 또는 버퍼 전용 I/O에서 사용됩니다. 네트워크에 더 많은 데이터가 쓰여지거나 출력 버퍼가 비워질 때까지 요청된 작업을 완료할 수 없음을 나타냅니다.
*   `WantReadError`: 논블로킹 또는 버퍼 전용 I/O에서 사용됩니다. 네트워크에서 더 많은 데이터가 읽히거나 입력 버퍼에 더 많은 데이터가 있을 때까지 요청된 작업을 완료할 수 없음을 나타냅니다.
*   `RaggedEOF`: TLS 연결이 정상적으로 종료되지 않았을 때 사용되는 특별한 신호 예외입니다.
*   `ConfigurationError`: 제공된 구성이 해당 구현체에서 지원되지 않는 기능을 사용할 때 구현체가 사용할 수 있는 특별한 예외입니다.

### 인증서 (Certificates)
이 모듈은 구체적인 `Certificate` 클래스를 정의합니다. 이 클래스는 파일, 메모리, 또는 임의의 식별자로부터 인증서를 생성하는 세 가지 생성자에 해당하는 세 가지 속성을 가집니다.

#### `Certificate` 클래스 (예시)

```python
class Certificate:
    """TLS에 사용되는 인증서를 나타내는 객체."""
    __slots__ = (
        "_buffer",
        "_path",
        "_id",
    )
    def __init__(
        self,
        buffer: bytes | None = None,
        path: os.PathLike[str] | None = None,
        id: bytes | None = None
    ):
        """경로, 버퍼 또는 ID로부터 Certificate 객체를 생성합니다."""
        # ... (초기화 로직)
    
    @classmethod
    def from_buffer(cls, buffer: bytes) -> Certificate: ...
    @classmethod
    def from_file(cls, path: os.PathLike[str]) -> Certificate: ...
    @classmethod
    def from_id(cls, id: bytes) -> Certificate: ...
```

### 개인 키 (Private Keys)
이 모듈은 구체적인 `PrivateKey` 클래스를 정의합니다. `Certificate` 클래스와 유사하게, 세 가지 생성자에 해당하는 세 가지 속성을 가집니다.

#### `PrivateKey` 클래스 (예시)

```python
class PrivateKey:
    """TLS에 사용되는 인증서의 공개 키에 해당하는 개인 키를 나타내는 객체."""
    __slots__ = (
        "_buffer",
        "_path",
        "_id",
    )
    def __init__(
        self,
        buffer: bytes | None = None,
        path: os.PathLike | None = None,
        id: bytes | None = None
    ):
        """경로, 버퍼 또는 ID로부터 PrivateKey 객체를 생성합니다."""
        # ... (초기화 로직)
    
    @classmethod
    def from_buffer(cls, buffer: bytes) -> PrivateKey: ...
    @classmethod
    def from_file(cls, path: os.PathLike) -> PrivateKey: ...
    @classmethod
    def from_id(cls, id: bytes) -> PrivateKey: ...
```

### 서명 체인 (Signing Chain)
TLS 참가자는 자신을 인증하기 위해 리프 인증서와 다른 쪽에서 신뢰하는 일부 루트 인증서로 이어지는 체인을 제공해야 합니다. 이 모듈은 이러한 객체들의 모음을 `SigningChain`으로 정의합니다.

#### `SigningChain` 클래스 (예시)

```python
class SigningChain:
    """TLS에 사용되는 인증서 체인을 나타내는 객체."""
    leaf: tuple[Certificate, PrivateKey | None]
    chain: list[Certificate]
    def __init__(
        self,
        leaf: tuple[Certificate, PrivateKey | None],
        chain: Sequence[Certificate] | None = None,
    ):
        """SigningChain 객체를 초기화합니다."""
        self.leaf = leaf
        if chain is None:
            chain = []
        self.chain = list(chain)
```

### 신뢰 저장소 (Trust Store)
`TrustStore` 객체는 `Certificate` 및 `PrivateKey` 유형과 동일한 모델을 사용하여 사용자가 신뢰 저장소를 정의할 수 있는 다양한 수단을 캡처하는 구체적인 클래스를 생성합니다.

#### `TrustStore` 클래스 (예시)

```python
class TrustStore:
    """인증서 유효성을 확인하는 데 사용되는 신뢰 저장소."""
    __slots__ = (
        "_buffer",
        "_path",
        "_id",
    )
    def __init__(
        self,
        buffer: bytes | None = None,
        path: os.PathLike | None = None,
        id: bytes | None = None
    ):
        """경로, 버퍼 또는 ID로부터 TrustStore 객체를 생성합니다. 이들 중 아무것도 주어지지 않으면 기본 시스템 신뢰 저장소가 사용됩니다."""
        # ... (초기화 로직)
    
    @classmethod
    def system(cls) -> TrustStore: ...
    @classmethod
    def from_buffer(cls, buffer: bytes) -> TrustStore: ...
    @classmethod
    def from_file(cls, path: os.PathLike) -> TrustStore: ...
    @classmethod
    def from_id(cls, id: bytes) -> TrustStore: ...
```

### 런타임 접근 (Runtime Access)
라이브러리 사용자가 사용할 TLS 구현체를 지정하고 싶지만, 라이브러리가 실제 TLS 연결의 세부 사항을 구성하도록 허용하는 경우가 흔합니다. 이를 위해 모든 구체적인 구현체는 `TLSImplementation` 객체를 얻는 방법을 제공해야 합니다. `TLSImplementation` 객체는 관련 `Protocol` 클래스의 구체적인 구현체와 특정 TLS 구성이 해당 구현체와 호환되는지 확인하는 함수(`validate_config`)를 제공해야 합니다.

#### `TLSImplementation` 클래스 (예시)

```python
class TLSImplementation(Generic[_ClientContext, _ServerContext]):
    __slots__ = (
        "_client_context",
        "_server_context",
        "_validate_config",
    )
    def __init__(
        self,
        client_context: type[_ClientContext],
        server_context: type[_ServerContext],
        validate_config: Callable[[TLSClientConfiguration | TLSServerConfiguration], None],
    ) -> None:
        self._client_context = client_context
        self._server_context = server_context
        self._validate_config = validate_config
    
    @property
    def client_context(self) -> type[_ClientContext]: ...
    @property
    def server_context(self) -> type[_ServerContext]: ...
    @property
    def validate_config(self) -> Callable[[TLSClientConfiguration | TLSServerConfiguration], None]: ...
```

### 안전하지 않은 사용 (Insecure Usage)
사용자가 인증서 유효성 검사를 비활성화하는 등 안전하지 않은 작업을 수행해야 하는 경우를 위해 별도의 `insecure` 모듈이 제안됩니다. 이 모듈은 구성, 컨텍스트, 구현체 객체의 안전하지 않은 변형을 포함하며, 인증서 유효성 검사 및 서버 호스트 이름 검사를 비활성화할 수 있습니다.

이 기능은 합법적인 사용자가 실수로 안전하지 않은 기능을 사용하기 어렵게 만들기 위해 별도의 모듈에 배치됩니다. 또한 `SecurityWarning`이라는 새로운 경고를 정의하고, 안전하지 않은 연결을 생성하려고 할 때마다 크게 경고합니다. 이 모듈은 테스트 목적으로만 사용되어야 합니다.

## 표준 라이브러리 변경 (Changes to the Standard Library)
TLS와 상호 작용하는 표준 라이브러리 부분은 이러한 프로토콜 클래스를 사용하도록 수정되어야 합니다. 여기에는 `asyncio`, `ftplib`, `http`, `imaplib`, `nntplib`, `poplib`, `smtplib`, `urllib` 모듈이 포함됩니다.

### `ssl` 모듈 마이그레이션 (Migration of the ssl module)
`ssl` 모듈 자체도 이러한 프로토콜 클래스에 맞게 확장되어야 합니다. 이 확장은 새로운 클래스의 형태를 취할 것이며, 잠재적으로 완전히 새로운 모듈에 있을 수 있습니다.

`ssl` 모듈에서 새 프로토콜 클래스로 마이그레이션하는 것은 일대일로 이루어지지 않을 것으로 예상됩니다. 그러나 `ssl` 모듈의 예외(`ssl.SSLError`, `ssl.SSLWantReadError`, `ssl.SSLWantWriteError`)는 위에 정의된 예외들(`tls.TLSError`, `tls.WantReadError`, `tls.WantWriteError`)을 별칭(alias)으로 사용하도록 하여 호환성을 보장할 것입니다.

## 향후 계획 (Future)
주요 미래 TLS 기능은 이러한 프로토콜 클래스의 수정이 필요할 수 있습니다. 이러한 수정은 신중하게 이루어져야 합니다. 프로토콜 클래스는 IETF(Internet Engineering Task Force)에서 지정된 기능의 고급 설명에 국한되어야 합니다.

그러나 이 API에 대한 정당한 확장은 이루어져야 합니다. 이 API의 초점은 Python 커뮤니티를 위한 통합된 최소 공통분모 구성 옵션을 제공하는 것입니다. TLS는 정적인 대상이 아니며, TLS가 발전함에 따라 이 API도 발전해야 합니다.

## 감사 (Credits)
이 PEP는 2020년에 철회된 PEP 543을 상당히 각색한 것입니다.
---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.