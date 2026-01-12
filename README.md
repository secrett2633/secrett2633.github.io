# secrett2633's Blog

Next.js 기반 기술 블로그입니다.

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 정적 파일 생성 (GitHub Pages용)
npm run export
```

## 배포

GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

- `main` 또는 `master` 브랜치에 푸시하면 자동으로 빌드 및 배포됩니다.
- 빌드된 파일은 `out` 폴더에 생성됩니다.

## 기술 스택

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown (gray-matter)
- **Deployment**: GitHub Pages


1. 음원 정렬에 대한 내용
- MFA
    - 다국어 지원
    - 음성과 텍스트를 자동으로 정밀하게 정렬해주는 도구.
    - 음향 모델 + 발음사전을 이용해 텍스트를 음소단위로 변환 후 음성을 분석하여 음소별로 오디오의 어떤 부분과 매칭되는지 분석.
- CTC
    - 각 프레임에서 각 글자/음소가 나올 확률을 반환하는데, 이 확률을 이용하여 어떤 글자가 어느 시점에 나왔는지를 계산하여 매칭.
- Elevenlabs
    - Forced Alignment API 을 이용해 단어 단위 시작, 끝 지점을 알 수 있음.

2. 음원 분리에 대한 내용
- 목소리(vocal), 배경음악(inst), 드럼(drum), 베이스(bass), 공간계(noise), 백보컬(vocal) 

3. 음색 합성에 대한 내용
- Applio
    - RVC 기반의 합성 방식인데, 음성에서 말 내용, 화자 특징을 분리하여 저장하고, 각각의 특징들을 음색 합성할 때 검색하여 가장 유사한 특징을 가져와서 사용.
- Vevo
    - 짧은 음성으로 목소리 복제가 가능함 (제로샷)
    - 음색(목소리의 주인)과 스타일(말하는 방식, 억양)을 독립적으로 제어 가능.
    - transformer auto regressive 모델을 이용해 content-style 토큰 생성 (억양 감정)
    - 생성된 content-style 토큰 + 음색 참조를 통해 flow-matching 기반 transformer 을 사용해 음향 표현 생성

4. LLM 에 대한 내용
    - Bert 기반 문장 완성도 판단 기능
    - 프롬프팅
        - few shot
    - gemma3:4b
    - gpt-oss-120b
    - 토큰 사용량 추적

5. TTS 에 대한 내용
- 파인튜닝을 해서 감정을 가진 TTS 모델 개발
    - 텍스트가 주어졌을 때 어떤 감정을 가졌는지.
    - 오디오가 주어졌을 때 어떤 감정을 가졌는지.
    - 영상이 주어졌을 때 어떤 감정을 가졌는지.
- 지원하지 않는 언어에 대해 파인튜닝을 통해 언어 추가. (G2P, 언어 추가)
- 사용해본 모델들
    - XTTS-v2
    - ChatTTS
    - Dia
    - MeloTTS
    - OpenVoice V2
    - Parler-TTS
    - Fish Speech v1.5
    - CosyVoice
    - GPT-SoVITS
    - Hume.ai
    - elevenlabs

6. 화자 분리에 대한 내용
- Elevenlabs
- SepReformer(서강대 개발)

7. 성별 분류에 대한 내용
- wav2vec2 기반 모델 (Common-Voice-Geneder-Detection)

8. 객체 탐지에 대한 내용
- Yolo

9. 객체 추적에 대한 내용
프레임간의 객체에 대해 이어주는 역할
- BotSort
- BPBReIDStrongSORT
- ByteTrack
- DeepOCSORT
- OCSORT
- StrongSORT

10. OCR 에 대한 내용
- EasyOCR
- DeepSeekOCR
- ChandraOCR
- dots.ocr
- CoreOCR
- gemini
...

11. 행동 인지에 대한 내용
- SlowFast
    - 영상을 기반으로 선수의 행동을 예측

12. 경기장 인지에 대한 내용
- No bells Just Whistles
    - 선수, 공이 경기장의 어디에 위치해있는지 파악하기 위한 모델

12. 백엔드에 대한 내용
- MSA
    - Gateway
        - openai.json 읽어와서 swagger 에서 통합해서 볼 수 있도록
- API 호출간에 발생하는 비효율적인 부분 개선
    - AWS Secret Managers 매번 호출 -> 캐싱
    - DB 매번 연결 -> 커넥션 풀
    - Event Loop 블로킹 -> 스레드풀 기반 + 연산작업 프로세스 이용해서 GIL 회피 (celery)
- Log
    - APIRoute에 대한 로깅
    - Trace ID, Span ID 로깅
    - 에러에 대한 사내 메신저 발송
- 결제 로직 관련
    - paddle
        - 결제한 구독제의 Plan에 따라 사용가능한 서비스 제한 기능
- 패키지 관리 도구
    - uv
    - pixi
- RabbitMQ
    - 작업 상태 알림 기능

13. 시각화 대시보드
- Grafana 
    - 백엔드 로그, 요청 빈도수, 에러률, 속도 등등에 대한 대시보드
    - 하드웨어 상태에 대한 대시보드
- Loki
    - 로그 데이터 S3 저장
- Promtail
    - 컨테이너의 로그를 Loki 에 전달
    - AWS CloudWatch 로그 수집
- Alloy
    - Promtail 지원 종료
    - 컨테이너의 로그를 Loki 에 전달
    - AWS CloudWatch 로그 수집
- Prometheus
    - 서비스로부터 주기적으로 메트릭을 가져오기 위해 사용
- Tempo
    - 마이크로서비스 환경에서 서비스간의 요청 흐름을 추적하기 위해 사용 (TraceID, SpanID)

14. Airflow
- 데이터 수집 + 정제 + 학습 자동화에 사용.
