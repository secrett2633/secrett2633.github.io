var store = [{
        "title": "블로그 개발 완료",
        "excerpt":"새해를 맞아 뭔가 의미 있는 시작을 해보고 싶다는 생각에 고민을 거듭하다가, 기술 블로그를 작성하기로 결심했습니다. 처음에는 어떤 플랫폼을 사용할지, 어떤 테마를 적용할지 선택하는 데 하루를 다 쏟아부었어요. 다양한 옵션을 비교해 보고, 구글링을 통해 마음에 드는 테마를 발견했죠. 그 테마를 기반으로 제 스타일에 맞게 커스텀하여 적용하면서 블로그의 첫 모습을 완성했습니다. 앞으로...","categories": ["Me"],
        "tags": ["Me"],
        "url": "/me/first-post/",
        "teaser": null
      },{
        "title": "[SafeLine] SafeLine 초기 설정",
        "excerpt":"1. SafeLine은 무엇인가요? 들어가며 백엔드 배포를 열심히 진행했지만 보안에 대해서는 신경을 쓰지 않으셨나요? 저는 SQL Injection, XSS, CSRF 등 여러 가지 공격 방법에 대해 들어본 적은 있지만, 바쁜 일정을 이유로 보안에 대해 충분히 신경을 쓸 시간이 없었습니다. 그러던 중, SafeLine이라는 보안 프레임워크를 알게 되었고, 이 기회에 한번 사용해보기로 했습니다. 2....","categories": ["SafeLine"],
        "tags": ["SafeLine"],
        "url": "/safeline/start-safeline/",
        "teaser": null
      },{
        "title": "[Python] logging 사용법",
        "excerpt":"들어가며 로깅은 프로그램을 개발하면서 발생하는 문제를 추적하고 디버깅하는 데 매우 중요한 역할을 합니다. 파이썬에서는 기본적으로 logging 모듈을 사용하여 로깅을 할 수 있습니다. 하지만 이 모듈은 설정이 복잡하고 사용법이 어려워 초보자에게는 다소 부담이 될 수 있습니다. 이러한 문제를 해결하기 위해 Loguru라는 라이브러리를 소개하고자 합니다. Loguru는 사용이 간편하고 직관적이어서 로깅을 보다 쉽게...","categories": ["Logging"],
        "tags": ["Logging"],
        "url": "/logging/loguru/",
        "teaser": null
      },{
        "title": "[LLM] LLM을 활용한 코드 리뷰",
        "excerpt":"들어가며 많은 기업들이 사내에서 코드 리뷰를 진행하고 있습니다. 코드 리뷰는 소프트웨어 품질을 높이는 중요한 과정이지만, 바쁜 일정으로 인해 제대로 진행되지 않거나 퀄리티가 낮아지는 경우도 많습니다. 이러한 문제를 해결하기 위해 코드 리뷰를 자동화하는 도구를 개발했습니다. 이번 포스팅에서는 그 도구를 어떻게 활용할 수 있는지 공유하고자 합니다. 1. 코드 리뷰에서 확인해야 할 사항...","categories": ["LLM"],
        "tags": ["LLM"],
        "url": "/llm/code-review-with-llm/",
        "teaser": null
      },{
        "title": "[Jenkins] Jenkins 초기 설정",
        "excerpt":"들어가며 Jenkins는 지속적인 통합(CI) 및 지속적인 배포(CD)를 위한 오픈소스 자동화 도구입니다. 이 포스트에서는 Jenkins를 설치하고 기본적인 설정을 진행하는 방법을 다뤄보겠습니다. Jenkins 설치 이번 포스트에서는 Docker를 사용하여 Jenkins를 설치하는 방법을 설명하겠습니다. 만약 Docker가 설치되어 있지 않다면, Docker 설치 가이드를 참고하여 설치해 주세요. 1. docker-compose.yml 파일 작성 Jenkins를 Docker에서 실행하려면 docker-compose.yml 파일을...","categories": ["Jenkins"],
        "tags": ["Jenkins"],
        "url": "/jenkins/start-jenkins/",
        "teaser": null
      },{
        "title": "[Jenkins] Jenkins 파이프라인 생성",
        "excerpt":"들어가며 이전 포스트에서는 Jenkins를 설치하고 초기 설정을 완료했습니다. 이번 포스트에서는 Jenkins 파이프라인을 사용하여 서비스를 배포하는 방법에 대해 다뤄보겠습니다. 파이프라인을 통해 자동화된 배포를 설정하는 과정이므로, 실습을 통해 배포 과정을 간편하게 처리할 수 있습니다. 파이프라인 생성 Jenkins 대시보드에서 새로운 Item 생성 버튼을 클릭합니다. 새로운 파이프라인을 생성하기 위해 Pipeline을 선택하고, 적당한 이름을 입력합니다....","categories": ["Jenkins"],
        "tags": ["Jenkins"],
        "url": "/jenkins/create-pipeline-with-jenkins/",
        "teaser": null
      },{
        "title": "[GitHub Actions] 깃허브 프로필 자동 업데이트하기",
        "excerpt":"들어가며 매일 자주 사용하는 GitHub, 그런데 제 프로필을 확인해보니 마지막으로 업데이트한 게 3년 전이었습니다. 이때부터 기술 스택도 최신화되지 않았고, 제 블로그 포스팅도 깃허브 프로필에 반영되지 않았습니다. 그래서 이번 기회에 프로필을 업데이트하고, 블로그 포스팅도 자동으로 업데이트되도록 만들기로 했습니다. 하지만 매번 수동으로 블로그 포스팅을 추가하는 것은 번거롭기 때문에, 이를 자동화하는 방법을 고민해봤습니다....","categories": ["GitHub Actions"],
        "tags": ["GitHub Actions"],
        "url": "/github-actions/automating-update-github-profile/",
        "teaser": null
      },{
        "title": "[Nginx] Let's Encrypt로 SSL 인증서 발급받기",
        "excerpt":"들어가며 웹사이트의 보안을 강화하려면 SSL 인증서가 필수입니다. SSL 인증서를 설치하면 HTTPS를 통해 사이트와 방문자 간의 데이터가 암호화되어 전송되므로 보안성이 높아집니다. 이 포스팅에서는 무료 SSL 인증서 발급 서비스인 Let’s Encrypt를 사용하여 Nginx 서버에 SSL 인증서를 발급받고 적용하는 방법을 소개합니다. 1. 도메인 준비 SSL 인증서를 발급받기 위해서는 먼저 도메인이 필요합니다. 저는 이번...","categories": ["Nginx"],
        "tags": ["Nginx"],
        "url": "/nginx/get-ssl-auth-with-letsencrypt/",
        "teaser": null
      },{
        "title": "[Jenkins] 무중단 배포를 위한 파이프라인 구성",
        "excerpt":"무중단 배포 (Blue-Green 배포) 방법 들어가며 지난 포스트에서는 SSL 인증서 발급과 이를 Jenkins 파이프라인에 적용하는 방법을 다뤘습니다. 이번 포스트에서는 이 설정을 바탕으로 무중단 배포를 구현하는 방법을 공유합니다. 무중단 배포란? 무중단 배포는 기존 서비스를 중단하지 않고 새로운 버전을 배포하는 방법입니다. 이렇게 배포를 진행하면 서비스의 가용성을 높일 수 있으며, 사용자에게 끊김 없이...","categories": ["Jenkins"],
        "tags": ["Jenkins"],
        "url": "/jenkins/zero-downtime-deploy-with-jenkins/",
        "teaser": null
      },{
        "title": "[Django] DB 로그 확인하기",
        "excerpt":"들어가며 Django에서 데이터베이스에 접근할 때, 우리는 주로 ORM(Object-Relational Mapping)을 사용합니다. ORM을 사용하면 쿼리문을 직접 작성하지 않고도 데이터베이스와 상호작용할 수 있어 매우 편리하지만, 쿼리 로그를 확인하기 어려워 최적화가 필요한 부분을 파악하기 힘들 수 있습니다. 이번 포스트에서는 Django에서 쿼리 로그를 확인하는 방법에 대해 소개하려고 합니다. 쿼리 로그를 활용하면 ORM이 어떻게 동작하는지 파악하고...","categories": ["Django"],
        "tags": ["Django"],
        "url": "/backend/django/see-log-in-django/",
        "teaser": null
      },{
        "title": "[Django] prefetch_related",
        "excerpt":"prefetch_related 다음과 같은 모델이 있을때 이 모델에 접근하기 위해 조회를 하면 다음과 같은 쿼리가 나간다. class Category(models.Model): name = models.CharField(max_length=32) parent = models.ForeignKey(\"self\", on_delete=models.SET_NULL, null=True, related_name=\"children\") 이때 조회한 category 의 name 을 조회할때는 따로 추가적인 쿼리가 나가지 않는다. 하지만 category 의 parent 를 조회할때는 다음과 같이 추가적인 쿼리가 나가는데 이를...","categories": ["Django"],
        "tags": ["Django"],
        "url": "/backend/django/prefetch_related/",
        "teaser": null
      },{
        "title": "[Django] index",
        "excerpt":"들어가며 Django에서 인덱스를 사용하는 예시를 먼저 살펴보겠습니다. 인덱스는 데이터베이스에서 검색 성능을 향상시키는 중요한 기능입니다. 특히 자주 조회하는 필드에 대해 인덱스를 설정하면, 조회 성능을 크게 개선할 수 있습니다. 예시 1: 기본 카테고리 모델 class CategoryStatus(StrEnum): ACTIVE = \"active\" INACTIVE = \"inactive\" class Category(models.Model): name = models.CharField(max_length=32) status = models.CharField(max_length=7, default=CategoryStatus.INACTIVE) 위와...","categories": ["Django"],
        "tags": ["Django"],
        "url": "/backend/django/index/",
        "teaser": null
      },{
        "title": "[Django] 비관적 락",
        "excerpt":"비관적 락 (Pessimistic Lock) 비관적 락이란? 비관적 락은 데이터베이스에서 동시성 제어를 위해 락을 사용하여 작업을 처리하는 방법입니다. 이 방식은 데이터 정합성을 강하게 보장하지만, 락을 획득하고 있는 동안 다른 작업들이 대기하거나 영향을 받을 수 있는 단점이 있습니다. 이는 주로 충돌 가능성이 높거나 데이터의 정합성이 매우 중요한 상황에서 사용됩니다. Django에서 비관적 락...","categories": ["Django"],
        "tags": ["Django"],
        "url": "/backend/django/pessimistic-locking/",
        "teaser": null
      },{
        "title": "[Django] 낙관적 락",
        "excerpt":"낙관적 락 (Optimistic Lock) 낙관적 락이란? 낙관적 락(Optimistic Lock)은 실제로 데이터베이스에서 락을 걸지 않고, 데이터의 version 컬럼을 통해 동시성을 제어하는 방법입니다. 이 방식은 비관적 락(Pessimistic Lock)과 비교했을 때 동시성 처리가 더 효율적이지만, 충돌이 발생할 가능성도 존재하고, 충돌이 발생했을 때 이를 처리할 로직을 구현해야 합니다. 즉, 데이터가 자주 변경되지 않는 환경에서...","categories": ["Django"],
        "tags": ["Django"],
        "url": "/backend/django/optimistic-locking/",
        "teaser": null
      },{
        "title": "[Docker] 빠른 빌드 방법",
        "excerpt":"Dockerfile 최적화: 의존성 관리 개선 문제점: 매번 라이브러리 재설치 기존 Dockerfile에서는 별다른 라이브러리 설치 과정 없이 의존성을 관리하고 있었으나, 매번 Docker 이미지 빌드 시마다 라이브러리를 새로 설치하는 문제가 발생했습니다. 이로 인해 빌드 시간이 길어지고, 이미지를 빌드하는 데 시간이 많이 소요되었죠. 해결책: poetry로 의존성 관리 최적화 문제를 해결하기 위해, poetry를 사용하여...","categories": ["Docker"],
        "tags": ["Docker"],
        "url": "/devops/docker/fast-build/",
        "teaser": null
      },{
        "title": "[Django] Makefile 사용하기",
        "excerpt":"Makefile이란? Makefile은 자주 사용하는 명령어나 스크립트를 정의하여 간편하게 실행할 수 있도록 도와주는 파일입니다. 코드가 길거나 복잡한 경우 짧은 명령어로 선언하여 쉽게 사용 가능하며, 코드 재사용과 유지보수에 용이합니다. Django 프로젝트에서 사용하는 예시를 통해 Makefile의 사용법을 소개합니다. Makefile 예시 SHELL := /bin/bash # Bash 문법 사용 ARG := $(word 2, $(MAKECMDGOALS)) #...","categories": ["Django"],
        "tags": ["Django"],
        "url": "/backend/django/makefile/",
        "teaser": null
      },{
        "title": "[Chrome Extention] YouTube 차단 확장 프로그램 개발하기",
        "excerpt":"들어가며 지난 글에서는 뇌과학적으로 게으름과 무기력을 극복하는 방법에 대해 다루었습니다. 그 방법 중 하나로 불필요한 정보를 차단하는 방법이 있었는데요. 저의 경우 YouTube 시청 시간이 길었기에, YouTube에 접속할 때마다 제가 작성한 뇌과학적으로 게으름과 무기력을 극복하는 글로 자동 리다이렉트해주는 확장 프로그램을 만들었습니다. 이 글에서는 해당 크롬 확장 프로그램을 만드는 방법을 공유하겠습니다. 확장...","categories": ["Chrome Extension"],
        "tags": ["Chrome Extension"],
        "url": "/etc/chrome-extension/block-youtube-with-chrome-extension/",
        "teaser": null
      },{
        "title": "[AWS] AWS Lambda와 Notion API를 활용한 15분 단위 자동 기록 시스템",
        "excerpt":"들어가며 지난 글에서는 뇌과학적으로 게으름과 무기력을 극복하는 방법에 대해 다루었습니다. 그 방법 중 하나로 내가 하고 있는 행동이나 생각을 말로 설명하는 것이 있었는데, 이를 확장하여 15분 단위로 행동을 기록하면 시간을 효율적으로 사용할 뿐만 아니라 과거의 내가 어떤 행동을 했는지 기억할 수 있다는 장점이 있습니다. 그래서 이를 실천하기 위해 AWS Lambda와...","categories": ["AWS"],
        "tags": ["AWS","Lambda","EventBridge"],
        "url": "/devops/aws/aws-lambda-eventbridge/",
        "teaser": null
      },{
        "title": "뇌과학적으로 게으름과 무기력을 극복하는 방법",
        "excerpt":"들어가며 우리의 뇌는 기본적으로 에너지를 절약하려는 성향이 있습니다. 따라서 게으름이나 무기력함을 느끼는 것은 단순한 의지 부족이 아니라, 뇌의 본능적인 반응일 수 있습니다. 하지만 뇌과학적으로 이를 극복할 방법이 존재합니다. 1. 전두엽 강화하기 뇌의 주요 부위에는 감정을 담당하는 변연계(편도체)와 이성을 담당하는 전두엽이 있습니다. 게으름과 무기력을 극복하려면 전두엽을 활성화하는 것이 중요합니다. 전두엽을 강화하는...","categories": ["Me"],
        "tags": ["Me"],
        "url": "/me/brain-hack-productivity/",
        "teaser": null
      },{
        "title": "[AWS] AWS Solutions Architect Associate 자격증 취득 후기",
        "excerpt":"AWS Solutions Architect Associate 자격증이란? AWS Solutions Architect Associate(SAA) 자격증은 AWS 클라우드 환경에서 아키텍처 설계를 담당하는 전문가를 인증하는 시험입니다. AWS의 다양한 서비스를 이해하고, 이를 활용하여 효율적인 아키텍처를 설계할 수 있는 능력을 평가합니다. 특히, 다음과 같은 주요 개념들을 다룹니다: AWS Well-Architected Framework의 이해 고가용성(High Availability) 및 내결함성(Fault Tolerance) 아키텍처 설계 비용...","categories": ["Me"],
        "tags": ["Me"],
        "url": "/me/pass-certified-solutions-architect-associate/",
        "teaser": null
      },{
        "title": "[논문리뷰] AgroBench: Vision-Language Model Benchmark in Agriculture",
        "excerpt":"링크: 논문 PDF로 바로 열기 AgroBench: Vision-Language Model Benchmark in Agriculture 저자: Risa Shinoda, Nakamasa Inoue, Hirokatsu Kataoka, Masaki Onishi, Yoshitaka Ushiku 키워드: Vision-Language Models, Agriculture, Benchmarking, Disease Identification, Pest Management, Crop Management, Agronomy 핵심 연구 목표 본 논문은 농업 분야에서 Vision-Language Model (VLM)의 광범위한 지식과 실제 적용 가능성을 평가하기...","categories": ["Review"],
        "tags": ["Review","Vision-Language Models","Agriculture","Benchmarking","Disease Identification","Pest Management","Crop Management","Agronomy"],
        "url": "/ai/review/2025-8-3-AgroBench__Vision-Language_Model_Benchmark_in_Agriculture/",
        "teaser": null
      },{
        "title": "[논문리뷰] Beyond Linear Bottlenecks: Spline-Based Knowledge Distillation for Culturally Diverse Art Style Classification",
        "excerpt":"링크: 논문 PDF로 바로 열기 Beyond Linear Bottlenecks: Spline-Based Knowledge Distillation for Culturally Diverse Art Style Classification 저자: Abdellah Zakaria Sellam, Salah Eddine Bekhouche, Cosimo Distante, Abdelmalik Taleb-Ahmed 키워드: Kolmogorov-Arnold Networks, Knowledge Distillation, Art Style Classification, Self-Supervised Learning, Spline-Based Activation, Dual-Teacher, Gram Matrix 핵심 연구 목표 본 논문은 전문가가 라벨링한...","categories": ["Review"],
        "tags": ["Review","Kolmogorov-Arnold Networks","Knowledge Distillation","Art Style Classification","Self-Supervised Learning","Spline-Based Activation","Dual-Teacher","Gram Matrix"],
        "url": "/ai/review/2025-8-3-Beyond_Linear_Bottlenecks__Spline-Based_Knowledge_Distillation_for__Culturally_Diverse_Art_Style_Classification/",
        "teaser": null
      },{
        "title": "[논문리뷰] C3: A Bilingual Benchmark for Spoken Dialogue Models Exploring Challenges in Complex Conversations",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chengqian Ma, Wei Tao, Yiwen Guo 키워드: Spoken Dialogue Models, Bilingual Benchmark, Complex Conversations, Ambiguity Resolution, Context Understanding, LLM Evaluation, Human-Computer Interaction 핵심 연구 목표 본 연구는 현존하는 음성 대화 모델(SDM)들이 인간의 복잡한 대화, 특히 음운론적/의미론적 모호성과 맥락 의존성(생략, 공참조, 다중 턴 상호작용)을 얼마나...","categories": ["Review"],
        "tags": ["Review","Spoken Dialogue Models","Bilingual Benchmark","Complex Conversations","Ambiguity Resolution","Context Understanding","LLM Evaluation","Human-Computer Interaction"],
        "url": "/ai/review/2025-8-3-C3__A_Bilingual_Benchmark_for_Spoken_Dialogue_Models_Exploring__Challenges_in_Complex_Conversations/",
        "teaser": null
      },{
        "title": "[논문리뷰] Efficient Machine Unlearning via Influence Approximation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiawei Liu, Chenwang Wu, Defu Lian, and Enhong Chen 키워드: Machine Unlearning, Influence Function, Incremental Learning, Privacy Protection, Gradient Optimization, Model Editing, Computational Efficiency 핵심 연구 목표 본 논문은 대규모 데이터셋과 빈번한 삭제 요청이 발생하는 환경에서 기존 영향 함수 기반 언러닝(unlearning) 방식의 높은 계산...","categories": ["Review"],
        "tags": ["Review","Machine Unlearning","Influence Function","Incremental Learning","Privacy Protection","Gradient Optimization","Model Editing","Computational Efficiency"],
        "url": "/ai/review/2025-8-3-Efficient_Machine_Unlearning_via_Influence_Approximation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Enhanced Arabic Text Retrieval with Attentive Relevance Scoring",
        "excerpt":"링크: 논문 PDF로 바로 열기 제목: Enhanced Arabic Text Retrieval with Attentive Relevance Scoring 저자: Salah Eddine Bekhouche, Azeddine Benlamoudi, Yazid Bounab, Fadi Dornaika, Abdenour Hadid 키워드: Arabic NLP, Dense Passage Retrieval, Attentive Relevance Scoring, Information Retrieval, Question Answering, Transformer Models, Semantic Matching 핵심 연구 목표 아랍어 텍스트 검색에서 복잡한...","categories": ["Review"],
        "tags": ["Review","Arabic NLP","Dense Passage Retrieval","Attentive Relevance Scoring","Information Retrieval","Question Answering","Transformer Models","Semantic Matching"],
        "url": "/ai/review/2025-8-3-Enhanced_Arabic_Text_Retrieval_with_Attentive_Relevance_Scoring/",
        "teaser": null
      },{
        "title": "[논문리뷰] Flow Equivariant Recurrent Neural Networks",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: T. Anderson Keller 키워드: Flow Equivariance, Recurrent Neural Networks, Sequence Models, Group Equivariance, Lie Subgroups, Generalization, Time-Parameterized Symmetries 핵심 연구 목표 본 논문은 기존 정적 변환 및 피드포워드 네트워크에 국한된 equivariance 이론을 확장하여, 시각적 움직임과 같은 시간 매개변수화된 흐름(flows)을 포착하는 순환 신경망(RNN)에 적용하는 것을...","categories": ["Review"],
        "tags": ["Review","Flow Equivariance","Recurrent Neural Networks","Sequence Models","Group Equivariance","Lie Subgroups","Generalization","Time-Parameterized Symmetries"],
        "url": "/ai/review/2025-8-3-Flow_Equivariant_Recurrent_Neural_Networks/",
        "teaser": null
      },{
        "title": "[논문리뷰] NeRF Is a Valuable Assistant for 3D Gaussian Splatting",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shuangkang Fang, I-Chao Shen, Takeo Igarashi, Yufeng Wang, ZeSheng Wang, Yi Yang, Wenrui Ding, Shuchang Zhou 키워드: NeRF, 3D Gaussian Splatting, Hybrid Model, Joint Optimization, Scene Representation, Neural Rendering, Residual Learning, Sparse View 핵심 연구 목표 본 논문은 3D Gaussian Splatting (3DGS)의 고유한 한계(Gaussian...","categories": ["Review"],
        "tags": ["Review","NeRF","3D Gaussian Splatting","Hybrid Model","Joint Optimization","Scene Representation","Neural Rendering","Residual Learning","Sparse View"],
        "url": "/ai/review/2025-8-3-NeRF_Is_a_Valuable_Assistant_for_3D_Gaussian_Splatting/",
        "teaser": null
      },{
        "title": "[논문리뷰] On the Expressiveness of Softmax Attention: A Recurrent Neural Network Perspective",
        "excerpt":"링크: 논문 PDF로 바로 열기 ON THE EXPRESSIVENESS OF SOFTMAX ATTENTION: A RECURRENT NEURAL NETWORK PERSPECTIVE 저자: Gabriel Mongaras, Eric C. Larson 키워드: Softmax Attention, Linear Attention, Recurrent Neural Networks (RNNs), Taylor Series Expansion, Attention Mechanisms, Expressiveness, Transformer Architectures 핵심 연구 목표 이 논문은 Softmax Attention이 선형 Attention보다 우수한 성능을...","categories": ["Review"],
        "tags": ["Review","Softmax Attention","Linear Attention","Recurrent Neural Networks (RNNs)","Taylor Series Expansion","Attention Mechanisms","Expressiveness","Transformer Architectures"],
        "url": "/ai/review/2025-8-3-On_the_Expressiveness_of_Softmax_Attention__A_Recurrent_Neural_Network__Perspective/",
        "teaser": null
      },{
        "title": "[논문리뷰] Persona Vectors: Monitoring and Controlling Character Traits in Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 논문 제목: Persona Vectors: Monitoring and Controlling Character Traits in Language Models 저자: Runjin Chen, Andy Arditi, Henry Sleight, Owain Evans, Jack Lindsey 키워드: Large Language Models (LLMs), Persona Control, Activation Steering, Finetuning, Behavioral Shift Detection, Interpretability, Data Filtering 핵심 연구 목표 이 논문은 대규모...","categories": ["Review"],
        "tags": ["Review","Large Language Models (LLMs)","Persona Control","Activation Steering","Finetuning","Behavioral Shift Detection","Interpretability","Data Filtering"],
        "url": "/ai/review/2025-8-3-Persona_Vectors__Monitoring_and_Controlling_Character_Traits_in_Language__Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Phi-Ground Tech Report: Advancing Perception in GUI Grounding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Miaosen Zhang, Ziqiang Xu, Jialiang Zhu, Qi Dai, Kai Qiu, Yifan Yang, Chong Luo, Tianyi Chen, Justin Wagle, Tim Franklin, Baining Guo (Microsoft) 키워드: GUI grounding, AI agent, Large Multi-modal Model, Perception, Data Augmentation, Direct Preference Optimization, Computational Efficiency 핵심 연구 목표 본 논문은...","categories": ["Review"],
        "tags": ["Review","GUI grounding","AI agent","Large Multi-modal Model","Perception","Data Augmentation","Direct Preference Optimization","Computational Efficiency"],
        "url": "/ai/review/2025-8-3-Phi-Ground_Tech_Report__Advancing_Perception_in_GUI_Grounding/",
        "teaser": null
      },{
        "title": "[논문리뷰] RecGPT Technical Report",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jian Wu, Jiakai Tang, Gaoyang Guo, Dian Chen, Chao Yi 키워드: Recommender Systems, Large Language Models (LLMs), User Intent Modeling, Multi-Stage Training, Human-in-the-Loop, E-commerce, Filter Bubble Mitigation, Matthew Effect 핵심 연구 목표 기존 추천 시스템의 로그 기반(log-fitting) 접근 방식이 야기하는 과적합, 필터 버블, 롱테일...","categories": ["Review"],
        "tags": ["Review","Recommender Systems","Large Language Models (LLMs)","User Intent Modeling","Multi-Stage Training","Human-in-the-Loop","E-commerce","Filter Bubble Mitigation","Matthew Effect"],
        "url": "/ai/review/2025-8-3-RecGPT_Technical_Report/",
        "teaser": null
      },{
        "title": "[논문리뷰] Scalable Multi-Task Reinforcement Learning for Generalizable Spatial Intelligence in Visuomotor Agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shaofei Cai, Zhancun Mu, Haiwen Xia, Bowei Zhang, Anji Liu, Yitao Liang 키워드: Reinforcement Learning, Multi-Task Learning, Visuomotor Agents, Spatial Reasoning, Generalization, Minecraft, Cross-View Goal Specification, Automated Task Synthesis 핵심 연구 목표 본 논문은 강화 학습(RL) 모델의 과적합 문제를 해결하여, visuomotor 에이전트가 다양한 환경에서...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Multi-Task Learning","Visuomotor Agents","Spatial Reasoning","Generalization","Minecraft","Cross-View Goal Specification","Automated Task Synthesis"],
        "url": "/ai/review/2025-8-3-Scalable_Multi-Task_Reinforcement_Learning_for_Generalizable_Spatial__Intelligence_in_Visuomotor_Agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] Seed-Prover: Deep and Broad Reasoning for Automated Theorem Proving",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhicheng Jiang, Wenhao Huang, Liankai Huang, Jinming Gu, Luoxin Chen 키워드: Automated Theorem Proving, Large Language Models, Formal Verification, Reinforcement Learning, Lean, Geometry Reasoning, Chain-of-Thought, Lemma-Style Proving 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)이 자연어 기반 정리 증명에서 명확한 감독 신호 부족으로 겪는...","categories": ["Review"],
        "tags": ["Review","Automated Theorem Proving","Large Language Models","Formal Verification","Reinforcement Learning","Lean","Geometry Reasoning","Chain-of-Thought","Lemma-Style Proving"],
        "url": "/ai/review/2025-8-3-Seed-Prover__Deep_and_Broad_Reasoning_for_Automated_Theorem_Proving/",
        "teaser": null
      },{
        "title": "[논문리뷰] TARS: MinMax Token-Adaptive Preference Strategy for Hallucination Reduction in MLLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Kejia Zhang, Keda Tao, Zhiming Luo, Chang Liu, Jiasheng Tang, Huan Wang 키워드: MLLMs, Hallucination Reduction, Preference Optimization, Min-Max Optimization, Token-Adaptive Strategy, Spectral Regularization, Visual Grounding 핵심 연구 목표 멀티모달 대규모 언어 모델(MLLMs)에서 발생하는 환각(hallucination) 문제를 해결하고 신뢰성을 향상하는 것이 목표입니다. 기존 직접 선호도...","categories": ["Review"],
        "tags": ["Review","MLLMs","Hallucination Reduction","Preference Optimization","Min-Max Optimization","Token-Adaptive Strategy","Spectral Regularization","Visual Grounding"],
        "url": "/ai/review/2025-8-3-TARS__MinMax_Token-Adaptive_Preference_Strategy_for_Hallucination__Reduction_in_MLLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] iLRM: An Iterative Large 3D Reconstruction Model",
        "excerpt":"링크: 논문 PDF로 바로 열기 iLRM: An Iterative Large 3D Reconstruction Model 저자: Gyeongjin Kang, Seungtae Nam, Xiangyu Sun, Abdelrahman Mohamed, Sameh Khamis, Eunbyung Park 키워드: 3D Reconstruction, Gaussian Splatting, Iterative Refinement, Transformer Architecture, Multi-view Learning, Scalability, Feed-forward Models 핵심 연구 목표 본 논문은 일반화 가능한 Feed-forward 3D 재구성 모델,...","categories": ["Review"],
        "tags": ["Review","3D Reconstruction","Gaussian Splatting","Iterative Refinement","Transformer Architecture","Multi-view Learning","Scalability","Feed-forward Models"],
        "url": "/ai/review/2025-8-3-iLRM__An_Iterative_Large_3D_Reconstruction_Model/",
        "teaser": null
      },{
        "title": "[논문리뷰] villa-X: Enhancing Latent Action Modeling in Vision-Language-Action Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 villa-X: Enhancing Latent Action Modeling in Vision-Language-Action Models 저자: Xiaoyu Chen, Hangxing Wei, Pushi Zhang, Chuheng Zhang, Kaixin Wang, Yanjiang Guo, Rushuai Yang, Yucen Wang, Xinquan Xiao, Li Zhao, Jianyu Chen, and Jiang Bian 키워드: Vision-Language-Action Models, Latent Actions, Robot Manipulation, Pre-training, Diffusion Models, Proprioceptive...","categories": ["Review"],
        "tags": ["Review","Vision-Language-Action Models","Latent Actions","Robot Manipulation","Pre-training","Diffusion Models","Proprioceptive Feedback","Foundation Models"],
        "url": "/ai/review/2025-8-3-villa-X__Enhancing_Latent_Action_Modeling_in_Vision-Language-Action__Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] 3D-R1: Enhancing Reasoning in 3D VLMs for Unified Scene Understanding",
        "excerpt":"링크: 논문 PDF로 바로 열기 3D-R1: Enhancing Reasoning in 3D VLMs for Unified Scene Understanding 저자: Ting Huang, Zeyu Zhang, Hao Tang 키워드: 3D Vision-Language Models, Reasoning, Scene Understanding, Reinforcement Learning, Chain-of-Thought, Dynamic View Selection, Multi-task Learning 핵심 연구 목표 본 논문은 기존 3D Vision-Language Models (VLMs)이 복잡한 공간 관계...","categories": ["Review"],
        "tags": ["Review","3D Vision-Language Models","Reasoning","Scene Understanding","Reinforcement Learning","Chain-of-Thought","Dynamic View Selection","Multi-task Learning"],
        "url": "/ai/review/2025-8-4-3D-R1__Enhancing_Reasoning_in_3D_VLMs_for_Unified_Scene_Understanding/",
        "teaser": null
      },{
        "title": "[논문리뷰] Beyond Fixed: Variable-Length Denoising for Diffusion Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 Beyond Fixed: Variable-Length Denoising for Diffusion Large Language Models 저자: Jinsong Li, Xiaoyi Dong, Yuhang Zang, Yuhang Cao, Jiaqi Wang, Dahua Lin 키워드: Diffusion Large Language Models, Variable-Length Generation, Dynamic Length Adaptation, Denoising Strategy, Inference Optimization, Computational Efficiency 핵심 연구 목표 Diffusion Large Language Models...","categories": ["Review"],
        "tags": ["Review","Diffusion Large Language Models","Variable-Length Generation","Dynamic Length Adaptation","Denoising Strategy","Inference Optimization","Computational Efficiency"],
        "url": "/ai/review/2025-8-4-Beyond_Fixed__Variable-Length_Denoising_for_Diffusion_Large_Language%20__Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] IGL-Nav: Incremental 3D Gaussian Localization for Image-goal Navigation",
        "excerpt":"링크: 논문 PDF로 바로 열기 IGL-Nav: Incremental 3D Gaussian Localization for Image-goal Navigation 저자: Wenxuan Guo, Xiuwei Xu, Hang Yin, Ziwei Wang, Jianjiang Feng, Jie Zhou, Jiwen Lu 키워드: Image-goal Navigation, 3D Gaussian Splatting (3DGS), Incremental Scene Representation, Coarse-to-fine Localization, Embodied AI, Robotics, Differentiable Rendering 핵심 연구 목표 본 논문은...","categories": ["Review"],
        "tags": ["Review","Image-goal Navigation","3D Gaussian Splatting (3DGS)","Incremental Scene Representation","Coarse-to-fine Localization","Embodied AI","Robotics","Differentiable Rendering"],
        "url": "/ai/review/2025-8-4-IGL-Nav__Incremental_3D_Gaussian_Localization_for_Image-goal_Navigation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Investigating Hallucination in Conversations for Low Resource Languages",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Amit Das, Md. Najib Hasan, Souvika Sarkar, Zheng Zhang, Fatemeh Jamshidi, Tathagata Bhattacharya, Nilanjana Raychawdhury, Dongji Feng, Vinija Jain, Aman Chadha 키워드: LLM Hallucination, Low-resource Languages, Conversational AI, ROUGE Score, Cross-lingual Evaluation, Factual Consistency 핵심 연구 목표 본 연구는 대규모 언어 모델(LLM)이 생성하는 텍스트의...","categories": ["Review"],
        "tags": ["Review","LLM Hallucination","Low-resource Languages","Conversational AI","ROUGE Score","Cross-lingual Evaluation","Factual Consistency"],
        "url": "/ai/review/2025-8-4-Investigating_Hallucination_in_Conversations_for_Low_Resource_Languages/",
        "teaser": null
      },{
        "title": "[논문리뷰] Learning an Efficient Multi-Turn Dialogue Evaluator from Multiple Judges",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuqi Tang, Kehua Feng, Yunfeng Wang, Zhiwen Chen, Chengfei Lv, Gang Yu, Qiang Zhang, Keyan Ding 키워드: Multi-Turn Dialogue Evaluation, LLM-as-a-Judge, Multi-Judge Aggregation, Preference Learning, Dialogue Quality Assessment, Maximum Likelihood Estimation, Computational Efficiency 핵심 연구 목표 이 논문은 대규모 언어 모델(LLM) 기반의 대화 평가에서...","categories": ["Review"],
        "tags": ["Review","Multi-Turn Dialogue Evaluation","LLM-as-a-Judge","Multi-Judge Aggregation","Preference Learning","Dialogue Quality Assessment","Maximum Likelihood Estimation","Computational Efficiency"],
        "url": "/ai/review/2025-8-4-Learning_an_Efficient_Multi-Turn_Dialogue_Evaluator_from_Multiple_Judges/",
        "teaser": null
      },{
        "title": "[논문리뷰] Multimodal Referring Segmentation: A Survey",
        "excerpt":"링크: 논문 PDF로 바로 열기 Multimodal Referring Segmentation: A Survey 저자: Henghui Ding, Song Tang, Shuting He, Chang Liu, Zuxuan Wu, Yu-Gang Jiang 키워드: Multimodal Learning, Referring Segmentation, Vision-Language Models, Image Segmentation, Video Segmentation, 3D Vision, Survey 핵심 연구 목표 이 논문은 이미지, 비디오, 3D 장면과 같은 다양한 시각적 맥락에서...","categories": ["Review"],
        "tags": ["Review","Multimodal Learning","Referring Segmentation","Vision-Language Models","Image Segmentation","Video Segmentation","3D Vision","Survey"],
        "url": "/ai/review/2025-8-4-Multimodal_Referring_Segmentation__A_Survey/",
        "teaser": null
      },{
        "title": "[논문리뷰] PixNerd: Pixel Neural Field Diffusion",
        "excerpt":"링크: 논문 PDF로 바로 열기 PixNerd: Pixel Neural Field Diffusion 저자: Shuai Wang, Ziteng Gao, Chenhui Zhu, Weilin Huang, Limin Wang 키워드: Diffusion Models, Neural Fields, Pixel Space, Generative Models, Image Synthesis, Transformer Architecture, End-to-End Learning 핵심 연구 목표 이 논문은 Variational Autoencoder (VAE) 기반의 기존 확산 모델이 야기하는 누적...","categories": ["Review"],
        "tags": ["Review","Diffusion Models","Neural Fields","Pixel Space","Generative Models","Image Synthesis","Transformer Architecture","End-to-End Learning"],
        "url": "/ai/review/2025-8-4-PixNerd__Pixel_Neural_Field_Diffusion/",
        "teaser": null
      },{
        "title": "[논문리뷰] SWE-Debate: Competitive Multi-Agent Debate for Software Issue Resolution",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Heng Lian, Xiaodong Gu, Shaoxin Lin, Yuling Shi, Han Li 키워드: Multi-Agent System, Software Engineering, Fault Localization, Issue Resolution, Large Language Models, Competitive Debate, Graph Traversal 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM) 기반 소프트웨어 이슈 해결 시스템의 ‘제한된 관찰 범위(limited observation scope)’...","categories": ["Review"],
        "tags": ["Review","Multi-Agent System","Software Engineering","Fault Localization","Issue Resolution","Large Language Models","Competitive Debate","Graph Traversal"],
        "url": "/ai/review/2025-8-4-SWE-Debate__Competitive_Multi-Agent_Debate_for_Software_Issue_Resolution/",
        "teaser": null
      },{
        "title": "[논문리뷰] SWE-Exp: Experience-Driven Software Issue Resolution",
        "excerpt":"링크: 논문 PDF로 바로 열기 SWE-Exp: Experience-Driven Software Issue Resolution 저자: Silin Chen, Yuling Shi, Dong Chen, Shaoxin Lin, Heng Lian, Weiguo Sun, Qianxiang Wang, Xiaodong Gu, Longfei Yun, Lin Cao 키워드: Software Issue Resolution, LLM Agents, Experience-Driven Learning, Automated Program Repair, Multi-Agent Systems, Knowledge Management, Continuous Learning 핵심 연구...","categories": ["Review"],
        "tags": ["Review","Software Issue Resolution","LLM Agents","Experience-Driven Learning","Automated Program Repair","Multi-Agent Systems","Knowledge Management","Continuous Learning"],
        "url": "/ai/review/2025-8-4-SWE-Exp__Experience-Driven_Software_Issue_Resolution/",
        "teaser": null
      },{
        "title": "[논문리뷰] SpA2V: Harnessing Spatial Auditory Cues for Audio-driven Spatially-aware Video Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Kien T. Pham, Yingqing He, Yazhou Xing, Qifeng Chen, Long Chen 키워드: Audio-driven Video Generation, Spatial Auditory Cues, Video Scene Layout, MLLM, Diffusion Models, Training-free 핵심 연구 목표 본 논문은 기존 오디오 기반 비디오 생성 모델들이 주로 시맨틱 정보에만 초점을 맞춰 공간적 일관성이 부족하다는...","categories": ["Review"],
        "tags": ["Review","Audio-driven Video Generation","Spatial Auditory Cues","Video Scene Layout","MLLM","Diffusion Models","Training-free"],
        "url": "/ai/review/2025-8-4-SpA2V__Harnessing_Spatial_Auditory_Cues_for_Audio-driven_Spatially-aware%20__Video_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] A Glimpse to Compress: Dynamic Visual Token Pruning for Large Vision-Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 A Glimpse to Compress: Dynamic Visual Token Pruning for Large Vision-Language Models 저자: Quan-Sheng Zeng, Yunheng Li, Qilong Wang, Peng-Tao Jiang, Zuxuan Wu, Ming-Ming Cheng, Qibin Hou 핵심 연구 목표 본 연구는 대규모 시각-언어 모델(LVLM)에서 고해상도 입력 처리 시 발생하는 시각 토큰 폭증으로 인한 비효율성을...","categories": ["Review"],
        "tags": ["Review","Large Vision-Language Models (LVLMs)","Visual Token Pruning","Dynamic Compression","GlimpsePrune","Computational Efficiency","VQA","Reinforcement Learning"],
        "url": "/ai/review/2025-8-5-A_Glimpse_to_Compress__Dynamic_Visual_Token_Pruning_for_Large%20__Vision-Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] AgentTTS: Large Language Model Agent for Test-time Compute-optimal Scaling Strategy in Complex Tasks",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Fali Wang, Hui Liu, Zhenwei Dai, Jingying Zeng, Zhiwei Zhang, Zongyu Wu, Chen Luo, Zhen Li, Xianfeng Tang, Qi He, Suhang Wang 핵심 연구 목표 본 논문은 기존 연구가 주로 단일 단계 태스크에 집중했던 것과 달리, 다단계 복합 태스크에서 테스트 시점 컴퓨팅 최적 스케일링이라는...","categories": ["Review"],
        "tags": ["Review","Large Language Models","LLM Agents","Test-time Scaling","Compute Optimization","Multi-stage Tasks","Resource Allocation","Search Efficiency"],
        "url": "/ai/review/2025-8-5-AgentTTS__Large_Language_Model_Agent_for_Test-time_Compute-optimal%20__Scaling_Strategy_in_Complex_Tasks/",
        "teaser": null
      },{
        "title": "[논문리뷰] Beyond the Trade-off: Self-Supervised Reinforcement Learning for Reasoning Models' Instruction Following",
        "excerpt":"링크: 논문 PDF로 바로 열기 Beyond the Trade-off: Self-Supervised Reinforcement Learning for Reasoning Models’ Instruction Following 저자: Jiaqing Liang, Jie Zeng, Bowei Zhang, Qianyu He, Qingyu Ren 핵심 연구 목표 본 논문은 추론 모델에서 나타나는 추론 능력과 지시 따르기 능력 간의 트레이드오프 문제를 해결하고자 합니다. 기존 접근법이 외부의 강력한 모델에...","categories": ["Review"],
        "tags": ["Review","Self-Supervised RL","Instruction Following","Reasoning Models","Large Language Models","Reward Modeling","Curriculum Learning"],
        "url": "/ai/review/2025-8-5-Beyond_the_Trade-off__Self-Supervised_Reinforcement_Learning_for%20__Reasoning_Models'_Instruction_Following/",
        "teaser": null
      },{
        "title": "[논문리뷰] CellForge: Agentic Design of Virtual Cell Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Daniel Shao, Yan Cui, Jiapeng Chen, Zhuoyun Yu, Xiangru Tang 핵심 연구 목표 본 논문은 복잡한 생물학적 시스템, 이질적인 데이터 양식, 그리고 다학제적 전문 지식의 필요성으로 인해 어려움을 겪는 가상 세포 모델의 자율적인 구축 문제를 해결하고자 합니다. 주어진 생물학적 데이터셋과 연구 목표를 최적화된 계산...","categories": ["Review"],
        "tags": ["Review","AI Scientist","Multi-Agent System","Virtual Cell Modeling","Single-Cell Perturbation Prediction","Deep Learning","Automated Model Design","Code Generation","Retrieval-Augmented Generation"],
        "url": "/ai/review/2025-8-5-CellForge__Agentic_Design_of_Virtual_Cell_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Cyber-Zero: Training Cybersecurity Agents without Runtime",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Terry Yue Zhuo, Dingmin Wang, Hantian Ding, Varun Kumar, Zijian Wang 핵심 연구 목표 기존 대규모 언어 모델(LLM) 기반 소프트웨어 엔지니어링 에이전트들이 실행 환경을 통해 학습하지만, 사이버 보안 도메인에서는 이러한 실행 환경이 부족하여 고급 훈련 데이터 확보가 어렵습니다. 이 연구는 이러한 제약을 극복하고 런타임...","categories": ["Review"],
        "tags": ["Review","Cybersecurity Agents","LLM Training","Trajectory Synthesis","Runtime-Free Training","CTF Challenges","LLM Simulation"],
        "url": "/ai/review/2025-8-5-Cyber-Zero__Training_Cybersecurity_Agents_without_Runtime/",
        "teaser": null
      },{
        "title": "[논문리뷰] Exploitation Is All You Need... for Exploration",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Micah Rentschler, Jesse Roberts 핵심 연구 목표 본 논문은 기존 RL에서 탐색을 위해 명시적인 인센티브를 부여하는 방식과 달리, 순수한 탐욕적인(exploitation-only) 목적만으로도 탐색적 행동이 자연스럽게 나타날 수 있는지 검증하는 것을 목표로 합니다. 이를 위해 반복적인 환경 구조, 에이전트 메모리, 장기 신용 할당이라는 세 가지 핵심...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Exploration-Exploitation","Meta-RL","Transformer Architecture","Emergent Behavior","Multi-Armed Bandits","Gridworlds","Pseudo-Thompson Sampling"],
        "url": "/ai/review/2025-8-5-Exploitation_Is_All_You_Need/._for_Exploration/",
        "teaser": null
      },{
        "title": "[논문리뷰] InstructVLA: Vision-Language-Action Instruction Tuning from Understanding to Manipulation",
        "excerpt":"링크: 논문 PDF로 바로 열기 InstructVLA: Vision-Language-Action Instruction Tuning: From Understanding to Manipulation 저자: Shuai Yang, Hao Li, Yilun Chen, Bin Wang, Yang Tian, Tai Wang, Hanqing Wang, Feng Zhao, Yiyi Liao, Jiangmiao Pang 핵심 연구 목표 본 논문은 로봇이 실제 환경에서 효과적으로 작동하기 위해 멀티모달 추론과 정확한 동작 생성을...","categories": ["Review"],
        "tags": ["Review","Vision-Language-Action (VLA)","Instruction Tuning","Multimodal Reasoning","Robotic Manipulation","Catastrophic Forgetting","Mixture-of-Experts (MoE)","Flow Matching"],
        "url": "/ai/review/2025-8-5-InstructVLA__Vision-Language-Action_Instruction_Tuning_from%20__Understanding_to_Manipulation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Llama-3.1-FoundationAI-SecurityLLM-8B-Instruct Technical Report",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Anu Vellore, Baturay Saglam, Blaine Nelson, Paul Kassianik, Sajana Weerawardhena 핵심 연구 목표 본 연구는 대규모 언어 모델(LLM)의 사이버 보안 분야 통합이 데이터 부족, 복잡한 표현, 안전 및 규제 문제로 인해 제한적이라는 문제를 해결하고자 합니다. 특히 기존의 Foundation-Sec-8B 기반 모델이 결여했던 대화형 상호작용 및...","categories": ["Review"],
        "tags": ["Review","Large Language Model","Cybersecurity","Instruction Tuning","Direct Preference Optimization","Cyber Threat Intelligence","Foundation Model","Chatbot"],
        "url": "/ai/review/2025-8-5-Llama-3.1-FoundationAI-SecurityLLM-8B-Instruct_Technical_Report/",
        "teaser": null
      },{
        "title": "[논문리뷰] Personalized Safety Alignment for Text-to-Image Diffusion Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yu Lei, Jinbin Bai, Qingyu Shi, Aosong Feng, Kaidong Yu 핵심 연구 목표 현재 텍스트-투-이미지(T2I) 확산 모델의 안전 메커니즘이 사용자의 다양한 연령, 정신 건강, 개인 신념 등의 선호도를 고려하지 않고 일률적인 기준을 적용하여 발생하는 한계를 해결하고자 합니다. 본 연구는 사용자별 안전 선호도에 맞춰 모델의...","categories": ["Review"],
        "tags": ["Review","Personalized Safety Alignment","Text-to-Image Diffusion Models","DPO","User Preferences","Content Moderation","Generative AI","Cross-Attention","Safety Alignment"],
        "url": "/ai/review/2025-8-5-Personalized_Safety_Alignment_for_Text-to-Image_Diffusion_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Qwen-Image Technical Report",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Kaiyuan Gao, Junyang Lin, Jingren Zhou, Jiahao Li, Chenfei Wu 핵심 연구 목표 본 논문은 복잡한 텍스트 렌더링 및 정밀한 이미지 편집 분야에서 기존 텍스트-이미지(T2I) 모델의 한계를 해결하는 것을 목표로 합니다. 특히, 다중 줄 레이아웃, 비알파벳 언어(예: 중국어) 렌더링, 그리고 편집 시 의미적/시각적 일관성...","categories": ["Review"],
        "tags": ["Review","Image Generation","Text-to-Image","Image Editing","Text Rendering","Multimodal Diffusion Transformer","Curriculum Learning","Reinforcement Learning","Foundation Model"],
        "url": "/ai/review/2025-8-5-Qwen-Image_Technical_Report/",
        "teaser": null
      },{
        "title": "[논문리뷰] RoboMemory: A Brain-inspired Multi-memory Agentic Framework for Lifelong Learning in Physical Embodied Systems",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Mingcong Lei, Honghao Cai, Zezhou Cui, Liangchen Tan, Junkun Hong, Gehan Hu, et al. 핵심 연구 목표 이 논문은 물리적 환경에 배치된 로봇 에이전트의 평생 학습(Lifelong Learning) 및 장기 계획(Long-term Planning)을 위한 뇌에서 영감을 받은 다중 메모리 프레임워크인 RoboMemory를 제안합니다. 복잡한 실제 환경에서 발생하는...","categories": ["Review"],
        "tags": ["Review","Brain-inspired AI","Lifelong Learning","Embodied AI","Multi-memory Systems","Knowledge Graph","Robotics","Closed-Loop Planning"],
        "url": "/ai/review/2025-8-5-RoboMemory__A_Brain-inspired_Multi-memory_Agentic_Framework_for_Lifelong%20__Learning_in_Physical_Embodied_Systems/",
        "teaser": null
      },{
        "title": "[논문리뷰] SitEmb-v1.5: Improved Context-Aware Dense Retrieval for Semantic Association and Long Story Comprehension",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Junjie Wu, Jiangnan Li, Yuqing Li, Lemao Liu, Liyan Xu, Jiwei Li, Dit-Yan Yeung, Jie Zhou, Mo Yu 핵심 연구 목표 본 논문은 장문 문서에 대한 RAG(Retrieval-Augmented Generation) 시스템에서 기존 임베딩 모델의 한계를 극복하는 것을 목표로 합니다. 특히, 긴 문서의 맥락에 대한 의존성으로 인해...","categories": ["Review"],
        "tags": ["Review","Dense Retrieval","Context-Aware Embedding","RAG","Long Document Comprehension","Residual Learning","Semantic Association","Text Embedding"],
        "url": "/ai/review/2025-8-5-SitEmb-v1.5__Improved_Context-Aware_Dense_Retrieval_for_Semantic%20__Association_and_Long_Story_Comprehension/",
        "teaser": null
      },{
        "title": "[논문리뷰] VeOmni: Scaling Any Modality Model Training with Model-Centric Distributed Recipe Zoo",
        "excerpt":"링크: 논문 PDF로 바로 열기 VeOmni: Scaling Any Modality Model Training with Model-Centric Distributed Recipe Zoo 저자: Qianli Ma, Yaowei Zheng, Zhelun Shi, Zhongkai Zhao, Bin Jia, Ziyue Huang, Zhiqi Lin, Youjie Li, Jiacheng Yang, Yanghua Peng, Zhi Zhang, Xin Liu 핵심 연구 목표 본 논문은 다양한 모달리티를 처리하는 복잡하고...","categories": ["Review"],
        "tags": ["Review","Omni-modal LLMs","Distributed Training","Model-centric","Parallelism","FSDP","Sequence Parallelism","Expert Parallelism","Mixture-of-Experts"],
        "url": "/ai/review/2025-8-5-VeOmni__Scaling_Any_Modality_Model_Training_with_Model-Centric%20__Distributed_Recipe_Zoo/",
        "teaser": null
      },{
        "title": "[논문리뷰] AlignGuard-LoRA: Alignment-Preserving Fine-Tuning via Fisher-Guided Decomposition and Riemannian-Geodesic Collision Regularization",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Amitava Das, Abhilekh Borah, Vinija Jain, Aman Chadha 핵심 연구 목표 대규모 언어 모델(LLM)의 LoRA 미세 조정 과정에서 발생하는 정렬 드리프트(alignment drift) 문제를 해결하여, 안전 및 행동 제약을 유지하면서도 새로운 태스크에 대한 성능 저하를 방지하는 것을 목표로 합니다. 이는 미세 조정 과정에서 안전 관련...","categories": ["Review"],
        "tags": ["Review","Alignment Preservation","Fine-Tuning","LoRA","Fisher Information Matrix","Catastrophic Forgetting","LLM Safety","Riemannian Geometry","Parameter-Efficient Learning"],
        "url": "/ai/review/2025-8-6-AlignGuard-LoRA_Alignment-Preserving_Fine-Tuning_via_Fisher-Guided_Decomposition_and_Riemannian-Geodesic_Collision_Regularization/",
        "teaser": null
      },{
        "title": "[논문리뷰] CRINN: Contrastive Reinforcement Learning for Approximate Nearest Neighbor Search",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiaoya Li, Xiaofei Sun, Albert Wang, Chris Shum, Jiwei Li 핵심 연구 목표 논문은 ANNS(Approximate Nearest Neighbor Search) 알고리즘 최적화의 수작업적, 전문 지식 의존적 특성을 해결하는 것을 목표로 합니다. LLM을 강화 학습으로 증강하여 실행 속도를 보상 신호로 삼아, ANNS 구현을 자동으로 최적화하는 새로운 패러다임인...","categories": ["Review"],
        "tags": ["Review","Approximate Nearest Neighbor Search","Reinforcement Learning","Large Language Models","Code Optimization","HNSW","Retrieval-Augmented Generation","Contrastive Learning"],
        "url": "/ai/review/2025-8-6-CRINN_Contrastive_Reinforcement_Learning_for_Approximate_Nearest_Neighbor_Search/",
        "teaser": null
      },{
        "title": "[논문리뷰] ChartCap: Mitigating Hallucination of Dense Chart Captioning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Junyoung Lim, Jaewoo Ahn, Gunhee Kim 핵심 연구 목표 본 논문은 시각 언어 모델(VLMs)이 생성하는 차트 캡션의 환각 현상(hallucination)을 줄이고 정보의 정확성 및 밀도를 높이는 것을 목표로 합니다. 기존 데이터셋의 외부 정보 포함 및 차트 유형별 핵심 정보 부족 문제를 해결하여, 모델이 차트 이미지로부터...","categories": ["Review"],
        "tags": ["Review","Chart Captioning","Hallucination Mitigation","Dataset Generation","Visual Language Models","Cycle Consistency","Reference-Free Metric","Data Visualization"],
        "url": "/ai/review/2025-8-6-ChartCap_Mitigating_Hallucination_of_Dense_Chart_Captioning/",
        "teaser": null
      },{
        "title": "[논문리뷰] CompassVerifier: A Unified and Robust Verifier for LLMs Evaluation and Outcome Reward",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shudong Liu, Hongwei Liu, Junnan Liu, Linchen Xiao, Songyang Gao, Chengqi Lyu, Yuzhe Gu, Wenwei Zhang, Derek F. Wong, Songyang Zhang, Kai Chen 핵심 연구 목표 현재 대규모 언어 모델(LLM)의 답변 검증 방식은 규칙 기반 매칭이나 일반 LLM 사용 시 반복적인 사용자 정의, 복잡한...","categories": ["Review"],
        "tags": ["Review","LLM Evaluation","Answer Verification","Reward Model","Benchmarking","Data Augmentation","Reinforcement Learning","Formula Verification","Hallucination Detection"],
        "url": "/ai/review/2025-8-6-CompassVerifier_A_Unified_and_Robust_Verifier_for_LLMs_Evaluation_and_Outcome_Reward/",
        "teaser": null
      },{
        "title": "[논문리뷰] Goedel-Prover-V2: Scaling Formal Theorem Proving with Scaffolded Data Synthesis and Self-Correction",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yong Lin, Shange Tang, Bohan Lyu, Ziran Yang, Jui-Hui Chung, Haoyu Zhao, Lai Jiang, Yihan Geng, Jiawei Ge, Jingruo Sun, Jiayun Wu, Jiri Gesi, Ximing Lu, David Acuna, Kaiyu Yang, Hongzhou Lin, Yejin Choi, Danqi Chen, Sanjeev Arora, Chi Jin 핵심 연구 목표 본...","categories": ["Review"],
        "tags": ["Review","Automated Theorem Proving","Formal Verification","Language Models","Self-Correction","Data Synthesis","Reinforcement Learning","Model Averaging","Lean"],
        "url": "/ai/review/2025-8-6-Goedel-Prover-V2_Scaling_Formal_Theorem_Proving_with_Scaffolded_Data_Synthesis_and_Self-Correction/",
        "teaser": null
      },{
        "title": "[논문리뷰] LAMIC: Layout-Aware Multi-Image Composition via Scalability of Multimodal Diffusion Transformer",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuzhuo Chen, Zehua Ma, Jianhua Wang, Kai Kang, Shunyu Yao, Weiming Zhang 핵심 연구 목표 본 논문은 여러 시각적 레퍼런스와 공간적 레이아웃 정보를 활용하여 일관되고 응집력 있는 이미지를 생성하는 것을 목표로 합니다. 특히, 기존 단일 레퍼런스 확산 모델을 훈련 없이 다중 레퍼런스 시나리오로 확장하고,...","categories": ["Review"],
        "tags": ["Review","Multi-Image Composition","Layout Control","Diffusion Models","Transformer","Attention Mechanisms","Training-Free","Zero-Shot Generalization"],
        "url": "/ai/review/2025-8-6-LAMIC_Layout-Aware_Multi-Image_Composition_via_Scalability_of_Multimodal_Diffusion_Transformer/",
        "teaser": null
      },{
        "title": "[논문리뷰] LiveMCPBench: Can Agents Navigate an Ocean of MCP Tools?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Mo Guozhao, Wenliang Zhong, Jiawei Chen, Xuanang Chen, Yaojie Lu, Hongyu Lin, Ben He, Xianpei Han, Le Sun 핵심 연구 목표 본 논문은 기존 도구 사용 벤치마크가 시뮬레이션되거나 소규모의 MCP(Model Context Protocol) 서버에 국한되어 실제 대규모의 동적인 환경을 반영하지 못하는 한계를 지적합니다. 이에 따라...","categories": ["Review"],
        "tags": ["Review","LLM Agent","Tool-use","MCP","Benchmark","Large-scale","Real-world tasks","Automated Evaluation","Meta-tool-learning"],
        "url": "/ai/review/2025-8-6-LiveMCPBench_Can_Agents_Navigate_an_Ocean_of_MCP_Tools/",
        "teaser": null
      },{
        "title": "[논문리뷰] LongVie: Multimodal-Guided Controllable Ultra-Long Video Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chenyang Si, Jianfeng Feng, Xian Liu, Zhaoxi Chen, Jianxiong Gao, Yanwei Fu, Yu Qiao, Ziwei Liu 핵심 연구 목표 본 논문은 기존 비디오 생성 모델이 짧은 클립에는 효과적이지만, 시간적 불일치(temporal inconsistency)와 시각적 품질 저하(visual degradation) 문제로 인해 1분 이상의 초장시간 비디오 생성에 어려움을 겪는...","categories": ["Review"],
        "tags": ["Review","Ultra-long Video Generation","Multimodal Guidance","Controllable Video Generation","Diffusion Models","Temporal Consistency","Visual Quality","Autoregressive Generation","Degradation-aware Training"],
        "url": "/ai/review/2025-8-6-LongVie_Multimodal-Guided_Controllable_Ultra-Long_Video_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Multi-human Interactive Talking Dataset",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zeyu Zhu, Weijia Wu, Mike Zheng Shou 핵심 연구 목표 기존 단일 화자 또는 얼굴 기반의 오디오-구동 비디오 생성 모델의 한계를 극복하고, 다중 인간 상호작용을 현실적으로 모델링하는 새로운 과제인 다중 인간 대화 비디오 생성(Multi-Human Talking Video Generation)을 정의하는 것을 목표로 합니다. 이를 위해, 다중...","categories": ["Review"],
        "tags": ["Review","Multi-human Video Generation","Interactive Talking","Dataset","Audio-driven Animation","Pose Control","Speech Interaction","Diffusion Models"],
        "url": "/ai/review/2025-8-6-Multi-human_Interactive_Talking_Dataset/",
        "teaser": null
      },{
        "title": "[논문리뷰] Seed Diffusion: A Large-Scale Diffusion Language Model with High-Speed Inference",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Fan Xia, Pengyang Gao, Cheng Luo, Zheng Zhang, Yuxuan Song 핵심 연구 목표 본 논문은 이산 상태 확산 모델(discrete-state diffusion models)의 고질적인 문제인 토큰-순서 모델링의 유도 편향과 추론 비효율성을 해결하여, 코드 생성 대규모 언어 모델(LLM)의 추론 속도를 혁신적으로 향상시키면서도 경쟁력 있는 품질을 유지하는 것을...","categories": ["Review"],
        "tags": ["Review","Diffusion Models","Language Models","Code Generation","Non-Autoregressive Inference","High-Speed Inference","Discrete Diffusion","LLM Inference"],
        "url": "/ai/review/2025-8-6-Seed_Diffusion_A_Large-Scale_Diffusion_Language_Model_with_High-Speed_Inference/",
        "teaser": null
      },{
        "title": "[논문리뷰] Skywork UniPic: Unified Autoregressive Modeling for Visual Understanding and Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Peiyu Wang, Yi Peng, Yimeng Gan, Liang Hu, Eric Li, Xuchen Song, Tianyidan Xie, Xiaokun Wang, Yichen Wei, Chuanxin Tang, Bo Zhu, Changshi Li, Hongyang Wei, Yang Liu, Yahui Zhou 핵심 연구 목표 본 논문은 이미지 이해, 텍스트-투-이미지 생성, 이미지 편집 기능을 단일 아키텍처...","categories": ["Review"],
        "tags": ["Review","Autoregressive Models","Multimodal AI","Image Generation","Image Editing","Visual Understanding","Unified Architecture","Parameter Efficiency"],
        "url": "/ai/review/2025-8-6-Skywork_UniPic_Unified_Autoregressive_Modeling_for_Visual_Understanding_and_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] TRACEALIGN -- Tracing the Drift: Attributing Alignment Failures to Training-Time Belief Sources in LLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Amitava Das, Vinija Jain, Aman Chadha 핵심 연구 목표 이 논문은 대규모 언어 모델(LLM)이 왜 안전하지 않거나 정책을 위반하는 출력을 생성하는 ‘정렬 드리프트(alignment drift)’를 겪는지에 대한 근본적인 원인을 밝히는 것을 목표로 합니다. 단순히 행동적인 실패를 넘어서, 이러한 실패를 모델의 학습 시점 ‘믿음 소스(belief sources)’로...","categories": ["Review"],
        "tags": ["Review","LLM Alignment","Alignment Drift","Training Data Provenance","Belief Conflict Index (BCI)","Suffix Array","Safety Interventions","Reinforcement Learning from Human Feedback","Explainable AI"],
        "url": "/ai/review/2025-8-6-TRACEALIGN_--_Tracing_the_Drift_Attributing_Alignment_Failures_to_Training-Time_Belief_Sources_in_LLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] Tool-integrated Reinforcement Learning for Repo Deep Search",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zexiong Ma, Chao Peng, Qunhong Zeng, Pengfei Gao, Yanzhen Zou, Bing Xie 핵심 연구 목표 소프트웨어 이슈 설명과 실제 결함 코드 사이의 의미론적 간극 및 다중 홉 추론으로 인해 발생하는 이슈 로컬라이제이션(결함 코드 위치 식별)의 어려움을 해결하는 것이 목표입니다. 특히, LLM 기반 에이전트가 저장소...","categories": ["Review"],
        "tags": ["Review","Issue Localization","Large Language Models (LLMs)","Reinforcement Learning (RL)","Supervised Fine-tuning (SFT)","Tool-integrated Agents","Software Engineering","Code Search"],
        "url": "/ai/review/2025-8-6-Tool-integrated_Reinforcement_Learning_for_Repo_Deep_Search/",
        "teaser": null
      },{
        "title": "[논문리뷰] A Coarse-to-Fine Approach to Multi-Modality 3D Occupancy Grounding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhan Shi, Song Wang, Junbo Chen, Jianke Zhu 핵심 연구 목표 논문은 기존 바운딩 박스 기반 시각 그라운딩의 한계를 극복하고, 자율주행 환경에서 자연어 설명을 기반으로 객체의 정확한 3D 점유(occupancy) 정보를 파악하는 것을 목표로 합니다. 이를 위해 voxel-level 공간 정밀도를 통합하여 불규칙하거나 부분적으로 가려진 객체에...","categories": ["Review"],
        "tags": ["Review","3D Occupancy Grounding","Multi-modal Learning","Natural Language Understanding","Autonomous Driving","Voxel-based Prediction","Benchmark Dataset","Coarse-to-Fine"],
        "url": "/ai/review/2025-8-7-A_Coarse-to-Fine_Approach_to_Multi-Modality_3D_Occupancy_Grounding/",
        "teaser": null
      },{
        "title": "[논문리뷰] Agent Lightning: Train ANY AI Agents with Reinforcement Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xufang Luo, Yuge Zhang, Zhiyuan He*, Zilong Wang, Siyun Zhao, Dongsheng Li, Luna K. Qiu, Yuqing Yang 핵심 연구 목표 본 논문은 기존 RL(강화 학습) 기반 LLM(대규모 언어 모델) 훈련 방법론들이 에이전트 설계와 밀접하게 결합되어 유연성이 부족하고 복잡한 다중 턴 상호작용에 비효율적이라는 문제를 해결하고자...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Large Language Models","AI Agents","Framework","Markov Decision Process","Hierarchical RL","Training-Agent Disaggregation","Observability"],
        "url": "/ai/review/2025-8-7-Agent_Lightning_Train_ANY_AI_Agents_with_Reinforcement_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] C3D-AD: Toward Continual 3D Anomaly Detection via Kernel Attention with Learnable Advisor",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Haoquan Lu, Hanzhe Liang, Jie Zhang, Chenxi Hu, Jinbao Wang, Can Gao 핵심 연구 목표 본 연구는 3D 이상 감지(Anomaly Detection, AD)에서 기존 클래스-특정 모델의 한계를 극복하고, 새로운 객체 범주가 지속적으로 발생하는 실제 환경에 적응할 수 있는 멀티-클래스 및 연속 학습(Continual Learning) 기능을 갖춘...","categories": ["Review"],
        "tags": ["Review","3D Anomaly Detection","Continual Learning","Kernel Attention","Learnable Advisor","Parameter Perturbation","Point Cloud","Industrial AI"],
        "url": "/ai/review/2025-8-7-C3D-AD_Toward_Continual_3D_Anomaly_Detection_via_Kernel_Attention_with_Learnable_Advisor/",
        "teaser": null
      },{
        "title": "[논문리뷰] CoTox: Chain-of-Thought-Based Molecular Toxicity Reasoning and Prediction",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jueon Park, Yein Park, Minju Song, Soyon Park, Donghyeon Lee, Seungheun Baek, Jaewoo Kang 핵심 연구 목표 기존 AI/ML 독성 예측 모델의 한계(데이터 의존성, 해석 불가능성)와 LLM 기반 접근법의 문제점(SMILES 이해 부족, 생물학적 맥락 부재, 추론 비활용)을 극복하는 것을 목표로 합니다. 화학 구조 정보와...","categories": ["Review"],
        "tags": ["Review","Toxicity Prediction","Large Language Model","Chain-of-Thought","Drug Development","Cheminformatics","Interpretable AI","IUPAC Nomenclature"],
        "url": "/ai/review/2025-8-7-CoTox_Chain-of-Thought-Based_Molecular_Toxicity_Reasoning_and_Prediction/",
        "teaser": null
      },{
        "title": "[논문리뷰] DreamVVT: Mastering Realistic Video Virtual Try-On in the Wild via a Stage-Wise Diffusion Transformer Framework",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Tongchun Zuo, Zaiyu Huang, Shuliang Ning, Ente Lin, Chao Liang, Zerong Zheng, Jianwen Jiang, Yuan Zhang, Mingyuan Gao, Xin Dong 핵심 연구 목표 기존 비디오 가상 피팅(VVT) 기술의 한계, 즉 데이터 부족, 디테일 보존 실패, 비제약적 환경에서의 시간적 일관성 부족 문제를 해결하는 것이 목표입니다....","categories": ["Review"],
        "tags": ["Review","Video Virtual Try-On","Diffusion Transformers","Stage-Wise Framework","Vision-Language Models","LoRA","Temporal Consistency","Garment Preservation"],
        "url": "/ai/review/2025-8-7-DreamVVT_Mastering_Realistic_Video_Virtual_Try-On_in_the_Wild_via_a_Stage-Wise_Diffusion_Transformer_Framework/",
        "teaser": null
      },{
        "title": "[논문리뷰] EVOC2RUST: A Skeleton-guided Framework for Project-Level C-to-Rust Translation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chaofan Wang, Tingrui Yu, Jie Wang, Dong Chen, Wenrui Zhang, Yuling Shi, Xiaodong Gu, Beijun Shen 핵심 연구 목표 레거시 C 코드베이스를 Rust로 자동 변환할 때 발생하는 언어적 불일치(안전성, 관용성) 및 프로젝트 레벨의 모듈 간 종속성 문제를 해결하여, 전체 C 프로젝트를 의미론적으로 동등하고 안전한...","categories": ["Review"],
        "tags": ["Review","C-to-Rust Conversion","Project-Level Translation","Large Language Models","Code Synthesis","Memory Safety","Software Migration","Hybrid Translation"],
        "url": "/ai/review/2025-8-7-EVOC2RUST_A_Skeleton-guided_Framework_for_Project-Level_C-to-Rust_Translation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Efficient Agents: Building Effective Agents While Reducing Cost",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yue Hou, He Zhu, Pai Liu, Xavier Hu, Ningning Wang 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM) 기반 에이전트 시스템의 확장성과 접근성을 위협하는 급증하는 비용 문제를 해결하고자 합니다. 특히 현대 에이전트 시스템에서 효율성-효과성 트레이드오프에 대한 최초의 체계적인 연구를 수행하여, 에이전트 태스크가 본질적으로 요구하는...","categories": ["Review"],
        "tags": ["Review","LLM Agents","Cost Efficiency","Performance-Cost Trade-off","Agent Frameworks","GAIA Benchmark","Optimization","Resource Management"],
        "url": "/ai/review/2025-8-7-Efficient_Agents_Building_Effective_Agents_While_Reducing_Cost/",
        "teaser": null
      },{
        "title": "[논문리뷰] Enhancing Vision-Language Model Training with Reinforcement Learning in Synthetic Worlds for Real-World Success",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: George Bredis, Stanislav Dereka, Viacheslav Sinii, Ruslan Rakhimov, Daniil Gavrilov 핵심 연구 목표 본 논문은 대규모 시각-언어 모델(VLM)이 다단계의 상호작용적 에이전트 태스크에서 직면하는 어려움을 해결하고, 특히 훈련 환경을 넘어 실세계 벤치마크로 학습된 행동을 일반화하는 능력을 향상시키는 것을 목표로 합니다. 기존 RL 기법들이 가진 불안정한...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Vision-Language Models","Synthetic Worlds","Transfer Learning","PPO","Actor-Critic","Embodied AI"],
        "url": "/ai/review/2025-8-7-Enhancing_Vision-Language_Model_Training_with_Reinforcement_Learning_in_Synthetic_Worlds_for_Real-World_Success/",
        "teaser": null
      },{
        "title": "[논문리뷰] Gaussian Variation Field Diffusion for High-fidelity Video-to-4D Synthesis",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Bowen Zhang, Sicheng Xu, Chuxin Wang, Jiaolong Yang, Feng Zhao, Dong Chen, Baining Guo 핵심 연구 목표 본 논문은 단일 비디오 입력으로부터 고품질의 동적인 3D 콘텐츠(4D)를 생성하는 문제를 해결하고자 합니다. 특히, 기존 4D 확산 모델링의 주요 도전 과제인 데이터 구축 비용 및 3D 형상,...","categories": ["Review"],
        "tags": ["Review","4D Generation","Video-to-3D Synthesis","Gaussian Splatting","Diffusion Models","Latent Space Modeling","Variational Autoencoder","Temporal Coherence"],
        "url": "/ai/review/2025-8-7-Gaussian_Variation_Field_Diffusion_for_High-fidelity_Video-to-4D_Synthesis/",
        "teaser": null
      },{
        "title": "[논문리뷰] HPSv3: Towards Wide-Spectrum Human Preference Score",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuhang Ma, Xiaoshi Wu, Keqiang Sun, Hongsheng Li 핵심 연구 목표 본 논문은 기존 텍스트-이미지 생성 모델 평가를 위한 인간 중심 지표들이 제한적인 데이터 커버리지, 불완전한 특징 추출, 비효율적인 손실 함수로 인해 인간의 선호도와 충분히 정렬되지 못하는 문제를 해결하는 것을 목표로 합니다. 이는 고급...","categories": ["Review"],
        "tags": ["Review","Human Preference Score","Text-to-Image Generation","Image Evaluation","Vision-Language Models (VLMs)","Uncertainty-Aware Ranking Loss","Dataset","Iterative Refinement","Chain-of-Thought"],
        "url": "/ai/review/2025-8-7-HPSv3_Towards_Wide-Spectrum_Human_Preference_Score/",
        "teaser": null
      },{
        "title": "[논문리뷰] IAUNet: Instance-Aware U-Net",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yaroslav Prytula, Illia Tsiporenko, Ali Zeynalli, Dmytro Fishman 핵심 연구 목표 본 논문은 생의학 이미징 분야에서 널리 사용되는 U-Net 아키텍처와 인스턴스 분할 태스크 간의 격차를 해소하는 것을 목표로 합니다. 특히, 기존 쿼리 기반 모델이 단일 스케일 특징에 의존하는 한계를 극복하고 U-Net의 스킵 연결에서 얻는...","categories": ["Review"],
        "tags": ["Review","Instance Segmentation","U-Net","Query-based Model","Transformer Decoder","Biomedical Imaging","Cell Segmentation","Deep Learning"],
        "url": "/ai/review/2025-8-7-IAUNet_Instance-Aware_U-Net/",
        "teaser": null
      },{
        "title": "[논문리뷰] IFDECORATOR: Wrapping Instruction Following Reinforcement Learning with Verifiable Rewards",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xu Guo, Tianyi Liang, Tong Jian, Xiaogui Yang, Ling-I Wu, Chenhui Li, Zhihui Lu, Qipeng Guo, Kai Chen 핵심 연구 목표 본 논문은 LLM의 지시 따르기 능력을 향상시키는 Verifiable Rewards 기반 강화 학습(RLVR)이 겪는 두 가지 주요 문제점을 해결하고자 합니다. 첫째, 훈련 비효율성(불충분한 난이도...","categories": ["Review"],
        "tags": ["Review","Instruction Following","Reinforcement Learning","Reward Hacking","LLMs","Curriculum Learning","Data Flywheel","Verifiable Rewards"],
        "url": "/ai/review/2025-8-7-IFDECORATOR_Wrapping_Instruction_Following_Reinforcement_Learning_with_Verifiable_Rewards/",
        "teaser": null
      },{
        "title": "[논문리뷰] Is Chain-of-Thought Reasoning of LLMs a Mirage? A Data Distribution Lens",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chengshuai Zhao, Zhen Tan, Pingchuan Ma, Dawei Li, Bohan Jiang, Yancheng Wang, Yingzhen Yang, Huan Liu 핵심 연구 목표 본 연구는 대규모 언어 모델(LLM)의 Chain-of-Thought (CoT) 추론이 진정한 논리적 추론이 아닌, 훈련 데이터 분포에 강하게 의존하는 표면적인 패턴 매칭일 가능성을 탐구합니다. 특히, CoT 추론이...","categories": ["Review"],
        "tags": ["Review","Chain-of-Thought","LLMs","OOD Generalization","Data Distribution Shift","Reasoning","Pattern Matching","DataAlchemy"],
        "url": "/ai/review/2025-8-7-Is_Chain-of-Thought_Reasoning_of_LLMs_a_Mirage_A_Data_Distribution_Lens/",
        "teaser": null
      },{
        "title": "[논문리뷰] LaTCoder: Converting Webpage Design to Code with Layout-as-Thought",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yi Gui, Zhen Li, Zhongyi Zhang, Guohao Wang, Tianpeng Lv, Gaoyang Jiang, Yi Liu, Dongping Chen, Yao Wan, Hongyu Zhang, Wenbin Jiang, Xuanhua Shi, Hai Jin 핵심 연구 목표 본 연구는 멀티모달 대규모 언어 모델(MLLM)이 웹페이지 디자인을 코드로 변환하는 과정에서 레이아웃을 정확하게 유지하지 못하는...","categories": ["Review"],
        "tags": ["Review","Design-to-Code","Webpage Generation","Multimodal Large Language Models (MLLMs)","Layout Preservation","Chain-of-Thought (CoT)","UI Automation","Code Generation"],
        "url": "/ai/review/2025-8-7-LaTCoder_Converting_Webpage_Design_to_Code_with_Layout-as-Thought/",
        "teaser": null
      },{
        "title": "[논문리뷰] LeanK: Learnable K Cache Channel Pruning for Efficient Decoding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yike Zhang, Zhiyuan He, Huiqiang Jiang, Chengruidong Zhang, Yuqing Yang, Jianyong Wang, Lili Qiu 핵심 연구 목표 대규모 언어 모델(LLMs)에서 증가하는 Key-Value(KV) 캐시 크기로 인한 GPU 메모리 사용량 증가와 느린 추론 속도 문제를 해결하는 것이 목표입니다. 특히 K 캐시의 채널 차원 내에 존재하는 활용되지...","categories": ["Review"],
        "tags": ["Review","LLM","KV Cache Optimization","Model Pruning","Efficient Decoding","Memory Optimization","Static Sparsity","Transformer"],
        "url": "/ai/review/2025-8-7-LeanK_Learnable_K_Cache_Channel_Pruning_for_Efficient_Decoding/",
        "teaser": null
      },{
        "title": "[논문리뷰] Light-IF: Endowing LLMs with Generalizable Reasoning via Preview and Self-Checking for Complex Instruction Following",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chenyang Wang, Liang Wen, Shousheng Jia, Xiangzheng Zhang, Liang Xu 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)이 복잡한 지시를 따를 때 흔히 발생하는 “게으른 추론” 문제로 인한 일관성 부족을 해결하고자 합니다. 특히, 모델이 엄격한 지시 사항을 준수하도록 미리 보기(previewing) 및 자기 점검(self-checking) 메커니즘을...","categories": ["Review"],
        "tags": ["Review","LLMs","Instruction Following","Reasoning","Reinforcement Learning","Supervised Fine-tuning","Entropy Regularization","Self-Checking","Previewing"],
        "url": "/ai/review/2025-8-7-Light-IF_Endowing_LLMs_with_Generalizable_Reasoning_via_Preview_and_Self-Checking_for_Complex_Instruction_Following/",
        "teaser": null
      },{
        "title": "[논문리뷰] MiDashengLM: Efficient Audio Understanding with General Audio Captions",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yadong Niu, Jian Luan, Jizhong Liu, Gang Li, Heinrich Dinkel 핵심 연구 목표 본 논문은 기존 대규모 오디오 언어 모델(LALM)이 직면한 폐쇄형 데이터 의존성, 일반화 및 접근성 한계, 그리고 자동 음성 인식(ASR) 기반 사전 훈련의 비효율성을 해결하고자 합니다. 이를 위해 일반 오디오 캡션을 활용하여...","categories": ["Review"],
        "tags": ["Review","Audio-Language Model","General Audio Captions","Audio Understanding","Speech Recognition","Efficient Inference","Public Datasets","Multimodality","Data Curation"],
        "url": "/ai/review/2025-8-7-MiDashengLM_Efficient_Audio_Understanding_with_General_Audio_Captions/",
        "teaser": null
      },{
        "title": "[논문리뷰] OpenMed NER: Open-Source, Domain-Adapted State-of-the-Art Transformers for Biomedical NER Across 12 Public Datasets",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Maziyar Panahi 핵심 연구 목표 의료 및 생명 과학 분야에서 비정형 텍스트로부터 구조화된 정보를 추출하는 데 필수적인 Named Entity Recognition (NER)의 성능과 효율성을 개선하는 것을 목표로 합니다. 특히, 다양한 엔티티 유형에 걸쳐 최첨단(SOTA) 성능을 달성하면서도 연산 효율성을 유지하고, 데이터 보호 규정을 준수하는 로컬 배포...","categories": ["Review"],
        "tags": ["Review","Biomedical NER","Transformer","Domain Adaptation","LoRA","Open-Source","Named Entity Recognition","Healthcare AI"],
        "url": "/ai/review/2025-8-7-OpenMed_NER_Open-Source_Domain-Adapted_State-of-the-Art_Transformers_for_Biomedical_NER_Across_12_Public_Datasets/",
        "teaser": null
      },{
        "title": "[논문리뷰] Position: The Current AI Conference Model is Unsustainable! Diagnosing the Crisis of Centralized AI Conference",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Nuo Chen, Moming Duan, Andre Huikai Lin, Qian Wang, Jiaying Wu, Bingsheng He 핵심 연구 목표 본 논문은 현재 AI 학술 대회의 중앙 집중식 모델이 급격한 성장으로 인해 비정상적이고 지속 불가능한 상태에 도달했음을 진단합니다. 과학적 지식 확산, 형평성, 커뮤니티 복지와 같은 본질적인 목표를 위협하는...","categories": ["Review"],
        "tags": ["Review","AI Conferences","Sustainability","Peer Review","Community Building","Environmental Impact","Mental Health","Centralized Model","Decentralized Model"],
        "url": "/ai/review/2025-8-7-Position_The_Current_AI_Conference_Model_is_Unsustainable_Diagnosing_the_Crisis_of_Centralized_AI_Conference/",
        "teaser": null
      },{
        "title": "[논문리뷰] RL-PLUS: Countering Capability Boundary Collapse of LLMs in Reinforcement Learning with Hybrid-policy Optimization",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yihong Dong, Xue Jiang, Yongding Tao, Huanyu Liu, Kechi Zhang, Lili Mou, Rongyu Cao, Yingwei Ma, Jue Chen, Binhua Li, Zhi Jin, Fei Huang, Yongbin Li, Ge Li 핵심 연구 목표 본 논문은 LLM의 강화 학습(RLVR) 과정에서 발생하는 ‘능력 경계 붕괴(capability boundary collapse)’ 문제를...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Reinforcement Learning","Capability Collapse","Hybrid Policy Optimization","Multiple Importance Sampling","Exploration","Math Reasoning","Out-of-Distribution"],
        "url": "/ai/review/2025-8-7-RL-PLUS_Countering_Capability_Boundary_Collapse_of_LLMs_in_Reinforcement_Learning_with_Hybrid-policy_Optimization/",
        "teaser": null
      },{
        "title": "[논문리뷰] Reasoning Language Models for Root Cause Analysis in 5G Wireless Networks",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Mohamed Sanat, Nicola Piovesan, Antonio De Domenico, Yibin Kang, Haozhe Zhang, Merouane Debbah, Fadhel Ayed 핵심 연구 목표 본 논문은 5G 모바일 네트워크에서 해석 가능성, 도메인 전문성, 인과적 추론이 필요한 루트 원인 분석(RCA)의 어려운 문제를 해결하고자 합니다. 특히, 대규모 언어 모델(LLMs)을 활용하여 성능 저하의...","categories": ["Review"],
        "tags": ["Review","Root Cause Analysis","Large Language Models","5G Wireless Networks","Supervised Fine-Tuning","Reinforcement Learning","Chain-of-Thought","TeleLogs Dataset"],
        "url": "/ai/review/2025-8-7-Reasoning_Language_Models_for_Root_Cause_Analysis_in_5G_Wireless_Networks/",
        "teaser": null
      },{
        "title": "[논문리뷰] SEAgent: Self-Evolving Computer Use Agent with Autonomous Learning from Experience",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zeyi Sun, Ziyu Liu, Yuhang Zang, Yuhang Cao, Xiaoyi Dong, Tong Wu, Dahua Lin, Jiaqi Wang 핵심 연구 목표 본 논문은 기존 컴퓨터 사용 에이전트(CUA)가 인간 주석 데이터에 크게 의존하고 새로운 또는 전문화된 소프트웨어 환경에서 어려움을 겪는 문제를 해결합니다. 인간의 개입 없이 에이전트가 낯선...","categories": ["Review"],
        "tags": ["Review","Computer Use Agent","Self-Evolving","Reinforcement Learning","Curriculum Learning","Vision-Language Models","Experiential Learning","Specialist-to-Generalist"],
        "url": "/ai/review/2025-8-7-SEAgent_Self-Evolving_Computer_Use_Agent_with_Autonomous_Learning_from_Experience/",
        "teaser": null
      },{
        "title": "[논문리뷰] Sculptor: Empowering LLMs with Cognitive Agency via Active Context Management",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Mo Li, L.H. Xu, Qitai Tan, Ting Cao, Yunxin Liu 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)이 긴 컨텍스트를 처리할 때 발생하는 사전 간섭(proactive interference) 문제와 이로 인한 성능 저하를 해결하고자 합니다. 기존 컨텍스트 확장이나 외부 메모리 시스템으로는 해결하기 어려운, LLM의 내부 작업...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Active Context Management","Proactive Interference","Tool Augmentation","Working Memory","Context Curation","Long Context"],
        "url": "/ai/review/2025-8-7-Sculptor_Empowering_LLMs_with_Cognitive_Agency_via_Active_Context_Management/",
        "teaser": null
      },{
        "title": "[논문리뷰] Sel3DCraft: Interactive Visual Prompts for User-Friendly Text-to-3D Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Nan Xiang, Tianyi Liang, Haiwen Huang, Shiqi Jiang, Hao Huang, Yifei Huang, Liangyu Chen, Changbo Wang, and Chenhui Li 핵심 연구 목표 텍스트-3D(T23D) 생성 과정에서 발생하는 ‘블라인드 시행착오’ 프롬프트 문제와 그로 인한 예측 불가능한 결과 및 비효율적인 워크플로우를 해결하는 것이 주 목표입니다. 기존 2D...","categories": ["Review"],
        "tags": ["Review","Text-to-3D Generation","Prompt Engineering","Visual Analytics","Human-Computer Interaction","Multi-modal Large Language Models","3D Model Evaluation"],
        "url": "/ai/review/2025-8-7-Sel3DCraft_Interactive_Visual_Prompts_for_User-Friendly_Text-to-3D_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] SonicMaster: Towards Controllable All-in-One Music Restoration and Mastering",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jan Melechovsky, Ambuj Mehrish, Dorien Herremans 핵심 연구 목표 본 논문은 과도한 잔향, 왜곡, 클리핑, 음색 불균형 등 다양한 오디오 품질 문제를 해결하는 통합적이고 텍스트 제어 가능한 음악 복원 및 마스터링 모델을 개발하는 것을 목표로 합니다. 기존의 개별적인 전문 도구를 사용하는 복잡하고 수동적인 과정을...","categories": ["Review"],
        "tags": ["Review","Music Restoration","Audio Mastering","Generative Models","Flow Matching","Text-to-Audio","Audio Quality Enhancement","Multi-task Learning","Dataset Creation"],
        "url": "/ai/review/2025-8-7-SonicMaster_Towards_Controllable_All-in-One_Music_Restoration_and_Mastering/",
        "teaser": null
      },{
        "title": "[논문리뷰] Sotopia-RL: Reward Design for Social Intelligence",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Haofei Yu, Zhengyang Qi, Yining Zhao, Kolby Nottingham, Keyang Xuan, Bodhisattwa Prasad Majumder, Hao Zhu, Paul Pu Liang, Jiaxuan You 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)을 사회적으로 지능적인 에이전트로 훈련할 때 직면하는 부분적 관측성(Partial Observability)과 다차원성(Multi-dimensionality)이라는 핵심 과제를 해결하고자 합니다. 이는 기존...","categories": ["Review"],
        "tags": ["Review","Social Intelligence","Reinforcement Learning","Reward Design","Large Language Models","Utterance-level Rewards","Multi-dimensional Rewards","Partial Observability","SOTOPIA"],
        "url": "/ai/review/2025-8-7-Sotopia-RL_Reward_Design_for_Social_Intelligence/",
        "teaser": null
      },{
        "title": "[논문리뷰] The Cow of Rembrandt - Analyzing Artistic Prompt Interpretation in Text-to-Image Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Alfio Ferrara, Sergio Picascia, Elisabetta Rocchetti 핵심 연구 목표 텍스트-투-이미지(txt2img) 확산 모델이 학습 과정에서 명시적인 지침 없이도 회화에서 콘텐츠와 스타일 개념을 내부적으로 어떻게 인코딩하고 분리하는지 탐구하는 것입니다. 특히, 모델이 생성된 이미지에서 내용(무엇이 그려지는가)과 형식(어떻게 그려지는가)을 얼마나 잘 구분하는지를 교차-어텐션 맵을 통해 분석하고자 합니다. 핵심...","categories": ["Review"],
        "tags": ["Review","Text-to-Image Generation","Diffusion Models","Cross-Attention Analysis","Content-Style Disentanglement","Artistic Style Transfer","Explainable AI","SDXL"],
        "url": "/ai/review/2025-8-7-The_Cow_of_Rembrandt_-_Analyzing_Artistic_Prompt_Interpretation_in_Text-to-Image_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Training Long-Context, Multi-Turn Software Engineering Agents with Reinforcement Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Maksim Nekrashevich, Ibragim Badertdinov, Sergei Polezhaev, Maria Trofimova, Alexander Golubev 핵심 연구 목표 본 논문은 실세계 소프트웨어 엔지니어링(SWE)과 같이 상태 저장 환경과의 풍부한 다중 턴 상호작용을 요구하는 복잡한 문제에 강화 학습(RL)을 성공적으로 적용하는 것을 목표로 합니다. 기존 연구가 주로 단일 턴 문제에 국한되었던 한계를...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Large Language Models","Software Engineering","Multi-Turn Interaction","Long Context","DAPO","Autonomous Agents","SWE-BENCH"],
        "url": "/ai/review/2025-8-7-Training_Long-Context_Multi-Turn_Software_Engineering_Agents_with_Reinforcement_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Web-CogReasoner: Towards Knowledge-Induced Cognitive Reasoning for Web Agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuhan Guo, Cong Guo, Aiwen Sun, Hongliang He, Xinyu Yang, Yue Lu, Yingji Zhang, Xuntao Guo, Dong Zhang, Jianzhuang Liu, Jiang Duan, Yijia Xiao, Liangjian Wen, Hai-Ming Xu, Yong Dai 핵심 연구 목표 본 연구는 웹 에이전트가 인간의 인지 추론과 유사하게 동작하도록, 충분한 지식을...","categories": ["Review"],
        "tags": ["Review","Web Agent","Cognitive Reasoning","Knowledge-Induced","Large Multimodal Models (LMMs)","Bloom's Taxonomy","Chain-of-Thought (CoT)","Web-CogDataset","Web-CogBench"],
        "url": "/ai/review/2025-8-7-Web-CogReasoner_Towards_Knowledge-Induced_Cognitive_Reasoning_for_Web_Agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] Are Today's LLMs Ready to Explain Well-Being Concepts?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Bohan Jiang, Dawei Li, Zhen Tan, Chengshuai Zhao, Huan Liu 핵심 연구 목표 본 연구는 대규모 언어 모델(LLMs)이 웰빙 개념을 정확하고 다양한 잠재 고객(일반 대중 및 도메인 전문가)에게 적합하게 설명할 준비가 되어 있는지를 체계적으로 평가하는 것을 목표로 합니다. 특히, 기존 LLM의 한계를 분석하고 미세...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Well-being Concepts","LLM Evaluation","Principle-Guided Evaluation","LLM-as-a-Judge","Supervised Fine-Tuning (SFT)","Direct Preference Optimization (DPO)","Explanation Generation"],
        "url": "/ai/review/2025-8-8-Are_Todays_LLMs_Ready_to_Explain_Well-Being_Concepts/",
        "teaser": null
      },{
        "title": "[논문리뷰] Are We on the Right Way for Assessing Document Retrieval-Augmented Generation?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wenxuan Shen, Mingjia Wang, Yaochen Wang, Dongping Chen, Junjie Yang, Yao Wan, Weiwei Lin 핵심 연구 목표 이 논문은 현재 문서 검색 증강 생성(RAG) 시스템의 평가 벤치마크가 실제 세계의 복잡성과 한계를 제대로 반영하지 못하는 문제점을 해결하고자 합니다. 기존 평가 방식이 제한된 범위, 비현실적인 사전...","categories": ["Review"],
        "tags": ["Review","Retrieval-Augmented Generation","Multimodal LLMs","Benchmark Evaluation","Document Understanding","Multi-hop Reasoning","Information Retrieval","Evaluation Dataset"],
        "url": "/ai/review/2025-8-8-Are_We_on_the_Right_Way_for_Assessing_Document_Retrieval-Augmented_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Can Large Multimodal Models Actively Recognize Faulty Inputs? A Systematic Evaluation Framework of Their Input Scrutiny Ability",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Haiqi Yang, Jinzhe Li, Gengxu Li, Yi Chang, Yuan Wu 핵심 연구 목표 본 논문은 대규모 멀티모달 모델(LMMs)이 결함 있는 입력을 수동적으로 수용하여 잘못된 추론을 유발하는 문제를 해결하고자 합니다. 특히, LMMs가 명시적인 지시 없이도 오류가 있는 입력을 능동적으로 감지하고 분석할 수 있는지에 대한 체계적인...","categories": ["Review"],
        "tags": ["Review","Large Multimodal Models","Input Scrutiny","Error Detection","Faulty Inputs","Evaluation Framework","Modality Preference","Cross-Modal Inconsistency"],
        "url": "/ai/review/2025-8-8-Can_Large_Multimodal_Models_Actively_Recognize_Faulty_Inputs_A_Systematic_Evaluation_Framework_of_Their_Input_Scrutiny_Ability/",
        "teaser": null
      },{
        "title": "[논문리뷰] CoAct-1: Computer-using Agents with Coding as Actions",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Linxin Song, Yutong Dai, Viraj Prabhu, Jieyu Zhang, Taiwei Shi, Li Li, Junnan Li, Silvio Savarese, Zeyuan Chen, Jieyu Zhao, Ran Xu, Caiming Xiong 핵심 연구 목표 이 논문은 복잡하고 장기적인 컴퓨터 사용 태스크에서 GUI(Graphical User Interface) 기반 자율 에이전트의 효율성과 신뢰성 문제를 해결하는...","categories": ["Review"],
        "tags": ["Review","AI Agent","Multi-agent System","GUI Automation","Programmatic Control","Code Generation","OSWorld Benchmark","Hybrid AI"],
        "url": "/ai/review/2025-8-8-CoAct-1_Computer-using_Agents_with_Coding_as_Actions/",
        "teaser": null
      },{
        "title": "[논문리뷰] DeepPHY: Benchmarking Agentic VLMs on Physical Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xinrun Xu, Pi Bu, Ye Wang, Börje F. Karlsson, Ziming Wang 핵심 연구 목표 본 논문은 Vision Language Models(VLMs)이 복잡하고 동적인 물리 환경에서 정확한 행동 계획 및 공간/시간 추론 능력에 한계를 보이는 문제를 해결하고자 합니다. 기존 벤치마크들이 정적 QA나 단순한 물리 시뮬레이션을 다루는 반면,...","categories": ["Review"],
        "tags": ["Review","Vision Language Models (VLMs)","Agentic AI","Physical Reasoning","Benchmark","Simulation Environments","Action Planning","Interactive AI"],
        "url": "/ai/review/2025-8-8-DeepPHY_Benchmarking_Agentic_VLMs_on_Physical_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Don't Overthink It: A Survey of Efficient R1-style Large Reasoning Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Fangzhou Yao, Weibo Gao, Yizhi Wang, Yichao Du, Linan Yue 핵심 연구 목표 본 설문 연구는 DeepSeek R1과 같은 R1-style Large Reasoning Models (LRMs)에서 흔히 발생하는 ‘과잉 사고(overthinking)’ 문제를 해결하고, 효율적인 추론 방법을 체계적으로 분류 및 분석하는 것을 목표로 합니다. 불필요하게 길고 반복적인 추론...","categories": ["Review"],
        "tags": ["Review","Large Reasoning Models","Efficient Reasoning","Chain-of-Thought","Model Optimization","Model Collaboration","Overthinking Problem","LLM Efficiency"],
        "url": "/ai/review/2025-8-8-Dont_Overthink_It_A_Survey_of_Efficient_R1-style_Large_Reasoning_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Evaluating, Synthesizing, and Enhancing for Customer Support Conversation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jie Zhu, Huaixia Dou, Junhui Li, Lifan Guo, Feng Chen, Chi Zhang, Fang Kong 핵심 연구 목표 본 논문은 고객 지원 대화(Customer Support Conversation, CSC) 분야에서 전략적 지침과 고품질 데이터의 부족 문제를 해결하고자 합니다. 궁극적으로는 정확한 문제 해결과 공감 능력을 갖춘 고객 지원 응답을...","categories": ["Review"],
        "tags": ["Review","Customer Support","Dialogue Generation","Large Language Models","Role-Playing","COPC Framework","Synthetic Data","Strategy Prediction","Empathetic AI"],
        "url": "/ai/review/2025-8-8-Evaluating_Synthesizing_and_Enhancing_for_Customer_Support_Conversation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Genie Envisioner: A Unified World Foundation Platform for Robotic Manipulation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shengcong Chen, Donglin Yang, Siyuan Huang, Pengfei Zhou, Yue Liao 핵심 연구 목표 본 논문은 로봇 조작을 위한 통합된 세계 파운데이션 플랫폼 (Genie Envisioner)을 제시하여, 정책 학습, 평가 및 시뮬레이션을 단일 비디오-생성 프레임워크 내에서 통합하는 것을 목표로 합니다. 이는 기존 로봇 개발 과정의 단편적인...","categories": ["Review"],
        "tags": ["Review","Robotic Manipulation","World Model","Video Generation","Diffusion Model","Embodied AI","Foundation Model","Robotics Simulation","Policy Learning"],
        "url": "/ai/review/2025-8-8-Genie_Envisioner_A_Unified_World_Foundation_Platform_for_Robotic_Manipulation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Hi3DEval: Advancing 3D Generation Evaluation with Hierarchical Validity",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuhan Zhang, Long Zhuo, Ziyang Chu, Tong Wu, Zhibing Li, Liang Pan, Dahua Lin, Ziwei Liu 핵심 연구 목표 본 논문은 3D 생성 모델의 품질 평가에 있어 기존 2D 이미지 기반 metrics의 한계와 평가의 거친 입자성(coarse-grained) 문제를 해결하고자 합니다. 특히 공간 일관성, 재료의 진정성,...","categories": ["Review"],
        "tags": ["Review","3D Generation Evaluation","Hierarchical Evaluation","Material Properties","Multi-Agent Annotation","Hybrid Scoring System","Video-based Evaluation","Part-level Analysis"],
        "url": "/ai/review/2025-8-8-Hi3DEval_Advancing_3D_Generation_Evaluation_with_Hierarchical_Validity/",
        "teaser": null
      },{
        "title": "[논문리뷰] Hop, Skip, and Overthink: Diagnosing Why Reasoning Models Fumble during Multi-Hop Analysis",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Reshmi Ghosh, Yashwanth Babu, Srujana Pillarichety, Isha Nalawade, Anushka Yadav 핵심 연구 목표 현재 대규모 언어 모델(LLM)이 다단계(multi-hop) 질문 답변 태스크에서 환각(hallucination)을 보이거나 추론에 실패하는 근본적인 원인을 진단하는 것이 주된 목표입니다. 기존의 최종 답변 정확도나 F1 점수로는 파악하기 어려운 추론 과정의 오류 패턴을 체계적으로...","categories": ["Review"],
        "tags": ["Review","Multi-hop Question Answering","Large Language Models","Reasoning Errors","Error Taxonomy","Human Evaluation","Automated Evaluation","Overthinking"],
        "url": "/ai/review/2025-8-8-Hop_Skip_and_Overthink_Diagnosing_Why_Reasoning_Models_Fumble_during_Multi-Hop_Analysis/",
        "teaser": null
      },{
        "title": "[논문리뷰] I2CR: Intra- and Inter-modal Collaborative Reflections for Multimodal Entity Linking",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ziyan Liu, Junwen Li, Kaiwen Li, Tong Ruan, Chao Wang, Xinyan He, Zongyu Wang, Xuezhi Cao, Jingping Liu 핵심 연구 목표 본 논문은 기존 대규모 언어 모델(LLM) 기반의 다중모달 엔티티 연결(MEL) 방법론이 이미지 데이터를 불필요하게 통합하고 시각적 특징을 단일 추출에 의존하여 성능 저하를 겪는...","categories": ["Review"],
        "tags": ["Review","Multimodal Entity Linking","Large Language Models","Collaborative Reflection","Iterative Reasoning","Visual Information","Text-centric"],
        "url": "/ai/review/2025-8-8-I2CR_Intra-_and_Inter-modal_Collaborative_Reflections_for_Multimodal_Entity_Linking/",
        "teaser": null
      },{
        "title": "[논문리뷰] I Think, Therefore I Am Under-Qualified? A Benchmark for Evaluating Linguistic Shibboleth Detection in LLM Hiring Evaluations",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Julia Kharchenko, Tanya Roosta, Aman Chadha, Chirag Shah 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)이 채용 평가에서 언어적 시볼레트(linguistic shibboleths), 특히 완곡어법(hedging language)을 기반으로 잠재적으로 인구통계학적 편향을 보이는 문제를 해결하고자 합니다. 내용의 질이 동일함에도 불구하고 특정 언어 패턴 때문에 후보자가 불이익을 받는 현상을...","categories": ["Review"],
        "tags": ["Review","LLM Bias","Hiring Evaluation","Linguistic Shibboleth","Hedging Language","Fairness","Benchmarking","Sociolinguistics"],
        "url": "/ai/review/2025-8-8-I_Think_Therefore_I_Am_Under-Qualified_A_Benchmark_for_Evaluating_Linguistic_Shibboleth_Detection_in_LLM_Hiring_Evaluations/",
        "teaser": null
      },{
        "title": "[논문리뷰] InfiAlign: A Scalable and Sample-Efficient Framework for Aligning LLMs to Enhance Reasoning Capabilities",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shuo Cai, Su Lu, Qi Zhou, Kejing Yang, Zhijie Sang, Congkai Xie, Hongxia Yang 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)의 추론 능력을 향상시키기 위한 확장 가능하고 샘플 효율적인 후속 학습 프레임워크인 InfiAlign을 제안합니다. 특히, 데이터 및 계산 비용이 많이 드는 기존 방법론의...","categories": ["Review"],
        "tags": ["Review","LLM Alignment","Reasoning","Data Curation","Supervised Fine-tuning (SFT)","Direct Preference Optimization (DPO)","Sample Efficiency","Scalability","Multi-dimensional Filtering"],
        "url": "/ai/review/2025-8-8-InfiAlign_A_Scalable_and_Sample-Efficient_Framework_for_Aligning_LLMs_to_Enhance_Reasoning_Capabilities/",
        "teaser": null
      },{
        "title": "[논문리뷰] MOSEv2: A More Challenging Dataset for Video Object Segmentation in Complex Scenes",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Henghui Ding, Kaining Ying, Chang Liu, Shuting He, Xudong Jiang 핵심 연구 목표 기존 VOS(Video Object Segmentation) 데이터셋들이 실제와 동떨어진 고립되고 눈에 띄는 객체에 치우쳐 있어 모델의 현실 적용성을 제한하는 문제를 해결하고자 합니다. 본 논문은 MOSEv1의 강점과 한계를 바탕으로, 실세계 환경에서 비디오 객체 분할의...","categories": ["Review"],
        "tags": ["Review","Video Object Segmentation","Dataset","Complex Scenes","Benchmark","Object Tracking","Computer Vision","Dataset Challenges"],
        "url": "/ai/review/2025-8-8-MOSEv2_A_More_Challenging_Dataset_for_Video_Object_Segmentation_in_Complex_Scenes/",
        "teaser": null
      },{
        "title": "[논문리뷰] Marco-Voice Technical Report",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Fengping Tian, Chenyang Lyu, Xuanfan Ni, Haoqin Sun, Qingjuan Li, Zhiqiang Qian, Haijun Li, Longyue Wang, Zhao Xu, Weihua Luo, Kaifu Zhang 핵심 연구 목표 본 논문은 음성 복제(voice cloning)와 감정 제어(emotion control)를 통합한 다기능 음성 합성 시스템인 Marco-Voice를 개발하는 것을 목표로 합니다. 이는...","categories": ["Review"],
        "tags": ["Review","Speech Synthesis","Voice Cloning","Emotion Control","Text-to-Speech","Disentanglement","Contrastive Learning","Flow Matching","Emotional Speech Dataset"],
        "url": "/ai/review/2025-8-8-Marco-Voice_Technical_Report/",
        "teaser": null
      },{
        "title": "[논문리뷰] On the Generalization of SFT: A Reinforcement Learning Perspective with Reward Rectification",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yongliang Wu, Yizhou Zhou, Zhou Ziheng, Yingzhe Peng, Xinyu Ye, Xinting Hu, Wenbo Zhu, Lu Qi, Ming-Hsuan Yang, Xu Yang 핵심 연구 목표 표준 Supervised Fine-Tuning (SFT)이 Reinforcement Learning (RL)에 비해 제한적인 일반화 성능을 보이는 문제를 해결하는 것이 목표입니다. SFT의 그래디언트가 내재적으로 문제가 있는...","categories": ["Review"],
        "tags": ["Review","Supervised Fine-Tuning (SFT)","Reinforcement Learning (RL)","Generalization","Reward Rectification","Dynamic Fine-Tuning (DFT)","LLM","Policy Gradient","Mathematical Reasoning"],
        "url": "/ai/review/2025-8-8-On_the_Generalization_of_SFT_A_Reinforcement_Learning_Perspective_with_Reward_Rectification/",
        "teaser": null
      },{
        "title": "[논문리뷰] PRvL: Quantifying the Capabilities and Risks of Large Language Models for PII Redaction",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Leon Garza, Anantaa Kotal, Aritran Piplai, Lavanya Elluri, Prajit Kumar Das, Aman Chadha 핵심 연구 목표 본 연구는 비정형 텍스트에서 개인 식별 정보(PII)를 자동 제거하는 문제에 초점을 맞춥니다. 기존의 규칙 기반 시스템이나 도메인별 NER 모델이 가진 일반화 능력 부족과 컨텍스트 이해의 한계를 극복하기 위해,...","categories": ["Review"],
        "tags": ["Review","PII Redaction","Large Language Models","Instruction Tuning","Retrieval-Augmented Generation","Privacy Preservation","Model Evaluation","Cross-Domain Generalization","Open-Source LLMs"],
        "url": "/ai/review/2025-8-8-PRvL_Quantifying_the_Capabilities_and_Risks_of_Large_Language_Models_for_PII_Redaction/",
        "teaser": null
      },{
        "title": "[논문리뷰] R-Zero: Self-Evolving Reasoning LLM from Zero Data",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chengsong Huang, Wenhao Yu, Xiaoyang Wang, Hongming Zhang, Zongxia Li, Ruosen Li, Jiaxin Huang, Haitao Mi, Dong Yu 핵심 연구 목표 본 연구는 기존 LLM의 자가 진화 방식이 방대한 인간 큐레이션 데이터에 의존하는 한계를 극복하고자 합니다. R-Zero는 외부 데이터 없이 LLM이 자체적으로 훈련 데이터를...","categories": ["Review"],
        "tags": ["Review","Self-Evolving LLM","Reinforcement Learning","Curriculum Learning","Reasoning","Large Language Models","Self-Play","Zero-Data Training"],
        "url": "/ai/review/2025-8-8-R-Zero_Self-Evolving_Reasoning_LLM_from_Zero_Data/",
        "teaser": null
      },{
        "title": "[논문리뷰] REINA: Regularized Entropy Information-Based Loss for Efficient Simultaneous Speech Translation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Nameer Hirschkind, Joseph Liu, Xiao Yu, Mahesh Kumar Nandwana 핵심 연구 목표 동시 음성 번역(SimulST) 시스템에서 번역 품질과 지연 시간 간의 최적의 균형을 달성하는 것이 주요 과제입니다. 본 논문은 “정보 획득 시에만 더 많은 입력을 기다린다”는 핵심 아이디어를 기반으로, 기존의 비효율적이고 불안정했던 정책 학습...","categories": ["Review"],
        "tags": ["Review","Simultaneous Speech Translation","Adaptive Policy","Entropy-based Loss","Mutual Information","Latency-Quality Trade-off","Speech-to-Text Translation","REINA"],
        "url": "/ai/review/2025-8-8-REINA_Regularized_Entropy_Information-Based_Loss_for_Efficient_Simultaneous_Speech_Translation/",
        "teaser": null
      },{
        "title": "[논문리뷰] RPCANet++: Deep Interpretable Robust PCA for Sparse Object Segmentation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Fengyi Wu, Yimian Dai, Tianfang Zhang, Yixuan Ding, Jian Yang, Ming-Ming Cheng, Zhenming Peng 핵심 연구 목표 본 논문은 기존의 Robust PCA (RPCA) 모델이 가진 높은 계산 비용, 수동 튜닝에 따른 일반화 능력 부족, 그리고 경직된 사전 지식으로 인한 한계를 극복하는 것을 목표로 합니다....","categories": ["Review"],
        "tags": ["Review","Robust PCA","Deep Unfolding","Sparse Segmentation","Interpretability","Image Decomposition","Computer Vision"],
        "url": "/ai/review/2025-8-8-RPCANet_Deep_Interpretable_Robust_PCA_for_Sparse_Object_Segmentation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Steering One-Step Diffusion Model with Fidelity-Rich Decoder for Fast Image Compression",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zheng Chen, Mingde Zhou, Jinpei Guo, Jiale Yuan, Yifei Ji, Yulun Zhang 핵심 연구 목표 본 논문은 확산 기반 이미지 압축 모델의 주요 단점인 과도한 디코딩 지연 시간과 낮은 충실도(fidelity) 문제를 해결하고자 합니다. 특히 낮은 비트레이트 환경에서 높은 지각 품질과 빠른 디코딩 속도, 원본에...","categories": ["Review"],
        "tags": ["Review","Image Compression","Diffusion Models","One-Step Decoding","Fidelity Guidance","Rate Annealing","VAE","Perceptual Quality"],
        "url": "/ai/review/2025-8-8-Steering_One-Step_Diffusion_Model_with_Fidelity-Rich_Decoder_for_Fast_Image_Compression/",
        "teaser": null
      },{
        "title": "[논문리뷰] StrandDesigner: Towards Practical Strand Generation with Sketch Guidance",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiaobin Hu, Han Feng, Chengming Xu, Moran Li, Na Zhang 핵심 연구 목표 본 연구는 텍스트나 일반 이미지 프롬프트의 정밀도와 사용 편의성 부족 문제를 해결하기 위해, 스케치를 기반으로 하는 최초의 머리카락 스트랜드(strand) 생성 모델을 제안합니다. 복잡한 스트랜드 상호작용과 다양한 스케치 패턴을 모델링하는 데 따르는...","categories": ["Review"],
        "tags": ["Review","Strand Generation","Sketch Guidance","Diffusion Models","Multi-scale Learning","Adaptive Conditioning","3D Hair Modeling","Computer Graphics"],
        "url": "/ai/review/2025-8-8-StrandDesigner_Towards_Practical_Strand_Generation_with_Sketch_Guidance/",
        "teaser": null
      },{
        "title": "[논문리뷰] Visual Document Understanding and Question Answering: A Multi-Agent Collaboration Framework with Test-Time Scaling",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xinlei Yu, Zhangquan Chen, Yudong Zhang, Shilin Lu, Ruolin Shen, Jiangning Zhang, Xiaobin Hu, Yanwei Fu, Shuicheng Yan 핵심 연구 목표 본 연구는 기존 비전-언어 모델(VLMs)이 매개변수 규모에 제약이 있고, 견고한 자가 수정 능력이 부족하며, 긴 시각적 맥락과 복잡한 추론을 요구하는 문서 기반 태스크에서...","categories": ["Review"],
        "tags": ["Review","Visual Document Understanding","Visual Question Answering","Multi-Agent System","Test-Time Scaling","Self-Correction","Mixed Reward Modeling","Large Language Models"],
        "url": "/ai/review/2025-8-8-Visual_Document_Understanding_and_Question_Answering_A_Multi-Agent_Collaboration_Framework_with_Test-Time_Scaling/",
        "teaser": null
      },{
        "title": "[논문리뷰] Adapting Vision-Language Models Without Labels: A Comprehensive Survey",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hao Dong, Lijun Sheng, Jian Liang, Ran He, Eleni Chatzi, Olga Fink 핵심 연구 목표 본 서베이 논문은 레이블링된 데이터 없이 사전 훈련된 Vision-Language Models (VLMs)를 특정 다운스트림 태스크에 적용할 때 발생하는 성능 저하 문제를 해결하고자 합니다. 기존 VLM 미세 조정 방식의 높은 레이블링...","categories": ["Review"],
        "tags": ["Review","Vision-Language Models (VLMs)","Unsupervised Adaptation","Test-Time Adaptation (TTA)","Domain Transfer","Multimodal Learning","Label-Free Learning","Zero-Shot Learning"],
        "url": "/ai/review/2025-8-11-Adapting_Vision-Language_Models_Without_Labels_A_Comprehensive_Survey/",
        "teaser": null
      },{
        "title": "[논문리뷰] GENIE: Gaussian Encoding for Neural Radiance Fields Interactive Editing",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Mikołaj Zieliński, Krzysztof Byrski, Tomasz Szczepanik, Przemysław Spurek 핵심 연구 목표 본 논문은 NeRF의 사실적인 렌더링 품질과 Gaussian Splatting (GS)의 편집 가능성 및 구조적 표현의 장점을 결합하여, 물리 기반 상호작용이 가능한 대화형 3D 장면 편집 시스템을 개발하는 것을 목표로 합니다. 기존 NeRF의 편집 어려움과...","categories": ["Review"],
        "tags": ["Review","Neural Radiance Fields (NeRF)","Gaussian Splatting (GS)","Interactive Editing","3D Scene Representation","Physics Simulation","Hybrid Model","Real-time Rendering","Ray Tracing"],
        "url": "/ai/review/2025-8-11-GENIE_Gaussian_Encoding_for_Neural_Radiance_Fields_Interactive_Editing/",
        "teaser": null
      },{
        "title": "[논문리뷰] GLM-4.5: Agentic, Reasoning, and Coding (ARC) Foundation Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: GLM-4.5 Team (Zhipu AI &amp; Tsinghua University) 핵심 연구 목표 본 논문은 오픈소스 MoE(Mixture-of-Experts) 기반 대규모 언어 모델인 GLM-4.5를 소개합니다. 핵심 목표는 에이전트, 추론, 코딩(ARC) 태스크 전반에서 강력한 성능을 달성하고, 사고 및 직접 응답 모드를 지원하는 하이브리드 추론 방식을 통해 계산 효율성을 극대화하는 것입니다....","categories": ["Review"],
        "tags": ["Review","Large Language Model","Mixture-of-Experts","Agentic AI","Reasoning","Code Generation","Reinforcement Learning","Foundation Model"],
        "url": "/ai/review/2025-8-11-GLM-4.5_Agentic_Reasoning_and_Coding_ARC_Foundation_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] InfiGUI-G1: Advancing GUI Grounding with Adaptive Exploration Policy Optimization",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuhang Liu, Zeyu Liu, Shuanghe Zhu, Pengxiang Li, Congkai Xie, Jiasheng Wang, Xavier Hu, Xiaotian Han, Jianbo Yuan, Xinyao Wang, Shengyu Zhang, Hongxia Yang, Fei Wu 핵심 연구 목표 본 논문은 MLLM(Multimodal Large Language Model) 기반 GUI 에이전트의 핵심 과제인 자연어 지시문 GUI Grounding에서...","categories": ["Review"],
        "tags": ["Review","GUI Grounding","MLLMs","Reinforcement Learning","Policy Optimization","Exploration Strategy","Semantic Alignment","Adaptive Exploration Reward","Human-Computer Interaction"],
        "url": "/ai/review/2025-8-11-InfiGUI-G1_Advancing_GUI_Grounding_with_Adaptive_Exploration_Policy_Optimization/",
        "teaser": null
      },{
        "title": "[논문리뷰] LightSwitch: Multi-view Relighting with Material-guided Diffusion",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yehonathan Litman, Fernando De la Torre, Shubham Tulsiani 핵심 연구 목표 논문은 기존의 2D 이미지 리라이팅(relighting) 생성 모델들이 대상의 내재적 특성을 활용하지 못하거나 다중 뷰 데이터를 확장성 있게 고려하지 못해 불충분한 리라이팅 결과를 초래하는 문제를 해결하고자 합니다. 이를 위해 알 수 없는 조명 조건의...","categories": ["Review"],
        "tags": ["Review","Multi-view Relighting","Diffusion Models","Material-guided","Inverse Rendering","3D Scene Reconstruction","Image Synthesis","Consistent Relighting"],
        "url": "/ai/review/2025-8-11-LightSwitch_Multi-view_Relighting_with_Material-guided_Diffusion/",
        "teaser": null
      },{
        "title": "[논문리뷰] MELLA: Bridging Linguistic Capability and Cultural Groundedness for Low-Resource Language MLLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yufei Gao, Jiaying Fei, Nuo Chen, Ruirui Chen, Guohang Yan, Yunshi Lan, Botian Shi 핵심 연구 목표 본 논문은 고자원 언어에 집중되어 저자원 언어에서 성능이 저하되는 기존 다중 모드 대규모 언어 모델(MLLM)의 한계를 해결하고자 합니다. 특히, 기존 다국어 향상 방법론이 텍스트 모달리티에 국한되거나 기계...","categories": ["Review"],
        "tags": ["Review","Multimodal Large Language Models","Low-Resource Languages","Cultural Groundedness","Linguistic Capability","Dataset Creation","Multilingual AI"],
        "url": "/ai/review/2025-8-11-MELLA_Bridging_Linguistic_Capability_and_Cultural_Groundedness_for_Low-Resource_Language_MLLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] Memp: Exploring Agent Procedural Memory",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Runnan Fang, Yuan Liang, Xiaobin Wang, Jialong Wu, Shuofei Qiao, Pengjun Xie, Fei Huang, Huajun Chen, Ningyu Zhang 핵심 연구 목표 논문은 대규모 언어 모델(LLM) 기반 에이전트가 겪는 취약한 절차적 메모리 문제를 해결하고, 에이전트에게 학습 가능하고 업데이트 가능한 평생 절차적 메모리를 부여하는 것을 목표로...","categories": ["Review"],
        "tags": ["Review","Procedural Memory","LLM Agents","Memory Management","Task Automation","Lifelong Learning","Experience Replay","Agent Learning"],
        "url": "/ai/review/2025-8-11-Memp_Exploring_Agent_Procedural_Memory/",
        "teaser": null
      },{
        "title": "[논문리뷰] MeshLLM: Empowering Large Language Models to Progressively Understand and Generate 3D Mesh",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shuangkang Fang, I-Chao Shen, Yufeng Wang, Yi-Hsuan Tsai, Yi Yang, Shuchang Zhou, Wenrui Ding, Takeo Igarashi, Ming-Hsuan Yang 핵심 연구 목표 본 연구는 기존 대규모 언어 모델(LLM) 기반의 3D 메시 처리 방식이 갖는 데이터셋 규모의 한계와 텍스트 직렬화 과정에서의 3D 구조 정보 손실 문제를...","categories": ["Review"],
        "tags": ["Review","3D Mesh Generation","LLMs","Mesh Understanding","Text-to-3D","Primitive-Mesh Decomposition","Progressive Training","Multimodal AI"],
        "url": "/ai/review/2025-8-11-MeshLLM_Empowering_Large_Language_Models_to_Progressively_Understand_and_Generate_3D_Mesh/",
        "teaser": null
      },{
        "title": "[논문리뷰] Pruning the Unsurprising: Efficient Code Reasoning via First-Token Surprisal",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wenhao Zeng, Yaoning Wang, Chao Hu, Yuling Shi, Chengcheng Wan, Hongyu Zhang, Xiaodong Gu 핵심 연구 목표 본 논문은 대규모 추론 모델(LRMs)의 Chain-of-Thought(CoT) 추론 과정에서 발생하는 과도하게 긴 추론 트레이스 문제를 해결하여, 학습 비용과 추론 지연 시간을 줄이는 동시에 코드 추론 성능을 유지하거나 향상시키는...","categories": ["Review"],
        "tags": ["Review","Code Reasoning","CoT Compression","LLMs","Efficiency","Surprisal","Pruning","Fine-tuning","Large Reasoning Models"],
        "url": "/ai/review/2025-8-11-Pruning_the_Unsurprising_Efficient_Code_Reasoning_via_First-Token_Surprisal/",
        "teaser": null
      },{
        "title": "[논문리뷰] UI-AGILE: Advancing GUI Agents with Effective Reinforcement Learning and Precise Inference-Time Grounding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shuquan Lian, Yuhang Wu, Jia Ma, Zihan Song, Bingqi Chen, Xiawu Zheng, Hui Li 핵심 연구 목표 본 논문은 기존 GUI 에이전트 훈련 및 추론 방식의 세 가지 한계점인 추론 설계 딜레마(P1), 비효율적인 보상(P2), 그리고 고해상도 디스플레이에서의 시각적 노이즈(P3)를 해결하고자 합니다. 궁극적으로 GUI 에이전트의...","categories": ["Review"],
        "tags": ["Review","GUI Agents","Reinforcement Learning","Grounding","MLLMs","Reward Function","Resampling","Visual Noise Reduction"],
        "url": "/ai/review/2025-8-11-UI-AGILE_Advancing_GUI_Agents_with_Effective_Reinforcement_Learning_and_Precise_Inference-Time_Grounding/",
        "teaser": null
      },{
        "title": "[논문리뷰] Voost: A Unified and Scalable Diffusion Transformer for Bidirectional Virtual Try-On and Try-Off",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Seungyong Lee, Jeong-gi Kwak 핵심 연구 목표 가상 의류 착용(try-on) 및 탈의(try-off) 시 사람의 자세 및 외형 변화에 따른 의류-신체 일치성 모델링과 세부 묘사의 정확성 유지라는 고질적인 문제를 해결하는 것입니다. 단일 Diffusion Transformer(DiT) 프레임워크를 통해 이 두 상호 보완적인 작업을 통합 학습하여, 실제와 같은...","categories": ["Review"],
        "tags": ["Review","Virtual Try-On","Virtual Try-Off","Diffusion Transformer","Bidirectional Learning","Generative AI","Fashion Synthesis","Attention Mechanism","Self-Correction"],
        "url": "/ai/review/2025-8-11-Voost_A_Unified_and_Scalable_Diffusion_Transformer_for_Bidirectional_Virtual_Try-On_and_Try-Off/",
        "teaser": null
      },{
        "title": "[논문리뷰] A Comprehensive Survey of Self-Evolving AI Agents: A New Paradigm Bridging Foundation Models and Lifelong Agentic Systems",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jinyuan Fang, Yanwen Peng, Xi Zhang, Yingxu Wang, Xinhao Yi, Guibin Zhang, Yi Xu, Bin Wu, Siwei Liu, Zihao Li, Zhaochun Ren, Nikos Aletras, Xi Wang, Han Zhou, Zaiqiao Meng 핵심 연구 목표 이 논문은 대규모 언어 모델(LLMs) 기반 AI 에이전트의 정적인 구성 한계를...","categories": ["Review"],
        "tags": ["Review","Self-Evolving AI Agents","Lifelong Learning","Foundation Models","Multi-Agent Systems","Agent Optimization","Prompt Engineering","Tool Use","AI Safety","Survey"],
        "url": "/ai/review/2025-8-12-A_Comprehensive_Survey_of_Self-Evolving_AI_Agents_A_New_Paradigm_Bridging_Foundation_Models_and_Lifelong_Agentic_Systems/",
        "teaser": null
      },{
        "title": "[논문리뷰] Bifrost-1: Bridging Multimodal LLMs and Diffusion Models with Patch-level CLIP Latents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Han Lin, Jaemin Cho, Amir Zadeh, Chuan Li, Mohit Bansal 핵심 연구 목표 본 연구는 강력한 추론 능력을 유지하면서도 고품질 시각적 합성 기능을 LLM에 통합하는 것을 목표로 합니다. 특히, 기존 방식들이 높은 훈련 비용을 수반하고 백본 LLM의 이미지 표현 학습 부족으로 어려움을 겪는 문제를...","categories": ["Review"],
        "tags": ["Review","Multimodal LLM","Diffusion Model","CLIP Latent","Image Generation","Multimodal Understanding","ControlNet","Training Efficiency"],
        "url": "/ai/review/2025-8-12-Bifrost-1_Bridging_Multimodal_LLMs_and_Diffusion_Models_with_Patch-level_CLIP_Latents/",
        "teaser": null
      },{
        "title": "[논문리뷰] BrowseComp-Plus: A More Fair and Transparent Evaluation Benchmark of Deep-Research Agent",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Kai Zou, Ping Nie, Shengyao Zhuang, Xueguang Ma, Zijian Chen 핵심 연구 목표 현재 Deep-Research 에이전트 평가 벤치마크(예: BrowseComp)는 라이브 웹 검색 API에 의존하여 공정성, 재현성 및 투명성 측면에서 중대한 한계를 가집니다. 이는 동적이고 불투명한 API로 인해 시스템 간의 공정한 비교가 어렵고, 문서 코퍼스에...","categories": ["Review"],
        "tags": ["Review","Benchmarking","Deep-Research Agents","LLMs","Retrieval","Curated Corpus","Evaluation","Fairness","Transparency","Reproducibility"],
        "url": "/ai/review/2025-8-12-BrowseComp-Plus_A_More_Fair_and_Transparent_Evaluation_Benchmark_of_Deep-Research_Agent/",
        "teaser": null
      },{
        "title": "[논문리뷰] Compressing Chain-of-Thought in LLMs via Step Entropy",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zeju Li, Jianyuan Zhong, Ziyang Zheng, Xiangyu Wen, Zhijian Xu, Yingying Cheng, Fan Zhang, Qiang Xu 핵심 연구 목표 Large Language Models(LLMs)의 Chain-of-Thought(CoT) 추론 과정에서 발생하는 과도한 상세함과 중복성으로 인한 높은 추론 비용 및 비효율성을 해결하는 것이 주요 목표입니다. 논문은 의미적으로 중복되는 추론 단계를...","categories": ["Review"],
        "tags": ["Review","LLM","Chain-of-Thought","CoT Compression","Step Entropy","Reinforcement Learning","SFT","GRPO"],
        "url": "/ai/review/2025-8-12-Compressing_Chain-of-Thought_in_LLMs_via_Step_Entropy/",
        "teaser": null
      },{
        "title": "[논문리뷰] Deep Ignorance: Filtering Pretraining Data Builds Tamper-Resistant Safeguards into Open-Weight LLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Kyle O’Brien, Stephen Casper, Quentin Anthony, Tomek Korbak, Robert Kirk, Xander Davies, Ishan Mishra, Geoffrey Irving, Yarin Gal, Stella Biderman 핵심 연구 목표 본 논문은 오픈-웨이트 대규모 언어 모델(LLMs)이 이중 용도(dual-use) 지식(예: 바이오위협 프록시 지식)을 학습하는 것을 효과적으로 방지하고, adversarial fine-tuning 공격에 대한 변조...","categories": ["Review"],
        "tags": ["Review","LLMs","데이터 필터링","사전 학습","변조 저항성","바이오위협","AI 안전","서킷 브레이킹","머신 언러닝"],
        "url": "/ai/review/2025-8-12-Deep_Ignorance_Filtering_Pretraining_Data_Builds_Tamper-Resistant_Safeguards_into_Open-Weight_LLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] Fact2Fiction: Targeted Poisoning Attack to Agentic Fact-checking System",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Haorui He, Yupeng Li, Bin Benjamin Zhu, Dacheng Wen, Reynold Cheng, Francis C. M. Lau 핵심 연구 목표 본 연구는 최신 LLM 기반 에이전트 팩트체킹 시스템이 잘못된 정보를 확산시키거나 진실을 훼손할 수 있는 포이즈닝 공격에 취약함을 지적합니다. 기존 공격 방식은 이러한 정교한 시스템의 클레임...","categories": ["Review"],
        "tags": ["Review","Adversarial Attack","Poisoning Attack","Fact-checking","LLM Agent","Retrieval Augmented Generation","Misinformation","System Security"],
        "url": "/ai/review/2025-8-12-Fact2Fiction_Targeted_Poisoning_Attack_to_Agentic_Fact-checking_System/",
        "teaser": null
      },{
        "title": "[논문리뷰] Follow-Your-Shape: Shape-Aware Image Editing via Trajectory-Guided Region Control",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zeqian Long, Mingzhe Zheng, Kunyu Feng, Xinhua Zhang, Hongyu Liu, Harry Yang, Linfeng Zhang, Qifeng Chen, Yue Ma 핵심 연구 목표 이 논문은 기존 flow-기반 이미지 편집 모델이 대규모 형상 변환(large-scale shape transformations) 시 목표 형상 변화를 달성하지 못하거나 비-타겟 영역을 의도치 않게 변경하는...","categories": ["Review"],
        "tags": ["Review","Image Editing","Shape Transformation","Rectified Flow","Trajectory Divergence Map","Region Control","Generative Models","Diffusion Models"],
        "url": "/ai/review/2025-8-12-Follow-Your-Shape_Shape-Aware_Image_Editing_via_Trajectory-Guided_Region_Control/",
        "teaser": null
      },{
        "title": "[논문리뷰] GLiClass: Generalist Lightweight Model for Sequence Classification Tasks",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ihor Stepanov, Mykhailo Shtopko, Dmytro Vodianytskyi, Oleksandr Lukashov, Alexander Yavorskyi, Mykyta Yaroshenko 핵심 연구 목표 본 연구는 기존 제로샷 텍스트 분류 모델(생성형 LLM, 크로스 인코더, 임베딩 기반 모델)의 한계점, 즉 계산 비효율성, 지시 불일치, 확장성 부족 등을 해결하고자 합니다. 특히 대규모 레이블 세트에서 높은...","categories": ["Review"],
        "tags": ["Review","Sequence Classification","Zero-shot Learning","Few-shot Learning","Transformer","Multi-label Classification","PPO","GLiNER","Computational Efficiency"],
        "url": "/ai/review/2025-8-12-GLiClass_Generalist_Lightweight_Model_for_Sequence_Classification_Tasks/",
        "teaser": null
      },{
        "title": "[논문리뷰] Grove MoE: Towards Efficient and Superior MoE LLMs with Adjugate Experts",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Tieyuan Chen, Zhanchao Zhou, Xiaodong Chen, Haoxing Chen, Haoyuan Wu 핵심 연구 목표 본 논문은 기존 MoE (Mixture of Experts) LLM의 한계인 고정된 파라미터 활성화와 이로 인한 비효율적인 계산 문제를 해결하는 것을 목표로 합니다. 특히, 입력 복잡도에 관계없이 균일한 크기의 전문가를 활성화하는 방식의 비효율성을...","categories": ["Review"],
        "tags": ["Review","Mixture of Experts","LLMs","MoE Architecture","Dynamic Activation","Adjugate Experts","Upcycling Strategy","Load Balancing"],
        "url": "/ai/review/2025-8-12-Grove_MoE_Towards_Efficient_and_Superior_MoE_LLMs_with_Adjugate_Experts/",
        "teaser": null
      },{
        "title": "[논문리뷰] Klear-Reasoner: Advancing Reasoning Capability via Gradient-Preserving Clipping Policy Optimization",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhenpeng Su, Leiyu Pan, Xue Bai, Dening Liu, Guanting Dong, Jiaming Huang, Wenping Hu, Fuzheng Zhang, Guorui Zhou 핵심 연구 목표 본 논문은 고성능 추론 모델의 훈련 세부사항이 불완전하게 공개되어 재현이 어려운 문제를 해결하고, 기존 RL(강화 학습)의 클리핑 메커니즘이 탐색 신호를 억제하고 비최적 궤적을...","categories": ["Review"],
        "tags": ["Review","Reasoning LLMs","Reinforcement Learning","PPO","Gradient Clipping","Supervised Fine-tuning","Math Reasoning","Code Generation","Policy Optimization"],
        "url": "/ai/review/2025-8-12-Klear-Reasoner_Advancing_Reasoning_Capability_via_Gradient-Preserving_Clipping_Policy_Optimization/",
        "teaser": null
      },{
        "title": "[논문리뷰] Less Is More: Training-Free Sparse Attention with Global Locality for Efficient Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Lijie Yang, Zhihao Zhang, Arti Jain, Shijie Cao, Baihong Yuan, Yiwei Chen, Zhihao Jia, Ravi Netravali 핵심 연구 목표 본 논문은 대규모 추론 모델(LRMs)의 긴 토큰 생성 과정에서 발생하는 막대한 계산 오버헤드를 해결하는 것을 목표로 합니다. 기존 희소 어텐션(sparse attention) 방식들이 장기 생성 시...","categories": ["Review"],
        "tags": ["Review","Sparse Attention","LLMs","Reasoning Tasks","Efficiency","Training-Free","Global Locality","KV Cache Optimization"],
        "url": "/ai/review/2025-8-12-Less_Is_More_Training-Free_Sparse_Attention_with_Global_Locality_for_Efficient_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] MoBE: Mixture-of-Basis-Experts for Compressing MoE-based LLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiaodong Chen, Mingming Ha, Zhenzhong Lan, Jing Zhang, Jianguo Li 핵심 연구 목표 대규모 MoE 기반 LLM(예: DeepSeek-V3-0324, Kimi-K2-Instruct)의 막대한 메모리 요구사항으로 인한 배포 병목 현상을 해결하고자 합니다. 기존 MoE 압축 방식들이 높은 정확도 하락(예: 7-14%)을 겪는 문제를 극복하여, 최소한의 성능 저하로 모델을 압축하는...","categories": ["Review"],
        "tags": ["Review","Mixture-of-Experts (MoE)","LLM Compression","Matrix Decomposition","Parameter Efficiency","Deep Learning","Memory Optimization"],
        "url": "/ai/review/2025-8-12-MoBE_Mixture-of-Basis-Experts_for_Compressing_MoE-based_LLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] MolmoAct: Action Reasoning Models that can Reason in Space",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jason Lee, Jiafei Duan, Haoquan Fang, Yuquan Deng, Shuo Liu 핵심 연구 목표 기존 로봇 파운데이션 모델들이 지각과 명령을 직접 제어로 매핑하여 적응성, 일반화, 의미론적 기반이 부족한 문제를 해결하는 것을 목표로 합니다. 본 연구는 Action Reasoning Models (ARMs)이라는 새로운 비전-언어-액션 모델 계열을 제안하여, 구조화된...","categories": ["Review"],
        "tags": ["Review","Robotics","Action Reasoning","Vision-Language Models","Spatial Planning","Depth Perception","Trajectory Generation","Explainable AI"],
        "url": "/ai/review/2025-8-12-MolmoAct_Action_Reasoning_Models_that_can_Reason_in_Space/",
        "teaser": null
      },{
        "title": "[논문리뷰] Omni-Effects: Unified and Spatially-Controllable Visual Effects Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Fangyuan Mao, Aiming Hao, Jintao Chen, Dongxia Liu, Xiaokun Feng, Jiashu Zhu, Meiqi Wu, Chubin Chen, Xiangxiang Chu 핵심 연구 목표 본 논문은 기존 비디오 생성 모델들이 개별 효과에 특화된 LoRA 훈련으로 인해 복합 시각 효과(multi-VFX)를 동시적이고 공간적으로 제어하는 데 한계가 있다는 문제를 해결합니다....","categories": ["Review"],
        "tags": ["Review","Visual Effects","Video Generation","LoRA","Mixture of Experts","Spatial Control","Diffusion Models","Multi-VFX"],
        "url": "/ai/review/2025-8-12-Omni-Effects_Unified_and_Spatially-Controllable_Visual_Effects_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] OmniEAR: Benchmarking Agent Reasoning in Embodied Tasks",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hongxing Li, Dingming Li, tricktreat, yanyc, wangzx1210 핵심 연구 목표 본 연구는 대규모 언어 모델(LLM)이 물리적 상호작용, 도구 사용, 다중 에이전트 협업이 필요한 구체화된(embodied) 태스크에서 얼마나 잘 추론하는지 평가하기 위한 종합적인 프레임워크인 OmniEAR를 제시합니다. 기존 벤치마크들이 제공하는 고정된 도구 세트나 명시적인 협업 지시 없이,...","categories": ["Review"],
        "tags": ["Review","Embodied AI","Agent Reasoning","LLM","Benchmarking","Tool Use","Multi-Agent Systems","Physical Interaction","Constraint Reasoning"],
        "url": "/ai/review/2025-8-12-OmniEAR_Benchmarking_Agent_Reasoning_in_Embodied_Tasks/",
        "teaser": null
      },{
        "title": "[논문리뷰] Part I: Tricks or Traps? A Deep Dive into RL for LLM Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiaheng Liu, Weixun Wang, Yancheng He, Jiashun Liu, Zihe Liu 핵심 연구 목표 본 논문은 LLM 추론을 위한 강화 학습(RL) 기술의 급속한 발전으로 인해 발생하는 파편화된 이해, 불일치한 실험 설정 및 모호한 가이드라인 문제를 해결하고자 합니다. RL 기술의 내부 메커니즘을 체계적으로 분석하고, 실제 적용...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Large Language Models","LLM Reasoning","Policy Optimization","Normalization","Clipping","Loss Aggregation","Overlong Filtering"],
        "url": "/ai/review/2025-8-12-Part_I_Tricks_or_Traps_A_Deep_Dive_into_RL_for_LLM_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] ReasonRank: Empowering Passage Ranking with Strong Reasoning Ability",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wenhan Liu, Xinyu Ma, Weiwei Sun, Yutao Zhu, Yuchen Li, Dawei Yin, Zhicheng Dou 핵심 연구 목표 기존 패시지 랭킹 모델들이 추론 집약적(reasoning-intensive) 훈련 데이터 부족으로 인해 복잡한 검색 시나리오에서 낮은 성능을 보이는 문제를 해결하는 것이 목표입니다. 특히 대규모 추론 모델(LRM)의 강력한 추론 능력을...","categories": ["Review"],
        "tags": ["Review","Passage Ranking","Reasoning Models","Large Language Models","Data Synthesis","Reinforcement Learning","Listwise Reranking","Information Retrieval"],
        "url": "/ai/review/2025-8-12-ReasonRank_Empowering_Passage_Ranking_with_Strong_Reasoning_Ability/",
        "teaser": null
      },{
        "title": "[논문리뷰] Reinforcement Learning in Vision: A Survey",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Weijia Wu, Chen Gao, Joya Chen, Kevin Qinghong Lin, Qingwei Meng, Yiming Zhang, Yuke Qiu, Hong Zhou, Mike Zheng Shou 핵심 연구 목표 본 연구는 강화 학습(RL)과 시각 지능의 교차점에서 발전한 에이전트의 현황을 체계적으로 종합합니다. 시각 RL 문제들을 공식화하고, 정책 최적화 전략의 진화를 추적하며,...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning (RL)","Computer Vision (CV)","Multimodal Large Language Models (MLLMs)","Visual Generation","Vision-Language-Action (VLA) Models","Policy Optimization","Reward Modeling"],
        "url": "/ai/review/2025-8-12-Reinforcement_Learning_in_Vision_A_Survey/",
        "teaser": null
      },{
        "title": "[논문리뷰] Shortcut Learning in Generalist Robot Policies: The Role of Dataset Diversity and Fragmentation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Youguang Xing, Xu Luo, Junlin Xie, Lianli Gao, Hengtao Shen, Jingkuan Song 핵심 연구 목표 본 논문은 일반 로봇 정책의 제한된 일반화 능력의 근본 원인을 규명하고자 합니다. 특히, 태스크와 관련 없는 특징에 의존하는 숏컷 학습(shortcut learning)이 일반화의 주요 장애물인지 조사합니다. 개별 서브 데이터셋 내의...","categories": ["Review"],
        "tags": ["Review","Robot Learning","Generalization","Shortcut Learning","Dataset Diversity","Dataset Fragmentation","Data Augmentation","Imitation Learning"],
        "url": "/ai/review/2025-8-12-Shortcut_Learning_in_Generalist_Robot_Policies_The_Role_of_Dataset_Diversity_and_Fragmentation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Speech-to-LaTeX: New Models and Datasets for Converting Spoken Equations and Sentences",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Dmitrii Korzh, Dmitrii Tarasov, Artyom Iudin, Elvir Karimov, Matvey Skripkin 핵심 연구 목표 본 연구는 음성으로 표현된 수학 방정식과 문장을 LaTeX 형식으로 변환하는 도전적인 문제를 해결하고자 합니다. 기존 연구의 한계점(예: 이중 ASR 전사 의존성, 고립된 방정식에 대한 초점, 제한적인 데이터셋, 다국어 지원 부족)을 극복하고,...","categories": ["Review"],
        "tags": ["Review","Speech-to-LaTeX","ASR","Language Models","Multimodal AI","Dataset Creation","Mathematical Expression Recognition","LaTeX Generation"],
        "url": "/ai/review/2025-8-12-Speech-to-LaTeX_New_Models_and_Datasets_for_Converting_Spoken_Equations_and_Sentences/",
        "teaser": null
      },{
        "title": "[논문리뷰] Temporal Self-Rewarding Language Models: Decoupling Chosen-Rejected via Past-Future",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yidong Wang, Xin Wang, Cunxiang Wang, Junfeng Fang, Qiufeng Wang, Jianing Chu, Xuran Meng, Shuxun Yang, Libo Qin, Yue Zhang, Wei Ye, Shikun Zhang 핵심 연구 목표 본 논문은 기존의 Self-Rewarding Language Models에서 발생하는 “그라디언트 소멸(gradient collapse) 문제”를 해결하는 것을 목표로 합니다. 이는 학습...","categories": ["Review"],
        "tags": ["Review","Self-Rewarding LLMs","Direct Preference Optimization (DPO)","Preference Learning","Generative AI","Gradient Collapse","LLM Alignment","Iterative Optimization"],
        "url": "/ai/review/2025-8-12-Temporal_Self-Rewarding_Language_Models_Decoupling_Chosen-Rejected_via_Past-Future/",
        "teaser": null
      },{
        "title": "[논문리뷰] UserBench: An Interactive Gym Environment for User-Centric Agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Cheng Qian, Zuxin Liu, Akshara Prabhakar, Zhiwei Liu, Jianguo Zhang 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM) 기반 에이전트가 사용자의 모호하고, 변화하며, 간접적으로 표현되는 목표에 대해 능동적으로 협력하는 능력을 평가하고자 합니다. 기존 에이전트 평가가 도구 사용 및 작업 실행에만 초점을 맞추고 사용자 의도...","categories": ["Review"],
        "tags": ["Review","User-Centric AI","LLM Evaluation","Interactive Agents","Gym Environment","Preference Elicitation","Multi-turn Dialogue","Tool Use"],
        "url": "/ai/review/2025-8-12-UserBench_An_Interactive_Gym_Environment_for_User-Centric_Agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] VisR-Bench: An Empirical Study on Visual Retrieval-Augmented Generation for Multilingual Long Document Understanding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jian Chen, Ming Li, Jihyung Kil, Chenguang Wang, Tong Yu, Ryan Rossi, Tianyi Zhou, Changyou Chen, Ruiyi Zhang 핵심 연구 목표 본 논문은 기존 벤치마크의 영어 단일 언어 및 단일 페이지 제한을 넘어, 다국어 장문 문서에서 질문 기반 멀티모달 검색(multimodal retrieval)을 평가하기 위한 새로운...","categories": ["Review"],
        "tags": ["Review","Multimodal Retrieval","Retrieval-Augmented Generation","Long Document Understanding","Multilingual NLP","Visual QA","Benchmark","MLLMs","Table Understanding"],
        "url": "/ai/review/2025-8-12-VisR-Bench_An_Empirical_Study_on_Visual_Retrieval-Augmented_Generation_for_Multilingual_Long_Document_Understanding/",
        "teaser": null
      },{
        "title": "[논문리뷰] When Good Sounds Go Adversarial: Jailbreaking Audio-Language Models with Benign Inputs",
        "excerpt":"링크: 논문 PDF로 바로 열기 When Good Sounds Go Adversarial: Jailbreaking Audio-Language Models with Benign Inputs 저자: Bodam Kim, Hiskias Dingeto, Taeyoun Kwon, Dasol Choi, DongGeon Lee, Haon Park, JaeHoon Lee, Jongho Shin 핵심 연구 목표 본 연구는 오디오-언어 모델(ALM)이 악의적인 음성 입력에 의해 유해한 텍스트를 생성하도록 유도될 수 있는...","categories": ["Review"],
        "tags": ["Review","Audio-Language Models","Jailbreak Attack","Adversarial Audio","Reinforcement Learning","Projected Gradient Descent","Native Payload Discovery","Multimodal AI Safety"],
        "url": "/ai/review/2025-8-12-When_Good_Sounds_Go_Adversarial_Jailbreaking_Audio-Language_Models_with_Benign_Inputs/",
        "teaser": null
      },{
        "title": "[논문리뷰] WideSearch: Benchmarking Agentic Broad Info-Seeking",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ryan Wong, Jiawei Wang, Junjie Zhao, Li Chen, Yan Gao, Long Zhang, Xuan Zhou, Zuo Wang, Kai Xiang, Ge Zhang, Wenhao Huang, Yang Wang, Ke Wang 핵심 연구 목표 본 논문은 광범위한 정보 탐색(WideSearch) 작업에서 LLM 기반 에이전트의 신뢰성과 완성도를 평가하기 위한 새로운 벤치마크를...","categories": ["Review"],
        "tags": ["Review","Agentic Search","LLM","Benchmark","Information Seeking","Structured Output","Evaluation Metrics","Multi-agent Systems"],
        "url": "/ai/review/2025-8-12-WideSearch_Benchmarking_Agentic_Broad_Info-Seeking/",
        "teaser": null
      },{
        "title": "[논문리뷰] Adversarial Video Promotion Against Text-to-Video Retrieval",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Qiwei Tian, Chenhao Lin, Zhengyu Zhao, Shuai Liu, Qian Li, Chao Shen 핵심 연구 목표 본 논문은 텍스트-비디오 검색(T2VR) 모델의 간과된 취약점인 적대적 비디오 프로모션 공격을 탐구합니다. 기존 공격이 비디오 순위를 하락시키는 데 초점을 맞춘 것과 달리, 재정적 이득이나 허위 정보 확산을 위해 특정...","categories": ["Review"],
        "tags": ["Review","Adversarial Attack","Video Promotion","Text-to-Video Retrieval","Modality Refinement","Black-box Attack","Video Manipulation","Transferability"],
        "url": "/ai/review/2025-8-13-Adversarial_Video_Promotion_Against_Text-to-Video_Retrieval/",
        "teaser": null
      },{
        "title": "[논문리뷰] Aryabhata: An exam-focused language model for JEE Math",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Sandeep Varma, Sachin Dharashivkar, RitvikPW 핵심 연구 목표 본 논문은 인도 입학 시험(JEE) 수학 영역에 최적화된 7B 파라미터의 경량 언어 모델인 Aryabhata 1.0을 제안합니다. 기존 대규모 언어 모델(LLM)이 교육적 활용에 부적합했던 문제를 해결하고, 학생 이해를 돕는 정확하고 투명하며 효율적인 단계별 추론 능력을 제공하는 것을...","categories": ["Review"],
        "tags": ["Review","Language Model","Math Reasoning","JEE","Supervised Fine-Tuning","Reinforcement Learning","Model Merging","Chain-of-Thought","Curriculum Learning"],
        "url": "/ai/review/2025-8-13-Aryabhata_An_exam-focused_language_model_for_JEE_Math/",
        "teaser": null
      },{
        "title": "[논문리뷰] AutoCodeBench: Large Language Models are Automatic Code Benchmark Generators",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jason Chou, Ao Liu, Yuchi Deng, Zhiying Zeng, Tao Zhang 핵심 연구 목표 기존 코드 생성 벤치마크의 한계(수동 어노테이션 의존, Python 중심, 난이도 및 다양성 부족)를 해결하고, LLM의 코드 생성 능력을 포괄적으로 평가하기 위해 높은 난이도를 가진 다국어 코드 생성 데이터셋을 수동 어노테이션 없이...","categories": ["Review"],
        "tags": ["Review","코드 생성","대규모 언어 모델","코드 벤치마크","다국어 프로그래밍","자동화된 데이터 생성","샌드박스 평가","멀티모달 AI"],
        "url": "/ai/review/2025-8-13-AutoCodeBench_Large_Language_Models_are_Automatic_Code_Benchmark_Generators/",
        "teaser": null
      },{
        "title": "[논문리뷰] Beyond Ten Turns: Unlocking Long-Horizon Agentic Search with Large-Scale Asynchronous RL",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiaxuan Gao, Wei Fu, Minyang Xie, Shusheng Xu, Chuyi He, Zhiyu Mei, Banghua Zhu, Yi Wu 핵심 연구 목표 본 논문은 기존 오픈소스 LLM 기반 에이전트의 ‘검색 인텔리전스’가 전문가 수준에 미치지 못하며, 모호한 질의 해결, 정확한 검색 생성, 결과 분석 및 심층 탐색 능력에서...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","LLM Agents","Agentic Search","Asynchronous RL","Long-Horizon Planning","Tool Use","Data Synthesis"],
        "url": "/ai/review/2025-8-13-Beyond_Ten_Turns_Unlocking_Long-Horizon_Agentic_Search_with_Large-Scale_Asynchronous_RL/",
        "teaser": null
      },{
        "title": "[논문리뷰] BiasGym: Fantastic Biases and How to Find (and Remove) Them",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Sekh Mainul Islam, Nadav Borenstein, Siddhesh Milind Pawar, Haeun Yu, Arnav Arora, Isabelle Augenstein 핵심 연구 목표 대규모 언어 모델(LLM)에 인코딩된 편향과 고정관념을 신뢰할 수 있게 감지하고 완화하기 위한 간단하고 비용 효율적이며 일반화 가능한 프레임워크를 개발하는 것이 목표입니다. 특히, 미묘하고 격리하기 어려운 LLM의 편향된...","categories": ["Review"],
        "tags": ["Review","Bias Mitigation","LLMs","Mechanistic Interpretability","Fine-tuning","Attention Steering","Stereotype Analysis","Safety Alignment"],
        "url": "/ai/review/2025-8-13-BiasGym_Fantastic_Biases_and_How_to_Find_and_Remove_Them/",
        "teaser": null
      },{
        "title": "[논문리뷰] Bridging Theory and Practice in Quantum Game Theory: Optimized Implementation of the Battle of the Sexes with Error Mitigation on NISQ Hardware",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Germán Díaz Agreda, Carlos Andres Duran Paredes, Mateo Buenaventura Samboni, Jhon Alejandro Andrade, Sebastián Cajas Ordoñez 핵심 연구 목표 본 논문은 양자 게임 이론의 “Battle of the Sexes” 게임을 실제 NISQ(Noisy Intermediate-Scale Quantum) 하드웨어에 구현하는 과정에서 발생하는 노이즈, 디코히어런스, 제한된 큐비트 연결성 문제를 해결하고자...","categories": ["Review"],
        "tags": ["Review","Quantum Game Theory","NISQ Hardware","Error Mitigation","Battle of the Sexes","Qiskit","Quantum Computing","Strategic Coordination","Payoff Maximization"],
        "url": "/ai/review/2025-8-13-Bridging_Theory_and_Practice_in_Quantum_Game_Theory_Optimized_Implementation_of_the_Battle_of_the_Sexes_with_Error_Mitigation_on_NISQ_Hardware/",
        "teaser": null
      },{
        "title": "[논문리뷰] CharacterShot: Controllable and Consistent 4D Character Animation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Junyao Gao, Jiaxing Li, Wenran Liu, Yanhong Zeng, Fei Shen, Kai Chen, Yanan Sun, Cairong Zhao 핵심 연구 목표 본 논문은 단일 캐릭터 이미지와 2D 포즈 시퀀스를 입력으로 받아, 사용자가 제어할 수 있는 동적인 3D 캐릭터(4D 캐릭터 애니메이션)를 생성하는 프레임워크인 CharacterShot을 제안합니다. 이는 기존...","categories": ["Review"],
        "tags": ["Review","4D Character Animation","Diffusion Models","Gaussian Splatting","Pose Control","Multi-view Synthesis","Temporal Consistency","Character Dataset"],
        "url": "/ai/review/2025-8-13-CharacterShot_Controllable_and_Consistent_4D_Character_Animation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Cut2Next: Generating Next Shot via In-Context Tuning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jingwen He, Hongbo Liu, Jiajun Li, Ziqi Huang, Yu Qiao, Wanli Ouyang, Ziwei Liu 핵심 연구 목표 본 논문은 기존 비디오 생성 모델이 간과했던 영화적 내러티브 흐름과 편집 패턴(예: Shot/Reverse Shot, Cut-Out, Cutaway)을 준수하면서, 선행 샷에 영화적으로 일관성 있는 다음 샷을 생성하는 새로운 태스크인...","categories": ["Review"],
        "tags": ["Review","Next Shot Generation","In-Context Tuning","Diffusion Transformer","Cinematic Continuity","Hierarchical Prompting","Video Generation","Shot Editing"],
        "url": "/ai/review/2025-8-13-Cut2Next_Generating_Next_Shot_via_In-Context_Tuning/",
        "teaser": null
      },{
        "title": "[논문리뷰] DeCRED: Decoder-Centric Regularization for Encoder-Decoder Based Speech Recognition",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Alexander Polok, Santosh Kesiraju, Karel Beneš, Bolaji Yusuf, Lukáš Burget, Jan Černocký 핵심 연구 목표 본 논문은 Encoder-Decoder 기반 자동 음성 인식(ASR) 모델의 내부 언어 모델(ILM) 견고성을 향상시켜 도메인 내외(in- and out-of-domain) 환경에서의 일반화 성능을 개선하는 것을 목표로 합니다. 특히, 대규모 데이터셋 훈련의 계산...","categories": ["Review"],
        "tags": ["Review","Speech Recognition","Encoder-Decoder","Regularization","Decoder-Centric","Intermediate Supervision","Out-of-Domain Generalization","Internal Language Model"],
        "url": "/ai/review/2025-8-13-DeCRED_Decoder-Centric_Regularization_for_Encoder-Decoder_Based_Speech_Recognition/",
        "teaser": null
      },{
        "title": "[논문리뷰] Democratizing Diplomacy: A Harness for Evaluating Any Large Language Model on Full-Press Diplomacy",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Alexander Duffy, Samuel J Paech, Ishana Shastri, Elizabeth Karpinski, Baptiste Alloui-Cros, Tyler Marques, Matthew Lyle Olson 핵심 연구 목표 본 연구는 복잡한 전략적 추론 능력을 요구하는 외교(Diplomacy) 게임에서 LLM을 평가하는 기존 방식의 높은 복잡성과 한계를 해결하고자 합니다. 특히 미세 조정이나 전문적인 훈련 없이 모든...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Diplomacy Game","Multi-agent Systems","Strategic Reasoning","LLM Evaluation","Prompt Engineering","Behavioral Analysis","Game AI"],
        "url": "/ai/review/2025-8-13-Democratizing_Diplomacy_A_Harness_for_Evaluating_Any_Large_Language_Model_on_Full-Press_Diplomacy/",
        "teaser": null
      },{
        "title": "[논문리뷰] Feedback-Driven Tool-Use Improvements in Large Language Models via Automated Build Environments",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Junjie Ye, Changhao Jiang, Zhengyin Du, Yufei Xu, Xuesong Yao, Zhiheng Xi, Xiaoran Fan, Qi Zhang, Xuanjing Huang, Jiecao Chen 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)의 효율적인 도구 사용(tool use) 학습을 위한 강화 학습(RL) 프레임워크 부재 문제를 해결하고자 합니다. 특히, 안정적인 훈련...","categories": ["Review"],
        "tags": ["Review","Large Language Models (LLMs)","Tool Use","Reinforcement Learning (RL)","Automated Environment Generation","Feedback-Driven Training","Reward Mechanism","Contextual Understanding"],
        "url": "/ai/review/2025-8-13-Feedback-Driven_Tool-Use_Improvements_in_Large_Language_Models_via_Automated_Build_Environments/",
        "teaser": null
      },{
        "title": "[논문리뷰] GeRe: Towards Efficient Anti-Forgetting in Continual Learning of LLM via General Samples Replay",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yunan Zhang, Shuoran Jiang, Mengchen Zhao, Yuefeng Li, Yang Fan, Xiangping Wu, Qingcai Chen 핵심 연구 목표 대규모 언어 모델(LLM)의 연속 학습 시 발생하는 파국적 망각(catastrophic forgetting) 문제를 해결하는 것이 주된 목표입니다. 특히, LLM이 기존의 일반적인 능력과 이전에 학습한 하위 태스크에서의 성능을 동시에 유지하면서...","categories": ["Review"],
        "tags": ["Review","Continual Learning","Large Language Models (LLMs)","Catastrophic Forgetting","Replay","Knowledge Distillation","Activation States","Anti-forgetting","Threshold-based Margin Loss"],
        "url": "/ai/review/2025-8-13-GeRe_Towards_Efficient_Anti-Forgetting_in_Continual_Learning_of_LLM_via_General_Samples_Replay/",
        "teaser": null
      },{
        "title": "[논문리뷰] HierSearch: A Hierarchical Enterprise Deep Search Framework Integrating Local and Web Searches",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiejun Tan, Zhicheng Dou, Yan Yu, Jiehan Cheng, Qiang Ju, Jian Xie, Ji-Rong Wen 핵심 연구 목표 이 논문은 기업 환경에서 로컬(사내 문서/지식 그래프) 및 웹 지식 소스를 동시에 활용하는 딥 서치 시스템의 필요성에 주목합니다. 기존 단일 소스 딥 서치나 평면(flat) 강화 학습(RL) 기반의...","categories": ["Review"],
        "tags": ["Review","Hierarchical Reinforcement Learning","Deep Search","Multi-source RAG","Agentic AI","Knowledge Integration","Enterprise Search","Large Reasoning Models"],
        "url": "/ai/review/2025-8-13-HierSearch_A_Hierarchical_Enterprise_Deep_Search_Framework_Integrating_Local_and_Web_Searches/",
        "teaser": null
      },{
        "title": "[논문리뷰] Matrix-3D: Omnidirectional Explorable 3D World Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhongqi Yang, Wenhang Ge, Yuqi Li, Jiaqi Chen, Haoyuan Li, Mengyin An, Fei Kang, Hua Xue, Baixin Xu, Yuyang Yin, Eric Li, Yang Liu, Yikai Wang, Hao-Xiang Guo, Yahui Zhou 핵심 연구 목표 본 논문은 단일 이미지 또는 텍스트 프롬프트로부터 전방위 탐색 가능한 3D...","categories": ["Review"],
        "tags": ["Review","3D World Generation","Panoramic Video Generation","3D Reconstruction","Diffusion Models","Gaussian Splatting","Dataset","Camera Control"],
        "url": "/ai/review/2025-8-13-Matrix-3D_Omnidirectional_Explorable_3D_World_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] NVSpeech: An Integrated and Scalable Pipeline for Human-Like Speech Modeling with Paralinguistic Vocalizations",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Huan Liao, Qinke Ni, Yuancheng Wang, Yiheng Lu, Haoyue Zhan 핵심 연구 목표 본 연구는 자연스러운 음성 의사소통에 필수적인 웃음, 호흡, 감탄사 등의 비언어적 발성(paralinguistic vocalizations)이 기존 ASR 및 TTS 시스템에서 간과되는 문제를 해결하고자 합니다. 궁극적으로 중국어 음성에서 비언어적 발성의 인식과 합성을 아우르는 통합적이고...","categories": ["Review"],
        "tags": ["Review","Paralinguistic Vocalizations","Speech Recognition","Text-to-Speech","Speech Synthesis","Data Annotation","Mandarin Speech","Expressive Speech"],
        "url": "/ai/review/2025-8-13-NVSpeech_An_Integrated_and_Scalable_Pipeline_for_Human-Like_Speech_Modeling_with_Paralinguistic_Vocalizations/",
        "teaser": null
      },{
        "title": "[논문리뷰] OpenCUA: Open Foundations for Computer-Use Agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Tianbao Xie, Junlin Yang, Dunjie Lu, Bowen Wang, Xinyuan Wang et al. 핵심 연구 목표 본 논문은 상업용 컴퓨터 사용 에이전트(CUA) 시스템의 핵심 세부 정보가 비공개인 현 상황에서, 연구 커뮤니티가 CUA의 역량, 한계, 위험을 연구할 수 있는 포괄적인 오픈 소스 프레임워크를 제공하는 것을 목표로...","categories": ["Review"],
        "tags": ["Review","Computer-Use Agents","Vision-Language Models","Chain-of-Thought Reasoning","Large-scale Dataset","Open-source Framework","Desktop Automation","Agent Evaluation"],
        "url": "/ai/review/2025-8-13-OpenCUA_Open_Foundations_for_Computer-Use_Agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] Test-Time Reinforcement Learning for GUI Grounding via Region Consistency",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yong Du, Yuchen Yan, Fei Tang, Zhengxi Lu, Chang Zong, Weiming Lu, Shengpei Jiang, Yongliang Shen 핵심 연구 목표 이 논문은 픽셀 수준 주석의 높은 비용과 기존 훈련 방식의 한계로 인해 GUI 접지(grounding)의 성능 확장성에 제약이 있다는 문제를 해결하고자 합니다. 특히, 모델이 동일한 GUI...","categories": ["Review"],
        "tags": ["Review","GUI Grounding","Test-Time Scaling","Reinforcement Learning","Region Consistency","Spatial Voting","Self-Supervised Learning","Vision-Language Models"],
        "url": "/ai/review/2025-8-13-Test-Time_Reinforcement_Learning_for_GUI_Grounding_via_Region_Consistency/",
        "teaser": null
      },{
        "title": "[논문리뷰] Time Is a Feature: Exploiting Temporal Dynamics in Diffusion Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wen Wang, Bozhen Fang, Chenchen Jing, Yongliang Shen, Yangyi Shen, Qiuyu Wang, Hao Ouyang, Hao Chen, Chunhua Shen 핵심 연구 목표 본 논문은 확산 언어 모델(dLLMs)이 텍스트를 생성하는 반복적인 디노이징 과정에서 “시간적 진동(temporal oscillation)”이라는 중요한 현상을 규명하고, 이를 활용하여 모델 성능을 개선하는 것을 목표로...","categories": ["Review"],
        "tags": ["Review","Diffusion Language Models","Temporal Oscillation","Self-Consistency Voting","Reinforcement Learning","Temporal Semantic Entropy","Text Generation"],
        "url": "/ai/review/2025-8-13-Time_Is_a_Feature_Exploiting_Temporal_Dynamics_in_Diffusion_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] TopXGen: Topic-Diverse Parallel Data Generation for Low-Resource Machine Translation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Armel Zebaze, Benoît Sagot, Rachel Bawden 핵심 연구 목표 본 연구는 저자원 언어(LRL) 기계 번역(MT) 모델의 성능 향상을 위해, 고품질의 주제 다양성(topic-diverse)을 가진 병렬 데이터를 자동으로 생성하는 방법을 제시합니다. 기존의 병렬 데이터 부족 문제를 해결하고, 특히 LLM이 LRL 번역에서 부진한 한계를 극복하고자 합니다. 핵심...","categories": ["Review"],
        "tags": ["Review","Low-Resource MT","Data Augmentation","Large Language Models (LLMs)","Back-Translation","In-Context Learning (ICL)","Fine-Tuning","Topic-Guided Generation","Parallel Data Synthesis"],
        "url": "/ai/review/2025-8-13-TopXGen_Topic-Diverse_Parallel_Data_Generation_for_Low-Resource_Machine_Translation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Towards Affordance-Aware Robotic Dexterous Grasping with Human-like Priors",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Haoyu Zhao, Linghao Zhuang, Xingyue Zhao, Cheng Zeng, Haoran Xu, Yuming Jiang, Jun Cen, Kexiang Wang, Jiayan Guo, Siteng Huang, Xin Li, Deli Zhao, Hua Zou 핵심 연구 목표 이 논문은 로봇의 능숙한 파지(dexterous grasping) 시 기존 연구들이 간과했던 어포던스 인식(affordance-aware) 위치 설정 및...","categories": ["Review"],
        "tags": ["Review","Robotic Dexterous Grasping","Affordance-Aware","Human-like Priors","Reinforcement Learning","Vision-Language Models","Two-Stage Training","Manipulation"],
        "url": "/ai/review/2025-8-13-Towards_Affordance-Aware_Robotic_Dexterous_Grasping_with_Human-like_Priors/",
        "teaser": null
      },{
        "title": "[논문리뷰] Train Long, Think Short: Curriculum Learning for Efficient Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hasan Abed Al Kader Hammoud, Kumail Alhamoud, Abed Hammoud, Elie Bou-Zeid, Marzyeh Ghassemi 핵심 연구 목표 대규모 언어 모델(LLMs)의 추론 능력 향상 과정에서 발생하는 비효율성, 즉 고정된 토큰 예산의 한계와 과도하게 긴 추론 과정의 문제를 해결하고자 합니다. 본 연구는 모델이 처음에 광범위한 탐색을 통해...","categories": ["Review"],
        "tags": ["Review","Curriculum Learning","Reinforcement Learning","Large Language Models","Reasoning Efficiency","Token Budget Control","Group Relative Policy Optimization","Chain-of-Thought"],
        "url": "/ai/review/2025-8-13-Train_Long_Think_Short_Curriculum_Learning_for_Efficient_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] UNCAGE: Contrastive Attention Guidance for Masked Generative Transformers in Text-to-Image Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wonjun Kang, Byeongkeun Ahn, Minjae Lee, Kevin Galim, Seunghyuk Oh, Hyung Il Koo, Nam Ik Cho 핵심 연구 목표 본 논문은 Masked Generative Transformers (MGTs)를 사용한 텍스트-이미지(T2I) 생성 시 발생하는 조합적 충실도(compositional fidelity) 문제를 해결하고, 특히 속성 바인딩(attribute binding) 오류를 개선하는 것을 목표로 합니다....","categories": ["Review"],
        "tags": ["Review","Text-to-Image Generation","Masked Generative Transformers","Compositional Generation","Attention Guidance","Unmasking Strategy","Contrastive Learning","Training-Free","Attribute Binding"],
        "url": "/ai/review/2025-8-13-UNCAGE_Contrastive_Attention_Guidance_for_Masked_Generative_Transformers_in_Text-to-Image_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] VertexRegen: Mesh Generation with Continuous Level of Detail",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiang Zhang, Yawar Siddiqui, Armen Avetisyan, Chris Xie, Jakob Engel, Henry Howard-Jenkins 핵심 연구 목표 기존 자동회귀 메쉬 생성 모델들이 부분-완료 방식으로 동작하여, 유효한 메쉬를 얻기 위해 전체 시퀀스를 생성해야만 하고 중간 단계에서는 불완전한 구조를 생성하는 문제를 해결하고자 합니다. 본 논문은 메쉬 생성 과정에서...","categories": ["Review"],
        "tags": ["Review","Mesh Generation","Level of Detail (LOD)","Progressive Meshes","Vertex Split","Autoregressive Models","Transformer","3D Graphics"],
        "url": "/ai/review/2025-8-13-VertexRegen_Mesh_Generation_with_Continuous_Level_of_Detail/",
        "teaser": null
      },{
        "title": "[논문리뷰] WGAST: Weakly-Supervised Generative Network for Daily 10 m Land Surface Temperature Estimation via Spatio-Temporal Fusion",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Sofiane Bouaziz, Adel Hafiane, Raphaël Canals, Rachid Nedjai 핵심 연구 목표 현재 원격 감지 위성은 지표면 온도(LST) 데이터의 공간 및 시간 해상도 간 트레이드오프 문제를 겪고 있으며, 특히 일별 10m 해상도 LST 추정은 어렵습니다. 본 연구는 이러한 한계를 극복하고, 거친 1km Terra MODIS 데이터와...","categories": ["Review"],
        "tags": ["Review","Spatio-Temporal Fusion","Land Surface Temperature","Generative Adversarial Network","Weakly-Supervised Learning","Remote Sensing","Deep Learning"],
        "url": "/ai/review/2025-8-13-WGAST_Weakly-Supervised_Generative_Network_for_Daily_10_m_Land_Surface_Temperature_Estimation_via_Spatio-Temporal_Fusion/",
        "teaser": null
      },{
        "title": "[논문리뷰] AMFT: Aligning LLM Reasoners by Meta-Learning the Optimal Imitation-Exploration Balance",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Lixuan He, Jie Feng, Yong Li 핵심 연구 목표 대규모 언어 모델(LLM)이 추론 태스크에서 겪는 catastrophic forgetting 및 모방(imitation)과 탐색(exploration) 간의 최적화되지 않은 트레이드오프 문제를 해결하는 것이 목표입니다. 기존의 이단계(SFT 후 RL) 또는 휴리스틱 기반 단일 단계 접근 방식의 한계를 극복하고, SFT와 RL의 균형을...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Fine-tuning","Reinforcement Learning","Meta-learning","Adaptive Control","Imitation Learning","Exploration","Reasoning"],
        "url": "/ai/review/2025-8-14-AMFT_Aligning_LLM_Reasoners_by_Meta-Learning_the_Optimal_Imitation-Exploration_Balance/",
        "teaser": null
      },{
        "title": "[논문리뷰] AWorld: Dynamic Multi-Agent System with Stable Maneuvering for Robust GAIA Problem Solving",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jinjie Gu, Chenyi Zhuang, Chengyue Yu, Qintong Wu, Zhitian Xie 핵심 연구 목표 대규모 언어 모델(LLM) 기반 에이전트가 외부 도구를 활용할 때 발생하는 확장된 컨텍스트 및 노이즈/관련성 없는 도구 출력으로 인한 시스템 신뢰성 및 정확도 저하 문제를 해결하고, 에이전트 기반 시스템의 안정성과 견고성을 향상시키는...","categories": ["Review"],
        "tags": ["Review","Multi-Agent System","Agent Stability","LLM","Tool Use","GAIA Benchmark","Robustness","Dynamic Supervision","Maneuvering"],
        "url": "/ai/review/2025-8-14-AWorld_Dynamic_Multi-Agent_System_with_Stable_Maneuvering_for_Robust_GAIA_Problem_Solving/",
        "teaser": null
      },{
        "title": "[논문리뷰] Can LLM-Generated Textual Explanations Enhance Model Classification Performance? An Empirical Study",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Mahdi Dhaini, Juraj Vladika, Ege Erdogan, Zineb Attaoui, Gjergji Kasneci 핵심 연구 목표 본 연구는 비용이 많이 들고 확장성이 낮은 인간 주석 기반 설명의 한계를 극복하기 위해, LLM이 생성한 텍스트 설명이 자연어 추론(NLI)과 같은 다운스트림 예측 태스크에서 PLM 및 LLM의 분류 성능을 향상시킬 수...","categories": ["Review"],
        "tags": ["Review","Explainable NLP","Natural Language Explanations","Large Language Models","Pre-trained Language Models","Natural Language Inference","Model Performance Enhancement","Text Generation"],
        "url": "/ai/review/2025-8-14-Can_LLM-Generated_Textual_Explanations_Enhance_Model_Classification_Performance_An_Empirical_Study/",
        "teaser": null
      },{
        "title": "[논문리뷰] Cooper: Co-Optimizing Policy and Reward Models in Reinforcement Learning for Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Haitao Hong, Yuchen Yan, Xingyu Wu, Guiyang Hou, Wenqi Zhang, Weiming Lu, Yongliang Shen, Jun Xiao 핵심 연구 목표 대규모 언어 모델(LLMs)의 추론 능력 강화를 위한 강화 학습(RL) 시, 기존 보상 모델(Reward Model, RM)이 직면하는 두 가지 주요 문제인 보상 해킹(reward hacking)과 견고성 부족을...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Large Language Models","Reward Model","Policy Optimization","Reward Hacking","Hybrid Annotation","Mathematical Reasoning","Verifiable Rewards"],
        "url": "/ai/review/2025-8-14-Cooper_Co-Optimizing_Policy_and_Reward_Models_in_Reinforcement_Learning_for_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Diffusion LLMs Can Do Faster-Than-AR Inference via Discrete Diffusion Forcing",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xu Wang, Chenkai Xu, Yijie Jin, Jiachun Jin, Hao Zhang, Zhijie Deng 핵심 연구 목표 본 논문은 기존 오픈소스 Diffusion Large Language Models (dLLMs)가 Autoregressive (AR) LLMs에 비해 추론 속도에서 우위를 점하지 못하는 문제를 해결하는 것을 목표로 합니다. 특히, dLLMs의 병렬 디코딩 잠재력을 활용하여...","categories": ["Review"],
        "tags": ["Review","Diffusion LLMs","Faster Inference","Discrete Diffusion Forcing (D2F)","Autoregressive Generation","KV Cache Optimization","Parallel Decoding","Text Generation","Model Distillation"],
        "url": "/ai/review/2025-8-14-Diffusion_LLMs_Can_Do_Faster-Than-AR_Inference_via_Discrete_Diffusion_Forcing/",
        "teaser": null
      },{
        "title": "[논문리뷰] Echo-4o: Harnessing the Power of GPT-4o Synthetic Images for Improved Image Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhenghao Hu, Leqi Zhu, Zihao Wang, Dongzhi Jiang, Junyan Ye 핵심 연구 목표 본 논문은 GPT-4o로 생성된 합성 이미지 데이터를 활용하여 오픈소스 이미지 생성 모델이 겪는 성능 격차를 해소하는 것을 목표로 합니다. 특히, 실제 데이터셋에서 부족한 초현실적 판타지 시나리오 및 다중 참조 이미지 생성과...","categories": ["Review"],
        "tags": ["Review","Synthetic Data","Image Generation","GPT-4o","Multimodal Models","Instruction Following","Surreal Image Generation","Dataset","Benchmarking"],
        "url": "/ai/review/2025-8-14-Echo-4o_Harnessing_the_Power_of_GPT-4o_Synthetic_Images_for_Improved_Image_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] GSFixer: Improving 3D Gaussian Splatting with Reference-Guided Video Diffusion Priors",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xingyilang Yin, Qi Zhang, Jiahao Chang, Ying Feng, Qingnan Fan, Xi Yang, Chi-Man Pun, Huaqi Zhang, Xiaodong Cun 핵심 연구 목표 본 논문은 적은 수의 입력 영상으로 3D Gaussian Splatting (3DGS) 장면을 재구성할 때 발생하는 시각적 아티팩트와 3D 불일치 문제를 해결하는 것을 목표로 합니다....","categories": ["Review"],
        "tags": ["Review","3D Gaussian Splatting","Novel View Synthesis","Diffusion Model","Artifact Restoration","Sparse-view 3D Reconstruction","Reference-Guided"],
        "url": "/ai/review/2025-8-14-GSFixer_Improving_3D_Gaussian_Splatting_with_Reference-Guided_Video_Diffusion_Priors/",
        "teaser": null
      },{
        "title": "[논문리뷰] IAG: Input-aware Backdoor Attack on VLMs for Visual Grounding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Junxian Li, Beining Xu, Di Zhang 핵심 연구 목표 이 연구는 시각적 그라운딩(Visual Grounding) 태스크를 수행하는 Vision-Language Models (VLMs)에 대한 새로운 입력 인지(Input-aware) 백도어 공격(Backdoor Attack) 시나리오와 방법론인 IAG를 제시합니다. 공격자는 사용자 질의와 관계없이 모델이 특정 타겟 객체를 그라운딩하도록 조작하며, 이는 시스템 오작동, 안전...","categories": ["Review"],
        "tags": ["Review","Backdoor Attack","Vision-Language Models (VLMs)","Visual Grounding","Input-aware Trigger","Adversarial Attack","Security","U-Net","Open-vocabulary"],
        "url": "/ai/review/2025-8-14-IAG_Input-aware_Backdoor_Attack_on_VLMs_for_Visual_Grounding/",
        "teaser": null
      },{
        "title": "[논문리뷰] Learning to Align, Aligning to Learn: A Unified Approach for Self-Optimized Alignment",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Haowen Wang, Yun Yue, Zhiling Ye, Shuowen Zhang, Lei Fan, Jiaxin Liang, Jiadi Jiang, Cheng Wei, Jingyuan Deng, Xudong Han, Ji Li, Chunxiao Guo, Peng Wei, Jian Wang, Jinjie Gu 핵심 연구 목표 이 논문은 대규모 언어 모델(LLM) 정렬(alignment) 방법론의 한계를 해결하고자 합니다. 기존...","categories": ["Review"],
        "tags": ["Review","LLM Alignment","Reinforcement Learning from Human Feedback","Preference Learning","Group Relative Alignment Optimization","Self-Optimization","Mixture-of-Experts","Imitation Learning"],
        "url": "/ai/review/2025-8-14-Learning_to_Align_Aligning_to_Learn_A_Unified_Approach_for_Self-Optimized_Alignment/",
        "teaser": null
      },{
        "title": "[논문리뷰] MathReal: We Keep It Real! A Real Scene Benchmark for Evaluating Math Reasoning in Multimodal Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jun Feng, Zixin Wang, Zhentao Zhang, Yue Guo, Zhihan Zhou, Xiuyi Chen, Zhenyang Li, Dawei Yin 핵심 연구 목표 기존 MLLM 수학 추론 벤치마크들이 대부분 깨끗하거나 전처리된 이미지를 사용하는 한계를 극복하고자 합니다. 실제 K-12 교육 환경에서 모바일 기기로 촬영된 노이즈가 많은 이미지 기반 수학...","categories": ["Review"],
        "tags": ["Review","Multimodal Large Language Models (MLLMs)","Math Reasoning","Real-World Benchmark","Visual Perception","Robustness","K-12 Education","Dataset"],
        "url": "/ai/review/2025-8-14-MathReal_We_Keep_It_Real_A_Real_Scene_Benchmark_for_Evaluating_Math_Reasoning_in_Multimodal_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Mol-R1: Towards Explicit Long-CoT Reasoning in Molecule Discovery",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiatong Li, Weida Wang, Qinggang Zhang, Junxian Li, Di Zhang 핵심 연구 목표 본 논문은 Large Language Models (LLMs)의 분자 발견 분야 적용 시 나타나는 설명 가능성 및 추론 성능 한계를 해결하는 것을 목표로 합니다. 특히, 텍스트 기반 분자 생성에서 R1-like Long Chain-of-Thought (CoT)...","categories": ["Review"],
        "tags": ["Review","Molecule Discovery","Chain-of-Thought","Large Language Models","Reinforcement Learning","Supervised Fine-tuning","Molecular Generation","Explainable AI"],
        "url": "/ai/review/2025-8-14-Mol-R1_Towards_Explicit_Long-CoT_Reasoning_in_Molecule_Discovery/",
        "teaser": null
      },{
        "title": "[논문리뷰] Noise Hypernetworks: Amortizing Test-Time Compute in Diffusion Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Luca Eyring, Shyamgopal Karthik, Alexey Dosovitskiy, Nataniel Ruiz, Zeynep Akata 핵심 연구 목표 본 논문은 확산 모델에서 추론 시 계산 비용을 크게 증가시키는 테스트-시간 스케일링(test-time scaling)의 문제점을 해결하고자 합니다. 모델이 추가적인 계산을 통해 생성 품질을 향상시키는 이점은 유지하면서도, 추론 과정의 속도 저하와 비실용성을 제거하여...","categories": ["Review"],
        "tags": ["Review","Diffusion Models","Hypernetworks","Test-Time Optimization","Reward-Guided Generation","Latent Space Optimization","LoRA","Generative AI"],
        "url": "/ai/review/2025-8-14-Noise_Hypernetworks_Amortizing_Test-Time_Compute_in_Diffusion_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Seeing, Listening, Remembering, and Reasoning: A Multimodal Agent with Long-Term Memory",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Lin Long, Yichen He, Wentao Ye, Yiyuan Pan, Yuan Lin, Hang Li, Junbo Zhao, Wei Li 핵심 연구 목표 본 논문은 실시간 멀티모달 입력(시각, 청각)을 지속적으로 처리하여 장기 기억을 구축하고 업데이트하며, 이를 기반으로 추론하여 복잡한 지시를 완료할 수 있는 멀티모달 에이전트 프레임워크 M3-Agent를 제안합니다....","categories": ["Review"],
        "tags": ["Review","Multimodal Agent","Long-Term Memory","Episodic Memory","Semantic Memory","Reinforcement Learning","Video Question Answering","Entity-Centric Memory"],
        "url": "/ai/review/2025-8-14-Seeing_Listening_Remembering_and_Reasoning_A_Multimodal_Agent_with_Long-Term_Memory/",
        "teaser": null
      },{
        "title": "[논문리뷰] Stand-In: A Lightweight and Plug-and-Play Identity Control for Video Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Bowen Xue, Qixin Yan, Wenjing Wang, Hao Liu, Chen Li 핵심 연구 목표 이 논문은 비디오 생성에서 사용자가 지정한 정체성을 고품질로 일관되게 유지하면서도, 기존 방법론의 과도한 훈련 파라미터 및 다른 AI 생성 모델과의 호환성 부족 문제를 해결하는 것을 목표로 합니다. 특히, 경량의 플러그-앤-플레이 프레임워크를...","categories": ["Review"],
        "tags": ["Review","Video Generation","Identity Preservation","Plug-and-Play","Diffusion Models","Self-Attention","Lightweight AI","Conditional Image Branch"],
        "url": "/ai/review/2025-8-14-Stand-In_A_Lightweight_and_Plug-and-Play_Identity_Control_for_Video_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Story2Board: A Training-Free Approach for Expressive Storyboard Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: David Dinkevich, Matan Levy, Omri Avrahami, Dvir Samuel, Dani Lischinski 핵심 연구 목표 논문은 자연어 프롬프트로부터 표현력이 풍부하고 시각적으로 일관된 스토리보드를 생성하는 훈련 불필요(training-free) 프레임워크인 Story2Board를 제시합니다. 기존 Text-to-Image(T2I) 모델 기반 스토리보드 생성 방법론들이 캐릭터 정체성 유지에만 집중하고 공간 구성, 배경 진화, 내러티브 페이싱...","categories": ["Review"],
        "tags": ["Review","Storyboard Generation","Text-to-Image","Diffusion Models","Training-Free","Character Consistency","Scene Diversity","Visual Storytelling"],
        "url": "/ai/review/2025-8-14-Story2Board_A_Training-Free_Approach_for_Expressive_Storyboard_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] VisCodex: Unified Multimodal Code Generation via Merging Vision and Coding Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Lingjie Jiang, Shaohan Huang, Xun Wu, Yixia Li, Dongdong Zhang, Furu Wei 핵심 연구 목표 논문은 멀티모달 대규모 언어 모델(MLLM)이 시각적 입력으로부터 기능적인 코드를 생성하는 데 있어 한계가 있음을 지적합니다. 이를 해결하기 위해 시각적 이해와 고급 코딩 능력을 통합하여 강력한 멀티모달 코드 생성 능력을...","categories": ["Review"],
        "tags": ["Review","Multimodal LLM","Code Generation","Model Merging","Task Vectors","Vision-Language Model","Coding LLM","Instruction Tuning","Benchmark"],
        "url": "/ai/review/2025-8-14-VisCodex_Unified_Multimodal_Code_Generation_via_Merging_Vision_and_Coding_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] When Explainability Meets Privacy: An Investigation at the Intersection of Post-hoc Explainability and Differential Privacy in the Context of Natural Language Processing",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Mahdi Dhaini, Stephen Meisenbacher, Ege Erdogan, Florian Matthes, Gjergji Kasneci 핵심 연구 목표 이 논문은 NLP 분야에서 사후 설명 가능성(Post-hoc Explainability)과 차등 프라이버시(Differential Privacy)의 교차점을 탐구하며, 프라이버시와 설명 가능성 달성의 동시 가능성 및 그들 사이의 상충 관계를 이해하는 것을 목표로 합니다. 특히, 데이터 수준...","categories": ["Review"],
        "tags": ["Review","Natural Language Processing (NLP)","Explainable AI (XAI)","Post-hoc Explainability","Differential Privacy (DP)","Privacy-Utility Trade-off","Model Faithfulness","Text Privatization"],
        "url": "/ai/review/2025-8-15-2025-8-15-Explainability_and_Privacy_in_NLP/",
        "teaser": null
      },{
        "title": "[논문리뷰] A Survey on Diffusion Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Tianyi Li, Mingda Chen, Bowei Guo, and Zhiqiang Shen 핵심 연구 목표 본 설문조사는 지배적인 자기회귀(AR) 패러다임에 대한 강력하고 유망한 대안으로 부상하고 있는 확산 언어 모델(DLM)의 전체 생태계를 체계적으로 포괄적으로 조명하는 것을 목표로 합니다. DLM의 근본 원리, 기술, 한계를 분석하고, 미래 연구 방향을 제시하여...","categories": ["Review"],
        "tags": ["Review","Diffusion Language Models","Generative AI","Parallel Decoding","Text Generation","Multimodal AI","Model Compression","Reinforcement Learning from Human Feedback","Inference Optimization"],
        "url": "/ai/review/2025-8-15-A_Survey_on_Diffusion_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] From Black Box to Transparency: Enhancing Automated Interpreting Assessment with Explainable AI in College Classrooms",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhaokun Jiang, Ziyin Zhang 핵심 연구 목표 본 논문은 기존의 수동 통역 평가 방식의 한계(편향, 불일치)와 자동 평가 시스템의 불투명성 및 데이터 불균형 문제를 해결하고자 합니다. 특히 모델 예측에 대한 설명 가능성(Explainability)을 강조하며, 통역 품질 평가를 위한 투명하고 다차원적인 자동화 프레임워크를 제안합니다. 핵심 방법론...","categories": ["Review"],
        "tags": ["Review","Automated Interpreting Assessment","Explainable AI","Data Augmentation","Variational Autoencoder","SHAP","Interpreting Quality","Natural Language Processing"],
        "url": "/ai/review/2025-8-15-From_Black_Box_to_Transparency_Enhancing_Automated_Interpreting_Assessment_with_Explainable_AI_in_College_Classrooms/",
        "teaser": null
      },{
        "title": "[논문리뷰] HumanSense: From Multimodal Perception to Empathetic Context-Aware Responses through Reasoning MLLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zheng Qin, Ruobing Zheng, Yabing Wang, Tianqi Li, Yi Yuan, Jingdong Chen, Le Wang 핵심 연구 목표 본 논문은 인간 중심 시나리오에서 MLLM(Multimodal Large Language Models)의 심층적인 이해 및 공감적, 상황 인지적 응답 능력을 평가하기 위한 세분화된 평가 프레임워크의 부족 문제를 해결하고자 합니다. 이를...","categories": ["Review"],
        "tags": ["Review","Multimodal LLMs","Human-Centered AI","Empathy","Context-Awareness","MLLM Benchmark","Reinforcement Learning","Reasoning"],
        "url": "/ai/review/2025-8-15-HumanSense_From_Multimodal_Perception_to_Empathetic_Context-Aware_Responses_through_Reasoning_MLLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] NextStep-1: Toward Autoregressive Image Generation with Continuous Tokens at Scale",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Quan Sun, Jingwei Wu, Guopeng Li, Chunrui Han, NextStep Team 핵심 연구 목표 이 논문은 텍스트-이미지 생성 분야에서 기존 autoregressive (AR) 모델이 직면한 양자화 손실 및 무거운 확산 모델 의존성의 한계를 극복하고자 합니다. NextStep-1을 통해 연속형 이미지 토큰과 이산형 텍스트 토큰을 사용하는 next-token prediction...","categories": ["Review"],
        "tags": ["Review","Autoregressive Models","Text-to-Image Generation","Continuous Latent Tokens","Flow Matching","Image Editing","Multimodal Learning","Transformer Architecture"],
        "url": "/ai/review/2025-8-15-NextStep-1_Toward_Autoregressive_Image_Generation_with_Continuous_Tokens_at_Scale/",
        "teaser": null
      },{
        "title": "[논문리뷰] PRELUDE: A Benchmark Designed to Require Global Comprehension and Reasoning over Long Contexts",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Rui Lu, Tong Li, Chulun Zhou, Tsz Ting Chung, Mo Yu 핵심 연구 목표 이 논문은 기존 장문 컨텍스트 이해 벤치마크의 한계(기억력 의존, 얕은 추론, 전역적 의존성 부족 등)를 해결하고, 대규모 언어 모델(LLMs)의 전역적 이해(global comprehension) 및 심층 추론(deep reasoning) 능력을 엄격하게 평가하기 위한...","categories": ["Review"],
        "tags": ["Review","Long-Context Understanding","Reasoning Benchmark","LLMs Evaluation","Natural Language Processing","Global Comprehension","Fluid Intelligence","Prequel Entailment","RAG"],
        "url": "/ai/review/2025-8-15-PRELUDE_A_Benchmark_Designed_to_Require_Global_Comprehension_and_Reasoning_over_Long_Contexts/",
        "teaser": null
      },{
        "title": "[논문리뷰] Pass@k Training for Adaptively Balancing Exploration and Exploitation of Large Reasoning Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhipeng Chen, Xiaobo Qin, Youbin Wu, Yue Ling, Qinghao Ye, Wayne Xin Zhao, Guang Shi 핵심 연구 목표 본 논문은 RLVR(Verifiable Rewards를 사용한 강화 학습) 환경에서 Pass@1 기반 훈련이 겪는 탐색-활용 균형 문제, 즉 정책이 보수적인 행동을 선호하여 지역 최적점에 수렴하는 문제를 해결하고자 합니다....","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Large Language Models","Exploration-Exploitation","Reward Design","Reasoning Tasks","Pass@k","Policy Optimization"],
        "url": "/ai/review/2025-8-15-Passk_Training_for_Adaptively_Balancing_Exploration_and_Exploitation_of_Large_Reasoning_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Processing and acquisition traces in visual encoders: What does CLIP know about your camera?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ryan Ramos, Vladan Stojnić, Giorgos Kordopatis-Zilos, Yuta Nakashima, Giorgos Tolias, Noa Garcia 핵심 연구 목표 본 연구는 파운데이션 시각 인코더(Foundation Visual Encoders)가 이미지 처리(예: JPEG 압축) 및 획득(예: 카메라 모델)과 관련된 메타데이터 정보를 어떻게 인코딩하며, 이러한 정보가 의미론적 예측에 어떤 영향을 미치는지 탐구하는 것을...","categories": ["Review"],
        "tags": ["Review","Visual Encoders","Metadata","Image Processing","Image Acquisition","Robustness","CLIP","Foundation Models","Distribution Shift"],
        "url": "/ai/review/2025-8-15-Processing_and_acquisition_traces_in_visual_encoders_What_does_CLIP_know_about_your_camera/",
        "teaser": null
      },{
        "title": "[논문리뷰] STream3R: Scalable Sequential 3D Reconstruction with Causal Transformer",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yushi Lan, Yihang Luo, Fangzhou Hong, Shangchen Zhou, Honghua Chen, Zhaoyang Lyu, Shuai Yang, Bo Dai, Chen Change Loy, Xingang Pan 핵심 연구 목표 논문은 기존 다중 뷰 3D 재구성 방법론들이 높은 연산 비용을 요구하거나 시퀀스 길이에 따라 확장성이 떨어지는 문제를 해결하고자 합니다. 이를...","categories": ["Review"],
        "tags": ["Review","3D Reconstruction","Causal Transformer","Sequential Modeling","Streaming Data","Pointmap Prediction","Online Perception","KVCache"],
        "url": "/ai/review/2025-8-15-STream3R_Scalable_Sequential_3D_Reconstruction_with_Causal_Transformer/",
        "teaser": null
      },{
        "title": "[논문리뷰] ToonComposer: Streamlining Cartoon Production with Generative Post-Keyframing",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Lingen Li, Guangzhi Wang, Zhaoyang Zhang, Qi Dou, Jinwei Gu, Tianfan Xue, Yaowei Li, Xiaoyu Li, Ying Shan 핵심 연구 목표 이 논문은 전통적인 카툰 제작 파이프라인의 핵심적인 병목 현상인 인비트위닝(inbetweening)과 컬러라이제이션(colorization) 단계의 수동적인 노력과 오류 누적 문제를 해결하는 것을 목표로 합니다. 이를 위해,...","categories": ["Review"],
        "tags": ["Review","Cartoon Generation","Video Diffusion Models","DiT","Post-Keyframing","Low-Rank Adaptation","Sparse Control","Generative AI","Animation"],
        "url": "/ai/review/2025-8-15-ToonComposer_Streamlining_Cartoon_Production_with_Generative_Post-Keyframing/",
        "teaser": null
      },{
        "title": "[논문리뷰] UI-Venus Technical Report: Building High-performance UI Agents with RFT",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shuheng Shen, Xingran Zhou, Zhenyu Xu, Zhengwen Zeng, Zhangxuan Gu 핵심 연구 목표 본 논문은 스크린샷만을 입력으로 받는 고성능 UI 에이전트인 UI-Venus를 구축하는 것을 목표로 합니다. 기존 지도 미세 조정(SFT) 방식의 한계인 일반화 능력 부족과 높은 데이터 수집 비용을 극복하고, 복잡한 UI 환경에서의 탐색...","categories": ["Review"],
        "tags": ["Review","UI Agent","MLLM","RFT","UI Grounding","UI Navigation","GRPO","Data Cleaning","Self-Evolving Trajectory"],
        "url": "/ai/review/2025-8-15-UI-Venus_Technical_Report_Building_High-performance_UI_Agents_with_RFT/",
        "teaser": null
      },{
        "title": "[논문리뷰] We-Math 2.0: A Versatile MathBook System for Incentivizing Visual Mathematical Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Runqi Qiao, Qiuna Tan, Peiqing Yang, Yanzi Wang, Xiaowan Wang 핵심 연구 목표 복잡한 시각 수학적 추론에서 Multimodal Large Language Models (MLLMs)의 한계를 극복하는 것을 목표로 합니다. 기존 연구가 데이터셋 구축과 모델 최적화에 집중하면서 간과되었던 포괄적인 지식 기반 설계와 모델 중심의 데이터 공간 모델링의...","categories": ["Review"],
        "tags": ["Review","Visual Mathematical Reasoning","MLLMs","Knowledge System","Reinforcement Learning","Curriculum Learning","Dataset Construction","Mathematical Benchmark"],
        "url": "/ai/review/2025-8-15-We-Math_2.0_A_Versatile_MathBook_System_for_Incentivizing_Visual_Mathematical_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Controlling Multimodal LLMs via Reward-guided Decoding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Oscar Mañas, Pierluca D’Oro, Koustuv Sinha, Adriana Romero-Soriano, Michal Drozdzal, Aishwarya Agrawal 핵심 연구 목표 본 논문은 MLLM(Multimodal Large Language Models)이 다양한 사용자 요구에 맞춰 동작을 조절할 수 있도록, 추론 과정에서 세밀한 제어를 가능하게 하는 것을 목표로 합니다. 특히, MLLM의 시각적 접지(visual grounding) 품질을...","categories": ["Review"],
        "tags": ["Review","Multimodal LLMs","Reward Models","Guided Decoding","Visual Grounding","Hallucination Mitigation","Object Precision","Object Recall","Inference-time Control"],
        "url": "/ai/review/2025-8-18-Controlling_Multimodal_LLMs_via_Reward-guided_Decoding/",
        "teaser": null
      },{
        "title": "[논문리뷰] DINOv3",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Oriane Siméoni, Huy V. Vo, Maximilian Seitzer, Federico Baldassarre, Maxime Oquab, et al. 핵심 연구 목표 본 연구는 수동 데이터 주석 없이 대규모 데이터셋과 대규모 아키텍처에 맞춰 모델을 확장하고, 단일 알고리즘으로 다양한 소스(자연 이미지부터 항공 이미지까지)에서 범용적인 시각 표현을 학습하는 것을 목표로 합니다. 특히,...","categories": ["Review"],
        "tags": ["Review","Self-supervised Learning","Foundation Models","Vision Transformer","Dense Feature Maps","Gram Anchoring","Model Distillation","Geospatial AI"],
        "url": "/ai/review/2025-8-18-DINOv3/",
        "teaser": null
      },{
        "title": "[논문리뷰] FantasyTalking2: Timestep-Layer Adaptive Preference Optimization for Audio-Driven Portrait Animation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: MengChao Wang, Qiang Wang, Fan Jiang, Mu Xu 핵심 연구 목표 오디오 기반 인물 애니메이션에서 모션 자연스러움, 립싱크 정확도, 시각적 품질과 같은 다양한 인간 선호도를 동시에 만족시키지 못하는 문제를 해결하는 것이 목표입니다. 기존 방식의 상충하는 선호도 목표와 대규모 다차원 선호도 데이터셋의 부족을 극복하고, 생성...","categories": ["Review"],
        "tags": ["Review","Audio-Driven Animation","Preference Optimization","Diffusion Models","Reward Modeling","Human Feedback","Multi-Objective Optimization","Timestep-Layer Adaptive"],
        "url": "/ai/review/2025-8-18-FantasyTalking2_Timestep-Layer_Adaptive_Preference_Optimization_for_Audio-Driven_Portrait_Animation/",
        "teaser": null
      },{
        "title": "[논문리뷰] MAESTRO: Masked AutoEncoders for Multimodal, Multitemporal, and Multispectral Earth Observation Data",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Antoine Labatie, Michael Vaccaro, Nina Lardiere, Anatol Garioud, Nicolas Gonthier 핵심 연구 목표 본 논문은 지구 관측(EO) 데이터의 고유한 다중 모달, 다중 시간, 다중 스펙트럼 특성을 효율적으로 처리하기 위해 Masked Autoencoder (MAE) 프레임워크를 최적화하는 것을 목표로 합니다. 이를 통해 EO 데이터의 복잡한 이질성을 효과적으로...","categories": ["Review"],
        "tags": ["Review","Self-supervised Learning","Masked Autoencoder","Earth Observation","Multimodal","Multitemporal","Multispectral","Fusion Strategies","Target Normalization"],
        "url": "/ai/review/2025-8-18-MAESTRO_Masked_AutoEncoders_for_Multimodal_Multitemporal_and_Multispectral_Earth_Observation_Data/",
        "teaser": null
      },{
        "title": "[논문리뷰] PaperRegister: Boosting Flexible-grained Paper Search via Hierarchical Register Indexing",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xianpei Han, Yaojie Lu, Hongyu Lin, Xuanang Chen, lzq2021 핵심 연구 목표 이 논문은 기존 논문 검색 시스템이 추상 기반 인덱싱에 의존하여 세분화된 쿼리(flexible-grained queries)를 효과적으로 처리하지 못하는 한계를 해결하는 것을 목표로 합니다. 논문의 특정 모듈 구성이나 방법론적 세부 사항과 같은 상세 정보에 대한...","categories": ["Review"],
        "tags": ["Review","논문 검색","계층적 인덱싱","유연한 검색","대규모 언어 모델","정보 추출","뷰 인식","강화 학습"],
        "url": "/ai/review/2025-8-18-PaperRegister_Boosting_Flexible-grained_Paper_Search_via_Hierarchical_Register_Indexing/",
        "teaser": null
      },{
        "title": "[논문리뷰] SPARSE Data, Rich Results: Few-Shot Semi-Supervised Learning via Class-Conditioned Image Translation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Guido Manni, Clemente Lauretti, Loredana Zollo, Paolo Soda 핵심 연구 목표 의료 영상 분야에서 레이블링된 학습 데이터의 부족으로 인한 딥러닝 모델의 한계를 극복하고, 특히 5개에서 50개 사이의 매우 적은 레이블링된 샘플만 사용 가능한 저데이터(low-data) 환경에서 강건한 이미지 분류 성능을 달성하는 것을 목표로 합니다. 핵심...","categories": ["Review"],
        "tags": ["Review","Semi-supervised Learning","Few-shot Learning","Medical Imaging","GAN-based Methods","Image-to-image Translation","Pseudo-labeling","Ensemble Learning"],
        "url": "/ai/review/2025-8-18-SPARSE_Data_Rich_Results_Few-Shot_Semi-Supervised_Learning_via_Class-Conditioned_Image_Translation/",
        "teaser": null
      },{
        "title": "[논문리뷰] SSRL: Self-Search Reinforcement Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuchen Fan, Kaiyan Zhang, Heng Zhou, Yuxin Zuo, Yanxu Chen, Yu Fu, Xinwei Long, Xuekai Zhu, Che Jiang, Yuchen Zhang, Li Kang, Gang Chen, Cheng Huang, Zhizhou He, Bingning Wang, Lei Bai, Ning Ding, Bowen Zhou 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)이...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Large Language Models","Self-Search","Sim-to-Real Transfer","Agentic AI","Knowledge Retrieval","Reward Modeling"],
        "url": "/ai/review/2025-8-18-SSRL_Self-Search_Reinforcement_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] StyleMM: Stylized 3D Morphable Face Model via Text-Driven Aligned Image Translation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Seungmi Lee, Kwan Yun, Junyong Noh 핵심 연구 목표 본 논문은 기존 3D Morphable Model (3DMM)의 한계, 즉 일관된 메쉬 구조, 분리된 제어, 그리고 사실적 범위를 넘어서는 스타일화라는 세 가지 핵심 요구사항을 동시에 충족하지 못하는 문제를 해결하고자 합니다. 사용자 정의 텍스트 설명에 따라 다양한...","categories": ["Review"],
        "tags": ["Review","3D Morphable Model","Face Stylization","Text-to-Image Translation","Diffusion Model","Attribute Preservation","Generative AI","Computer Graphics"],
        "url": "/ai/review/2025-8-18-StyleMM_Stylized_3D_Morphable_Face_Model_via_Text-Driven_Aligned_Image_Translation/",
        "teaser": null
      },{
        "title": "[논문리뷰] TexVerse: A Universe of 3D Objects with High-Resolution Textures",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yibo Zhang, Li Zhang, Rui Ma, Nan Cao 핵심 연구 목표 본 연구의 핵심 목표는 고해상도 텍스처와 PBR(Physically Based Rendering) 재료를 특징으로 하는 대규모 3D 객체 데이터셋의 부족 문제를 해결하는 것입니다. 기존 3D 데이터셋(예: Objaverse)이 고해상도 텍스처를 충분히 제공하지 못하거나 품질 이질성이 큰 문제를...","categories": ["Review"],
        "tags": ["Review","3D Dataset","High-Resolution Textures","Physically Based Rendering (PBR)","3D Animation","Data Curation","GPT-5 Annotations","Sketchfab"],
        "url": "/ai/review/2025-8-18-TexVerse_A_Universe_of_3D_Objects_with_High-Resolution_Textures/",
        "teaser": null
      },{
        "title": "[논문리뷰] Thyme: Think Beyond Images",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wei Chen, Chaoyou Fu, Shukang Yin, Xingyu Lu, Yi-Fan Zhang 핵심 연구 목표 본 논문은 기존의 “이미지로 생각하기” 방식의 멀티모달 대규모 언어 모델(MLLM)이 가진 이미지 조작 기능의 제한성과 논리적 추론 능력의 한계를 극복하는 것을 목표로 합니다. 특히, OpenAI의 O3와 같은 독점 모델에 필적하는 다양한...","categories": ["Review"],
        "tags": ["Review","Multimodal LLMs","Code Generation","Image Processing","Reinforcement Learning","Supervised Fine-Tuning","Visual Reasoning","Sandbox"],
        "url": "/ai/review/2025-8-18-Thyme_Think_Beyond_Images/",
        "teaser": null
      },{
        "title": "[논문리뷰] X-Node: Self-Explanation is All We Need",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Prajit Sengupta and Islem Rekik 핵심 연구 목표 그래프 신경망(GNN)의 불투명한 의사결정 문제를 해결하고, 특히 신뢰성이 필수적인 고위험 임상 환경에서 개별 노드 수준의 충실한 자체 설명(self-explanation)을 제공하는 것을 목표로 합니다. 기존의 사후(post-hoc) 전역(global) 설명 방식의 한계를 극복하고, GNN 모델 자체에 설명 가능성을 내재화하고자 합니다....","categories": ["Review"],
        "tags": ["Review","Graph Neural Networks","Explainable AI","Self-Explanation","Node Classification","Medical Imaging","Natural Language Processing","Interpretability"],
        "url": "/ai/review/2025-8-18-X-Node_Self-Explanation_is_All_We_Need/",
        "teaser": null
      },{
        "title": "[논문리뷰] 4DNeX: Feed-Forward 4D Generative Modeling Made Easy",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhaoxi Chen, Tianqi Liu, Long Zhuo, Jiawei Ren, Zeng Tao, He Zhu, Fangzhou Hong, Liang Pan, Ziwei Liu 핵심 연구 목표 본 논문은 단일 이미지로부터 4D(동적 3D) 장면 표현을 효율적으로 생성하는 피드포워드 프레임워크인 4DNeX를 제안합니다. 기존 방법론들이 계산 비용이 높은 최적화 과정이나 다중 프레임...","categories": ["Review"],
        "tags": ["Review","4D Generation","Dynamic 3D","Generative Models","Diffusion Models","Single Image Input","Video Synthesis","Point Clouds","Dataset"],
        "url": "/ai/review/2025-8-19-4DNeX_Feed-Forward_4D_Generative_Modeling_Made_Easy/",
        "teaser": null
      },{
        "title": "[논문리뷰] Beyond Solving Math Quiz: Evaluating the Ability of Large Reasoning Models to Ask for Information",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Youcheng Huang, Xi Yang, Bowen Qin, Chen Huang, Duanyu Feng, Wenqiang Lei, Jiancheng Lv 핵심 연구 목표 본 논문은 기존 수학 벤치마크가 잘 정의된 문제 해결 능력에만 초점을 맞추는 한계를 지적하며, Large Reasoning Models (LRMs)이 정보가 불충분한 문제에 직면했을 때 능동적으로 정보를 요청하는 능력을...","categories": ["Review"],
        "tags": ["Review","Large Reasoning Models (LRMs)","Information Seeking","Incomplete Problems","Mathematical Reasoning","Supervised Fine-tuning (SFT)","Overthinking","Hallucination","CRITIC-math"],
        "url": "/ai/review/2025-8-19-Beyond_Solving_Math_Quiz_Evaluating_the_Ability_of_Large_Reasoning_Models_to_Ask_for_Information/",
        "teaser": null
      },{
        "title": "[논문리뷰] ComoRAG: A Cognitive-Inspired Memory-Organized RAG for Stateful Long Narrative Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Juyuan Wang, Rongchen Zhao, Wei Wei, Yufeng Wang, Mo Yu, Jie Zhou, Jin Xu, Liyan Xu 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)의 제한된 컨텍스트 길이와 높은 연산 비용 문제, 그리고 기존 RAG(Retrieval-Augmented Generation) 방식의 상태 비저장(stateless) 및 단일 단계(single-step) 검색 한계를 해결하여...","categories": ["Review"],
        "tags": ["Review","Cognitive-Inspired RAG","Stateful Reasoning","Long Narrative Comprehension","Dynamic Memory","Metacognitive Regulation","Multi-step Retrieval","Hierarchical Knowledge Source"],
        "url": "/ai/review/2025-8-19-ComoRAG_A_Cognitive-Inspired_Memory-Organized_RAG_for_Stateful_Long_Narrative_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] G-CUT3R: Guided 3D Reconstruction with Camera and Depth Prior Integration",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ramil Khafizov, Artem Komarichev, Ruslan Rakhimov, Peter Wonka, Evgeny Burnaev 핵심 연구 목표 본 논문은 기존의 피드포워드(feed-forward) 3D 재구성 모델들이 RGB 이미지에만 의존하여 보조 데이터(깊이 맵, 카메라 내/외부 파라미터)를 활용하지 못하는 한계를 해결하고자 합니다. G-CUT3R는 다양한 사전 정보(prior information)를 효율적으로 통합하여 3D 재구성의 정확도와...","categories": ["Review"],
        "tags": ["Review","3D Reconstruction","Deep Learning","Multi-Modal Fusion","Camera Pose Estimation","Depth Estimation","Transformer Networks","Prior Information"],
        "url": "/ai/review/2025-8-19-G-CUT3R_Guided_3D_Reconstruction_with_Camera_and_Depth_Prior_Integration/",
        "teaser": null
      },{
        "title": "[논문리뷰] Has GPT-5 Achieved Spatial Intelligence? An Empirical Study",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhongang Cai, Yubo Wang, Qingping Sun, Ruisi Wang, et al. 핵심 연구 목표 이 연구는 최신 MLLM(Multi-modal Large Language Model), 특히 GPT-5가 인공 일반 지능(AGI)의 핵심 역량인 공간 이해 및 추론 능력을 얼마나 달성했는지 실증적으로 평가하는 것을 목표로 합니다. 이를 위해 기존 벤치마크를 통합하는...","categories": ["Review"],
        "tags": ["Review","Spatial Intelligence","Multimodal LLMs","Benchmark Evaluation","GPT-5","Cognitive AI","AGI"],
        "url": "/ai/review/2025-8-19-Has_GPT-5_Achieved_Spatial_Intelligence_An_Empirical_Study/",
        "teaser": null
      },{
        "title": "[논문리뷰] HeroBench: A Benchmark for Long-Horizon Planning and Structured Reasoning in Virtual Worlds",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Petr Anokhin, Roman Khalikov, Stefan Rebrikov, Viktor Volkov, Artyom Sorokin, Vincent Bissonnette 핵심 연구 목표 본 논문의 핵심 연구 목표는 복잡한 가상 세계 내에서 대규모 언어 모델(LLM)의 장기 계획 및 구조화된 추론 능력을 평가하는 것입니다. 기존 벤치마크가 추상적이거나 저차원적인 알고리즘 태스크에 집중하여 실제 환경의...","categories": ["Review"],
        "tags": ["Review","Long-Horizon Planning","Structured Reasoning","LLM Evaluation","Virtual Worlds","RPG","Benchmark","Agent Systems","Combat Simulation"],
        "url": "/ai/review/2025-8-19-HeroBench_A_Benchmark_for_Long-Horizon_Planning_and_Structured_Reasoning_in_Virtual_Worlds/",
        "teaser": null
      },{
        "title": "[논문리뷰] Inverse-LLaVA: Eliminating Alignment Pre-training Through Text-to-Vision Mapping",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xuhui Zhan, Tyler Derr 핵심 연구 목표 기존 대규모 시각-언어 모델(LVLM)의 핵심 병목인 고비용의 정렬 사전 훈련(alignment pre-training) 단계를 제거하고, 시각 정보를 이산적인 텍스트 토큰 공간에 강제로 매핑함으로써 발생하는 정보 손실 문제를 해결하는 것을 목표로 합니다. 대신 텍스트 임베딩을 연속적인 시각 표현 공간으로 매핑하는...","categories": ["Review"],
        "tags": ["Review","Multimodal Learning","Vision-Language Models","Alignment Pre-training","Text-to-Vision Mapping","Continuous Representations","Computational Efficiency","LLM"],
        "url": "/ai/review/2025-8-19-Inverse-LLaVA_Eliminating_Alignment_Pre-training_Through_Text-to-Vision_Mapping/",
        "teaser": null
      },{
        "title": "[논문리뷰] Lumen: Consistent Video Relighting and Harmonious Background Replacement with Video Generative Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jianshu Zeng, Yuxuan Liu, Yutong Feng, Chenxuan Miao, Zixiang Gao, Jiwang Qu, Jianzhang Zhang, Bin Wang, Kun Yuan 핵심 연구 목표 본 연구는 비디오에서 배경을 교체하고 동시에 포그라운드의 조명을 조화롭게 조정하는 비디오 리라이팅 태스크를 해결하는 것을 목표로 합니다. 특히, 포그라운드의 본래 속성(예: 알베도, 텍스처)을...","categories": ["Review"],
        "tags": ["Review","Video Relighting","Background Replacement","Generative Models","Diffusion Models","Temporal Consistency","Dataset Generation","Video Editing"],
        "url": "/ai/review/2025-8-19-Lumen_Consistent_Video_Relighting_and_Harmonious_Background_Replacement_with_Video_Generative_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Matrix-Game 2.0: An Open-Source, Real-Time, and Streaming Interactive World Model",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xianglong He, Chunli Peng, Zexiang Liu, Boyang Wang, Yifan Zhang, Qi Cui, Fei Kang, Biao Jiang, Mengyin An, Yangyang Ren, Baixin Xu, Hao-Xiang Guo, Kaixiong Gong, Cyrus Wu, Wei Li, Xuchen Song, Yang Liu, Eric Li, Yahui Zhou 핵심 연구 목표 본 논문은 기존...","categories": ["Review"],
        "tags": ["Review","World Model","Interactive Video Generation","Real-Time AI","Diffusion Models","Auto-Regressive Generation","Data Pipeline","Self-Forcing","KV Caching"],
        "url": "/ai/review/2025-8-19-Matrix-Game_2.0_An_Open-Source_Real-Time_and_Streaming_Interactive_World_Model/",
        "teaser": null
      },{
        "title": "[논문리뷰] Next Visual Granularity Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yikai Wang, Zhouxia Wang, Zhonghua Wu, Qingyi Tao, Kang Liao, Chen Change Loy 핵심 연구 목표 본 논문은 기존 이미지 생성 모델들이 이미지를 평면적이거나 비구조적인 데이터로 취급하여 미세한 제어 및 오류 누적에 한계가 있다는 문제점을 해결하고자 합니다. 이를 위해 이미지를 다양한 시각적 세분성(granularity) 레벨로...","categories": ["Review"],
        "tags": ["Review","Image Generation","Granularity Control","Structured Representation","Hierarchical Generation","Coarse-to-fine","Visual Tokenization","Latent Space"],
        "url": "/ai/review/2025-8-19-Next_Visual_Granularity_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Ovis2.5 Technical Report",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yang Li, cqgwin, Suikong, xxyyy123, runninglsy 핵심 연구 목표 Ovis2.5는 이전 Ovis 버전의 한계, 특히 고정 해상도 이미지 처리와 선형 사고 체인(CoT) 기반 추론의 문제를 해결하고자 합니다. 이를 위해 네이티브 해상도 시각 인코더를 통합하여 세부 정보 및 전역 레이아웃 보존 능력을 강화하고, 반성적(reflective) 추론...","categories": ["Review"],
        "tags": ["Review","Multimodal LLMs","Native Resolution Vision","Deep Reasoning","Chart Analysis","OCR","Visual Grounding","Training Efficiency","Preference Optimization"],
        "url": "/ai/review/2025-8-19-Ovis2.5_Technical_Report/",
        "teaser": null
      },{
        "title": "[논문리뷰] Precise Action-to-Video Generation Through Visual Action Prompts",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuang Wang, Chao Wen, Haoyu Guo, Sida Peng, Minghan Qin, Hujun Bao, Xiaowei Zhou, Ruizhen Hu 핵심 연구 목표 본 논문은 복잡하고 고자유도(high-DoF)의 상호작용(예: 인간의 손 또는 로봇 그리퍼 동작)을 위한 비디오 생성에서 정밀성과 범용성 간의 트레이드오프 문제를 해결하고자 합니다. 기존 텍스트나 원시 행동,...","categories": ["Review"],
        "tags": ["Review","Action-to-Video Generation","Visual Action Prompts","Skeleton Representation","Human-Object Interaction","Robotic Manipulation","Cross-Domain Transfer","Diffusion Models"],
        "url": "/ai/review/2025-8-19-Precise_Action-to-Video_Generation_Through_Visual_Action_Prompts/",
        "teaser": null
      },{
        "title": "[논문리뷰] Reinforcement Learning with Rubric Anchors",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zenan Huang, Yihong Zhuang, Guoshan Lu, Zeyu Qin, Haokai Xu, et al. 핵심 연구 목표 이 논문은 확인 가능한 보상(RLVR)을 사용하는 기존 강화 학습 패러다임이 자동 검증이 가능한 특정 도메인(예: 수학, 코딩)에 국한되는 한계를 해결하고자 합니다. 본 연구는 본질적으로 주관적이거나 다차원적인 출력을 가지는 개방형...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Large Language Models","Rubric-based Reward","RLVR Extension","Human-centric AI","Controllable Generation","Reward Hacking Mitigation"],
        "url": "/ai/review/2025-8-19-Reinforcement_Learning_with_Rubric_Anchors/",
        "teaser": null
      },{
        "title": "[논문리뷰] Representing Speech Through Autoregressive Prediction of Cochlear Tokens",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Greta Tuckute, Klemen Kotar, Evelina Fedorenko, Daniel L. K. Yamins 핵심 연구 목표 본 논문은 인간의 청각 처리 계층에서 영감을 받아, 유연하고 효율적으로 음성 정보를 이해하고 상호작용하는 인공 신경망 모델을 개발하는 것을 목표로 합니다. 특히, 인간의 달팽이관에서 영감을 받은 시간-주파수 표현인 코클리어 토큰(cochlear tokens)에...","categories": ["Review"],
        "tags": ["Review","Speech Representation Learning","Autoregressive Models","Cochlear Tokens","Biologically Inspired AI","Self-Supervised Learning","Audio Processing","Transformer Networks"],
        "url": "/ai/review/2025-8-19-Representing_Speech_Through_Autoregressive_Prediction_of_Cochlear_Tokens/",
        "teaser": null
      },{
        "title": "[논문리뷰] S^2-Guidance: Stochastic Self Guidance for Training-Free Enhancement of Diffusion Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chubin Chen, Jiashu Zhu, Xiaokun Feng, Nisha Huang, Meiqi Wu, Fangyuan Mao, Jiahong Wu, Xiangxiang Chu, Xiu Li 핵심 연구 목표 본 논문은 확산 모델에서 널리 사용되는 Classifier-free Guidance (CFG)가 종종 의미론적 불일치와 낮은 품질의 결과물을 초래하는 문제를 해결하고자 합니다. 외부 훈련된 약한 모델이나...","categories": ["Review"],
        "tags": ["Review","Diffusion Models","Classifier-free Guidance","Self-Guidance","Training-Free","Stochastic Block-Dropping","Generative Models","Text-to-Image"],
        "url": "/ai/review/2025-8-19-S2-Guidance_Stochastic_Self_Guidance_for_Training-Free_Enhancement_of_Diffusion_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Speed Always Wins: A Survey on Efficient Architectures for Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Weigao Sun, Jiaxi Hu, Yucheng Zhou, Jusen Du, Disen Lan, Kexin Wang, Tong Zhu, Xiaoye Qu, Yu Zhang, Xiaoyu Mo, Daizong Liu, Yuxuan Liang, Wenliang Chen, Guoqi Li, Yu Cheng 핵심 연구 목표 본 설문조사 논문은 기존 Transformer 기반 대규모 언어 모델(LLMs)의 Quadratic 복잡성과...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Efficient Architectures","Transformer Optimization","Linear Attention","State Space Models","Mixture-of-Experts","Sparse Attention","Diffusion LLMs"],
        "url": "/ai/review/2025-8-19-Speed_Always_Wins_A_Survey_on_Efficient_Architectures_for_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] When Punctuation Matters: A Large-Scale Comparison of Prompt Robustness Methods for LLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Mikhail Seleznyov, Mikhail Chaichuk, Gleb Ershov, Alexander Panchenko, Elena Tutubalina, Oleg Somov 핵심 연구 목표 본 연구는 LLM이 프롬프트 구문 및 형식의 미묘한 비의미적 변화에 매우 민감하게 반응하는 문제를 해결하고자 합니다. 기존의 프롬프트 강건성(robustness) 향상 방법론들이 개별적으로 평가되어 실무자가 비교하고 선택하기 어려웠던 공백을 채우기...","categories": ["Review"],
        "tags": ["Review","LLM Robustness","Prompt Sensitivity","In-Context Learning","Fine-Tuning","Batch Calibration","Template Ensembles","Distribution Shift"],
        "url": "/ai/review/2025-8-19-When_Punctuation_Matters_A_Large-Scale_Comparison_of_Prompt_Robustness_Methods_for_LLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] A Stitch in Time Saves Nine: Proactive Self-Refinement for Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zishang Jiang, Tingyun li, Haiquan Zhao, Xinyi Wang, Jinyi Han 핵심 연구 목표 대규모 언어 모델(LLM)이 고정된 반복 횟수와 사후(post-hoc) 방식에 의존하는 기존 자기 개선(self-refinement) 방법의 한계를 극복하고자 합니다. 본 연구는 LLM이 내부 상태와 진화하는 생성 컨텍스트를 기반으로 언제, 어떻게, 그리고 무엇을 개선할지 사전(proactive)...","categories": ["Review"],
        "tags": ["Review","Self-Refinement","Language Models","Reinforcement Learning","Proactive AI","Generation Process","Markov Decision Process","Adaptive Learning","LLM Efficiency"],
        "url": "/ai/review/2025-8-20-A_Stitch_in_Time_Saves_Nine_Proactive_Self-Refinement_for_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Advances in Speech Separation: Techniques, Challenges, and Future Trends",
        "excerpt":"링크: 논문 PDF로 바로 열기 Advances in Speech Separation: Techniques, Challenges, and Future Trends Kai Li, Guo Chen, Wendi Sang, Yi Luo, Zhuo Chen, Shuai Wang, Shulin He, Zhong-Qiu Wang, Andong Li, Zhiyong Wu, and Xiaolin Hu 핵심 연구 목표 본 논문은 “칵테일 파티 문제” 해결을 목표로 하는 DNN 기반...","categories": ["Review"],
        "tags": ["Review","Speech Separation","Deep Neural Networks","Cocktail Party Problem","Transformer Architecture","Unsupervised Learning","Supervised Learning","Evaluation Metrics","Datasets"],
        "url": "/ai/review/2025-8-20-Advances_in_Speech_Separation_Techniques_Challenges_and_Future_Trends/",
        "teaser": null
      },{
        "title": "[논문리뷰] Beyond Human Judgment: A Bayesian Evaluation of LLMs' Moral Values Understanding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Maciej Skorski, Alina Landowska 핵심 연구 목표 본 연구는 대규모 언어 모델(LLMs)이 인간과 비교하여 도덕적 차원을 어떻게 이해하는지 평가하는 것을 목표로 합니다. 특히, 기존의 확정론적 정답(ground-truth) 가정에서 벗어나 어노테이터 불일치를 베이지안 방식으로 모델링하여 인간의 내재된 불확실성과 모델의 도메인 민감도를 포착하고자 합니다. 핵심 방법론 연구팀은...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Moral Reasoning","Bayesian Evaluation","Uncertainty Quantification","Natural Language Processing","Soft Labels"],
        "url": "/ai/review/2025-8-20-Beyond_Human_Judgment_A_Bayesian_Evaluation_of_LLMs_Moral_Values_Understanding/",
        "teaser": null
      },{
        "title": "[논문리뷰] CAMAR: Continuous Actions Multi-Agent Routing",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Artem Pshenitsyn, Aleksandr Panov, Alexey Skrynnik 핵심 연구 목표 이 논문은 기존 다중 에이전트 강화 학습(MARL) 벤치마크가 연속적인 상태 및 행동 공간, 복잡한 조정 및 계획 작업을 충분히 지원하지 못하는 한계를 해결하고자 합니다. 로봇 공학의 실제 응용 프로그램에 더 적합한, 고속의 사실적인 다중 에이전트...","categories": ["Review"],
        "tags": ["Review","Multi-Agent Reinforcement Learning","Continuous Control","Pathfinding","MARL Benchmark","GPU Acceleration","Robotics Simulation","Scalability","Heterogeneous Agents"],
        "url": "/ai/review/2025-8-20-CAMAR_Continuous_Actions_Multi-Agent_Routing/",
        "teaser": null
      },{
        "title": "[논문리뷰] Chain-of-Agents: End-to-End Agent Foundation Models via Multi-Agent Distillation and Agentic RL",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Liam-Liu, hugteste, kangz, wanwan1212, tianyue818 핵심 연구 목표 본 논문은 기존의 다중 에이전트 시스템(MAS)과 도구 통합 추론(TIR) 패러다임이 가진 한계를 극복하고, 단일 LLM(Large Language Model) 내에서 다중 에이전트 협업 능력을 내재화하여 복잡한 문제 해결을 위한 종단 간(End-to-End) 에이전트 파운데이션 모델(AFM)을 구축하는 것을 목표로 합니다....","categories": ["Review"],
        "tags": ["Review","Chain-of-Agents","Agent Foundation Models","Multi-Agent Systems","Tool-Integrated Reasoning","Multi-agent Distillation","Agentic Reinforcement Learning","LLMs","End-to-End Learning"],
        "url": "/ai/review/2025-8-20-Chain-of-Agents_End-to-End_Agent_Foundation_Models_via_Multi-Agent_Distillation_and_Agentic_RL/",
        "teaser": null
      },{
        "title": "[논문리뷰] Copyright Protection for Large Language Models: A Survey of Methods, Challenges, and Trends",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhenhua Xu, Xubin Yue, Zhebo Wang, Qichen Liu, Xixiang Zhao, Jingxuan Zhang, Wenjun Zeng, Wenpeng Xing, Dezhang Kong, Changting Lin, Meng Han 핵심 연구 목표 이 논문은 대규모 언어 모델(LLM)의 높은 개발 비용, 독점적 가치 및 오용 가능성을 고려할 때 필수적인 저작권 보호에 대한...","categories": ["Review"],
        "tags": ["Review","LLM Copyright Protection","Model Fingerprinting","Text Watermarking","Invasive Fingerprinting","Intrinsic Fingerprinting","Intellectual Property","Digital Rights Management","Backdoor Watermarking"],
        "url": "/ai/review/2025-8-20-Copyright_Protection_for_Large_Language_Models_A_Survey_of_Methods_Challenges_and_Trends/",
        "teaser": null
      },{
        "title": "[논문리뷰] CorrSteer: Steering Improves Task Performance and Safety in LLMs through Correlation-based Sparse Autoencoder Feature Selection",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Seonglae Cho, Zekun Wu, Adriano Koshiyama 핵심 연구 목표 본 논문은 기존의 Sparse Autoencoder (SAE) 기반 LLM 조향 방식이 요구하는 대규모 대조 데이터셋 또는 방대한 활성화 저장 공간의 한계를 해결하고자 합니다. 생성된 토큰의 SAE 활성화와 태스크 결과 간의 상관관계를 활용하여 관련 특징을 선택하고, 이를...","categories": ["Review"],
        "tags": ["Review","Sparse Autoencoders","LLM Steering","Feature Selection","Correlation Analysis","AI Safety","Bias Mitigation","Mechanistic Interpretability"],
        "url": "/ai/review/2025-8-20-CorrSteer_Steering_Improves_Task_Performance_and_Safety_in_LLMs_through_Correlation-based_Sparse_Autoencoder_Feature_Selection/",
        "teaser": null
      },{
        "title": "[논문리뷰] Describe What You See with Multimodal Large Language Models to Enhance Video Recommendations",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Marco De Nadai, Andreas Damianou, Mounia Lalmas 핵심 연구 목표 기존 비디오 추천 시스템의 한계인 저수준 시각/음성 특징 및 메타데이터의 의미론적 깊이 부족 문제를 해결하는 것이 목표입니다. 사용자의 의도, 유머, 세계 지식과 같은 고수준의 의미를 포착하여 비디오 클립이 시청자에게 공감을 얻는 이유를 파악하고, 이를...","categories": ["Review"],
        "tags": ["Review","Multimodal Large Language Models","Video Recommendation","Zero-Shot Learning","Content-Based Filtering","Natural Language Processing","Foundation Models"],
        "url": "/ai/review/2025-8-20-Describe_What_You_See_with_Multimodal_Large_Language_Models_to_Enhance_Video_Recommendations/",
        "teaser": null
      },{
        "title": "[논문리뷰] Embodied-R1: Reinforced Embodied Reasoning for General Robotic Manipulation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yifu Yuan, Haiqin Cui, Yaoting Huang, Yibin Chen, Fei Ni, Pengyi Li, Yan Zheng, Jianye Hao, Zibin Dong 핵심 연구 목표 본 논문은 로봇 조작에서 “seeing-to-doing gap”을 해소하고 일반화 능력을 향상시키는 것을 목표로 합니다. 데이터 부족과 다양한 로봇 형태에 따른 지식 전달의 어려움을 극복하기...","categories": ["Review"],
        "tags": ["Review","Embodied AI","Robotic Manipulation","Reinforcement Learning","Vision-Language Model","Pointing","Zero-shot Generalization"],
        "url": "/ai/review/2025-8-20-Embodied-R1_Reinforced_Embodied_Reasoning_for_General_Robotic_Manipulation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Evaluating Podcast Recommendations with Profile-Aware LLM-as-a-Judge",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Francesco Fabbri, Gustavo Penha, Edoardo D’Amico, Alice Wang, Marco De Nadai, Jackie Doremus, Paul Gigioli, Andreas Damianou, Oskar Stål, Mounia Lalmas 핵심 연구 목표 본 논문은 팟캐스트와 같은 롱폼 오디오 도메인에서 개인화된 추천 시스템 평가의 어려움(노출 편향, A/B 테스트의 높은 비용 및 제약)을 해결하고자...","categories": ["Review"],
        "tags": ["Review","Podcast Recommendation","LLM-as-a-Judge","Offline Evaluation","User Profiling","Recommender Systems","Natural Language Processing"],
        "url": "/ai/review/2025-8-20-Evaluating_Podcast_Recommendations_with_Profile-Aware_LLM-as-a-Judge/",
        "teaser": null
      },{
        "title": "[논문리뷰] Leveraging Large Language Models for Predictive Analysis of Human Misery",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Bishanka Seal, Rahul Seetharaman, Aman Bansal, Abhilash Nandy 핵심 연구 목표 본 연구는 자연어 시나리오 설명으로부터 인간이 인지하는 불행 점수를 예측하는 것을 목표로 합니다. 이는 0에서 100까지의 척도를 사용하는 회귀 문제로, 대규모 언어 모델(LLM)의 주관적인 감정 추론 능력과 피드백 기반 적응성을 평가하고자 합니다. 핵심...","categories": ["Review"],
        "tags": ["Review","Large Language Models (LLMs)","Affective Computing","Misery Score Prediction","Prompt Engineering","Few-shot Learning","Gamified Evaluation","Feedback-driven Adaptation"],
        "url": "/ai/review/2025-8-20-Leveraging_Large_Language_Models_for_Predictive_Analysis_of_Human_Misery/",
        "teaser": null
      },{
        "title": "[논문리뷰] LongSplat: Robust Unposed 3D Gaussian Splatting for Casual Long Videos",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chin-Yang Lin, Cheng Sun, Min-Hung Chen, Yen-Yu Lin, Fu-En Yang, Yu-Lun Liu 핵심 연구 목표 본 논문은 불규칙한 카메라 움직임, 알 수 없는 카메라 자세, 방대한 장면 크기 등 일반적인 긴 비디오에서 발생하는 Novel View Synthesis (NVS)의 핵심 문제를 해결하고자 합니다. 특히 자세 표류(pose...","categories": ["Review"],
        "tags": ["Review","Novel View Synthesis","3D Gaussian Splatting","Unposed Reconstruction","Camera Pose Estimation","Incremental Optimization","Octree","Long Videos"],
        "url": "/ai/review/2025-8-20-LongSplat_Robust_Unposed_3D_Gaussian_Splatting_for_Casual_Long_Videos/",
        "teaser": null
      },{
        "title": "[논문리뷰] MM-BrowseComp: A Comprehensive Benchmark for Multimodal Browsing Agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jun Dong, Jiaheng Liu, Wenjie Wang, Xingyuan Bu, Shilong Li 핵심 연구 목표 기존 웹 브라우징 벤치마크가 주로 텍스트 정보에만 초점을 맞춰 멀티모달 콘텐츠의 중요성을 간과하는 문제를 해결하고자 합니다. 이 연구는 AI 에이전트의 멀티모달 검색 및 추론 능력을 평가하기 위한 새로운 벤치마크인 MM-BrowseComp를 제안하여,...","categories": ["Review"],
        "tags": ["Review","Multimodal Browsing","AI Agents","Benchmark","Vision-Language Models","Reasoning","Tool Use","Deep Search"],
        "url": "/ai/review/2025-8-20-MM-BrowseComp_A_Comprehensive_Benchmark_for_Multimodal_Browsing_Agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] MMAU-Pro: A Challenging and Comprehensive Benchmark for Holistic Evaluation of Audio General Intelligence",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Sonal Kumar, Šimon Sedláček, Vaibhavi Lokegaonkar, Fernando López, Wenyi Yu, Nishit Anand, Hyeonggon Ryu, Lichang Chen, Maxim Plička, Miroslav Hlaváček, William Fineas Ellingwood, Sathvik Udupa, Siyuan Hou, Allison Ferner, Sara Barahona, Cecilia Bolaños, Satish Rahi, Laura Herrera-Alarcón, Satvik Dixit, Siddhi Patil, Soham Deshmukh, Lasha...","categories": ["Review"],
        "tags": ["Review","Audio Intelligence","Multimodal AI","Benchmark","Audio-Language Models","Holistic Evaluation","Reasoning","Long-Form Audio","Multicultural Music"],
        "url": "/ai/review/2025-8-20-MMAU-Pro_A_Challenging_and_Comprehensive_Benchmark_for_Holistic_Evaluation_of_Audio_General_Intelligence/",
        "teaser": null
      },{
        "title": "[논문리뷰] MedSAMix: A Training-Free Model Merging Approach for Medical Image Segmentation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yanwu Yang, Guinan Su, Jiesi Hu, Francesco Sammarco, Jonas Geiping, Thomas Wolfers 핵심 연구 목표 의료 영상 분할 분야에서 SAM(Segment Anything Model) 기반의 미세 조정된 모델들이 특정 작업에서 불균형한 성능과 제한된 일반화 능력을 보이는 문제를 해결하고자 합니다. 훈련 없이도 일반화 능력과 도메인 특화된 전문성을...","categories": ["Review"],
        "tags": ["Review","Medical Image Segmentation","Model Merging","Training-Free","SAM","Generalization","Zero-Order Optimization","Bayesian Optimization"],
        "url": "/ai/review/2025-8-20-MedSAMix_A_Training-Free_Model_Merging_Approach_for_Medical_Image_Segmentation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Mind the Generation Process: Fine-Grained Confidence Estimation During LLM Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jinyi Han, Tingyun li, Shisong Chen, Jie shi, Xinyi Wang, Guanglei Yue, Jiaqing Liang, Xin Lin, Liqian Wen, Zulong Chen, Yanghua Xiao 핵심 연구 목표 대규모 언어 모델(LLM)이 답변 생성 과정에서 겪는 과신(overconfidence) 문제를 해결하고, 기존의 거친(coarse-grained) 신뢰도 추정 방식의 한계를 극복하는 것을 목표로...","categories": ["Review"],
        "tags": ["Review","LLMs","Confidence Estimation","Fine-Grained","Generation Process","Calibration","Monte Carlo Sampling","Backward Confidence Integration"],
        "url": "/ai/review/2025-8-20-Mind_the_Generation_Process_Fine-Grained_Confidence_Estimation_During_LLM_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Motion2Motion: Cross-topology Motion Transfer with Sparse Correspondence",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: LING-HAO CHEN, YUHONG ZHANG, ZIXIN YIN, ZHIYANG DOU, XIN CHEN, JINGBO WANG, TAKU KOMURA, LEI ZHANG 핵심 연구 목표 이 논문은 골격 토폴로지가 크게 다른 캐릭터 간의 애니메이션 전이 문제를 해결하는 것을 목표로 합니다. 기존 방법론들이 내재된 토폴로지 불일치와 대규모 짝지어진 모션 데이터셋의 부족으로...","categories": ["Review"],
        "tags": ["Review","Motion Transfer","Cross-topology","Sparse Correspondence","Motion Matching","Animation","Training-free","Few-shot Learning"],
        "url": "/ai/review/2025-8-20-Motion2Motion_Cross-topology_Motion_Transfer_with_Sparse_Correspondence/",
        "teaser": null
      },{
        "title": "[논문리뷰] MultiRef: Controllable Image Generation with Multiple Visual References",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ruoxi Chen, Dongping Chen, Siyuan Wu, Sinan Wang, Shiyun Lang, Peter Sushko, Gaoyang Jiang, Yao Wan, Ranjay Krishna* 핵심 연구 목표 이 연구는 텍스트 프롬프트나 단일 이미지 참조에 의존하는 기존 이미지 생성 모델의 한계를 극복하고, 다중 시각 참조(multiple visual references)를 활용한 제어 가능한 이미지...","categories": ["Review"],
        "tags": ["Review","Controllable Image Generation","Multi-modal Generation","Visual References","Image-to-Image","Benchmark","Dataset","MLLM-as-a-Judge"],
        "url": "/ai/review/2025-8-20-MultiRef_Controllable_Image_Generation_with_Multiple_Visual_References/",
        "teaser": null
      },{
        "title": "[논문리뷰] OmniTry: Virtual Try-On Anything without Masks",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiaoduan Feng, Linlin Zhang, Hengyuan Cao, Yiming Chen, Jian Cao, Yuxiong Wu, Bin Wang 핵심 연구 목표 이 논문은 기존 가상 착용(VTON) 기술이 의류에 국한되고 입력 마스크를 필요로 하는 한계를 극복하고자 합니다. 마스크 없이도 주얼리, 액세서리 등 다양한 종류의 착용 가능한 객체를 가상으로 착용시켜볼...","categories": ["Review"],
        "tags": ["Review","Virtual Try-On","Diffusion Model","Mask-Free","Image Inpainting","ID Consistency","Wearable Objects","Generative AI"],
        "url": "/ai/review/2025-8-20-OmniTry_Virtual_Try-On_Anything_without_Masks/",
        "teaser": null
      },{
        "title": "[논문리뷰] Prompt Orchestration Markup Language",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuge Zhang, Nan Chen, Jiahang Xu, Yuqing Yang 핵심 연구 목표 이 논문은 대규모 언어 모델(LLM) 프롬프트의 구조화, 데이터 통합, 형식 민감성 및 개발 도구의 부족이라는 현재의 과제를 해결하고자 합니다. 이를 위해 POML(Prompt Orchestration Markup Language)을 도입하여 고급 프롬프트 엔지니어링에 구조, 유지보수성, 다용성을 제공하는...","categories": ["Review"],
        "tags": ["Review","Prompt Engineering","Large Language Models","Markup Language","Structured Prompting","IDE Support","Multimodal Data","Styling System","Development Toolkit"],
        "url": "/ai/review/2025-8-20-Prompt_Orchestration_Markup_Language/",
        "teaser": null
      },{
        "title": "[논문리뷰] Radiance Fields in XR: A Survey on How Radiance Fields are Envisioned and Addressed for XR Research",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ke Li, Mana Masuda, Susanne Schmidt, Shohei Mori 핵심 연구 목표 이 논문은 NeRF 및 3DGS와 같은 Radiance Field (RF) 기술이 확장 현실(XR) 분야에서 어떻게 구상되고(envisioned) 실제로 구현되었는지(addressed) 사이의 연구 격차를 체계적으로 분석하는 것을 목표로 합니다. RF 기술의 급격한 발전에도 불구하고 XR 커뮤니티 내에서의...","categories": ["Review"],
        "tags": ["Review","Radiance Fields","XR","NeRF","3D Gaussian Splatting","View Synthesis","Systematic Review","Immersive Technology"],
        "url": "/ai/review/2025-8-20-Radiance_Fields_in_XR_A_Survey_on_How_Radiance_Fields_are_Envisioned_and_Addressed_for_XR_Research/",
        "teaser": null
      },{
        "title": "[논문리뷰] Semantic IDs for Joint Generative Search and Recommendation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Enrico Palumbo, Edoardo D’Amico, Gustavo Penha, Francesco Fabbri, Marco De Nadai, Timothy Heath, Alex Tamborrino, Ali Vardasbi, Max LeFarov, Shawn Lin, Hugues Bouchard 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)을 활용한 통합 검색 및 추천 시스템 구축을 위해, 항목을 LLM 친화적인 이산 토큰(Semantic...","categories": ["Review"],
        "tags": ["Review","Generative Models","Search and Recommendation","Semantic IDs","Bi-Encoder","Quantization","Multi-Task Learning","Retrieval Augmented Generation"],
        "url": "/ai/review/2025-8-20-Semantic_IDs_for_Joint_Generative_Search_and_Recommendation/",
        "teaser": null
      },{
        "title": "[논문리뷰] TempFlow-GRPO: When Timing Matters for GRPO in Flow Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiaoxuan He, Siming Fu, Yuke Zhao, Wanli Li, Jian Yang, Dacheng Yin, Fengyun Rao, Bo Zhang 핵심 연구 목표 텍스트-투-이미지 플로우 매칭 모델의 GRPO(Generalized Policy Rejection Optimization) 훈련이 시간적 균일성 가정과 중간 피드백 신호 부족으로 인해 인간 선호도 정렬에 비효율적인 문제를 해결하는 것이 목표입니다....","categories": ["Review"],
        "tags": ["Review","Flow Matching","Reinforcement Learning","Human Preference Alignment","GRPO","Temporal Credit Assignment","Generative AI","Text-to-Image"],
        "url": "/ai/review/2025-8-20-TempFlow-GRPO_When_Timing_Matters_for_GRPO_in_Flow_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Training-Free Text-Guided Color Editing with Multi-Modal Diffusion Transformer",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: ZIXIN YIN, XILI DAI, LING-HAO CHEN, DEYU ZHOU, JIANAN WANG, DUOMIN WANG, GANG YU, LIONEL M. NI, LEI ZHANG, HEUNG-YEUNG SHUM 핵심 연구 목표 본 논문은 텍스트 지시 기반의 이미지 및 비디오 색상 편집에서 물리적 일관성을 유지하며 정교한 제어를 가능하게 하는 미해결 문제를 다룹니다....","categories": ["Review"],
        "tags": ["Review","Text-Guided Editing","Color Editing","Diffusion Transformers","Training-Free","Multi-Modal AI","Attention Control","Image Manipulation"],
        "url": "/ai/review/2025-8-20-Training-Free_Text-Guided_Color_Editing_with_Multi-Modal_Diffusion_Transformer/",
        "teaser": null
      },{
        "title": "[논문리뷰] ZARA: Zero-shot Motion Time-Series Analysis via Knowledge and Retrieval Driven LLM Agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zechen Li, Baiyu Chen, Hao Xue, Flora D. Salim 핵심 연구 목표 본 논문은 기존 HAR(Human Activity Recognition) 시스템의 낮은 일반화 능력, 제한적인 제로샷 기능, 해석 불가능성이라는 세 가지 주요 한계를 해결하고자 합니다. 특히, 원시 모션 시계열 데이터로부터 직접 제로샷, 설명 가능한 HAR을 달성하기...","categories": ["Review"],
        "tags": ["Review","Zero-shot HAR","LLM Agents","Time-Series Analysis","Knowledge Base","Retrieval-Augmented Generation","Multi-sensor Fusion","Interpretability"],
        "url": "/ai/review/2025-8-20-ZARA_Zero-shot_Motion_Time-Series_Analysis_via_Knowledge_and_Retrieval_Driven_LLM_Agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] DuPO: Enabling Reliable LLM Self-Verification via Dual Preference Optimization",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shuaijie She♠, Yu Bao♠, Yu Lu, Lu Xu♠, Tao Li, Wenhao Zhu, Shujian Huang(✉), Shanbo Cheng♠(✉), Lu Lu♠, Yuxuan Wang 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)의 자기 검증 신뢰성을 높여 비용이 많이 드는 사람의 주석이나 검증 가능한 답변에 대한 외부 의존성 없이...","categories": ["Review"],
        "tags": ["Review","LLM Optimization","Self-Verification","Dual Learning","Preference Optimization","Self-Supervised Learning","Mathematical Reasoning","Multilingual Translation","RLHF"],
        "url": "/ai/review/2025-8-21-DuPO_Enabling_Reliable_LLM_Self-Verification_via_Dual_Preference_Optimization/",
        "teaser": null
      },{
        "title": "[논문리뷰] From AI for Science to Agentic Science: A Survey on Autonomous Scientific Discovery",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiaqi Wei, Yuejin Yang, Xiang Zhang, Yuhan Chen, Xiang Zhuang, Zhangyang Gao, Dongzhan Zhou, Guangshuai Wang, Zhiqiang Gao, Juntai Cao, Zijie Qiu, Xuming He, Qiang Zhang, Chenyu You, Shuangjia Zheng, Ning Ding, Wanli Ouyang, Nanqing Dong, Yu Cheng, Siqi Sun, Lei Bai, Bowen Zhou...","categories": ["Review"],
        "tags": ["Review","Agentic AI","Autonomous Scientific Discovery","AI for Science","Large Language Models","Multi-agent Systems","Scientific Workflow Automation","Natural Sciences"],
        "url": "/ai/review/2025-8-21-From_AI_for_Science_to_Agentic_Science_A_Survey_on_Autonomous_Scientific_Discovery/",
        "teaser": null
      },{
        "title": "[논문리뷰] From Scores to Skills: A Cognitive Diagnosis Framework for Evaluating Financial Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ziyan Kuang, Feiyu Zhu, Maowei Jiang, Qianqian Xie, et al. 핵심 연구 목표 기존 금융 LLM 벤치마크의 단일 점수 평가 방식(score flattening)과 불균형한 개념 커버리지(coverage imbalance)로 인해 모델의 실제 지식 수준과 한계를 파악하기 어렵다는 문제를 해결하고자 합니다. 본 연구는 금융 LLM의 지식-스킬 수준 평가를...","categories": ["Review"],
        "tags": ["Review","Financial LLMs","Cognitive Diagnosis Model","LLM Evaluation","Knowledge Assessment","Matrix Factorization","CPA-QKA","Interpretability"],
        "url": "/ai/review/2025-8-21-From_Scores_to_Skills_A_Cognitive_Diagnosis_Framework_for_Evaluating_Financial_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] FutureX: An Advanced Live Benchmark for LLM Agents in Future Prediction",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: tianlecai, Nuori, YinLingyue, Tianci-He, liujiashuo77 핵심 연구 목표 본 논문은 LLM 에이전트의 미래 예측 능력 평가를 위한 대규모 벤치마크 부재 문제를 해결하고자 합니다. 실시간 데이터 업데이트 및 데이터 오염 방지의 어려움 때문에 기존 벤치마크는 한계가 있었으며, FutureX는 이러한 문제를 극복하여 동적이고 실제 환경에 가까운...","categories": ["Review"],
        "tags": ["Review","LLM Agents","Future Prediction","Live Benchmark","Dynamic Evaluation","Data Contamination","Tool Use","Web Search","Financial Forecasting","Misinformation"],
        "url": "/ai/review/2025-8-21-FutureX_An_Advanced_Live_Benchmark_for_LLM_Agents_in_Future_Prediction/",
        "teaser": null
      },{
        "title": "[논문리뷰] Leuvenshtein: Efficient FHE-based Edit Distance Computation with Single Bootstrap per Cell",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wouter Legiest, Jan-Pieter D’Anvers, Bojan Spasic, Nam-Luc Tran, Ingrid Verbauwhede 핵심 연구 목표 본 논문은 완전 동형 암호(FHE) 프레임워크, 특히 TFHE와 같은 3세대 스킴에서 Levenshtein(편집) 거리 계산의 높은 연산 비용을 획기적으로 줄이는 것을 목표로 합니다. 금융 및 유전체학과 같이 민감한 데이터의 프라이버시를 보존하면서 문자열...","categories": ["Review"],
        "tags": ["Review","Fully Homomorphic Encryption (FHE)","TFHE","Levenshtein Distance","Programmable Bootstrapping (PBS)","Privacy-Preserving Computation","String Similarity"],
        "url": "/ai/review/2025-8-21-Leuvenshtein_Efficient_FHE-based_Edit_Distance_Computation_with_Single_Bootstrap_per_Cell/",
        "teaser": null
      },{
        "title": "[논문리뷰] Local Scale Equivariance with Latent Deep Equilibrium Canonicalizer",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Md Ashiqur Rahman, Chiao-An Yang, Michael N. Cheng, Lim Jun Hao, Jeremiah Jiang, Teck-Yian Lim, Raymond A. Yeh 핵심 연구 목표 본 논문은 컴퓨터 비전에서 발생하는 객체의 지역적 스케일 변화 문제를 해결하고, 모델의 지역적 스케일 일관성(local scale consistency)을 향상시키는 것을 목표로 합니다. 특히, 실제...","categories": ["Review"],
        "tags": ["Review","Scale Equivariance","Deep Equilibrium Models","Canonicalization","Computer Vision","Image Classification","Semantic Segmentation","Latent Representation","Monotone Scaling"],
        "url": "/ai/review/2025-8-21-Local_Scale_Equivariance_with_Latent_Deep_Equilibrium_Canonicalizer/",
        "teaser": null
      },{
        "title": "[논문리뷰] MCP-Universe: Benchmarking Large Language Models with Real-World Model Context Protocol Servers",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ziyang Luo, Zhiqi Shen, Wenzhuo Yang, Zirui Zhao, Prathyusha Jwalapuram, Amrita Saha, Doyen Sahoo, Silvio Savarese, Caiming Xiong, Junnan Li 핵심 연구 목표 본 논문은 Model Context Protocol (MCP)을 통해 외부 데이터 소스 및 도구와 상호작용하는 LLM의 평가에 있어 기존 벤치마크의 한계를 해결하고자 합니다....","categories": ["Review"],
        "tags": ["Review","Large Language Models","Benchmarking","Model Context Protocol","Tool Use","Real-World Applications","Agent Evaluation","Long Context","Unknown Tools"],
        "url": "/ai/review/2025-8-21-MCP-Universe_Benchmarking_Large_Language_Models_with_Real-World_Model_Context_Protocol_Servers/",
        "teaser": null
      },{
        "title": "[논문리뷰] MeshCoder: LLM-Powered Structured Mesh Code Generation from Point Clouds",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Bingquan Dai, Li Ray Luo, Qihong Tang, et al. 핵심 연구 목표 본 논문은 3D 포인트 클라우드로부터 편집 가능한 Blender Python 스크립트 형태의 구조화된 메시 코드를 생성하는 새로운 프레임워크인 MeshCoder를 제안합니다. 기존 방법론의 제한적인 DSL(Domain-Specific Languages)과 소규모 데이터셋의 한계를 극복하여 복잡한 3D 형상 재구성을...","categories": ["Review"],
        "tags": ["Review","LLM","Point Clouds","3D Reconstruction","Structured Mesh","Blender Python","Shape Editing","Part-based Representation","Large Language Model"],
        "url": "/ai/review/2025-8-21-MeshCoder_LLM-Powered_Structured_Mesh_Code_Generation_from_Point_Clouds/",
        "teaser": null
      },{
        "title": "[논문리뷰] NVIDIA Nemotron Nano 2: An Accurate and Efficient Hybrid Mamba-Transformer Reasoning Model",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Akhiad Bercovich, Aditya Malte, Adi Renduchintala, Abhijit Paithankar 핵심 연구 목표 논문은 Nemotron Nano 2라는 하이브리드 Mamba-Transformer 언어 모델을 소개하며, 유사 규모 모델 대비 추론 워크로드 처리량을 최대 6배 향상시키면서도 최고 수준의 정확도를 달성하는 것을 목표로 합니다. 특히, 추론에 필요한 긴 ‘사고 과정(thinking traces)’...","categories": ["Review"],
        "tags": ["Review","Hybrid Architecture","Mamba-Transformer","Reasoning LLM","Model Compression","Knowledge Distillation","Long Context","High Throughput","FP8 Training","Instruction Following"],
        "url": "/ai/review/2025-8-21-NVIDIA_Nemotron_Nano_2_An_Accurate_and_Efficient_Hybrid_Mamba-Transformer_Reasoning_Model/",
        "teaser": null
      },{
        "title": "[논문리뷰] On-Policy RL Meets Off-Policy Experts: Harmonizing Supervised Fine-Tuning and Reinforcement Learning via Dynamic Weighting",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wenhao Zhang, Yuexiang Xie, Yuchang Sun, Yanxi Chen, Guoyin Wang, Yaliang Li, Bolin Ding, Jingren Zhou 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)의 사후 튜닝에서 Supervised Fine-Tuning (SFT)과 Reinforcement Learning (RL)을 순차적으로 적용하는 기존 패러다임이 야기하는 문제점, 즉 모델의 기존 패턴 교란 및...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Reinforcement Learning","Supervised Fine-Tuning","On-Policy RL","Off-Policy Experts","Dynamic Weighting","LLM Alignment","Reasoning"],
        "url": "/ai/review/2025-8-21-On-Policy_RL_Meets_Off-Policy_Experts_Harmonizing_Supervised_Fine-Tuning_and_Reinforcement_Learning_via_Dynamic_Weighting/",
        "teaser": null
      },{
        "title": "[논문리뷰] Quantization Meets dLLMs: A Systematic Study of Post-training Quantization for Diffusion LLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Haokun Lin, Haobo Xu, Yichen Wu, Ziyu Guo, Renrui Zhang, Zhichao Lu, Ying Wei, Qingfu Zhang, Zhenan Sun 핵심 연구 목표 본 연구는 확산 기반 대규모 언어 모델(dLLM)의 효율적인 배포를 저해하는 막대한 파라미터 규모 및 높은 자원 요구량을 해결하고자 합니다. 특히, 기존 오토회귀(AR) LLM에서...","categories": ["Review"],
        "tags": ["Review","Diffusion LLMs","Post-training Quantization (PTQ)","Model Compression","Activation Outliers","Quantization Methods","Efficient Deployment","Large Language Models"],
        "url": "/ai/review/2025-8-21-Quantization_Meets_dLLMs_A_Systematic_Study_of_Post-training_Quantization_for_Diffusion_LLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] Refining Contrastive Learning and Homography Relations for Multi-Modal Recommendation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shouxing Ma, Yawen Zeng, Shiqing Wu, Guandong Xu 핵심 연구 목표 본 논문은 멀티모달 추천 시스템의 주요 문제점인 데이터 희소성을 해결하고, 기존 대조 학습(Contrastive Learning) 방법의 두 가지 한계를 극복하는 것을 목표로 합니다. 구체적으로, 노이즈가 많은 모달-공유 특징과 유용한 모달-고유 특징의 손실 문제, 그리고...","categories": ["Review"],
        "tags": ["Review","Multi-modal Recommendation","Contrastive Learning","Graph Neural Network","Homography Relations","Meta-network","Orthogonal Constraint","Data Sparsity"],
        "url": "/ai/review/2025-8-21-Refining_Contrastive_Learning_and_Homography_Relations_for_Multi-Modal_Recommendation/",
        "teaser": null
      },{
        "title": "[논문리뷰] RynnEC: Bringing MLLMs into Embodied World",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiangpin Liu, Zhikai Wang, Lin Xi, Deli Zhao, Dalmo Academy, Alibaba Group, Hupan Lab Zhejiang University. 핵심 연구 목표 본 논문의 핵심 목표는 기존 Multi-modal Large Language Models (MLLM)이 실제 물리적 세계를 이해하는 데 부족했던 기초적인 시각 인지 능력의 한계를 극복하는 것입니다. 특히, 로봇이...","categories": ["Review"],
        "tags": ["Review","Multi-modal Large Language Models","Embodied AI","Embodied Cognition","Video Understanding","Instance Segmentation","Spatial Reasoning","Robotics"],
        "url": "/ai/review/2025-8-21-RynnEC_Bringing_MLLMs_into_Embodied_World/",
        "teaser": null
      },{
        "title": "[논문리뷰] Tinker: Diffusion's Gift to 3D--Multi-View Consistent Editing From Sparse Inputs without Per-Scene Optimization",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Canyu Zhao, Xiaoman Li, Tianjian Feng, Zhiyue Zhao, Hao Chen, Chunhua Shen 핵심 연구 목표 본 논문은 기존 3D 편집 방식의 주요 한계인 방대한 장면별 최적화(per-scene optimization) 필요성을 제거하고, 단일 또는 소수의 입력 이미지로부터 멀티-뷰 일관성(multi-view consistent)을 유지하는 고품질 3D 편집을 목표로 합니다. 사전...","categories": ["Review"],
        "tags": ["Review","3D Editing","Multi-View Consistency","Diffusion Models","Sparse Input","Zero-Shot Learning","Scene Completion","Gaussian Splatting"],
        "url": "/ai/review/2025-8-21-Tinker_Diffusions_Gift_to_3D--Multi-View_Consistent_Editing_From_Sparse_Inputs_without_Per-Scene_Optimization/",
        "teaser": null
      },{
        "title": "[논문리뷰] ViExam: Are Vision Language Models Better than Humans on Vietnamese Multimodal Exam Questions?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Vy Tuong Dang, An Vo, Quang Tau, Duc Dm, Daeyoung Kim 핵심 연구 목표 본 논문은 베트남어 다중 양식 시험 문제에 대한 Vision Language Models (VLMs)의 성능을 평가하는 것을 목표로 합니다. 주로 영어 데이터로 훈련된 VLMs가 저자원 언어인 베트남어 환경에서 실제 교차 언어 복합...","categories": ["Review"],
        "tags": ["Review","Vision Language Models","Multimodal AI","Vietnamese Language","Educational Assessment","Low-Resource Languages","Cross-Lingual Reasoning","ViExam","Human-in-the-Loop"],
        "url": "/ai/review/2025-8-21-ViExam_Are_Vision_Language_Models_Better_than_Humans_on_Vietnamese_Multimodal_Exam_Questions/",
        "teaser": null
      },{
        "title": "[논문리뷰] mSCoRe: a Multilingual and Scalable Benchmark for Skill-based Commonsense Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Nghia Trung Ngo, Franck Dernoncourt, Thien Huu Nguyen 핵심 연구 목표 본 논문은 기존 상식 추론 벤치마크들이 다국어 및 다문화 환경에서 LLM의 인간 추론 능력 활용 방식을 체계적으로 평가하고, 태스크 난이도를 조절하는 데 한계가 있음을 지적합니다. 이를 해결하기 위해 LLM의 다국어 및 문화적 상식...","categories": ["Review"],
        "tags": ["Review","Multilingual Benchmark","Commonsense Reasoning","LLM Evaluation","Reasoning Taxonomy","Benchmark Scaling","Data Synthesis","Cultural Nuances"],
        "url": "/ai/review/2025-8-21-mSCoRe_a_Multilingual_and_Scalable_Benchmark_for_Skill-based_Commonsense_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] ATLAS: Decoupling Skeletal and Shape Parameters for Expressive Parametric Human Modeling",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shunsuke Saito, Javier Romero, Jinhyung Park, Rawal Khirodkar, Takaaki Shiratori 핵심 연구 목표 기존 파라메트릭 인체 모델(예: SMPL-X)이 겪는 골격 및 표면 간의 원치 않는 상관관계, 제한된 표현력, 그리고 미세한 속성 제어의 어려움을 해결하는 것을 목표로 합니다. 특히, 신체 높이나 뼈 길이와 같은 내부...","categories": ["Review"],
        "tags": ["Review","Parametric Human Model","3D Human Modeling","Shape-Skeleton Decoupling","Pose Correctives","Single Image Mesh Fitting","Expressive Modeling","Goliath Dataset"],
        "url": "/ai/review/2025-8-22-ATLAS_Decoupling_Skeletal_and_Shape_Parameters_for_Expressive_Parametric_Human_Modeling/",
        "teaser": null
      },{
        "title": "[논문리뷰] A Survey on Large Language Model Benchmarks",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Siyi Li, Xuanang Chen, Shuaimin Li, Guhong Chen, Shiwen Ni 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM) 평가 벤치마크의 현재 상태와 발전 과정을 체계적으로 검토하고, 기존 벤치마크의 한계를 분석하며, 향후 벤치마크 혁신을 위한 설계 패러다임을 제시하는 것을 목표로 합니다. LLM의 기능 측정과 기술...","categories": ["Review"],
        "tags": ["Review","LLM Benchmarks","Evaluation","Systematic Review","General Capabilities","Domain-Specific Benchmarks","Target-Specific Benchmarks","Data Contamination","AI Ethics"],
        "url": "/ai/review/2025-8-22-A_Survey_on_Large_Language_Model_Benchmarks/",
        "teaser": null
      },{
        "title": "[논문리뷰] Deep Think with Confidence",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yichao Fu, Xuewei Wang, Yuandong Tian, Jiawei Zhao 핵심 연구 목표 본 논문은 LLM의 추론 태스크에서 self-consistency (다수결 투표) 방식의 한계점인 정확도 저하 및 높은 연산 오버헤드를 해결하는 것을 목표로 합니다. 특히, 추론 과정의 효율성과 성능을 동시에 향상시키기 위해 저품질 추론 경로를 동적으로 필터링하는...","categories": ["Review"],
        "tags": ["Review","LLM Reasoning","Confidence Filtering","Self-Consistency","Test-Time Optimization","Computational Efficiency","Adaptive Sampling","Early Stopping","Majority Voting"],
        "url": "/ai/review/2025-8-22-Deep_Think_with_Confidence/",
        "teaser": null
      },{
        "title": "[논문리뷰] 'Does the cafe entrance look accessible? Where is the door?' Towards Geospatial AI Agents for Visual Inquiries",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jon E. Froehlich, Jared Hwang, Zeyu Wang, John S. O’Meara, Xia Su, William Huang, Yang Zhang, Alex Fiannaca, Philip Nelson, Shaun Kane 핵심 연구 목표 본 논문은 기존 지도 시스템이 구조화된 GIS 데이터에 의존하여 시각적-공간적 질의(예: “카페 입구가 접근 가능한가요?”, “문은 어디에 있고 어떻게...","categories": ["Review"],
        "tags": ["Review","Geospatial AI","Multimodal AI Agents","Visual Question Answering","Accessibility","Street View Imagery","Spatial Reasoning","Human-Computer Interaction"],
        "url": "/ai/review/2025-8-22-Does_the_cafe_entrance_look_accessible_Where_is_the_door_Towards_Geospatial_AI_Agents_for_Visual_Inquiries/",
        "teaser": null
      },{
        "title": "[논문리뷰] Fin-PRM: A Domain-Specialized Process Reward Model for Financial Reasoning in Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuanchen Zhou, Shuo Jiang, Jie Zhu, Junhui Li, Lifan Guo, Feng Chen, Chi Zhang 핵심 연구 목표 본 논문은 기존 일반 목적 Process Reward Models (PRMs)이 금융과 같은 도메인 특화 태스크에서 요구되는 정밀성, 사실성, 논리적 일관성을 충족하지 못하는 문제를 해결하는 것을 목표로 합니다. 금융...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Process Reward Models","Financial Reasoning","Domain Specialization","RLHF","Best-of-N Selection","Data Curation"],
        "url": "/ai/review/2025-8-22-Fin-PRM_A_Domain-Specialized_Process_Reward_Model_for_Financial_Reasoning_in_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] INTIMA: A Benchmark for Human-AI Companionship Behavior",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Lucie-Aimée Kaffee, Giada Pistilli, Yacine Jernite 핵심 연구 목표 이 논문은 사용자들이 AI 시스템과 감정적 유대감을 형성하는 AI 동반자 관계(AI companionship)의 증가에 주목합니다. 기존 평가 방법론이 주로 작업 성능, 사실 정확도, 안전성에 집중하여 사회적, 감정적 차원을 간과한다는 문제를 제기하며, AI 상호작용의 심리적 역학을 정확하게...","categories": ["Review"],
        "tags": ["Review","AI Companionship","Benchmark","Language Models (LLMs)","Human-AI Interaction","Emotional AI","Boundary Setting","Psychological Frameworks","Evaluation Metrics"],
        "url": "/ai/review/2025-8-22-INTIMA_A_Benchmark_for_Human-AI_Companionship_Behavior/",
        "teaser": null
      },{
        "title": "[논문리뷰] Intern-S1: A Scientific Multimodal Foundation Model",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: xuhuang87, ZhouqiHUA, Jerry-hyl, guox18, gaoyang07 핵심 연구 목표 본 논문은 과학 분야에서 오픈 소스 파운데이션 모델과 클로즈드 소스 모델 간의 성능 격차를 줄이고자 합니다. 특히, 일반 파운데이션 모델의 발전이 더딘 저자원 과학 전문 분야에서 멀티모달 대규모 추론 모델(multimodal large reasoning model)을 개발하여 과학적 발견을...","categories": ["Review"],
        "tags": ["Review","Multimodal Foundation Model","Scientific AI","Reinforcement Learning","Mixture-of-Experts (MoE)","Dynamic Tokenizer","Data Curation","Low-Resource Learning"],
        "url": "/ai/review/2025-8-22-Intern-S1_A_Scientific_Multimodal_Foundation_Model/",
        "teaser": null
      },{
        "title": "[논문리뷰] LiveMCP-101: Stress Testing and Diagnosing MCP-enabled Agents on Challenging Queries",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ming Yin, Dinghan Shen, Silei Xu, Jianbing Han, Sixun Dong, Mian Zhang, Yebowen Hu, Shujian Liu, Simin Ma, Song Wang, Sathish Reddy Indurthi, Xun Wang, Yiran Chen, Kaiqiang Song 핵심 연구 목표 본 논문은 AI 에이전트가 현실 세계와 상호작용하고 복잡한 작업을 해결하는 데 필수적인...","categories": ["Review"],
        "tags": ["Review","AI Agents","Tool Use","Model Context Protocol (MCP)","Benchmarking","Large Language Models (LLMs)","Real-world Tasks","Evaluation","Error Analysis"],
        "url": "/ai/review/2025-8-22-LiveMCP-101_Stress_Testing_and_Diagnosing_MCP-enabled_Agents_on_Challenging_Queries/",
        "teaser": null
      },{
        "title": "[논문리뷰] Mobile-Agent-v3: Foundamental Agents for GUI Automation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiabo Ye, Xi Zhang, Haiyang Xu, Ziwei Zheng, Feiyu Gao, Haowei Liu, Junyang Wang, Zhaoqing Zhu, Junjie Cao, Zhengxi Lu, Ming Yan, Qi Zheng, Fei Huang, Jingren Zhou (Tongyi Lab, Alibaba Group) 핵심 연구 목표 본 논문은 다양한 GUI 환경(데스크톱, 모바일)에서 인간의 지시에 따라...","categories": ["Review"],
        "tags": ["Review","GUI Automation","Multimodal Agents","Foundational Models","Reinforcement Learning","Large Language Models","Cross-Platform","Self-Supervised Learning"],
        "url": "/ai/review/2025-8-22-Mobile-Agent-v3_Foundamental_Agents_for_GUI_Automation/",
        "teaser": null
      },{
        "title": "[논문리뷰] SceneGen: Single-Image 3D Scene Generation in One Feedforward Pass",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yanxu Meng, Haoning Wu, Ya Zhang, Weidi Xie† 핵심 연구 목표 본 논문의 핵심 목표는 단일 장면 이미지와 객체 마스크를 입력으로 받아, 최적화나 에셋 검색 과정 없이 하나의 피드포워드 패스만으로 다수의 3D 에셋(기하학적 구조, 텍스처, 공간 배치 포함)을 동시에 효율적으로 생성하는 것입니다. 이는 VR/AR...","categories": ["Review"],
        "tags": ["Review","3D Scene Generation","Single-Image Input","Feedforward Networks","Diffusion Models","Geometric Modeling","Texture Synthesis","Transformer","Feature Aggregation"],
        "url": "/ai/review/2025-8-22-SceneGen_Single-Image_3D_Scene_Generation_in_One_Feedforward_Pass/",
        "teaser": null
      },{
        "title": "[논문리뷰] Snap-Snap: Taking Two Images to Reconstruct 3D Human Gaussians in Milliseconds",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jia Lu, Taoran Yi, Jiemin Fang, Chen Yang, Chuiyun Wu, Wei Shen, Wenyu Liu, Qi Tian, Xinggang Wang 핵심 연구 목표 본 연구는 극도로 희소한 입력(전면 및 후면 이미지 단 두 장)만으로 3D 인체 가우시안을 재구성하는 도전적인 문제를 해결하고자 합니다. 기존 방법론의 고비용 데이터...","categories": ["Review"],
        "tags": ["Review","3D Human Reconstruction","Gaussian Splatting","Sparse View","Two-Image Input","Real-time Inference","Point Cloud Prediction","Feed-forward Network"],
        "url": "/ai/review/2025-8-22-Snap-Snap_Taking_Two_Images_to_Reconstruct_3D_Human_Gaussians_in_Milliseconds/",
        "teaser": null
      },{
        "title": "[논문리뷰] Waver: Wave Your Way to Lifelike Video Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Bytedance Waver Team 핵심 연구 목표 본 논문은 통합된 이미지 및 비디오 생성을 위한 고성능 파운데이션 모델인 Waver를 제시하며, 특히 720p 원본 해상도에서 5-10초 길이의 비디오를 생성하고 1080p로 업스케일링하는 것을 목표로 합니다. 기존 비디오 생성 모델의 한계점인 복잡한 모션 시나리오에서의 낮은 품질, 고해상도 비디오...","categories": ["Review"],
        "tags": ["Review","Video Generation","Foundation Model","Diffusion Model","Transformer","Text-to-Video","Image-to-Video","Super-Resolution","Data Curation"],
        "url": "/ai/review/2025-8-22-Waver_Wave_Your_Way_to_Lifelike_Video_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] When and What: Diffusion-Grounded VideoLLM with Entity Aware Segmentation for Long Video Understanding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Pengcheng Fang, Yuxia Chen, Rui Guo 핵심 연구 목표 본 논문은 기존 Video-LLM의 한계인 불명확한 시간 인코딩, 프레임 수준의 낮은 연속성, 그리고 관심 엔티티에 대한 언어-비전 정렬 불일치를 극복하는 것을 목표로 합니다. 특히 긴 비디오에서 발생하는 이벤트의 정밀한 시간적 위치 파악과 엔티티 수준의 견고한...","categories": ["Review"],
        "tags": ["Review","Video-LLM","Diffusion Model","Temporal Grounding","Object Segmentation","Long Video Understanding","Multimodal AI","Video Question Answering"],
        "url": "/ai/review/2025-8-22-When_and_What_Diffusion-Grounded_VideoLLM_with_Entity_Aware_Segmentation_for_Long_Video_Understanding/",
        "teaser": null
      },{
        "title": "[논문리뷰] aiXiv: A Next-Generation Open Access Ecosystem for Scientific Discovery Generated by AI Scientists",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Pengsong Zhang, Xiang Hu, Guowei Huang, Yang Qi, Heng Zhang 핵심 연구 목표 AI가 생성한 과학 연구 콘텐츠가 파편화된 출판 생태계와 확장성 없는 인간 중심의 동료 검토 시스템으로 인해 확산에 어려움을 겪는 문제를 해결하는 것이 목표입니다. aiXiv라는 차세대 오픈 액세스 플랫폼을 구축하여 AI 과학자들이...","categories": ["Review"],
        "tags": ["Review","AI Agents","Open Access","Scientific Discovery","Peer Review","LLMs","Multi-agent Systems","Prompt Injection","Iterative Refinement"],
        "url": "/ai/review/2025-8-22-aiXiv_A_Next-Generation_Open_Access_Ecosystem_for_Scientific_Discovery_Generated_by_AI_Scientists/",
        "teaser": null
      },{
        "title": "[논문리뷰] AetherCode: Evaluating LLMs' Ability to Win In Premier Programming Competitions",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zihan Wang, Jiaze Chen, Zhicheng Liu, Markus Mak, Yidi Du 핵심 연구 목표 현재 대규모 언어 모델(LLM)의 코드 추론 능력 평가 벤치마크들이 모델의 실제 역량을 과대평가하며, 엘리트 인간 프로그래머와의 격차를 숨기고 있다는 문제 의식에서 출발합니다. 본 논문은 기존 벤치마크의 난이도 및 범위 부족, 저품질...","categories": ["Review"],
        "tags": ["Review","Competitive Programming","LLM Evaluation","Code Reasoning","Benchmark","Test Case Generation","Programming Competitions","Algorithmic Problems"],
        "url": "/ai/review/2025-8-25-AetherCode_Evaluating_LLMs_Ability_to_Win_In_Premier_Programming_Competitions/",
        "teaser": null
      },{
        "title": "[논문리뷰] AgentScope 1.0: A Developer-Centric Framework for Building Agentic Applications",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Liuyi Yao, Weirui Kuang, Yuexiang Xie, Zitao Li, Dawei Gao, et al. 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM) 기반 에이전트 애플리케이션 구축 시 발생하는 유연하고 효율적인 도구 기반 에이전트-환경 상호작용의 어려움을 해결하고자 합니다. 이를 위해 AgentScope 1.0이라는 개발자 중심 프레임워크를 제시하여, 복잡한...","categories": ["Review"],
        "tags": ["Review","LLM Agents","Agentic Applications","ReAct Paradigm","Framework","Tool Use","Multi-Agent Systems","Developer Experience","Evaluation"],
        "url": "/ai/review/2025-8-25-AgentScope_1.0_A_Developer-Centric_Framework_for_Building_Agentic_Applications/",
        "teaser": null
      },{
        "title": "[논문리뷰] Beyond Pass@1: Self-Play with Variational Problem Synthesis Sustains RLVR",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiao Liang, Zhongzhi Li, Yeyun Gong, Yelong Shen, Ying Nian Wu, Zhijiang Guo, Weizhu Chen 핵심 연구 목표 본 논문은 Verifiable Rewards (RLVR) 기반 Large Language Models (LLMs) 학습 시 발생하는 Pass@k 성능 한계와 정책 엔트로피 붕괴 문제를 해결하는 것을 목표로 합니다. 기존 RLVR이...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Large Language Models","Self-Play","Variational Problem Synthesis","Policy Entropy","Pass@k","Reasoning Benchmarks"],
        "url": "/ai/review/2025-8-25-Beyond_Pass1_Self-Play_with_Variational_Problem_Synthesis_Sustains_RLVR/",
        "teaser": null
      },{
        "title": "[논문리뷰] CARFT: Boosting LLM Reasoning via Contrastive Learning with Annotated Chain-of-Thought-based Reinforced Fine-Tuning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wenqiao Zhu, Ji Liu, Rongjuncheng Zhang, Haipang Wu, Yulun Zhang 핵심 연구 목표 본 논문은 LLM의 추론 능력 향상을 목표로, 기존 SFT(Supervised Fine-Tuning) 방식의 제한된 일반화 능력과 RL(Reinforcement Learning) 기반 방식의 불안정한 추론 경로 샘플링 및 주석된 CoT(Chain-of-Thought) 활용 부족이라는 두 가지 주요 한계를...","categories": ["Review"],
        "tags": ["Review","LLM Reasoning","Contrastive Learning","Reinforcement Learning","Fine-tuning","Chain-of-Thought (CoT)","Annotated Data","Model Stability"],
        "url": "/ai/review/2025-8-25-CARFT_Boosting_LLM_Reasoning_via_Contrastive_Learning_with_Annotated_Chain-of-Thought-based_Reinforced_Fine-Tuning/",
        "teaser": null
      },{
        "title": "[논문리뷰] CRISP: Persistent Concept Unlearning via Sparse Autoencoders",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Tomer Ashuach, Dana Arad, Aaron Mueller, Martin Tutek, Yonatan Belinkov 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)에서 불필요하거나 유해한 지식을 영구적으로 제거(Persistent Concept Unlearning)하면서도 모델의 일반적인 유용성과 생성 품질을 유지하는 것을 목표로 합니다. 기존 언러닝 방식들이 겪는 비유해 지식 손상 및 언러닝 대상...","categories": ["Review"],
        "tags": ["Review","Concept Unlearning","Sparse Autoencoders (SAEs)","LLMs","Parameter-Efficient Fine-Tuning","Model Interpretability","Safety-Critical AI","Feature Suppression","WMDP Benchmark"],
        "url": "/ai/review/2025-8-25-CRISP_Persistent_Concept_Unlearning_via_Sparse_Autoencoders/",
        "teaser": null
      },{
        "title": "[논문리뷰] Do What? Teaching Vision-Language-Action Models to Reject the Impossible",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wen-Han Hsieh, Elvis Hsieh, Dantong Niu, Trevor Darrell, Roei Herzig, David M. Chan 핵심 연구 목표 본 논문은 Vision-Language-Action (VLA) 모델이 존재하지 않는 객체나 조건(“false-premise instructions”)을 참조하는 명령을 받았을 때 이를 인식하고, 해석하며, 적절히 응답하는 능력이 부족하다는 문제를 해결하는 것을 목표로 합니다. 연구 목적은...","categories": ["Review"],
        "tags": ["Review","Vision-Language-Action Models","Robotics","False Premise Detection","Instruction Following","Human-Robot Interaction","Clarification","Instruction Tuning"],
        "url": "/ai/review/2025-8-25-Do_What_Teaching_Vision-Language-Action_Models_to_Reject_the_Impossible/",
        "teaser": null
      },{
        "title": "[논문리뷰] EgoTwin: Dreaming Body and View in First Person",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jingqiao Xiu, Fangzhou Hong, Yicong Li, Mengze Li, Wentao Wang 핵심 연구 목표 본 논문은 egocentric video 생성 분야의 미개척 영역을 탐구하며, 특히 카메라 착용자의 모션과 시점이 일관되고 인과적으로 연결된 방식으로 egocentric video와 인간 모션을 공동 생성하는 새로운 태스크를 제시합니다. 시점 정렬 (Viewpoint Alignment)과...","categories": ["Review"],
        "tags": ["Review","Egocentric Video Generation","Human Motion Synthesis","Diffusion Transformers","Multimodal Generation","Viewpoint Alignment","Causal Interplay","First-Person Vision"],
        "url": "/ai/review/2025-8-25-EgoTwin_Dreaming_Body_and_View_in_First_Person/",
        "teaser": null
      },{
        "title": "[논문리뷰] End-to-End Agentic RAG System Training for Traceable Diagnostic Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Qiaoyu Zheng, Yuze Sun, Chaoyi Wu, Weike Zhao, Pengcheng Qiu, Yongguo Yu, Kun Sun, Yanfeng Wang, Ya Zhang, Pengcheng Qiu, Weidi Xie 핵심 연구 목표 본 논문은 기존 RAG(Retrieval-Augmented Generation) 시스템이 의료 진단 분야에서 겪는 한계, 즉 수동적인 프롬프트 엔지니어링, 제한된 피드백 적응, 그리고...","categories": ["Review"],
        "tags": ["Review","Agentic RAG","Medical Diagnosis","Reinforcement Learning","Traceable AI","Large Language Models","Clinical Decision Support","Out-of-Distribution Generalization","Reward Design"],
        "url": "/ai/review/2025-8-25-End-to-End_Agentic_RAG_System_Training_for_Traceable_Diagnostic_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] InMind: Evaluating LLMs in Capturing and Applying Individual Human Reasoning Styles",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zizhen Li, Chuanhao Li, Yibin Wang, Qi Chen, Diping Song, Yukang Feng, Jianwen Sun, Jiaxin Ai, Fanrui Zhang, Mingzhu Sun, Kaipeng Zhang 핵심 연구 목표 본 연구는 LLM이 인간의 개별적인 추론 스타일, 특히 사회적 맥락에서 사람들의 행동과 의도를 해석하고 적용하는 능력을 평가하는 것을 목표로...","categories": ["Review"],
        "tags": ["Review","LLM Evaluation","Human Reasoning Styles","Social Deduction Games","Theory of Mind","Adaptive Reasoning","Avalon Game","Cognitive Grounding"],
        "url": "/ai/review/2025-8-25-InMind_Evaluating_LLMs_in_Capturing_and_Applying_Individual_Human_Reasoning_Styles/",
        "teaser": null
      },{
        "title": "[논문리뷰] Jailbreaking Commercial Black-Box LLMs with Explicitly Harmful Prompts",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chiyu Zhang, Lu Zhou, Xiaogang Xu, Jiafei Wu, Liming Fang, Zhe Liu 핵심 연구 목표 본 논문은 상업용 블랙박스 LLM에 대한 효과적인 탈옥(jailbreak) 공격 방법론을 개발하고, 기존 레드팀 데이터셋의 부적절한 프롬프트(Benign, Non-obvious Harmful, Non-Triggering harmful-response) 문제를 해결하여 LLM 평가의 정확성을 높이는 것을 목표로 합니다....","categories": ["Review"],
        "tags": ["Review","LLM Jailbreaking","Red Teaming","Malicious Content Detection","Developer Messages","D-Attack","DH-CoT","Adversarial Attacks","Dataset Cleaning"],
        "url": "/ai/review/2025-8-25-Jailbreaking_Commercial_Black-Box_LLMs_with_Explicitly_Harmful_Prompts/",
        "teaser": null
      },{
        "title": "[논문리뷰] Learnable SMPLify: A Neural Solution for Optimization-Free Human Pose Inverse Kinematics",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuchen Yang, Linfeng Dong, Wei Wang, Zhihang Zhong, Xiao Sun 핵심 연구 목표 본 논문은 3D 인체 포즈 및 형태 추정에서 널리 사용되지만 계산 비용이 높은 SMPLify의 반복적 최적화 과정을 데이터 기반 신경망으로 대체하여, 최적화 없이 빠른 시간 내에 인버스 키네마틱스(IK) 문제를 해결하는 것을...","categories": ["Review"],
        "tags": ["Review","Inverse Kinematics","Human Pose Estimation","SMPL Model","Neural Networks","Optimization-Free","Residual Learning","Data-Driven"],
        "url": "/ai/review/2025-8-25-Learnable_SMPLify_A_Neural_Solution_for_Optimization-Free_Human_Pose_Inverse_Kinematics/",
        "teaser": null
      },{
        "title": "[논문리뷰] Selective Contrastive Learning for Weakly Supervised Affordance Grounding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: WonJun Moon, Hyun Seok Seong, Jae-Pil Heo 핵심 연구 목표 본 논문은 약지도 어포던스 그라운딩(Weakly Supervised Affordance Grounding, WSAG)에서 모델이 어포던스 관련 부위 대신 일반적인 클래스 패턴에 집중하는 한계를 극복하고자 합니다. 픽셀 수준의 어노테이션 없이도 어포던스 관련 단서를 객체 및 부분 수준에서 선택적 대조...","categories": ["Review"],
        "tags": ["Review","Weakly Supervised Learning","Affordance Grounding","Contrastive Learning","CLIP","Part Discovery","Object Localization","DINO","Generative Models"],
        "url": "/ai/review/2025-8-25-Selective_Contrastive_Learning_for_Weakly_Supervised_Affordance_Grounding/",
        "teaser": null
      },{
        "title": "[논문리뷰] TPLA: Tensor Parallel Latent Attention for Efficient Disaggregated Prefill & Decode Inference",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiaojuan Tang, Fanxu Meng, Pingzhi Tang, Yuxuan Wang, Di Yin, Xing Sun, Muhan Zhang 핵심 연구 목표 본 논문은 DeepSeek-V2에서 도입된 Multi-Head Latent Attention (MLA)이 Tensor Parallelism (TP) 환경에서 KV 캐시 메모리 절감 효과를 잃는 문제를 해결하고자 합니다. 특히, TP 환경에서 각 디바이스가 전체...","categories": ["Review"],
        "tags": ["Review","LLM Inference","Tensor Parallelism","KV Cache Optimization","Latent Attention","Memory Efficiency","Decoding Speedup","Prefill/Decode Separation","Reparameterization"],
        "url": "/ai/review/2025-8-25-TPLA_Tensor_Parallel_Latent_Attention_for_Efficient_Disaggregated_Prefill_Decode_Inference/",
        "teaser": null
      },{
        "title": "[논문리뷰] Beyond Memorization: Extending Reasoning Depth with Recurrence, Memory and Test-Time Compute Scaling",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ivan Rodkin, Daniil Orel, Konstantin Smirnov, Arman Bolatov, Bilal Elbouardi, Besher Hassan, Yuri Kuratov, Aydar Bulatov, Preslav Nakov, Timothy Baldwin, Artem Shelmanov, Mikhail Burtsev 핵심 연구 목표 본 연구는 대규모 언어 모델(LLM)의 다단계 추론 능력을 향상시키는 것을 목표로 합니다. 특히, 추론이 단순한 암기(memorization)가 아닌...","categories": ["Review"],
        "tags": ["Review","Reasoning Depth","Cellular Automata","Transformer Architectures","Recurrence","Adaptive Computation Time","Chain-of-Thought","Reinforcement Learning","Generalization"],
        "url": "/ai/review/2025-8-26-Beyond_Memorization_Extending_Reasoning_Depth_with_Recurrence_Memory_and_Test-Time_Compute_Scaling/",
        "teaser": null
      },{
        "title": "[논문리뷰] Breaking the Exploration Bottleneck: Rubric-Scaffolded Reinforcement Learning for General LLM Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yang Zhou, Sunzhu Li, Shunyu Liu, Wenkai Fang, Jiale Zhao, et al. 핵심 연구 목표 대규모 언어 모델(LLM)의 일반 추론 능력 향상에 있어 강화 학습(RL)의 고질적인 탐색 병목 현상을 해결하는 것입니다. 고품질 샘플 학습의 필요성과 LLM의 제한된 탐색 능력 사이의 딜레마를 극복하여, 탐색할 수...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Large Language Models","Exploration Bottleneck","Instructional Scaffolding","Rubric-based Rewards","General Reasoning","RL with Verifiable Rewards","Policy Optimization"],
        "url": "/ai/review/2025-8-26-Breaking_the_Exploration_Bottleneck_Rubric-Scaffolded_Reinforcement_Learning_for_General_LLM_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Explain Before You Answer: A Survey on Compositional Visual Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Fucai Ke, Joy Hsu, Zhixi Cai, Zixian Ma, Xin Zheng, et al. 핵심 연구 목표 본 설문조사는 복잡한 시각적 장면을 분해하고, 중간 개념을 이해하며, 다단계 논리적 추론을 수행하는 인간과 같은 능력을 기계에 부여하는 것을 목표로 하는 Compositional Visual Reasoning (CVR) 분야의 진화를 체계적으로 분석합니다....","categories": ["Review"],
        "tags": ["Review","Compositional Visual Reasoning","Multimodal AI","Vision-Language Models","Large Language Models","Chain-of-Thought","Tool Learning","Agentic AI","Survey"],
        "url": "/ai/review/2025-8-26-Explain_Before_You_Answer_A_Survey_on_Compositional_Visual_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] German4All - A Dataset and Model for Readability-Controlled Paraphrasing in German",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Miriam Anschütz, Thanh Mai Pham, Eslam Nasrallah, Maximilian Müller, Cristian-George Craciun, Georg Groh 핵심 연구 목표 이 논문은 독일어 텍스트를 다양한 독해 수준에 맞춰 재작성하는 Readability-Controlled Paraphrasing 분야의 중요한 격차를 해소하고자 합니다. 기존 독일어 텍스트 단순화 시스템이 단일한 난이도 수준에 집중하는 한계를 지적하며, 독자별...","categories": ["Review"],
        "tags": ["Review","Text Simplification","Paraphrasing","Readability Control","German NLP","Dataset Generation","LLM Distillation","Multi-level Text Generation","Accessibility"],
        "url": "/ai/review/2025-8-26-German4All_-_A_Dataset_and_Model_for_Readability-Controlled_Paraphrasing_in_German/",
        "teaser": null
      },{
        "title": "[논문리뷰] InternVL3.5: Advancing Open-Source Multimodal Models in Versatility, Reasoning, and Efficiency",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Weiyun Wang, Zhangwei Gao, Lixin Gu, Hengjun Pu, Long Cui, Xingguang Wei, Zhaoyang Liu, Linglin Jing, et al. 핵심 연구 목표 본 연구는 오픈소스 멀티모달 모델인 InternVL 시리즈를 다용성, 추론 능력, 그리고 추론 효율성 측면에서 발전시키는 것을 목표로 합니다. 특히, 최첨단 상업 모델인 GPT-5와의...","categories": ["Review"],
        "tags": ["Review","Multimodal Large Language Models","Reinforcement Learning","Inference Efficiency","Vision-Language Models","Open-Source","Versatility","Reasoning"],
        "url": "/ai/review/2025-8-26-InternVL3.5_Advancing_Open-Source_Multimodal_Models_in_Versatility_Reasoning_and_Efficiency/",
        "teaser": null
      },{
        "title": "[논문리뷰] Limitations of Normalization in Attention Mechanism",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Timur Mudarisov, Mikhail Burtsev, Tatiana Petrova, Radu State 핵심 연구 목표 본 연구는 어텐션 메커니즘에서 사용되는 정규화, 특히 소프트맥스(softmax)의 근본적인 한계를 밝히는 것을 목표로 합니다. 콘텍스트 길이 L이 증가함에 따라 어텐션 가중치가 1/L로 수렴하는 vanishing attention 현상과 이로 인해 토큰 구분 능력이 저하되는 문제,...","categories": ["Review"],
        "tags": ["Review","Attention Mechanism","Normalization","Softmax","Transformer Models","Gradient Sensitivity","Token Separability","Context Length","GPT-2"],
        "url": "/ai/review/2025-8-26-Limitations_of_Normalization_in_Attention_Mechanism/",
        "teaser": null
      },{
        "title": "[논문리뷰] MEENA (PersianMMMU): Multimodal-Multilingual Educational Exams for N-level Assessment",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Doratossadat Dastgheib, Seyed Mohammad Hadi Hosseini, Marzia Nouri, Arshia Hemmat, Omid Ghahroodi, Mohammad Vali Saniano, Alireza Sahebi, Reihaneh Zohrabi, Mohammad Hossein Rohban, Ehsaneddin Asgari, Mahdieh Soleymani Baghshah 핵심 연구 목표 본 논문은 영어 중심의 기존 VLM 벤치마크의 한계를 해결하고, 특히 페르시아어와 같은 저자원 언어에서...","categories": ["Review"],
        "tags": ["Review","Multimodal Language Models","Multilingual Benchmarking","Persian Language","Educational Assessment","Vision-Language Models","Cultural Nuance","Reasoning Tasks"],
        "url": "/ai/review/2025-8-26-MEENA_PersianMMMU_Multimodal-Multilingual_Educational_Exams_for_N-level_Assessment/",
        "teaser": null
      },{
        "title": "[논문리뷰] MV-RAG: Retrieval Augmented Multiview Diffusion",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yosef Dayani, Omer Benishu, Sagie Benaim 핵심 연구 목표 본 논문은 기존 Text-to-3D 생성 모델이 Out-of-Domain (OOD) 또는 희귀 개념을 처리할 때 겪는 기하학적 불일치, 부정확한 결과 및 현실성 부족 문제를 해결하고자 합니다. 텍스트 프롬프트만으로는 생성하기 어려운 새로운 객체에 대해 일관되고 정확하며 충실한 멀티뷰...","categories": ["Review"],
        "tags": ["Review","Retrieval Augmented Generation","Multiview Diffusion","Text-to-3D Generation","Out-of-Domain","Image Retrieval","3D Consistency","Diffusion Models","Hybrid Training"],
        "url": "/ai/review/2025-8-26-MV-RAG_Retrieval_Augmented_Multiview_Diffusion/",
        "teaser": null
      },{
        "title": "[논문리뷰] MeshSplat: Generalizable Sparse-View Surface Reconstruction via Gaussian Splatting",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hanzhi Chang, Ruijie Zhu, Wenjie Chang, Mulin Yu, Yanzhe Liang, Jiahao Lu, Zhuoyuan Li, Tianzhu Zhang 핵심 연구 목표 본 논문은 극도로 희소한(sparse-view) 이미지로부터 정확한 3D 장면의 표면을 재구성하는 문제를 해결하고자 합니다. 기존 방식들이 희소한 입력에서 다중 뷰 기하학적 제약 조건 부족으로 인해 어려움을...","categories": ["Review"],
        "tags": ["Review","Sparse-View","Surface Reconstruction","Gaussian Splatting","2DGS","Novel View Synthesis","Generalizable","Mesh Extraction","3D Vision"],
        "url": "/ai/review/2025-8-26-MeshSplat_Generalizable_Sparse-View_Surface_Reconstruction_via_Gaussian_Splatting/",
        "teaser": null
      },{
        "title": "[논문리뷰] Neither Valid nor Reliable? Investigating the Use of LLMs as Judges",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Khaoula Chehbouni, Mohammed Haddou, Jackie Chi Kit Cheung, Golnoosh Farnadi 핵심 연구 목표 본 논문은 NLG(Natural Language Generation) 시스템 평가에서 LLM(Large Language Model)을 심사관(LLJ)으로 활용하는 방식의 광범위한 채택이 성급했음을 주장하며, 그 신뢰성(reliability)과 타당성(validity)에 대한 엄격한 조사를 목표로 합니다. 사회 과학의 측정 이론(measurement theory)을 기반으로,...","categories": ["Review"],
        "tags": ["Review","LLMs as Judges","NLG Evaluation","Measurement Theory","Validity","Reliability","Evaluation Bias","Scalability","Responsible AI"],
        "url": "/ai/review/2025-8-26-Neither_Valid_nor_Reliable_Investigating_the_Use_of_LLMs_as_Judges/",
        "teaser": null
      },{
        "title": "[논문리뷰] PosterGen: Aesthetic-Aware Paper-to-Poster Generation via Multi-Agent LLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhilin Zhang, Xiang Zhang, Jiaqi Wei, Yiwei Xu, Chenyu You 핵심 연구 목표 기존 학술 포스터 자동 생성 방식은 미학적 원칙을 간과하여 수동 수정이 많이 필요하다는 문제에 직면합니다. 본 논문은 전문 디자이너의 워크플로우를 모방하는 PosterGen 멀티 에이전트 LLM 프레임워크를 통해 미학적으로 우수하고 내용이 충실하며,...","categories": ["Review"],
        "tags": ["Review","Multi-Agent LLMs","Academic Poster Generation","Aesthetic Design","Layout Optimization","Typography","Color Palette","VLM-as-Judge","Content Fidelity"],
        "url": "/ai/review/2025-8-26-PosterGen_Aesthetic-Aware_Paper-to-Poster_Generation_via_Multi-Agent_LLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] ST-Raptor: LLM-Powered Semi-Structured Table Question Answering",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zirui Tang, Boxiu Li, Guoliang Li, Boyu Niu, Wei Zhou, Xinyi Zhang, Xuanhe Zhou, Jiannan Wang, Fan Wu 핵심 연구 목표 본 논문은 금융 보고서나 의료 기록과 같이 유연하고 복잡한 레이아웃(계층적 헤더, 병합된 셀 등)을 가진 반정형 테이블(semi-structured table)에 대한 질의응답(QA) 문제를 해결하는 것을...","categories": ["Review"],
        "tags": ["Review","Semi-structured Tables","Question Answering","LLMs","Hierarchical Orthogonal Tree","Table Layout Understanding","Pipeline Generation","Verification Mechanism"],
        "url": "/ai/review/2025-8-26-ST-Raptor_LLM-Powered_Semi-Structured_Table_Question_Answering/",
        "teaser": null
      },{
        "title": "[논문리뷰] SpotEdit: Evaluating Visually-Guided Image Editing Methods",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Sara Ghazanfari, Wei-An Lin, Haitong Tian, Ersin Yumer 핵심 연구 목표 이 논문은 기존 벤치마크의 단순성과 실제 편집 과제에 대한 낮은 대표성이라는 한계를 극복하기 위해, 시각적으로 안내되는 이미지 편집(Visually-Guided Image Editing) 모델을 체계적이고 세밀하게 평가하기 위한 포괄적인 벤치마크인 SpotEdit을 소개합니다. 특히, 모델이 시각적 단서의...","categories": ["Review"],
        "tags": ["Review","Visually-Guided Image Editing","Multimodal Models","Benchmark","Hallucination","Diffusion Models","Autoregressive Models","Evaluation Metrics"],
        "url": "/ai/review/2025-8-26-SpotEdit_Evaluating_Visually-Guided_Image_Editing_Methods/",
        "teaser": null
      },{
        "title": "[논문리뷰] T2I-ReasonBench: Benchmarking Reasoning-Informed Text-to-Image Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Kaiyue Sun, Rongyao Fang, Chengqi Duan, Xian Liu, Xihui Liu 핵심 연구 목표 본 논문은 기존 Text-to-Image (T2I) 모델들이 리터럴한 프롬프트 해석을 넘어 내포된 의미(implicit meaning)와 맥락적 뉘앙스(contextual nuances)를 이해하는 추론 능력에 한계가 있음을 지적합니다. 이를 해결하기 위해 T2I 모델의 추론 능력을 체계적으로 평가할...","categories": ["Review"],
        "tags": ["Review","Text-to-Image Generation","Reasoning Benchmark","Idiom Interpretation","Textual Image Design","Entity Reasoning","Scientific Reasoning","Multimodal LLM Evaluation"],
        "url": "/ai/review/2025-8-26-T2I-ReasonBench_Benchmarking_Reasoning-Informed_Text-to-Image_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] TaDiCodec: Text-aware Diffusion Speech Tokenizer for Speech Language Modeling",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuancheng Wang, Dekun Chen, Xueyao Zhang, Junan Zhang, Jiaqi Li, Zhizheng Wu 핵심 연구 목표 본 논문은 기존 스피치 토크나이저의 한계점, 즉 다층 RVQ 구조 또는 높은 프레임 레이트에 대한 의존성, 보조 사전 학습 모델을 통한 의미론적 증류의 필요성, 복잡한 2단계 훈련 프로세스 등을...","categories": ["Review"],
        "tags": ["Review","Speech Tokenizer","Diffusion Model","Text-to-Speech","Speech Language Modeling","Low Bitrate Codec","End-to-End Training","Binary Spherical Quantization"],
        "url": "/ai/review/2025-8-26-TaDiCodec_Text-aware_Diffusion_Speech_Tokenizer_for_Speech_Language_Modeling/",
        "teaser": null
      },{
        "title": "[논문리뷰] UQ: Assessing Language Models on Unsolved Questions",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Fan Nie, Ken Ziyu Liu, Wei Liu, Rui Sun, Zihao Wang 핵심 연구 목표 AI 연구의 진전을 이끄는 벤치마크가 난이도와 현실성을 동시에 갖추지 못하는 문제점을 해결하고자 합니다. 특히, 기존 벤치마크의 한계(시험 기반의 인위적 난이도, 사용자 상호작용 기반의 쉬운 문제)를 극복하고, 언어 모델을 미해결 질문으로...","categories": ["Review"],
        "tags": ["Review","LLM Evaluation","Unsolved Questions","AI Benchmark","Oracle-Free Validation","Generator-Validator Gap","Community Evaluation","Stack Exchange"],
        "url": "/ai/review/2025-8-26-UQ_Assessing_Language_Models_on_Unsolved_Questions/",
        "teaser": null
      },{
        "title": "[논문리뷰] Visual-CoG: Stage-Aware Reinforcement Learning with Chain of Guidance for Text-to-Image Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yaqi Li, Peng Chen, Mingyang Han, Bu Pi, Haoxiang Shi, Runzhou Zhao, Yang Yao, Xuan Zhang, Jun Song † 핵심 연구 목표 본 연구는 텍스트-이미지(T2I) 생성 시 다중 속성 및 모호한 프롬프트 처리 능력의 한계를 극복하고자 합니다. 기존 강화 학습(RL) 기반 T2I 모델들이 주로...","categories": ["Review"],
        "tags": ["Review","Text-to-Image Generation","Reinforcement Learning","Chain of Thought","Multimodal LLMs","Stage-Aware Rewards","Semantic Reasoning","Generative AI"],
        "url": "/ai/review/2025-8-26-Visual-CoG_Stage-Aware_Reinforcement_Learning_with_Chain_of_Guidance_for_Text-to-Image_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Autoregressive Universal Video Segmentation Model",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Albert Gu, Yu-Chiang Frank Wang, Sukjun Hwang, Miran Heo, cmhungsteve 핵심 연구 목표 현재 단편화된 비디오 분할 태스크들을 단일 아키텍처로 통합하고, 프롬프트 기반(prompted) 및 비프롬프트 기반(unprompted) 비디오 분할을 아우르는 범용 모델을 개발하는 것이 목표입니다. 특히, 언어 모델링의 다음 단어 예측과 유사하게 다음 프레임 마스크...","categories": ["Review"],
        "tags": ["Review","Video Segmentation","Autoregressive Model","Universal Model","State Space Models","Mamba","Parallel Training","Streaming Video","Deep Learning"],
        "url": "/ai/review/2025-8-27-Autoregressive_Universal_Video_Segmentation_Model/",
        "teaser": null
      },{
        "title": "[논문리뷰] CMPhysBench: A Benchmark for Evaluating Large Language Models in Condensed Matter Physics",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Weida Wang, Dongchen Huang, Jiatong Li, Tengchao Yang, Ziyang Zheng, et al. 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)이 복잡한 과학 도메인, 특히 응집 물질 물리학(Condensed Matter Physics, CMP) 문제 해결에 얼마나 능숙한지 평가하기 위한 새로운 벤치마크인 CMPhysBench를 제안합니다. 기존 벤치마크들이 고등학교 수준...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Condensed Matter Physics","Benchmark","Scientific Reasoning","Evaluation Metric","Expression Edit Distance","Problem Solving"],
        "url": "/ai/review/2025-8-27-CMPhysBench_A_Benchmark_for_Evaluating_Large_Language_Models_in_Condensed_Matter_Physics/",
        "teaser": null
      },{
        "title": "[논문리뷰] CineScale: Free Lunch in High-Resolution Cinematic Visual Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Haonan Qiu*, Ning Yu, Ziqi Huang, Paul Debevec, Ziwei Liu 핵심 연구 목표 기존 확산 모델이 낮은 해상도 데이터로 훈련되어 고해상도 시각 콘텐츠 생성 시 반복적인 패턴이나 흐릿함, 품질 저하 문제를 겪는 한계를 해결합니다. 논문은 UNet 및 DiT 기반 확산 모델 모두에서 튜닝-프리(tuning-free) 또는...","categories": ["Review"],
        "tags": ["Review","Diffusion Models","High-Resolution Generation","Image Generation","Video Generation","UNet Architecture","DiT Architecture","Scale Fusion","LoRA Fine-tuning"],
        "url": "/ai/review/2025-8-27-CineScale_Free_Lunch_in_High-Resolution_Cinematic_Visual_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] ClaimGen-CN: A Large-scale Chinese Dataset for Legal Claim Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Siying Zhou, Yiquan Wu, Hui Chen, Xavier Hu, Kun Kuang, Adam Jatowt, Ming Hu, Chunyan Zheng, Fei Wu 핵심 연구 목표 본 논문은 법률 전문가가 아닌 일반인(예: 원고)을 위한 법률 청구 생성(Legal Claim Generation) 문제에 주목하여, 주어진 사건의 사실(fact)을 바탕으로 청구 내용을 자동으로 생성하는...","categories": ["Review"],
        "tags": ["Review","Legal AI","Natural Language Processing","Claim Generation","Chinese Legal Dataset","Factuality","Clarity","Large Language Models","Zero-shot Evaluation"],
        "url": "/ai/review/2025-8-27-ClaimGen-CN_A_Large-scale_Chinese_Dataset_for_Legal_Claim_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Demystifying Scientific Problem-Solving in LLMs by Probing Knowledge and Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Alan Li, Yixin Liu, Arpan Sarkar, Doug Downey, Arman Cohan 핵심 연구 목표 본 논문은 LLM의 과학 문제 해결 능력에 있어 깊은 도메인 지식과 복잡한 추론 능력의 필요성을 강조하며, 이를 종합적으로 평가할 수 있는 통일된 벤치마크의 부재와 지식 및 추론의 역할을 체계적으로 분리하여 연구하는...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Scientific Reasoning","Knowledge Retrieval","Reasoning Probing","Benchmarks","Chain-of-Thought","Fine-tuning"],
        "url": "/ai/review/2025-8-27-Demystifying_Scientific_Problem-Solving_in_LLMs_by_Probing_Knowledge_and_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] FastMesh:Efficient Artistic Mesh Generation via Component Decoupling",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jeonghwan Kim, Yushi Lan, Armando Fortes, Yongwei Chen, Xingang Pan* 핵심 연구 목표 기존 메시 생성 방식이 토큰 시퀀스 내의 정점(vertex) 중복 사용으로 인해 발생하는 비효율성(과도한 토큰 길이, 느린 생성 프로세스)을 해결하고, 정점과 면(face)을 분리하여 처리함으로써 고품질의 예술적 메시를 더욱 효율적이고 빠르게 생성하는 것을...","categories": ["Review"],
        "tags": ["Review","3D Mesh Generation","Component Decoupling","Autoregressive Models","Bidirectional Transformer","Fidelity Enhancement","Prediction Filtering","Token Efficiency","Artistic Meshes"],
        "url": "/ai/review/2025-8-27-FastMeshEfficient_Artistic_Mesh_Generation_via_Component_Decoupling/",
        "teaser": null
      },{
        "title": "[논문리뷰] MovieCORE: COgnitive REasoning in Movies",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Gueter Josmy Faure, Min-Hung Chen, Jia-Fong Yeh, Ying Cheng, Hung-Ting Su, Yung-Hao Tang, Shang-Hong Lai, Winston H. Hsu 핵심 연구 목표 본 논문은 기존의 비디오 질의응답(VQA) 데이터셋이 표면적인 이해에 머무는 한계를 극복하고, 영화 콘텐츠에 대한 깊이 있는 인지적 이해와 System-2 사고를 유도하는 새로운 VQA...","categories": ["Review"],
        "tags": ["Review","Video Question Answering (VQA)","Cognitive Reasoning","System-2 Thinking","Multi-agent LLMs","Dataset Creation","Movie Understanding","Cinematic Content","Agentic Enhancement"],
        "url": "/ai/review/2025-8-27-MovieCORE_COgnitive_REasoning_in_Movies/",
        "teaser": null
      },{
        "title": "[논문리뷰] ObjFiller-3D: Consistent Multi-view 3D Inpainting via Video Diffusion Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Haitang Feng, Jie Liu, Jie Tang, Gangshan Wu, Beiqi Chen, Jianhuang Lai, Guangcong Wang 핵심 연구 목표 기존 3D 인페인팅 방법론들이 다중 뷰 2D 이미지 인페인팅에 의존하여 발생하는 뷰 간 불일치, 흐릿한 텍스처, 공간 불연속성 문제를 해결하고자 합니다. 이를 극복하고 비디오 확산 모델의 시공간적...","categories": ["Review"],
        "tags": ["Review","3D Inpainting","Multi-view Consistency","Video Diffusion Models","3D Object Completion","Generative Models","LoRA","3D Gaussian Splatting"],
        "url": "/ai/review/2025-8-27-ObjFiller-3D_Consistent_Multi-view_3D_Inpainting_via_Video_Diffusion_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] OmniHuman-1.5: Instilling an Active Mind in Avatars via Cognitive Simulation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jianwen Jiang, Chao Liang Wang, Weihong Zeng, Zerong Zheng, Jiaqi Yang, Liao, Han Liang, Yuan Zhang, Mingyuan Gao 핵심 연구 목표 기존 비디오 아바타 모델이 오디오 리듬에 국한된 물리적 애니메이션만 생성하는 한계를 넘어, 감정, 의도, 문맥을 깊이 이해하여 의미론적으로 일관되고 표현력이 풍부한 캐릭터 애니메이션을...","categories": ["Review"],
        "tags": ["Review","Video Avatar Generation","Cognitive Simulation","Multimodal Large Language Models (MLLMs)","Diffusion Transformers (DiT)","Multimodal Fusion","Human Motion Synthesis","Contextual Animation"],
        "url": "/ai/review/2025-8-27-OmniHuman-1.5_Instilling_an_Active_Mind_in_Avatars_via_Cognitive_Simulation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Optimal Sparsity of Mixture-of-Experts Language Models for Reasoning Tasks",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Taishi Nakamura, Satoki Ishikawa, Masaki Kawamura, Takumi Okamoto, Daisuke Nohara, Taishi-N324 핵심 연구 목표 본 논문은 MoE(Mixture-of-Experts) 언어 모델에서 스파시티(sparsity)가 기억(memorization) 능력과 추론(reasoning) 능력에 미치는 영향을 규명하고, 고정된 연산 예산(compute budget) 내에서 태스크별 최적의 스파시티 구성을 찾는 것을 목표로 합니다. 특히 기존의 밀집(dense) 모델...","categories": ["Review"],
        "tags": ["Review","Mixture-of-Experts (MoE)","Sparsity","Scaling Laws","Reasoning Tasks","Memorization","Large Language Models","Generalization Gap","Top-k Routing"],
        "url": "/ai/review/2025-8-27-Optimal_Sparsity_of_Mixture-of-Experts_Language_Models_for_Reasoning_Tasks/",
        "teaser": null
      },{
        "title": "[논문리뷰] Pixie: Fast and Generalizable Supervised Learning of 3D Physics from Pixels",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Long Le, Ryan Lucas, Chen Wang, Chuhao Chen, Dinesh Jayaraman, Eric Eaton, Lingjie Liu 핵심 연구 목표 이 논문은 기존 3D 장면 재구성 모델(예: NeRF, Gaussian Splatting)이 시각적 외형에만 집중하고 물리적 속성 예측에는 한계가 있는 문제를 해결하고자 합니다. 특히, 느리고 일반화되지 않는 기존의 물리적...","categories": ["Review"],
        "tags": ["Review","3D Physics Prediction","Supervised Learning","CLIP Features","Neural Radiance Fields","Material Point Method","PIXIEVERSE Dataset","Zero-Shot Generalization"],
        "url": "/ai/review/2025-8-27-Pixie_Fast_and_Generalizable_Supervised_Learning_of_3D_Physics_from_Pixels/",
        "teaser": null
      },{
        "title": "[논문리뷰] QueryBandits for Hallucination Mitigation: Exploiting Semantic Features for No-Regret Rewriting",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Nicole Cho, William Watson, Alec Koppel, Sumitra Ganesh, Manuela Veloso 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)의 환각 발생률 증가 문제를 해결하고자 합니다. 기존의 사후 필터링 방식 대신, 입력 쿼리의 17가지 언어학적 특징을 활용하는 밴딧 프레임워크를 통해 쿼리 재작성 전략을 설계하여, LLM이 환각을...","categories": ["Review"],
        "tags": ["Review","Hallucination Mitigation","Large Language Models","Contextual Bandits","Query Rewriting","Semantic Features","No-Regret Learning"],
        "url": "/ai/review/2025-8-27-QueryBandits_for_Hallucination_Mitigation_Exploiting_Semantic_Features_for_No-Regret_Rewriting/",
        "teaser": null
      },{
        "title": "[논문리뷰] ReportBench: Evaluating Deep Research Agents via Academic Survey Tasks",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Minghao Li, Ying Zeng, Zhihao Cheng, Cong Ma, Kai Jia 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM) 기반의 심층 연구(Deep Research) 에이전트가 생성하는 연구 보고서의 내용 품질을 체계적으로 평가하기 위한 벤치마크인 ReportBench를 제안합니다. 특히 인용된 문헌의 품질 및 관련성, 그리고 생성된 보고서 내...","categories": ["Review"],
        "tags": ["Review","Deep Research Agents","LLM Evaluation","Academic Survey","Factual Accuracy","Citation Verification","Report Generation","Benchmark","Hallucination"],
        "url": "/ai/review/2025-8-27-ReportBench_Evaluating_Deep_Research_Agents_via_Academic_Survey_Tasks/",
        "teaser": null
      },{
        "title": "[논문리뷰] Spacer: Towards Engineered Scientific Inspiration",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: zerojun48, kohandy, rallyduck1005, MoonRainy21, mhlee1022 핵심 연구 목표 Spacer는 기존 LLM의 한계인 제한된 창의성과 문맥 의존성을 극복하여 외부 개입 없이 창의적이고 사실에 기반한 과학적 개념을 생성하는 것을 목표로 합니다. 특히 “의도적인 비문맥화(deliberate decontextualization)” 접근법을 통해 키워드 간의 탐색되지 않은 연결에서 새로운 과학적 영감을 도출하고자...","categories": ["Review"],
        "tags": ["Review","Scientific Discovery","Large Language Models (LLMs)","Decontextualization","Keyword Graph","Multi-Agent System","Scientific Ideation","Research Automation","Inspiration Engine"],
        "url": "/ai/review/2025-8-27-Spacer_Towards_Engineered_Scientific_Inspiration/",
        "teaser": null
      },{
        "title": "[논문리뷰] ThinkDial: An Open Recipe for Controlling Reasoning Effort in Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Qianyu He, Siyu Yuan, Xuefeng Li, Mingxuan Wang, Jiangjie Chen 핵심 연구 목표 대규모 언어 모델(LLMs)의 CoT(Chain-of-Thought) 추론 능력은 뛰어나지만, 실제 배포 시 연산 비용을 효율적으로 제어하는 것이 어렵습니다. 이 연구는 OpenAI의 gpt-oss 시리즈와 유사하게 이산적인 운영 모드를 통해 추론 노력을 제어하는 기능을 오픈소스...","categories": ["Review"],
        "tags": ["Review","LLMs","Controllable Reasoning","Computational Efficiency","Reinforcement Learning","Supervised Fine-tuning","Reasoning Compression","Budget-Aware Training"],
        "url": "/ai/review/2025-8-27-ThinkDial_An_Open_Recipe_for_Controlling_Reasoning_Effort_in_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Training Language Model Agents to Find Vulnerabilities with CTF-Dojo",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Terry Yue Zhuo, Dingmin Wang, Hantian Ding, Varun Kumar, Zijian Wang 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM) 에이전트를 활용하여 사이버 보안 취약점을 자동으로 탐지하고 악용하는 것을 목표로 합니다. 특히, LLM 에이전트 훈련을 위한 확장 가능하고 검증 가능한 실행 기반 환경이 부족하다는 문제를...","categories": ["Review"],
        "tags": ["Review","LLM Agents","Cybersecurity","CTF Challenges","Vulnerability Detection","Execution Environments","Docker","Automated Training","Verifiable Feedback"],
        "url": "/ai/review/2025-8-27-Training_Language_Model_Agents_to_Find_Vulnerabilities_with_CTF-Dojo/",
        "teaser": null
      },{
        "title": "[논문리뷰] TreePO: Bridging the Gap of Policy Optimization and Efficacy and Inference Efficiency with Heuristic Tree-based Modeling",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhoufutu Wen, Qingshui Gu, zhangysk, aaabiao, yizhilll 핵심 연구 목표 대규모 언어 모델(LLMs)을 강화 학습(RL)으로 정렬하는 과정에서 발생하는 높은 온-정책 롤아웃 비용과 다양한 추론 경로 탐색의 한계를 해결하고자 합니다. 본 논문은 시퀀스 생성을 트리 구조 검색 과정으로 모델링하여 정책 최적화의 효율성과 추론 성능 간의...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Policy Optimization","Large Language Models","Inference Efficiency","Tree Search","Segment-level Decoding","Advantage Estimation","Reasoning"],
        "url": "/ai/review/2025-8-27-TreePO_Bridging_the_Gap_of_Policy_Optimization_and_Efficacy_and_Inference_Efficiency_with_Heuristic_Tree-based_Modeling/",
        "teaser": null
      },{
        "title": "[논문리뷰] UltraMemV2: Memory Networks Scaling to 120B Parameters with Superior Long-Context Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zihao Huang, Yu Bao, Qiyang Min, Siyan Chen, Ran Guo, Hongzhi Huang, Defa Zhu, Yutao Zeng, Banggu Wu, Xun Zhou, Siyuan Qiao 핵심 연구 목표 본 논문은 Mixture of Experts (MoE) 모델이 겪는 높은 메모리 접근 비용 문제를 해결하고, 기존 메모리 레이어 아키텍처인 UltraMem이...","categories": ["Review"],
        "tags": ["Review","Memory Networks","Mixture of Experts (MoE)","Long-Context Learning","Sparse Models","Transformer Architecture","LLMs","Efficient Inference"],
        "url": "/ai/review/2025-8-27-UltraMemV2_Memory_Networks_Scaling_to_120B_Parameters_with_Superior_Long-Context_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Unraveling the cognitive patterns of Large Language Models through module communities",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Kushal Raj Bhandari, Pin-Yu Chen, Jianxi Gao 핵심 연구 목표 본 논문은 LLM의 내부 아키텍처와 인지 과정을 이해하기 어려운 ‘블랙박스’ 문제를 해결하고자 합니다. 특히 기존 연구에서 부족했던 스킬 간의 관계, 동적 적응성, 교차 도메인 일반화 및 메커니즘의 상세한 해석 가능성 탐색에 중점을 둡니다. 생물학적...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Network Community Structure","Cognitive Skills","AI Interpretability","Module Communities","Fine-tuning","Neural Plasticity"],
        "url": "/ai/review/2025-8-27-Unraveling_the_cognitive_patterns_of_Large_Language_Models_through_module_communities/",
        "teaser": null
      },{
        "title": "[논문리뷰] VibeVoice Technical Report",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhiliang Peng, Jianwei Yu, Wenhui Wang, Yaoyao Chang, Yutao Sun, Li Dong, Yi Zhu, Weijiang Xu, Hangbo Bao, Zehua Wang, Shaohan Huang, Yan Xia, Furu Wei 핵심 연구 목표 본 논문은 기존 시스템의 한계로 남아있던 장문(long-form) 및 다중 화자(multi-speaker) 대화형 오디오 합성의 확장성, 자연스러운...","categories": ["Review"],
        "tags": ["Review","Speech Synthesis","Long-form Audio","Multi-speaker","Next-token Diffusion","Speech Tokenizer","Large Language Model","Variational Autoencoder","Audio Compression"],
        "url": "/ai/review/2025-8-27-VibeVoice_Technical_Report/",
        "teaser": null
      },{
        "title": "[논문리뷰] VoxHammer: Training-Free Precise and Coherent 3D Editing in Native 3D Space",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Lin Li, Zehuan Huang, Haoran Feng, Gengxiong Zhuang, Rui Chen, Chunchao Guo, Lu Sheng 핵심 연구 목표 본 논문은 기존 2D 이미지 기반의 3D 편집 방법론이 겪는 비일관성 및 비정밀성의 한계를 극복하고, 네이티브 3D 잠재 공간에서 훈련 없이(training-free) 정밀하고 일관성 있는 3D 로컬 편집을...","categories": ["Review"],
        "tags": ["Review","3D Editing","Training-Free","Diffusion Models","Latent Space","3D Inversion","Contextual Feature Replacement","3D Consistency","Edit3D-Bench"],
        "url": "/ai/review/2025-8-27-VoxHammer_Training-Free_Precise_and_Coherent_3D_Editing_in_Native_3D_Space/",
        "teaser": null
      },{
        "title": "[논문리뷰] Wan-S2V: Audio-Driven Cinematic Video Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: HumanAIGC Team, Tongyi Lab, Alibaba 핵심 연구 목표 본 연구는 기존 오디오 기반 캐릭터 애니메이션 모델이 복잡한 영화 및 TV 프로덕션 시나리오(미묘한 상호작용, 현실적인 신체 움직임, 다이내믹한 카메라 워크)에서 한계를 보이는 문제를 해결합니다. Wan-S2V 모델을 통해 오디오 입력을 기반으로 영화 수준의 캐릭터 애니메이션을 구현하고,...","categories": ["Review"],
        "tags": ["Review","Audio-Driven Video Generation","Cinematic Video","Diffusion Models","Transformer Architecture","Long Video Consistency","Human Animation","Multimodal Control","Data Curation"],
        "url": "/ai/review/2025-8-27-Wan-S2V_Audio-Driven_Cinematic_Video_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] AudioStory: Generating Long-Form Narrative Audio with Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuxin Guo, Teng Wang, Yuying Ge, Shijie Ma, Yixiao Ge, Wei Zou, Ying Shan 핵심 연구 목표 본 논문은 기존 Text-to-Audio (TTA) 모델들이 단편적인 오디오 클립 생성에는 뛰어나지만, 시간적 일관성과 구성적 추론 능력이 요구되는 장문 서술형 오디오(long-form narrative audio) 생성에서 겪는 한계를 해결하고자 합니다....","categories": ["Review"],
        "tags": ["Review","Text-to-Audio","Long-Form Audio Generation","Large Language Models","Narrative Reasoning","Diffusion Models","Multimodal AI","Progressive Training"],
        "url": "/ai/review/2025-8-28-AudioStory_Generating_Long-Form_Narrative_Audio_with_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Beyond Transcription: Mechanistic Interpretability in ASR",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Neta Glazer, Yael Segal-Feldman, Hilit Segev, Aviv Shamsian, Asaf Buchnick, Gill Hetz, Ethan Fetaya, Joseph Keshet, Aviv Navon 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)에서 성공적으로 적용된 메커니즘 해석 가능성(mechanistic interpretability) 기법을 음성 인식(ASR) 분야에 적용하여, 현대 ASR 시스템 및 대규모 오디오-언어 모델(LALM)의...","categories": ["Review"],
        "tags": ["Review","ASR","Mechanistic Interpretability","Logit Lens","Linear Probing","Activation Patching","Hallucinations","Repetitions","Encoder-Decoder"],
        "url": "/ai/review/2025-8-28-Beyond_Transcription_Mechanistic_Interpretability_in_ASR/",
        "teaser": null
      },{
        "title": "[논문리뷰] CODA: Coordinating the Cerebrum and Cerebellum for a Dual-Brain Computer Use Agent with Decoupled Reinforcement Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zeyi Sun, Yuhang Cao, Jianze Liang, Qiushi Sun, Ziyu Liu, Zhixiong Zhang, Yuhang Zang, Xiaoyi Dong, Kai Chen, Dahua Lin, Jiaqi Wang 핵심 연구 목표 GUI(Graphical User Interface) 기반 자율 에이전트의 핵심 난제인 장기 계획(long-horizon planning) 능력과 정밀한 미세 실행(fine-grained execution) 능력 사이의 고질적인...","categories": ["Review"],
        "tags": ["Review","GUI Agents","Reinforcement Learning","Planner-Executor Architecture","Decoupled Training","Large Vision-Language Models","Specialization","Generalization","Computer Use Agent"],
        "url": "/ai/review/2025-8-28-CODA_Coordinating_the_Cerebrum_and_Cerebellum_for_a_Dual-Brain_Computer_Use_Agent_with_Decoupled_Reinforcement_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] DeepScholar-Bench: A Live Benchmark and Automated Evaluation for Generative Research Synthesis",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Liana Patel, Negar Arabzadeh, Harshit Gupta, Ankita Sundar, Ion Stoica, Matei Zaharia, Carlos Guestrin 핵심 연구 목표 본 연구는 기존 질의응답 벤치마크나 수동 큐레이션 데이터셋의 한계를 극복하고, 생성형 연구 합성(Generative Research Synthesis) 시스템의 성능을 효과적으로 평가하기 위한 라이브 벤치마크와 자동화된 평가 프레임워크인 DeepScholar-Bench를 제안합니다....","categories": ["Review"],
        "tags": ["Review","Generative Research Synthesis","Live Benchmark","Automated Evaluation","LLM-as-a-judge","Related Work Generation","Retrieval-Augmented Generation","Verifiability"],
        "url": "/ai/review/2025-8-28-DeepScholar-Bench_A_Live_Benchmark_and_Automated_Evaluation_for_Generative_Research_Synthesis/",
        "teaser": null
      },{
        "title": "[논문리뷰] Diffusion Language Models Know the Answer Before Decoding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Pengxiang Li, Yefan Zhou, Dilxat Muhtar, Lu Yin, Shilin Yan, Li Shen, Yi Liang, Soroush Vosoughi, Shiwei Liu 핵심 연구 목표 본 논문은 확산 언어 모델(DLM)의 주요 단점인 느린 추론 속도를 해결하는 것을 목표로 합니다. 특히, 기존 DLM 디코딩 방식의 반복적인 정제 단계에서 발생하는...","categories": ["Review"],
        "tags": ["Review","Diffusion Language Models","DLM Acceleration","Early Answer Convergence","Early Commit Decoding","Confidence Gap","Inference Speedup","Training-Free"],
        "url": "/ai/review/2025-8-28-Diffusion_Language_Models_Know_the_Answer_Before_Decoding/",
        "teaser": null
      },{
        "title": "[논문리뷰] Discrete Diffusion VLA: Bringing Discrete Diffusion to Action Decoding in Vision-Language-Action Policies",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhixuan Liang, Yizhuo Li, Tianshuo Yang, Chengyue Wu, Sitong Mao, Jiangmiao Pang, Yao Mu, Ping Luo 핵심 연구 목표 본 논문은 기존 Vision-Language-Action (VLA) 모델 디코더의 한계(고정된 순서의 autoregressive 생성 또는 continuous diffusion/flow matching 헤드의 백본 분리)를 해결하고자 합니다. 통일되고 확장 가능한 아키텍처를 위해...","categories": ["Review"],
        "tags": ["Review","Vision-Language-Action (VLA)","Discrete Diffusion","Action Decoding","Transformer","Robot Control","Masked Modeling","Adaptive Decoding","Reinforcement Learning"],
        "url": "/ai/review/2025-8-28-Discrete_Diffusion_VLA_Bringing_Discrete_Diffusion_to_Action_Decoding_in_Vision-Language-Action_Policies/",
        "teaser": null
      },{
        "title": "[논문리뷰] Gaze into the Heart: A Multi-View Video Dataset for rPPG and Health Biomarkers Estimation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Konstantin Egorov, Stepan Botman, Pavel Blinov, Galina Zubkova, Anton Ivaschenko, Andrey Savchenko, Alexander Kolsanov 핵심 연구 목표 기존 rPPG(remote PhotoPlethysmoGraphy) 데이터셋의 한계(작은 규모, 사생활 침해 우려, 조건 다양성 부족, 접근 제한)를 극복하고, 원격 건강 모니터링 및 AI 의료 보조 시스템 개발을 가속화하기 위한 포괄적인...","categories": ["Review"],
        "tags": ["Review","rPPG","Multi-View Video Dataset","Health Biomarkers","Physiological Monitoring","Deep Learning","Telemedicine","Biosignals"],
        "url": "/ai/review/2025-8-28-Gaze_into_the_Heart_A_Multi-View_Video_Dataset_for_rPPG_and_Health_Biomarkers_Estimation/",
        "teaser": null
      },{
        "title": "[논문리뷰] MIDAS: Multimodal Interactive Digital-human Synthesis via Real-time Autoregressive Video Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ming Chen, Liyuan Cui, Wenyuan Zhang, Yan Zhou, Xiaohan Li, Xiaoqiang Liu, Pengfei Wan 핵심 연구 목표 본 논문은 다양한 입력 신호에 실시간으로 반응하며, 낮은 지연 시간과 높은 시각적 일관성을 유지하는 대화형 디지털 휴먼 비디오 생성 시스템을 구축하는 것을 목표로 합니다. 기존 방식의 높은...","categories": ["Review"],
        "tags": ["Review","Multimodal Generation","Digital Human Synthesis","Real-time Video Generation","Autoregressive LLM","Diffusion Models","Deep Compression Autoencoder","Exposure Bias Mitigation","Streaming Inference"],
        "url": "/ai/review/2025-8-28-MIDAS_Multimodal_Interactive_Digital-human_Synthesis_via_Real-time_Autoregressive_Video_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Mind the Third Eye! Benchmarking Privacy Awareness in MLLM-powered Smartphone Agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhixin Lin, Jungang Li, Shidong Pan, Yibo Shi, Yue Yao, Dongliang Xu 핵심 연구 목표 본 논문은 MLLM 기반 스마트폰 에이전트의 개인정보 보호 인식(Privacy Awareness) 능력을 체계적으로 평가하기 위한 최초의 대규모 벤치마크를 구축하고, 에이전트들이 민감한 사용자 정보에 접근할 때 적절한 개인정보 보호 조치를 취하는지...","categories": ["Review"],
        "tags": ["Review","Multimodal LLMs (MLLMs)","Smartphone Agents","Privacy Awareness","Benchmarking","Sensitive Data Detection","Risk Assessment","UI Automation"],
        "url": "/ai/review/2025-8-28-Mind_the_Third_Eye_Benchmarking_Privacy_Awareness_in_MLLM-powered_Smartphone_Agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] MotionFlux: Efficient Text-Guided Motion Generation through Rectified Flow Matching and Preference Alignment",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhiting Gao, Dan Song, Diqiong Jiang, Chao Xue, An-An Liu 핵심 연구 목표 본 논문은 기존 텍스트 기반 모션 생성 방법론이 겪는 언어적 설명과 모션 의미 간의 부정확한 정렬 및 느리고 비효율적인 다단계 추론 과정의 문제를 해결하고자 합니다. 궁극적으로 강력한 의미론적 정렬, 고품질 모션...","categories": ["Review"],
        "tags": ["Review","Text-Guided Motion Generation","Rectified Flow Matching","Preference Alignment","Human Motion Synthesis","Real-time AI","Transformer Architecture","Self-supervised Learning"],
        "url": "/ai/review/2025-8-28-MotionFlux_Efficient_Text-Guided_Motion_Generation_through_Rectified_Flow_Matching_and_Preference_Alignment/",
        "teaser": null
      },{
        "title": "[논문리뷰] Predicting the Order of Upcoming Tokens Improves Language Modeling",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zayd M. K. Zuhri, Erland Hilman Fuadi &amp; Alham Fikri Aji 핵심 연구 목표 기존 Multi-Token Prediction (MTP)이 정확한 미래 토큰 예측의 어려움으로 인해 보조 목표로서 불일치한 성능을 보이는 문제를 해결하고자 합니다. 본 논문은 NTP (Next-Token Prediction) 성능 향상을 위해 모델이 다가오는 토큰의 순서를...","categories": ["Review"],
        "tags": ["Review","Language Modeling","Next-Token Prediction","Multi-Token Prediction","Token Order Prediction","Auxiliary Objective","Learning-to-Rank","Transformer","Large Language Models"],
        "url": "/ai/review/2025-8-28-Predicting_the_Order_of_Upcoming_Tokens_Improves_Language_Modeling/",
        "teaser": null
      },{
        "title": "[논문리뷰] Self-Rewarding Vision-Language Model via Reasoning Decomposition",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zongxia Li, Wenhao Yu, Chengsong Huang, Zhenwen Liang, Rui Liu, et al. 핵심 연구 목표 Vision-Language Model (VLM)이 겪는 시각적 환각 및 언어적 지름길 문제를 해결하는 것을 목표로 합니다. 기존 VLM 훈련 방식이 외부 시각적 감독 부족으로 인해 발생하는 문제들을 극복하고, 외부 시각적 감독...","categories": ["Review"],
        "tags": ["Review","Vision-Language Models","Reinforcement Learning","Self-Rewarding","Reasoning Decomposition","Visual Perception","Language Reasoning","Hallucinations","Language Shortcuts"],
        "url": "/ai/review/2025-8-28-Self-Rewarding_Vision-Language_Model_via_Reasoning_Decomposition/",
        "teaser": null
      },{
        "title": "[논문리뷰] StepWiser: Stepwise Generative Judges for Wiser Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wei Xiong, Wenting Zhao, Weizhe Yuan, Olga Golovneva, Tong Zhang, Jason Weston, Sainbayar Sukhbaatar 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)이 복잡한 문제 해결을 위해 사용하는 다단계 추론(Chain-of-Thought) 전략에서 각 중간 단계의 논리적 유효성을 감독하는 과제를 해결하는 것을 목표로 합니다. 기존의 과정 보상...","categories": ["Review"],
        "tags": ["Review","LLM Reasoning","Process Reward Models","Reinforcement Learning","Generative Judges","Stepwise Feedback","Chain-of-Thought","Meta-Reasoning"],
        "url": "/ai/review/2025-8-28-StepWiser_Stepwise_Generative_Judges_for_Wiser_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Taming the Chaos: Coordinated Autoscaling for Heterogeneous and Disaggregated LLM Inference",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Rongzhi Li, Ruogu Du, Zefang Chu, Sida Zhao, Chunlei Han, Zuocheng Shi, Yiwen Shao, Huanle Han, Long Huang, Zherui Liu, Shufan Liu 핵심 연구 목표 전통적인 자동 스케일러가 Prefill-Decode (P/D) 분리형 아키텍처를 사용하는 대규모 언어 모델(LLM) 추론 환경에서 비효율적이라는 문제에 직면했습니다. 이로 인해 이기종...","categories": ["Review"],
        "tags": ["Review","LLM Inference","Autoscaling","Disaggregated Architecture","Heterogeneous Hardware","Resource Management","Topology-aware Scheduling","GPU Utilization"],
        "url": "/ai/review/2025-8-28-Taming_the_Chaos_Coordinated_Autoscaling_for_Heterogeneous_and_Disaggregated_LLM_Inference/",
        "teaser": null
      },{
        "title": "[논문리뷰] AWorld: Orchestrating the Training Recipe for Agentic AI",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chengyue Yu, Siyuan Lu, Chenyi Zhuang, Dong Wang, Qintong Wu, Zongyue Li, Runsheng Gan, Chunfeng Wang, Siqi Hou, Gaochi Huang, Wenlong Yan, Lifeng Hong, Aohui Xue, Yanfeng Wang, Jinjie Gu, David Tsai, Tao Lin 핵심 연구 목표 본 논문은 에이전트 AI 시스템 개발의 핵심...","categories": ["Review"],
        "tags": ["Review","Agentic AI","Reinforcement Learning","Distributed Systems","Experience Generation","LLM Fine-tuning","GAIA Benchmark","Scalability","AWORLD Framework"],
        "url": "/ai/review/2025-8-29-AWorld_Orchestrating_the_Training_Recipe_for_Agentic_AI/",
        "teaser": null
      },{
        "title": "[논문리뷰] CogVLA: Cognition-Aligned Vision-Language-Action Model via Instruction-Driven Routing & Sparsification",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wei Li, Renshan Zhang, Rui Shao, Jie He, Liqiang Nie 핵심 연구 목표 본 논문은 기존 Vision-Language-Action (VLA) 모델의 높은 계산 오버헤드와 모달리티 간의 의미론적 불일치(semantic fragmentation) 문제를 해결하여, VLA 모델의 확장성과 배포 가능성을 제한하는 요소를 극복하는 것을 목표로 합니다. 특히, 인간의 인지 과정을...","categories": ["Review"],
        "tags": ["Review","Vision-Language-Action Model","Sparsification","Instruction-Driven Routing","Cognition-Aligned AI","Robotics","Computational Efficiency","Multimodal AI"],
        "url": "/ai/review/2025-8-29-CogVLA_Cognition-Aligned_Vision-Language-Action_Model_via_Instruction-Driven_Routing_Sparsification/",
        "teaser": null
      },{
        "title": "[논문리뷰] Collaborative Multi-Modal Coding for High-Quality 3D Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ziang Cao, Zhaoxi Chen, Liang Pan, Ziwei Liu 핵심 연구 목표 본 논문은 기존 3D 생성 모델들이 단일 모달리티(예: RGB 이미지)에 의존하여 훈련 데이터의 범위가 제한되고 멀티모달 데이터의 상호 보완적 이점을 간과하는 문제를 해결하고자 합니다. RGB 이미지의 기하학적 모호성과 포인트 클라우드의 텍스처 부족이라는 한계를...","categories": ["Review"],
        "tags": ["Review","3D Generation","Multi-modal Learning","Diffusion Models","Triplane Representation","Collaborative Coding","Image-to-3D","Latent Space"],
        "url": "/ai/review/2025-8-29-Collaborative_Multi-Modal_Coding_for_High-Quality_3D_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Dress&Dance: Dress up and Dance as You Like It - Technical Preview",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jun-Kun Chen, Aayush Bansal, Minh Phuoc Vo, Yu-Xiong Wang 핵심 연구 목표 본 논문은 정적인 2D 이미지 기반의 가상 착용(virtual try-on) 방식과 기존 비디오 생성 모델의 한계를 극복하여, 사용자가 원하는 옷을 입고 특정 동작(춤)을 수행하는 고품질의 5초 길이, 1152x720 해상도, 24 FPS 가상 착용...","categories": ["Review"],
        "tags": ["Review","Virtual Try-On","Video Diffusion","Multi-modal Conditioning","Garment Transfer","Pose Animation","Generative AI","Fashion Tech","CondNet"],
        "url": "/ai/review/2025-8-29-DressDance_Dress_up_and_Dance_as_You_Like_It_-_Technical_Preview/",
        "teaser": null
      },{
        "title": "[논문리뷰] FakeParts: a New Family of AI-Generated DeepFakes",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Gaëtan Brison, Soobash Daiboo, Samy Aïmeur, Awais Hussain Sani, Xi Wang, Gianni Franchi, Vicky Kalogeiton 핵심 연구 목표 본 연구는 미묘하고 국소적인 조작이 가해져 탐지하기 어려운 새로운 형태의 딥페이크인 FakeParts를 정의하고, 기존 탐지 시스템의 한계를 극복하기 위해 포괄적인 벤치마크 데이터셋 FakePartsBench를 구축하는 것을 목표로...","categories": ["Review"],
        "tags": ["Review","Deepfake Detection","Partial Deepfakes","AI-Generated Video","Benchmark Dataset","Video Forensics","Generative Models","Manipulation Detection","Human Perception"],
        "url": "/ai/review/2025-8-29-FakeParts_a_New_Family_of_AI-Generated_DeepFakes/",
        "teaser": null
      },{
        "title": "[논문리뷰] MCP-Bench: Benchmarking Tool-Using LLM Agents with Complex Real-World Tasks via MCP Servers",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhenting Wang, Qi Chang, Hemani Patel, Shashank Biju, Cheng-En Wu, Quan Liu, Aolin Ding, Alireza Rezazadeh, Ankit Shah, Yujia Bao, Eugene Siow 핵심 연구 목표 이 논문은 기존 도구 사용 벤치마크의 한계를 극복하고, LLM 에이전트가 실제와 같은 복잡한 다단계 작업을 수행할 수 있도록 평가하는...","categories": ["Review"],
        "tags": ["Review","LLM Agents","Tool Use","Benchmarking","Model Context Protocol (MCP)","Cross-Domain Orchestration","Fuzzy Instructions","Multi-Step Tasks","Real-World Scenarios"],
        "url": "/ai/review/2025-8-29-MCP-Bench_Benchmarking_Tool-Using_LLM_Agents_with_Complex_Real-World_Tasks_via_MCP_Servers/",
        "teaser": null
      },{
        "title": "[논문리뷰] Mixture of Contexts for Long Video Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shengqu Cai, Ceyuan Yang, Lvmin Zhang, Yuwei Guo, Junfei Xiao, Ziyan Yang, Yinghao Xu, Zhenheng Yang, Alan Yuille, Leonidas Guibas, Maneesh Agrawala, Lu Jiang, Gordon Wetzstein 핵심 연구 목표 본 논문은 Diffusion Transformer (DiT) 기반의 장시간 비디오 생성 모델에서 발생하는 quadratic cost의 self-attention 문제로...","categories": ["Review"],
        "tags": ["Review","Long Video Generation","Diffusion Transformers (DiT)","Sparse Attention","Context Routing","Memory Management","Generative Models","Video Synthesis"],
        "url": "/ai/review/2025-8-29-Mixture_of_Contexts_for_Long_Video_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Multi-View 3D Point Tracking",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Frano Rajič, Haofei Xu, Marko Mihajlovic, Siyuan Li, Irem Demir, Emircan Gündoğdu, Lei Ke, Sergey Prokudin, Marc Pollefeys, Siyu Tang 핵심 연구 목표 본 논문은 기존 단안 카메라 트래커의 깊이 모호성 및 가림(occlusion) 문제나, 20개 이상의 카메라와 복잡한 최적화를 요구하는 기존 멀티 카메라 방식의...","categories": ["Review"],
        "tags": ["Review","3D Point Tracking","Multi-View","Transformer","kNN Correlation","Depth Estimation","Dynamic Scenes","Occlusion Handling","Feature Fusion"],
        "url": "/ai/review/2025-8-29-Multi-View_3D_Point_Tracking/",
        "teaser": null
      },{
        "title": "[논문리뷰] OnGoal: Tracking and Visualizing Conversational Goals in Multi-Turn Dialogue with Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Adam J Coscia, Shunan Guo, Eunyee Koh, Alex Endert 핵심 연구 목표 다중 턴 대화에서 대규모 언어 모델(LLM)과의 상호작용이 길고 복잡해짐에 따라, 사용자가 대화 목표 진행 상황을 효과적으로 평가하고 검토하는 데 겪는 어려움을 해결하는 것이 핵심 연구 목표입니다. 특히, 사용자가 불완전하게 지정되거나, 충돌하거나, 잊힌...","categories": ["Review"],
        "tags": ["Review","Large Language Models (LLMs)","Human-Computer Interaction (HCI)","Conversational AI","Goal Tracking","Visualization","Multi-Turn Dialogue","User Interface Design","Sensemaking"],
        "url": "/ai/review/2025-8-29-OnGoal_Tracking_and_Visualizing_Conversational_Goals_in_Multi-Turn_Dialogue_with_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] OneReward: Unified Mask-Guided Image Generation via Multi-Task Human Preference Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuan Gong, Xionghui Wang†, Jie Wu, Shiyin Wang, Yitong Wang, Xinglong Wu 핵심 연구 목표 논문은 마스크 기반 이미지 편집(Image Fill, Extend, Object Removal, Text Rendering)의 다양한 하위 태스크에서 기존 모델들의 제한적인 범용성과 태스크별 지도 학습 미세 조정(SFT) 의 비효율성을 해결하고자 합니다. 이를 위해...","categories": ["Review"],
        "tags": ["Review","Image Generation","Mask-Guided Editing","Reinforcement Learning","Human Preference Learning","Vision-Language Models","Multi-Task Learning","Flow Matching"],
        "url": "/ai/review/2025-8-29-OneReward_Unified_Mask-Guided_Image_Generation_via_Multi-Task_Human_Preference_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Persuasion Dynamics in LLMs: Investigating Robustness and Adaptability in Knowledge and Safety with DuET-PD",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Bryan Chen Zhengyu Tan, Daniel Wai Kit Chin, Zhengyuan Liu, Nancy F. Chen, Roy Ka-Wei Lee 핵심 연구 목표 본 연구는 LLM이 다중 턴 대화에서 잘못된 정보에 대한 설득 저항성(robustness)과 유효한 수정 사항에 대한 수용성(receptiveness) 사이의 균형을 유지하는 능력인 스탠스 변화 역학을 평가하고 개선하는...","categories": ["Review"],
        "tags": ["Review","Persuasion Dynamics","Large Language Models (LLMs)","Robustness","Gullibility","Receptiveness","Direct Preference Optimization (DPO)","Safety Alignment","Multi-turn Dialogue"],
        "url": "/ai/review/2025-8-29-Persuasion_Dynamics_in_LLMs_Investigating_Robustness_and_Adaptability_in_Knowledge_and_Safety_with_DuET-PD/",
        "teaser": null
      },{
        "title": "[논문리뷰] Pref-GRPO: Pairwise Preference Reward-based GRPO for Stable Text-to-Image Reinforcement Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yibin Wang, Zhimin Li, Yuhang Zang, Yujie Zhou, Jiazi Bu, Chunyu Wang, Qinglin Lu, Cheng Jin, Jiaqi Wang 핵심 연구 목표 본 논문은 텍스트-투-이미지(T2I) 생성에서 기존 GRPO(Group Relative Policy Optimization) 기반 강화 학습 방법론이 겪는 보상 해킹(reward hacking) 문제를 해결하고, 보다 안정적인 훈련 패러다임을...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Text-to-Image Generation","GRPO","Reward Hacking","Pairwise Preference","Reward Model","Stable Optimization","UniGenBench"],
        "url": "/ai/review/2025-8-29-Pref-GRPO_Pairwise_Preference_Reward-based_GRPO_for_Stable_Text-to-Image_Reinforcement_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Provable Benefits of In-Tool Learning for Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Sam Houliston, Ambroise Odonnat, Charles Arnal, Vivien Cabannes 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)에서 도구 사용 학습(in-tool learning) 방식이 내부 가중치 학습(in-weight learning) 방식보다 사실 정보 기억 및 회상에 있어 이론적, 실증적으로 우월함을 증명하는 것을 목표로 합니다. 특히, 모델 크기 대비 지식...","categories": ["Review"],
        "tags": ["Review","Large Language Models","In-Tool Learning","In-Weight Learning","Factual Recall","Retrieval-Augmented Generation","Scaling Laws","Parameter Efficiency","Catastrophic Forgetting"],
        "url": "/ai/review/2025-8-29-Provable_Benefits_of_In-Tool_Learning_for_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] ROSE: Remove Objects with Side Effects in Videos",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chenxuan Miao, Yutong Feng, Jianshu Zeng, Zixiang Gao, Hantang Liu, Yunfeng Yan, Donglian Qi, Xi Chen, Bin Wang, Hengshuang Zhao 핵심 연구 목표 기존 비디오 객체 제거 모델들이 객체의 그림자, 반사, 조명 변화 등 “측면 효과(side effects)”를 효과적으로 제거하지 못하는 문제를 해결하는 것이 목표입니다....","categories": ["Review"],
        "tags": ["Review","Video Object Removal","Side Effects","3D Rendering","Diffusion Transformer","Video Inpainting","Synthetic Data","Difference Mask"],
        "url": "/ai/review/2025-8-29-ROSE_Remove_Objects_with_Side_Effects_in_Videos/",
        "teaser": null
      },{
        "title": "[논문리뷰] TCIA: A Task-Centric Instruction Augmentation Method for Instruction Finetuning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Simin Ma, Shujian Liu, Jun Tan, Yebowen Hu, Song Wang, Sathish Reddy Indurthi, Sanqiang Zhao, Liwei Wu, Jianbing Han, Kaiqiang Song 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)의 효율적인 인스트럭션 튜닝을 위한 다양하고 실세계에 적합한 인스트럭션 데이터를 구축하는 문제를 해결하고자 합니다. 기존 자동...","categories": ["Review"],
        "tags": ["Review","Instruction Augmentation","Fine-tuning","Large Language Models","Task-Centric","Data Diversity","Task Alignment","Breadth-First Search","Constraint Generation"],
        "url": "/ai/review/2025-8-29-TCIA_A_Task-Centric_Instruction_Augmentation_Method_for_Instruction_Finetuning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Turning the Spell Around: Lightweight Alignment Amplification via Rank-One Safety Injection",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Harethah Abu Shairah, Hasan Abed Al Kader Hammoud, George Turkiyyah, Bernard Ghanem 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)의 안전 정렬(safety alignment)이 특정 내부 표현 방향에 의해 매개되며 우회될 수 있다는 기존 연구를 바탕으로, 정반대로 안전 정렬을 강화하는 새로운 방법을 제안합니다. 특히, 모델의...","categories": ["Review"],
        "tags": ["Review","LLM Safety","Alignment Amplification","Rank-One Update","Mechanistic Interpretability","Weight Steering","Jailbreak Robustness","Fine-tuning-free","Safety Injection"],
        "url": "/ai/review/2025-8-29-Turning_the_Spell_Around_Lightweight_Alignment_Amplification_via_Rank-One_Safety_Injection/",
        "teaser": null
      },{
        "title": "[논문리뷰] USO: Unified Style and Subject-Driven Generation via Disentangled and Reward Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shaojin Wu, Mengqi Huang, Yufeng Cheng, Wenxu Wu, Jiahe Tian, Yiming Luo, Fei Ding, Qian He 핵심 연구 목표 본 논문은 스타일 기반 생성(style-driven generation)과 주제 기반 생성(subject-driven generation)이 기존에 별개의 태스크로 다뤄져 상충되는 문제를 해결하고자 합니다. 궁극적으로 콘텐츠와 스타일의 효과적인 분리(disentanglement)와 재구성(re-composition)을 통해...","categories": ["Review"],
        "tags": ["Review","Style-Driven Generation","Subject-Driven Generation","Disentangled Representation","Reward Learning","Cross-Task Learning","Diffusion Models","Image Customization","Unified Framework"],
        "url": "/ai/review/2025-8-29-USO_Unified_Style_and_Subject-Driven_Generation_via_Disentangled_and_Reward_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] rStar2-Agent: Agentic Reasoning Technical Report",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ning Shang, Yifei Liu, Yi Zhu, Li Lyna Zhang, Weijiang Xu, Xinyu Guan, Buze Zhang, Bingcheng Dong, Xudong Zhou, Bowen Zhang, Ying Xin, Ziming Miao, Scarlett Li, Fan Yang, Mao Yang 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)이 복잡한 수학 추론에서 “더 길게...","categories": ["Review"],
        "tags": ["Review","Agentic Reinforcement Learning","Math Reasoning","Code Interpreter","Tool Use","GRPO-RoC","LLM Training Efficiency","Self-Reflection"],
        "url": "/ai/review/2025-8-29-rStar2-Agent_Agentic_Reasoning_Technical_Report/",
        "teaser": null
      },{
        "title": "[논문리뷰] A.S.E: A Repository-Level Benchmark for Evaluating Security in AI-Generated Code",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Keke Lian, Bing Wang, Lei Zhang, Libo Chen, Junjie Wang, Ziming Zhao, Yujiu Yang, Haotong Duan, Haoran Zhao, Shuang Liao, Mingda Guo, Jiazheng Quan, Yilu Zhong, Chenhao He, Zichuan Chen, Jie Wu, Haoling Li, Zhaoxuan Li, Jiongchi Yu, Hui Li, Dong Zhang 핵심 연구...","categories": ["Review"],
        "tags": ["Review","AI-Generated Code Security","LLM Evaluation","Repository-Level Benchmark","Code Security","Vulnerability Detection","Static Analysis","Reproducibility","Context-Awareness"],
        "url": "/ai/review/2025-9-1-A.S.E_A_Repository-Level_Benchmark_for_Evaluating_Security_in_AI-Generated_Code/",
        "teaser": null
      },{
        "title": "[논문리뷰] AHELM: A Holistic Evaluation of Audio-Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Tony Lee, Haoqin Tu, Chi Heem Wong, Yuyin Zhou, Zijun Wang, Siwei Yang, Yifan Mai, Cihang Xie, Percy Liang 핵심 연구 목표 오디오-언어 모델(ALMs)의 표준화된 벤치마크 부족 문제를 해결하고, 기존 평가들이 제한된 기능에만 초점을 맞추며 공정성 및 안전성 같은 중요한 측면을 간과하는 한계를 극복하는...","categories": ["Review"],
        "tags": ["Review","Audio-Language Models","Holistic Evaluation","Benchmarking","Multimodality","Fairness","Robustness","Reasoning","Bias Detection"],
        "url": "/ai/review/2025-9-1-AHELM_A_Holistic_Evaluation_of_Audio-Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] A Survey of Scientific Large Language Models: From Data Foundations to Agent Frontiers",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiamin Wu, Wanghan Xu, Wei Li, Chenglong Ma, Ming Hu 핵심 연구 목표 이 논문은 과학 분야 대규모 언어 모델(Sci-LLMs)의 발전 과정을 데이터 기반과 에이전트 프론티어 관점에서 종합적으로 분석하는 것을 목표로 합니다. 특히, Sci-LLMs가 일반 자연어 처리(NLP) 데이터셋과 다른 복잡한 과학 데이터의 특성(다중 모달,...","categories": ["Review"],
        "tags": ["Review","Scientific LLMs","AI for Science","Scientific Data","Agentic AI","Multimodal Integration","Knowledge Representation","Autonomous Discovery","Data Ecosystems"],
        "url": "/ai/review/2025-9-1-A_Survey_of_Scientific_Large_Language_Models_From_Data_Foundations_to_Agent_Frontiers/",
        "teaser": null
      },{
        "title": "[논문리뷰] CLIPSym: Delving into Symmetry Detection with CLIP",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Tinghan Yang, Md Ashiqur Rahman, Raymond A. Yeh 핵심 연구 목표 본 논문은 기존 대규모 비전-언어 모델(Vision-Language Models, VLMs)인 CLIP을 활용하여 이미지 내의 반사 및 회전 대칭을 더욱 정확하고 견고하게 탐지하는 것을 목표로 합니다. 특히, CLIP이 대규모 데이터셋 학습을 통해 획득한 시맨틱 정보와 일반화...","categories": ["Review"],
        "tags": ["Review","Symmetry Detection","Vision-Language Models","CLIP","Equivariant Networks","Prompt Engineering","Geometric Deep Learning"],
        "url": "/ai/review/2025-9-1-CLIPSym_Delving_into_Symmetry_Detection_with_CLIP/",
        "teaser": null
      },{
        "title": "[논문리뷰] Droplet3D: Commonsense Priors from Videos Facilitate 3D Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiaochuan Li, Guoguang Du, Runze Zhang, Liang Jin, Qi Jia, Lihua Lu, Zhenhua Guo, Yaqian Zhao, Haiyang Liu, Tianqi Wang, Changsheng Li, Xiaoli Gong, Rengang Li, Baoyu Fan 핵심 연구 목표 3D 데이터 부족 문제를 해결하기 위해 대규모 비디오 데이터에서 얻은 상식 사전(commonsense priors)을...","categories": ["Review"],
        "tags": ["Review","3D Generation","Video Diffusion Models","Spatial Consistency","Semantic Knowledge","Multi-view Synthesis","Large-scale Dataset","Image-to-3D","Text-to-3D"],
        "url": "/ai/review/2025-9-1-Droplet3D_Commonsense_Priors_from_Videos_Facilitate_3D_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Efficient Code Embeddings from Code Generation Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Daria Kryvosheieva, Saba Sturua, Michael Günther, Scott Martens, Han Xiao 핵심 연구 목표 본 논문은 기존 코드 임베딩 모델들이 겪는 지도 학습 데이터 부족 문제와 대규모 비정렬 코드/자연어 데이터의 활용 미흡을 해결하고자 합니다. 이를 위해 사전 훈련된 코드 생성 LLM을 활용하여 효율적이고 고성능의 코드...","categories": ["Review"],
        "tags": ["Review","Code Embeddings","Code Generation Models","Autoregressive Backbones","Last-Token Pooling","Instruction Tuning","Contrastive Learning","Retrieval-Augmented Generation","MTEB Benchmark"],
        "url": "/ai/review/2025-9-1-Efficient_Code_Embeddings_from_Code_Generation_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] EmbodiedOneVision: Interleaved Vision-Text-Action Pretraining for General Robot Control",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Delin Qu, Haoming Song, Qizhi Chen, Zhaoqing Chen, Xianqiang Gao*, Modi Shi, Guanghui Ren, Maoqing Yao, Bin Zhao, Dong Wang 핵심 연구 목표 본 연구는 기존 VLA 모델들이 가진 제한된 도메인 및 유연성 문제를 해결하고, 개방형 환경에서 인간 수준의 유연한 다중 모달 추론 및...","categories": ["Review"],
        "tags": ["Review","Embodied AI","Robot Control","Vision-Language-Action Models","Multimodal Pretraining","Flow Matching","Foundation Models","Generalization","Real-world Robotics"],
        "url": "/ai/review/2025-9-1-EmbodiedOneVision_Interleaved_Vision-Text-Action_Pretraining_for_General_Robot_Control/",
        "teaser": null
      },{
        "title": "[논문리뷰] HERMES: Human-to-Robot Embodied Learning from Multi-Source Motion Data for Mobile Dexterous Manipulation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Tianhai Liang, Pu Hua, Langzhe Gu, Tianming Wei, Zhecheng Yuan 핵심 연구 목표 이 논문은 복잡한 다지(multi-fingered) 로봇 핸드를 활용한 모바일 양손 로봇 조작(mobile bimanual dexterous manipulation)에서 다양한 소스의 인간 동작 데이터를 실제 로봇 행동으로 효과적으로 변환하는 도전 과제를 해결하는 것을 목표로 합니다. 특히,...","categories": ["Review"],
        "tags": ["Review","Dexterous Manipulation","Mobile Manipulation","Human-to-Robot Learning","Sim2Real","Reinforcement Learning","Depth Image","Visual Localization","Bimanual Control"],
        "url": "/ai/review/2025-9-1-HERMES_Human-to-Robot_Embodied_Learning_from_Multi-Source_Motion_Data_for_Mobile_Dexterous_Manipulation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Mimicking the Physicist's Eye:A VLM-centric Approach for Physics Formula Discovery",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiaqi Liu, Songning Lai, Pengze Li, Di Yu, Wenjie Zhou 핵심 연구 목표 본 논문은 기존의 단일 모달(symbolic regression 또는 LLM) 접근법이 물리학자들이 현상학적 시각적 표현을 활용하는 점을 간과하여 동적 현상 내재의 시공간 패턴을 해석하는 능력이 약하다는 문제를 해결하고자 합니다. 물리학자의 관점을 모방하여 시각적...","categories": ["Review"],
        "tags": ["Review","Physics Formula Discovery","Multimodal AI","Vision-Language Models","Symbolic Regression","Causal Chain of Thought","Reinforcement Learning","Agentic AI"],
        "url": "/ai/review/2025-9-1-Mimicking_the_Physicists_EyeA_VLM-centric_Approach_for_Physics_Formula_Discovery/",
        "teaser": null
      },{
        "title": "[논문리뷰] Morae: Proactively Pausing UI Agents for User Choices",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yi-Hao Peng, Dingzeyu Li, Jeffrey P. Bigham, Amy Pavel 핵심 연구 목표 본 논문은 기존 UI 에이전트들이 맹인 및 저시력(BLV) 사용자들에게 중요한 의사결정 시 선택권을 주지 않고 자동으로 작업을 완료하여 사용자 주도성을 저해하는 문제를 해결하고자 합니다. Morae는 BLV 사용자가 UI 자동화 과정에서 적극적으로 선호를...","categories": ["Review"],
        "tags": ["Review","UI Agents","Accessibility","Human-Agent Interaction","Mixed-Initiative AI","Large Multimodal Models","Proactive AI","User Choice","Blind and Low-Vision Users"],
        "url": "/ai/review/2025-9-1-Morae_Proactively_Pausing_UI_Agents_for_User_Choices/",
        "teaser": null
      },{
        "title": "[논문리뷰] R-4B: Incentivizing General-Purpose Auto-Thinking Capability in MLLMs via Bi-Mode Annealing and Reinforce Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Han Hu, Shiming Xiang, Bolin Ni, Qi Yang, Jie Jiang 핵심 연구 목표 본 논문은 복잡한 추론 문제에서 뛰어난 성능을 보이는 기존 MLLM의 step-by-step 사고(thinking) 과정이 단순 문제에서는 불필요한 연산 오버헤드를 유발하는 비효율성을 해결하고자 합니다. 이를 위해 문제 복잡도에 따라 사고 모드 활성화 여부를...","categories": ["Review"],
        "tags": ["Review","Multimodal Large Language Models (MLLMs)","Auto-Thinking","Reinforcement Learning (RL)","Bi-mode Annealing","Bi-mode Policy Optimization (BPO)","General-Purpose AI","Reasoning","Efficiency"],
        "url": "/ai/review/2025-9-1-R-4B_Incentivizing_General-Purpose_Auto-Thinking_Capability_in_MLLMs_via_Bi-Mode_Annealing_and_Reinforce_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] TalkVid: A Large-Scale Diversified Dataset for Audio-Driven Talking Head Synthesis",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shunian Chen, Hejin Huang, Yexin Liu, Zihan Ye, Pengcheng Chen, Chenghao Zhu, Michael Guan, Rongsheng Wang, Junying Chen, Guanbin Li, Ser-Nam Lim, Harry Yang, Benyou Wang 핵심 연구 목표 기존 오디오 기반 Talking Head 합성 모델들이 인종, 언어, 연령대 등 다양한 인간 특성에 대한...","categories": ["Review"],
        "tags": ["Review","Audio-Driven Talking Head Synthesis","Large-Scale Dataset","Data Diversity","Data Curation","Evaluation Benchmark","Generalization Gap","Algorithmic Fairness"],
        "url": "/ai/review/2025-9-1-TalkVid_A_Large-Scale_Diversified_Dataset_for_Audio-Driven_Talking_Head_Synthesis/",
        "teaser": null
      },{
        "title": "[논문리뷰] Think in Games: Learning to Reason in Games via Reinforcement Learning with Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yi Liao, Yu Gu, Yuan Sui, Zining Zhu, Yifan Lu, Guohua Tang, Zhongqian Sun, Wei Yang 핵심 연구 목표 대규모 언어 모델(LLM)이 복잡한 추론 작업에는 능숙하지만, 인간 아이들이 쉽게 수행하는 간단한 상호작용 작업에서는 어려움을 겪는 문제를 해결하고자 합니다. 이는 선언적 지식(무엇을 아는지)과 절차적 지식(어떻게...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Reinforcement Learning","Game AI","Procedural Knowledge","Declarative Knowledge","Explainable AI","Strategic Decision-Making"],
        "url": "/ai/review/2025-9-1-Think_in_Games_Learning_to_Reason_in_Games_via_Reinforcement_Learning_with_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] TiKMiX: Take Data Influence into Dynamic Mixture for Language Model Pre-training",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yifan Wang, Binbin Liu, Fengze Liu, Yuanfan Guo, Jiyao Deng, Xuecheng Wu, Weidong Zhou, Xiaohuan Zhou*, Taifeng Wang 핵심 연구 목표 언어 모델 사전 훈련 과정에서 고정된 데이터 혼합 전략은 모델의 학습 선호도가 동적으로 변화함에 따라 최적의 성능을 달성하지 못합니다. 본 논문은 이러한 진화하는...","categories": ["Review"],
        "tags": ["Review","Language Model Pre-training","Dynamic Data Mixing","Data Influence","Group Influence","Optimization","Regression Model","LLM Training"],
        "url": "/ai/review/2025-9-1-TiKMiX_Take_Data_Influence_into_Dynamic_Mixture_for_Language_Model_Pre-training/",
        "teaser": null
      },{
        "title": "[논문리뷰] UItron: Foundational GUI Agent with Advanced Perception and Planning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhixiong Zeng, Jing Huang, Liming Zheng, Wenkang Han, Yufeng Zhong 핵심 연구 목표 이 논문은 Mobile/PC 환경에서 복잡한 작업을 자동화하는 GUI 에이전트의 핵심 역량을 강화하는 오픈소스 파운데이션 모델, Ultron을 제시합니다. 기존 GUI 에이전트의 개발을 저해했던 희소한 작업 궤적 데이터, 인터랙티브 인프라 부족, 파운데이션 모델의...","categories": ["Review"],
        "tags": ["Review","GUI Agent","Foundational Model","Multimodal LLM","Perception","Planning","Reinforcement Learning","Data Engineering","Chinese App Scenarios"],
        "url": "/ai/review/2025-9-1-UItron_Foundational_GUI_Agent_with_Advanced_Perception_and_Planning/",
        "teaser": null
      },{
        "title": "[논문리뷰] From reactive to cognitive: brain-inspired spatial intelligence for embodied agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shouwei Ruan, Liyuan Wang, Caixin Kang, Qihui Zhu, Songming Liu, Xingxing Wei, Hang Su 핵심 연구 목표 본 논문은 기존의 반응적(reactive) 접근 방식이 가진 공간 기억의 부재와 그로 인한 복잡한 실세계 환경에서의 일반화 및 적응성 부족 문제를 해결하는 것을 목표로 합니다. 생물학적 뇌의 공간...","categories": ["Review"],
        "tags": ["Review","Spatial Cognition","Embodied Agents","Brain-inspired AI","Cognitive Map","Spatial Memory","MLLMs","Navigation"],
        "url": "/ai/review/2025-9-2-From_reactive_to_cognitive_brain-inspired_spatial_intelligence_for_embodied_agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] How Can Input Reformulation Improve Tool Usage Accuracy in a Complex Dynamic Environment? A Study on τ-bench",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Venkatesh Mishra, Jayanth Srinivasa, Amir Saeidi, Satyam Raj, Mutsumi Nakamura, Gaowen Liu, Ali Payani, Chitta Baral 핵심 연구 목표 본 논문은 복잡하고 동적인 다중 턴 환경(예: τ-bench)에서 대규모 언어 모델(LLM) 에이전트가 도구를 사용하는 과정에서 발생하는 일관성 없는 추론, 도메인 정책 미준수, 장기적인 정보 추출...","categories": ["Review"],
        "tags": ["Review","LLM Agents","Tool Use","Function Calling","Input Reformulation","Dynamic Environments","τ-bench","Context Engineering","Multi-Agent Framework"],
        "url": "/ai/review/2025-9-2-How_Can_Input_Reformulation_Improve_Tool_Usage_Accuracy_in_a_Complex_Dynamic_Environment_A_Study_on_%CF%84-bench/",
        "teaser": null
      },{
        "title": "[논문리뷰] No Label Left Behind: A Unified Surface Defect Detection Model for all Supervision Regimes",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Blaž Rolih, Matic Fučka, Danijel Skočaj 핵심 연구 목표 본 논문은 기존 표면 결함 감지 모델들이 특정 감독 시나리오에 제한되거나 다양한 데이터 주석 유형(비지도, 약지도, 혼합, 완전 지도)에 적응하기 어려운 문제를 해결하고자 합니다. 모든 감독 체제에서 사용 가능한 모든 데이터 주석을 효과적으로 활용할 수...","categories": ["Review"],
        "tags": ["Review","Surface Defect Detection","Anomaly Detection","Mixed Supervision","Deep Learning","Industrial Inspection","Unified Model"],
        "url": "/ai/review/2025-9-2-No_Label_Left_Behind_A_Unified_Surface_Defect_Detection_Model_for_all_Supervision_Regimes/",
        "teaser": null
      },{
        "title": "[논문리뷰] PVPO: Pre-Estimated Value-Based Policy Optimization for Agentic Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wenfeng Feng, Penghong Zhao, Guochao Jiang, Chuzhan Hao, Yuewei Zhang, Hao Wang 핵심 연구 목표 본 연구는 에이전트 추론(agentic reasoning)을 위한 critic-free 강화 학습 방법론, 특히 그룹 정책(group policies)의 한계를 해결하는 것을 목표로 합니다. 기존 방식은 이점(advantage) 추정을 위해 과도한 샘플링과 비교에 의존하여 계산...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Critic-Free RL","Agentic Reasoning","Policy Optimization","Large Language Models (LLMs)","Advantage Estimation","Group Sampling","Static Value Estimation"],
        "url": "/ai/review/2025-9-2-PVPO_Pre-Estimated_Value-Based_Policy_Optimization_for_Agentic_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] T2R-bench: A Benchmark for Generating Article-Level Reports from Real World Industrial Tables",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yu Zhao, Sishi Xiong, Kaiwen Wei, Changzai Pan, Jie Zhang 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)의 테이블 추론 능력을 산업 애플리케이션에 적용하는 데 있어, 테이블 정보를 포괄적인 보고서로 변환하는 핵심 과제를 해결하고자 합니다. 특히, 복잡하고 다양한 테이블로 인한 추론 성능 저하와 기존...","categories": ["Review"],
        "tags": ["Review","Table-to-Report Generation","Large Language Models (LLMs)","Benchmark Dataset","Industrial Applications","Table Reasoning","Evaluation Metrics","Real-world Data"],
        "url": "/ai/review/2025-9-2-T2R-bench_A_Benchmark_for_Generating_Article-Level_Reports_from_Real_World_Industrial_Tables/",
        "teaser": null
      },{
        "title": "[논문리뷰] UI-Level Evaluation of ALLaM 34B: Measuring an Arabic-Centric LLM via HUMAIN Chat",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Omer Nacar 핵심 연구 목표 본 연구는 영어 중심 LLM들이 아랍어의 언어적, 문화적 뉘앙스를 포착하는 데 어려움을 겪는 문제를 해결하기 위해 개발된 ALLaM 34B 모델에 대한 포괄적인 UI-레벨 평가를 수행하는 것을 목표로 합니다. HUMAIN Chat을 통해 실제 사용자 경험을 반영한 평가를 진행하여, ALLaM 34B가...","categories": ["Review"],
        "tags": ["Review","Arabic LLM","UI-level Evaluation","ALLaM 34B","HUMAIN Chat","Dialectal Arabic","LLM as a Judge","Safety Evaluation"],
        "url": "/ai/review/2025-9-2-UI-Level_Evaluation_of_ALLaM_34B_Measuring_an_Arabic-Centric_LLM_via_HUMAIN_Chat/",
        "teaser": null
      },{
        "title": "[논문리뷰] AMBEDKAR-A Multi-level Bias Elimination through a Decoding Approach with Knowledge Augmentation for Robust Constitutional Alignment of Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Snehasis Mukhopadhyay, Aryan Kasat, Shivam Dubey, Rahul Karthikeyan, Dhruv Sood, Vinija Jain, Aman Chadha, Amitava Das 핵심 연구 목표 대규모 언어 모델(LLMs)이 학습 데이터에서 발생하는 사회적 편향, 특히 인도 사회의 카스트 및 종교 관련 편향을 반영하여 유해하거나 편향된 출력을 생성하는 문제를 해결하고자 합니다. 서구...","categories": ["Review"],
        "tags": ["Review","Bias Mitigation","Large Language Models","Speculative Decoding","Constitutional AI","Fairness","Inference-Time Control","Indian Sociocultural Context"],
        "url": "/ai/review/2025-9-3-AMBEDKAR-A_Multi-level_Bias_Elimination_through_a_Decoding_Approach_with_Knowledge_Augmentation_for_Robust_Constitutional_Alignment_of_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Attributes as Textual Genes: Leveraging LLMs as Genetic Algorithm Simulators for Conditional Synthetic Data Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Guangzeng Han, Weisi Liu, Xiaolei Huang 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)을 활용한 합성 데이터 생성 시 품질과 다양성 확보의 어려움을 해결하는 것을 목표로 합니다. 특히, 하류 태스크 훈련의 견고성을 높이기 위해 데이터 다양성과 생성기 적응성을 자동으로 증폭할 수 있는 프레임워크를 제안합니다....","categories": ["Review"],
        "tags": ["Review","Synthetic Data Generation","Large Language Models (LLMs)","Genetic Algorithms","Textual Data Augmentation","Active Learning","NLP","Data Diversity"],
        "url": "/ai/review/2025-9-3-Attributes_as_Textual_Genes_Leveraging_LLMs_as_Genetic_Algorithm_Simulators_for_Conditional_Synthetic_Data_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Baichuan-M2: Scaling Medical Capability with Large Verifier System",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jayok6, yuanshuai, sdujq, anselcmy, fairyang 핵심 연구 목표 의료 분야 LLM이 USMLE 같은 정적 벤치마크에서는 우수하지만 실제 임상 환경의 동적, 상호작용적 특성을 포착하지 못해 발생하는 성능 격차를 해소하는 것이 목표입니다. 이를 위해, 실제 임상 적용과 LLM의 역량을 정렬할 수 있는 동적 검증 프레임워크와 이를...","categories": ["Review"],
        "tags": ["Review","Medical AI","LLM","Reinforcement Learning","Verifier System","Patient Simulator","Clinical Rubrics","Baichuan-M2","HealthBench"],
        "url": "/ai/review/2025-9-3-Baichuan-M2_Scaling_Medical_Capability_with_Large_Verifier_System/",
        "teaser": null
      },{
        "title": "[논문리뷰] Benchmarking Optimizers for Large Language Model Pretraining",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Andrei Semenov, Matteo Pagliardini, Martin Jaggi 핵심 연구 목표 대규모 언어 모델(LLM) 사전 훈련을 위한 최신 옵티마이저들의 성능을 표준화된 시나리오에서 종합적으로 평가하고 비교하는 것을 목표로 합니다. 기존의 파편화된 평가 프로토콜로 인해 옵티마이저 간 직접 비교가 어렵다는 문제점을 해결하고, 실무자와 연구자에게 실용적인 가이드라인을 제공하고자 합니다....","categories": ["Review"],
        "tags": ["Review","LLM Optimizers","Benchmarking","Hyperparameter Tuning","AdamW","AdEMAMix","MARS","Mixture of Experts (MoE)","Weight Decay"],
        "url": "/ai/review/2025-9-3-Benchmarking_Optimizers_for_Large_Language_Model_Pretraining/",
        "teaser": null
      },{
        "title": "[논문리뷰] C-DiffDet+: Fusing Global Scene Context with Generative Denoising for High-Fidelity Object Detection",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Abdellah Zakaria Sellam, Ilyes Benaissa, Salah Eddine Bekhouche, Abdenour Hadid, Vito Renó, Cosimo Distante 핵심 연구 목표 본 논문은 자동차 손상 평가와 같은 미세하고 컨텍스트에 의존적인 시나리오에서 객체 탐지의 한계를 극복하는 것을 목표로 합니다. 특히, 기존 DiffusionDet 모델이 로컬 특징 조건화에만 의존하여 발생하는 탐지...","categories": ["Review"],
        "tags": ["Review","Object Detection","Diffusion Model","Global Scene Context","Context-Aware Fusion","Fine-grained Detection","Automotive Damage Assessment","Generative Denoising","Cross-Attention"],
        "url": "/ai/review/2025-9-3-C-DiffDet_Fusing_Global_Scene_Context_with_Generative_Denoising_for_High-Fidelity_Object_Detection/",
        "teaser": null
      },{
        "title": "[논문리뷰] DCPO: Dynamic Clipping Policy Optimization",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shihui Yang, Chengfeng Dou, Peidong Guo, Kai Lu, Qiang Ju, Fei Deng, Rihui Xin 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)의 추론 능력을 향상시키기 위한 Verifiable Rewards 기반의 강화 학습(RLVR)에서 발생하는 기존 방법론(예: GRPO)의 한계를 해결하는 것을 목표로 합니다. 특히, 고정된 클리핑 바운드로...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","LLM","Policy Optimization","Dynamic Clipping","Advantage Standardization","RLVR","Reasoning"],
        "url": "/ai/review/2025-9-3-DCPO_Dynamic_Clipping_Policy_Optimization/",
        "teaser": null
      },{
        "title": "[논문리뷰] Discrete Noise Inversion for Next-scale Autoregressive Text-based Image Editing",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Quan Dao, Ngan Hoai Nguyen, Ligong Han, Xiaoxiao He, Amin Heyrani Nobari 핵심 연구 목표 본 연구는 시각적 자기회귀(VAR) 모델에서 추가 훈련 없이 프롬프트 기반 이미지 편집 기능을 구현하는 것을 목표로 합니다. 기존 VAR 모델의 편집 능력 한계를 극복하고, 원본 이미지의 관련 없는 세부...","categories": ["Review"],
        "tags": ["Review","Image Editing","Autoregressive Models","Noise Inversion","Text-to-Image","Gumbel-max Trick","Training-free","Location-aware Argmax Inversion"],
        "url": "/ai/review/2025-9-3-Discrete_Noise_Inversion_for_Next-scale_Autoregressive_Text-based_Image_Editing/",
        "teaser": null
      },{
        "title": "[논문리뷰] ELV-Halluc: Benchmarking Semantic Aggregation Hallucinations in Long Video Understanding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hao Lu, Jiahao Wang, Yaolun Zhang, Ruohui Wang, Xuanyu Zheng, Yepeng Tang, Dahua Lin, Lewei Lu 핵심 연구 목표 Video MLLM(Multimodal Large Language Models)이 긴 비디오에서 보이는 Semantic Aggregation Hallucination (SAH) 문제를 해결하는 데 목표를 둡니다. SAH는 모델이 프레임 수준의 의미를 정확하게 인식하지만, 이를...","categories": ["Review"],
        "tags": ["Review","Long Video Understanding","Hallucination","Semantic Aggregation","Video MLLM","Benchmark","DPO","Positional Encoding","VideoQA"],
        "url": "/ai/review/2025-9-3-ELV-Halluc_Benchmarking_Semantic_Aggregation_Hallucinations_in_Long_Video_Understanding/",
        "teaser": null
      },{
        "title": "[논문리뷰] Fantastic Pretraining Optimizers and Where to Find Them",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Kaiyue Wen, David Hall, Tengyu Ma, Percy Liang 핵심 연구 목표 본 논문은 언어 모델 사전 훈련에서 AdamW가 지배적인 옵티마이저임에도 불구하고, 새로운 옵티마이저들이 주장하는 1.4배에서 2배의 학습 속도 향상이 실제로는 널리 채택되지 않는 이유를 규명하고자 합니다. 저자들은 이러한 불일치가 (i) 불균등한 하이퍼파라미터 튜닝과 (ii)...","categories": ["Review"],
        "tags": ["Review","Deep Learning Optimizers","Large Language Models","Hyperparameter Tuning","Pretraining Speedup","Scaling Laws","AdamW","Matrix-based Optimizers","Data-to-Model Ratio"],
        "url": "/ai/review/2025-9-3-Fantastic_Pretraining_Optimizers_and_Where_to_Find_Them/",
        "teaser": null
      },{
        "title": "[논문리뷰] FastFit: Accelerating Multi-Reference Virtual Try-On via Cacheable Diffusion Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zheng Chong, Yanwei Lei, Shiyue Zhang, Zhuandi He, Zhen Wang, Xujie Zhang, Xiao Dong, Yiling Wu, Dongmei Jiang &amp; Xiaodan Liang 핵심 연구 목표 본 논문은 기존 가상 착용(Virtual Try-On) 기술이 다중 레퍼런스 의상 조합(가먼트 및 액세서리 포함)을 지원하지 못하고, 각 디노이징 단계에서 레퍼런스...","categories": ["Review"],
        "tags": ["Review","Virtual Try-On","Diffusion Models","Cacheable Architecture","Multi-Reference","Semi-Attention","Efficiency","Image Synthesis"],
        "url": "/ai/review/2025-9-3-FastFit_Accelerating_Multi-Reference_Virtual_Try-On_via_Cacheable_Diffusion_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] FlashAdventure: A Benchmark for GUI Agents Solving Full Story Arcs in Diverse Adventure Games",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jaewoo Ahn, Junseo Kim, Heeseung Yun, Jaehyeon Son, Dongmin Park, Jaewoong Cho, Gunhee Kim 핵심 연구 목표 기존 GUI 에이전트 벤치마크는 게임 다양성과 전체 스토리라인 완료 평가 기능이 부족하며, 에이전트가 이전에 관찰한 정보를 기억하고 활용하는 ‘관찰-행동 간극’ 문제를 제대로 다루지 못했습니다. 본 연구는 FlashAdventure...","categories": ["Review"],
        "tags": ["Review","GUI Agents","Adventure Games","Benchmark","Full Story Arc","Observation-Behavior Gap","LLMs","Automated Evaluation"],
        "url": "/ai/review/2025-9-3-FlashAdventure_A_Benchmark_for_GUI_Agents_Solving_Full_Story_Arcs_in_Diverse_Adventure_Games/",
        "teaser": null
      },{
        "title": "[논문리뷰] GenCompositor: Generative Video Compositing with Diffusion Transformer",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shuzhou Yang, Xiaoyu Li, Xiaodong Cun, Guangzhi Wang, Lingen Li, Ying Shan, Jian Zhang 핵심 연구 목표 본 논문은 기존의 수동적이고 노동 집약적인 비디오 합성(Video Compositing) 과정을 생성형 모델을 사용하여 자동화하는 것을 목표로 합니다. 특히, 사용자 정의된 크기, 움직임 궤적 및 기타 속성을 기반으로...","categories": ["Review"],
        "tags": ["Review","Video Compositing","Diffusion Transformer","Generative Models","Video Editing","Position Embedding","Diffusion Models","Masked Token Injection","Video Harmonization"],
        "url": "/ai/review/2025-9-3-GenCompositor_Generative_Video_Compositing_with_Diffusion_Transformer/",
        "teaser": null
      },{
        "title": "[논문리뷰] Implicit Actor Critic Coupling via a Supervised Learning Framework for RLVR",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiaming Li, Longze Chen, Ze Gong, Yukun Chen, Lu Wang, Wanwei He, Run Luo, Min Yang 핵심 연구 목표 본 논문은 LLM이 수학 및 프로그래밍과 같은 추론 태스크에서 직면하는 희소한 보상 신호와 불안정한 정책 경사 업데이트라는 기존 RLVR(Reinforcement Learning with Verifiable Rewards) 패러다임의 주요...","categories": ["Review"],
        "tags": ["Review","RLVR","Large Language Models","Actor-Critic","Supervised Learning","Mathematical Reasoning","Policy Optimization","Cross-Entropy Loss"],
        "url": "/ai/review/2025-9-3-Implicit_Actor_Critic_Coupling_via_a_Supervised_Learning_Framework_for_RLVR/",
        "teaser": null
      },{
        "title": "[논문리뷰] Improving Large Vision and Language Models by Learning from a Panel of Peers",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jefferson Hernandez, Jing Shi, Simon Jenni, Vicente Ordonez, Kushal Kafle 핵심 연구 목표 본 논문은 대규모 시각-언어 모델(LVLMs)의 성능을 향상시키기 위해 고가의 인간 주석 데이터에 대한 의존성을 줄이는 새로운 자체 개선 프레임워크인 ‘Panel-of-Peers(PoP)’를 제안합니다. LVLMs가 서로의 피드백으로부터 반복적으로 학습하여 능력 격차를 해소하고, 다양한 태스크에서...","categories": ["Review"],
        "tags": ["Review","Large Vision and Language Models (LVLMs)","Self-Improvement","Peer Learning","Preference Alignment","Reward Modeling","Multimodal Learning","Knowledge Transfer"],
        "url": "/ai/review/2025-9-3-Improving_Large_Vision_and_Language_Models_by_Learning_from_a_Panel_of_Peers/",
        "teaser": null
      },{
        "title": "[논문리뷰] Jointly Reinforcing Diversity and Quality in Language Model Generations",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Tianjian Li, Yiming Zhang, Ping Yu, Swarnadeep Saha, Daniel Khashabi, Jason Weston, Jack Lanchantin, Tianlu Wang 핵심 연구 목표 대규모 언어 모델(LM)의 후처리 과정에서 발생하는 다양성 감소 문제를 해결하는 것이 주요 목표입니다. 기존 후처리 방식이 정확도와 유용성에 초점을 맞춰 출력 분포가 과도하게 좁아지고 아이디어...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Language Models","Diversity Optimization","Quality Enhancement","Semantic Clustering","Post-training","Generative AI"],
        "url": "/ai/review/2025-9-3-Jointly_Reinforcing_Diversity_and_Quality_in_Language_Model_Generations/",
        "teaser": null
      },{
        "title": "[논문리뷰] Kwai Keye-VL 1.5 Technical Report",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Keye Team, Kuaishou Group 핵심 연구 목표 본 논문은 동적이고 정보 밀도가 높은 비디오 콘텐츠 이해에서 발생하는 공간 해상도와 시간 범위 간의 트레이드오프 문제를 해결하고, 기존 모델들이 비디오 이해에서 겪는 한계를 극복하는 것을 목표로 합니다. 궁극적으로 비디오 이해 태스크에서 최첨단 성능을 달성하면서도 일반적인 멀티모달...","categories": ["Review"],
        "tags": ["Review","Multimodal LLMs","Video Understanding","Slow-Fast Encoding","Long Context","Chain-of-Thought","Reinforcement Learning","Human Alignment","Native-Resolution Vision Encoder"],
        "url": "/ai/review/2025-9-3-Kwai_Keye-VL_1.5_Technical_Report/",
        "teaser": null
      },{
        "title": "[논문리뷰] LLaVA-Critic-R1: Your Critic Model is Secretly a Strong Policy Model",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiyao Wang, Chunyuan Li, Jianwei Yang, Kai Zhang, Bo Liu, Tianyi Xiong, Furong Huang 핵심 연구 목표 본 논문은 critic 모델이 단순히 응답을 평가하는 것을 넘어 강력한 정책 모델로서 생성 능력까지 갖출 수 있다는 통념에 도전합니다. 최종 목표는 선호도 기반 critic 데이터를 활용한 강화...","categories": ["Review"],
        "tags": ["Review","Vision-Language Models (VLMs)","Critic Models","Policy Models","Reinforcement Learning (RL)","Self-Criticism","Multimodal Reasoning","Preference Learning","Generative Models"],
        "url": "/ai/review/2025-9-3-LLaVA-Critic-R1_Your_Critic_Model_is_Secretly_a_Strong_Policy_Model/",
        "teaser": null
      },{
        "title": "[논문리뷰] M3Ret: Unleashing Zero-shot Multimodal Medical Image Retrieval via Self-Supervision",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Che Liu, Zheng Jiang, Chengyu Fang, Heng Guo, Yan-Jie Zhou, Jiaqi Qu, Le Lu, Minfeng Xu 핵심 연구 목표 의료 영상 분야에서 기존의 2D, 3D, 비디오 기반 데이터에 파편화된 모델 아키텍처 및 훈련 전략의 한계를 극복하고, 단일한 시각적 표현 학습 프레임워크를 통해 제로샷 멀티모달...","categories": ["Review"],
        "tags": ["Review","Medical Image Retrieval","Self-Supervised Learning","Multimodal","Zero-shot","Foundation Models","MAE","SimDINO","Vision Transformer"],
        "url": "/ai/review/2025-9-3-M3Ret_Unleashing_Zero-shot_Multimodal_Medical_Image_Retrieval_via_Self-Supervision/",
        "teaser": null
      },{
        "title": "[논문리뷰] MedDINOv3: How to adapt vision foundation models for medical image segmentation?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuheng Li, Yizhou Wu, Yuxiang Lai, Mingzhe Hu, Xiaofeng Yang 핵심 연구 목표 의료 영상 분할에서 Vision Foundation Models (FMs)의 효과적인 적용을 저해하는 두 가지 핵심 과제, 즉 ViT 백본이 특수화된 CNN보다 낮은 성능을 보이는 문제와 자연 이미지와 의료 이미지 간의 큰 도메인 격차를...","categories": ["Review"],
        "tags": ["Review","Medical Image Segmentation","Vision Foundation Models","Self-supervised Learning","Vision Transformers (ViT)","Domain Adaptation","DINOv3","CT Imaging"],
        "url": "/ai/review/2025-9-3-MedDINOv3_How_to_adapt_vision_foundation_models_for_medical_image_segmentation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Metis: Training Large Language Models with Advanced Low-Bit Quantization",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hengjie Cao, Jixian Zhou, Mengyi Chen, Yifeng Yang, et al. 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)을 저비트 양자화로 훈련할 때 발생하는 이방성 매개변수 분포가 불안정한 훈련과 성능 저하의 주된 원인임을 식별하고, 이를 해결하여 견고하고 효율적인 저비트 훈련을 가능하게 하는 새로운 프레임워크인 Metis를...","categories": ["Review"],
        "tags": ["Review","Low-Bit Quantization","LLMs","Spectral Decomposition","Anisotropy","Adaptive Learning Rate","Regularization","FP8 Training","FP4 Training"],
        "url": "/ai/review/2025-9-3-Metis_Training_Large_Language_Models_with_Advanced_Low-Bit_Quantization/",
        "teaser": null
      },{
        "title": "[논문리뷰] MobiAgent: A Systematic Framework for Customizable Mobile Agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Cheng Zhang, Erhu Feng*, Xi Zhao, Yisheng Zhao, Wangbo Gong, Jiahui Sun, Dong Du, Zhichao Hua, Yubin Xia, Haibo Chen 핵심 연구 목표 본 논문은 GUI 기반 모바일 에이전트가 직면하는 낮은 태스크 완료율, 느린 응답 시간, 예상치 못한 상황 처리 능력 부족 등 실세계...","categories": ["Review"],
        "tags": ["Review","Mobile Agents","GUI Agents","Vision-Language Models","Agent Acceleration","Benchmarking","Reinforcement Learning","Data Collection"],
        "url": "/ai/review/2025-9-3-MobiAgent_A_Systematic_Framework_for_Customizable_Mobile_Agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] OpenVision 2: A Family of Generative Pretrained Visual Encoders for Multimodal Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yanqing Liu, Xianhang Li, Letian Zhang, Zirui Wang, Zeyu Zheng, Yuyin Zhou, Cihang Xie 핵심 연구 목표 OpenVision 2는 기존 OpenVision 아키텍처와 손실 함수의 복잡성을 단순화하여 멀티모달 학습을 위한 시각 인코더의 훈련 효율성을 대폭 향상시키는 것을 목표로 합니다. 본 연구는 텍스트 인코더와 대조 학습(contrastive...","categories": ["Review"],
        "tags": ["Review","Multimodal Learning","Vision Encoder","Generative Pretraining","Captioning Loss","Training Efficiency","Image-Text Models","Large Language Models"],
        "url": "/ai/review/2025-9-3-OpenVision_2_A_Family_of_Generative_Pretrained_Visual_Encoders_for_Multimodal_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] POINTS-Reader: Distillation-Free Adaptation of Vision-Language Models for Document Conversion",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuan Liu, Zhongyin Zhao, Le Tian, Haicheng Wang, Xubing Ye, Yangxiu You, Zilin Yu, Chuhan Wu, Xiao Zhou, Yang Yu, Jie Zhou 핵심 연구 목표 본 논문은 복잡한 문서 형식(테이블, 수식, 다단 텍스트 등)을 정확하게 변환하기 위한 고품질 주석 데이터의 부족 문제를 해결합니다. 기존의...","categories": ["Review"],
        "tags": ["Review","문서 변환","시각-언어 모델","자가 개선","합성 데이터","증류 없는 학습","OCR","멀티모달 AI","데이터 필터링"],
        "url": "/ai/review/2025-9-3-POINTS-Reader_Distillation-Free_Adaptation_of_Vision-Language_Models_for_Document_Conversion/",
        "teaser": null
      },{
        "title": "[논문리뷰] Reasoning Vectors: Transferring Chain-of-Thought Capabilities via Task Arithmetic",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Mohammad Zbeeb, Hasan Abed Al Kader Hammoud, Bernard Ghanem 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)이 복잡한 추론 능력을 습득하기 위해 필요한 값비싼 강화 학습(RL) 기반 최적화 과정을 대체하는 방법을 모색합니다. 특히, 학습된 추론 능력을 추론 벡터(reasoning vector) 형태로 추출하여 호환 가능한 모델...","categories": ["Review"],
        "tags": ["Review","Reasoning Vectors","Task Arithmetic","Chain-of-Thought","LLMs","Reinforcement Learning","Model Merging","Parameter Transfer"],
        "url": "/ai/review/2025-9-3-Reasoning_Vectors_Transferring_Chain-of-Thought_Capabilities_via_Task_Arithmetic/",
        "teaser": null
      },{
        "title": "[논문리뷰] SQL-of-Thought: Multi-agentic Text-to-SQL with Guided Error Correction",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Saumya Chaturvedi, Aman Chadha, Laurent Bindschaedler 핵심 연구 목표 본 논문은 자연어 질의를 SQL 쿼리로 변환하는 Text-to-SQL (NL2SQL) 시스템의 견고성과 신뢰성을 향상시키는 것을 목표로 합니다. 특히, 기존 시스템들이 실행 기반 피드백에만 의존하여 논리적으로 부정확하지만 문법적으로 유효한 SQL 쿼리 오류를 수정하지 못하는 한계를 극복하고자 합니다....","categories": ["Review"],
        "tags": ["Review","Text-to-SQL","Multi-agent Systems","Chain-of-Thought","Error Correction","Large Language Models","Query Planning","Database Interaction"],
        "url": "/ai/review/2025-9-3-SQL-of-Thought_Multi-agentic_Text-to-SQL_with_Guided_Error_Correction/",
        "teaser": null
      },{
        "title": "[논문리뷰] SimpleTIR: End-to-End Reinforcement Learning for Multi-Turn Tool-Integrated Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhenghai Xue, Longtao Zheng, Qian Liu, Yingru Li, Xiaosen Zheng, Zejun Ma, Bo An 핵심 연구 목표 본 논문은 Reinforcement Learning (RL)을 사용하여 Multi-turn Tool-Integrated Reasoning (TIR)을 수행하는 Large Language Models (LLMs)의 훈련 시 발생하는 불안정성, 특히 그래디언트 폭발과 성능 저하 문제를 해결하는 것을...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Large Language Models","Tool-Integrated Reasoning","Multi-turn Reasoning","Gradient Explosion","Training Stability","Trajectory Filtering","Zero RL"],
        "url": "/ai/review/2025-9-3-SimpleTIR_End-to-End_Reinforcement_Learning_for_Multi-Turn_Tool-Integrated_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] The Gold Medals in an Empty Room: Diagnosing Metalinguistic Reasoning in LLMs with Camlang",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Fenghua Liu, Yulong Chen, Yixuan Liu, Zhujun Jin, Solomon Tsai, Ming Zhong 핵심 연구 목표 이 논문은 대규모 언어 모델(LLMs)이 언어 학습에서 인간과 유사한 메타언어적 추론 능력을 진정으로 갖추고 있는지 평가하는 것을 목표로 합니다. LLM의 성공이 단순한 패턴 매칭이 아닌, 명시적인 문법 규칙과 어휘를...","categories": ["Review"],
        "tags": ["Review","LLMs","Metalinguistic Reasoning","Constructed Language","Camlang","Second Language Acquisition","Zero-shot Learning","Natural Language Understanding","Commonsense Reasoning"],
        "url": "/ai/review/2025-9-3-The_Gold_Medals_in_an_Empty_Room_Diagnosing_Metalinguistic_Reasoning_in_LLMs_with_Camlang/",
        "teaser": null
      },{
        "title": "[논문리뷰] The Landscape of Agentic Reinforcement Learning for LLMs: A Survey",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hejia Geng, Guibin Zhang, henggg, Artemis0430, JeremyYin 핵심 연구 목표 본 설문조사는 LLM(Large Language Models)을 수동적인 시퀀스 생성기에서 자율적인 의사 결정 에이전트로 전환하는 Agentic RL(Agentic Reinforcement Learning) 패러다임의 등장을 탐구합니다. 특히, 기존 LLM-RL의 단일 단계 MDP(Markov Decision Process)와 Agentic RL의 부분적으로 관찰 가능한, 시간...","categories": ["Review"],
        "tags": ["Review","Agentic Reinforcement Learning","Large Language Models","LLM Agents","Sequential Decision Making","Policy Optimization","Tool Use","Dynamic Environments","Autonomous AI"],
        "url": "/ai/review/2025-9-3-The_Landscape_of_Agentic_Reinforcement_Learning_for_LLMs_A_Survey/",
        "teaser": null
      },{
        "title": "[논문리뷰] Towards More Diverse and Challenging Pre-training for Point Cloud Learning: Self-Supervised Cross Reconstruction with Decoupled Views",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiangdong Zhang, Shaofeng Zhang, Junchi Yan 핵심 연구 목표 본 논문은 3D 포인트 클라우드 학습에서 기존 단일 뷰(single-view) 기반 마스킹 재구성(masked reconstruction) 방식의 한계를 극복하고, 더 다양하고 도전적인 두 뷰(two-view) 기반 사전 학습 패러다임을 탐구하는 것을 목표로 합니다. 특히, 포인트 클라우드 데이터에서 디커플링된 뷰(decoupled...","categories": ["Review"],
        "tags": ["Review","Point Cloud Learning","Self-Supervised Learning","Cross Reconstruction","Decoupled Views","Generative Models","Positional Encoding","3D Vision"],
        "url": "/ai/review/2025-9-3-Towards_More_Diverse_and_Challenging_Pre-training_for_Point_Cloud_Learning_Self-Supervised_Cross_Reconstruction_with_Decoupled_Views/",
        "teaser": null
      },{
        "title": "[논문리뷰] UI-TARS-2 Technical Report: Advancing GUI Agent with Multi-Turn Reinforcement Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Haoyang Zou, zhwang4ai, JoeYing, jzfeng, MingComplex 핵심 연구 목표 본 연구는 데이터 희소성, 확장 가능한 멀티-턴 강화 학습(RL), GUI 전용 작동의 한계, 환경 확장성 및 안정성과 같은 자율 GUI 에이전트 개발의 주요 과제를 해결하는 것을 목표로 합니다. 궁극적으로 UI-TARS-2를 통해 GUI 에이전트의 상태를 발전시키고...","categories": ["Review"],
        "tags": ["Review","GUI Agent","Multi-Turn RL","Reinforcement Learning","Data Flywheel","Agent Framework","Hybrid Environments","Parameter Interpolation"],
        "url": "/ai/review/2025-9-3-UI-TARS-2_Technical_Report_Advancing_GUI_Agent_with_Multi-Turn_Reinforcement_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Universal Deep Research: Bring Your Own Model and Strategy",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Peter Belcak, Pavlo Molchanov 핵심 연구 목표 이 논문은 기존의 심층 연구 도구(DRT)들이 고정된 연구 전략과 제한적인 모델 선택으로 인해 사용자 정의가 어렵고 특정 산업에 특화된 연구 전략을 구축하기 어렵다는 문제를 제기합니다. Universal Deep Research (UDR) 시스템을 통해 사용자가 어떤 언어 모델(LLM)이든 활용하여 자체적인...","categories": ["Review"],
        "tags": ["Review","Agentic Systems","Language Models (LLMs)","Research Automation","Customizable Strategies","Code Generation","Deep Research","User-Defined Agents","Sandboxed Execution"],
        "url": "/ai/review/2025-9-3-Universal_Deep_Research_Bring_Your_Own_Model_and_Strategy/",
        "teaser": null
      },{
        "title": "[논문리뷰] VerlTool: Towards Holistic Agentic Reinforcement Learning with Tool Use",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Dongfu Jiang, Yi Lu, Zhuofeng Li, Zhiheng Lyu, Ping Nie, Haozhe Wang, Alex Su, Hui Zhen, Fei Zou, Chao Du, Tianpeng Pang, Wenhui Chen 핵심 연구 목표 논문은 LLM의 독립적인 추론과 상호작용적 에이전트 지능 사이의 격차를 해소하고자 합니다. 기존 LLM의 폐쇄적인 단일 턴 추론,...","categories": ["Review"],
        "tags": ["Review","Agentic Reinforcement Learning","Tool Use","Large Language Models","Reinforcement Learning from Verifiable Rewards (RLVR)","Asynchronous Execution","Multi-modal AI","Framework"],
        "url": "/ai/review/2025-9-3-VerlTool_Towards_Holistic_Agentic_Reinforcement_Learning_with_Tool_Use/",
        "teaser": null
      },{
        "title": "[논문리뷰] ViSTA-SLAM: Visual SLAM with Symmetric Two-view Association",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ganlin Zhang, Shenhan Qian, Xi Wang, Daniel Cremers 핵심 연구 목표 본 연구는 기존 모노큘러 덴스 SLAM 시스템의 주요 한계점인 카메라 인트린직스(intrinsics) 필요성, 높은 계산 복잡성, 그리고 장기적인 시퀀스에서의 드리프트 축적 문제를 해결하는 것을 목표로 합니다. 이를 통해 실시간으로 작동하며, 고품질의 3D 재구성 및...","categories": ["Review"],
        "tags": ["Review","Monocular SLAM","Dense Reconstruction","Neural Networks","Pose Graph Optimization","Intrinsics-free","Real-time","Two-view Association"],
        "url": "/ai/review/2025-9-3-ViSTA-SLAM_Visual_SLAM_with_Symmetric_Two-view_Association/",
        "teaser": null
      },{
        "title": "[논문리뷰] LMEnt: A Suite for Analyzing Knowledge in Language Models from Pretraining Data to Representations",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yoav Gur-Arieh, Ido Cohen, Alon Gilae-Dotan, Daniela Gottesman, Mor Geva 핵심 연구 목표 언어 모델(LMs)이 사전 훈련 과정에서 지식 표현을 어떻게 형성하고 발전시키는지에 대한 내부 프로세스를 분석하는 것입니다. 특히, 사전 훈련 데이터 내에서 특정 지식이 언제, 어디서 나타나는지 정확히 추적할 수 있는 투명한 환경을...","categories": ["Review"],
        "tags": ["Review","Language Models","Knowledge Acquisition","Pretraining Data","Entity Linking","Coreference Resolution","Information Retrieval","Model Analysis","Checkpoints"],
        "url": "/ai/review/2025-9-4-LMEnt_A_Suite_for_Analyzing_Knowledge_in_Language_Models_from_Pretraining_Data_to_Representations/",
        "teaser": null
      },{
        "title": "[논문리뷰] MOSAIC: Multi-Subject Personalized Generation via Correspondence-Aware Alignment and Disentanglement",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Dong She, Siming Fu, Mushui Liu, Qiaoqiao Jin, Hualiang Wang, Mu Liu, Jidong Jiang 핵심 연구 목표 이 논문은 다중 피사체 개인화 이미지 생성 시 발생하는 정체성 혼합(identity blending) 및 속성 유출(attribute leakage) 문제를 해결하는 것을 목표로 합니다. 특히, 기존 방법론들이 3-4개 이상의 피사체를...","categories": ["Review"],
        "tags": ["Review","Multi-Subject Generation","Personalized Image Synthesis","Semantic Correspondence","Attention Disentanglement","Diffusion Models","Identity Preservation","Dataset"],
        "url": "/ai/review/2025-9-4-MOSAIC_Multi-Subject_Personalized_Generation_via_Correspondence-Aware_Alignment_and_Disentanglement/",
        "teaser": null
      },{
        "title": "[논문리뷰] Mixture of Global and Local Experts with Diffusion Transformer for Controllable Face Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xuechao Zou, Shun Zhang, Xing Fu, Yue Li, Kai Li, Yushe Cao, Congyan Lang, Pin Tao, Junliang Xing 핵심 연구 목표 논문은 기존 생성 모델이 의미론적 제어와 사진 같은 사실성 사이의 섬세한 균형을 맞추는 데 어려움을 겪고, 특히 Diffusion Transformer (DiT)가 복잡한 다중 모드...","categories": ["Review"],
        "tags": ["Review","Diffusion Transformer","Mixture of Experts","Controllable Generation","Face Generation","Multimodal Synthesis","Semantic Control","Image Generation"],
        "url": "/ai/review/2025-9-4-Mixture_of_Global_and_Local_Experts_with_Diffusion_Transformer_for_Controllable_Face_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Open Data Synthesis For Deep Research",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ziyi Xia, Kun Luo, Hongjin Qian, Zheng Liu 핵심 연구 목표 본 논문은 기존 벤치마크들이 “심층 연구(Deep Research)” 작업을 위한 충분한 구조적 깊이를 제공하지 못하는 한계를 해결하고자 합니다. 특히, 복잡한 질문을 하위 문제로 분해하고, 다단계 추론을 조율하며, 다양한 출처에서 증거를 합성해야 하는 작업에 초점을...","categories": ["Review"],
        "tags": ["Review","Data Synthesis","Deep Research","Hierarchical Constraint Satisfaction Problems","Large Language Models","Agentic AI","Reinforcement Learning","Question Answering"],
        "url": "/ai/review/2025-9-4-Open_Data_Synthesis_For_Deep_Research/",
        "teaser": null
      },{
        "title": "[논문리뷰] Robix: A Unified Model for Robot Interaction, Reasoning and Planning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zixuan Wang, Wei Li, Heng Dong, Mengxi Zhang, Huang Fang, Qifeng Zhang, Xueyun Tian, Yucheng Hu, Hang Li 핵심 연구 목표 본 논문은 일반ist 로봇이 복잡한 장기 작업을 추론하고 자연스러운 인간 상호작용에 참여할 수 있도록 단일 비전-언어 아키텍처 내에서 로봇 추론, 태스크 플래닝, 자연어...","categories": ["Review"],
        "tags": ["Review","Robot Learning","Vision-Language Models (VLMs)","Embodied AI","Human-Robot Interaction (HRI)","Task Planning","Reinforcement Learning (RL)","Chain-of-Thought (CoT) Reasoning","Robotics"],
        "url": "/ai/review/2025-9-4-Robix_A_Unified_Model_for_Robot_Interaction_Reasoning_and_Planning/",
        "teaser": null
      },{
        "title": "[논문리뷰] DeepResearch Arena: The First Exam of LLMs' Research Abilities via Seminar-Grounded Tasks",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiaxuan Lu, Meiqi Tu, Junchi Yu, Chen Yang, haiyuanwan 핵심 연구 목표 본 논문은 기존 벤치마크의 데이터 누출 위험과 비현실적인 평가 방식의 한계를 극복하기 위해, 대규모 언어 모델(LLM) 기반 연구 에이전트의 실제 연구 능력을 평가하기 위한 새로운 벤치마크인 DeepResearch Arena를 제안합니다. 이는 연구자들이 진정으로...","categories": ["Review"],
        "tags": ["Review","LLM Evaluation","Research Agents","Benchmark","Multi-Agent System","Seminar-Grounded Tasks","Data Leakage Prevention","Ill-Structured Problems"],
        "url": "/ai/review/2025-9-5-DeepResearch_Arena_The_First_Exam_of_LLMs_Research_Abilities_via_Seminar-Grounded_Tasks/",
        "teaser": null
      },{
        "title": "[논문리뷰] Delta Activations: A Representation for Finetuned Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhiqiu Xu, Amish Sethi, Mayur Naik, Ser-Nam Lim 핵심 연구 목표 다양하게 미세 조정된 대규모 언어 모델(LLM)의 방대한 생태계에서 모델 간의 유사점과 차이점을 효율적으로 파악하고, 모델을 검색, 비교 및 클러스터링할 수 있는 표준화된 표현 방식이 부족한 문제를 해결하는 것이 목표입니다. 이는 기존의 메타데이터 부족...","categories": ["Review"],
        "tags": ["Review","LLM Embedding","Delta Activations","Finetuned Models","Model Representation","Model Clustering","Additive Property","Task Embedding","Model Merging"],
        "url": "/ai/review/2025-9-5-Delta_Activations_A_Representation_for_Finetuned_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Drawing2CAD: Sequence-to-Sequence Learning for CAD Generation from Vector Drawings",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Feiwei Qin, Shichao Lu, Junhao Hou, Changmiao Wang, Meie Fang, Ligang Liu 핵심 연구 목표 본 연구는 2D 벡터 엔지니어링 도면(SVG 형식)으로부터 파라메트릭 CAD 모델을 자동으로 생성하는 문제를 해결하는 것을 목표로 합니다. 기존 방식들이 래스터 이미지나 텍스트 입력에 의존하여 정밀도와 디자인 의도 보존에 한계가...","categories": ["Review"],
        "tags": ["Review","CAD Generation","Vector Graphics","Sequence-to-Sequence Learning","Transformer Architecture","Engineering Drawings","Multi-modal Learning","Soft Target Loss","Dual Decoder"],
        "url": "/ai/review/2025-9-5-Drawing2CAD_Sequence-to-Sequence_Learning_for_CAD_Generation_from_Vector_Drawings/",
        "teaser": null
      },{
        "title": "[논문리뷰] Drivel-ology: Challenging LLMs with Interpreting Nonsense with Depth",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yang Wang, Chenghao Xiao, Chia-Yi Hsiao, Zi Yan Chang, Chi-Li Chen, Tyler Loakman, Chenghua Lin 핵심 연구 목표 본 연구는 LLM(Large Language Models)이 겉으로는 논리적이지만 심층적인 역설적 의미를 담고 있는 “Drivelology(심오한 헛소리)”를 얼마나 깊이 이해하는지 평가하는 것을 목표로 합니다. 통계적 유창성을 넘어선 LLM의 진정한...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Pragmatic Understanding","Drivelology","Benchmark Dataset","Multilingual NLP","Semantic Reasoning","Contextual Inference"],
        "url": "/ai/review/2025-9-5-Drivel-ology_Challenging_LLMs_with_Interpreting_Nonsense_with_Depth/",
        "teaser": null
      },{
        "title": "[논문리뷰] Durian: Dual Reference-guided Portrait Animation with Attribute Transfer",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hyunsoo Cha, Byungjun Kim, Hanbyul Joo 핵심 연구 목표 본 논문은 주어진 참조 이미지로부터 대상 인물의 얼굴 속성(예: 헤어스타일, 안경)을 전이하여 동적인 초상화 애니메이션 비디오를 제로샷(zero-shot) 방식으로 생성하는 것을 목표로 합니다. 기존 정적 이미지 편집이나 복잡한 마스킹, 또는 방대한 트리플렛 데이터(triplet data) 구축의 한계를...","categories": ["Review"],
        "tags": ["Review","Portrait Animation","Attribute Transfer","Diffusion Models","Dual Reference Networks","Zero-shot Learning","Self-Reconstruction","Facial Editing"],
        "url": "/ai/review/2025-9-5-Durian_Dual_Reference-guided_Portrait_Animation_with_Attribute_Transfer/",
        "teaser": null
      },{
        "title": "[논문리뷰] False Sense of Security: Why Probing-based Malicious Input Detection Fails to Generalize",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Cheng Wang, Zeming Wei, Qin Liu, Muhao Chen 핵심 연구 목표 본 연구는 대규모 언어 모델(LLM)의 악성 입력 감지를 위해 제안된 프루빙 기반(probing-based) 방법론의 신뢰성을 재평가하는 것을 목표로 합니다. 기존 연구에서 보고된 높은 인-도메인(in-domain) 정확도가 실제 유해성 의미론 이해를 반영하는 것이 아니라 표면적인 패턴...","categories": ["Review"],
        "tags": ["Review","LLM Safety","Malicious Input Detection","Probing Classifiers","Out-of-Distribution Generalization","Superficial Patterns","Instructional Patterns","Trigger Words","AI Safety"],
        "url": "/ai/review/2025-9-5-False_Sense_of_Security_Why_Probing-based_Malicious_Input_Detection_Fails_to_Generalize/",
        "teaser": null
      },{
        "title": "[논문리뷰] Few-step Flow for 3D Generation via Marginal-Data Transport Distillation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zanwei Zhou, Taoran Yi, Jiemin Fang, Chen Yang, Lingxi Xie, Xinggang Wang, Wei Shen, Qi Tian 핵심 연구 목표 본 연구는 플로우 기반 3D 생성 모델의 느린 추론 속도 문제를 해결하는 것을 목표로 합니다. 기존 모델들이 수십 단계의 샘플링을 요구하여 실제 애플리케이션에 적용하기 어려운...","categories": ["Review"],
        "tags": ["Review","3D Generation","Flow-based Models","Model Distillation","Few-step Sampling","Marginal-Data Transport","Velocity Matching","Velocity Distillation"],
        "url": "/ai/review/2025-9-5-Few-step_Flow_for_3D_Generation_via_Marginal-Data_Transport_Distillation/",
        "teaser": null
      },{
        "title": "[논문리뷰] From Editor to Dense Geometry Estimator",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiyuan Wang, Chunyu Lin, Lei Sun, Rongying Liu, Lang Nie, Mingxing Li, Kang Liao, Xiangxiang Chu, Yao Zhao 핵심 연구 목표 본 논문은 기존의 텍스트-투-이미지(T2I) 생성 모델보다 Diffusion Transformer (DiT) 기반의 이미지 편집 모델이 단안 밀집 기하학 추정(depth 및 normal) 작업에 더 적합한 파운데이션...","categories": ["Review"],
        "tags": ["Review","Dense Geometry Estimation","Diffusion Transformer","Image Editing","Zero-shot Learning","Depth Estimation","Normal Estimation","Flow Matching","Logarithmic Quantization"],
        "url": "/ai/review/2025-9-5-From_Editor_to_Dense_Geometry_Estimator/",
        "teaser": null
      },{
        "title": "[논문리뷰] Inverse IFEval: Can LLMs Unlearn Stubborn Training Conventions to Follow Real Instructions?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Qinyan Zhang, Xinping Lei, Ruijie Miao, Yu Fu, Haojie Fan, Le Chang, Jiafan Hou, Dingling Zhang, Zhongfei Hou, Ziqiang Yang, Changxin Pu, Fei Hu, Jingkai Liu, Mengyun Liu, Yang Liu, Xiang Gao 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)이 지도 미세 조정(SFT) 과정에서...","categories": ["Review"],
        "tags": ["Review","LLMs","Instruction Following","Benchmark","Cognitive Inertia","Out-of-Distribution","Supervised Fine-Tuning","Evaluation","Robustness"],
        "url": "/ai/review/2025-9-5-Inverse_IFEval_Can_LLMs_Unlearn_Stubborn_Training_Conventions_to_Follow_Real_Instructions/",
        "teaser": null
      },{
        "title": "[논문리뷰] NER Retriever: Zero-Shot Named Entity Retrieval with Type-Aware Embeddings",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Or Shachar, Uri Katz, Yoav Goldberg, Oren Glickman 핵심 연구 목표 논문은 기존 NER(Named Entity Recognition) 시스템의 한계, 즉 고정된 유형 스키마와 대량의 레이블링 데이터 의존성을 극복하고자 합니다. 사용자가 정의한 임의의(ad-hoc) 엔티티 유형 쿼리에 대해 관련 텍스트 세그먼트를 제로샷(zero-shot) 방식으로 검색할 수 있는 프레임워크를...","categories": ["Review"],
        "tags": ["Review","Named Entity Retrieval","Zero-Shot Learning","Type-Aware Embeddings","Large Language Models (LLMs)","Contrastive Learning","Internal Representations","Information Retrieval"],
        "url": "/ai/review/2025-9-5-NER_Retriever_Zero-Shot_Named_Entity_Retrieval_with_Type-Aware_Embeddings/",
        "teaser": null
      },{
        "title": "[논문리뷰] Towards a Unified View of Large Language Model Post-Training",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xingtai Lv, Yuxin Zuo, Youbang Sun, Hongyi Liu, Yuntian Wei, Zhekai Chen, Lixuan He, Xuekai Zhu, Kaiyan Zhang, Bingning Wang, Ning Ding, Bowen Zhou 핵심 연구 목표 본 논문은 LLM의 포스트 트레이닝 과정에서 Supervised Fine-Tuning (SFT)과 Reinforcement Learning (RL)이 별개의 목표가 아니라, 단일 최적화...","categories": ["Review"],
        "tags": ["Review","Large Language Models (LLMs)","Post-Training","Reinforcement Learning (RL)","Supervised Fine-Tuning (SFT)","Policy Gradient","Unified Framework","Hybrid Algorithms","Bias-Variance Tradeoff"],
        "url": "/ai/review/2025-9-5-Towards_a_Unified_View_of_Large_Language_Model_Post-Training/",
        "teaser": null
      },{
        "title": "[논문리뷰] Transition Models: Rethinking the Generative Learning Objective",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zidong Wang, Yiyuan Zhang, Xiangyu Yue, Xiaoyu Yue, Yangguang Li, Wanli Ouyang, Lei Bai 핵심 연구 목표 본 논문은 반복적인 확산 모델의 높은 품질과 효율적인 소수 단계 모델의 성능 포화 사이의 근본적인 딜레마를 해결하고자 합니다. 이 충돌이 제한적인 훈련 목표에서 비롯된다고 판단하고, 임의의 유한...","categories": ["Review"],
        "tags": ["Review","Generative Models","Diffusion Models","Training Objective","Continuous-Time Dynamics","State Transition","Few-Step Generation","Scalable Training","Image Generation"],
        "url": "/ai/review/2025-9-5-Transition_Models_Rethinking_the_Generative_Learning_Objective/",
        "teaser": null
      },{
        "title": "[논문리뷰] Video-MTR: Reinforced Multi-Turn Reasoning for Long Video Understanding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuan Xie, Tianshui Chen, Zheng Ge, Lionel Ni 핵심 연구 목표 본 논문은 장시간 비디오 이해의 난제를 해결하고자 합니다. 기존 방법론들이 정적 추론이나 외부 VLM(Visual-Language Model)에 의존하여 복잡성, 비최적 성능, 종단 간 학습 부재 등의 한계를 보이는 문제를 극복하며, 반복적인 핵심 비디오 세그먼트 선택과...","categories": ["Review"],
        "tags": ["Review","Long Video Understanding","Reinforcement Learning","Multi-Turn Reasoning","MLLMs","Video Segment Selection","Bi-level Reward","Question Answering"],
        "url": "/ai/review/2025-9-5-Video-MTR_Reinforced_Multi-Turn_Reasoning_for_Long_Video_Understanding/",
        "teaser": null
      },{
        "title": "[논문리뷰] Behavioral Fingerprinting of Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zehua Pei, Hui-Ling Zhen, Ying Zhang, Zhiyuan Yang, Xing Li, Xianzhi Yu, Mingxuan Yuan, Bei Yu 핵심 연구 목표 현재 대규모 언어 모델(LLM) 벤치마크들이 모델의 성능 지표에만 치중하여 미묘한 행동 특성을 포착하지 못하는 문제를 해결하고자 합니다. 본 연구는 “모델이 올바른가?”라는 질문을 넘어 “모델이 어떻게...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Behavioral Evaluation","Model Alignment","Sycophancy","World Model Brittleness","Metacognition","Personality Profiling"],
        "url": "/ai/review/2025-9-8-Behavioral_Fingerprinting_of_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Bootstrapping Task Spaces for Self-Improvement",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Minqi Jiang, Andrei Lupu, Yoram Bachrach 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)이 추론 시 여러 단계에 걸쳐 스스로 개선하는 능력을 학습하는 방법을 연구합니다. 기존의 자기 개선 훈련 방식이 가진 고정된 반복 깊이, 높은 비용, 출력 다양성 감소 등의 한계를 극복하고, 동적으로 확장되는...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning (RL)","Large Language Models (LLMs)","Self-Improvement","Autocurriculum","Task-Space Exploration","Inference-Time Iteration","Policy Optimization"],
        "url": "/ai/review/2025-9-8-Bootstrapping_Task_Spaces_for_Self-Improvement/",
        "teaser": null
      },{
        "title": "[논문리뷰] LatticeWorld: A Multimodal Large Language Model-Empowered Framework for Interactive Complex World Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yinglin Duan, Zhengxia Zou, Tongwei Gu, Wei Jia, Zhan Zhao, Luyi Xu, Xinzhu Liu, Hao Jiang, Kang Chen, Shuang Qiu 핵심 연구 목표 본 논문은 복잡한 실제 시나리오를 시뮬레이션하는 고충실도 3D 가상 환경을 생성하는 데 초점을 맞추어, sim-to-real 격차를 줄이고 풍부한 데이터를 효율적으로 수집하는...","categories": ["Review"],
        "tags": ["Review","Multimodal LLM","3D World Generation","Unreal Engine 5","Procedural Content Generation","Interactive Environments","Sim-to-Real","Spatial Understanding","Multimodal Input"],
        "url": "/ai/review/2025-9-8-LatticeWorld_A_Multimodal_Large_Language_Model-Empowered_Framework_for_Interactive_Complex_World_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] LuxDiT: Lighting Estimation with Video Diffusion Transformer",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ruofan Liang, Kai He, Zan Gojcic, Igor Gilitschenski, Sanja Fidler, Nandita Vijaykumar, Zian Wang 핵심 연구 목표 논문은 단일 이미지 또는 비디오로부터 고품질의 HDR 환경 맵을 추정하는 오랜 난제를 해결하고자 합니다. 이는 실측 HDR 환경 맵의 희소성, 간접 시각 단서에 대한 의존성, 전역적 컨텍스트...","categories": ["Review"],
        "tags": ["Review","Lighting Estimation","HDR Environment Map","Diffusion Models","Video Transformer","Low-Rank Adaptation","Generative Models","Synthetic Data"],
        "url": "/ai/review/2025-9-8-LuxDiT_Lighting_Estimation_with_Video_Diffusion_Transformer/",
        "teaser": null
      },{
        "title": "[논문리뷰] MedVista3D: Vision-Language Modeling for Reducing Diagnostic Errors in 3D CT Disease Detection, Understanding and Reporting",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuheng Li, Yuxiang Lai, Yenho Chen, Jike Zhong, Vanessa Wildman, Xiaofeng Yang 핵심 연구 목표 3D CT 영상 진단에서 발생하는 오독(under-reading), 부주의로 인한 인지 오류(inattentional blindness), 그리고 커뮤니케이션 오류를 줄이는 것을 목표로 합니다. 기존 3D 시각-언어 모델의 지역-전역 이해 부족 및 방사선 보고서의 가변성...","categories": ["Review"],
        "tags": ["Review","3D CT","Vision-Language Model","Medical Imaging","Diagnostic Error Reduction","Multi-scale Alignment","Semantic Enrichment","Radiology Reporting","Zero-shot Learning"],
        "url": "/ai/review/2025-9-8-MedVista3D_Vision-Language_Modeling_for_Reducing_Diagnostic_Errors_in_3D_CT_Disease_Detection_Understanding_and_Reporting/",
        "teaser": null
      },{
        "title": "[논문리뷰] On Robustness and Reliability of Benchmark-Based Evaluation of LLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Riccardo Lunardi, Vincenzo Della Mea, Stefano Mizzaro, Kevin Roitero 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)이 문맥에 따라 재구성된 질문에 얼마나 강건한지를 평가하고, 현재 사용되는 벤치마크 기반 평가가 모델의 실제 능력을 얼마나 신뢰성 있게 측정하는지 조사하는 것을 목표로 합니다. 고정된 문구의 벤치마크 질문이...","categories": ["Review"],
        "tags": ["Review","LLM Evaluation","Model Robustness","Benchmark Reliability","Paraphrasing","Linguistic Variability","Generalization","Question Answering"],
        "url": "/ai/review/2025-9-8-On_Robustness_and_Reliability_of_Benchmark-Based_Evaluation_of_LLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] Set Block Decoding is a Language Model Inference Accelerator",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Itai Gat, Heli Ben-Hamu, Marton Havasi, Daniel Haziza, Jeremy Reizenstein, Gabriel Synnaeve, David Lopez-Paz, Brian Karrer, Yaron Lipman 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM) 추론, 특히 디코딩 단계에서 발생하는 높은 계산 및 메모리 비용 문제에 초점을 맞춥니다. 이러한 문제를 해결하여 LLM의 실용적인...","categories": ["Review"],
        "tags": ["Review","Language Model Inference","Acceleration","Set Block Decoding","Next Token Prediction","Masked Token Prediction","Parallel Decoding","KV-caching","Diffusion Models"],
        "url": "/ai/review/2025-9-8-Set_Block_Decoding_is_a_Language_Model_Inference_Accelerator/",
        "teaser": null
      },{
        "title": "[논문리뷰] Symbolic Graphics Programming with Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Kaipeng Zhang, Zeju Qiu, Haoquan Zhang, Yamei Chen, Yangyi Huang 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)이 자연어 설명으로부터 정확한 시각적 콘텐츠를 렌더링하는 심볼릭 그래픽 프로그램(SGPs), 특히 Scalable Vector Graphics (SVGs)를 생성하는 능력을 탐구합니다. 또한, LLM의 SGP 생성 능력을 향상시키기 위한 효과적인 방법론을...","categories": ["Review"],
        "tags": ["Review","Symbolic Graphics Programming","Large Language Models","Reinforcement Learning","SVG Generation","Text-to-Image Synthesis","Cross-Modal Alignment","Program Synthesis"],
        "url": "/ai/review/2025-9-8-Symbolic_Graphics_Programming_with_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] U-ARM : Ultra low-cost general teleoperation interface for robot manipulation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yanwen Zou, Zhaoye Zhou, Chenyang Shi, Zewei Ye, Junda Huang, Yan Ding†, Bo Zhao 핵심 연구 목표 본 논문은 기존의 고비용 및 복잡한 엔지니어링 요구사항을 가진 로봇 텔레오퍼레이션 시스템의 한계를 극복하고, 대부분의 상용 로봇 팔과 호환되는 초저가, 사용자 친화적, 범용 리더-팔로워 텔레오퍼레이션 인터페이스인 U-Arm을...","categories": ["Review"],
        "tags": ["Review","Teleoperation","Robot Manipulation","Low-Cost Hardware","3D Printing","Leader-Follower System","Data Collection","Robotics Interface","Open Source"],
        "url": "/ai/review/2025-9-8-U-ARM_Ultra_low-cost_general_teleoperation_interface_for_robot_manipulation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Why Language Models Hallucinate",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Adam Tauman Kalai, Ofir Nachum, Santosh S. Vempala, Edwin Zhang 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)이 “환각” 현상, 즉 그럴듯하지만 틀린 정보를 자신감 있게 생성하는 이유를 통계적으로 분석하고, 이러한 문제가 최신 모델에서도 지속되는 근본적인 원인을 밝히는 것을 목표로 합니다. 특히, 모델의 훈련...","categories": ["Review"],
        "tags": ["Review","Language Models","Hallucination","Pretraining","Post-training","Evaluation Metrics","Binary Classification","Uncertainty Quantification","Calibration"],
        "url": "/ai/review/2025-9-8-Why_Language_Models_Hallucinate/",
        "teaser": null
      },{
        "title": "[논문리뷰] WildScore: Benchmarking MLLMs in-the-Wild Symbolic Music Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Gagan Mundada, Yash Vishe, Amit Namburi, Xin Xu, Zachary Novack, Julian McAuley, Junda Wu 핵심 연구 목표 본 논문은 Multimodal Large Language Models (MLLMs)의 상징적 음악 분석 및 추론 능력에 대한 실세계 적용 가능성을 평가하는 것을 목표로 합니다. 기존 벤치마크들이 부족했던 인-더-와일드(in-the-wild) 데이터를 기반으로...","categories": ["Review"],
        "tags": ["Review","Multimodal Large Language Models","Symbolic Music Reasoning","Music Score Analysis","Benchmarking","Visual Question Answering","In-the-Wild Data","Music Theory"],
        "url": "/ai/review/2025-9-8-WildScore_Benchmarking_MLLMs_in-the-Wild_Symbolic_Music_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] WinT3R: Window-Based Streaming Reconstruction with Camera Token Pool",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zizun Li, Jianjun Zhou, Yifan Wang, Haoyu Guo, Wenzheng Chang, Yang Zhou, Haoyi Zhu, Junyi Chen, Chunhua Shen, Tong He 핵심 연구 목표 본 연구는 기존 온라인 3D 재구성 방법들이 겪는 재구성 품질과 실시간 성능 간의 절충 문제를 해결하고, 스트리밍 이미지로부터 정밀한 카메라 포즈와...","categories": ["Review"],
        "tags": ["Review","Online 3D Reconstruction","Camera Pose Estimation","Streaming Reconstruction","Sliding Window","Camera Token Pool","Real-time Performance","Computer Vision"],
        "url": "/ai/review/2025-9-8-WinT3R_Window-Based_Streaming_Reconstruction_with_Camera_Token_Pool/",
        "teaser": null
      },{
        "title": "[논문리뷰] D-HUMOR: Dark Humor Understanding via Multimodal Open-ended Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Sai Kartheek Reddy Kasu, Mohammad Zia Ur Rehman, Shahid Shafi Dar, Rishi Bharat Junghare, Dhanvin Sanjay Namboodiri, Nagendra Kumar 핵심 연구 목표 온라인 밈(meme)에서 암묵적이고 문화적으로 민감한 다크 유머를 이해하고 탐지하는 문제를 해결하는 것을 목표로 합니다. 기존 자원 및 방법론의 부족을 다루기 위해 다중모드...","categories": ["Review"],
        "tags": ["Review","Dark Humor Detection","Multimodal Reasoning","Vision-Language Models (VLMs)","Iterative Reasoning Refinement","Meme Analysis","Content Moderation","Cross-Modal Attention","Dataset Annotation"],
        "url": "/ai/review/2025-9-9-D-HUMOR_Dark_Humor_Understanding_via_Multimodal_Open-ended_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Does DINOv3 Set a New Medical Vision Standard?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Che Liu, Yinda Chen, Haoyuan Shi, Jinpeng Lu, Bailiang Jian, Jiazhen Pan, Linghan Cai, Jiayi Wang, Yundi Zhang, Jun Li, Cosmin I. Bercea, Cheng Ouyang, Chen Chen, Zhiwei Xiong, Benedikt Wiestler, Christian Wachinger, Daniel Rueckert, Wenjia Bai, Rossella Arcucci 핵심 연구 목표 본 연구는...","categories": ["Review"],
        "tags": ["Review","Medical Imaging","Foundation Models","DINOv3","Self-Supervised Learning","Vision Transformer","2D/3D Classification","Segmentation","Domain Adaptation","Scaling Laws"],
        "url": "/ai/review/2025-9-9-Does_DINOv3_Set_a_New_Medical_Vision_Standard/",
        "teaser": null
      },{
        "title": "[논문리뷰] Easier Painting Than Thinking: Can Text-to-Image Models Set the Stage, but Not Direct the Play?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ouxiang Li, Yuan Wang, Xinting Hu, Huijuan Huang, Rui Chen, Jiarong Ou, Xin Tao, Pengfei Wan, Fuli Feng 핵심 연구 목표 본 논문은 기존 텍스트-투-이미지(T2I) 벤치마크의 한계를 해결하고, T2I 모델의 구성(composition) 및 추론(reasoning) 능력을 포괄적이고 복합적인 실제 시나리오에서 평가하기 위한 새로운 벤치마크를 제시합니다. 특히,...","categories": ["Review"],
        "tags": ["Review","Text-to-Image Generation","T2I Benchmarking","Compositional Reasoning","Deductive Inference","Inductive Inference","Abductive Inference","MLLM Evaluation"],
        "url": "/ai/review/2025-9-9-Easier_Painting_Than_Thinking_Can_Text-to-Image_Models_Set_the_Stage_but_Not_Direct_the_Play/",
        "teaser": null
      },{
        "title": "[논문리뷰] Focusing by Contrastive Attention: Enhancing VLMs' Visual Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuyao Ge, Shenghua Liu, Yiwei Wang, Lingrui Mei, Baolong Bi, Xuanshan Zhou, Jiayu Yao, Jiafeng Guo, Xueqi Cheng 핵심 연구 목표 본 논문은 복잡한 시각 환경에서 Vision-Language Models (VLMs)의 추론 성능이 저하되는 문제를 해결하고자 합니다. 특히, 시각적 복잡성이 VLM의 어텐션 메커니즘을 분산시켜 작업 관련...","categories": ["Review"],
        "tags": ["Review","Vision-Language Models (VLMs)","Visual Reasoning","Attention Mechanisms","Contrastive Learning","Noise Suppression","Visual Complexity","Training-Free"],
        "url": "/ai/review/2025-9-9-Focusing_by_Contrastive_Attention_Enhancing_VLMs_Visual_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Interleaving Reasoning for Better Text-to-Image Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shixiang Tang, Shaosheng Cao, Zheyong Xie, Shuang Chen, Wenxuan Huang 핵심 연구 목표 본 논문은 기존 텍스트-이미지(T2I) 생성 모델의 명령어 준수 및 세부 묘사 능력 한계를 극복하는 것을 목표로 합니다. 특히, 인터리빙 추론(Interleaving Reasoning) 메커니즘을 통합하여 T2I 생성의 시각적 품질과 미세한 디테일 표현을 향상시키는...","categories": ["Review"],
        "tags": ["Review","Text-to-Image Generation","Interleaving Reasoning","Multimodal Learning","Visual Quality","Fine-grained Detail","Diffusion Models","Self-Correction"],
        "url": "/ai/review/2025-9-9-Interleaving_Reasoning_for_Better_Text-to-Image_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Llama-GENBA-10B: A Trilingual Large Language Model for German, English and Bavarian",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Michael Hoffmann, Jophin John, Stefan Schweter, Gokul Ramakrishnan, Alice Zhang, Dmitry Gaynullin, Hoi-Fong Mak, Nicolay J. Hammer 핵심 연구 목표 대규모 언어 모델(LLM)의 영어 중심 편향을 해결하고, 독일어, 영어, 바이에른어(Bavarian)를 지원하는 삼중 언어 기반 모델인 Llama-GENBA-10B를 개발하는 것을 목표로 합니다. 특히 바이에른어와 같은 저자원...","categories": ["Review"],
        "tags": ["Review","Multilingual LLM","Low-Resource Language","German","Bavarian Dialect","Cross-Lingual Transfer","Continuous Pretraining","Llama-3.1","Model Expansion"],
        "url": "/ai/review/2025-9-9-Llama-GENBA-10B_A_Trilingual_Large_Language_Model_for_German_English_and_Bavarian/",
        "teaser": null
      },{
        "title": "[논문리뷰] MAS-Bench: A Unified Benchmark for Shortcut-Augmented Hybrid Mobile GUI Agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Pengxiang Zhao, Guangyi Liu, Yaozhen Liang, Weiqing He, Zhengxi Lu, Yuehao Huang, Yaxuan Guo, Kexin Zhang, Hao Wang, Liang Liu, Yong Liu 핵심 연구 목표 이 논문은 모바일 GUI 에이전트의 효율성을 높이기 위해 GUI 작업과 효율적인 바로가기(shortcuts)를 결합한 하이브리드 패러다임의 체계적인 벤치마킹 프레임워크가 부족하다는...","categories": ["Review"],
        "tags": ["Review","Mobile GUI Agents","Hybrid Automation","Shortcut Generation","Benchmark","Task Efficiency","LLM-based Agents","Mobile Robotics"],
        "url": "/ai/review/2025-9-9-MAS-Bench_A_Unified_Benchmark_for_Shortcut-Augmented_Hybrid_Mobile_GUI_Agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] Paper2Agent: Reimagining Research Papers As Interactive and Reliable AI Agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiacheng Miao, Joe R. Davis, Jonathan K. Pritchard, James Zou 핵심 연구 목표 본 논문은 정적인 연구 논문이 가진 기술적 장벽으로 인해 코드 및 방법론의 활용과 확산이 어려운 문제를 해결하고자 합니다. 연구는 논문을 상호작용적이고 신뢰할 수 있는 AI 에이전트로 변환하여 연구 결과의 다운스트림 활용,...","categories": ["Review"],
        "tags": ["Review","AI Agents","Research Reproducibility","Scientific Communication","Model Context Protocol (MCP)","Natural Language Interaction","Genomics","Single-Cell Analysis","Spatial Transcriptomics"],
        "url": "/ai/review/2025-9-9-Paper2Agent_Reimagining_Research_Papers_As_Interactive_and_Reliable_AI_Agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] Reinforced Visual Perception with Tools",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zetong Zhou, Dongping Chen, Zixian Ma, Zhihan Hu, Mingyang Fu, Sinan Wang, Yao Wan, Zhou Zhao, Ranjay Krishna 핵심 연구 목표 본 논문은 멀티모달 대규모 언어 모델(LLM)이 복잡한 시각적 추론 문제를 해결하고 외부 시각 도구를 효과적으로 활용하는 능력을 강화하는 것을 목표로 합니다. 기존 지도...","categories": ["Review"],
        "tags": ["Review","Visual Reasoning","Multimodal LLMs","Reinforcement Learning","Tool Usage","Perception-heavy Benchmarks","GRPO","Vision Tools"],
        "url": "/ai/review/2025-9-9-Reinforced_Visual_Perception_with_Tools/",
        "teaser": null
      },{
        "title": "[논문리뷰] Reinforcement Learning Foundations for Deep Research Systems: A Survey",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wenjun Li, Zhi Chen, Jingru Lin, Hannan Cao, Wei Han, Sheng Liang, Zhi Zhang, Kuicai Dong, Dexun Li, Chen Zhang, Yong Liu 핵심 연구 목표 본 논문은 복잡한 다단계 작업을 해결하는 딥 리서치 에이전트(agentic AI) 훈련을 위한 강화 학습(RL) 기반 기술을 체계적으로 조사합니다. 기존...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Deep Research Systems","Agentic AI","Tool Use","Hierarchical Agents","Reward Design","Multimodal AI","RL Frameworks"],
        "url": "/ai/review/2025-9-9-Reinforcement_Learning_Foundations_for_Deep_Research_Systems_A_Survey/",
        "teaser": null
      },{
        "title": "[논문리뷰] Reverse-Engineered Reasoning for Open-Ended Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wangchunshu Zhou, Minghao Liu, Qixin Xu, Haoran Que, Haozhe Wang 핵심 연구 목표 개방형(open-ended) 및 창의적 생성과 같이 검증 불가능한 도메인에서 대규모 언어 모델(LLM)에 깊이 있는 추론 능력을 부여하는 것이 이 연구의 핵심 목표입니다. 기존의 강화 학습(RL) 및 증류(distillation) 방식의 한계, 즉 명확한 보상...","categories": ["Review"],
        "tags": ["Review","Deep Reasoning","Open-Ended Generation","Reverse-Engineered Reasoning (REER)","LLMs","Synthetic Data","Iterative Refinement","Perplexity Minimization","DeepWriting-20K"],
        "url": "/ai/review/2025-9-9-Reverse-Engineered_Reasoning_for_Open-Ended_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Revolutionizing Reinforcement Learning Framework for Diffusion Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yinjie Wang, Ling Yang, Bowen Li, Ye Tian, Ke Shen, Mengdi Wang 핵심 연구 목표 본 논문은 확산 언어 모델(DLMs)의 기존 강화 학습(RL) 프레임워크의 한계를 해결하고자 합니다. 특히, 사후 훈련 목표와 추론 궤적 간의 불일치를 개선하고, 다양한 DLM 아키텍처(full-attention 및 block-attention)에 적용 가능한 통일되고...","categories": ["Review"],
        "tags": ["Review","Diffusion Language Models","Reinforcement Learning","Trajectory-aware RL","Value Model","Masked Diffusion Models","Large Language Models","Reasoning Tasks","Code Generation"],
        "url": "/ai/review/2025-9-9-Revolutionizing_Reinforcement_Learning_Framework_for_Diffusion_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] R^textbf{2AI}: Towards Resistant and Resilient AI in an Evolving World",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Youbang Sun, Xiang Wang, Jie Fu, Chaochao Lu, Bowen Zhou 핵심 연구 목표 이 논문은 급증하는 AI 역량과 뒤처지는 안전성 발전 간의 지속적인 격차를 해결하고자 합니다. 기존의 수동적이고 반응적인 안전 접근 방식의 한계를 지적하며, 예측 불가능한 위험에 적응하고 지능과 함께 진화하는 본질적으로 안전한 AI를...","categories": ["Review"],
        "tags": ["Review","AI Safety","Resistant AI","Resilient AI","Coevolution","Fast-Slow Models","Adversarial Training","Continual Learning","AGI Alignment"],
        "url": "/ai/review/2025-9-9-Rtextbf2AI_Towards_Resistant_and_Resilient_AI_in_an_Evolving_World/",
        "teaser": null
      },{
        "title": "[논문리뷰] Saturation-Driven Dataset Generation for LLM Mathematical Reasoning in the TPTP Ecosystem",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Valentin Quesnel, Damien Sileo 핵심 연구 목표 대규모 언어 모델(LLM)의 수학적 추론 능력 향상을 저해하는 고품질, 논리적으로 건전한 데이터의 부족 문제를 해결하는 것이 주된 목표입니다. 수십 년간의 자동화된 정리 증명(ATP) 연구를 확장 가능한 데이터 엔진으로 전환하여 LLM의 학습을 위한 대규모의 검증된 수학적 명제 및...","categories": ["Review"],
        "tags": ["Review","Automated Theorem Proving","LLM","Mathematical Reasoning","Synthetic Data Generation","TPTP Ecosystem","Saturation Proving","Proof Graph Reconstruction","Data Augmentation"],
        "url": "/ai/review/2025-9-9-Saturation-Driven_Dataset_Generation_for_LLM_Mathematical_Reasoning_in_the_TPTP_Ecosystem/",
        "teaser": null
      },{
        "title": "[논문리뷰] Scaling up Multi-Turn Off-Policy RL and Multi-Agent Tree Search for LLM Step-Provers",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xia Xiao, Kun Yuan, Yanchen Nie, Zeyu Zheng, Ran Xin 핵심 연구 목표 논문은 대규모 언어 모델(LLM) 기반 자동화된 정리 증명 시스템에서 발생하는 훈련 시간(training-time) 확장성과 추론 시간(inference-time) 컴퓨팅이라는 두 가지 핵심 과제를 해결하는 것을 목표로 합니다. 특히, RL 성능 정체 현상을 극복하고, 복잡한...","categories": ["Review"],
        "tags": ["Review","LLM Step-Provers","Reinforcement Learning (RL)","Off-Policy RL","Multi-Agent Systems","Tree Search","Automated Theorem Proving (ATP)","Formal Mathematics","AlphaZero"],
        "url": "/ai/review/2025-9-9-Scaling_up_Multi-Turn_Off-Policy_RL_and_Multi-Agent_Tree_Search_for_LLM_Step-Provers/",
        "teaser": null
      },{
        "title": "[논문리뷰] Test-Time Scaling in Reasoning Models Is Not Effective for Knowledge-Intensive Tasks Yet",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: James Xu Zhao, Bryan Hooi, See-Kiong Ng 핵심 연구 목표 본 논문은 지식 집약적 태스크에서 Test-Time Scaling 기법이 모델의 정확도와 환각(hallucination) 감소에 효과적인지 종합적으로 평가하는 것을 목표로 합니다. 특히, 추론 시간을 늘리는 것이 팩트 기반 질문 답변 성능에 미치는 영향을 분석하고, 추론 과정의 연장이...","categories": ["Review"],
        "tags": ["Review","Test-Time Scaling","Reasoning Models","Knowledge-Intensive Tasks","Hallucinations","Factual Accuracy","Chain-of-Thought","Large Language Models"],
        "url": "/ai/review/2025-9-9-Test-Time_Scaling_in_Reasoning_Models_Is_Not_Effective_for_Knowledge-Intensive_Tasks_Yet/",
        "teaser": null
      },{
        "title": "[논문리뷰] UniVerse-1: Unified Audio-Video Generation via Stitching of Experts",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Duomin Wang, Wei Zuo, Aojie Li, Ling-Hao Chen, Deyu Zhou, Zixin Yin, Xili Dai, Daxin Jiang, Gang Yu 핵심 연구 목표 본 논문은 기존 비디오 생성 모델들이 시각적 도메인에만 집중하여 오디오-비디오의 다중 모달 특성을 간과하는 문제를 해결하고, Google Veo3와 같은 폐쇄형 시스템에 필적하는 통합된...","categories": ["Review"],
        "tags": ["Review","Unified Audio-Video Generation","Stitching of Experts (SoE)","Multimodal Diffusion","Online Annotation","Cross-modal Noise Correlation","Foundation Models","Verse-Bench"],
        "url": "/ai/review/2025-9-9-UniVerse-1_Unified_Audio-Video_Generation_via_Stitching_of_Experts/",
        "teaser": null
      },{
        "title": "[논문리뷰] WebExplorer: Explore and Evolve for Training Long-Horizon Web Agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Junteng Liu, Yunji Li, Chi Zhang, Jingyang Li, Aili Chen, et al. 핵심 연구 목표 본 논문은 복잡한 정보 탐색과 다단계 웹 탐색을 요구하는 장기 웹 에이전트를 훈련하기 위한 핵심 과제인 고품질 훈련 데이터 부족 문제를 해결하고자 합니다. 기존 웹 에이전트의 제한적인 정보 탐색...","categories": ["Review"],
        "tags": ["Review","Web Agents","Long-Horizon Reasoning","Large Language Models (LLMs)","Data Generation","Reinforcement Learning (RL)","Supervised Fine-tuning (SFT)","Web Navigation","Information Retrieval"],
        "url": "/ai/review/2025-9-9-WebExplorer_Explore_and_Evolve_for_Training_Long-Horizon_Web_Agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] Causal Attention with Lookahead Keys",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhuoqing Song, Peng Sun, Huizhuo Yuan, Quanquan Gu 핵심 연구 목표 이 연구는 자기회귀(autoregressive) 언어 모델의 핵심 구성 요소인 표준 인과적 어텐션(causal attention)이 이전 문맥에만 의존하여 전역적 문맥 파악과 자연어 이해 능력을 저해하는 문제를 해결하는 것을 목표로 합니다. 각 토큰의 키(key)가 문맥이 전개됨에 따라...","categories": ["Review"],
        "tags": ["Review","Causal Attention","Lookahead Keys","Autoregressive Modeling","Language Models","Transformer","Perplexity Reduction","Parallel Training","Efficient Inference"],
        "url": "/ai/review/2025-9-10-Causal_Attention_with_Lookahead_Keys/",
        "teaser": null
      },{
        "title": "[논문리뷰] Curia: A Multi-Modal Foundation Model for Radiology",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Corentin Dancette, Julien Khlaut, Antoine Saporta, Helene Philippe, Elodie Ferreres, Baptiste Callard, Théo Danielou, Léo Alberge, Léo Machado, Daniel Tordjman, Julie Dupuis, Korentin Le Floch, Jean Du Terrail, Mariam Moshiri, Laurent Dercle, Tom Boeken, Jules Gregory, Maxime Ronot, François Legou, Pascal Roux, Marc Sapoval,...","categories": ["Review"],
        "tags": ["Review","Foundation Model","Radiology","Computed Tomography (CT)","Magnetic Resonance Imaging (MRI)","Self-supervised Learning","Vision Transformer","Cross-Modality Generalization"],
        "url": "/ai/review/2025-9-10-Curia_A_Multi-Modal_Foundation_Model_for_Radiology/",
        "teaser": null
      },{
        "title": "[논문리뷰] Directly Aligning the Full Diffusion Trajectory with Fine-Grained Human Preference",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiangwei Shen, Zhimin Li, Zhantao Yang, Shiyi Zhang, Yingfang Zhang, Donghao Li, Chunyu Wang, Qinglin Lu, Yansong Tang 핵심 연구 목표 본 논문은 기존 온라인 강화 학습(Online-RL) 기반 확산 모델 정렬 방식의 한계를 극복하는 것을 목표로 합니다. 특히, 다단계 디노이징 과정의 높은 계산 비용으로...","categories": ["Review"],
        "tags": ["Review","Diffusion Models","Reinforcement Learning","Human Preference","Text-to-Image Generation","Reward Hacking","Direct-Align","SRPO","Fine-Grained Control","Flow Matching Models"],
        "url": "/ai/review/2025-9-10-Directly_Aligning_the_Full_Diffusion_Trajectory_with_Fine-Grained_Human_Preference/",
        "teaser": null
      },{
        "title": "[논문리뷰] F1: A Vision-Language-Action Model Bridging Understanding and Generation to Actions",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Qi Lv, Weijie Kong, Hao Li, Jia Zeng, Zherui Qiu, Delin Qu, Haoming Song, Qizhi Chen, Xiang Deng, Jiangmiao Pang 핵심 연구 목표 본 논문은 동적인 시각 환경에서 언어 조건부 태스크를 실행하는 로봇의 한계를 극복하고자 합니다. 기존 Vision-Language-Action (VLA) 모델들이 반응형(reactive) 정책에 의존하여 단기적인...","categories": ["Review"],
        "tags": ["Review","Vision-Language-Action","Embodied AI","Visual Foresight","Predictive Inverse Dynamics","Mixture-of-Transformer","Robot Manipulation","Multi-stage Training","Generalization"],
        "url": "/ai/review/2025-9-10-F1_A_Vision-Language-Action_Model_Bridging_Understanding_and_Generation_to_Actions/",
        "teaser": null
      },{
        "title": "[논문리뷰] Language Self-Play For Data-Free Training",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jakub Grudzien Kuba, Mengting Gu, Qi Ma, Yuandong Tian, Vijai Mohan 핵심 연구 목표 본 연구는 대규모 언어 모델(LLM) 훈련의 핵심 병목인 고품질 훈련 데이터의 지속적인 필요성을 해결하는 것을 목표로 합니다. 데이터에 대한 의존성을 제거하고, 모델이 추가 데이터 없이도 스스로 개선할 수 있도록 하는...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Reinforcement Learning","Self-Play","Data-Free Training","Instruction Following","Adversarial Training","Reward Modeling"],
        "url": "/ai/review/2025-9-10-Language_Self-Play_For_Data-Free_Training/",
        "teaser": null
      },{
        "title": "[논문리뷰] Mini-o3: Scaling Up Reasoning Patterns and Interaction Turns for Visual Search",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xin Lai, Junyi Li, Wei Li, Tao Liu, Tianjian Li, Hengshuang Zhao 핵심 연구 목표 기존 오픈소스 VLM(Vision-Language Model)의 단조로운 추론 패턴과 제한된 상호작용 턴 수로 인해 시행착오적 탐색이 필요한 어려운 시각 검색 작업을 해결하지 못하는 문제를 다룹니다. 본 연구는 Mini-o3라는 시스템을 통해 도구...","categories": ["Review"],
        "tags": ["Review","Visual Search","Multi-Turn Reasoning","Reinforcement Learning","Tool-Integrated Agents","Exploratory Reasoning","Data Augmentation","Over-turn Masking","Visual Language Models"],
        "url": "/ai/review/2025-9-10-Mini-o3_Scaling_Up_Reasoning_Patterns_and_Interaction_Turns_for_Visual_Search/",
        "teaser": null
      },{
        "title": "[논문리뷰] Parallel-R1: Towards Parallel Thinking via Reinforcement Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Tong Zheng, Hongming Zhang, Wenhao Yu, Xiaoyang Wang, Xinyu Yang, et al. 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)이 복잡한 추론 문제에서 병렬적 사고를 습득하도록 훈련하는 데 있어 기존 지도 학습(SFT) 방식의 한계를 극복하고자 합니다. 특히, SFT가 합성 데이터에 의존하여 피상적인 패턴 매칭에...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Parallel Thinking","Reinforcement Learning","Mathematical Reasoning","Progressive Curriculum","Reward Design","Exploration Scaffold"],
        "url": "/ai/review/2025-9-10-Parallel-R1_Towards_Parallel_Thinking_via_Reinforcement_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Q-Sched: Pushing the Boundaries of Few-Step Diffusion Models with Quantization-Aware Scheduling",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Natalia Frumkin, Diana Marculescu 핵심 연구 목표 본 논문은 계산 비용이 높은 텍스트-이미지 확산 모델의 추론 효율성을 개선하는 것을 목표로 합니다. 특히, 기존 소수 단계(few-step) 확산 모델이 여전히 대규모 모델 백본에 의존하고 기존 후속 훈련 양자화(PTQ) 방법론이 완전 정밀도(full-precision) 캘리브레이션을 요구하는 한계를 극복하여, 양자화...","categories": ["Review"],
        "tags": ["Review","Diffusion Models","Quantization","Few-Step Generation","Model Compression","Noise Scheduling","Post-Training Quantization","Image Quality Metrics","Latent Consistency Models"],
        "url": "/ai/review/2025-9-10-Q-Sched_Pushing_the_Boundaries_of_Few-Step_Diffusion_Models_with_Quantization-Aware_Scheduling/",
        "teaser": null
      },{
        "title": "[논문리뷰] Reconstruction Alignment Improves Unified Multimodal Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ji Xie, Trevor Darrell, Luke Zettlemoyer, XuDong Wang 핵심 연구 목표 논문은 통합 멀티모달 모델(UMM)이 이미지-텍스트 쌍으로 훈련될 때 캡션의 희소성으로 인해 미세한 시각적 디테일을 놓치고, 이해와 생성 간의 정렬이 불완전하다는 문제를 해결하고자 합니다. 이를 위해 적은 리소스로 모델의 생성 및 편집 충실도를 개선하는...","categories": ["Review"],
        "tags": ["Review","Unified Multimodal Models","Image Generation","Image Editing","Post-training","Self-supervised Learning","Reconstruction Alignment","Visual Embeddings"],
        "url": "/ai/review/2025-9-10-Reconstruction_Alignment_Improves_Unified_Multimodal_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] SimpleQA Verified: A Reliable Factuality Benchmark to Measure Parametric Knowledge",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Lukas Haas, Gal Yona, Giovanni D’Antonio, Sasha Goldshtein, Dipanjan Das 핵심 연구 목표 Large Language Model (LLM)의 내부 파라미터 기반 사실성(parametric factuality)을 측정하는 데 있어 기존 OpenAI SimpleQA 벤치마크의 한계를 해결하는 것을 목표로 합니다. 부정확한 레이블, 주제 편향, 질문 중복성 등의 문제를 개선하여, 모델의...","categories": ["Review"],
        "tags": ["Review","LLM Factuality","Parametric Knowledge","Benchmark","Question Answering","Data Curation","Evaluation Metrics","Hallucination Mitigation","Large Language Models"],
        "url": "/ai/review/2025-9-10-SimpleQA_Verified_A_Reliable_Factuality_Benchmark_to_Measure_Parametric_Knowledge/",
        "teaser": null
      },{
        "title": "[논문리뷰] Staying in the Sweet Spot: Responsive Reasoning Evolution via Capability-Adaptive Hint Scaffolding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ziheng Li, Zexu Sun, Jinman Zhao, Erxue Min, Yongcheng Zeng, Hui Wu, Hengyi Cai, Shuaiqiang Wang, Dawei Yin, Xu Chen, Zhi-Hong Deng 핵심 연구 목표 대규모 언어 모델(LLM)의 추론 능력 강화를 위한 기존 확인 가능한 보상 강화 학습(RLVR) 방법론이 겪는 탐색 비효율성 문제를 해결하는...","categories": ["Review"],
        "tags": ["Review","RLVR","LLM Reasoning","Adaptive Learning","Hint Scaffolding","Item Response Theory","Exploration Efficiency","Problem Difficulty","Policy Optimization"],
        "url": "/ai/review/2025-9-10-Staying_in_the_Sweet_Spot_Responsive_Reasoning_Evolution_via_Capability-Adaptive_Hint_Scaffolding/",
        "teaser": null
      },{
        "title": "[논문리뷰] UMO: Scaling Multi-Identity Consistency for Image Customization via Matching Reward",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yufeng Cheng, Wenxu Wu, Shaojin Wu, Mengqi Huang, Fei Ding, Qian He 핵심 연구 목표 본 논문은 이미지 커스터마이징 모델에서 다중 정체성(multi-identity)을 생성할 때 발생하는 정체성 일관성 부족(identity consistency)과 정체성 혼란(identity confusion) 문제를 해결하는 것을 목표로 합니다. 특히, 참조 이미지의 수가 증가함에 따라 기존의...","categories": ["Review"],
        "tags": ["Review","Image Customization","Multi-Identity Generation","Identity Consistency","Identity Confusion","Reinforcement Learning","Diffusion Models","Matching Reward","Global Assignment"],
        "url": "/ai/review/2025-9-10-UMO_Scaling_Multi-Identity_Consistency_for_Image_Customization_via_Matching_Reward/",
        "teaser": null
      },{
        "title": "[논문리뷰] Visual Representation Alignment for Multimodal Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Heeji Yoon, Jaewoo Jung, Junwan Kim, Hyungyu Choi, Heeseong Shin, Sangbeom Lim, Honggyu An, Chaehyun Kim, Jisang Han, Chanho Eom, Sunghwan Hong, Seungryong Kim 핵심 연구 목표 본 논문은 시각적 지시 튜닝으로 훈련된 다중 모달 대규모 언어 모델(MLLM)이 객체 카운팅이나 공간 추론과 같은 시각...","categories": ["Review"],
        "tags": ["Review","Multimodal LLMs","Visual Representation Alignment","Foundation Models","Regularization","Fine-grained Visual Understanding","Spatial Reasoning","Object Counting","Vision-Language Models"],
        "url": "/ai/review/2025-9-10-Visual_Representation_Alignment_for_Multimodal_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] ΔL Normalization: Rethink Loss Aggregation in RLVR",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhiyuan He, Xufang Luo, Yike Zhang, Yuqing Yang, Lili Qiu 핵심 연구 목표 이 논문은 Verifiable Rewards를 사용하는 강화 학습 (RLVR) 환경에서 응답 길이의 동적 변화로 인해 발생하는 문제에 주목합니다. 특히 응답 길이의 큰 변동성으로 인한 높은 기울기 분산과 불안정한 최적화 문제를 해결하고, 기존의...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","LLMs","Gradient Variance","Loss Aggregation","Unbiased Estimator","RLVR","Policy Gradient","Normalization"],
        "url": "/ai/review/2025-9-10-%CE%94L_Normalization_Rethink_Loss_Aggregation_in_RLVR/",
        "teaser": null
      },{
        "title": "[논문리뷰] 3D and 4D World Modeling: A Survey",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Lingdong Kong, Wesley Yang, Jianbiao Mei, Youquan Liu, Ao Liang, Dekai Zhu, Dongyue Lu, Wei Yin, Xiaotao Hu, Mingkai Jia, Junyuan Deng, Kaiwen Zhang, Yang Wu, Tianyi Yan, Shenyuan Gao, Song Wang, Linfeng Li, Liang Pan, Yong Liu, Jianke Zhu, Wei Tsang Ooi, Steven...","categories": ["Review"],
        "tags": ["Review","3D World Modeling","4D World Modeling","Generative Models","Predictive Models","LiDAR","Occupancy Grids","Video Generation","Autonomous Driving","Robotics"],
        "url": "/ai/review/2025-9-11-3D_and_4D_World_Modeling_A_Survey/",
        "teaser": null
      },{
        "title": "[논문리뷰] A Survey of Reinforcement Learning for Large Reasoning Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Kaiyan Zhang, Yuxin Zuo, Bingxiang He, Youbang Sun, Runze Liu, Che Jiang, Yuchen Fan, Kai Tian, Guoli Jia, Pengfei Li, Yu Fu, Xingtai Lv, Yuchen Zhang, Sihang Zeng, Shang Qu, Haozhan Li, Shijie Wang, Yuru Wang, Xinwei Long, Fangfu Liu, Xiang Xu, Jiaze Ma,...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Large Reasoning Models","LLMs","Reward Design","Policy Optimization","Verifiable Rewards","Agentic AI","Multimodal AI"],
        "url": "/ai/review/2025-9-11-A_Survey_of_Reinforcement_Learning_for_Large_Reasoning_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] AgentGym-RL: Training LLM Agents for Long-Horizon Decision Making through Multi-Turn Reinforcement Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhiheng Xi, Jixuan Huang, Chenyang Liao, Baodai Huang, Honglin Guo, Jiaqi Liu, Rui Zheng, Junjie Ye, Jiazheng Zhang, Wenxiang Chen, Wei He, Yiwen Ding, Guanyu Li, Zehui Chen, Zhengyin Du, Xuesong Yao, Yufei Xu, Jiecao Chen, Tao Gui, Zuxuan Wu, Qi Zhang, Xuanjing Huang,...","categories": ["Review"],
        "tags": ["Review","LLM Agents","Reinforcement Learning","Multi-Turn Interaction","Long-Horizon Decision Making","Agent Framework","Exploration-Exploitation","Progressive Scaling"],
        "url": "/ai/review/2025-9-11-AgentGym-RL_Training_LLM_Agents_for_Long-Horizon_Decision_Making_through_Multi-Turn_Reinforcement_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] EnvX: Agentize Everything with Agentic AI",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Linyao Chen, Zimian Peng, Yingxuan Yang, Yikun Wang, Wenzheng Tom Tang, Hiroki H. Kobayashi, Weinan Zhang 핵심 연구 목표 이 논문은 오픈소스 코드 저장소의 재활용 및 협업의 비효율성을 해결하기 위해, 저장소를 지능적인 자율 에이전트로 변환하는 프레임워크인 EnvX를 제안합니다. 기존의 정적인 코드 자원을 넘어, 자연어...","categories": ["Review"],
        "tags": ["Review","Agentic AI","Multi-Agent Systems","Code Repository","Agentization","Natural Language Interaction","Agent-to-Agent Protocol","LLM-based Agents"],
        "url": "/ai/review/2025-9-11-EnvX_Agentize_Everything_with_Agentic_AI/",
        "teaser": null
      },{
        "title": "[논문리뷰] HumanAgencyBench: Scalable Evaluation of Human Agency Support in AI Assistants",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Benjamin Sturgeon, Daniel Samuelson, Jacob Haimes, Jacy Reese Anthis 핵심 연구 목표 AI에 대한 인간의 의존도가 높아짐에 따라 개인 및 집단적 통제력을 상실하는 ‘인간 에이전시 상실’ 문제에 대응하고자 합니다. 본 논문은 AI 어시스턴트가 인간의 에이전시를 얼마나 잘 지원하는지 평가하기 위한 확장 가능하고 적응적인 벤치마크...","categories": ["Review"],
        "tags": ["Review","Human Agency","AI Assistants","LLM Evaluation","Benchmark","Sociotechnical AI","AI Alignment","Scalable Evaluation"],
        "url": "/ai/review/2025-9-11-HumanAgencyBench_Scalable_Evaluation_of_Human_Agency_Support_in_AI_Assistants/",
        "teaser": null
      },{
        "title": "[논문리뷰] Hunyuan-MT Technical Report",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yang Du, Mingyang Song, Bingxin Qu, Zheng Li, Mao Zheng 핵심 연구 목표 본 논문은 오픈소스 다국어 기계 번역 모델인 Hunyuan-MT-7B 및 Hunyuan-MT-Chimera-7B를 소개하며, 33개 언어에 대한 양방향 번역에서 최첨단 성능을 달성하고 특히 만다린어와 소수 민족 언어 및 방언 번역의 품질을 향상시키는 것을 목표로...","categories": ["Review"],
        "tags": ["Review","Machine Translation","Large Language Model","Multilingual","Low-Resource Languages","Reinforcement Learning","Weak-to-Strong Learning","Slow Thinking"],
        "url": "/ai/review/2025-9-11-Hunyuan-MT_Technical_Report/",
        "teaser": null
      },{
        "title": "[논문리뷰] P3-SAM: Native 3D Part Segmentation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Changfeng Ma, Yang Li, Xinhao Yan, Jiachen Xu, Yunhan Yang, Chunshi Wang, Zibo Zhao, Yanwen Guo, Zhuo Chen, Chunchao Guo 핵심 연구 목표 본 논문은 기존 3D 파트 분할 방법론의 한계, 특히 복잡한 객체에 대한 불충분한 견고성과 완전한 자동화의 부재를 극복하고자 합니다. 2D SAM...","categories": ["Review"],
        "tags": ["Review","3D Part Segmentation","Point Cloud Segmentation","Prompt-based Segmentation","Deep Learning","Transformer","Interactive Segmentation","Automatic Segmentation","Native 3D"],
        "url": "/ai/review/2025-9-11-P3-SAM_Native_3D_Part_Segmentation/",
        "teaser": null
      },{
        "title": "[논문리뷰] RewardDance: Reward Scaling in Visual Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jie Wu, Yu Gao, Zilyu Ye, Ming Li, Liang Li, Hanzhong Guo, Jie Liu, Zeyue Xue, Xiaoxia Hou, Wei Liu, Yan Zeng, Weilin Huang 핵심 연구 목표 시각 생성 모델의 RM(Reward Model) 스케일링 패러다임이 기존 CLIP 기반 RM의 아키텍처 및 입력 제약, Bradley-Terry 손실과...","categories": ["Review"],
        "tags": ["Review","Reward Model","Visual Generation","RLHF","VLM","Reward Scaling","Reward Hacking","Generative Paradigm","Context Scaling","Text-to-Image","Text-to-Video"],
        "url": "/ai/review/2025-9-11-RewardDance_Reward_Scaling_in_Visual_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] <think> So let's replace this phrase with insult... </think> Lessons learned from generation of toxic texts with LLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Sergey Pletenev, Daniil Moskovskiy, Alexander Panchenko 핵심 연구 목표 본 연구는 대규모 언어 모델(LLM)이 생성한 독성 텍스트가 텍스트 정화(detoxification) 모델 훈련을 위한 인간 주석 데이터를 효과적으로 대체할 수 있는지 평가하는 것을 목표로 합니다. 특히 LLM이 생성하는 독성 텍스트의 품질과 다양성을 분석하여, 합성 데이터의 한계를...","categories": ["Review"],
        "tags": ["Review","Toxic Text Generation","LLMs","Text Detoxification","Lexical Diversity","Synthetic Data","Human Annotation","Style Transfer"],
        "url": "/ai/review/2025-9-11-think_So_lets_replace_this_phrase_with_insult/._think_Lessons_learned_from_generation_of_toxic_texts_with_LLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] 2D Gaussian Splatting with Semantic Alignment for Image Inpainting",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hongyu Li, Chaofeng Chen, Xiaoming Li, Guangming Lu 핵심 연구 목표 본 논문은 기존 이미지 인페인팅 방법론의 이산적인 픽셀 처리 방식이 갖는 한계를 극복하고, 2D Gaussian Splatting(2DGS)의 연속적인 특성을 활용하여 픽셀 수준의 일관성과 전역적인 의미론적 정합성을 갖춘 고품질 이미지 인페인팅 프레임워크를 개발하는 것을 목표로...","categories": ["Review"],
        "tags": ["Review","Image Inpainting","2D Gaussian Splatting","Semantic Alignment","DINO Features","Patch-level Rasterization","Continuous Representation","Generative Models"],
        "url": "/ai/review/2025-9-12-2D_Gaussian_Splatting_with_Semantic_Alignment_for_Image_Inpainting/",
        "teaser": null
      },{
        "title": "[논문리뷰] Can Understanding and Generation Truly Benefit Together -- or Just Coexist?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhiyuan Yan, Kaiqing Lin, Zongjian Li, Junyan Ye, Hui Han, Zhendong Wang, Hao Liu, Bin Lin, Hao Li, Xue Xu, Xinyan Xiao, Jingdong Wang, Haifeng Wang, Li Yuan 핵심 연구 목표 이 논문은 멀티모달 이해(I2T)와 생성(T2I) 간의 근본적인 불일치를 해결하고, 이들이 단순히 공존하는 것을...","categories": ["Review"],
        "tags": ["Review","Multimodal Understanding","Multimodal Generation","Unified Models","Auto-Encoder","Reinforcement Learning","Image-to-Text","Text-to-Image","Reconstruction Fidelity"],
        "url": "/ai/review/2025-9-12-Can_Understanding_and_Generation_Truly_Benefit_Together_--_or_Just_Coexist/",
        "teaser": null
      },{
        "title": "[논문리뷰] EchoX: Towards Mitigating Acoustic-Semantic Gap via Echo Training for Speech-to-Speech LLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuhao Zhang, Yuhao Du, Zhanchen Dai, Xiangnan Ma, Kaiqi Kou, Benyou Wang, Haizhou Li 핵심 연구 목표 본 논문은 텍스트 기반 LLM에서 파생된 SLLM(Speech-to-Speech Large Language Models)이 지식 및 추론 능력에서 저하를 보이는 문제에 주목합니다. 이는 현재 SLLM 훈련 패러다임이 특징 표현 공간에서 음향-의미론적...","categories": ["Review"],
        "tags": ["Review","Speech-to-Speech LLMs","Acoustic-Semantic Gap","Echo Training","Unit Language","Streaming Inference","Knowledge-based QA"],
        "url": "/ai/review/2025-9-12-EchoX_Towards_Mitigating_Acoustic-Semantic_Gap_via_Echo_Training_for_Speech-to-Speech_LLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] FLUX-Reason-6M & PRISM-Bench: A Million-Scale Text-to-Image Reasoning Dataset and Comprehensive Benchmark",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Rongyao Fang, Aldrich Yu, Chengqi Duan, Linjiang Huang, Shuai Bai, Yuxuan Cai, Kun Wang, Si Liu, Xihui Liu, Hongsheng Li 핵심 연구 목표 본 연구는 오픈소스 Text-to-Image (T2I) 모델의 추론 능력 발전을 저해하는 대규모 추론 중심 데이터셋과 포괄적인 평가 벤치마크의 부재를 해결하는 것을 목표로...","categories": ["Review"],
        "tags": ["Review","Text-to-Image Generation","Reasoning Dataset","Benchmark","Generation Chain-of-Thought","Vision-Language Model","Image Aesthetics","Prompt Alignment"],
        "url": "/ai/review/2025-9-12-FLUX-Reason-6M_PRISM-Bench_A_Million-Scale_Text-to-Image_Reasoning_Dataset_and_Comprehensive_Benchmark/",
        "teaser": null
      },{
        "title": "[논문리뷰] Gradient-Attention Guided Dual-Masking Synergetic Framework for Robust Text-based Person Retrieval",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Tianlu Zheng, Yifan Zhang, Xiang An, Ziyong Feng, Kaicheng Yang, Qichuan Ding 핵심 연구 목표 본 연구는 텍스트 기반 인물 검색(Text-based Person Retrieval)에서 CLIP의 성능 저하를 야기하는 두 가지 주요 문제점을 해결하는 것을 목표로 합니다. 첫째, 인물 중심 이미지-텍스트 데이터의 부족과 노이즈, 둘째, 글로벌...","categories": ["Review"],
        "tags": ["Review","Text-based Person Retrieval","CLIP","MLLM","Data Curation","Dual-Masking","Gradient-Attention","WebPerson Dataset"],
        "url": "/ai/review/2025-9-12-Gradient-Attention_Guided_Dual-Masking_Synergetic_Framework_for_Robust_Text-based_Person_Retrieval/",
        "teaser": null
      },{
        "title": "[논문리뷰] Harnessing Uncertainty: Entropy-Modulated Policy Gradients for Long-Horizon LLM Agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiawei Wang, Jiacai Liu, Yuqian Fu, Yingru Li, Xintao Wang, Yuan Lin, Yu Yue, Lin Zhang, Yang Wang, Ke Wang 핵심 연구 목표 본 논문은 장기 시퀀스(long-horizon) LLM 에이전트 태스크에서 희소한 보상(sparse rewards)으로 인해 발생하는 신용 할당(credit assignment) 문제와 정책 경사(policy gradient)의 비효율적인 업데이트...","categories": ["Review"],
        "tags": ["Review","LLM Agents","Reinforcement Learning","Policy Gradients","Entropy Modulation","Credit Assignment","Uncertainty","Long-Horizon Tasks","Self-Calibrating Gradient Scaling"],
        "url": "/ai/review/2025-9-12-Harnessing_Uncertainty_Entropy-Modulated_Policy_Gradients_for_Long-Horizon_LLM_Agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] HuMo: Human-Centric Video Generation via Collaborative Multi-Modal Conditioning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Liyang Chen, Tianxiang Ma, Jiawei Liu, Bingchuan Li, Zhuowei Chen 핵심 연구 목표 본 논문은 사람 중심 비디오 생성(HCVG)에서 겪는 두 가지 주요 문제, 즉 다중 모드 조건(텍스트, 이미지, 오디오)의 희소한 학습 데이터와 주제 보존 및 오디오-시각 동기화 간의 효과적인 협업 제어의 어려움을 해결하고자...","categories": ["Review"],
        "tags": ["Review","Human-Centric Video Generation","Multimodal Conditioning","Text-to-Video","Image-to-Video","Audio-to-Video","Diffusion Models","Subject Preservation","Audio-Visual Synchronization","Progressive Training"],
        "url": "/ai/review/2025-9-12-HuMo_Human-Centric_Video_Generation_via_Collaborative_Multi-Modal_Conditioning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Kling-Avatar: Grounding Multimodal Instructions for Cascaded Long-Duration Avatar Animation Synthesis",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yikang Ding, Jiwen Liu, Wenyuan Zhang, Zekun Wang, Wentao Hu 핵심 연구 목표 기존 아바타 애니메이션 방법론의 지시 불이행 및 장기적 일관성 부족 문제를 해결하고, 오디오, 이미지, 텍스트 등 다중 모드 지시를 심층적으로 이해하여 표정, 동작, 립싱크가 정교하고 사실적인 고품질 장기 아바타 애니메이션을 생성하는...","categories": ["Review"],
        "tags": ["Review","Avatar Animation","Multimodal Instructions","Long-Duration Video Generation","MLLM Director","Cascaded Framework","Lip Synchronization","Instruction Grounding","Video Diffusion Transformers"],
        "url": "/ai/review/2025-9-12-Kling-Avatar_Grounding_Multimodal_Instructions_for_Cascaded_Long-Duration_Avatar_Animation_Synthesis/",
        "teaser": null
      },{
        "title": "[논문리뷰] LoCoBench: A Benchmark for Long-Context Large Language Models in Complex Software Engineering",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jianguo Zhang, Rithesh Murthy, Zhiwei Liu, Zuxin Liu, Jielin Qiu 핵심 연구 목표 본 논문은 기존 코드 평가 벤치마크의 한계를 극복하고, 수백만 토큰으로 확장된 컨텍스트 윈도우를 가진 LLM이 현실적이고 복잡한 소프트웨어 개발 시나리오에서 긴 컨텍스트를 얼마나 잘 이해하고 활용하는지를 종합적으로 평가하는 것을 목표로 합니다....","categories": ["Review"],
        "tags": ["Review","Long-Context LLMs","Software Engineering","Code Evaluation","Benchmark","Multi-file Reasoning","Architectural Understanding","Context Length","Software Development Lifecycle","Metrics"],
        "url": "/ai/review/2025-9-12-LoCoBench_A_Benchmark_for_Long-Context_Large_Language_Models_in_Complex_Software_Engineering/",
        "teaser": null
      },{
        "title": "[논문리뷰] Modality Alignment with Multi-scale Bilateral Attention for Multimodal Recommendation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Kelin Ren, Chan-Yang Ju, Dong-Ho Lee 핵심 연구 목표 본 논문은 기존 멀티모달 추천 시스템의 두 가지 주요 한계를 해결하고자 합니다: (1) 미세-정교한 교차-모달 연관성을 모델링하는 능력 부족으로 인한 최적 이하의 융합 품질, (2) 전역 분포 수준의 일관성 부족으로 발생하는 표현 편향. 이를 위해...","categories": ["Review"],
        "tags": ["Review","Multimodal Recommendation","Modality Alignment","Attention Mechanism","Dilated Convolution","Maximum Mean Discrepancy","Contrastive Learning","Dimensionality Reduction"],
        "url": "/ai/review/2025-9-12-Modality_Alignment_with_Multi-scale_Bilateral_Attention_for_Multimodal_Recommendation/",
        "teaser": null
      },{
        "title": "[논문리뷰] OmniEVA: Embodied Versatile Planner via Task-Adaptive 3D-Grounded and Embodiment-aware Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuzheng Zhuang, Zhanguang Zhang, Shiguang Wu, Dafeng Chi, Yuecheng Liu 핵심 연구 목표 본 논문은 기존 MLLM 기반 Embodied 시스템의 Geometric Adaptability Gap (다양한 공간 요구사항에 대한 3D 정보 부족)과 Embodiment Constraint Gap (실제 로봇의 물리적 제약 무시)이라는 두 가지 핵심 한계를 해결하고자 합니다....","categories": ["Review"],
        "tags": ["Review","Embodied AI","Multimodal LLMs","3D Grounding","Task-Adaptive Reasoning","Embodiment-Aware Planning","Robotics","Spatial Reasoning"],
        "url": "/ai/review/2025-9-12-OmniEVA_Embodied_Versatile_Planner_via_Task-Adaptive_3D-Grounded_and_Embodiment-aware_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Reasoning Introduces New Poisoning Attacks Yet Makes Them More Complicated",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hanna Foerster, Ilia Shumailov, Jamie Hayes, Robert Mullins, Yiren Zhao, Harsh Chaudhari, Yarin Gal 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)의 단계별 추론(Chain-of-Thought, CoT) 능력이 새로운 유형의 데이터 포이즈닝 공격 기회를 제공함과 동시에, 이러한 공격을 최종 답변으로 유도하는 것을 복잡하게 만드는 예상치 못한...","categories": ["Review"],
        "tags": ["Review","LLM Security","Data Poisoning","Chain-of-Thought","Reasoning Models","Backdoor Attacks","CoT Unfaithfulness","Emergent Robustness"],
        "url": "/ai/review/2025-9-12-Reasoning_Introduces_New_Poisoning_Attacks_Yet_Makes_Them_More_Complicated/",
        "teaser": null
      },{
        "title": "[논문리뷰] SimpleVLA-RL: Scaling VLA Training via Reinforcement Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhaohui Yang, Yuhao Zhang, Jiale Yu, Yuxin Zuo, Haozhan Li, et al. 핵심 연구 목표 본 논문은 Vision-Language-Action (VLA) 모델이 로봇 조작 태스크에서 겪는 데이터 희소성과 일반화 능력 부족이라는 두 가지 근본적인 문제를 해결하는 것을 목표로 합니다. 특히, 강화 학습(RL)을 통해 VLA 모델의 장기적이고...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning (RL)","Vision-Language-Action (VLA) Models","Robotic Manipulation","Data Scarcity","Generalization","Sim-to-Real Transfer","Online RL","Long-Horizon Planning"],
        "url": "/ai/review/2025-9-12-SimpleVLA-RL_Scaling_VLA_Training_via_Reinforcement_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] SpatialVID: A Large-Scale Video Dataset with Spatial Annotations",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jian Gao, Youtian Lin, Rujie Zheng, Yufeng Yuan, Jiahao Wang 핵심 연구 목표 본 논문은 대규모의 실세계 동적 비디오 데이터셋에 부족한 명시적인 공간 정보 및 풍부한 의미론적 주석의 부재 문제를 해결하고자 합니다. 이는 3D 재구성, 세계 모델링, 그리고 동적 장면 합성과 같은 AI/ML 분야의...","categories": ["Review"],
        "tags": ["Review","Video Dataset","Spatial Annotation","Camera Pose Estimation","Depth Map","Structured Caption","Motion Instruction","3D Vision","World Modeling"],
        "url": "/ai/review/2025-9-12-SpatialVID_A_Large-Scale_Video_Dataset_with_Spatial_Annotations/",
        "teaser": null
      },{
        "title": "[논문리뷰] The Choice of Divergence: A Neglected Key to Mitigating Diversity Collapse in Reinforcement Learning with Verifiable Reward",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Long Li, Jiaran Hao, Jason Klein Liu, Zhijian Zhou, Xiaoyu Tan, et al. 핵심 연구 목표 본 논문은 RLVR (Reinforcement Learning with Verifiable Reward)로 미세 조정된 대규모 언어 모델(LLM)에서 빈번하게 발생하는 Pass@k 성능 저하 및 다양성 붕괴(diversity collapse) 문제를 해결하는 것을 목표로 합니다. 특히,...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Large Language Models (LLMs)","Diversity Collapse","f-divergence","Forward-KL","JS-divergence","Pass@k","Catastrophic Forgetting"],
        "url": "/ai/review/2025-9-12-The_Choice_of_Divergence_A_Neglected_Key_to_Mitigating_Diversity_Collapse_in_Reinforcement_Learning_with_Verifiable_Reward/",
        "teaser": null
      },{
        "title": "[논문리뷰] VLA-Adapter: An Effective Paradigm for Tiny-Scale Vision-Language-Action Model",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yihao Wang, Pengxiang Ding, Lingxiao Li, et al. 핵심 연구 목표 VLA(Vision-Language-Action) 모델이 대규모 VLM(Vision-Language Model)과 광범위한 사전 훈련에 크게 의존하여 발생하는 높은 훈련 비용, 느린 미세 조정, 과도한 VRAM 사용 및 낮은 추론 효율성 문제를 해결하는 것을 목표로 합니다. 본 연구는 VL(Vision-Language) 표현을...","categories": ["Review"],
        "tags": ["Review","Vision-Language-Action Models","Robotics","Multimodal Learning","Efficient AI","Model Adaptation","Bridge Attention","Low-resource Training"],
        "url": "/ai/review/2025-9-12-VLA-Adapter_An_Effective_Paradigm_for_Tiny-Scale_Vision-Language-Action_Model/",
        "teaser": null
      },{
        "title": "[논문리뷰] Visual Programmability: A Guide for Code-as-Thought in Chart Understanding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Bohao Tang, Yan Ma, Fei Zhang, Jiadi Su, Ethan Chern, Zhulin Hu, Zhixin Wang, Pengfei Liu, Ya Zhang 핵심 연구 목표 Vision-Language Models (VLM)이 차트 이해 태스크에서 고정된 추론 전략(예: 외부 도구 의존 또는 단일 Chain-of-Thought)으로 인해 복잡하거나 ‘실제 환경’ 차트에서 성능이 저하되는 문제를...","categories": ["Review"],
        "tags": ["Review","Visual Programmability","Code-as-Thought (CaT)","Chart Understanding","Vision-Language Models (VLMs)","Reinforcement Learning (RL)","Adaptive Reasoning","Dual-Reward System","Multimodal AI"],
        "url": "/ai/review/2025-9-12-Visual_Programmability_A_Guide_for_Code-as-Thought_in_Chart_Understanding/",
        "teaser": null
      },{
        "title": "[논문리뷰] CMHG: A Dataset and Benchmark for Headline Generation of Minority Languages in China",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Guixian Xu, Zeli Su, Ziyin Zhang, Jianing Liu, XU Han, Ting Zhang, Yushuang Dong 핵심 연구 목표 중국 내 소수 언어(티베트어, 위구르어, 몽골어)의 헤드라인 생성을 위한 공개 데이터셋 및 벤치마크 부재 문제를 해결하고자 합니다. 이들 언어는 고유한 문자 체계와 자원 부족으로 인해 NLP 연구에서...","categories": ["Review"],
        "tags": ["Review","Headline Generation","Minority Languages","Low-Resource NLP","Dataset","Benchmark","Natural Language Generation","Chinese Minority Languages"],
        "url": "/ai/review/2025-9-15-CMHG_A_Dataset_and_Benchmark_for_Headline_Generation_of_Minority_Languages_in_China/",
        "teaser": null
      },{
        "title": "[논문리뷰] FLOWER: Democratizing Generalist Robot Policies with Efficient Vision-Language-Action Flow Policies",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Moritz Reuss, Hongyi Zhou, Marcel Rühle, Ömer Erdinç Yağmurlu, Fabian Otto, Rudolf Lioutikov 핵심 연구 목표 본 논문은 현재 Vision-Language-Action (VLA) 정책의 높은 계산 비용과 자원 요구사항 문제를 해결하고자 합니다. 특히, 수십억 개의 파라미터를 가진 대규모 모델 없이도 강력한 성능을 달성하는 효율적인 일반화 로봇...","categories": ["Review"],
        "tags": ["Review","Generalist Robot Policies","Vision-Language-Action Models","Efficient AI","Imitation Learning","Diffusion Models","Intermediate Fusion","Robotics"],
        "url": "/ai/review/2025-9-15-FLOWER_Democratizing_Generalist_Robot_Policies_with_Efficient_Vision-Language-Action_Flow_Policies/",
        "teaser": null
      },{
        "title": "[논문리뷰] HANRAG: Heuristic Accurate Noise-resistant Retrieval-Augmented Generation for Multi-hop Question Answering",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Duolin Sun, Dan Yang, Yue Shen, Yihan Jiao, Zhehao Tan 핵심 연구 목표 본 논문은 멀티-홉 질문(multi-hop queries) 처리 시 기존 RAG(Retrieval-Augmented Generation) 시스템이 겪는 비효율성(과도한 반복 검색), 비합리적인 쿼리(원래 쿼리에 대한 노이즈 검색), 그리고 노이즈 축적 문제를 해결하고자 합니다. 특히 복합(compound) 및 복잡(complex)...","categories": ["Review"],
        "tags": ["Review","Retrieval-Augmented Generation","Multi-hop QA","Noise Resistance","LLM","Query Decomposition","Adaptive Retrieval","Heuristic Framework","Revelator"],
        "url": "/ai/review/2025-9-15-HANRAG_Heuristic_Accurate_Noise-resistant_Retrieval-Augmented_Generation_for_Multi-hop_Question_Answering/",
        "teaser": null
      },{
        "title": "[논문리뷰] InfGen: A Resolution-Agnostic Paradigm for Scalable Image Synthesis",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Tao Han, Wanghan Xu, Junchao Gong, Xiaoyu Yue, Song Guo, Luping Zhou, Lei Bai 핵심 연구 목표 본 논문은 기존 확산 모델이 고해상도 이미지 생성 시 해상도에 따라 연산 요구량이 제곱으로 증가하여 4K 이미지 생성에 100초 이상이 소요되는 문제점을 해결하고자 합니다. 확산 모델의 고정된...","categories": ["Review"],
        "tags": ["Review","Image Synthesis","Resolution-Agnostic","Diffusion Models","Latent Space","VAE Decoder","High-Resolution Image Generation","Generative AI","Transformer Architecture"],
        "url": "/ai/review/2025-9-15-InfGen_A_Resolution-Agnostic_Paradigm_for_Scalable_Image_Synthesis/",
        "teaser": null
      },{
        "title": "[논문리뷰] Inpainting-Guided Policy Optimization for Diffusion Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Siyan Zhao, Mengchen Liu, Jing Huang, Miao Liu, Chenyu Wang, Bo Liu, Yuandong Tian, Guan Pang, Sean Bell, Aditya Grover, Feiyu Chen 핵심 연구 목표 본 논문은 Diffusion Large Language Models (dLLMs)에 강화 학습(RL)을 적용할 때 발생하는 탐색(exploration) 문제를 해결하고자 합니다. 특히, 희소한 보상...","categories": ["Review"],
        "tags": ["Review","Diffusion LLMs","Reinforcement Learning","Inpainting","Policy Optimization","Exploration","Mathematical Reasoning","GRPO"],
        "url": "/ai/review/2025-9-15-Inpainting-Guided_Policy_Optimization_for_Diffusion_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] IntrEx: A Dataset for Modeling Engagement in Educational Conversations",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xingwei Tan, Mahathi Parvatham, Chiara Gambi, Gabriele Pergola 핵심 연구 목표 본 논문은 제2언어 학습자를 위한 교육 대화에서 ‘흥미로움(interestingness)’과 ‘예상되는 흥미로움(expected interestingness)’을 모델링하기 위한 IntrEx 데이터셋을 구축하는 것을 목표로 합니다. 기존 대화 코퍼스에 부족했던 참여도(engagement) 관련 주석을 제공함으로써, 학습자의 대화 참여에 영향을 미치는 언어적...","categories": ["Review"],
        "tags": ["Review","Educational Dialogue","Engagement Modeling","Dataset Annotation","Second Language Learning","Human Feedback","LLM Alignment","Readability Metrics"],
        "url": "/ai/review/2025-9-15-IntrEx_A_Dataset_for_Modeling_Engagement_in_Educational_Conversations/",
        "teaser": null
      },{
        "title": "[논문리뷰] LoFT: Parameter-Efficient Fine-Tuning for Long-tailed Semi-Supervised Learning in Open-World Scenarios",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiahao Chen, Zhiyuan Huang, Yurou Liu, Bing Su 핵심 연구 목표 본 논문은 Long-Tailed Semi-Supervised Learning (LTSSL)에서 발생하는 기존 문제점들, 즉 모델의 과신(overconfidence)과 저품질 의사 레이블(pseudo-labels) 문제를 해결하는 것을 목표로 합니다. 나아가, 레이블링되지 않은 데이터에 Out-of-Distribution (OOD) 샘플이 포함될 수 있는 개방형 환경(Open-World scenarios)에서의...","categories": ["Review"],
        "tags": ["Review","Long-tailed Learning","Semi-Supervised Learning","Parameter-Efficient Fine-Tuning","Foundation Models","Open-World Scenarios","OOD Detection","Confidence Calibration"],
        "url": "/ai/review/2025-9-15-LoFT_Parameter-Efficient_Fine-Tuning_for_Long-tailed_Semi-Supervised_Learning_in_Open-World_Scenarios/",
        "teaser": null
      },{
        "title": "[논문리뷰] MCP-AgentBench: Evaluating Real-World Language Agent Performance with MCP-Mediated Tools",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zikang Guo, Benfeng Xu, Chiwei Zhu, Wentao Hong, Xiaorui Wang, Zhendong Mao 핵심 연구 목표 본 논문은 Model Context Protocol (MCP)을 통해 도구를 사용하는 언어 에이전트의 실제 성능을 정확하게 평가할 수 있는 표준화된 벤치마크의 부재 문제를 해결하고자 합니다. 기존 벤치마크가 MCP 패러다임 내 에이전트의...","categories": ["Review"],
        "tags": ["Review","Language Agents","Tool Use","Benchmarks","Model Context Protocol (MCP)","LLM Evaluation","Agentic AI","Real-World Performance"],
        "url": "/ai/review/2025-9-15-MCP-AgentBench_Evaluating_Real-World_Language_Agent_Performance_with_MCP-Mediated_Tools/",
        "teaser": null
      },{
        "title": "[논문리뷰] QuantAgent: Price-Driven Multi-Agent LLMs for High-Frequency Trading",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Fei Xiong, Xiang Zhang, Aosong Feng, Siqi Sun, Chenyu You 핵심 연구 목표 기존 LLM 기반 금융 시스템이 텍스트 기반 입력에 주로 의존하여 고주파 매매(HFT)의 속도 및 정확성 요구사항에 부적합하다는 한계를 해결하고자 합니다. 본 연구는 순전히 가격 기반 신호를 활용하여 HFT에 특화된 최초의 다중...","categories": ["Review"],
        "tags": ["Review","High-Frequency Trading","Multi-Agent Systems","Large Language Models","Technical Analysis","Algorithmic Trading","Financial Reasoning","Price-Driven Signals"],
        "url": "/ai/review/2025-9-15-QuantAgent_Price-Driven_Multi-Agent_LLMs_for_High-Frequency_Trading/",
        "teaser": null
      },{
        "title": "[논문리뷰] The Illusion of Diminishing Returns: Measuring Long Horizon Execution in LLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Akshit Sinha, Arvindh Arun, Shashwat Goel, Steffen Staab, Jonas Geiping 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)의 지속적인 스케일링이 한계 효용 체감(diminishing returns)으로 이어지는지에 대한 논쟁을 다루며, 특히 장기적인 태스크(long-horizon tasks) 수행 능력에 초점을 맞춥니다. 연구는 단일 단계의 정확도 향상이 장기 태스크 완료...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Long-Horizon Tasks","Execution Capability","Scaling Laws","Self-Conditioning","Thinking Models","Agentic AI"],
        "url": "/ai/review/2025-9-15-The_Illusion_of_Diminishing_Returns_Measuring_Long_Horizon_Execution_in_LLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] VStyle: A Benchmark for Voice Style Adaptation with Spoken Instructions",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jun Zhan, Mingyang Han, Yuxuan Xie, Chen Wang, Dong Zhang, Kexin Huang, Haoxiang Shi, DongXiao Wang, Tengtao Song, Qinyuan Cheng, Shimin Li, Jun Song, Xipeng Qiu, Bo Zheng 핵심 연구 목표 본 논문은 음성 언어 모델(SLM)이 음성 지시에 따라 음성 스타일(음색, 운율, 페르소나 등)을...","categories": ["Review"],
        "tags": ["Review","Voice Style Adaptation","Spoken Language Models","Benchmark","LALM-as-a-Judge","Speech Generation","Multilingual","Evaluation Framework"],
        "url": "/ai/review/2025-9-15-VStyle_A_Benchmark_for_Voice_Style_Adaptation_with_Spoken_Instructions/",
        "teaser": null
      },{
        "title": "[논문리뷰] Virtual Agent Economies",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Nenad Tomašev, Matija Franklin, Joel Z. Leibo, Julian Jacobs, William A. Cunningham, Iason Gabriel, Simon Osindero 핵심 연구 목표 논문은 자율 AI 에이전트의 급속한 확산으로 인해 발생하는 새로운 경제적 레이어, 즉 “가상 에이전트 경제”의 등장에 주목하며, 이러한 시스템이 인간의 감독 범위를 넘어설 정도로 확장될...","categories": ["Review"],
        "tags": ["Review","AI Agents","Virtual Economy","Multi-Agent Systems","Economic Mechanisms","Governance","Blockchain","Resource Allocation","Agent Alignment"],
        "url": "/ai/review/2025-9-15-Virtual_Agent_Economies/",
        "teaser": null
      },{
        "title": "[논문리뷰] X-Part: high fidelity and structure coherent shape decomposition",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xinhao Yan, Jiachen Xu, Yang Li, Changfeng Ma, Yunhan Yang, Chunshi Wang, Zibo Zhao, Zeqiang Lai, Yunfei Zhao, Zhuo Chen, Chunchao Guo 핵심 연구 목표 기존 파트 기반 3D 형태 생성 방식이 낮은 제어 가능성과 의미론적으로 불분명한 분해 성능을 보이는 문제를 해결하는 것을 목표로...","categories": ["Review"],
        "tags": ["Review","3D Shape Decomposition","Diffusion Models","Part-level Generation","Controllable Generation","Bounding Box Prompts","Semantic Features","Interactive Editing","Generative AI"],
        "url": "/ai/review/2025-9-15-X-Part_high_fidelity_and_structure_coherent_shape_decomposition/",
        "teaser": null
      },{
        "title": "[논문리뷰] CognitiveSky: Scalable Sentiment and Narrative Analysis for Decentralized Social Media",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Gaurab Chhetri, Anandi Dutta, Ph.D., Subasish Das, Ph.D. 핵심 연구 목표 본 연구는 분산형 소셜 미디어 플랫폼인 Bluesky에서 실시간으로 대규모 공개 담론을 분석하기 위한 확장 가능한 오픈 소스 프레임워크인 CognitiveSky를 제안합니다. 기존 트위터(X) API 제한으로 인한 연구 한계를 극복하고, 감성, 감정, 내러티브 분석을 위한...","categories": ["Review"],
        "tags": ["Review","Sentiment Analysis","Narrative Analysis","Decentralized Social Media","Bluesky","Transformer Models","Topic Modeling","Real-time Processing","Data Visualization"],
        "url": "/ai/review/2025-9-16-CognitiveSky_Scalable_Sentiment_and_Narrative_Analysis_for_Decentralized_Social_Media/",
        "teaser": null
      },{
        "title": "[논문리뷰] Dr.V: A Hierarchical Perception-Temporal-Cognition Framework to Diagnose Video Hallucination by Fine-grained Spatial-Temporal Grounding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Li Zheng, Tianjie Ju, Liqiang Jing, Shengqiong Wu, Meng Luo 외 핵심 연구 목표 본 논문은 대규모 비디오 모델(LVM)이 입력 비디오와 불일치하는 내용을 생성하는 “환각(hallucination)” 문제를 해결하는 것을 목표로 합니다. 기존 환각 평가 벤치마크의 단편적인 분류 체계와 세분화된 어노테이션 부족이라는 한계를 극복하여, 비디오 환각을...","categories": ["Review"],
        "tags": ["Review","Video Hallucination","Large Video Models (LVMs)","Hierarchical Reasoning","Spatial-Temporal Grounding","Diagnostic Framework","Benchmark Dataset","Multimodal AI"],
        "url": "/ai/review/2025-9-16-Dr.V_A_Hierarchical_Perception-Temporal-Cognition_Framework_to_Diagnose_Video_Hallucination_by_Fine-grained_Spatial-Temporal_Grounding/",
        "teaser": null
      },{
        "title": "[논문리뷰] EthicsMH: A Pilot Benchmark for Ethical Reasoning in Mental Health AI",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Sai Kartheek Reddy Kasu 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)이 정신 건강과 같은 민감한 도메인에서 직면하는 윤리적 추론의 한계를 해결하고자 합니다. 기존 벤치마크들이 정신 건강 분야의 고유한 윤리적 딜레마(기밀 유지, 자율성, 선행, 편향 등)를 충분히 포착하지 못하는 문제를 인식하고, 이를 평가하기 위한...","categories": ["Review"],
        "tags": ["Review","Ethical Reasoning","Mental Health AI","Benchmark Dataset","Large Language Models","AI Ethics","Clinical Decision Support","Human-in-the-loop"],
        "url": "/ai/review/2025-9-16-EthicsMH_A_Pilot_Benchmark_for_Ethical_Reasoning_in_Mental_Health_AI/",
        "teaser": null
      },{
        "title": "[논문리뷰] GAPrune: Gradient-Alignment Pruning for Domain-Aware Embeddings",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yixuan Tang, Yi Yang 핵심 연구 목표 본 연구는 대규모 언어 모델(LLM) 기반 임베딩 모델의 배포 문제를 해결하기 위해, 기존 가지치기(pruning) 방법론이 일반적인 의미론적 표현과 도메인 특화 패턴을 구분하지 못하여 발생하는 비최적화된 가지치기 결정의 한계를 극복하고자 합니다. 궁극적으로 도메인 중요도와 일반 언어적 기반 보존을...","categories": ["Review"],
        "tags": ["Review","Model Pruning","Domain Adaptation","Embedding Models","Gradient Alignment","Fisher Information","Model Compression","LLMs"],
        "url": "/ai/review/2025-9-16-GAPrune_Gradient-Alignment_Pruning_for_Domain-Aware_Embeddings/",
        "teaser": null
      },{
        "title": "[논문리뷰] InternScenes: A Large-scale Simulatable Indoor Scene Dataset with Realistic Layouts",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Weipeng Zhong, Peizhou Cao, Yichen Jin, Li Luo, Wenzhe Cai, Jingli Lin, Hanqing Wang, Zhaoyang Lyu, Tai Wang, Bo Dai, Xudong Xu, Jiangmiao Pang 핵심 연구 목표 본 연구는 Embodied AI의 발전을 위해 기존 3D 장면 데이터셋이 가진 규모, 다양성, 사실적인 레이아웃(특히 작은 객체),...","categories": ["Review"],
        "tags": ["Review","Embodied AI","3D Scene Dataset","Simulation Environment","Scene Generation","Point-Goal Navigation","Realistic Layouts","Object Interaction","Real-to-Sim"],
        "url": "/ai/review/2025-9-16-InternScenes_A_Large-scale_Simulatable_Indoor_Scene_Dataset_with_Realistic_Layouts/",
        "teaser": null
      },{
        "title": "[논문리뷰] LazyDrag: Enabling Stable Drag-Based Editing on Multi-Modal Diffusion Transformers via Explicit Correspondence",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zixin Yin, Xili Dai, Duomin Wang, Xianfang Zeng, Lionel M. Ni, Gang Yu, Heung-Yeung Shum 핵심 연구 목표 본 논문은 드래그 기반 이미지 편집에서 Multi-Modal Diffusion Transformers (MM-DiTs)의 불안정성을 해결하고, 기존 방식의 암묵적 점 매칭 및 Test-Time Optimization (TTO) 또는 약화된 인버전 강도 의존성으로...","categories": ["Review"],
        "tags": ["Review","Image Editing","Diffusion Models","Multi-Modal Transformers","Drag-based Editing","Explicit Correspondence","Attention Control","Identity Preservation","Training-Free"],
        "url": "/ai/review/2025-9-16-LazyDrag_Enabling_Stable_Drag-Based_Editing_on_Multi-Modal_Diffusion_Transformers_via_Explicit_Correspondence/",
        "teaser": null
      },{
        "title": "[논문리뷰] Learning to Optimize Multi-Objective Alignment Through Dynamic Reward Weighting",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yining Lu, Zilong Wang, Shiyang Li, Xin Liu, Changlong Yu, Qingyu Yin, Zhan Shi, Zixuan Zhang, Meng Jiang 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)의 다중 목표 정렬(multi-objective alignment) 과정에서 고정된 보상 가중치 기반 선형 스칼라화 방식이 비볼록 파레토 프론트(non-convex Pareto fronts)를 포착하지...","categories": ["Review"],
        "tags": ["Review","Multi-objective Reinforcement Learning","LLM Alignment","Dynamic Reward Weighting","Pareto Front Optimization","Hypervolume Indicator","Gradient-based Optimization","Online RL"],
        "url": "/ai/review/2025-9-16-Learning_to_Optimize_Multi-Objective_Alignment_Through_Dynamic_Reward_Weighting/",
        "teaser": null
      },{
        "title": "[논문리뷰] Locality in Image Diffusion Models Emerges from Data Statistics",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Artem Lukoianov, Justin Solomon, Chenyang Yuan, Vincent Sitzmann 핵심 연구 목표 본 연구는 확산 모델(Diffusion Models)의 학습된 지역성(locality)이 모델 아키텍처의 귀납적 편향(inductive bias)보다는 이미지 데이터셋의 통계적 속성에서 비롯된다는 가설을 검증하고자 합니다. 특히, 기존 최적 디노이저(optimal denoiser)의 한계와 심층 확산 모델 간의 성능 격차를 설명하고,...","categories": ["Review"],
        "tags": ["Review","Diffusion Models","Locality","Data Statistics","Optimal Denoiser","Wiener Filter","Sensitivity Fields","Generative Models","Inductive Bias"],
        "url": "/ai/review/2025-9-16-Locality_in_Image_Diffusion_Models_Emerges_from_Data_Statistics/",
        "teaser": null
      },{
        "title": "[논문리뷰] Look Again, Think Slowly: Enhancing Visual Reflection in Vision-Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Pu Jian, Junhong Wu, Wei Sun, Chen Wang, Shuo Ren, Jiajun Zhang 핵심 연구 목표 논문은 기존 Vision-Language Models (VLMs)이 복잡한 시각적 추론 과정에서 시각적 정보에 대한 의존도가 빠르게 감소하여 “텍스트 환각” 및 “시각적 무시”를 겪는 문제를 해결하고자 합니다. 궁극적으로 모델이 시각적 입력에 기반하여...","categories": ["Review"],
        "tags": ["Review","Vision-Language Models","Visual Reasoning","Reflection","Reinforcement Learning","Visual Attention","Slow Thinking","Multimodal Agents"],
        "url": "/ai/review/2025-9-16-Look_Again_Think_Slowly_Enhancing_Visual_Reflection_in_Vision-Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Lost in Embeddings: Information Loss in Vision-Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wenyan Li, Raphael Tang, Chengzu Li, Caiqi Zhang, Ivan Vulić, Anders Søgaard 핵심 연구 목표 본 논문은 Vision-Language Models (VLMs)에서 시각적 정보를 언어 모델 임베딩 공간으로 투영하는 커넥터(connector) 모듈로 인해 발생하는 잠재적인 정보 손실을 정량화하고 분석하는 것을 목표로 합니다. 이러한 손실이 모델의 하위 태스크...","categories": ["Review"],
        "tags": ["Review","Vision-Language Models","Information Loss","Embeddings","Connectors","k-NN Overlap Ratio","Embedding Reconstruction","Multimodal AI"],
        "url": "/ai/review/2025-9-16-Lost_in_Embeddings_Information_Loss_in_Vision-Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Measuring Epistemic Humility in Multimodal Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Bingkui Tong, Jiaer Xia, Sifeng Shang, Kaiyang Zhou 핵심 연구 목표 본 논문은 멀티모달 대규모 언어 모델(MLLM)의 환각(hallucination) 문제를 해결하고, 특히 모델이 불확실한 상황에서 잘못된 정보를 확신하지 않고 “모르는 것을 모른다고 인정하는” 능력, 즉 인식론적 겸손(epistemic humility)을 측정하는 새로운 벤치마크를 제시하는 것을 목표로 합니다....","categories": ["Review"],
        "tags": ["Review","Multimodal Large Language Models","Hallucination","Epistemic Humility","Benchmark","False-Option Rejection","Visual Question Answering","Scene Graph"],
        "url": "/ai/review/2025-9-16-Measuring_Epistemic_Humility_in_Multimodal_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] OmniWorld: A Multi-Domain and Multi-Modal Dataset for 4D World Modeling",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yang Zhou, Yifan Wang, Jianjun Zhou, Wenzheng Chang, Haoyu Guo, Zizun Li, Kaijing Ma, Xinyue Li, Yating Wang, Haoyi Zhu, Mingyu Liu, Dingning Liu, Jiange Yang, Zhoujie Fu, Junyi Chen, Chunhua Shen, Jiangmiao Pang, Kaipeng Zhang, Tong He 핵심 연구 목표 논문은 4D 세계...","categories": ["Review"],
        "tags": ["Review","4D World Modeling","Multi-Modal Dataset","Multi-Domain Data","Geometric Foundation Models","Video Generation","Spatio-Temporal Data","Dataset Benchmark"],
        "url": "/ai/review/2025-9-16-OmniWorld_A_Multi-Domain_and_Multi-Modal_Dataset_for_4D_World_Modeling/",
        "teaser": null
      },{
        "title": "[논문리뷰] PersonaX: Multimodal Datasets with LLM-Inferred Behavior Traits",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Loka Li, Wong Yu Kang, Minghao Fu, Guangyi Chen, Zhenhao Chen, Gongxu Luo, Yuewen Sun, Salman Khan, Peter Spirtes, Kun Zhang 핵심 연구 목표 본 논문은 인간 행동 특성 분석을 위한 멀티모달 데이터셋의 부족 문제를 해결하고, LLM(Large Language Model)을 통해 추론된 행동 특성을 시각...","categories": ["Review"],
        "tags": ["Review","Multimodal Dataset","LLM Inference","Behavioral Traits","Causal Representation Learning","Big Five","Multimodal AI","Causal Discovery","Human-Computer Interaction"],
        "url": "/ai/review/2025-9-16-PersonaX_Multimodal_Datasets_with_LLM-Inferred_Behavior_Traits/",
        "teaser": null
      },{
        "title": "[논문리뷰] SearchInstruct: Enhancing Domain Adaptation via Retrieval-Based Instruction Dataset Creation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Iman Barati, Mostafa Amiri, Heshaam Faili 핵심 연구 목표 이 논문은 대규모 언어 모델(LLM)의 특정 도메인 적응을 위한 고품질 SFT(Supervised Fine-Tuning) 데이터셋 생성의 어려움을 해결하는 것을 목표로 합니다. 특히, 기존 LLM의 내부 지식 부족과 데이터 희소성으로 인해 전문 도메인에서 정확하고 다양하며 실세계 사용자 질의에...","categories": ["Review"],
        "tags": ["Review","LLM","Instruction Tuning","Domain Adaptation","Retrieval-Augmented Generation","Dataset Creation","Model Editing","Supervised Fine-Tuning"],
        "url": "/ai/review/2025-9-16-SearchInstruct_Enhancing_Domain_Adaptation_via_Retrieval-Based_Instruction_Dataset_Creation/",
        "teaser": null
      },{
        "title": "[논문리뷰] UI-S1: Advancing GUI Automation via Semi-online Reinforcement Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhengxi Lu, Jiabo Ye, Fei Tang, Yongliang Shen, Haiyang Xu, Ziwei Zheng, Weiming Lu, Ming Yan, Fei Huang, Jun Xiao, Yueting Zhuang 핵심 연구 목표 본 논문은 GUI(Graphical User Interface) 에이전트의 자동화에서 기존 오프라인 RL의 제한된 다중 턴 추론 능력과 온라인 RL의 높은 배포...","categories": ["Review"],
        "tags": ["Review","GUI Automation","Reinforcement Learning","Semi-online RL","Offline RL","Online RL","Patch Module","Multi-turn Interaction","Large Language Models"],
        "url": "/ai/review/2025-9-16-UI-S1_Advancing_GUI_Automation_via_Semi-online_Reinforcement_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] 3D Aware Region Prompted Vision Language Model",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: An-Chieh Cheng, Yang Fu, Yukang Chen, Zhijian Liu, Xiaolong Li 핵심 연구 목표 본 논문은 단일 뷰 2D 이미지와 다중 뷰 3D 데이터를 공유된 시각 토큰 공간으로 연결하는 3D-aware Vision-Language Model (VLM)인 SR-3D를 제안하여, 복잡한 3D 장면에서 유연하고 정확한 공간 추론 능력을 제공하는 것을...","categories": ["Review"],
        "tags": ["Review","3D Vision","Vision-Language Models","Spatial Reasoning","Region Prompting","Multi-view Learning","Depth Estimation","Unified Representation","Generative AI"],
        "url": "/ai/review/2025-9-17-3D_Aware_Region_Prompted_Vision_Language_Model/",
        "teaser": null
      },{
        "title": "[논문리뷰] EconProver: Towards More Economical Test-Time Scaling for Automated Theorem Proving",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Mukai Li, Linfeng Song, Zhenwen Liang, Jiahao Xu, Shansan Gong, Qi Liu, Haitao Mi, Dong Yu 핵심 연구 목표 논문은 LLM 기반의 Automated Theorem Proving(ATP) 모델들이 Chain-of-Thought (CoT) 추론 및 다중 샘플링 패스와 같은 test-time scaling 전략을 사용하며 발생하는 높은 계산 비용과 자원 비효율성을...","categories": ["Review"],
        "tags": ["Review","Automated Theorem Proving","LLM","Test-Time Scaling","Chain-of-Thought","Reinforcement Learning","Efficiency Optimization","Token Cost","Sampling Cost","Dynamic CoT Switching"],
        "url": "/ai/review/2025-9-17-EconProver_Towards_More_Economical_Test-Time_Scaling_for_Automated_Theorem_Proving/",
        "teaser": null
      },{
        "title": "[논문리뷰] Exact Coset Sampling for Quantum Lattice Algorithms",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yifan Zhang 핵심 연구 목표 본 논문은 최근 발표된 windowed-QFT 양자 격자 알고리즘(Chen, 2024)의 논란이 있는 “도메인 확장” 단계(Step 9)에서 발생하는 주기성/지원 불일치 문제를 해결하는 것을 목표로 합니다. 알려지지 않은 오프셋을 정확히 상쇄하고, 정확하고 균일한 CRT-coset 상태를 생성하여 양자 알고리즘의 정확성을 보장하는 새로운 방법을...","categories": ["Review"],
        "tags": ["Review","Quantum Algorithms","Lattice Problems","Coset Sampling","Quantum Fourier Transform (QFT)","Modular Arithmetic","Quantum Cryptography","Exact Sampling"],
        "url": "/ai/review/2025-9-17-Exact_Coset_Sampling_for_Quantum_Lattice_Algorithms/",
        "teaser": null
      },{
        "title": "[논문리뷰] Hunyuan3D Studio: End-to-End AI Pipeline for Game-Ready 3D Asset Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Lixin Xu, Shuhui Yang, Xinhai Liu, Yang Li, Biwen Lei 핵심 연구 목표 이 논문은 노동 집약적이고 전문화된 기존 3D 에셋 생성 워크플로우로 인한 게임 개발의 병목 현상을 해결하고자 합니다. 단일 이미지나 텍스트 설명으로부터 게임에 즉시 사용 가능한(game-ready) 3D 에셋을 자동으로 생성하는 종합적인 AI...","categories": ["Review"],
        "tags": ["Review","3D Asset Generation","AI Pipeline","Generative AI","Game Development","Diffusion Models","Neural Modules","Retopology","UV Unwrapping"],
        "url": "/ai/review/2025-9-17-Hunyuan3D_Studio_End-to-End_AI_Pipeline_for_Game-Ready_3D_Asset_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Multimodal Reasoning for Science: Technical Report and 1st Place Solution to the ICML 2025 SeePhys Challenge",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wentao Zhang, Junbo Niu, Ruitao Wu, Hao Liang, zbhpku 핵심 연구 목표 본 논문은 인공지능 분야의 근본적인 도전 과제인 멀티모달 추론의 한계를 극복하는 것을 목표로 합니다. 특히, 최첨단 GPT-03과 같은 모델도 시각 정보 통합에 어려움을 겪는 과학 분야의 멀티모달 시나리오에서 시각-텍스트 모달리티 간의 격차를...","categories": ["Review"],
        "tags": ["Review","Multimodal Reasoning","Science AI","Caption-assisted Reasoning","SeePhys Challenge","Large Language Models","Visual Question Answering","Physics Problems","Cross-modal Alignment"],
        "url": "/ai/review/2025-9-17-Multimodal_Reasoning_for_Science_Technical_Report_and_1st_Place_Solution_to_the_ICML_2025_SeePhys_Challenge/",
        "teaser": null
      },{
        "title": "[논문리뷰] Multiple Instance Learning Framework with Masked Hard Instance Mining for Gigapixel Histopathology Image Analysis",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wenhao Tang, Sheng Huang, Heng Fang, Fengtao Zhou, Bo Liu, Qingshan Liu 핵심 연구 목표 기존 Multiple Instance Learning (MIL) 기반의 컴퓨터 병리학(CPath) 모델들이 기가픽셀 Whole Slide Images (WSIs)에서 쉽게 분류 가능한(easy-to-classify) 인스턴스에 편향되어 판별 경계를 정확하게 모델링하는 데 한계가 있음을 지적합니다. 이 문제를...","categories": ["Review"],
        "tags": ["Review","Multiple Instance Learning","Hard Instance Mining","Computational Pathology","Whole Slide Images","Masked Learning","Siamese Network","Medical Image Analysis"],
        "url": "/ai/review/2025-9-17-Multiple_Instance_Learning_Framework_with_Masked_Hard_Instance_Mining_for_Gigapixel_Histopathology_Image_Analysis/",
        "teaser": null
      },{
        "title": "[논문리뷰] Optimal Brain Restoration for Joint Quantization and Sparsification of LLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hang Guo, Yawei Li, Luca Benini 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)의 효율적인 배포를 위해 양자화(Quantization)와 희소화(Sparsification)를 동시에 적용하는 새로운 압축 방법을 제안합니다. 특히, 양자화가 요구하는 좁고 균일한 가중치 분포와 희소화가 요구하는 넓은 가중치 분포 간의 내재적 충돌을 해결하고, 다운스트림 태스크의 성능...","categories": ["Review"],
        "tags": ["Review","LLM Compression","Quantization","Sparsification","Post-training Quantization","Hessian-based Optimization","Error Compensation","Low-bit LLMs"],
        "url": "/ai/review/2025-9-17-Optimal_Brain_Restoration_for_Joint_Quantization_and_Sparsification_of_LLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] ReSum: Unlocking Long-Horizon Search Intelligence via Context Summarization",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xixi Wu, Kuan Li, Yida Zhao, Liwen Zhang, Litu Ou, et al. 핵심 연구 목표 이 논문은 대규모 언어 모델(LLM) 기반 에이전트가 장기 웹 탐색 작업을 수행할 때 컨텍스트 윈도우의 제한으로 인해 충분한 탐색이 불가능한 문제를 해결하고자 합니다. ReAct 패러다임에서 대화 기록이 빠르게 컨텍스트...","categories": ["Review"],
        "tags": ["Review","LLM Agents","Context Management","Summarization","ReAct","Reinforcement Learning","Web Search","Long-Horizon Reasoning"],
        "url": "/ai/review/2025-9-17-ReSum_Unlocking_Long-Horizon_Search_Intelligence_via_Context_Summarization/",
        "teaser": null
      },{
        "title": "[논문리뷰] Scaling Agents via Continual Pre-training",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Liangcai Su, Zhen Zhang, Guangyu Li, Zhuo Chen, Chenxi Wang, Maojia Song, Xinyu Wang, et al. 핵심 연구 목표 본 논문은 기존의 에이전트 LLM 훈련 방법론(SFT, RL)이 복잡한 에이전트 태스크에서, 특히 오픈소스 구현체에서 저조한 성능을 보이는 문제를 해결하고자 합니다. 이는 견고한 에이전트 파운데이션 모델의...","categories": ["Review"],
        "tags": ["Review","Agentic LLMs","Continual Pre-training","Deep Research Agents","Tool Use","Multi-step Reasoning","Data Synthesis","Scaling Laws"],
        "url": "/ai/review/2025-9-17-Scaling_Agents_via_Continual_Pre-training/",
        "teaser": null
      },{
        "title": "[논문리뷰] Single-stream Policy Optimization",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhongwen Xu, Zihan Ding 핵심 연구 목표 본 논문은 LLM을 위한 기존 그룹 기반 정책 최적화 방식(GRPO 등)이 겪는 비효율성(퇴화 그룹으로 인한 학습 신호 손실)과 동기화 장벽으로 인한 확장성 문제를 해결하고자 합니다. 연구 목표는 이러한 한계를 극복하고 LLM 추론을 위한 안정적이고 효율적이며 확장 가능한...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","LLM Optimization","Policy Gradient","Variance Reduction","Adaptive Sampling","Scalability","Agentic Systems","RLVR"],
        "url": "/ai/review/2025-9-17-Single-stream_Policy_Optimization/",
        "teaser": null
      },{
        "title": "[논문리뷰] Towards General Agentic Intelligence via Environment Scaling",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Runnan Fang, Shihao Cai, Baixuan Li, Jialong Wu, Guangyu Li, Wenbiao Yin, Xinyu Wang, Xiaobin Wang, Liangcai Su, Zhen Zhang, Shibin Wu, Zhengwei Tao, Yong Jiang, Pengjun Xie, Fei Huang, Jingren Zhou 핵심 연구 목표 본 논문은 일반 에이전트 지능(General Agentic Intelligence)을 발전시키기 위해...","categories": ["Review"],
        "tags": ["Review","Agentic AI","Environment Scaling","Function Calling","Tool Use","Large Language Models","Synthetic Data Generation","Supervised Fine-tuning"],
        "url": "/ai/review/2025-9-17-Towards_General_Agentic_Intelligence_via_Environment_Scaling/",
        "teaser": null
      },{
        "title": "[논문리뷰] WebResearcher: Unleashing unbounded reasoning capability in Long-Horizon Agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zile Qiao, Guoxin Chen, Xuanzhong Chen, Donglei Yu, Wenbiao Yin, Xinyu Wang, Zhen Zhang, Baixuan Li, Huifeng Yin, Kuan Li, Rui Min, Minpeng Liao, Yong Jiang, Pengjun Xie, Fei Huang, Jingren Zhou 핵심 연구 목표 본 논문은 기존의 심층 연구(deep-research) 에이전트들이 겪는 컨텍스트 질식(context...","categories": ["Review"],
        "tags": ["Review","Agentic AI","Deep Research","Iterative Reasoning","Long-Horizon Tasks","Context Management","Data Synthesis","Tool-Augmented LLMs","Markov Decision Process"],
        "url": "/ai/review/2025-9-17-WebResearcher_Unleashing_unbounded_reasoning_capability_in_Long-Horizon_Agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] WebSailor-V2: Bridging the Chasm to Proprietary Agents via Synthetic Data and Scalable Reinforcement Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Huifeng Yin, Zhongwang Zhang, Kuan Li, callanwu, xxwu 핵심 연구 목표 WebSailor-V2는 오픈소스 웹 에이전트의 역량을 혁신적으로 향상시켜, 독점 시스템과의 성능 격차를 줄이는 것을 목표로 합니다. 특히 데이터 구성 및 확장 가능한 강화 학습(RL) 훈련의 두 가지 주요 과제를 해결하여 복잡한 웹 환경에서 고급...","categories": ["Review"],
        "tags": ["Review","Web Agents","Reinforcement Learning","Synthetic Data","Knowledge Graphs","LLMs","Supervised Fine-Tuning","Sim-to-Real Transfer","Agentic AI"],
        "url": "/ai/review/2025-9-17-WebSailor-V2_Bridging_the_Chasm_to_Proprietary_Agents_via_Synthetic_Data_and_Scalable_Reinforcement_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] WebWeaver: Structuring Web-Scale Evidence with Dynamic Outlines for Open-Ended Deep Research",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zijian Li, Xin Guan, Bo Zhang, Shen Huang, Houquan Zhou, Shaopeng Lai, Ming Yan, Yong Jiang, Pengjun Xie, Fei Huang, Jun Zhang, Jingren Zhou 핵심 연구 목표 본 논문은 AI 에이전트가 방대한 웹 스케일 정보를 통찰력 있는 보고서로 통합해야 하는 복잡한 문제인 개방형 심층...","categories": ["Review"],
        "tags": ["Review","Open-Ended Deep Research","LLM Agents","Dynamic Outline","Evidence Acquisition","Hierarchical Writing","Memory Bank","State-of-the-Art","Supervised Fine-Tuning"],
        "url": "/ai/review/2025-9-17-WebWeaver_Structuring_Web-Scale_Evidence_with_Dynamic_Outlines_for_Open-Ended_Deep_Research/",
        "teaser": null
      },{
        "title": "[논문리뷰] GenExam: A Multidisciplinary Text-to-Image Exam",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhaokai Wang, Penghao Yin, Xiangyu Zhao, Changyao Tian, Yu Qiao, Wenhai Wang, Jifeng Dai, Gen Luo 핵심 연구 목표 기존 텍스트-투-이미지(T2I) 벤치마크들이 일반적인 세계 지식이나 개념 설명에 치우쳐 엄격한 도면 시험 평가에 미흡하다는 문제점을 해결하고자 합니다. 본 논문은 모델이 다학제적 지식 이해, 추론, 그리고...","categories": ["Review"],
        "tags": ["Review","Text-to-Image Generation","Multidisciplinary","Benchmark","Evaluation","AGI","Reasoning","Scoring System","Visual Question Answering"],
        "url": "/ai/review/2025-9-18-GenExam_A_Multidisciplinary_Text-to-Image_Exam/",
        "teaser": null
      },{
        "title": "[논문리뷰] Hala Technical Report: Building Arabic-Centric Instruction & Translation Models at Scale",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hasan Abed Al Kader Hammoud, Mohammad Zbeeb, Bernard Ghanem 핵심 연구 목표 아랍어 고품질 명령어 데이터의 부족과 다국어 LLM에서 언어별 깊이의 불균형 문제를 해결하는 것을 목표로 합니다. 효율적인 번역-튜닝 파이프라인을 통해 아랍어 중심의 명령어 및 번역 모델(HALA) 패밀리를 구축하고, 아랍어 벤치마크에서 최첨단 성능을 달성하여...","categories": ["Review"],
        "tags": ["Review","Arabic NLP","Instruction Tuning","Machine Translation","Large Language Models","FP8 Quantization","Data Bootstrapping","Model Merging","Language-Centric AI"],
        "url": "/ai/review/2025-9-18-Hala_Technical_Report_Building_Arabic-Centric_Instruction_Translation_Models_at_Scale/",
        "teaser": null
      },{
        "title": "[논문리뷰] Improving Context Fidelity via Native Retrieval-Augmented Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Suyuchen Wang, Jinlin Wang, Xinyu Wang, Shiqi Li, Xiangru Tang, Sirui Hong, Xiao-Wen Chang, Chenglin Wu, Bang Liu 핵심 연구 목표 논문은 대규모 언어 모델(LLMs)이 제공된 컨텍스트에 대한 충실도(context fidelity)를 유지하지 못하고, 질문에 대한 답변 생성 시 일관성 없는 결과를 내거나 환각(hallucination)을 일으키는 문제를...","categories": ["Review"],
        "tags": ["Review","Context Fidelity","Retrieval-Augmented Generation (RAG)","Large Language Models (LLMs)","Reinforcement Learning (RL)","Supervised Fine-Tuning (SFT)","Hallucination","Question Answering","In-context Retrieval","Curriculum Learning"],
        "url": "/ai/review/2025-9-18-Improving_Context_Fidelity_via_Native_Retrieval-Augmented_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] MARS2 2025 Challenge on Multimodal Reasoning: Datasets, Methods, Results, Discussion, and Outlook",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Peng Xu, Shengwu Xiong, Jiajun Zhang, Yaxiong Chen, Bowen Zhou 핵심 연구 목표 논문은 MARS2 2025 Challenge를 통해 멀티모달 기계 학습 및 LLM 분야의 발전을 촉진하는 것을 목표로 합니다. 특히, 기존 벤치마크의 한계를 넘어 실제 세계 시나리오와 도메인 특화된 복잡한 멀티모달 추론 태스크를 다루어...","categories": ["Review"],
        "tags": ["Review","Multimodal Reasoning","Large Language Models (LLMs)","Multimodal Large Language Models (MLLMs)","Visual Grounding","Visual Question Answering","Advertisement Video Analysis","Real-world Scenarios","Challenge Benchmark"],
        "url": "/ai/review/2025-9-18-MARS2_2025_Challenge_on_Multimodal_Reasoning_Datasets_Methods_Results_Discussion_and_Outlook/",
        "teaser": null
      },{
        "title": "[논문리뷰] PANORAMA: The Rise of Omnidirectional Vision in the Embodied AI Era",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xu Zheng, Chenfei Liao, Ziqiao Weng, Kaiyu Lei, Zihao Dongfang 핵심 연구 목표 본 논문은 기존 핀홀(pinhole) 비전에 비해 연구가 뒤처진 옴니디렉셔널(omnidirectional) 비전의 잠재력을 발현하고, 데이터 병목 현상, 모델 역량 한계, 애플리케이션 공백과 같은 주요 문제를 해결하여 신체화된 AI(Embodied AI) 시대에 포괄적인 환경 인식을...","categories": ["Review"],
        "tags": ["Review","Omnidirectional Vision","Embodied AI","Panoramic Perception","Multi-modal Learning","Dataset Development","Robot Navigation","Spatial Reasoning","System Architecture"],
        "url": "/ai/review/2025-9-18-PANORAMA_The_Rise_of_Omnidirectional_Vision_in_the_Embodied_AI_Era/",
        "teaser": null
      },{
        "title": "[논문리뷰] SAIL-VL2 Technical Report",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zijian Kang, Yue Liao, Fangxun Shu, Yongjie Ye, Weijie Yin 핵심 연구 목표 본 논문은 포괄적인 멀티모달 이해 및 추론을 위한 개방형 비전-언어 파운데이션 모델인 SAIL-VL2를 소개합니다. 특히 2B 및 8B 파라미터 스케일에서 다양한 이미지 및 비디오 벤치마크에 걸쳐 최첨단 성능을 달성하며, 효율적이고 확장...","categories": ["Review"],
        "tags": ["Review","Vision-Language Model","Multimodal Understanding","Mixture-of-Experts","Progressive Training","Data Curation","Supervised Fine-tuning","Reinforcement Learning","SAIL-ViT"],
        "url": "/ai/review/2025-9-18-SAIL-VL2_Technical_Report/",
        "teaser": null
      },{
        "title": "[논문리뷰] Scrub It Out! Erasing Sensitive Memorization in Code Language Models via Machine Unlearning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhou Yang, Di Wang, Zhikun Zhang, Yao Wan, Zhaoyang Chu 핵심 연구 목표 본 논문은 Code Language Models (CLMs)에서 발생하는 민감한 훈련 데이터의 의도치 않은 기억(memorization) 문제를 해결하고자 합니다. 특히, 기존 데이터 중복 제거 및 차등 프라이버시 기법이 전체 모델 재훈련을 요구하여 비효율적이라는 한계를...","categories": ["Review"],
        "tags": ["Review","Code Language Models","Machine Unlearning","Sensitive Memorization","Privacy","Gradient Ascent","Model Utility","Code Generation"],
        "url": "/ai/review/2025-9-18-Scrub_It_Out_Erasing_Sensitive_Memorization_in_Code_Language_Models_via_Machine_Unlearning/",
        "teaser": null
      },{
        "title": "[논문리뷰] SteeringControl: Holistic Evaluation of Alignment Steering in LLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Vincent Siu, Nicholas Crispino, David Park, Nathan W. Henry, Zhun Wang, Yang Liu, Dawn Song, Chenguang Wang 핵심 연구 목표 대규모 언어 모델(LLM)의 정렬 조작(alignment steering) 방법론들을 총체적으로 평가하는 것을 목표로 합니다. 특히 편향, 유해한 콘텐츠 생성, 환각 등 주요 정렬 목표에 대한 스티어링...","categories": ["Review"],
        "tags": ["Review","LLM Alignment","Representation Steering","Benchmark","Behavioral Entanglement","Bias Mitigation","Harmful Generation","Hallucination Control","Modular Framework"],
        "url": "/ai/review/2025-9-18-SteeringControl_Holistic_Evaluation_of_Alignment_Steering_in_LLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] THOR: Tool-Integrated Hierarchical Optimization via RL for Mathematical Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yicheng Pan, Jiefeng Ma, Pengfei Hu, Zhenrong Zhang, Qikai Chang 핵심 연구 목표 대규모 언어 모델(LLM)이 수학적 추론, 특히 고정밀 수치 계산 및 형식적 기호 조작과 같은 작업에서 겪는 한계를 극복하는 것을 목표로 합니다. 기존 도구 통합 방법론이 가진 TIR 데이터 구축, 미세 조정...","categories": ["Review"],
        "tags": ["Review","Mathematical Reasoning","Tool-Integrated Reasoning","Reinforcement Learning","Hierarchical Optimization","Self-Correction","Large Language Models","Code Generation"],
        "url": "/ai/review/2025-9-18-THOR_Tool-Integrated_Hierarchical_Optimization_via_RL_for_Mathematical_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Wan-Animate: Unified Character Animation and Replacement with Holistic Replication",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: HumanAIGC Team, Tongyi Lab, Alibaba (Mingyang Huang, Siqi Hu, Li Hu, Xin Gao, Gang Cheng 등) 핵심 연구 목표 논문은 캐릭터 애니메이션과 교체를 위한 통합 프레임워크를 제시하여, 동작, 표정, 환경 상호작용에 대한 총체적인 제어를 고품질로 달성하는 것을 목표로 합니다. 기존 오픈소스 솔루션의 성능 및...","categories": ["Review"],
        "tags": ["Review","Character Animation","Video Replacement","Diffusion Models","Transformer","DiT","Relighting LoRA","Holistic Replication","Open-Source"],
        "url": "/ai/review/2025-9-18-Wan-Animate_Unified_Character_Animation_and_Replacement_with_Holistic_Replication/",
        "teaser": null
      },{
        "title": "[논문리뷰] AToken: A Unified Tokenizer for Vision",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiasen Lu, Liangchen Song, Mingze Xu, Byeongjoo Ahn, Yanjun Wang, Chen Chen, Afshin Dehghan, Yinfei Yang 핵심 연구 목표 ATOKEN은 기존 시각 토크나이저들의 모달리티 및 태스크별 분절 문제를 해결하고, 이미지, 비디오, 3D 에셋 전반에서 고품질 재구성 및 심층적인 의미론적 이해를 동시에 달성하는 범용 시각...","categories": ["Review"],
        "tags": ["Review","Unified Visual Tokenizer","Multimodal AI","Transformer Architecture","4D Representation","Adversarial-free Training","Reconstruction","Semantic Understanding","Generative Models"],
        "url": "/ai/review/2025-9-19-AToken_A_Unified_Tokenizer_for_Vision/",
        "teaser": null
      },{
        "title": "[논문리뷰] EchoVLM: Dynamic Mixture-of-Experts Vision-Language Model for Universal Ultrasound Intelligence",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chaoyin She, Ruifang Lu, Lida Chen, Wei Wang, Qinghua Huang 핵심 연구 목표 본 연구는 의사 전문성에 크게 의존하고 주관적이며 비효율적인 기존 초음파 진단의 한계를 극복하고, 일반적인 VLM(Vision-Language Model)의 초음파 의료 도메인 지식 부족 문제를 해결하고자 합니다. 다양한 장기 병변 인식 및 다중 작업...","categories": ["Review"],
        "tags": ["Review","Vision-Language Models","Ultrasound Imaging","Medical Diagnosis","Mixture-of-Experts (MoE)","Instruction Tuning","Multimodal AI","Report Generation","VQA"],
        "url": "/ai/review/2025-9-19-EchoVLM_Dynamic_Mixture-of-Experts_Vision-Language_Model_for_Universal_Ultrasound_Intelligence/",
        "teaser": null
      },{
        "title": "[논문리뷰] Evolving Language Models without Labels: Majority Drives Selection, Novelty Promotes Variation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yujun Zhou, Zhenwen Liang, Haolin Liu, Wenhao Yu, Kishan Panaganti, Linfeng Song, Dian Yu, Xiangliang Zhang, Haitao Mi, Dong Yu 핵심 연구 목표 논문은 LLM이 라벨이나 외부 평가 없이 스스로 개선하려는 라벨-프리(label-free) 학습 환경에서 겪는 엔트로피 붕괴(entropy collapse) 문제를 해결하는 것을 목표로 합니다. 기존...","categories": ["Review"],
        "tags": ["Review","Label-free Reinforcement Learning","LLMs","Self-improvement","Entropy Collapse","Novelty Reward","Test-Time RL","GRPO","Evolutionary Computing Principles"],
        "url": "/ai/review/2025-9-19-Evolving_Language_Models_without_Labels_Majority_Drives_Selection_Novelty_Promotes_Variation/",
        "teaser": null
      },{
        "title": "[논문리뷰] FSG-Net: Frequency-Spatial Synergistic Gated Network for High-Resolution Remote Sensing Change Detection",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhongxiang Xie, Shuangxi Miao, Yuhan Jiang, Zhewei Zhang, Jing Yao, Member, IEEE, Xuecao Li, Jianxi Huang, Senior Member, IEEE, Pedram Ghamisi, Senior Member, IEEE 핵심 연구 목표 고해상도 원격 감지 변화 탐지에서 발생하는 두 가지 주요 문제, 즉 복사량 변화로 인한 가짜 변화(pseudo-changes)의 만연과...","categories": ["Review"],
        "tags": ["Review","Change Detection","Remote Sensing","Frequency-Spatial Analysis","Wavelet Transform","Attention Mechanism","Gated Fusion","Deep Learning"],
        "url": "/ai/review/2025-9-19-FSG-Net_Frequency-Spatial_Synergistic_Gated_Network_for_High-Resolution_Remote_Sensing_Change_Detection/",
        "teaser": null
      },{
        "title": "[논문리뷰] FinSearchComp: Towards a Realistic, Expert-Level Evaluation of Financial Search and Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiashuo Liu, Jianpeng Jiao, Liang Hu, Wenhao Huang, zhangysk 핵심 연구 목표 본 연구는 LLM 기반 에이전트의 현실적인 금융 데이터 검색 및 추론 능력을 평가하기 위한 종단 간(end-to-end) 벤치마크의 부재를 해결하는 것을 목표로 합니다. 기존 벤치마크들이 검색 능력이나 실제 금융 분석가의 복잡한 워크플로우를 충분히...","categories": ["Review"],
        "tags": ["Review","Financial LLMs","Agent Benchmarking","Open-domain Search","Financial Reasoning","Time-Sensitive Data","Multi-hop QA","Tool Use"],
        "url": "/ai/review/2025-9-19-FinSearchComp_Towards_a_Realistic_Expert-Level_Evaluation_of_Financial_Search_and_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] FlowRL: Matching Reward Distributions for LLM Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hengli Li, Dinghuai Zhang, jayyoung0802, daixuancheng, xuekai 외 다수 핵심 연구 목표 대규모 언어 모델(LLM)의 강화 학습(RL) 추론에서 발생하는 모드 붕괴(mode collapse)와 다양성 부족 문제를 해결하는 것을 목표로 합니다. 기존의 보상 최대화(reward-maximizing) 방법론이 지배적인 보상 신호에 과도하게 최적화되어 덜 빈번하지만 유효한 추론 경로를 무시하는...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Large Language Models","Reward Distribution Matching","GFlowNets","Mode Collapse","Diverse Reasoning","Flow-Balanced Optimization"],
        "url": "/ai/review/2025-9-19-FlowRL_Matching_Reward_Distributions_for_LLM_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Mind the Gap: A Closer Look at Tokenization for Multiple-Choice Question Answering with LLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Mario Sanz-Guerrero, Minh Duc Bui, Katharina von der Wense 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)의 객관식 질문 답변(MCQA) 평가 시, 답변 레이블 직전의 공백 문자 토큰화 방식이 모델 성능에 미치는 영향을 규명하는 것을 목표로 합니다. 현재 표준화되지 않은 관행으로 인해 발생하는 성능...","categories": ["Review"],
        "tags": ["Review","LLM Evaluation","Multiple-Choice QA","Tokenization","Prompt Sensitivity","Accuracy","Calibration","Model Ranking"],
        "url": "/ai/review/2025-9-19-Mind_the_Gap_A_Closer_Look_at_Tokenization_for_Multiple-Choice_Question_Answering_with_LLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] MultiEdit: Advancing Instruction-based Image Editing on Diverse and Challenging Tasks",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Mingsong Li, Lin Liu, Hongjun Wang, Haoxing Chen, Xijun Gu, Shizhan Liu, Dong Gong, Junbo Zhao, Zhenzhong Lan, Jianguo Li 핵심 연구 목표 본 연구는 기존 지시 기반 이미지 편집(IBIE) 방법론의 한계, 특히 제한된 데이터셋 다양성과 품질로 인한 복잡한 편집 태스크에서의 성능 저하 문제를...","categories": ["Review"],
        "tags": ["Review","Instruction-based Image Editing","Dataset","Multi-modal LLM","Image Generation","Style Transfer","Multi-task Learning","Fine-tuning"],
        "url": "/ai/review/2025-9-19-MultiEdit_Advancing_Instruction-based_Image_Editing_on_Diverse_and_Challenging_Tasks/",
        "teaser": null
      },{
        "title": "[논문리뷰] Reasoning over Boundaries: Enhancing Specification Alignment via Test-time Delibration",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhilin Wang, Dongrui Liu, Xuyang Hu, Yafu Li, zzzhr97 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)이 시나리오별로 맞춤 설정된 동적 행동 및 안전 명세(spec)를 따르는 능력인 명세 정렬(Specification Alignment) 문제를 해결하는 것을 목표로 합니다. LLMs가 다양하게 변화하는 요구사항과 선호도를 효과적으로 준수하도록 유도하는 방법론을...","categories": ["Review"],
        "tags": ["Review","LLMs","Specification Alignment","Test-Time Deliberation","Safety-Behavior Trade-off","ALIGN3","SPECBENCH","Prompt Engineering"],
        "url": "/ai/review/2025-9-19-Reasoning_over_Boundaries_Enhancing_Specification_Alignment_via_Test-time_Delibration/",
        "teaser": null
      },{
        "title": "[논문리뷰] RecoWorld: Building Simulated Environments for Agentic Recommender Systems",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Fei Liu, Xinyu Lin, Hanchao Yu, Mingyuan Wu, Jianyu Wang, Qiang Zhang, Zhuokai Zhao, Yinglong Xia, Yao Zhang, Weiwei Li, Mingze Gao, Qifan Wang, Lizhu Zhang, Benyu Zhang, Xiangjun Fan 핵심 연구 목표 본 논문은 에이전트 기반 추천 시스템(agentic recommender systems)을 위한 시뮬레이션 환경인...","categories": ["Review"],
        "tags": ["Review","Agentic Recommender Systems","Simulated Environments","LLM-driven Simulation","Multi-turn Interaction","Reinforcement Learning","User Retention","Instruction Following","Multi-agent Systems"],
        "url": "/ai/review/2025-9-19-RecoWorld_Building_Simulated_Environments_for_Agentic_Recommender_Systems/",
        "teaser": null
      },{
        "title": "[논문리뷰] RynnVLA-001: Using Human Demonstrations to Improve Robot Manipulation",
        "excerpt":"링크: 논문 PDF로 바로 열기 Yuming Jiang, Siteng Huang, Shengke Xue, Yaxi Zhao, Jun Cen, Sicong Leng, Kehan Li, Jiayan Guo, Kexiang Wang, Mingxiu Chen, Fan Wang, Deli Zhao, Xin Li 핵심 연구 목표 본 논문은 대규모 로봇 조작 데이터 부족 문제와 시각적 역학 모델링의 한계로 인해 기존 Vision-Language-Action (VLA)...","categories": ["Review"],
        "tags": ["Review","Vision-Language-Action (VLA) Model","Robot Manipulation","Human Demonstrations","Video Generative Pretraining","Ego-Centric Video","Trajectory Prediction","ActionVAE","Transformer"],
        "url": "/ai/review/2025-9-19-RynnVLA-001_Using_Human_Demonstrations_to_Improve_Robot_Manipulation/",
        "teaser": null
      },{
        "title": "[논문리뷰] ScaleCUA: Scaling Open-Source Computer Use Agents with Cross-Platform Data",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhaoyang Liu, Jingjing Xie, Zichen Ding, Zehao Li, Bowen Yang, Zhenyu Wu, Xuehui Wang, Qiushi Sun, Shi Liu, Weiyun Wang, Shenglong Ye, Qingyun Li, Xuan Dong, Yue Yu, Chenyu Lu, YunXiang Mo, Yao Yan, Zeyue Tian, Xiao Zhang, Yuan Huang, Yiqian Liu, Weijie Su,...","categories": ["Review"],
        "tags": ["Review","Computer Use Agents","Vision-Language Models","Cross-Platform Data","GUI Automation","Data Scaling","Open-Source","Task Completion","GUI Grounding"],
        "url": "/ai/review/2025-9-19-ScaleCUA_Scaling_Open-Source_Computer_Use_Agents_with_Cross-Platform_Data/",
        "teaser": null
      },{
        "title": "[논문리뷰] Understand Before You Generate: Self-Guided Training for Autoregressive Image Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiaoyu Yue, Xihui Liu, Zidong Wang, Wanli Ouyang, Yuqing Wang, Lei Bai, Wenlong Zhang, Luping Zhou 핵심 연구 목표 본 논문은 자연어 처리에서 성공적인 자기회귀(Autoregressive, AR) 모델이 이미지 생성 시 고수준 시각적 의미 학습에 어려움을 겪는 문제를 해결하고자 합니다. 특히, AR 모델의 지역적/조건적 의존성,...","categories": ["Review"],
        "tags": ["Review","Autoregressive Models","Image Generation","Self-Supervised Learning","Visual Understanding","Masked Image Modeling","Contrastive Learning","Next-Token Prediction","LlamaGen"],
        "url": "/ai/review/2025-9-19-Understand_Before_You_Generate_Self-Guided_Training_for_Autoregressive_Image_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Unleashing the Potential of Multimodal LLMs for Zero-Shot Spatio-Temporal Video Grounding",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zaiquan Yang, Yuhao Liu, Gerhard Hancke, Rynson W.H. Lau 핵심 연구 목표 본 논문은 입력 텍스트 질의를 기반으로 비디오 내에서 대상의 시공간 튜브(spatio-temporal tube)를 찾아내는 시공간 비디오 그라운딩(STVG) 태스크에서, MLLM(Multimodal Large Language Models)의 잠재력을 활용하여 제로샷(zero-shot) 해결책을 제시하는 것을 목표로 합니다. 기존 MLLM의 한계인...","categories": ["Review"],
        "tags": ["Review","Spatio-Temporal Video Grounding","Multimodal Large Language Models","Zero-Shot Learning","Visual Grounding","Decomposed Spatio-Temporal Highlighting","Logit-Guided Re-attention","Temporal-Augmented Assembling"],
        "url": "/ai/review/2025-9-19-Unleashing_the_Potential_of_Multimodal_LLMs_for_Zero-Shot_Spatio-Temporal_Video_Grounding/",
        "teaser": null
      },{
        "title": "[논문리뷰] WorldForge: Unlocking Emergent 3D/4D Generation in Video Diffusion Model via Training-Free Guidance",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chenxi Song, Yanming Yang, Tong Zhao, Ruibo Li, Chi Zhang 핵심 연구 목표 본 연구는 기존 비디오 확산 모델(VDM)이 3D/4D 작업에서 겪는 제어 가능성, 시공간 일관성, 기하학적 충실도의 한계를 해결하고자 합니다. 특히, 재훈련이나 미세 조정 없이 VDM의 풍부한 사전 지식을 활용하여 정밀한 카메라 궤적...","categories": ["Review"],
        "tags": ["Review","Video Diffusion Models","3D/4D Generation","Training-Free Guidance","Camera Trajectory Control","Novel View Synthesis","Geometric Consistency","Inference-Time Optimization"],
        "url": "/ai/review/2025-9-19-WorldForge_Unlocking_Emergent_3D4D_Generation_in_Video_Diffusion_Model_via_Training-Free_Guidance/",
        "teaser": null
      },{
        "title": "[논문리뷰] A Vision-Language-Action-Critic Model for Robotic Real-World Reinforcement Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shaopeng Zhai, Qi Zhang, Tianyi Zhang, Fuxian Huang, Haoran Zhang, Ming Zhou, Shengzhe Zhang, Litao Liu, Sixu Lin, Jiangmiao Pang 핵심 연구 목표 로봇의 실세계 강화 학습(RL)에서 희소하고 수작업으로 제작된 보상 및 비효율적인 탐색으로 인한 병목 현상을 해결하는 것을 목표로 합니다. 특히, 일반적인 로봇...","categories": ["Review"],
        "tags": ["Review","Robotics","Reinforcement Learning (RL)","Vision-Language-Action (VLA) Models","Reward Modeling","Human-in-the-Loop","Dense Rewards","Generalization","Autoregressive Models"],
        "url": "/ai/review/2025-9-22-A_Vision-Language-Action-Critic_Model_for_Robotic_Real-World_Reinforcement_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Ask-to-Clarify: Resolving Instruction Ambiguity through Multi-turn Dialogue",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xingyao Lin, Xinghao Zhu, Tianyi Lu, Sicheng Xie, Hui Zhang, Xipeng Qiu, Zuxuan Wu, Yu-Gang Jiang 핵심 연구 목표 현재 VLA(Vision-Language-Action) 기반 로봇이 모호한 지시를 처리하지 못하고 수동적으로 명령을 실행하는 한계를 해결하는 것이 목표입니다. 궁극적으로 인간과 적극적으로 소통하여 모호성을 해소하고, 실제 환경에서 저수준 액션을...","categories": ["Review"],
        "tags": ["Review","Embodied AI","Human-Robot Interaction","Multi-turn Dialogue","Instruction Following","Vision-Language Models","Diffusion Models","Ambiguity Resolution","Low-level Actions"],
        "url": "/ai/review/2025-9-22-Ask-to-Clarify_Resolving_Instruction_Ambiguity_through_Multi-turn_Dialogue/",
        "teaser": null
      },{
        "title": "[논문리뷰] BTL-UI: Blink-Think-Link Reasoning Model for GUI Agent",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shaojie Zhang, Ruoceng Zhang, Pei Fu, Shaokang Wang, Jiahui Yang, Xin Du, Shiqi Cui, Bin Qin, Ying Huang, Zhenbo Luo, Jian Luan 핵심 연구 목표 AI 기반 GUI 에이전트의 상호작용 논리가 인간의 자연스러운 GUI 소통 패턴과 현저히 다르다는 근본적인 문제를 해결하고자 합니다. 인간의 인지...","categories": ["Review"],
        "tags": ["Review","GUI Agent","Human-GUI Interaction","Cognitive Modeling","Reinforcement Learning","Multimodal Large Language Models","Attention Mechanisms","Action Planning"],
        "url": "/ai/review/2025-9-22-BTL-UI_Blink-Think-Link_Reasoning_Model_for_GUI_Agent/",
        "teaser": null
      },{
        "title": "[논문리뷰] BaseReward: A Strong Baseline for Multimodal Reward Model",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yi-Fan Zhang, Haihua Yang, Huanyu Zhang, Yang Shi, Zezhou Chen, Haochen Tian, Chaoyou Fu, Kai Wu, Bo Cui, Xu Wang, Jianfei Pan, Haotian Wang, Zhang Zhang, Liang Wang 핵심 연구 목표 본 연구는 고성능 멀티모달 보상 모델(MRM) 구축을 위한 체계적인 지침(“레시피”)을 제공하는 것을 목표로...","categories": ["Review"],
        "tags": ["Review","Multimodal Reward Model","MLLM Alignment","RLHF","Reward Head Architecture","Data Curation","Ensemble Methods","BaseReward"],
        "url": "/ai/review/2025-9-22-BaseReward_A_Strong_Baseline_for_Multimodal_Reward_Model/",
        "teaser": null
      },{
        "title": "[논문리뷰] Do You Hear What I Mean? Quantifying the Instruction-Perception Gap in Instruction-Guided Expressive Text-To-Speech Systems",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yi-Cheng Lin, Huang-Cheng Chou, Tzu-Chieh Wei, Kuan-Yu Chen, Hung-yi Lee 핵심 연구 목표 이 논문은 ITTS (Instruction-Guided Text-to-Speech) 시스템에서 사용자의 자연어 명령(natural language prompts)과 청취자의 음성 지각(listener perception) 간의 불일치를 정량적으로 분석하는 것을 목표로 합니다. 특히, 정도 부사, 점진적 감정 강도, 화자 연령, 단어...","categories": ["Review"],
        "tags": ["Review","Instruction-Guided TTS","Expressive Speech Synthesis","Human Perception","Subjective Evaluation","Controllability","Instruction Following","Evaluation Metrics"],
        "url": "/ai/review/2025-9-22-Do_You_Hear_What_I_Mean_Quantifying_the_Instruction-Perception_Gap_in_Instruction-Guided_Expressive_Text-To-Speech_Systems/",
        "teaser": null
      },{
        "title": "[논문리뷰] Latent Zoning Network: A Unified Principle for Generative Modeling, Representation Learning, and Classification",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zinan Lin, Junyi Zhu, Enshu Liu, Xuefei Ning, Wenyu Wang, Sergey Yekhanin 핵심 연구 목표 본 논문은 생성 모델링(Generative Modeling), 표현 학습(Representation Learning), 분류(Classification)라는 세 가지 핵심 ML 태스크를 단일 통합 원칙으로 해결하는 것을 목표로 합니다. 기존의 분리된 접근 방식의 한계를 극복하고, 단일 프레임워크...","categories": ["Review"],
        "tags": ["Review","Generative Modeling","Representation Learning","Classification","Unified Framework","Latent Space","Flow Matching","Deep Learning","Image Generation"],
        "url": "/ai/review/2025-9-22-Latent_Zoning_Network_A_Unified_Principle_for_Generative_Modeling_Representation_Learning_and_Classification/",
        "teaser": null
      },{
        "title": "[논문리뷰] Lynx: Towards High-Fidelity Personalized Video Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shen Sang, Tiancheng Zhi, Tianpei Gu, Jing Liu, Linjie Luo 핵심 연구 목표 본 논문은 단일 입력 이미지로부터 고품질의 개인화된 비디오를 합성하는 모델인 Lynx를 제시하며, 특히 높은 신원 보존을 목표로 합니다. 기존 비디오 생성 모델의 한계인 대상의 신원 불일치 문제를 해결하고, 시간적 일관성과 시각적...","categories": ["Review"],
        "tags": ["Review","Personalized Video Generation","Diffusion Transformer","Identity Preservation","Video Synthesis","Adapter Networks","Facial Recognition","Cross-Attention"],
        "url": "/ai/review/2025-9-22-Lynx_Towards_High-Fidelity_Personalized_Video_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] MANZANO: A Simple and Scalable Unified Multimodal Model with a Hybrid Vision Tokenizer",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yanghao Li, Rui Qian, Bowen Pan, Haotian Zhang, Haoshuo Huang, Bowen Zhang, Jialing Tong, Haoxuan You, Xianzhi Du, Zhe Gan, Hyunjik Kim, Chao Jia, Zhenbang Wang, Yinfei Yang, Mingfei Gao, Zi-Yi Dou, Wenze Hu, Chang Gao, Dongxu Li, Philipp Dufter, Zirui Wang, Guoli Yin,...","categories": ["Review"],
        "tags": ["Review","Multimodal LLM","Hybrid Tokenizer","Text-to-Image Generation","Visual Question Answering","Autoregressive Model","Diffusion Decoder","Unified Architecture","Model Scaling"],
        "url": "/ai/review/2025-9-22-MANZANO_A_Simple_and_Scalable_Unified_Multimodal_Model_with_a_Hybrid_Vision_Tokenizer/",
        "teaser": null
      },{
        "title": "[논문리뷰] RGB-Only Supervised Camera Parameter Optimization in Dynamic Scenes",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Fang Li, Hao Zhang, Narendra Ahuja 핵심 연구 목표 본 연구는 동적 장면에서 카메라 파라미터(초점 거리, 회전, 번역)를 효율적이고 정확하게 최적화하는 것을 목표로 합니다. 기존 COLMAP 방법의 긴 런타임과 동적 장면에서의 GT(Ground Truth) 모션 마스크 의존성 한계를 극복하고, 오직 RGB 영상만을 감독 정보로 사용하여...","categories": ["Review"],
        "tags": ["Review","Camera Parameter Optimization","Dynamic Scenes","RGB-Only Supervision","Structure from Motion","Outlier Robustness","3D Gaussian Splatting","Two-stage Optimization","Point Tracking"],
        "url": "/ai/review/2025-9-22-RGB-Only_Supervised_Camera_Parameter_Optimization_in_Dynamic_Scenes/",
        "teaser": null
      },{
        "title": "[논문리뷰] RPG: A Repository Planning Graph for Unified and Scalable Codebase Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Steven Liu, Xin Zhang, Kyleraha, Cipherxzc, Luo2003 핵심 연구 목표 대규모 언어 모델(LLMs)이 함수 및 파일 수준 코드 생성에는 뛰어나지만, 완전한 저장소(repository)를 처음부터 생성하는 데는 한계가 있습니다. 이는 제안 및 구현 단계 전반에 걸친 일관되고 신뢰할 수 있는 계획의 부재와 복잡한 소프트웨어 구조를 자연어가...","categories": ["Review"],
        "tags": ["Review","Code Generation","LLMs","Repository Planning","Graph-based Representation","Software Engineering","Agent Frameworks","Scalable Codebase"],
        "url": "/ai/review/2025-9-22-RPG_A_Repository_Planning_Graph_for_Unified_and_Scalable_Codebase_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] SPATIALGEN: Layout-guided 3D Indoor Scene Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chuan Fang, Heng Li, Yixun Liang, Jia Zheng, Yongsen Mao, Yuan Liu, Rui Tang, Zihan Zhou, Ping Tan 핵심 연구 목표 고품질의 3D 실내 환경 모델을 생성하는 기존 방식의 시간 소모성 및 제한된 다양성 문제를 해결하고, 시각적 품질, 다양성, 의미론적 일관성 및 사용자 제어...","categories": ["Review"],
        "tags": ["Review","3D Scene Generation","Layout Guidance","Diffusion Models","Multi-view Synthesis","Synthetic Dataset","Indoor Environments","Gaussian Splatting","Semantic Consistency"],
        "url": "/ai/review/2025-9-22-SPATIALGEN_Layout-guided_3D_Indoor_Scene_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Video2Roleplay: A Multimodal Dataset and Framework for Video-Guided Role-playing Agents",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xueqiao Zhang, Chao Zhang, Jingtao Xu, Yifan Zhu, Xin Shi, Yi Yang, Yawei Luo 핵심 연구 목표 기존 Role-playing Agents (RPAs)가 정적인 역할 프로필에만 의존하여 인간의 동적인 지각 능력을 포착하지 못하는 한계를 극복하는 것입니다. 비디오 모달리티를 RPAs에 통합하여 동적 역할 프로필 개념을 도입하고, 이를...","categories": ["Review"],
        "tags": ["Review","Role-playing Agents (RPAs)","Multimodal AI","Video Understanding","Large Language Models (LLMs)","Dataset Creation","Dynamic Role Profiles","Adaptive Temporal Sampling","Fine-tuning"],
        "url": "/ai/review/2025-9-22-Video2Roleplay_A_Multimodal_Dataset_and_Framework_for_Video-Guided_Role-playing_Agents/",
        "teaser": null
      },{
        "title": "[논문리뷰] WhisTLE: Deeply Supervised, Text-Only Domain Adaptation for Pretrained Speech Recognition Transformers",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Akshat Pandey,¹ Karun Kumar,¹ Raphael Tang² 핵심 연구 목표 본 논문은 Whisper와 같은 사전 훈련된 최신 ASR(Automatic Speech Recognition) 모델이 미지의 도메인 어휘와 발화를 처리할 때 발생하는 성능 저하 문제를 해결하고자 합니다. 특히, 목표 도메인의 음성 데이터 수집이 비현실적인 상황에서, 텍스트 데이터만을 활용한 심층...","categories": ["Review"],
        "tags": ["Review","ASR","Domain Adaptation","Text-Only Training","Transformer","Variational Autoencoder","Deep Supervision","Whisper","Encoder-Decoder Models"],
        "url": "/ai/review/2025-9-22-WhisTLE_Deeply_Supervised_Text-Only_Domain_Adaptation_for_Pretrained_Speech_Recognition_Transformers/",
        "teaser": null
      },{
        "title": "[논문리뷰] ARE: Scaling Up Agent Environments and Evaluations",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Pierre Andrews, Amine Benhalloum, Matteo Bettini, Virginie Do, Romain Froger, et al. 핵심 연구 목표 논문은 AI 에이전트 개발 및 평가를 위한 확장 가능한 연구 플랫폼인 Meta Agents Research Environments (ARE)를 소개하고, 이를 기반으로 일반 에이전트 역량을 측정하는 벤치마크인 Gaia2를 제시합니다. 기존 벤치마크의 한계인...","categories": ["Review"],
        "tags": ["Review","Agent Environments","Agent Evaluation","LLM Agents","Asynchronous Systems","Reinforcement Learning","Tool Use","Multi-agent Collaboration","Benchmark"],
        "url": "/ai/review/2025-9-23-ARE_Scaling_Up_Agent_Environments_and_Evaluations/",
        "teaser": null
      },{
        "title": "[논문리뷰] Analyzing the Effects of Supervised Fine-Tuning on Model Knowledge from Token and Parameter Levels",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Junjie Ye, Yuming Yang, Yang Nan, Shuo Li, Qi Zhang, Tao Gui, Xuanjing Huang, Peng Wang, Zhongchao Shi, Jianping Fan 핵심 연구 목표 본 논문은 LLM에서 SFT가 모델의 지식에 미치는 영향이 충분히 이해되지 않고 있다는 문제의식에서 출발합니다. 특히 다양한 범주의 데이터와 스케일이 모델 지식에...","categories": ["Review"],
        "tags": ["Review","Supervised Fine-Tuning (SFT)","Large Language Models (LLMs)","Model Knowledge","Closed-Book Question Answering (CBQA)","Parameter Restoration","Kullback-Leibler Divergence","Knowledge Forgetting"],
        "url": "/ai/review/2025-9-23-Analyzing_the_Effects_of_Supervised_Fine-Tuning_on_Model_Knowledge_from_Token_and_Parameter_Levels/",
        "teaser": null
      },{
        "title": "[논문리뷰] AuditoryBench++: Can Language Models Understand Auditory Knowledge without Hearing?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hyunjong Ok, Suho Yoo, Hyeonjun Kim, Jaeho Lee 핵심 연구 목표 언어 모델(LLMs)이 오디오 입력 없이 텍스트만으로 청각적 상식과 추론 능력을 이해하는 데 부족함을 해결하고자 합니다. 이 격차를 해소하기 위해 청각 지식을 평가하는 AuditoryBench++ 벤치마크를 제시하고, LLM이 청각 정보를 “상상”하여 추론하는 AIR-CoT 방법론을 개발하는...","categories": ["Review"],
        "tags": ["Review","Auditory Knowledge","Large Language Models","Multimodal Reasoning","Benchmark","Chain-of-Thought","Auditory Imagination","Text-only Reasoning"],
        "url": "/ai/review/2025-9-23-AuditoryBench_Can_Language_Models_Understand_Auditory_Knowledge_without_Hearing/",
        "teaser": null
      },{
        "title": "[논문리뷰] ByteWrist: A Parallel Robotic Wrist Enabling Flexible and Anthropomorphic Motion for Confined Spaces",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiawen Tian, Liqun Huang, Zhongren Cui, Jingchao Qiao, Jiafeng Xu, Xiao Ma, Zeyu Ren 핵심 연구 목표 이 논문은 기존 로봇 손목이 좁고 제한된 공간에서의 작업 시 겪는 유연성, 컴팩트함, 동적 응답성 한계를 해결하고자 합니다. 특히, 유연하고 인간과 유사한 움직임을 가능하게 하는 동시에, 컴팩트함과...","categories": ["Review"],
        "tags": ["Review","Robotics","Parallel Manipulator","Robotic Wrist","Confined Space Manipulation","Kinematics","Anthropomorphic Robot","Robot Design"],
        "url": "/ai/review/2025-9-23-ByteWrist_A_Parallel_Robotic_Wrist_Enabling_Flexible_and_Anthropomorphic_Motion_for_Confined_Spaces/",
        "teaser": null
      },{
        "title": "[논문리뷰] CodeFuse-CR-Bench: A Comprehensiveness-aware Benchmark for End-to-End Code Review Evaluation in Python Projects",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hanyang Guo, Xunjin Zheng, Zihan Liao, Hang Yu, Peng DI, Ziyin Zhang, Hong-Ning Dai 핵심 연구 목표 기존 LLM 기반 코드 리뷰(CR) 벤치마크가 겪는 “현실성 격차”(reality gap) 문제를 해결하고자 합니다. 이는 태스크 단편화(task fragmentation), 컨텍스트 부족(context poverty), 평가 협소성(evaluation narrowness)에서 기인하며, 논문은 이러한 한계를...","categories": ["Review"],
        "tags": ["Review","Code Review","LLMs","Benchmark","Python Projects","End-to-End Evaluation","Context-Awareness","Software Engineering","LLM-as-a-Judge"],
        "url": "/ai/review/2025-9-23-CodeFuse-CR-Bench_A_Comprehensiveness-aware_Benchmark_for_End-to-End_Code_Review_Evaluation_in_Python_Projects/",
        "teaser": null
      },{
        "title": "[논문리뷰] ContextFlow: Training-Free Video Object Editing via Adaptive Context Enrichment",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yiyang Chen¹, Xuanhua He2,†, Xiujun Ma¹†, Yue Ma2,† 핵심 연구 목표 훈련 없이 비디오 객체 편집(삽입, 교체, 삭제)을 수행할 때 발생하는 정확한 인버전 실패와 부적절한 특성 대체로 인한 문맥적 충돌 문제를 해결하고, 특히 Diffusion Transformer (DiT) 기반 모델에서 고품질 및 시간적 일관성을 유지하는 비디오...","categories": ["Review"],
        "tags": ["Review","Video Object Editing","Training-Free","Diffusion Transformers","Rectified Flow","Adaptive Context Enrichment","Guidance Responsiveness","Temporal Consistency","Image-to-Video"],
        "url": "/ai/review/2025-9-23-ContextFlow_Training-Free_Video_Object_Editing_via_Adaptive_Context_Enrichment/",
        "teaser": null
      },{
        "title": "[논문리뷰] Cross-Attention is Half Explanation in Speech-to-Text Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Sara Papi, Dennis Fucci, Marco Gaido, Matteo Negri, Luisa Bentivogli 핵심 연구 목표 본 논문은 S2T 모델에서 교차 어텐션(cross-attention) 점수가 입력-출력 의존성을 얼마나 잘 설명하는지 체계적으로 분석합니다. 특히, 교차 어텐션이 입력-출력 정렬의 대리자로서 유효한지, 그리고 특징 기여(feature attribution)와 같은 정식 설명 가능성(explainability) 방법론과 비교...","categories": ["Review"],
        "tags": ["Review","Cross-attention","Speech-to-Text (S2T)","Explainable AI (XAI)","Saliency Maps","Feature Attribution","Transformer","Context Mixing","Correlation"],
        "url": "/ai/review/2025-9-23-Cross-Attention_is_Half_Explanation_in_Speech-to-Text_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] DIWALI - Diversity and Inclusivity aWare cuLture specific Items for India: Dataset and Assessment of LLMs for Cultural Text Adaptation in Indian Context",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Pramit Sahoo, Maharaj Brahma, Maunendra Sankar Desarkar 핵심 연구 목표 대규모 언어 모델(LLMs)이 서구 문화에 편향된 훈련 데이터로 인해 문화적 적합성과 지역적 다양성 측면에서 부족하다는 문제를 해결하고자 합니다. 특히 인도의 다양한 문화적 배경을 반영하는 문화 텍스트 적응(cultural text adaptation) 능력을 평가하기 위한 새로운 데이터셋(DIWALI)을...","categories": ["Review"],
        "tags": ["Review","Cultural Adaptation","Large Language Models","Indian Culture","Dataset Creation","CSI","Human Evaluation","LLM Evaluation","Cultural Bias"],
        "url": "/ai/review/2025-9-23-DIWALI_-_Diversity_and_Inclusivity_aWare_cuLture_specific_Items_for_India_Dataset_and_Assessment_of_LLMs_for_Cultural_Text_Adaptation_in_Indian_Context/",
        "teaser": null
      },{
        "title": "[논문리뷰] DiffusionNFT: Online Diffusion Reinforcement with Forward Process",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Kaiwen Zheng, Huayu Chen, Haotian Ye, Haoxiang Wang, Qinsheng Zhang, Kai Jiang, Hang Su, Stefano Ermon, Jun Zhu, Ming-Yu Liu 핵심 연구 목표 본 논문은 확산 모델의 온라인 강화 학습(RL) 적용 시 발생하는 고유한 문제점, 즉 다루기 어려운 가능도(likelihoods)와 역방향 샘플링 과정의 제약사항을 해결하는...","categories": ["Review"],
        "tags": ["Review","Diffusion Models","Reinforcement Learning","Online RL","Flow Matching","Forward Process","CFG-free","Image Generation","Negative-Aware FineTuning"],
        "url": "/ai/review/2025-9-23-DiffusionNFT_Online_Diffusion_Reinforcement_with_Forward_Process/",
        "teaser": null
      },{
        "title": "[논문리뷰] EpiCache: Episodic KV Cache Management for Long Conversational Question Answering",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Minsoo Kim, Arnav Kundu, Han-Byul Kim, Richa Dixit, Minsik Cho 핵심 연구 목표 대규모 언어 모델(LLM) 기반의 장기 대화형 질문 답변(LongConvQA) 시스템에서 KV 캐시의 메모리 사용량이 대화 길이에 따라 선형적으로 증가하는 문제를 해결하는 것이 목표입니다. 기존 KV 캐시 압축 방식이 겪는 무한한 최대 메모리...","categories": ["Review"],
        "tags": ["Review","KV Cache Management","Long Conversational QA","LLMs","Memory Efficiency","Episodic Clustering","Block Prefill Eviction","Sensitivity-aware Allocation"],
        "url": "/ai/review/2025-9-23-EpiCache_Episodic_KV_Cache_Management_for_Long_Conversational_Question_Answering/",
        "teaser": null
      },{
        "title": "[논문리뷰] FlagEval Findings Report: A Preliminary Evaluation of Large Reasoning Models on Automatically Verifiable Textual and Visual Questions",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Bowen Qin, Chen Yue, Teng Dai, Jing-Shu Zheng, Miguel Hu Chen, Richeng Xuan, et al. 핵심 연구 목표 본 논문은 최신 대규모 추론 모델(LRMs)을 자동으로 검증 가능한 텍스트 및 시각 질문에 대해 오염 없는(contamination-free) 방식으로 평가하는 예비 보고서입니다. 추론 시간(inference-time) 사고(thinking)의 유용성, 모델의 행동...","categories": ["Review"],
        "tags": ["Review","Large Reasoning Models","LLM Evaluation","Multimodal AI","Reasoning Behaviors","Hallucination","Contamination-Free","AI Safety","Instruction Following"],
        "url": "/ai/review/2025-9-23-FlagEval_Findings_Report_A_Preliminary_Evaluation_of_Large_Reasoning_Models_on_Automatically_Verifiable_Textual_and_Visual_Questions/",
        "teaser": null
      },{
        "title": "[논문리뷰] From Hugging Face to GitHub: Tracing License Drift in the Open-Source AI Ecosystem",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: James Jewitt, Hao Li, Bram Adams, Gopi Krishnan Rajbahadur, Ahmed E. Hassan 핵심 연구 목표 오픈 소스 AI 생태계 내에서 데이터셋, 모델, 그리고 이를 활용하는 소프트웨어 애플리케이션 전반에 걸쳐 발생하는 라이선스 충돌과 ‘라이선스 드리프트’의 정도를 정량적으로 파악하는 것입니다. 이러한 시스템적 비준수가 야기하는 법적, 윤리적...","categories": ["Review"],
        "tags": ["Review","Open-Source AI","License Compliance","License Drift","AI Supply Chain","Hugging Face","GitHub","LicenseRec","Legal Risk"],
        "url": "/ai/review/2025-9-23-From_Hugging_Face_to_GitHub_Tracing_License_Drift_in_the_Open-Source_AI_Ecosystem/",
        "teaser": null
      },{
        "title": "[논문리뷰] From Uniform to Heterogeneous: Tailoring Policy Optimization to Every Token's Nature",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zheng Liu, Mengjie Liu, Siwei Wen, Mengzhang Cai, Bin Cui, Conghui He, Wentao Zhang 핵심 연구 목표 기존 RLHF (Reinforcement Learning from Human Feedback) 알고리즘이 LLM의 추론 과정에서 토큰의 다양한 역할을 무시하고 모든 토큰에 균일한 최적화를 적용하는 한계를 해결하는 것을 목표로 합니다. 토큰의 본질적인...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","LLMs","Policy Optimization","Token Heterogeneity","Adaptive Sampling","Advantage Redistribution","Asymmetric Clipping","Entropy-based RL"],
        "url": "/ai/review/2025-9-23-From_Uniform_to_Heterogeneous_Tailoring_Policy_Optimization_to_Every_Tokens_Nature/",
        "teaser": null
      },{
        "title": "[논문리뷰] GeoPQA: Bridging the Visual Perception Gap in MLLMs for Geometric Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Guizhen Chen, Weiwen Xu, Hao Zhang, Hou Pong Chan, Deli Zhao, Anh Tuan Luu, Yu Rong 핵심 연구 목표 본 논문은 멀티모달 대규모 언어 모델(MLLM)이 기하학적 추론과 같은 시각 집중 태스크에서 자주 발생하는 환각 현상과 부정확한 추론 문제를 해결하고자 합니다. 이러한 문제의 근본 원인인...","categories": ["Review"],
        "tags": ["Review","Multimodal Large Language Models (MLLMs)","Geometric Reasoning","Visual Perception","Reinforcement Learning (RL)","Two-stage Training","GeoPQA Benchmark","Perceptual Bottleneck"],
        "url": "/ai/review/2025-9-23-GeoPQA_Bridging_the_Visual_Perception_Gap_in_MLLMs_for_Geometric_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] LIMI: Less is More for Agency",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: happyZYM, evanlin2570, weizhihao1, mhjiang0408, YangXiao-nlp 핵심 연구 목표 현재 AI 에이전트 개발이 대규모 데이터가 더 나은 에이전시를 가져온다는 기존 스케일링 법칙을 따르는 한계를 극복하는 것을 목표로 합니다. LIMI (Less Is More for Intelligent Agency) 접근 방식을 통해, 정교한 에이전트 지능이 최소한의 전략적으로 선별된 데모로부터도...","categories": ["Review"],
        "tags": ["Review","AI Agency","Data Curation","Less Is More","Agentic Intelligence","Foundation Models","Evaluation Benchmark","Efficiency Principle","Large Language Models"],
        "url": "/ai/review/2025-9-23-LIMI_Less_is_More_for_Agency/",
        "teaser": null
      },{
        "title": "[논문리뷰] Mano Report",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Tianyu Fu, Anyang Su, Chenxu Zhao, Hanning Wang, Minghui Wu 외 다수 핵심 연구 목표 본 논문은 시각적 복잡성, 동적 환경, 다단계 추론 요구사항으로 인해 어려운 GUI 상호작용 자동화 문제를 해결하는 것을 목표로 합니다. 기존 Vision-Language Model (VLM) 기반 접근법의 해상도 제한, 도메인 불일치,...","categories": ["Review"],
        "tags": ["Review","GUI Agent","Multi-modal Foundation Model","Reinforcement Learning","Supervised Fine-tuning","Simulated Environment","Data Generation","Error Recovery","Web Automation"],
        "url": "/ai/review/2025-9-23-Mano_Report/",
        "teaser": null
      },{
        "title": "[논문리뷰] MetaEmbed: Scaling Multimodal Retrieval at Test-Time with Flexible Late Interaction",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zilin Xiao, Qi Ma, Mengting Gu, Jason Chen, Xintao Chen, Vicente Ordonez, Vijai Mohan 핵심 연구 목표 기존 멀티모달 검색 방법론들이 단일 벡터 임베딩의 표현력 한계에 부딪히거나, 다수의 토큰으로 인한 다중 벡터 방식의 계산 비용 문제로 확장성에 제약을 받는 문제를 해결하고자 합니다. 유연한 테스트...","categories": ["Review"],
        "tags": ["Review","Multimodal Retrieval","Late Interaction","Meta Tokens","Matryoshka Representation Learning","Test-Time Scaling","Vision-Language Models","Dense Retrieval","Efficiency"],
        "url": "/ai/review/2025-9-23-MetaEmbed_Scaling_Multimodal_Retrieval_at_Test-Time_with_Flexible_Late_Interaction/",
        "teaser": null
      },{
        "title": "[논문리뷰] OmniInsert: Mask-Free Video Insertion of Any Reference via Diffusion Transformer Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jinshu Chen, Xinghui Li, Xu Bai, Tianxiang Ma, Pengze Zhang, Zhuowei Chen, Gen Li, Lijie Liu, Songtao Zhao, Bingchuan Li, Qian He 핵심 연구 목표 본 논문은 기존 비디오 삽입 모델의 복잡한 제어 신호(예: 마스크, 포인트) 의존성, 주제 일관성 부족, 그리고 데이터 희소성 문제를...","categories": ["Review"],
        "tags": ["Review","Video Insertion","Diffusion Models","Diffusion Transformers","Mask-Free","Data Augmentation","Progressive Training","Preference Optimization","Video Generation"],
        "url": "/ai/review/2025-9-23-OmniInsert_Mask-Free_Video_Insertion_of_Any_Reference_via_Diffusion_Transformer_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] QWHA: Quantization-Aware Walsh-Hadamard Adaptation for Parameter-Efficient Fine-Tuning on Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hyesung Jeon, Seojune Lee, Beomseok Kang, Yulhwa Kim, Jae-Joon Kim 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM)의 효율적인 배포를 위해 양자화-인식(Quantization-Aware) PEFT (Parameter-Efficient Fine-Tuning) 방법을 개발하여, 양자화된 모델의 낮은 비트 환경에서 정확도를 높이고 동시에 훈련 효율성을 개선하는 것을 목표로 합니다. 특히, 기존의 저랭크...","categories": ["Review"],
        "tags": ["Review","LLM Fine-tuning","Quantization-Aware PEFT","Walsh-Hadamard Transform","Sparse Adaptation","Low-bit Quantization","Parameter-Efficient Learning"],
        "url": "/ai/review/2025-9-23-QWHA_Quantization-Aware_Walsh-Hadamard_Adaptation_for_Parameter-Efficient_Fine-Tuning_on_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] Qwen3-Omni Technical Report",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Qwen Team 핵심 연구 목표 본 논문은 텍스트, 이미지, 오디오, 비디오 등 다양한 모달리티 전반에 걸쳐 단일 멀티모달 모델(Qwen3-Omni)이 기존 단일 모달 모델과 비교하여 성능 저하 없이 최첨단 성능을 유지하는 것을 목표로 합니다. 또한, 교차 모달 추론 능력과 실시간 시청각 상호작용을 향상시키는 것을 주된...","categories": ["Review"],
        "tags": ["Review","Multimodal Model","Thinker-Talker Architecture","Mixture-of-Experts","Low-latency","Audio Understanding","Cross-modal Reasoning","State-of-the-Art","Real-time Interaction"],
        "url": "/ai/review/2025-9-23-Qwen3-Omni_Technical_Report/",
        "teaser": null
      },{
        "title": "[논문리뷰] Reasoning Core: A Scalable RL Environment for LLM Symbolic Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Valentin Lacombe, Valentin Quesnel, and Damien Sileo 핵심 연구 목표 본 연구는 LLM의 기초적인 기호 추론 능력을 향상시키기 위한 확장 가능한 RLVR (Reinforcement Learning with Verifiable Rewards) 환경인 Reasoning Core를 소개합니다. 기존 벤치마크의 고정된 특성이나 제한적인 데이터 다양성으로 인한 확장성 병목 현상을 극복하고, LLM이...","categories": ["Review"],
        "tags": ["Review","LLM Reasoning","Symbolic AI","Reinforcement Learning","Procedural Content Generation","Verifiable Rewards","Adaptive Curricula","First-Order Logic","PDDL Planning"],
        "url": "/ai/review/2025-9-23-Reasoning_Core_A_Scalable_RL_Environment_for_LLM_Symbolic_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] SCAN: Self-Denoising Monte Carlo Annotation for Robust Process Reward Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuyang Ding, Xinyu Shi, Juntao Li, Xiaobo Liang, Zhaopeng Tu, Min Zhang 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)의 추론 과정을 평가하는 Process Reward Models (PRMs) 개발의 핵심 난제인 높은 비용의 사람 주석 데이터와 Monte Carlo (MC) 추정 데이터의 높은 노이즈 문제를 해결하고자...","categories": ["Review"],
        "tags": ["Review","Process Reward Models","Monte Carlo Annotation","Noise Denoising","Robust Learning","Self-Supervision","Mathematical Reasoning","Large Language Models"],
        "url": "/ai/review/2025-9-23-SCAN_Self-Denoising_Monte_Carlo_Annotation_for_Robust_Process_Reward_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] SWE-Bench Pro: Can AI Agents Solve Long-Horizon Software Engineering Tasks?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiang Deng, Jeff Da, Edwin Pan, Yannis Yiming He, Charles Ide, Kanak Garg, Niklas Lauffer, Andrew Park, Nitin Pasari, Chetan Rane, Karmini Sampath, Maya Krishnan, Srivatsa Kundurthy, Sean Hendryx, Zifan Wang, Chen Bo Calvin Zhang, Noah Jacobson, Bing Liu, Brad Kenstler 핵심 연구 목표...","categories": ["Review"],
        "tags": ["Review","AI Agents","Software Engineering","LLMs","Code Generation","Benchmark","Contamination Resistance","Long-Horizon Tasks","Enterprise Software"],
        "url": "/ai/review/2025-9-23-SWE-Bench_Pro_Can_AI_Agents_Solve_Long-Horizon_Software_Engineering_Tasks/",
        "teaser": null
      },{
        "title": "[논문리뷰] Synthetic bootstrapped pretraining",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zitong Yang, Aonan Zhang, Hong Liu, Tatsunori Hashimoto, Emmanuel Candès, Chong Wang, Ruoming Pang 핵심 연구 목표 본 논문은 대규모 언어 모델(LM) 사전 훈련 시 고품질 텍스트 데이터 고갈 문제를 해결하고, 표준 사전 훈련에서 간과되는 문서 간 풍부한 상관관계를 효과적으로 모델링하여 LM 성능을 개선하는...","categories": ["Review"],
        "tags": ["Review","Language Model Pretraining","Synthetic Data","Inter-document Correlation","Data Augmentation","Transformer","Bootstrapping","Concept Learning"],
        "url": "/ai/review/2025-9-23-Synthetic_bootstrapped_pretraining/",
        "teaser": null
      },{
        "title": "[논문리뷰] TempSamp-R1: Effective Temporal Sampling with Reinforcement Fine-Tuning for Video LLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yunheng Li, Jing Cheng, Shaoyong Jia, Hangyi Kuang, Shaohui Jiao, Qibin Hou, Ming-Ming Cheng 핵심 연구 목표 이 논문은 비디오 시간적 접지(temporal grounding) 작업에서 멀티모달 대규모 언어 모델(MLLMs)의 효율성을 개선하는 것을 목표로 합니다. 기존 강화 학습(RL) 방법론, 특히 GRPO가 큰 시간 검색 공간에서 비효율적인...","categories": ["Review"],
        "tags": ["Review","Video LLMs","Temporal Grounding","Reinforcement Learning","Off-policy Learning","Reward Shaping","Chain-of-Thought","Multimodal LLMs"],
        "url": "/ai/review/2025-9-23-TempSamp-R1_Effective_Temporal_Sampling_with_Reinforcement_Fine-Tuning_for_Video_LLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] Turk-LettuceDetect: A Hallucination Detection Models for Turkish RAG Applications",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Selva Taş, Mahmut El Huseyni, Özay Ezerceli, Reyhan Bayraktar, Fatma Betül Terzioğlu 핵심 연구 목표 대규모 언어 모델(LLMs)의 환각(hallucination) 문제를 해결하고, 특히 형태학적으로 복잡한 터키어 RAG(Retrieval-Augmented Generation) 애플리케이션을 위한 효과적인 환각 탐지 모델을 개발하는 것이 목표입니다. 기존 탐지 방법의 계산 비효율성과 제한된 컨텍스트 길이라는...","categories": ["Review"],
        "tags": ["Review","Hallucination Detection","Retrieval Augmented Generation","Large Language Models","Turkish NLP","Token Classification","ModernBERT","Low-Resource Languages"],
        "url": "/ai/review/2025-9-23-Turk-LettuceDetect_A_Hallucination_Detection_Models_for_Turkish_RAG_Applications/",
        "teaser": null
      },{
        "title": "[논문리뷰] Understanding Embedding Scaling in Collaborative Filtering",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhuangzhuang He, Kaiyu Zhou, Haoyue Bai, Fengbin Zhu, Yonghui Yang 핵심 연구 목표 협업 필터링 모델에서 임베딩 차원을 확장할 때 발생하는 성능 변화를 이해하고, 기존에 알려진 ‘단일 봉우리(single-peak)’ 현상을 넘어서는 새로운 스케일링 패턴을 발견하는 것이 목표입니다. 또한, 이러한 현상의 근본적인 원인을 밝히고 특히 데이터...","categories": ["Review"],
        "tags": ["Review","Collaborative Filtering","Embedding Scaling","Noise Robustness","Recommender Systems","Graph Neural Networks","Self-supervised Learning","Performance Degradation"],
        "url": "/ai/review/2025-9-23-Understanding_Embedding_Scaling_in_Collaborative_Filtering/",
        "teaser": null
      },{
        "title": "[논문리뷰] VaseVQA: Multimodal Agent and Benchmark for Ancient Greek Pottery",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jinchao Ge, Tengfei Cheng, Biao Wu, Zeyu Zhang, Shiya Huang 핵심 연구 목표 본 연구는 고대 그리스 도자기에 대한 전문가 수준의 추론 능력을 갖춘 MLLM(Multimodal Large Language Models) 에이전트를 개발하는 것을 목표로 합니다. 일반적인 MLLM이 부족한 도메인 전문성과 SFT(Supervised Fine-Tuning) 모델의 피상적인 패턴 학습...","categories": ["Review"],
        "tags": ["Review","Multimodal Large Language Models","Visual Question Answering","Reinforcement Learning","Cultural Heritage","Ancient Greek Pottery","Supervised Fine-Tuning","Benchmark"],
        "url": "/ai/review/2025-9-23-VaseVQA_Multimodal_Agent_and_Benchmark_for_Ancient_Greek_Pottery/",
        "teaser": null
      },{
        "title": "[논문리뷰] VideoFrom3D: 3D Scene Video Generation via Complementary Image and Video Diffusion Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Sunghyun Cho, Janghyeok Han, Geonung Kim 핵심 연구 목표 본 논문은 조잡한(coarse) 3D 지오메트리, 카메라 궤적, 그리고 참조 이미지를 사용하여 고품질 3D 장면 비디오를 생성하는 문제를 해결하고자 합니다. 기존 비디오 확산 모델이 복잡한 장면에서 시각적 품질, 움직임, 시간적 일관성을 공동으로 모델링하는 데 겪는 어려움을...","categories": ["Review"],
        "tags": ["Review","3D Scene Generation","Video Diffusion","Image Diffusion","Generative Models","Computer Graphics","Temporal Consistency","Sparse Anchor Views"],
        "url": "/ai/review/2025-9-23-VideoFrom3D_3D_Scene_Video_Generation_via_Complementary_Image_and_Video_Diffusion_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] When Big Models Train Small Ones: Label-Free Model Parity Alignment for Efficient Visual Question Answering using Small VLMs",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Abhirama Subramanyam Penamakuri, Navlika Singh, Piyush Arora, Anand Mishra 핵심 연구 목표 본 논문은 시각 질문 답변(VQA) 태스크에서 Small Vision-Language Models (S-VLMs)의 성능을 향상시키는 것을 목표로 합니다. 이는 Large Vision-Language Models (L-VLMs)의 높은 계산 비용과 성능 격차 문제를 해결하기 위해, 레이블이 없는 이미지와 효과적인...","categories": ["Review"],
        "tags": ["Review","VQA","Small VLMs","Large VLMs","Knowledge Transfer","Pseudo-labeling","Label-Free Learning","Model Parity Alignment","Computational Efficiency"],
        "url": "/ai/review/2025-9-23-When_Big_Models_Train_Small_Ones_Label-Free_Model_Parity_Alignment_for_Efficient_Visual_Question_Answering_using_Small_VLMs/",
        "teaser": null
      },{
        "title": "[논문리뷰] Baseer: A Vision-Language Model for Arabic Document-to-Markdown OCR",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Khalil Hennara, Muhammad Hreden, Mohamed Motasim Hamed, Ahmad Bastati, Zeina Aldallal, Sara Chrouf, Safwan AlModhayan 핵심 연구 목표 본 논문은 필기체 스크립트, 다양한 글꼴, 발음 기호, 우-좌향 텍스트 방향성으로 인해 어려운 아랍어 문서 OCR의 과제를 해결하고자 합니다. 기존 멀티모달 대규모 언어 모델(MLLM)의 아랍어 문서...","categories": ["Review"],
        "tags": ["Review","Arabic OCR","Vision-Language Model","Fine-tuning","Document Understanding","Markdown Conversion","Benchmark"],
        "url": "/ai/review/2025-9-24-Baseer_A_Vision-Language_Model_for_Arabic_Document-to-Markdown_OCR/",
        "teaser": null
      },{
        "title": "[논문리뷰] CAR-Flow: Condition-Aware Reparameterization Aligns Source and Target for Better Flow Matching",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chen Chen, Pengsheng Guo, Liangchen Song, Jiasen Lu, Rui Qian, Xinze Wang, Tsu-Jui Fu, Wei Liu, Yinfei Yang, Alex Schwing 핵심 연구 목표 조건부 생성 모델에서 속도 네트워크가 데이터 분포의 질량 이동(mass transport)과 조건 정보 인코딩(conditional injection)이라는 두 가지 과제를 동시에 처리해야 하는 부담을...","categories": ["Review"],
        "tags": ["Review","Flow Matching","Conditional Generative Models","Reparameterization","Mode Collapse","Image Generation","Latent Space Alignment","Diffusion Models"],
        "url": "/ai/review/2025-9-24-CAR-Flow_Condition-Aware_Reparameterization_Aligns_Source_and_Target_for_Better_Flow_Matching/",
        "teaser": null
      },{
        "title": "[논문리뷰] Do You Need Proprioceptive States in Visuomotor Policies?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Juntu Zhao, Wenbo Lu, Di Zhang, Yufeng Liu, Yushen Liang 핵심 연구 목표 본 연구는 로봇의 시각-운동 정책(visuomotor policies)에서 고유 수용성 상태(proprioceptive states)의 필요성을 재평가하고, 기존 상태 기반 정책이 학습 궤적에 과적합되어 공간 일반화 능력이 저해되는 문제를 해결하고자 합니다. 궁극적으로 고유 수용성 상태를 제거한...","categories": ["Review"],
        "tags": ["Review","Visuomotor Policies","Spatial Generalization","Imitation Learning","Proprioception","State-free Policies","Robot Manipulation","End-Effector Control","Data Efficiency"],
        "url": "/ai/review/2025-9-24-Do_You_Need_Proprioceptive_States_in_Visuomotor_Policies/",
        "teaser": null
      },{
        "title": "[논문리뷰] GeoSVR: Taming Sparse Voxels for Geometrically Accurate Surface Reconstruction",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiahe Li, Jiawei Zhang, Youmin Zhang, Xiao Bai, Jin Zheng, Xiaohan Yu, Lin Gu 핵심 연구 목표 본 논문은 기존 3D Gaussian Splatting (3DGS) 기반 표면 재구성 방법론의 한계, 즉 초기화 시 점군(point clouds)에 대한 의존성, 불완전한 커버리지, 모호한 기하학적 표현 등의 문제를 해결하는...","categories": ["Review"],
        "tags": ["Review","Surface Reconstruction","Sparse Voxels","Geometric Accuracy","Neural Radiance Fields","3D Gaussian Splatting","Monocular Depth","Voxel Uncertainty"],
        "url": "/ai/review/2025-9-24-GeoSVR_Taming_Sparse_Voxels_for_Geometrically_Accurate_Surface_Reconstruction/",
        "teaser": null
      },{
        "title": "[논문리뷰] HyRF: Hybrid Radiance Fields for Memory-efficient and High-quality Novel View Synthesis",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zipeng Wang, Dan Xu 핵심 연구 목표 3D Gaussian Splatting (3DGS)의 실시간 고품질 렌더링 장점은 유지하면서, 뷰-의존적 효과 및 이방성 모양 모델링으로 인한 막대한 메모리 오버헤드를 해결하는 것을 목표로 합니다. 기존 Neural Field 기반 압축 방식이 고주파 공간 변화를 포착하는 데 어려움을 겪는 한계를...","categories": ["Review"],
        "tags": ["Review","Novel View Synthesis","3D Gaussian Splatting (3DGS)","Neural Radiance Fields (NeRF)","Memory Efficiency","High-Quality Rendering","Hybrid Representation","Real-time Rendering"],
        "url": "/ai/review/2025-9-24-HyRF_Hybrid_Radiance_Fields_for_Memory-efficient_and_High-quality_Novel_View_Synthesis/",
        "teaser": null
      },{
        "title": "[논문리뷰] Hyper-Bagel: A Unified Acceleration Framework for Multimodal Understanding and Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yanzuo Lu, Xin Xia, Manlin Zhang, Huafeng Kuang, Jianbin Zheng, Yuxi Ren, Xuefeng Xiao 핵심 연구 목표 통합 멀티모달 모델에서 확산 디노이징과 자기회귀 디코딩의 반복적인 프로세스로 발생하는 상당한 계산 오버헤드를 해결하는 것이 주 목표입니다. Hyper-Bagel이라는 통합 가속 프레임워크를 제안하여 멀티모달 이해 및 생성 작업을...","categories": ["Review"],
        "tags": ["Review","Multimodal AI","Acceleration Framework","Speculative Decoding","Diffusion Distillation","Unified Models","Text-to-Image Generation","Image Editing","Computational Efficiency"],
        "url": "/ai/review/2025-9-24-Hyper-Bagel_A_Unified_Acceleration_Framework_for_Multimodal_Understanding_and_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Large Language Models Discriminate Against Speakers of German Dialects",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Minh Duc Bui, Carolin Holtermann, Valentin Hofmann, Anne Lauscher, Katharina von der Wense 핵심 연구 목표 본 논문은 대규모 언어 모델(LLMs)이 독일 방언 사용자에 대한 사회적 고정관념을 반영하고 강화하는지 탐구하는 것을 목표로 합니다. 특히, 독일 인구의 40% 이상이 지역 방언을 사용하는 상황에서, LLM의 편향이...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Bias","German Dialects","Sociolinguistics","Stereotypes","Implicit Association Test","Decision Making"],
        "url": "/ai/review/2025-9-24-Large_Language_Models_Discriminate_Against_Speakers_of_German_Dialects/",
        "teaser": null
      },{
        "title": "[논문리뷰] Lyra: Generative 3D Scene Reconstruction via Video Diffusion Model Self-Distillation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Sherwin Bahmani, Tianchang Shen, Jiawei Ren, Jiahui Huang, Yifeng Jiang, Haithem Turki, Andrea Tagliasacchi, David B. Lindell, Zan Gojcic, Sanja Fidler, Huan Ling, Jun Gao, Xuanchi Ren 핵심 연구 목표 본 논문의 핵심 목표는 실세계 다중 뷰 데이터 없이 단일 이미지 또는 비디오 입력으로부터...","categories": ["Review"],
        "tags": ["Review","Generative AI","3D Scene Reconstruction","Video Diffusion Models","Self-Distillation","3D Gaussian Splatting","Dynamic 4D Generation","Monocular Input"],
        "url": "/ai/review/2025-9-24-Lyra_Generative_3D_Scene_Reconstruction_via_Video_Diffusion_Model_Self-Distillation/",
        "teaser": null
      },{
        "title": "[논문리뷰] MAPO: Mixed Advantage Policy Optimization",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wenke Huang, Quan Zhang, Yiyang Fang, Jian Liang, Xuankun Rong, et al. 핵심 연구 목표 본 연구는 파운데이션 모델의 추론 성능 향상을 위한 기존 강화 학습(RL) 방법론, 특히 Group Relative Policy Optimization (GRPO)이 겪는 “advantage reversion” 및 “advantage mirror” 문제 해결을 목표로 합니다. 이러한...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Foundation Models","Policy Optimization","Advantage Function","Trajectory Certainty","Multimodal Reasoning","GRPO"],
        "url": "/ai/review/2025-9-24-MAPO_Mixed_Advantage_Policy_Optimization/",
        "teaser": null
      },{
        "title": "[논문리뷰] MiniCPM-V 4.5: Cooking Efficient MLLMs via Architecture, Data, and Training Recipe",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Tianyu Yu, Zefan Wang, Chongyi Wang, Fuwei Huang, Wenshuo Ma, et al. 핵심 연구 목표 본 논문은 급속히 발전하는 Multimodal Large Language Models (MLLMs)의 고질적인 훈련 및 추론 효율성 문제를 해결하는 것을 목표로 합니다. 특히, 시각 토큰 수 증가로 인한 연산 오버헤드, 문서 지식...","categories": ["Review"],
        "tags": ["Review","MLLM Efficiency","Multimodal Transformer","3D-Resampler","Document AI","Hybrid Reinforcement Learning","Video Understanding","Efficient Inference"],
        "url": "/ai/review/2025-9-24-MiniCPM-V_4.5_Cooking_Efficient_MLLMs_via_Architecture_Data_and_Training_Recipe/",
        "teaser": null
      },{
        "title": "[논문리뷰] OpenGVL - Benchmarking Visual Temporal Progress for Data Curation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Paweł Budzianowski, Emilia Wiśnios, Gracjan Góral, Igor Kulakov, Viktor Petrenko, Krzysztof Walas 핵심 연구 목표 로봇 공학 분야의 데이터 부족 문제를 해결하고, 대규모 로봇 데이터셋을 자동으로 주석 및 큐레이션할 수 있는 도구의 필요성을 강조합니다. 이를 위해 시각적 관측을 통한 로봇 작업 진행도 예측을 위한...","categories": ["Review"],
        "tags": ["Review","Robotics Data Curation","Visual Temporal Progress","Generative Value Learning (GVL)","Vision-Language Models (VLMs)","Benchmark","Task Progress Prediction","Value-Order Correlation (VOC)"],
        "url": "/ai/review/2025-9-24-OpenGVL_-_Benchmarking_Visual_Temporal_Progress_for_Data_Curation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Reinforcement Learning on Pre-Training Data",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Siheng Li, Kejiao Li, Zenan Xu, Guanhua Huang, Evander Yang 핵심 연구 목표 논문은 대규모 언어 모델(LLM)의 훈련 시 발생하는 컴퓨팅 자원의 기하급수적 증가와 고품질 텍스트 데이터의 유한한 성장 사이의 불균형 문제를 해결하고자 합니다. 인간의 어노테이션에 의존하지 않고 사전 훈련 데이터에서 직접 보상 신호를...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Pre-training","Large Language Models","Self-supervised Learning","Scaling Laws","Next-segment Reasoning","Reward Modeling"],
        "url": "/ai/review/2025-9-24-Reinforcement_Learning_on_Pre-Training_Data/",
        "teaser": null
      },{
        "title": "[논문리뷰] VIR-Bench: Evaluating Geospatial and Temporal Understanding of MLLMs via Travel Video Itinerary Reconstruction",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hao Wang, Eiki Murata, Lingfang Zhang, Ayako Sato, So Fukuda, Ziqi Yin, Wentao Hu, Keisuke Nakao, Yusuke Nakamura, Sebastian Zwirner, Yi-Chia Chen, Hiroyuki Otomo, Hiroki Ouchi, Daisuke Kawahara 핵심 연구 목표 본 연구는 기존 비디오 벤치마크들이 장거리 이동 및 다일(multi-day) 활동과 같은 거시적 규모의...","categories": ["Review"],
        "tags": ["Review","Multimodal LLMs","Video Understanding","Geospatial Reasoning","Temporal Reasoning","Travel Itinerary Reconstruction","Benchmark","Agent System","VLOG"],
        "url": "/ai/review/2025-9-24-VIR-Bench_Evaluating_Geospatial_and_Temporal_Understanding_of_MLLMs_via_Travel_Video_Itinerary_Reconstruction/",
        "teaser": null
      },{
        "title": "[논문리뷰] VolSplat: Rethinking Feed-Forward 3D Gaussian Splatting with Voxel-Aligned Prediction",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Weijie Wang, Yeqing Chen, Zeyu Zhang, Hengyu Liu, Haoxiao Wang, Zhiyuan Feng, Wenkang Qin, Zheng Zhu, Donny Y. Chen, Bohan Zhuang 핵심 연구 목표 기존 Feed-Forward 3D Gaussian Splatting (3DGS) 방식의 문제점인 픽셀 정렬(pixel alignment) 의존성, 뷰 편향된 밀도 분포, 그리고 정렬 오류를 해결하는...","categories": ["Review"],
        "tags": ["Review","3D Gaussian Splatting","Novel View Synthesis","Voxel-Aligned Prediction","Feed-Forward Reconstruction","Multi-View Consistency","Scene Representation","Computer Vision"],
        "url": "/ai/review/2025-9-24-VolSplat_Rethinking_Feed-Forward_3D_Gaussian_Splatting_with_Voxel-Aligned_Prediction/",
        "teaser": null
      },{
        "title": "[논문리뷰] What Characterizes Effective Reasoning? Revisiting Length, Review, and Structure of CoT",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yunzhen Feng, Julia Kempe, Cheng Zhang, Parag Jain, Anthony Hartshorn 핵심 연구 목표 본 논문은 대규모 추론 모델(LRMs)에서 효과적인 CoT(Chain-of-Thought) 추론의 특성을 규명하는 것을 목표로 합니다. 특히, 기존의 “길수록 좋다”는 CoT 길이 및 검토(review) 증가 경향에 의문을 제기하고, 추론 과정의 어휘적, 구조적 특성이 정확도에...","categories": ["Review"],
        "tags": ["Review","Chain-of-Thought","Reasoning Effectiveness","Large Reasoning Models","Failed-Step Fraction","Test-time Scaling","Reasoning Graph","Model Evaluation"],
        "url": "/ai/review/2025-9-24-What_Characterizes_Effective_Reasoning_Revisiting_Length_Review_and_Structure_of_CoT/",
        "teaser": null
      },{
        "title": "[논문리뷰] Zero-Shot Multi-Spectral Learning: Reimagining a Generalist Multimodal Gemini 2.5 Model for Remote Sensing Applications",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Genady Beryozkin, Maxim Neumann, Dahun Kim, Yotam Gigi, Ganesh Mallya, Tomer Shekel, Anelia Angelova 핵심 연구 목표 본 논문은 RGB 전용 이미지로 훈련된 범용 대규모 멀티모달 모델(LMM)이 원격 감지 분야에서 널리 사용되는 다중 스펙트럼(multi-spectral) 입력을 추가 훈련 없이 Zero-Shot 방식으로 이해하고 활용할 수 있도록...","categories": ["Review"],
        "tags": ["Review","Remote Sensing","Zero-Shot Learning","Multimodal Models","Multi-spectral Imagery","Gemini 2.5","Prompt Engineering","Land Cover Classification","Pseudo-Image"],
        "url": "/ai/review/2025-9-24-Zero-Shot_Multi-Spectral_Learning_Reimagining_a_Generalist_Multimodal_Gemini_2.5_Model_for_Remote_Sensing_Applications/",
        "teaser": null
      },{
        "title": "[논문리뷰] Advancing Speech Understanding in Speech-Aware Language Models with GRPO",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Avishai Elmakies*, Hagai Aronowitz, Nimrod Shabtay, Eli Schwartz, Ron Hoory, Avihu Dekel 핵심 연구 목표 본 논문은 GRPO (Group Relative Policy Optimization) 기반의 방법을 도입하여 Speech-Aware Large Language Models (SALLMs)의 개방형 음성 이해 능력을 향상시키는 것을 목표로 합니다. 특히, Spoken Question Answering (SQA) 및...","categories": ["Review"],
        "tags": ["Review","Speech-Aware Language Models","SALLMs","GRPO","Reinforcement Learning","Speech Understanding","Spoken Question Answering","Automatic Speech Translation","BLEU Metric"],
        "url": "/ai/review/2025-9-25-Advancing_Speech_Understanding_in_Speech-Aware_Language_Models_with_GRPO/",
        "teaser": null
      },{
        "title": "[논문리뷰] EditVerse: Unifying Image and Video Editing and Generation with In-Context Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xuan Ju, Tianyu Wang, Yuqian Zhou, He Zhang, Qing Liu, Nanxuan Zhao, Zhifei Zhang, Yijun Li, Yuanhao Cai, Shaoteng Liu, Daniil Pakhomov, Zhe Lin, Soo Ye Kim, Qiang Xu 핵심 연구 목표 이 논문은 이미지 및 비디오 생성과 편집 작업이 아키텍처적 한계와 데이터 부족으로...","categories": ["Review"],
        "tags": ["Review","Unified Multimodal Model","In-Context Learning","Image and Video Editing","Video Generation","Full Self-Attention","Rotary Positional Embedding","Cross-Modal Knowledge Transfer"],
        "url": "/ai/review/2025-9-25-EditVerse_Unifying_Image_and_Video_Editing_and_Generation_with_In-Context_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] EmbeddingGemma: Powerful and Lightweight Text Representations",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Marksherwood, osanseviero, ssmoot, SindhuRaghuram97, hschechter 및 EmbeddingGemma 팀 핵심 연구 목표 이 연구의 주요 목표는 강력하면서도 경량화된 오픈 소스 텍스트 임베딩 모델인 EmbeddingGemma를 개발하는 것입니다. 특히, 500M 미만의 파라미터로 다양한 언어, 도메인, 태스크에서 최고 수준의 성능을 달성하여, 저지연, 고처리량, 온디바이스 배포와 같은 실용적인 AI...","categories": ["Review"],
        "tags": ["Review","Text Embeddings","Lightweight Models","Encoder-Decoder","Knowledge Distillation","Model Souping","Quantization","Multilingual","Gemma"],
        "url": "/ai/review/2025-9-25-EmbeddingGemma_Powerful_and_Lightweight_Text_Representations/",
        "teaser": null
      },{
        "title": "[논문리뷰] LLMs4All: A Review on Large Language Models for Research and Applications in Academic Disciplines",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yanfang (Fanny) Ye, Zheyuan Zhang, Tianyi Ma, et al. (교신저자: Yanfang (Fanny) Ye, Brett Savoie, Daniel Slate, Nitesh Chawla) 핵심 연구 목표 이 논문은 최첨단 거대 언어 모델(LLM)과 이들이 다양한 학문 분야(인문학, 법률, 경제, 경영, 과학, 공학)에 통합되는 현황을 종합적으로 검토하는 것을 목표로 합니다....","categories": ["Review"],
        "tags": ["Review","Large Language Models","Generative AI","Academic Disciplines","LLM Applications","Review","Cross-disciplinary Research","Benchmarks"],
        "url": "/ai/review/2025-9-25-LLMs4All_A_Review_on_Large_Language_Models_for_Research_and_Applications_in_Academic_Disciplines/",
        "teaser": null
      },{
        "title": "[논문리뷰] Lavida-O: Elastic Large Masked Diffusion Models for Unified Multimodal Understanding and Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shufan Li, Jiuxiang Gu, Kangning Liu, Zhe Lin, Zijun Wei, Aditya Grover, Jason Kuen 핵심 연구 목표 본 논문은 기존 멀티모달 Masked Diffusion Model (MDM)의 한계를 극복하고, 이미지 이해, 객체 접지, 이미지 편집, 고해상도(1024px) 텍스트-투-이미지 생성 등 광범위한 멀티모달 태스크를 단일 프레임워크 내에서 처리할...","categories": ["Review"],
        "tags": ["Review","Multimodal AI","Masked Diffusion Models","Image Understanding","Image Generation","Image Editing","Object Grounding","ElasticMoT","Self-reflection"],
        "url": "/ai/review/2025-9-25-Lavida-O_Elastic_Large_Masked_Diffusion_Models_for_Unified_Multimodal_Understanding_and_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] Logics-Parsing Technical Report",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xiangyang Chen, Shuzhao Li, Xiuwen Zhu, Yongfan Chen, Fan Yang, Cheng Fang, Lin Qu, Xiaoxiao Xu, Hu Wei, Minggang Wu 핵심 연구 목표 본 논문은 기존 LVLM이 복잡한 문서 레이아웃 및 읽기 순서 처리에서 겪는 한계를 극복하고, 이를 위해 강화 학습(Reinforcement Learning)을 통해 고도화된...","categories": ["Review"],
        "tags": ["Review","Document Parsing","Large Vision-Language Models (LVLM)","Reinforcement Learning (RL)","Layout Analysis","Reading Order","Supervised Fine-Tuning (SFT)","HTML Annotation","Benchmarking"],
        "url": "/ai/review/2025-9-25-Logics-Parsing_Technical_Report/",
        "teaser": null
      },{
        "title": "[논문리뷰] On the Use of Agentic Coding: An Empirical Study of Pull Requests on GitHub",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Miku Watanabe, Hao Li, Yutaro Kashiwa, Brittany Reid, Hajimu Iida, Ahmed E. Hassan 핵심 연구 목표 이 논문은 자율형 AI 에이전트(Claude Code)가 생성한 GitHub Pull Request(PR)의 실질적인 유용성과 수용도를 실증적으로 조사하는 것을 목표로 합니다. AI 에이전트가 생성한 PR(Agentic-PRs)이 인간이 생성한 PR(Human-PRs)과 변경 규모 및...","categories": ["Review"],
        "tags": ["Review","Agentic Coding","AI Agents","Large Language Models","GitHub Pull Requests","Software Engineering","Empirical Study","Code Generation","Software Development"],
        "url": "/ai/review/2025-9-25-On_the_Use_of_Agentic_Coding_An_Empirical_Study_of_Pull_Requests_on_GitHub/",
        "teaser": null
      },{
        "title": "[논문리뷰] PhysCtrl: Generative Physics for Controllable and Physics-Grounded Video Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Chen Wang, Chuhao Chen, Yiming Huang, Zhiyang Dou, Yuan Liu, Jiatao Gu, Lingjie Liu 핵심 연구 목표 기존 비디오 생성 모델들이 겪는 물리적 현실성 부족과 3D 제어의 한계를 극복하는 것을 목표로 합니다. 논문은 물리적 매개변수와 외부 힘을 명시적으로 제어하여 물리 기반(physics-grounded) 이미지-투-비디오 생성을 가능하게...","categories": ["Review"],
        "tags": ["Review","Video Generation","Physics-Grounded","Controllable Generation","Diffusion Models","Point Cloud Trajectories","Material Simulation","Generative Physics"],
        "url": "/ai/review/2025-9-25-PhysCtrl_Generative_Physics_for_Controllable_and_Physics-Grounded_Video_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] SIM-CoT: Supervised Implicit Chain-of-Thought",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Xilin Wei, Xiaoran Liu, Yuhang Zang, Xiaoyi Dong, Yuhang Cao, Jiaqi Wang, Xipeng Qiu, Dahua Lin. 핵심 연구 목표 Implicit Chain-of-Thought (CoT) 모델은 토큰 효율성에도 불구하고, 명시적 CoT 대비 지속적인 성능 격차와 핵심적인 “잠재 불안정성(latent instability)” 문제에 직면해 있습니다. 이 문제는 암시적 토큰 수를...","categories": ["Review"],
        "tags": ["Review","Implicit Reasoning","Chain-of-Thought","LLM","Latent Space","Supervised Learning","Model Stability","Interpretability"],
        "url": "/ai/review/2025-9-25-SIM-CoT_Supervised_Implicit_Chain-of-Thought/",
        "teaser": null
      },{
        "title": "[논문리뷰] Video models are zero-shot learners and reasoners",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Thaddäus Wiedemer, Yuxuan Li, Paul Vicol, Shixiang Shane Gu, Nick Matarese, Kevin Swersky, Been Kim, Priyank Jaini, Robert Geirhos 핵심 연구 목표 본 논문은 비디오 모델이 대규모 언어 모델(LLM)이 언어 이해 분야에서 이룬 것과 같이, 일반적인 목적의 비전 파운데이션 모델이 될 수 있다는 가설을...","categories": ["Review"],
        "tags": ["Review","Video Models","Zero-shot Learning","Visual Reasoning","Foundation Models","Generative AI","Perception","Manipulation","Modeling"],
        "url": "/ai/review/2025-9-25-Video_models_are_zero-shot_learners_and_reasoners/",
        "teaser": null
      },{
        "title": "[논문리뷰] AutoIntent: AutoML for Text Classification",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Alekseev Ilya, Solomatin Roman, Rustamova Darina, Kuznetsov Denis 핵심 연구 목표 본 논문은 기존 AutoML 프레임워크가 임베딩 모델 선택, 다중 레이블 분류, OOS(Out-of-Scope) 감지, 퓨샷(Few-shot) 학습과 같은 NLP 특정 과제를 포괄적으로 지원하지 못하는 한계를 해결하고자 합니다. AutoIntent는 이러한 NLP 관련 과제를 포함한 텍스트 분류...","categories": ["Review"],
        "tags": ["Review","AutoML","Text Classification","Intent Classification","Transformer Embeddings","Out-of-Scope Detection","Multi-label Classification","Few-shot Learning","Sklearn-like Interface"],
        "url": "/ai/review/2025-9-26-AutoIntent_AutoML_for_Text_Classification/",
        "teaser": null
      },{
        "title": "[논문리뷰] BESPOKE: Benchmark for Search-Augmented Large Language Model Personalization via Diagnostic Feedback",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hyunseo Kim, Sangam Lee, Kwangwook Seo, Dongha Lee 핵심 연구 목표 본 논문은 검색 증강 대규모 언어 모델(LLMs)의 개인화 능력 평가에 대한 체계적인 벤치마크 부재 문제를 해결하고자 합니다. 사용자의 다양한 정보 요구와 선호하는 전달 방식을 LLM이 얼마나 효과적으로 반영하는지 진단하고 평가하기 위한 사실적이고 진단적인...","categories": ["Review"],
        "tags": ["Review","Search-Augmented LLMs","Personalization","Benchmark","Diagnostic Feedback","User History","Evaluation Framework","RAG"],
        "url": "/ai/review/2025-9-26-BESPOKE_Benchmark_for_Search-Augmented_Large_Language_Model_Personalization_via_Diagnostic_Feedback/",
        "teaser": null
      },{
        "title": "[논문리뷰] Behind RoPE: How Does Causal Mask Encode Positional Information?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Junu Kim, Xiao Liu, Zhenghao Lin, Lei Ji, Yeyun Gong, Edward Choi 핵심 연구 목표 본 논문은 Transformer 디코더에서 Rotary Positional Embeddings (RoPE)와 같은 명시적인 위치 인코딩 외에 인과 마스크(causal mask)가 어떻게 위치 정보를 인코딩하는지 그 메커니즘을 규명하는 것을 목표로 합니다. 특히, 인과 마스크가...","categories": ["Review"],
        "tags": ["Review","Transformer Decoder","Causal Mask","Positional Encoding","RoPE","Attention Mechanism","Length Generalization","Large Language Models"],
        "url": "/ai/review/2025-9-26-Behind_RoPE_How_Does_Causal_Mask_Encode_Positional_Information/",
        "teaser": null
      },{
        "title": "[논문리뷰] Blueprints of Trust: AI System Cards for End to End Transparency and Governance",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Huzaifa Sidhpurwala, Emily Fox, Garth Mollett, Florencio Cano Gabarda, Roman Zhukov 핵심 연구 목표 본 논문은 AI 시스템의 개발 및 배포 과정에서 투명성과 책임성을 강화하기 위한 새로운 프레임워크인 Hazard-Aware System Card (HASC)를 소개합니다. 기존 모델 카드 및 시스템 카드 개념을 확장하여 AI 시스템의 보안...","categories": ["Review"],
        "tags": ["Review","AI Governance","Transparency","AI System Card","Hazard-Aware System Card","Data Provenance","AI Safety","AI Risk Management","ISO/IEC 42001"],
        "url": "/ai/review/2025-9-26-Blueprints_of_Trust_AI_System_Cards_for_End_to_End_Transparency_and_Governance/",
        "teaser": null
      },{
        "title": "[논문리뷰] CE-GPPO: Controlling Entropy via Gradient-Preserving Clipping Policy Optimization in Reinforcement Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Zhenpeng Su, Leiyu Pan, Minxuan Lv, Yuntao Li, Wenping Hu, Fuzheng Zhang, Kun Gai, Guorui Zhou 핵심 연구 목표 본 논문은 LLM (Large Language Model)을 위한 강화 학습(RL) 과정에서 정책 엔트로피(policy entropy)의 불안정성을 해결하는 것을 목표로 합니다. 특히, 기존의 PPO (Proximal Policy Optimization) 및...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Large Language Models","Policy Optimization","PPO","Entropy Control","Gradient Clipping","Exploration-Exploitation"],
        "url": "/ai/review/2025-9-26-CE-GPPO_Controlling_Entropy_via_Gradient-Preserving_Clipping_Policy_Optimization_in_Reinforcement_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] CHARM: Control-point-based 3D Anime Hairstyle Auto-Regressive Modeling",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuze He, Yanning Zhou, Wang Zhao, Jingwen Ye, Yushi Bai, Kaiwen Xiao, Yong-Jin Liu, Zhongqian Sun, and Wei Yang 핵심 연구 목표 본 연구는 기존 사실적인 헤어 모델링 기법으로는 다루기 어려운, 고도로 양식화된 3D 애니메이션 헤어스타일의 효율적인 모델링 및 생성 문제를 해결하고자 합니다. 특히,...","categories": ["Review"],
        "tags": ["Review","3D Anime Hairstyle","Autoregressive Modeling","Control Points","Parametric Representation","Transformer","Generative AI","Dataset (AnimeHair)","Computer Graphics"],
        "url": "/ai/review/2025-9-26-CHARM_Control-point-based_3D_Anime_Hairstyle_Auto-Regressive_Modeling/",
        "teaser": null
      },{
        "title": "[논문리뷰] Discrete Diffusion for Reflective Vision-Language-Action Models in Autonomous Driving",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Pengxiang Li, Yinan Zheng, Yue Wang, Huimin Wang, Hang Zhao, Jingjing Liu, Xianyuan Zhan, Kun Zhan, Xianpeng Lang 핵심 연구 목표 본 논문은 자율주행 시스템에서 기존 모방 학습 기반 VLA(Vision-Language-Action) 모델이 물리적 규칙 및 안전 제약 조건을 내재적으로 인코딩하는 데 어려움을 겪는 문제를 해결하고자...","categories": ["Review"],
        "tags": ["Review","Autonomous Driving","Vision-Language-Action Models","Discrete Diffusion","Reflection Mechanism","Trajectory Generation","Safety Constraints","Imitation Learning"],
        "url": "/ai/review/2025-9-26-Discrete_Diffusion_for_Reflective_Vision-Language-Action_Models_in_Autonomous_Driving/",
        "teaser": null
      },{
        "title": "[논문리뷰] Does FLUX Already Know How to Perform Physically Plausible Image Composition?",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Shilin Lu, Zhuming Lian, Zihan Zhou, Shaocong Zhang, Chen Zhao, Adams Wai-Kin Kong 핵심 연구 목표 본 연구는 복잡한 조명, 그림자, 물 반사 등 물리적으로 사실적인 이미지 합성을 사전 훈련된 텍스트-투-이미지(T2I) 확산 모델을 활용하여 훈련 없이 수행하는 것을 목표로 합니다. 기존 모델들이 가진 객체...","categories": ["Review"],
        "tags": ["Review","Image Composition","Diffusion Models","Training-Free","Physically Plausible","FLUX","Adapter","Guidance","Benchmark"],
        "url": "/ai/review/2025-9-26-Does_FLUX_Already_Know_How_to_Perform_Physically_Plausible_Image_Composition/",
        "teaser": null
      },{
        "title": "[논문리뷰] Hunyuan3D-Omni: A Unified Framework for Controllable Generation of 3D Assets",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Bowen Zhang, Chunchao Guo, Haolin Liu, Hongyu Yan, Huiwen Shi, Jingwei Huang, Junlin Yu, Kunhong Li, Linus, Penghao Wang, Qingxiang Lin, Sicong Liu, Xianghui Yang, Yixuan Tang, Yunfei Zhao, Zeqiang Lai, Zhihao Liang, Zibo Zhao 핵심 연구 목표 기존 3D 생성 모델이 이미지 또는...","categories": ["Review"],
        "tags": ["Review","3D Generation","Controllable Generation","Multi-modal Conditioning","Diffusion Models","Point Clouds","Voxels","Bounding Boxes","Skeletons","Hunyuan3D"],
        "url": "/ai/review/2025-9-26-Hunyuan3D-Omni_A_Unified_Framework_for_Controllable_Generation_of_3D_Assets/",
        "teaser": null
      },{
        "title": "[논문리뷰] Interactive Recommendation Agent with Active User Commands",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiakai Tang, Yujie Luo, Xunke Xi, Fei Sun, Xueyang Feng, Sunhao Dai, Chao Yi, Dian Chen, Zhujin Gao, Yang Li, Xu Chen, Wen Chen, Jian Wu, Yuning Jiang, Bo Zheng 핵심 연구 목표 본 논문은 기존 추천 시스템의 수동적 피드백 메커니즘이 사용자의 미묘한 의도와...","categories": ["Review"],
        "tags": ["Review","Interactive Recommendation","Large Language Models","Multi-Agent System","Natural Language Processing","Knowledge Distillation","User Control"],
        "url": "/ai/review/2025-9-26-Interactive_Recommendation_Agent_with_Active_User_Commands/",
        "teaser": null
      },{
        "title": "[논문리뷰] MI-Fuse: Label Fusion for Unsupervised Domain Adaptation with Closed-Source Large-Audio Language Model",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hsiao-Ying Huang, Yi-Cheng Lin, Hung-yi Lee 핵심 연구 목표 논문은 소스 도메인 데이터가 없고, 강력한 LALM(Large Audio-Language Model)이 API를 통해서만 접근 가능한 현실적인 SFUDA(Source-Free Unsupervised Domain Adaptation) 시나리오를 해결하는 것을 목표로 합니다. 구체적으로, 레이블 없는 타겟 도메인 오디오와 API 전용 LALM만으로 SER(Speech Emotion Recognition)을...","categories": ["Review"],
        "tags": ["Review","Speech Emotion Recognition","Source-Free Unsupervised Domain Adaptation","Large Audio-Language Models","Label Fusion","Mutual Information","API-Only Models","Domain Mismatch"],
        "url": "/ai/review/2025-9-26-MI-Fuse_Label_Fusion_for_Unsupervised_Domain_Adaptation_with_Closed-Source_Large-Audio_Language_Model/",
        "teaser": null
      },{
        "title": "[논문리뷰] MMR1: Enhancing Multimodal Reasoning with Variance-Aware Sampling and Open Resources",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Sicong Leng, Jing Wang, Jiaxi Li, Hao Zhang, Boqiang Zhang, Yuming Jiang, Hang Zhang, Xin Li, Zhiqiang Hu, Lidong Bing, Deli Zhao, Wei Lu, Yu Rong, Aixin Sun, Shijian Lu 핵심 연구 목표 본 논문은 대규모 multimodal 추론 모델의 발전을 저해하는 두 가지 주요...","categories": ["Review"],
        "tags": ["Review","Multimodal Reasoning","Reinforcement Learning","Variance-Aware Sampling","Gradient Vanishing","Data Curation","Chain-of-Thought","GRPO"],
        "url": "/ai/review/2025-9-26-MMR1_Enhancing_Multimodal_Reasoning_with_Variance-Aware_Sampling_and_Open_Resources/",
        "teaser": null
      },{
        "title": "[논문리뷰] MOSS-ChatV: Reinforcement Learning with Process Reasoning Reward for Video Temporal Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Sicheng Tao, Jungang Li, Yibo Yan, Junyan Zhang, Yubo Gao, Hanqian Li, ShuHang Xun, Yuxuan Fan, Hong Chen, Jianxiang He, Xuming Hu 핵심 연구 목표 비디오 기반 MLLM(Multimodal Large Language Models)에서 발생하는 프로세스 불일치(process inconsistency) 문제를 해결하여, 모델이 올바른 최종 답변을 도출하더라도 중간 추론...","categories": ["Review"],
        "tags": ["Review","Video Temporal Reasoning","Reinforcement Learning","Process Supervision","Dynamic Time Warping","Multimodal Large Language Models","Video State Prediction","Reward Hacking"],
        "url": "/ai/review/2025-9-26-MOSS-ChatV_Reinforcement_Learning_with_Process_Reasoning_Reward_for_Video_Temporal_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] Quantized Visual Geometry Grounded Transformer",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Weilun Feng, Haotong Qin, Mingqiang Wu, Chuanguang Yang, Yuqi Li, Xiangqi Li, Zhulin An, Libo Huang, Yulun Zhang, Michele Magno, Yongjun Xu 핵심 연구 목표 대규모 Visual Geometry Grounded Transformers (VGGTs) 모델의 과도한 연산 및 메모리 비용 문제를 해결하고, 실세계 배포를 위한 효율적인 저비트...","categories": ["Review"],
        "tags": ["Review","Quantization","Post-Training Quantization","3D Reconstruction","Visual Transformer","Model Compression","Efficient Inference","Hadamard Rotation","Calibration Sampling"],
        "url": "/ai/review/2025-9-26-Quantized_Visual_Geometry_Grounded_Transformer/",
        "teaser": null
      },{
        "title": "[논문리뷰] Recon-Act: A Self-Evolving Multi-Agent Browser-Use System via Web Reconnaissance, Tool Generation, and Task Execution",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Kaiwen He, Zhiwei Wang, Chenyi Zhuang, Jinjie Gu 핵심 연구 목표 본 논문은 실세계 웹 페이지에서 멀티턴, 장기적 궤적(long-horizon trajectories)을 따르는 작업 수행 시 기존 브라우저 에이전트의 행동 시퀀싱 혼란과 과도한 시행착오 문제를 해결하는 것을 목표로 합니다. 이를 위해 웹 정찰, 도구 생성 및...","categories": ["Review"],
        "tags": ["Review","Multi-Agent System","Browser Automation","Web Reconnaissance","Tool Generation","Task Execution","Self-Evolving AI","LLM/VLM","VisualWebArena"],
        "url": "/ai/review/2025-9-26-Recon-Act_A_Self-Evolving_Multi-Agent_Browser-Use_System_via_Web_Reconnaissance_Tool_Generation_and_Task_Execution/",
        "teaser": null
      },{
        "title": "[논문리뷰] Residual Off-Policy RL for Finetuning Behavior Cloning Policies",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Lars Ankile, Zhenyu Jiang, Rocky Duan, Guanya Shi, Pieter Abbeel, Anusha Nagabandi 핵심 연구 목표 본 논문은 행동 복제(BC) 기반 정책의 한계(데이터 품질, 수동 데이터 수집, 성능 포화)와 실제 로봇에서의 직접적인 강화 학습(RL)의 어려움(샘플 비효율성, 안전성, 희소 보상)을 해결하는 것을 목표로 합니다. 특히, 고자유도(High-DoF)...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning (RL)","Behavior Cloning (BC)","Residual Learning","Off-Policy RL","Robot Manipulation","Real-World Robotics","High-DoF Systems","Sample Efficiency"],
        "url": "/ai/review/2025-9-26-Residual_Off-Policy_RL_for_Finetuning_Behavior_Cloning_Policies/",
        "teaser": null
      },{
        "title": "[논문리뷰] SD3.5-Flash: Distribution-Guided Distillation of Generative Flows",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Hmrishav Bandyopadhyay, Reshinth Adithyan, Rahim Entezari, Jim Scott, Yi-Zhe Song, Varun Jampani 핵심 연구 목표 본 논문은 최첨단 생성 모델, 특히 Rectified Flow 모델의 높은 연산 요구량으로 인해 발생하는 접근성 문제를 해결하고자 합니다. 적은 스텝으로도 고품질 이미지를 생성할 수 있는 효율적인 증류(distillation) 프레임워크를 개발하여,...","categories": ["Review"],
        "tags": ["Review","Generative AI","Image Generation","Diffusion Models","Rectified Flow","Model Distillation","Few-Step Generation","Computational Efficiency","Prompt Alignment"],
        "url": "/ai/review/2025-9-26-SD3.5-Flash_Distribution-Guided_Distillation_of_Generative_Flows/",
        "teaser": null
      },{
        "title": "[논문리뷰] ScaleDiff: Scaling Difficult Problems for Advanced Mathematical Reasoning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Qizhi Pei, Zhuoshi Pan, Honglin Lin, Xin Gao, Yu Li, Zinan Tang, Conghui He, Rui Yan, Lijun Wu 핵심 연구 목표 본 논문은 복잡한 추론 능력을 향상시키기 위해 어려운 수학 문제의 생성을 확장하는 효율적인 파이프라인인 ScaleDiff를 제안합니다. 기존의 문제 생성 방식이 높은 비용, 복잡한...","categories": ["Review"],
        "tags": ["Review","Mathematical Reasoning","Large Reasoning Models (LRMs)","Difficulty Scaling","Data Augmentation","Supervised Fine-Tuning (SFT)","Problem Generation","Solution Distillation"],
        "url": "/ai/review/2025-9-26-ScaleDiff_Scaling_Difficult_Problems_for_Advanced_Mathematical_Reasoning/",
        "teaser": null
      },{
        "title": "[논문리뷰] SceneWeaver: All-in-One 3D Scene Synthesis with an Extensible and Self-Reflective Agent",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yandan Yang, Baoxiong Jia, Shujie Zhang, Siyuan Huang 핵심 연구 목표 이 논문은 기존 3D 장면 합성 방법론들이 고정된 카테고리, 부족한 객체 디테일, 물리적 불일치, 복잡한 사용자 지시와의 낮은 정합성 등의 한계를 가지는 문제를 해결하고자 합니다. 시각적으로 사실적이고, 물리적으로 타당하며, 사용자 지시에 정렬된 3D...","categories": ["Review"],
        "tags": ["Review","3D Scene Synthesis","Agentic Framework","LLMs","Self-Reflection","Tool-Use","Physical Plausibility","Iterative Refinement","Embodied AI"],
        "url": "/ai/review/2025-9-26-SceneWeaver_All-in-One_3D_Scene_Synthesis_with_an_Extensible_and_Self-Reflective_Agent/",
        "teaser": null
      },{
        "title": "[논문리뷰] SciReasoner: Laying the Scientific Reasoning Ground Across Disciplines",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yizhou Wang, Chen Tang, Han Deng, Jiabei Xiao, et al. 핵심 연구 목표 이 논문은 이질적인 과학적 표현과 자연어를 통합하여 다양한 과학 분야에 걸친 복잡한 과학적 추론을 수행하는 최초의 과학 추론 대규모 언어 모델(LLM)인 SciReasoner를 제안합니다. 기존의 전문 모델 및 다분야 모델이 가지는 교차...","categories": ["Review"],
        "tags": ["Review","Scientific Reasoning","Foundation Models","Multi-modal Learning","Cross-domain Generalization","Chain-of-Thought","Reinforcement Learning","Scientific Discovery","Molecular Design"],
        "url": "/ai/review/2025-9-26-SciReasoner_Laying_the_Scientific_Reasoning_Ground_Across_Disciplines/",
        "teaser": null
      },{
        "title": "[논문리뷰] Seedream 4.0: Toward Next-generation Multimodal Image Generation",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yunpeng Chen, Team Seedream, Cakeyan, wuwx, wujie10 핵심 연구 목표 본 논문은 텍스트-투-이미지(T2I) 합성, 이미지 편집, 다중 이미지 합성 기능을 단일 프레임워크 내에서 통합하는 효율적이고 고성능의 차세대 멀티모달 이미지 생성 시스템 Seedream 4.0을 개발하는 것을 목표로 합니다. 기존 모델의 확장성 한계를 극복하고, 다양한 창작...","categories": ["Review"],
        "tags": ["Review","Multimodal Image Generation","Diffusion Transformer","VAE","Image Editing","Text-to-Image","Model Acceleration","Human Evaluation"],
        "url": "/ai/review/2025-9-26-Seedream_4.0_Toward_Next-generation_Multimodal_Image_Generation/",
        "teaser": null
      },{
        "title": "[논문리뷰] StyleBench: Evaluating thinking styles in Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Junyu Guo, Shangding Gu, Ming Jin, Costas Spanos, Javad Lavaei 핵심 연구 목표 본 연구는 LLM이 사용하는 추론 전략, 즉 ‘사고 방식’이 모델 아키텍처 및 태스크 유형과 어떻게 상호작용하는지에 대한 이해 부족을 해결하는 것을 목표로 합니다. 다양한 태스크와 모델 전반에 걸쳐 추론 스타일을 체계적으로...","categories": ["Review"],
        "tags": ["Review","Large Language Models","Reasoning Strategies","Prompt Engineering","LLM Evaluation","Benchmark","Thinking Styles","Scaling Laws","Meta-Reasoning"],
        "url": "/ai/review/2025-9-26-StyleBench_Evaluating_thinking_styles_in_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] The Unanticipated Asymmetry Between Perceptual Optimization and Assessment",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Jiabei Zhang, Qi Wang, Siyu Wu, Du Chen, Tianhe Wu 핵심 연구 목표 본 논문은 지각적 최적화(perceptual optimization)를 위한 손실 함수와 이미지 품질 평가(IQA) 지표 간의 상관관계 및 GAN(Generative Adversarial Network) Discriminator의 표현 전이 가능성(transferability)을 체계적으로 분석하여, 이들 역할 사이에 예상치 못한 비대칭성이 존재함을...","categories": ["Review"],
        "tags": ["Review","Perceptual Optimization","Image Quality Assessment (IQA)","Adversarial Training","Discriminators","Super-Resolution","Fidelity Metrics","Deep Learning"],
        "url": "/ai/review/2025-9-26-The_Unanticipated_Asymmetry_Between_Perceptual_Optimization_and_Assessment/",
        "teaser": null
      },{
        "title": "[논문리뷰] Thinking Augmented Pre-training",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Liang Wang, Nan Yang, Shaohan Huang, Li Dong, Furu Wei 핵심 연구 목표 본 논문은 대규모 언어 모델(LLM) 훈련 시 고품질 데이터의 제한된 가용성과 복잡한 추론 토큰 학습의 어려움이라는 문제를 해결하고자 합니다. 사고 궤적(thinking trajectories)으로 기존 텍스트 데이터를 보강하여 LLM 훈련의 데이터 효율성을 대폭...","categories": ["Review"],
        "tags": ["Review","Large Language Models (LLMs)","Pre-training","Data Augmentation","Reasoning","Data Efficiency","Thinking Trajectories"],
        "url": "/ai/review/2025-9-26-Thinking_Augmented_Pre-training/",
        "teaser": null
      },{
        "title": "[논문리뷰] Thinking While Listening: Simple Test Time Scaling For Audio Classification",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Prateek Verma, Mert Pilanci 핵심 연구 목표 본 논문은 오디오 분류 성능 향상을 위해 신경망 모델이 “듣는 동안 생각하는(thinking while listening)” 능력을 갖추도록 하는 프레임워크를 제안합니다. 특히, LLM의 추론 능력에서 영감을 받아 오디오 분류 파이프라인에 추론을 통합하고, 테스트 시간 스케일링을 지원하는 새로운 아키텍처를 설계하여...","categories": ["Review"],
        "tags": ["Review","Audio Classification","Test-Time Scaling","Reasoning Traces","Large Language Models (LLMs)","Transformer Architectures","Zero-shot Reasoning","Computational Efficiency"],
        "url": "/ai/review/2025-9-26-Thinking_While_Listening_Simple_Test_Time_Scaling_For_Audio_Classification/",
        "teaser": null
      },{
        "title": "[논문리뷰] Tree Search for LLM Agent Reinforcement Learning",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yuxiang Ji, Ziyu Ma, Yong Wang, Guanhua Chen, Xiangxiang Chu, Liaoni Wu 핵심 연구 목표 본 논문은 LLM 에이전트의 장기 및 멀티턴 태스크에서 발생하는 희소한 보상(sparse supervision) 문제와 과도한 롤아웃 예산(rollout budget) 소비를 해결하는 것을 목표로 합니다. 제한된 롤아웃 예산 하에서 더 세분화된 학습...","categories": ["Review"],
        "tags": ["Review","LLM Agents","Reinforcement Learning","Tree Search","Policy Optimization","Preference Learning","Sparse Rewards","Multi-turn Tasks"],
        "url": "/ai/review/2025-9-26-Tree_Search_for_LLM_Agent_Reinforcement_Learning/",
        "teaser": null
      },{
        "title": "[논문리뷰] TrustJudge: Inconsistencies of LLM-as-a-Judge and How to Alleviate Them",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Yidong Wang, Yunze Song, Tingyuan Zhu, Xuanwang Zhang, Zhuohao Yu, Hao Chen, Chiyu Song, Qiufeng Wang, Cunxiang Wang, Zhen Wu, Xinyu Dai, Yue Zhang, Wei Ye, Shikun Zhang 핵심 연구 목표 본 논문은 LLM-as-a-judge 평가 프레임워크에서 발생하는 핵심적인 불일치 문제를 해결하는 것을 목표로 합니다....","categories": ["Review"],
        "tags": ["Review","LLM-as-a-Judge","Evaluation Frameworks","Inconsistency Reduction","Probabilistic Scoring","Transitivity","Information Loss","Perplexity","Large Language Models"],
        "url": "/ai/review/2025-9-26-TrustJudge_Inconsistencies_of_LLM-as-a-Judge_and_How_to_Alleviate_Them/",
        "teaser": null
      },{
        "title": "[논문리뷰] Understanding the Thinking Process of Reasoning Models: A Perspective from Schoenfeld's Episode Theory",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Ming Li, Nan Zhang, Chenrui Fan, Hong Jiao, Yanbin Fu, Sydney Peters, Qingshu Xu, Robert Lissitz, Tianyi Zhou 핵심 연구 목표 본 논문은 Large Reasoning Models (LRMs)이 생성하는 Chain-of-Thought (CoT) 추론 과정의 내부 구조와 사고 패턴을 체계적으로 이해하는 데 필요한 프레임워크의 부재 문제를 해결합니다....","categories": ["Review"],
        "tags": ["Review","Large Reasoning Models","Cognitive Science","Schoenfeld's Episode Theory","Math Problem Solving","Chain-of-Thought","Behavioral Analysis","Dataset Annotation"],
        "url": "/ai/review/2025-9-26-Understanding_the_Thinking_Process_of_Reasoning_Models_A_Perspective_from_Schoenfelds_Episode_Theory/",
        "teaser": null
      },{
        "title": "[논문리뷰] V-GameGym: Visual Game Generation for Code Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Wei Zhang, Jack Yang, Renshuai Tao, Lingzheng Chai, Shawn Guo 핵심 연구 목표 본 연구는 코드 대규모 언어 모델(Code LLM)의 알고리즘 문제 해결 능력과 실제 게임 개발의 포괄적인 요구사항 간의 격차를 해소하고자 합니다. 특히, 기존 벤치마크들이 간과했던 플레이 가능성, 시각적 미학, 사용자 참여도와 같은...","categories": ["Review"],
        "tags": ["Review","Code Large Language Models","Visual Game Generation","Benchmark","Pygame","Multimodal Evaluation","Software Engineering","AI-assisted Game Development"],
        "url": "/ai/review/2025-9-26-V-GameGym_Visual_Game_Generation_for_Code_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] VCRL: Variance-based Curriculum Reinforcement Learning for Large Language Models",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Guochao Jiang, Wenfeng Feng, Guofeng Quan, Chuzhan Hao, Yuewei Zhang, Guohua Liu, Hao Wang* 핵심 연구 목표 기존 롤아웃 기반 강화 학습(RL) 방법론이 LLM의 동적인 학습 능력과 샘플 난이도를 효과적으로 매칭하지 못하는 문제를 해결하는 것이 목표입니다. 특히 수학적 추론 태스크에서 LLM의 효율적인 학습을 저해하는...","categories": ["Review"],
        "tags": ["Review","Reinforcement Learning","Curriculum Learning","Large Language Models","Mathematical Reasoning","Variance-based Sampling","Replay Learning","Policy Optimization"],
        "url": "/ai/review/2025-9-26-VCRL_Variance-based_Curriculum_Reinforcement_Learning_for_Large_Language_Models/",
        "teaser": null
      },{
        "title": "[논문리뷰] When Judgment Becomes Noise: How Design Failures in LLM Judge Benchmarks Silently Undermine Validity",
        "excerpt":"링크: 논문 PDF로 바로 열기 저자: Benjamin Feuer, Chiung-Yi Tseng, Astitwa Sarthak Lathe, Oussama Elachqar, John P Dickerson 핵심 연구 목표 본 논문은 LLM Judge 벤치마크 설계에서 발생하는 근본적인 결함이 평가 유효성을 침묵적으로 저해하는 문제를 다룹니다. 특히, 명확한 목표와 검증 가능한 구성 없이 고신뢰도처럼 보이는 랭킹이 실제로는 대부분 노이즈일 수...","categories": ["Review"],
        "tags": ["Review","LLM Judge","Benchmark Evaluation","Validity","Reliability","Psychometrics","Factor Analysis","Schema Adherence","ELO Ranking"],
        "url": "/ai/review/2025-9-26-When_Judgment_Becomes_Noise_How_Design_Failures_in_LLM_Judge_Benchmarks_Silently_Undermine_Validity/",
        "teaser": null
      },{
        "title": "[Active] PEP 1 - PEP Purpose and Guidelines",
        "excerpt":"원문 링크: PEP 1 - PEP Purpose and Guidelines 상태: Active 유형: Process 작성일: 13-Jun-2000 PEP란 무엇인가요? PEP는 Python Enhancement Proposal의 약자입니다. PEP는 Python 커뮤니티에 정보를 제공하거나, Python 또는 그 프로세스 및 환경을 위한 새로운 기능을 설명하는 디자인 문서입니다. PEP는 기능에 대한 간결한 기술 사양과 해당 기능의 도입 배경을 제공해야...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/1/",
        "teaser": null
      },{
        "title": "[Active] PEP 2 - Procedure for Adding New Modules",
        "excerpt":"원문 링크: PEP 2 - Procedure for Adding New Modules 상태: Active 유형: Process 작성일: 07-Jul-2001 PEP 2 – 새 모듈 추가 절차 개요 이 문서는 Python 표준 라이브러리에 새 모듈을 추가하는 절차에 대해 설명합니다. Python의 성공에 크게 기여하는 표준 라이브러리의 유용성을 유지하고, 추가되는 각 모듈에 대한 지속적인 유지보수 비용과...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/2/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 3 - Guidelines for Handling Bug Reports",
        "excerpt":"원문 링크: PEP 3 - Guidelines for Handling Bug Reports 상태: Withdrawn 유형: Process 작성일: 25-Sep-2000 PEP 3 – 버그 보고서 처리 지침 (Withdraw) 상태: 철회됨 (Withdrawn) 유형: 프로세스 (Process) 작성자: Jeremy Hylton **생성일:** 2000년 9월 25일 중요 공지: 이 PEP는 철회되었습니다. 이 PEP는 Python 버그 트래커에서 버그 보고서를 처리하기...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3/",
        "teaser": null
      },{
        "title": "[Active] PEP 4 - Deprecation of Standard Modules",
        "excerpt":"원문 링크: PEP 4 - Deprecation of Standard Modules 상태: Active 유형: Process 작성일: 01-Oct-2000 PEP 4 – 표준 모듈의 Deprecation (폐기 예정) PEP 4 – 표준 모듈의 Deprecation 작성자: Brett Cannon , Martin von Löwis **상태:** Active (활성) **유형:** Process (프로세스) **생성일:** 2000년 10월 1일 **이력:** (내용 없음) 서론...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/4/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 5 - Guidelines for Language Evolution",
        "excerpt":"원문 링크: PEP 5 - Guidelines for Language Evolution 상태: Superseded 유형: Process 작성일: 26-Oct-2000 PEP 5 – 언어 진화를 위한 가이드라인 본 문서는 PEP 387에 의해 대체(Superseded)되었습니다. 작성자: Paul Prescod 상태: Superseded (대체됨) 유형: Process (프로세스) 생성일: 2000년 10월 26일 후속 처리: PEP 387에 의해 대체됨 개요 (Abstract) 프로그래밍...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/5/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 6 - Bug Fix Releases",
        "excerpt":"원문 링크: PEP 6 - Bug Fix Releases 상태: Superseded 유형: Process 작성일: 15-Mar-2001 PEP 6 – Bug Fix Releases (버그 수정 릴리스) 저자: Aahz , Anthony Baxter **상태:** Superseded (대체됨) **유형:** Process (프로세스) **생성일:** 2001년 3월 15일 **이력:** 2001년 3월 15일, 2001년 4월 18일, 2004년 8월 19일 참고: 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/6/",
        "teaser": null
      },{
        "title": "[Active] PEP 7 - Style Guide for C Code",
        "excerpt":"원문 링크: PEP 7 - Style Guide for C Code 상태: Active 유형: Process 작성일: 05-Jul-2001 PEP 7 – C 코드 스타일 가이드 작성자: Guido van Rossum, Barry Warsaw 상태: Active (활성) 유형: Process (프로세스) 작성일: 2001년 7월 5일 서론 이 문서는 Python의 C 구현(C implementation)을 구성하는 C 코드에 대한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/7/",
        "teaser": null
      },{
        "title": "[Active] PEP 8 - Style Guide for Python Code",
        "excerpt":"원문 링크: PEP 8 - Style Guide for Python Code 상태: Active 유형: Process 작성일: 05-Jul-2001 PEP 8 – Python 코드 스타일 가이드 번역 및 요약 서론 이 문서는 메인 Python 배포판의 표준 라이브러리를 구성하는 Python 코드에 대한 코딩 컨벤션(Coding Conventions)을 제공합니다. 이는 C로 구현된 Python 코드의 스타일 가이드라인을 설명하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 9 - Sample Plaintext PEP Template",
        "excerpt":"원문 링크: PEP 9 - Sample Plaintext PEP Template 상태: Withdrawn 유형: Process 작성일: 14-Aug-2001 PEP 9 – 샘플 일반 텍스트 PEP 템플릿 번역 및 해설 작성자: Barry Warsaw **상태:** 철회됨 (Withdrawn) **유형:** 프로세스 (Process) **생성일:** 2001년 8월 14일 **해결:** Python-Dev 스레드 **참고:** 이 PEP는 2016년 1월 5일부로 공식적으로 사용...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/9/",
        "teaser": null
      },{
        "title": "[Active] PEP 10 - Voting Guidelines",
        "excerpt":"원문 링크: PEP 10 - Voting Guidelines 상태: Active 유형: Process 작성일: 07-Mar-2002 PEP 10 – 투표 지침 (Voting Guidelines) 작성자: Barry Warsaw 상태: Active (활성) 유형: Process (절차) 생성일: 2002년 3월 7일 개요 (Abstract) 이 PEP는 python-dev 메일링 리스트의 투표 지침을 설명합니다. 이 지침은 특정 제안, 아이디어 또는 기능에...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/10/",
        "teaser": null
      },{
        "title": "[Active] PEP 11 - CPython platform support",
        "excerpt":"원문 링크: PEP 11 - CPython platform support 상태: Active 유형: Process 작성일: 07-Jul-2002 PEP 11 – CPython 플랫폼 지원 (CPython platform support) 개요 (Abstract) 이 PEP (Python Enhancement Proposal)는 CPython이 특정 운영 체제(플랫폼)를 어떻게 지원하게 되는지, 현재 어떤 플랫폼들이 지원되는지, 그리고 과거의 지원 이력을 문서화합니다. 도입 배경 (Rationale) 시간이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/11/",
        "teaser": null
      },{
        "title": "[Active] PEP 12 - Sample reStructuredText PEP Template",
        "excerpt":"원문 링크: PEP 12 - Sample reStructuredText PEP Template 상태: Active 유형: Process 작성일: 05-Aug-2002 PEP 12는 reStructuredText 형식으로 Python Enhancement Proposal (PEP)을 작성하기 위한 샘플 템플릿 문서입니다. 이 PEP의 목표는 새로운 PEP를 제출하려는 저자들이 표준화된 형식을 쉽게 따를 수 있도록 돕는 것입니다. 개요 (Abstract) 이 PEP는 reStructuredText 기반의 PEP를...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/12/",
        "teaser": null
      },{
        "title": "[Active] PEP 13 - Python Language Governance",
        "excerpt":"원문 링크: PEP 13 - Python Language Governance 상태: Active 유형: Process 작성일: 16-Dec-2018 PEP 13 – Python 언어 거버넌스 요약 이 PEP는 Python의 공식 거버넌스(governance) 프로세스를 정의하며, 시간이 지남에 따라 어떻게 변경되었는지 기록합니다. 현재 Python의 거버넌스는 스티어링 위원회(steering council)를 중심으로 이루어집니다. 스티어링 위원회는 광범위한 권한을 가지지만, 이 권한을 가능한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/13/",
        "teaser": null
      },{
        "title": "[Active] PEP 20 - The Zen of Python",
        "excerpt":"원문 링크: PEP 20 - The Zen of Python 상태: Active 유형: Informational 작성일: 19-Aug-2004 PEP 20 – 파이썬의 정신 (The Zen of Python) 저자: Tim Peters **상태:** Active (활성) **유형:** Informational (정보성) **생성일:** 2004년 8월 19일 개요 (Abstract) 오랜 기간 파이썬 개발자로 활동해 온 팀 피터스(Tim Peters)는 파이썬의 디자인을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/20/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 42 - Feature Requests",
        "excerpt":"원문 링크: PEP 42 - Feature Requests 상태: Withdrawn 유형: Process 작성일: 12-Sep-2000 PEP 42 – 기능 요청 (Feature Requests) 작성자: Jeremy Hylton 상태: 철회됨 (Withdrawn) 유형: 프로세스 (Process) 생성일: 2000년 9월 12일 중요 사항 이 PEP는 철회되었습니다. 현재는 구식(obsolete)이며, 모든 새로운 기능 요청은 매우 간단한 요청의 경우 Python 버그...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/42/",
        "teaser": null
      },{
        "title": "[Final] PEP 100 - Python Unicode Integration",
        "excerpt":"원문 링크: PEP 100 - Python Unicode Integration 상태: Final 유형: Standards Track 작성일: 10-Mar-2000 이 문서는 Python Enhancement Proposal (PEP) 100으로, Python 2.0에 유니코드(Unicode) 지원을 통합하기 위한 제안입니다. 이 제안의 주요 목표는 유니코드 문자열을 가능한 한 간단하게 사용하면서도 잠재적인 함정을 최소화하여 Python에 네이티브(Native) 유니코드 3.0 지원을 추가하는 것입니다. 목차...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/100/",
        "teaser": null
      },{
        "title": "[Active] PEP 101 - Doing Python Releases 101",
        "excerpt":"원문 링크: PEP 101 - Doing Python Releases 101 상태: Active 유형: Informational 작성일: 22-Aug-2001 PEP 101 – Python 릴리스 수행 101 저자: Barry Warsaw, Guido van Rossum 상태: 활성 (Active) 유형: 정보 (Informational) 생성일: 2001년 8월 22일 이전 문서: PEP 102 초록 (Abstract) Python 릴리스를 만드는 것은 흥미진진하면서도 복잡한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/101/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 102 - Doing Python Micro Releases",
        "excerpt":"원문 링크: PEP 102 - Doing Python Micro Releases 상태: Superseded 유형: Informational 작성일: 09-Jan-2002 PEP 102 – Python 마이크로 릴리스(Micro Releases) 수행하기 작성자: Anthony Baxter, Barry Warsaw, Guido van Rossum 상태: Superseded (대체됨) 유형: Informational (정보성) 생성일: 2002년 1월 9일 대체 문서: PEP 101로 대체됨 대체 알림 (Replacement Note)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/102/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 103 - Collecting information about git",
        "excerpt":"원문 링크: PEP 103 - Collecting information about git 상태: Withdrawn 유형: Informational 작성일: 01-Jun-2015 PEP 103 – Git 정보 수집 (철회됨) 작성자: Oleg Broytman 상태: 철회됨 (Withdrawn) 유형: 정보성 (Informational) 생성일: 2015년 6월 1일 이력: 2015년 9월 12일 개요 (Abstract) 이 정보성 PEP는 Git에 대한 정보를 수집합니다. Git에 대한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/103/",
        "teaser": null
      },{
        "title": "[Final] PEP 160 - Python 1.6 Release Schedule",
        "excerpt":"원문 링크: PEP 160 - Python 1.6 Release Schedule 상태: Final 유형: Informational 작성일: 25-Jul-2000 PEP 160 – Python 1.6 릴리스 일정 작성자: Fred L. Drake, Jr. 상태: Final (최종) 유형: Informational (정보성) 주제: Release (릴리스) 생성일: 2000년 7월 25일 Python 버전: 1.6 이력: 개요 (Introduction) 이 PEP는 Python 1.6...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/160/",
        "teaser": null
      },{
        "title": "[Final] PEP 200 - Python 2.0 Release Schedule",
        "excerpt":"원문 링크: PEP 200 - Python 2.0 Release Schedule 상태: Final 유형: Informational 작성일: 12-Jul-2000 PEP 200은 Python 2.0 릴리스 일정을 설명하며, 주요 새 기능의 상태와 소유권을 추적하고, 메일링 리스트 포럼에서 진행된 논의를 요약하며, 추가 정보, 패치 및 기타 미해결 문제에 대한 URL을 제공합니다. PEP 200 – Python 2.0 릴리스...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/200/",
        "teaser": null
      },{
        "title": "[Final] PEP 201 - Lockstep Iteration",
        "excerpt":"원문 링크: PEP 201 - Lockstep Iteration 상태: Final 유형: Standards Track 작성일: 13-Jul-2000 PEP 201 – Lockstep Iteration 작성자: Barry Warsaw 상태: Final 유형: Standards Track 생성일: 2000년 7월 13일 Python 버전: 2.0 게시 이력: 2000년 7월 27일 서론 (Introduction) 이 PEP는 ‘lockstep iteration’ 제안을 설명합니다. 이 문서는 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/201/",
        "teaser": null
      },{
        "title": "[Final] PEP 202 - List Comprehensions",
        "excerpt":"원문 링크: PEP 202 - List Comprehensions 상태: Final 유형: Standards Track 작성일: 13-Jul-2000 PEP 202 – List Comprehensions (리스트 컴프리헨션) 서론 (Introduction) 이 PEP는 Python에 제안된 문법적 확장인 List Comprehensions (리스트 컴프리헨션)에 대해 설명합니다. 제안된 해결책 (The Proposed Solution) for 및 if 절을 사용하여 리스트 리터럴(list literals)을 조건부로 구성할...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/202/",
        "teaser": null
      },{
        "title": "[Final] PEP 203 - Augmented Assignments",
        "excerpt":"원문 링크: PEP 203 - Augmented Assignments 상태: Final 유형: Standards Track 작성일: 13-Jul-2000 PEP 203: 증강 할당 (Augmented Assignments) 작성자: Thomas Wouters 상태: Final (최종) 유형: Standards Track 생성일: 2000년 7월 13일 Python 버전: 2.0 서론 PEP 203은 Python 2.0에 도입될 증강 할당(augmented assignment) 연산자에 대한 제안을 다룹니다. 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/203/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 204 - Range Literals",
        "excerpt":"원문 링크: PEP 204 - Range Literals 상태: Rejected 유형: Standards Track 작성일: 14-Jul-2000 작성자: Thomas Wouters 상태: Rejected (거부됨) 유형: Standards Track 작성일: 2000년 7월 14일 Python 버전: 2.0 경고: 이 PEP는 거부되었습니다. 신중한 고려와 숙고 끝에 이 제안은 거부되었습니다. Guido van Rossum은 이 제안이 Range와 Slice 구문 사이의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/204/",
        "teaser": null
      },{
        "title": "[Final] PEP 205 - Weak References",
        "excerpt":"원문 링크: PEP 205 - Weak References 상태: Final 유형: Standards Track 작성일: 14-Jul-2000 PEP 205 – Weak References 작성자: Fred L. Drake, Jr. 상태: Final (최종) 유형: Standards Track 생성일: 2000년 7월 14일 Python 버전: 2.1 개요 PEP 205는 Python에 “약한 참조(Weak References)”를 도입하는 것을 제안합니다. 약한 참조는 객체의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/205/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 206 - Python Advanced Library",
        "excerpt":"원문 링크: PEP 206 - Python Advanced Library 상태: Withdrawn 유형: Informational 작성일: 14-Jul-2000 PEP 206 – Python Advanced Library는 Python의 “Batteries Included” 철학을 확장하여 고품질의 자주 사용되는 서드 파티 확장 모듈 컬렉션을 제안했던 문서입니다. 이 PEP는 현재 철회(Withdrawn)되었습니다. PEP 206 – Python Advanced Library (Python 고급 라이브러리) 작성자: A.M....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/206/",
        "teaser": null
      },{
        "title": "[Final] PEP 207 - Rich Comparisons",
        "excerpt":"원문 링크: PEP 207 - Rich Comparisons 상태: Final 유형: Standards Track 작성일: 25-Jul-2000 PEP 207 – 풍부한 비교 (Rich Comparisons) 개요 (Abstract) 이 PEP는 비교 연산자에 대한 몇 가지 새로운 기능을 제안합니다. 클래스와 C 확장 모두에서 &lt;, &gt;, &lt;=, &gt;=, ==, != 연산자를 개별적으로 오버로딩할 수 있도록 허용합니다. 오버로딩된...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/207/",
        "teaser": null
      },{
        "title": "[Final] PEP 208 - Reworking the Coercion Model",
        "excerpt":"원문 링크: PEP 208 - Reworking the Coercion Model 상태: Final 유형: Standards Track 작성일: 04-Dec-2000 PEP 208 – Coercion 모델 재작업 (Reworking the Coercion Model) 개요 (Abstract) 많은 Python 타입은 숫자 연산(numeric operations)을 구현합니다. 숫자 연산의 인자들이 서로 다른 타입일 경우, 인터프리터는 인자들을 공통 타입으로 coercion(강제 변환)하려고 시도합니다. 그런...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/208/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 209 - Multi-dimensional Arrays",
        "excerpt":"원문 링크: PEP 209 - Multi-dimensional Arrays 상태: Withdrawn 유형: Standards Track 작성일: 03-Jan-2001 PEP 209 – 다차원 배열 (Multi-dimensional Arrays) 저자: Paul Barrett, Travis Oliphant 상태: 철회됨 (Withdrawn) 유형: 표준 트랙 (Standards Track) 생성일: 2001년 1월 3일 Python 버전: 2.2 Post-History: N/A (정보 없음) 요약 (Abstract) 이 PEP는 다차원...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/209/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 210 - Decoupling the Interpreter Loop",
        "excerpt":"원문 링크: PEP 210 - Decoupling the Interpreter Loop 상태: Rejected 유형: Standards Track 작성일: 15-Jul-2000 PEP 210 – 인터프리터 루프 분리 (Decoupling the Interpreter Loop) 개요 PEP 210은 Python 인터프리터의 메인 루프(interpreter loop)와 I/O 이벤트를 처리하는 부분(I/O event processing)을 분리하자는 제안입니다. 이 제안은 David Ascher가 작성했으며, 2000년 7월 15일에...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/210/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 211 - Adding A New Outer Product Operator",
        "excerpt":"원문 링크: PEP 211 - Adding A New Outer Product Operator 상태: Rejected 유형: Standards Track 작성일: 15-Jul-2000 제목 및 상태 PEP 211 – 새로운 외적(Outer Product) 연산자 추가 (Adding A New Outer Product Operator) 저자: Greg Wilson 상태: 거부됨 (Rejected) 유형: Standards Track 생성일: 2000년 7월 15일 Python 버전:...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/211/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 212 - Loop Counter Iteration",
        "excerpt":"원문 링크: PEP 212 - Loop Counter Iteration 상태: Rejected 유형: Standards Track 작성일: 22-Aug-2000 PEP 212 – 루프 카운터 반복 (Loop Counter Iteration) 저자: Peter Schneider-Kamp 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2000년 8월 22일 Python 버전: 2.1 이력: (내용 없음) 거부 통지 (Rejection Notice) 이 PEP는 거부되었습니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/212/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 213 - Attribute Access Handlers",
        "excerpt":"원문 링크: PEP 213 - Attribute Access Handlers 상태: Deferred 유형: Standards Track 작성일: 21-Jul-2000 서론 (Introduction) Python 코드와 확장 모듈에서는 인스턴스의 클라이언트 코드가 속성을 설정하려고 시도할 때 이를 “트랩(trap)”하여 대신 다른 코드를 실행하는 것이 가능하며, 비교적 흔하게 사용됩니다. 다시 말해, 내부 구현이 직접 바인딩을 수정하는 대신 어떤 계산을 수행하더라도...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/213/",
        "teaser": null
      },{
        "title": "[Final] PEP 214 - Extended Print Statement",
        "excerpt":"원문 링크: PEP 214 - Extended Print Statement 상태: Final 유형: Standards Track 작성일: 24-Jul-2000 PEP 214 – print 문 확장 (Extended Print Statement) 개요 이 PEP (Python Enhancement Proposal)는 Python의 표준 print 문을 확장하여 기본 sys.stdout 대신 모든 파일류(file-like) 객체로 출력을 보낼 수 있는 새로운 구문을 도입합니다. 이는 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/214/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 215 - String Interpolation",
        "excerpt":"원문 링크: PEP 215 - String Interpolation 상태: Superseded 유형: Standards Track 작성일: 24-Jul-2000 PEP 215 – 문자열 보간 (String Interpolation) 개요 이 문서는 Python 2.1에서 더 쉬운 문자열 포매팅을 가능하게 하는 문자열 보간(String Interpolation) 기능을 제안합니다. 제안된 구문 변경은 $ 접두사의 도입입니다. 이 접두사는 유닉스 셸(Unix shells), awk, Perl,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/215/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 216 - Docstring Format",
        "excerpt":"원문 링크: PEP 216 - Docstring Format 상태: Withdrawn 유형: Informational 작성일: 31-Jul-2000 PEP 216 – Docstring 형식 작성자: Moshe Zadka 상태: 철회됨 (Withdrawn) 유형: 정보 (Informational) 생성일: 2000년 7월 31일 대체: PEP 287에 의해 대체됨 초록 (Abstract) 모듈, 클래스, 함수와 같은 Python의 이름 있는 객체들은 __doc__이라는 문자열 속성을 가집니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/216/",
        "teaser": null
      },{
        "title": "[Final] PEP 217 - Display Hook for Interactive Use",
        "excerpt":"원문 링크: PEP 217 - Display Hook for Interactive Use 상태: Final 유형: Standards Track 작성일: 31-Jul-2000 PEP 217 – 대화형 사용을 위한 디스플레이 훅 (Display Hook for Interactive Use) 작성자: Moshe Zadka 상태: Final (최종) 유형: Standards Track (표준 트랙) 생성일: 2000년 7월 31일 Python 버전: 2.1 개요 (Abstract)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/217/",
        "teaser": null
      },{
        "title": "[Final] PEP 218 - Adding a Built-In Set Object Type",
        "excerpt":"원문 링크: PEP 218 - Adding a Built-In Set Object Type 상태: Final 유형: Standards Track 작성일: 31-Jul-2000 이 문서는 Python Enhancement Proposal (PEP) 218의 내용을 한국어 Python 개발자들이 이해하기 쉽도록 번역하고 정리한 것입니다. 이 PEP는 Python에 내장 Set 객체 타입을 추가하는 것에 대한 제안을 다룹니다. PEP 218 – 내장...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/218/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 219 - Stackless Python",
        "excerpt":"원문 링크: PEP 219 - Stackless Python 상태: Deferred 유형: Standards Track 작성일: 14-Aug-2000 PEP 219 – Stackless Python 번역 및 해설 작성자: Gordon McMillan 상태: 연기됨 (Deferred) 유형: 표준 트랙 (Standards Track) 생성일: 2000년 8월 14일 Python 버전: 2.1 최종 수정일: 2025년 2월 1일 서론 이 PEP (Python Enhancement...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/219/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 220 - Coroutines, Generators, Continuations",
        "excerpt":"원문 링크: PEP 220 - Coroutines, Generators, Continuations 상태: Rejected 유형: Informational 작성일: 14-Aug-2000 PEP 220 – 코루틴, 제너레이터, 연속 (Continuations) 번역 및 요약 문서 상태: 거부됨 (Rejected) 주의: 이 PEP는 거부되었습니다. 개요 (Abstract) 이 PEP 220은 “Stackless PEP”에서 설명된 변경 사항들이 왜 필요한지를 보여줍니다. 현재 저수준의 continuations 모듈이 존재하며,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/220/",
        "teaser": null
      },{
        "title": "[Final] PEP 221 - Import As",
        "excerpt":"원문 링크: PEP 221 - Import As 상태: Final 유형: Standards Track 작성일: 15-Aug-2000 PEP 221 – Import As 작성자: Thomas Wouters 상태: Final (최종) 유형: Standards Track 작성일: 2000년 8월 15일 Python 버전: 2.0 서론 (Introduction) 이 PEP는 Python 2.0을 위한 import ... as ... 제안을 설명합니다. 이 문서에서는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/221/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 222 - Web Library Enhancements",
        "excerpt":"원문 링크: PEP 222 - Web Library Enhancements 상태: Deferred 유형: Standards Track 작성일: 18-Aug-2000 Abstract (개요) 이 PEP(Python Enhancement Proposal)는 Python 표준 라이브러리 내의 CGI (Common Gateway Interface) 개발 기능을 개선하기 위한 제안들을 담고 있습니다. 이러한 개선 사항에는 새로운 기능, 쿠키 지원과 같은 작업을 위한 새 모듈, 또는 더...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/222/",
        "teaser": null
      },{
        "title": "[Final] PEP 223 - Change the Meaning of '\\x' Escapes",
        "excerpt":"원문 링크: PEP 223 - Change the Meaning of\\xEscapes 상태: Final 유형: Standards Track 작성일: 20-Aug-2000 PEP 223은 Python 2.0 버전에서 \\x 이스케이프 시퀀스의 의미를 변경하는 제안입니다. 이 제안의 주요 목표는 8비트 및 유니코드(Unicode) 문자열 모두에서 \\x 이스케이프가 항상 뒤따르는 정확히 두 개의 16진수(hex digit)를 소비하도록 하는 것입니다. 개요 (Abstract)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/223/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 224 - Attribute Docstrings",
        "excerpt":"원문 링크: PEP 224 - Attribute Docstrings 상태: Rejected 유형: Standards Track 작성일: 23-Aug-2000 PEP 224 – 속성 Docstring (Attribute Docstrings) 개요 PEP 224는 Python 2.0 버전을 대상으로 “속성 docstring” 제안을 설명하는 문서입니다. 이 PEP는 Python 코드 내의 명명된 할당(named assignments), 특히 클래스 속성(class attributes)에 docstring을 추가하여 코드 문서화를 개선하려는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/224/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 225 - Elementwise/Objectwise Operators",
        "excerpt":"원문 링크: PEP 225 - Elementwise/Objectwise Operators 상태: Rejected 유형: Standards Track 작성일: 19-Sep-2000 경고: 이 PEP는 거부되었습니다. 이 PEP 대신 PEP 465에서 제시된 접근 방식이 최종적으로 채택되었습니다. PEP 465의 ‘거부된 아이디어(Rejected Ideas)’ 섹션에서 이 결정의 배경에 대한 더 자세한 설명을 확인할 수 있습니다. 1. 개요 (Introduction) 이 PEP는 파이썬(Python)에...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/225/",
        "teaser": null
      },{
        "title": "[Final] PEP 226 - Python 2.1 Release Schedule",
        "excerpt":"원문 링크: PEP 226 - Python 2.1 Release Schedule 상태: Final 유형: Informational 작성일: 16-Oct-2000 PEP 226 – Python 2.1 릴리스 스케줄 작성자: Jeremy Hylton **상태:** Final (최종) **유형:** Informational (정보성) **주제:** Release (릴리스) **생성일:** 2000년 10월 16일 **Python 버전:** 2.1 **Post-History:** (정보 없음) 초록 (Abstract) 이 문서는 Python 2.0...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/226/",
        "teaser": null
      },{
        "title": "[Final] PEP 227 - Statically Nested Scopes",
        "excerpt":"원문 링크: PEP 227 - Statically Nested Scopes 상태: Final 유형: Standards Track 작성일: 01-Nov-2000 PEP 227 – 정적으로 중첩된 스코프 (Statically Nested Scopes) 번역 및 요약 초록 (Abstract) 이 PEP는 Python 2.2에 정적으로 중첩된 스코프(Lexical Scoping)를 추가하고, Python 2.1에서는 소스 레벨 옵션으로 제공하는 내용을 기술합니다. 또한, Python 2.1은 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/227/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 228 - Reworking Python’s Numeric Model",
        "excerpt":"원문 링크: PEP 228 - Reworking Python’s Numeric Model 상태: Withdrawn 유형: Standards Track 작성일: 04-Nov-2000 PEP 228 – Python 숫자 모델 재작업 제안 (Reworking Python’s Numeric Model) 작성자: Moshe Zadka, Guido van Rossum 상태: 철회됨 (Withdrawn) 유형: 표준 트랙 (Standards Track) 생성일: 2000년 11월 4일 철회 (Withdrawal) 이 PEP는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/228/",
        "teaser": null
      },{
        "title": "[Final] PEP 229 - Using Distutils to Build Python",
        "excerpt":"원문 링크: PEP 229 - Using Distutils to Build Python 상태: Final 유형: Standards Track 작성일: 16-Nov-2000 PEP 229: Distutils를 사용하여 Python 빌드 서론 Modules/Setup 메커니즘은 다음과 같은 몇 가지 문제점을 가지고 있었습니다: 모든 가능한 모듈을 얻으려면 Modules/Setup 파일의 특정 부분을 수동으로 주석 해제해야 했습니다. Setup 파일을 새로운 버전의 Python으로...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/229/",
        "teaser": null
      },{
        "title": "[Final] PEP 230 - Warning Framework",
        "excerpt":"원문 링크: PEP 230 - Warning Framework 상태: Final 유형: Standards Track 작성일: 28-Nov-2000 PEP 230 – 경고 프레임워크 이 문서는 Python Enhancement Proposal (PEP) 230의 내용을 한국어 사용자가 이해하기 쉽게 번역하고 정리한 것입니다. Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/230/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 231 - __findattr__()",
        "excerpt":"원문 링크: PEP 231 - findattr() 상태: Rejected 유형: Standards Track 작성일: 30-Nov-2000 PEP 231 – __findattr__()에 대한 번역 및 요약 상태: Rejected (거부됨) 작성자: Barry Warsaw 생성일: 2000년 11월 30일 Python 버전: 2.1 소개 PEP 231은 Python 인스턴스의 속성 조회(lookup) 및 수정 메커니즘을 확장하는 제안으로, 순수 Python만으로 다양한 흥미로운...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/231/",
        "teaser": null
      },{
        "title": "[Final] PEP 232 - Function Attributes",
        "excerpt":"원문 링크: PEP 232 - Function Attributes 상태: Final 유형: Standards Track 작성일: 02-Dec-2000 PEP 232 – 함수 속성 (Function Attributes) 서론 (Introduction) 이 PEP(Python Enhancement Proposal)는 함수 및 메서드에 속성 딕셔너리(attribute dictionary)를 추가하는 Python 확장 기능에 대해 설명합니다. 이 PEP는 해당 기능의 상태와 소유권을 추적하며, 기능에 대한 설명과 이를...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/232/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 233 - Python Online Help",
        "excerpt":"원문 링크: PEP 233 - Python Online Help 상태: Deferred 유형: Standards Track 작성일: 11-Dec-2000 PEP 233 – Python 온라인 도움말 작성자: Paul Prescod 상태: 연기됨 (Deferred) 유형: 표준 트랙 (Standards Track) 생성일: 2000년 12월 11일 Python 버전: 2.1 Post-History: [원문 참고] 초록 (Abstract) 이 PEP는 Python을 위한 명령줄 기반...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/233/",
        "teaser": null
      },{
        "title": "[Final] PEP 234 - Iterators",
        "excerpt":"원문 링크: PEP 234 - Iterators 상태: Final 유형: Standards Track 작성일: 30-Jan-2001 PEP 234 – Iterators 작성자: Ka-Ping Yee, Guido van Rossum 상태: Final (최종) 유형: Standards Track 생성일: 2001년 1월 30일 Python 버전: 2.1 (Python 2.2에 구현됨) 초록 (Abstract) 이 문서는 for 루프의 동작을 제어하기 위해 객체가 제공할...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/234/",
        "teaser": null
      },{
        "title": "[Final] PEP 235 - Import on Case-Insensitive Platforms",
        "excerpt":"원문 링크: PEP 235 - Import on Case-Insensitive Platforms 상태: Final 유형: Standards Track 작성일: 21-Feb-2001 PEP 235 – 대소문자 구분 없는 플랫폼에서의 임포트 (Import on Case-Insensitive Platforms) 개요 PEP 235는 파일 시스템이 대소문자를 구분하지 않지만 보존하는(case-preserving, case-insensitive) 플랫폼(예: Windows, MacOS X HFS+, Cygwin)에서 Python의 import 문 동작을 변경하는 제안입니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/235/",
        "teaser": null
      },{
        "title": "[Final] PEP 236 - Back to the __future__",
        "excerpt":"원문 링크: PEP 236 - Back to the future 상태: Final 유형: Standards Track 작성일: 26-Feb-2001 동기 (Motivation) 때때로 Python은 핵심 언어 구문의 공표된 의미(semantics)에 호환되지 않는 변경을 가하거나, 의도치 않은(구현에 의존하는) 동작을 변경합니다. 이러한 변경은 신중하게 이루어지며 장기적으로 언어를 개선하기 위함이지만, 단기적으로는 논란의 여지가 있고 혼란을 야기할 수 있습니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/236/",
        "teaser": null
      },{
        "title": "[Final] PEP 237 - Unifying Long Integers and Integers",
        "excerpt":"원문 링크: PEP 237 - Unifying Long Integers and Integers 상태: Final 유형: Standards Track 작성일: 11-Mar-2001 PEP 237 – Long Integers와 Integers의 통합 작성자: Moshe Zadka, Guido van Rossum 상태: Final (최종) 유형: Standards Track (표준 트랙) 작성일: 2001년 3월 11일 Python 버전: 2.2 개정 이력: 2001년 3월 16일,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/237/",
        "teaser": null
      },{
        "title": "[Final] PEP 238 - Changing the Division Operator",
        "excerpt":"원문 링크: PEP 238 - Changing the Division Operator 상태: Final 유형: Standards Track 작성일: 11-Mar-2001 PEP 238 – 나눗셈 연산자 변경 (Changing the Division Operator) 개요 (Abstract) 현재 Python의 나눗셈 연산자 (/)는 숫자 인수에 대해 모호한 의미를 가지고 있습니다. 정수(int)나 long 정수가 인수로 주어질 경우 수학적 나눗셈 결과의 내림(floor)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/238/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 239 - Adding a Rational Type to Python",
        "excerpt":"원문 링크: PEP 239 - Adding a Rational Type to Python 상태: Rejected 유형: Standards Track 작성일: 11-Mar-2001 PEP 239 – Python에 유리수 타입 추가 작성자: Christopher A. Craig, Moshe Zadka 상태: 거부됨 (Rejected) 유형: Standards Track 생성일: 2001년 3월 11일 Python 버전: 2.2 경고 (Warning) 이 PEP는 거부되었습니다. ‘배경...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/239/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 240 - Adding a Rational Literal to Python",
        "excerpt":"원문 링크: PEP 240 - Adding a Rational Literal to Python 상태: Rejected 유형: Standards Track 작성일: 11-Mar-2001 PEP 240 – Python에 유리수 리터럴 추가 작성자: Christopher A. Craig, Moshe Zadka 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2001년 3월 11일 Python 버전: 2.2 변경 이력: 2001년 3월 16일 목차...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/240/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 241 - Metadata for Python Software Packages",
        "excerpt":"원문 링크: PEP 241 - Metadata for Python Software Packages 상태: Superseded 유형: Standards Track 작성일: 12-Mar-2001 PEP 241은 Python 소프트웨어 패키지에 메타데이터를 추가하는 메커니즘을 설명합니다. 이 문서는 필드 이름, 의미 및 사용법에 대한 세부 사항을 포함합니다. 이 PEP는 현재 Superseded (대체됨) 상태이며, PyPA (Python Packaging Authority) 스펙 페이지에서 Core...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/241/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 242 - Numeric Kinds",
        "excerpt":"원문 링크: PEP 242 - Numeric Kinds 상태: Withdrawn 유형: Standards Track 작성일: 17-Mar-2001 PEP 242 – 숫자 종류 (Numeric Kinds) 요약 (Abstract) 이 제안은 사용자가 숫자 연산의 정밀도(precision)와 범위(range)를 선택적으로 제어할 수 있도록 하여, 한 번 작성된 코드가 원하는 최소한의 정밀도와 범위를 보장하면서 어떤 환경에서든 실행될 수 있도록 합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/242/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 243 - Module Repository Upload Mechanism",
        "excerpt":"원문 링크: PEP 243 - Module Repository Upload Mechanism 상태: Withdrawn 유형: Standards Track 작성일: 18-Mar-2001 PEP 243 – 모듈 저장소 업로드 메커니즘 번역 및 요약 이 문서는 Python Enhancement Proposal (PEP) 243, “모듈 저장소 업로드 메커니즘”에 대한 한국어 번역 및 요약본입니다. 이 PEP는 Python 모듈 저장소(예: Perl의 CPAN)에 모듈을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/243/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 244 - Thedirectivestatement",
        "excerpt":"원문 링크: PEP 244 - Thedirectivestatement 상태: Rejected 유형: Standards Track 작성일: 20-Mar-2001 PEP 244 – directive 문 (The directive statement) 작성자: Martin von Löwis 상태: 거부됨 (Rejected) 유형: Standards Track 생성일: 2001년 3월 20일 Python 버전: 2.1 1. 동기 (Motivation) Python은 때때로 핵심 언어 구조의 공개된 의미(advertised semantics)에 호환되지...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/244/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 245 - Python Interface Syntax",
        "excerpt":"원문 링크: PEP 245 - Python Interface Syntax 상태: Rejected 유형: Standards Track 작성일: 11-Jan-2001 PEP 245 – Python 인터페이스 문법 (Python Interface Syntax) 작성자: Michel Pelletier 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2001년 1월 11일 Python 버전: 2.2 거부 공지 이 PEP는 거부되었습니다. 5년이 지났습니다. 언젠가 Python에 인터페이스...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/245/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 246 - Object Adaptation",
        "excerpt":"원문 링크: PEP 246 - Object Adaptation 상태: Rejected 유형: Standards Track 작성일: 21-Mar-2001 PEP 246 – 객체 어댑테이션 (Object Adaptation) 작성자: Alex Martelli, Clark C. Evans 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2001년 3월 21일 Python 버전: 2.5 최종 수정일: 2025년 2월 1일 거부 통지 (Rejection Notice) 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/246/",
        "teaser": null
      },{
        "title": "[Final] PEP 247 - API for Cryptographic Hash Functions",
        "excerpt":"원문 링크: PEP 247 - API for Cryptographic Hash Functions 상태: Final 유형: Informational 작성일: 23-Mar-2001 PEP 247 – 암호화 해시 함수용 API 개요 이 문서는 MD5 또는 SHA와 같은 암호화 해싱 알고리즘을 구현하는 다양한 모듈들을 위해 표준화된 API를 정의합니다. 이를 통해 여러 구현체 간의 전환을 용이하게 하는 것을 목표로...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/247/",
        "teaser": null
      },{
        "title": "[Final] PEP 248 - Python Database API Specification v1.0",
        "excerpt":"원문 링크: PEP 248 - Python Database API Specification v1.0 상태: Final 유형: Informational 작성일: 08-May-1996 서론 (Introduction) 이 API는 데이터베이스에 접근하는 데 사용되는 Python 모듈들 간의 유사성을 장려하기 위해 정의되었습니다. 이를 통해, 더 쉽게 이해할 수 있는 모듈, 데이터베이스 간에 더 높은 이식성을 가진 코드, 그리고 Python에서 더 광범위한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/248/",
        "teaser": null
      },{
        "title": "[Final] PEP 249 - Python Database API Specification v2.0",
        "excerpt":"원문 링크: PEP 249 - Python Database API Specification v2.0 상태: Final 유형: Informational 작성일: 12-Apr-1999 서론 이 API는 데이터베이스 접근에 사용되는 Python 모듈 간의 유사성을 장려하기 위해 정의되었습니다. 이를 통해 일관성을 확보하여 모듈을 더 쉽게 이해하고, 데이터베이스 간에 더 이식성이 높은 코드를 작성하며, Python에서 데이터베이스 연결의 범위를 넓히는 것을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/249/",
        "teaser": null
      },{
        "title": "[Final] PEP 250 - Using site-packages on Windows",
        "excerpt":"원문 링크: PEP 250 - Using site-packages on Windows 상태: Final 유형: Standards Track 작성일: 30-Mar-2001 PEP 250 – Windows에서 site-packages 사용하기 초록 (Abstract) 표준 Python 배포판에는 Lib/site-packages 디렉토리가 포함되어 있으며, 이는 Unix 플랫폼에서 로컬로 설치된 모듈 및 패키지를 저장하는 데 사용됩니다. Python과 함께 배포되는 site.py 모듈은 site-packages 디렉토리 내의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/250/",
        "teaser": null
      },{
        "title": "[Final] PEP 251 - Python 2.2 Release Schedule",
        "excerpt":"원문 링크: PEP 251 - Python 2.2 Release Schedule 상태: Final 유형: Informational 작성일: 17-Apr-2001 PEP 251 – Python 2.2 릴리스 일정 이 문서는 Python 2.2의 개발 및 릴리스 일정을 설명하며, 주로 PEP 규모의 항목들에 초점을 맞춥니다. 작은 버그 수정 및 변경 사항은 첫 번째 베타 릴리스 전까지 발생했습니다. 아래...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/251/",
        "teaser": null
      },{
        "title": "[Final] PEP 252 - Making Types Look More Like Classes",
        "excerpt":"원문 링크: PEP 252 - Making Types Look More Like Classes 상태: Final 유형: Standards Track 작성일: 19-Apr-2001 PEP 252 – 타입을 클래스처럼 보이게 만들기 작성자: Guido van Rossum **상태:** 최종 (Final) **유형:** 표준 트랙 (Standards Track) **생성일:** 2001년 4월 19일 **Python 버전:** 2.2 **이전 이력:** 요약 (Abstract) 이 PEP는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/252/",
        "teaser": null
      },{
        "title": "[Final] PEP 253 - Subtyping Built-in Types",
        "excerpt":"원문 링크: PEP 253 - Subtyping Built-in Types 상태: Final 유형: Standards Track 작성일: 14-May-2001 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 C 및 Python에서 내장 타입(built-in types)의 서브타입(subtype) 생성을 가능하게 하는 타입 객체 API(Type Object API) 추가를 제안합니다. 편집자 주: 이 PEP에서 설명하는 아이디어는 이미 Python에 통합되었습니다. 따라서 이 PEP는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/253/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 254 - Making Classes Look More Like Types",
        "excerpt":"원문 링크: PEP 254 - Making Classes Look More Like Types 상태: Rejected 유형: Standards Track 작성일: 18-Jun-2001 PEP 254 – 클래스를 타입처럼 보이게 만들기 (Making Classes Look More Like Types) 요약 이 PEP는 작성되지 않은 상태로 제출된 초안(stub entry)이며, 결국 채워지지 않고 폐기되었습니다. 이 PEP의 의도된 기능 대부분은 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/254/",
        "teaser": null
      },{
        "title": "[Final] PEP 255 - Simple Generators",
        "excerpt":"원문 링크: PEP 255 - Simple Generators 상태: Final 유형: Standards Track 작성일: 18-May-2001 PEP 255 – 간단한 제너레이터 (Simple Generators) 초록 (Abstract) 이 PEP는 Python에 제너레이터(generators)의 개념과 함께 사용되는 새로운 문(statement)인 yield 문을 도입합니다. 동기 (Motivation) 생산자 함수(producer function)가 생성하는 값들 사이에 상태를 유지해야 하는 복잡한 작업을 수행할 때,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/255/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 256 - Docstring Processing System Framework",
        "excerpt":"원문 링크: PEP 256 - Docstring Processing System Framework 상태: Rejected 유형: Standards Track 작성일: 01-Jun-2001 PEP 256 – Docstring 처리 시스템 프레임워크 (Docstring Processing System Framework) 작성자: David Goodger 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2001년 6월 1일 거부 공지 (Rejection Notice) 이 제안은 추진력을 잃어 결국 거부되었습니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/256/",
        "teaser": null
      },{
        "title": "[Active] PEP 257 - Docstring Conventions",
        "excerpt":"원문 링크: PEP 257 - Docstring Conventions 상태: Active 유형: Informational 작성일: 29-May-2001 PEP 257 – Docstring Convention 개요 (Abstract) 이 PEP는 Python docstring(독스트링)과 관련된 의미론 및 컨벤션(관례)을 문서화합니다. 도입 배경 (Rationale) 이 PEP의 목표는 docstring의 상위 수준 구조, 즉 무엇을 포함해야 하고 어떻게 표현해야 하는지를 표준화하는 것입니다 (docstring 내의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/257/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 258 - Docutils Design Specification",
        "excerpt":"원문 링크: PEP 258 - Docutils Design Specification 상태: Rejected 유형: Standards Track 작성일: 31-May-2001 PEP 258 – Docutils 디자인 사양 PEP 258 – Docutils 디자인 사양 번역 및 정리 작성자 (Author): David Goodger 논의 대상 (Discussions-To): Doc-SIG list 상태 (Status): Rejected (거부됨) 유형 (Type): Standards Track 요구 사항 (Requires):...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/258/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 259 - Omit printing newline after newline",
        "excerpt":"원문 링크: PEP 259 - Omit printing newline after newline 상태: Rejected 유형: Standards Track 작성일: 11-Jun-2001 PEP 259 – 개행 문자 뒤에 개행 문자 출력 생략 (Omit printing newline after newline) 작성자: Guido van Rossum 상태: Rejected (거부됨) 유형: Standards Track 작성일: 2001년 6월 11일 Python 버전: 2.2 개요...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/259/",
        "teaser": null
      },{
        "title": "[Final] PEP 260 - Simplify xrange()",
        "excerpt":"원문 링크: PEP 260 - Simplify xrange() 상태: Final 유형: Standards Track 작성일: 26-Jun-2001 PEP 260 – xrange() 단순화 요약 (Abstract) 이 PEP는 xrange() 객체에서 x[i:j]나 x*n와 같이 거의 사용되지 않는 일부 동작을 제거할 것을 제안합니다. 문제점 (Problem) xrange() 함수는 주로 다음과 같은 한 가지 용도로 사용됩니다. for i in...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/260/",
        "teaser": null
      },{
        "title": "[Final] PEP 261 - Support for “wide” Unicode characters",
        "excerpt":"원문 링크: PEP 261 - Support for “wide” Unicode characters 상태: Final 유형: Standards Track 작성일: 27-Jun-2001 PEP 261 – “와이드(Wide)” 유니코드 문자 지원 개요 (Abstract) 이 PEP(Python Enhancement Proposal) 261은 Python 2.2에서 “와이드(wide)” 유니코드 문자를 지원하기 위한 제안입니다. Python 2.1까지의 유니코드 문자는 0부터 2**16 - 1 (0xFFFF)까지의 코드 포인트(ordinal)만...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/261/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 262 - A Database of Installed Python Packages",
        "excerpt":"원문 링크: PEP 262 - A Database of Installed Python Packages 상태: Rejected 유형: Standards Track 작성일: 08-Jul-2001 PEP 262 – 설치된 Python 패키지 데이터베이스 개요 이 PEP는 시스템에 설치된 Python 소프트웨어의 데이터베이스 형식을 설명합니다. 참고: 이 PEP는 PEP 345 및 PEP 376에 의해 대체되었으며, 이 PEP들은 승인되었습니다. 따라서 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/262/",
        "teaser": null
      },{
        "title": "[Final] PEP 263 - Defining Python Source Code Encodings",
        "excerpt":"원문 링크: PEP 263 - Defining Python Source Code Encodings 상태: Final 유형: Standards Track 작성일: 06-Jun-2001 PEP 263: Python 소스 코드 인코딩 정의 개요 이 PEP는 Python 소스 파일의 인코딩을 선언하는 문법을 도입할 것을 제안합니다. 이 인코딩 정보는 Python 파서가 파일을 해석하는 데 사용됩니다. 특히, 소스 코드 내 유니코드...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/263/",
        "teaser": null
      },{
        "title": "[Final] PEP 264 - Future statements in simulated shells",
        "excerpt":"원문 링크: PEP 264 - Future statements in simulated shells 상태: Final 유형: Standards Track 작성일: 30-Jul-2001 PEP 264: 시뮬레이션 셸에서의 __future__ 문 (Future statements in simulated shells) 개요 PEP 264는 “시뮬레이션 대화형 셸” (simulated interactive shells)이 “실제” 대화형 셸에서 __future__ 문의 동작을 시뮬레이션하는 명확한 방법이 없다는 PEP 236의 문제점을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/264/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 265 - Sorting Dictionaries by Value",
        "excerpt":"원문 링크: PEP 265 - Sorting Dictionaries by Value 상태: Rejected 유형: Standards Track 작성일: 08-Aug-2001 PEP 265 – 값(Value)으로 딕셔너리 정렬 1. 개요 (Abstract) 이 PEP는 딕셔너리에 “값(value)으로 정렬”하는 기능을 추가할 것을 제안합니다. 이 제안의 주된 이점은 현재 초보자가 이해하기 어렵고 모든 개발자가 구현하기 번거로운 일반적인 Python 숙어(idiom)에 대해...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/265/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 266 - Optimizing Global Variable/Attribute Access",
        "excerpt":"원문 링크: PEP 266 - Optimizing Global Variable/Attribute Access 상태: Withdrawn 유형: Standards Track 작성일: 13-Aug-2001 PEP 266 – Optimizing Global Variable/Attribute Access 작성자: Skip Montanaro 상태: 철회됨 (Withdrawn) 유형: 표준 트랙 (Standards Track) 작성일: 2001년 8월 13일 Python 버전: 2.3 히스토리: (제출 후 변경 이력) Abstract (개요) 대부분의 전역...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/266/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 267 - Optimized Access to Module Namespaces",
        "excerpt":"원문 링크: PEP 267 - Optimized Access to Module Namespaces 상태: Deferred 유형: Standards Track 작성일: 23-May-2001 PEP 267 – 모듈 네임스페이스에 대한 접근 최적화 작성자: Jeremy Hylton 상태: 연기됨 (Deferred) 유형: 표준 트랙 (Standards Track) 생성일: 2001년 5월 23일 Python 버전: 2.2 연기 (Deferral) 이 PEP는 좋은 아이디어임에도 불구하고,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/267/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 268 - Extended HTTP functionality and WebDAV",
        "excerpt":"원문 링크: PEP 268 - Extended HTTP functionality and WebDAV 상태: Rejected 유형: Standards Track 작성일: 20-Aug-2001 PEP 268 – 확장된 HTTP 기능 및 WebDAV 저자: Greg Stein 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2001년 8월 20일 Python 버전: 2.x 최종 수정일: 2025년 2월 1일 거부 고지 (Rejection Notice)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/268/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 269 - Pgen Module for Python",
        "excerpt":"원문 링크: PEP 269 - Pgen Module for Python 상태: Deferred 유형: Standards Track 작성일: 24-Aug-2001 PEP 269 – Python용 Pgen 모듈 개요 PEP 269는 Python 파서를 생성하는 데 사용되는 pgen 파서 제너레이터(parser generator)를 Python 모듈로 노출할 것을 제안합니다. 이는 기존의 parser 모듈이 Python 파서 자체를 노출하는 것과 유사한 접근...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/269/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 270 - uniq method for list objects",
        "excerpt":"원문 링크: PEP 270 - uniq method for list objects 상태: Rejected 유형: Standards Track 작성일: 21-Aug-2001 PEP 270: list 객체를 위한 uniq 메서드 작성자: Jason Petrone 상태: Rejected (거절됨) 유형: Standards Track 생성일: 2001년 8월 21일 Python 버전: 2.2 목차 주의 (Notice) 개요 (Abstract) 제안 배경 (Rationale) 고려 사항...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/270/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 271 - Prefixing sys.path by command line option",
        "excerpt":"원문 링크: PEP 271 - Prefixing sys.path by command line option 상태: Rejected 유형: Standards Track 작성일: 15-Aug-2001 PEP 271 – sys.path에 명령줄 옵션으로 접두사 추가 작성자: Frédéric B. Giacometti 상태: 거부됨 (Rejected) 유형: 표준 트랙 (Standards Track) 생성일: 2001년 8월 15일 Python 버전: 2.2 초록 (Abstract) 현재, 추가적인 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/271/",
        "teaser": null
      },{
        "title": "[Final] PEP 272 - API for Block Encryption Algorithms v1.0",
        "excerpt":"원문 링크: PEP 272 - API for Block Encryption Algorithms v1.0 상태: Final 유형: Informational 작성일: 18-Sep-2001 파이썬 PEP 272: 블록 암호화 알고리즘을 위한 API v1.0 개요 이 문서는 DES 또는 Rijndael과 같은 비밀 키(secret-key) 블록 암호화 알고리즘을 위한 표준 API를 정의합니다. 이를 통해 다양한 알고리즘 및 구현 간의 전환을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/272/",
        "teaser": null
      },{
        "title": "[Final] PEP 273 - Import Modules from Zip Archives",
        "excerpt":"원문 링크: PEP 273 - Import Modules from Zip Archives 상태: Final 유형: Standards Track 작성일: 11-Oct-2001 개요 이 문서는 Python Enhancement Proposal (PEP) 273, “Import Modules from Zip Archives”의 내용을 한국어 사용자가 이해하기 쉽게 번역하고 정리한 것입니다. 이 PEP는 Python 모듈과 패키지를 .zip 아카이브에서 임포트할 수 있는 기능을 추가하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/273/",
        "teaser": null
      },{
        "title": "[Final] PEP 274 - Dict Comprehensions",
        "excerpt":"원문 링크: PEP 274 - Dict Comprehensions 상태: Final 유형: Standards Track 작성일: 25-Oct-2001 PEP 274 – Dict Comprehensions (딕셔너리 컴프리헨션) 개요 PEP 274는 Python에 List Comprehension과 유사한 문법적 확장으로 “dictionary comprehension” 또는 줄여서 “dict comprehension”을 도입하는 것을 제안합니다. List Comprehension이 리스트 객체를 생성하는 것처럼, Dict Comprehension은 Python 딕셔너리 객체를...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/274/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 275 - Switching on Multiple Values",
        "excerpt":"원문 링크: PEP 275 - Switching on Multiple Values 상태: Rejected 유형: Standards Track 작성일: 10-Nov-2001 PEP 275 – 다중 값 스위칭 (Switching on Multiple Values) 저자: Marc-André Lemburg 상태: Rejected (거절됨) 유형: Standards Track 생성일: 2001년 11월 10일 Python 버전: 2.6 사후 이력: (생략) 거절 공지 (Rejection Notice) Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/275/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 276 - Simple Iterator for ints",
        "excerpt":"원문 링크: PEP 276 - Simple Iterator for ints 상태: Rejected 유형: Standards Track 작성일: 12-Nov-2001 PEP 276 – int를 위한 단순 이터레이터 작성자: Jim Althoff 상태: 거부됨 (Rejected) 유형: 표준 트랙 (Standards Track) 생성일: 2001년 11월 12일 Python 버전: 2.3 요약 (Abstract) Python 2.1부터 이터레이터(Iterator) 기능(PEP 234)이 추가되었으며, 이는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/276/",
        "teaser": null
      },{
        "title": "[Final] PEP 277 - Unicode file name support for Windows NT",
        "excerpt":"원문 링크: PEP 277 - Unicode file name support for Windows NT 상태: Final 유형: Standards Track 작성일: 11-Jan-2002 PEP 277: Windows NT용 유니코드 파일명 지원 요약 (Abstract) 이 PEP는 Windows NT 운영체제에서 유니코드 파일명을 시스템의 와이드 문자(wide-character) 함수에 직접 전달하여, Windows NT에서 가능한 모든 파일에 접근할 수 있도록 지원하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/277/",
        "teaser": null
      },{
        "title": "[Final] PEP 278 - Universal Newline Support",
        "excerpt":"원문 링크: PEP 278 - Universal Newline Support 상태: Final 유형: Standards Track 작성일: 14-Jan-2002 PEP 278 – 유니버설 뉴라인 지원 개요 이 PEP는 Python이 현재 플랫폼의 기본 줄바꿈 (newline) 형식이 아닌 파일에서도 I/O를 지원하는 방법을 제안합니다. 이를 통해 각 플랫폼의 Python은 CR (Macintosh), LF (Unix), 또는 CR LF (Windows)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/278/",
        "teaser": null
      },{
        "title": "[Final] PEP 279 - The enumerate() built-in function",
        "excerpt":"원문 링크: PEP 279 - The enumerate() built-in function 상태: Final 유형: Standards Track 작성일: 30-Jan-2002 PEP 279 – enumerate() 내장 함수 작성자: Raymond Hettinger 상태: 최종 (Final) 유형: 표준 트랙 (Standards Track) 생성일: 2002년 1월 30일 Python 버전: 2.3 수정 이력: 확인 가능 개요 (Abstract) 이 PEP는 일반적으로 사용되는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/279/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 280 - Optimizing access to globals",
        "excerpt":"원문 링크: PEP 280 - Optimizing access to globals 상태: Deferred 유형: Standards Track 작성일: 10-Feb-2002 # PEP 280 – 전역(globals) 접근 최적화 * **작성자:** Guido van Rossum * **상태:** 연기됨 (Deferred) * **유형:** 표준 트랙 (Standards Track) * **작성일:** 2002년 2월 10일 * **Python 버전:** 2.3 * **최종 수정일:**...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/280/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 281 - Loop Counter Iteration with range and xrange",
        "excerpt":"원문 링크: PEP 281 - Loop Counter Iteration with range and xrange 상태: Rejected 유형: Standards Track 작성일: 11-Feb-2002 PEP 281 – range 및 xrange를 이용한 루프 카운터 반복 (Loop Counter Iteration with range and xrange) 작성자: Magnus Lie Hetland **상태:** Rejected (거부됨) **유형:** Standards Track **생성일:** 2002년 2월 11일...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/281/",
        "teaser": null
      },{
        "title": "[Final] PEP 282 - A Logging System",
        "excerpt":"원문 링크: PEP 282 - A Logging System 상태: Final 유형: Standards Track 작성일: 04-Feb-2002 파이썬 PEP 282 – 로깅 시스템 (A Logging System) 초록 (Abstract) 이 PEP(Python Enhancement Proposal)는 파이썬 표준 라이브러리에 제안된 로깅 패키지를 설명합니다. 기본적으로 이 시스템은 사용자가 하나 이상의 로거(logger) 객체를 생성하고, 이 객체들의 메서드를 호출하여...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/282/",
        "teaser": null
      },{
        "title": "[Final] PEP 283 - Python 2.3 Release Schedule",
        "excerpt":"원문 링크: PEP 283 - Python 2.3 Release Schedule 상태: Final 유형: Informational 작성일: 27-Feb-2002 PEP 283 – Python 2.3 릴리스 일정 작성자: Guido van Rossum 상태: Final (최종) 유형: Informational (정보성) 주제: Release (릴리스) 생성일: 2002년 2월 27일 Python 버전: 2.3 이력: 2002년 2월 27일 초록 (Abstract) 이 문서는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/283/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 284 - Integer for-loops",
        "excerpt":"원문 링크: PEP 284 - Integer for-loops 상태: Rejected 유형: Standards Track 작성일: 01-Mar-2002 PEP 284 – 정수 for 루프 작성자: David Eppstein, Gregory Ewing 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2002년 3월 1일 Python 버전: 2.3 요약 (Abstract) 이 PEP는 for 키워드 뒤에 허용되는 표현식의 범위를 확장하여 for...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/284/",
        "teaser": null
      },{
        "title": "[Final] PEP 285 - Adding a bool type",
        "excerpt":"원문 링크: PEP 285 - Adding a bool type 상태: Final 유형: Standards Track 작성일: 08-Mar-2002 PEP 285 – bool 타입 추가 제안 개요 PEP 285는 Python에 새로운 내장(built-in) 타입인 bool을 도입하고, 두 개의 상수 False와 True를 추가할 것을 제안합니다. 이 bool 타입은 내부적으로 int 타입의 서브타입(subtype)으로 구현되며, False는 0처럼,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/285/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 286 - Enhanced Argument Tuples",
        "excerpt":"원문 링크: PEP 286 - Enhanced Argument Tuples 상태: Deferred 유형: Standards Track 작성일: 03-Mar-2002 PEP 286: Enhanced Argument Tuples 개요 PEP 286은 PyArg_ParseTuple 함수가 인자 변환기(argument converter)를 통해 새로운 메모리를 생성할 때 발생하는 어려운 메모리 관리 문제를 해결하기 위해 제안되었습니다. 이 문제를 해결하기 위해 특수화된 인자 타입(argument type)의 도입이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/286/",
        "teaser": null
      },{
        "title": "[Active] PEP 287 - reStructuredText Docstring Format",
        "excerpt":"원문 링크: PEP 287 - reStructuredText Docstring Format 상태: Active 유형: Informational 작성일: 25-Mar-2002 PEP 287 – reStructuredText Docstring Format 개요 (Abstract) 이 PEP는 Python docstring, PEPs 및 관련 문서에서 구조화된 일반 텍스트 문서를 위한 표준 마크업 형식으로 reStructuredText 마크업을 채택할 것을 제안합니다. reStructuredText는 풍부하고 확장 가능하면서도 읽기 쉬운 WYSIWYG(What-You-See-Is-What-You-Get)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/287/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 288 - Generators Attributes and Exceptions",
        "excerpt":"원문 링크: PEP 288 - Generators Attributes and Exceptions 상태: Withdrawn 유형: Standards Track 작성일: 21-Mar-2002 PEP 288 – 제너레이터 속성 및 예외 (Generators Attributes and Exceptions) 작성자: Raymond Hettinger 상태: 철회됨 (Withdrawn) 유형: Standards Track 생성일: 2002년 3월 21일 Python 버전: 2.5 이력: (Post-History는 생략하고 내용에 포함) 요약 (Abstract)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/288/",
        "teaser": null
      },{
        "title": "[Final] PEP 289 - Generator Expressions",
        "excerpt":"원문 링크: PEP 289 - Generator Expressions 상태: Final 유형: Standards Track 작성일: 30-Jan-2002 PEP 289 – 제너레이터 표현식 (Generator Expressions) 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 List Comprehension (PEP 202)과 Generator (제너레이터) (PEP 255)의 고성능, 메모리 효율적인 일반화 형태인 Generator Expression (제너레이터 표현식)을 소개합니다. 도입 배경 (Rationale) List Comprehension은...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/289/",
        "teaser": null
      },{
        "title": "[Active] PEP 290 - Code Migration and Modernization",
        "excerpt":"원문 링크: PEP 290 - Code Migration and Modernization 상태: Active 유형: Informational 작성일: 06-Jun-2002 PEP 290 – 코드 마이그레이션 및 현대화 작성자: Raymond Hettinger 상태: Active (활성) 유형: Informational (정보성) 생성일: 2002년 6월 6일 히스토리: (없음) 목차 요약 (Abstract) 배경 (Rationale) 새로운 항목을 위한 지침 (Guidelines for New Entries)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/290/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 291 - Backward Compatibility for the Python 2 Standard Library",
        "excerpt":"원문 링크: PEP 291 - Backward Compatibility for the Python 2 Standard Library 상태: Superseded 유형: Informational 작성일: 06-Jun-2002 PEP 291 – Python 2 표준 라이브러리의 하위 호환성 (Backward Compatibility for the Python 2 Standard Library) 작성자: Neal Norwitz 상태: Superseded (대체됨) 유형: Informational (정보성) 생성일: 2002년 6월 6일 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/291/",
        "teaser": null
      },{
        "title": "[Final] PEP 292 - Simpler String Substitutions",
        "excerpt":"원문 링크: PEP 292 - Simpler String Substitutions 상태: Final 유형: Standards Track 작성일: 18-Jun-2002 PEP 292 – 더 간단한 문자열 치환 (Simpler String Substitutions) 작성자: Barry Warsaw 상태: Final 유형: Standards Track 생성일: 2002년 6월 18일 Python 버전: 2.4 대체: PEP 215 요약 (Abstract) 이 PEP는 문자열 보간(string interpolation)으로도...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/292/",
        "teaser": null
      },{
        "title": "[Final] PEP 293 - Codec Error Handling Callbacks",
        "excerpt":"원문 링크: PEP 293 - Codec Error Handling Callbacks 상태: Final 유형: Standards Track 작성일: 18-Jun-2002 PEP 293 – 코덱 에러 핸들링 콜백 작성자: Walter Dörwald 상태: Final (최종) 타입: Standards Track (표준 트랙) 생성일: 2002년 6월 18일 Python 버전: 2.3 사전 이력: 2002년 6월 19일 요약 (Abstract) 이 PEP는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/293/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 294 - Type Names in the types Module",
        "excerpt":"원문 링크: PEP 294 - Type Names in the types Module 상태: Rejected 유형: Standards Track 작성일: 19-Jun-2002 PEP 294 – types 모듈의 타입 이름 작성자: Oren Tirosh 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2002년 6월 19일 Python 버전: 2.5 개요 (Abstract) 이 PEP는 types 모듈 내의 모든 기본(basic)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/294/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 295 - Interpretation of multiline string constants",
        "excerpt":"원문 링크: PEP 295 - Interpretation of multiline string constants 상태: Rejected 유형: Standards Track 작성일: 22-Jul-2002 PEP 295 – 여러 줄 문자열 상수의 해석 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2002년 7월 22일 Python 버전: 3.0 작성자: Stepan Koltsov 초록 (Abstract) 이 PEP는 Python에서 여러 줄 문자열 상수의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/295/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 296 - Adding a bytes Object Type",
        "excerpt":"원문 링크: PEP 296 - Adding a bytes Object Type 상태: Withdrawn 유형: Standards Track 작성일: 12-Jul-2002 PEP 296은 Python 2.3 버전을 위해 bytes 객체 타입 추가를 제안했던 문서입니다. 이 제안은 나중에 PEP 358로 대체되어 철회(Withdrawn)되었습니다. PEP 296 – bytes 객체 타입 추가 공지 (Notice) 이 PEP는 작성자에 의해 철회되었습니다...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/296/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 297 - Support for System Upgrades",
        "excerpt":"원문 링크: PEP 297 - Support for System Upgrades 상태: Rejected 유형: Standards Track 작성일: 19-Jul-2001 PEP 297 – 시스템 업그레이드 지원 작성자: Marc-André Lemburg 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2001년 7월 19일 Python 버전: 2.6 사후 이력: (정보 없음) 거부 통지 (Rejection Notice) 이 PEP는 충분한 관심을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/297/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 298 - The Locked Buffer Interface",
        "excerpt":"원문 링크: PEP 298 - The Locked Buffer Interface 상태: Withdrawn 유형: Standards Track 작성일: 26-Jul-2002 PEP 298 – 잠금된 버퍼 인터페이스 개요 이 문서는 Python 2.3 버전에서 제안된 ‘잠금된 버퍼 인터페이스(Locked Buffer Interface)’에 대한 PEP(Python Enhancement Proposal)를 한국어 사용자가 이해하기 쉽도록 번역 및 정리한 것입니다. 목표 Python 개발자들이 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/298/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 299 - Special __main__() function in modules",
        "excerpt":"원문 링크: PEP 299 - Special main() function in modules 상태: Rejected 유형: Standards Track 작성일: 12-Aug-2002 PEP 299 – 모듈 내 특별한 __main__() 함수 작성자 (Author): Jeff Epler 상태 (Status): 반려됨 (Rejected) 유형 (Type): 표준 트랙 (Standards Track) 작성일 (Created): 2002년 8월 12일 Python 버전 (Python-Version): 2.3 게시 이력...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/299/",
        "teaser": null
      },{
        "title": "[Final] PEP 301 - Package Index and Metadata for Distutils",
        "excerpt":"원문 링크: PEP 301 - Package Index and Metadata for Distutils 상태: Final 유형: Standards Track 작성일: 24-Oct-2002 PEP 301 – Distutils를 위한 패키지 인덱스 및 메타데이터 초록 (Abstract) 이 PEP는 Distutils 패키징 시스템에 몇 가지 확장 기능을 제안합니다. 주요 개선 사항으로는 중앙 패키지 인덱스 서버, 인덱스에 패키지 정보를 제출하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/301/",
        "teaser": null
      },{
        "title": "[Final] PEP 302 - New Import Hooks",
        "excerpt":"원문 링크: PEP 302 - New Import Hooks 상태: Final 유형: Standards Track 작성일: 19-Dec-2002 PEP 302 – 새로운 임포트 훅 (New Import Hooks) 작성자: Just van Rossum, Paul Moore 상태: Final (최종) 유형: Standards Track (표준 트랙) 작성일: 2002년 12월 19일 Python 버전: 2.3 경고: 임포트에 대한 언어 참조...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/302/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 303 - Extend divmod() for Multiple Divisors",
        "excerpt":"원문 링크: PEP 303 - Extend divmod() for Multiple Divisors 상태: Rejected 유형: Standards Track 작성일: 31-Dec-2002 PEP 303 – Extend divmod() for Multiple Divisors (다중 제수를 위한 divmod() 확장) 개요 이 PEP는 내장 함수 divmod()의 확장을 제안합니다. 이 확장은 divmod()가 여러 개의 제수(divisor)를 인자로 받아, 여러 번의 divmod() 호출을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/303/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 304 - Controlling Generation of Bytecode Files",
        "excerpt":"원문 링크: PEP 304 - Controlling Generation of Bytecode Files 상태: Withdrawn 유형: Standards Track 작성일: 22-Jan-2003 PEP 304 – 바이트코드 파일 생성 제어 (Controlling Generation of Bytecode Files) 개요 이 PEP는 컴파일된 Python 바이트코드 파일의 생성 및 위치를 제어하는 메커니즘을 제안합니다. 이 아이디어는 초기 패치 요청에서 시작하여 python-dev 메일링...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/304/",
        "teaser": null
      },{
        "title": "[Final] PEP 305 - CSV File API",
        "excerpt":"원문 링크: PEP 305 - CSV File API 상태: Final 유형: Standards Track 작성일: 26-Jan-2003 PEP 305 – CSV 파일 API 작성자: Kevin Altis, Dave Cole, Andrew McNamara, Skip Montanaro, Cliff Wells 논의처: Csv list 상태: Final (최종) 유형: Standards Track (표준 트랙) 생성일: 2003년 1월 26일 Python 버전: 2.3...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/305/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 306 - How to Change Python’s Grammar",
        "excerpt":"원문 링크: PEP 306 - How to Change Python’s Grammar 상태: Withdrawn 유형: Informational 작성일: 29-Jan-2003 PEP 306 – Python 문법 변경 방법 작성자: Michael Hudson, Jack Diederich, Alyssa Coghlan, Benjamin Peterson 상태: 철회됨 (Withdrawn) 유형: 정보 제공 (Informational) 생성일: 2003년 1월 29일 목차 참고 (Note) 개요 (Abstract) 배경 (Rationale)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/306/",
        "teaser": null
      },{
        "title": "[Final] PEP 307 - Extensions to the pickle protocol",
        "excerpt":"원문 링크: PEP 307 - Extensions to the pickle protocol 상태: Final 유형: Standards Track 작성일: 31-Jan-2003 PEP 307 – pickle 프로토콜 확장 개요 이 PEP는 Python 2.3에서 도입된 새로운 pickle 프로토콜을 설명하며, 기존 new-style 객체들의 pickle 처리 문제를 해결하고 pickle 크기를 최적화합니다. 주로 API 변경 사항에 중점을 두지만, 일부...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/307/",
        "teaser": null
      },{
        "title": "[Final] PEP 308 - Conditional Expressions",
        "excerpt":"원문 링크: PEP 308 - Conditional Expressions 상태: Final 유형: Standards Track 작성일: 07-Feb-2003 PEP 308 – 조건부 표현식 (Conditional Expressions) 번역 및 요약 개요 PEP 308은 Python에 조건부 표현식을 추가하는 제안입니다. 이 PEP는 “X if C else Y” 형태의 조건부 표현식이 Python 2.5에 추가될 것을 확정지었습니다. 주된 동기는 and...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/308/",
        "teaser": null
      },{
        "title": "[Final] PEP 309 - Partial Function Application",
        "excerpt":"원문 링크: PEP 309 - Partial Function Application 상태: Final 유형: Standards Track 작성일: 08-Feb-2003 PEP 309 – Partial Function Application (부분 함수 적용) 요약 이 PEP는 호출 가능한(callable) 객체와 부분적인 인자 리스트(위치 인자 및 키워드 인자 포함)를 사용하여 새로운 호출 가능한 객체를 생성하는 함수 또는 호출 가능한 클래스에 대한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/309/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 310 - Reliable Acquisition/Release Pairs",
        "excerpt":"원문 링크: PEP 310 - Reliable Acquisition/Release Pairs 상태: Rejected 유형: Standards Track 작성일: 18-Dec-2002 PEP 310 – 신뢰할 수 있는 자원 획득/해제 쌍 작성자: Michael Hudson, Paul Moore 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2002년 12월 18일 Python 버전: 2.4 개요 (Abstract) 다음과 같이 작성하는 데 있어 타이핑...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/310/",
        "teaser": null
      },{
        "title": "[Final] PEP 311 - Simplified Global Interpreter Lock Acquisition for Extensions",
        "excerpt":"원문 링크: PEP 311 - Simplified Global Interpreter Lock Acquisition for Extensions 상태: Final 유형: Standards Track 작성일: 05-Feb-2003 다음은 PEP 311 문서의 내용을 한국어 사용자가 이해하기 쉽게 번역하고 정리한 것입니다. PEP 311 – 확장 모듈을 위한 GIL(Global Interpreter Lock) 획득 간소화 작성자: Mark Hammond 상태: Final 유형: Standards Track...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/311/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 312 - Simple Implicit Lambda",
        "excerpt":"원문 링크: PEP 312 - Simple Implicit Lambda 상태: Deferred 유형: Standards Track 작성일: 11-Feb-2003 PEP 312 – 간단한 암묵적 람다 (Simple Implicit Lambda) 번역 및 요약 개요 이 문서는 Python Enhancement Proposal (PEP) 312의 내용을 한국어 사용자가 이해하기 쉽도록 번역하고 정리한 것입니다. PEP 312는 특정 상황에서 인자가 없는 lambda...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/312/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 313 - Adding Roman Numeral Literals to Python",
        "excerpt":"원문 링크: PEP 313 - Adding Roman Numeral Literals to Python 상태: Rejected 유형: Standards Track 작성일: 01-Apr-2003 PEP 313 – Python에 로마 숫자 리터럴 추가 제안 작성자: Mike Meyer 상태: Rejected (거부됨) 유형: Standards Track (표준 추적) 생성일: 2003년 4월 1일 Python 버전: 2.4 요약 (Abstract) 이 PEP (PEP...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/313/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 314 - Metadata for Python Software Packages 1.1",
        "excerpt":"원문 링크: PEP 314 - Metadata for Python Software Packages 1.1 상태: Superseded 유형: Standards Track 작성일: 12-Apr-2003 PEP 314 – Python 소프트웨어 패키지용 메타데이터 1.1 목표 이 문서는 Python 패키지에 메타데이터를 추가하는 메커니즘을 설명합니다. 필드 이름과 그 의미, 사용법에 대한 세부 사항을 포함합니다. 이 문서는 메타데이터 형식의 버전 1.1을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/314/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 315 - Enhanced While Loop",
        "excerpt":"원문 링크: PEP 315 - Enhanced While Loop 상태: Rejected 유형: Standards Track 작성일: 25-Apr-2003 개요 (Abstract) 이 PEP는 while 루프의 시작 부분에 선택적인 “do” 절을 추가하여 루프 코드를 더 명확하게 만들고, 코드 중복으로 인한 오류를 줄이는 것을 제안합니다. 공지 (Notice) 이 PEP는 거부되었습니다. 2006년부터 이 PEP는 보류 상태였습니다. 2009년...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/315/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 316 - Programming by Contract for Python",
        "excerpt":"원문 링크: PEP 316 - Programming by Contract for Python 상태: Deferred 유형: Standards Track 작성일: 02-May-2003 PEP 316 – Python을 위한 계약 기반 프로그래밍 (Programming by Contract for Python) 개요 이 문서는 Python에서 “계약 기반 프로그래밍(Programming by Contract, DBC)”을 구현하는 방법을 설명하는 제안입니다. Eiffel의 Design By Contract™가 가장 널리...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/316/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 317 - Eliminate Implicit Exception Instantiation",
        "excerpt":"원문 링크: PEP 317 - Eliminate Implicit Exception Instantiation 상태: Rejected 유형: Standards Track 작성일: 06-May-2003 PEP 317 – 암시적 예외 인스턴스화 제거 (Eliminate Implicit Exception Instantiation) 저자: Steven Taschuk 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2003년 5월 6일 Python 버전: 2.4 게시 이력: 2003년 6월 9일 요약 (Abstract)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/317/",
        "teaser": null
      },{
        "title": "[Final] PEP 318 - Decorators for Functions and Methods",
        "excerpt":"원문 링크: PEP 318 - Decorators for Functions and Methods 상태: Final 유형: Standards Track 작성일: 05-Jun-2003 PEP 318 – 함수 및 메서드를 위한 데코레이터 (Decorators for Functions and Methods) 개요 (Abstract) 기존에는 함수나 메서드를 변형(예: classmethod 또는 staticmethod로 선언)하는 방식이 복잡하여 코드 이해를 어렵게 만들었습니다. 이상적으로는 이러한 변형이 선언...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/318/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 319 - Python Synchronize/Asynchronize Block",
        "excerpt":"원문 링크: PEP 319 - Python Synchronize/Asynchronize Block 상태: Rejected 유형: Standards Track 작성일: 24-Feb-2003 PEP 319 – Python Synchronize/Asynchronize 블록 상태: 거부됨 (Rejected) 작성자: Michel Pelletier 생성일: 2003년 2월 24일 Python 버전: 2.4 참고: 이 PEP는 PEP 343에 찬성하여 거부되었습니다. 초록 (Abstract) 이 PEP는 Python에 ‘synchronize’와 ‘asynchronize’라는 두 가지...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/319/",
        "teaser": null
      },{
        "title": "[Final] PEP 320 - Python 2.4 Release Schedule",
        "excerpt":"원문 링크: PEP 320 - Python 2.4 Release Schedule 상태: Final 유형: Informational 작성일: 29-Jul-2003 PEP 320: Python 2.4 릴리스 일정 본 문서는 Python 2.4의 개발 및 릴리스 일정을 설명하는 PEP (Python Enhancement Proposal)입니다. 이 PEP는 주로 PEP로 지정된 규모의 변경 사항에 중점을 둡니다. 작은 기능들은 첫 번째 베타 릴리스까지...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/320/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 321 - Date/Time Parsing and Formatting",
        "excerpt":"원문 링크: PEP 321 - Date/Time Parsing and Formatting 상태: Withdrawn 유형: Standards Track 작성일: 16-Sep-2003 PEP 321: 날짜/시간 구문 분석 및 형식 지정 (Date/Time Parsing and Formatting) 개요 PEP 321은 Python의 datetime 모듈에 문자열 형태의 날짜 및 시간을 파싱(구문 분석)하고, 다양한 형식으로 출력하는 기능을 추가하는 것을 제안했던 문서입니다. 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/321/",
        "teaser": null
      },{
        "title": "[Final] PEP 322 - Reverse Iteration",
        "excerpt":"원문 링크: PEP 322 - Reverse Iteration 상태: Final 유형: Standards Track 작성일: 24-Sep-2003 PEP 322 – 역방향 이터레이션 (Reverse Iteration) 개요 이 제안은 시퀀스(sequence) 객체에 대한 역방향 이터레이션(reverse iteration)을 지원하는 내장 함수(builtin function)를 추가하는 것입니다. 동기 (Motivation) 현재 인덱싱 가능한(indexable) 객체에 대해 역방향으로 이터레이션하는 방식은 오류가 발생하기 쉽고(error prone),...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/322/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 323 - Copyable Iterators",
        "excerpt":"원문 링크: PEP 323 - Copyable Iterators 상태: Deferred 유형: Standards Track 작성일: 25-Oct-2003 PEP 323 – 복사 가능한 이터레이터 (Copyable Iterators) 개요 이 PEP (Python Enhancement Proposal)는 일부 이터레이터 (iterator) 유형이 __copy__ 메서드를 통해 인스턴스의 얕은 복사 (shallow copy)를 지원해야 한다고 제안합니다. 이 제안은 __copy__ 메서드를 사용하는 코드가 어떻게...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/323/",
        "teaser": null
      },{
        "title": "[Final] PEP 324 - subprocess - New process module",
        "excerpt":"원문 링크: PEP 324 - subprocess - New process module 상태: Final 유형: Standards Track 작성일: 19-Nov-2003 PEP 324 – subprocess 모듈: 새로운 프로세스 모듈 개요 (Abstract) 이 PEP는 새로운 프로세스를 시작하고 통신하는 기능을 제공하는 subprocess 모듈에 대해 설명합니다. 동기 (Motivation) 새로운 프로세스를 시작하는 것은 프로그래밍 언어에서 흔한 작업이며, 특히...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/324/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 325 - Resource-Release Support for Generators",
        "excerpt":"원문 링크: PEP 325 - Resource-Release Support for Generators 상태: Rejected 유형: Standards Track 작성일: 25-Aug-2003 PEP 325 – 제너레이터를 위한 리소스 해제 지원 작성자: Samuele Pedroni 상태: 반려됨 (Rejected) 유형: 표준 트랙 (Standards Track) 생성일: 2003년 8월 25일 Python 버전: 2.4 초록 (Abstract) 제너레이터(Generators)는 데이터 순회(traversal)를 자연스럽게 코딩하고 추상화할...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/325/",
        "teaser": null
      },{
        "title": "[Final] PEP 327 - Decimal Data Type",
        "excerpt":"원문 링크: PEP 327 - Decimal Data Type 상태: Final 유형: Standards Track 작성일: 17-Oct-2003 PEP 327 – Decimal 데이터 타입 초록 (Abstract) 이 PEP의 주요 아이디어는 이진 부동 소수점(binary floating point)이 너무 부정확하여 소수점 계산이 필요한 모든 경우에 사용할 수 있는 Decimal 데이터 타입을 도입하는 것입니다. Decimal 데이터 타입은...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/327/",
        "teaser": null
      },{
        "title": "[Final] PEP 328 - Imports: Multi-Line and Absolute/Relative",
        "excerpt":"원문 링크: PEP 328 - Imports: Multi-Line and Absolute/Relative 상태: Final 유형: Standards Track 작성일: 21-Dec-2003 PEP 328 – 임포트: 여러 줄 및 절대/상대 경로 (Imports: Multi-Line and Absolute/Relative) 작성자: Aahz 상태: Final (최종) 유형: Standards Track (표준 트랙) 생성일: 2003년 12월 21일 Python 버전: 2.4, 2.5, 2.6 배포 이력:...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/328/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 330 - Python Bytecode Verification",
        "excerpt":"원문 링크: PEP 330 - Python Bytecode Verification 상태: Rejected 유형: Standards Track 작성일: 17-Jun-2004 PEP 330 – Python 바이트코드 검증 (Python Bytecode Verification) 요약 (Abstract) Python Virtual Machine (PVM) 바이트코드가 “잘 구성되지 않은(well-formed)” 경우, 값 스택(value stack)의 언더/오버플로우(under/overflow) 또는 PVM 프로그램 공간의 임의 영역 읽기/쓰기 등 다양한 오류를 유발하여...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/330/",
        "teaser": null
      },{
        "title": "[Final] PEP 331 - Locale-Independent Float/String Conversions",
        "excerpt":"원문 링크: PEP 331 - Locale-Independent Float/String Conversions 상태: Final 유형: Standards Track 작성일: 19-Jul-2003 PEP 331 – 로케일 독립적인 float/string 변환 *저자: Christian R. Reis * *상태: Final (최종)* *유형: Standards Track (표준 트랙)* *생성일: 2003년 7월 19일* *Python 버전: 2.4* *게시 이력: 2003년 7월 21일, 2003년 8월 13일,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/331/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 332 - Byte vectors and String/Unicode Unification",
        "excerpt":"원문 링크: PEP 332 - Byte vectors and String/Unicode Unification 상태: Rejected 유형: Standards Track 작성일: 11-Aug-2004 PEP 332 – 바이트 벡터 및 문자열/유니코드 통합 제목: PEP 332 – Byte vectors and String/Unicode Unification 작성자: Skip Montanaro **상태:** Rejected (거부됨) **유형:** Standards Track **생성일:** 2004년 8월 11일 **Python 버전:** 2.5...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/332/",
        "teaser": null
      },{
        "title": "[Final] PEP 333 - Python Web Server Gateway Interface v1.0",
        "excerpt":"원문 링크: PEP 333 - Python Web Server Gateway Interface v1.0 상태: Final 유형: Informational 작성일: 07-Dec-2003 PEP 333 – Python Web Server Gateway Interface v1.0 서문 참고: Python 3.x를 지원하며 커뮤니티의 정오표, 추가 사항 및 명확화가 포함된 업데이트된 사양은 대신 PEP 3333을 참조하십시오. 초록 이 문서는 웹 서버와 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/333/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 334 - Simple Coroutines via SuspendIteration",
        "excerpt":"원문 링크: PEP 334 - Simple Coroutines via SuspendIteration 상태: Withdrawn 유형: Standards Track 작성일: 26-Aug-2004 PEP 334 – SuspendIteration을 통한 간단한 코루틴 (Simple Coroutines via SuspendIteration) 작성자: Clark C. Evans 상태: 철회됨 (Withdrawn) 유형: 표준 트랙 (Standards Track) 생성일: 2004년 8월 26일 Python 버전: 3.0 최종 수정일: 2025년 2월...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/334/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 336 - Make None Callable",
        "excerpt":"원문 링크: PEP 336 - Make None Callable 상태: Rejected 유형: Standards Track 작성일: 28-Oct-2004 PEP 336 – None을 호출 가능하게 만들기 (Make None Callable) 저자: Andrew McClelland 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2004년 10월 28일 요약 (Abstract) None은 호출 가능한(callable) 객체가 되어야 하며, 어떤 인자와 함께 호출되더라도...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/336/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 337 - Logging Usage in the Standard Library",
        "excerpt":"원문 링크: PEP 337 - Logging Usage in the Standard Library 상태: Deferred 유형: Standards Track 작성일: 02-Oct-2004 PEP 337 – 표준 라이브러리에서의 로깅 사용법 이 문서는 Python 표준 라이브러리 내에서 로깅 시스템 (PEP 282)을 사용하는 표준을 정의합니다. 초록 (Abstract) 이 PEP는 표준 라이브러리에서 로깅 시스템 (PEP 282) 사용에 대한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/337/",
        "teaser": null
      },{
        "title": "[Final] PEP 338 - Executing modules as scripts",
        "excerpt":"원문 링크: PEP 338 - Executing modules as scripts 상태: Final 유형: Standards Track 작성일: 16-Oct-2004 PEP 338 – 모듈을 스크립트로 실행하기 작성자: Alyssa Coghlan 상태: Final (최종) 유형: Standards Track 생성일: 2004년 10월 16일 Python 버전: 2.5 요약: 이 PEP는 -m 명령줄 스위치 또는 runpy.run_module(modulename) 함수를 통해 모든 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/338/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 339 - Design of the CPython Compiler",
        "excerpt":"원문 링크: PEP 339 - Design of the CPython Compiler 상태: Withdrawn 유형: Informational 작성일: 02-Feb-2005 참고: 이 PEP는 철회되었으며 Python 개발자 가이드로 이동되었습니다. 개요 (Abstract) 과거(Python 2.4까지)에는 소스 코드(source code)를 바이트코드(bytecode)로 컴파일하는 과정이 두 단계로 이루어졌습니다: 소스 코드를 파스 트리(parse tree)로 파싱합니다 (Parser/pgen.c). 파스 트리를 기반으로 바이트코드를 생성합니다 (Python/compile.c)....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/339/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 340 - Anonymous Block Statements",
        "excerpt":"원문 링크: PEP 340 - Anonymous Block Statements 상태: Rejected 유형: Standards Track 작성일: 27-Apr-2005 PEP 340 – 익명 블록 문 (Anonymous Block Statements) 작성자: Guido van Rossum 상태: 거부됨 (Rejected) 유형: 표준 트랙 (Standards Track) 생성일: 2005년 4월 27일 개요 (Introduction) 이 PEP는 리소스 관리 목적으로 사용될 수 있는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/340/",
        "teaser": null
      },{
        "title": "[Final] PEP 341 - Unifying try-except and try-finally",
        "excerpt":"원문 링크: PEP 341 - Unifying try-except and try-finally 상태: Final 유형: Standards Track 작성일: 04-May-2005 PEP 341 – try-except와 try-finally의 통합 작성자: Georg Brandl 상태: Final (최종) 유형: Standards Track 생성일: 2005년 5월 4일 Python 버전: 2.5 최종 수정일: 2025-02-01 08:59:27 GMT 초록 (Abstract) 이 PEP는 try 문의 문법과...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/341/",
        "teaser": null
      },{
        "title": "[Final] PEP 342 - Coroutines via Enhanced Generators",
        "excerpt":"원문 링크: PEP 342 - Coroutines via Enhanced Generators 상태: Final 유형: Standards Track 작성일: 10-May-2005 PEP 342: Enhanced Generators를 통한 코루틴 (Coroutines via Enhanced Generators) 서론 (Introduction) 이 PEP는 제너레이터(generator)를 간단한 코루틴(coroutine)으로 사용할 수 있도록 제너레이터의 API 및 문법에 대한 몇 가지 개선 사항을 제안합니다. 이 제안은 PEP 288...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/342/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 344 - Exception Chaining and Embedded Tracebacks",
        "excerpt":"원문 링크: PEP 344 - Exception Chaining and Embedded Tracebacks 상태: Superseded 유형: Standards Track 작성일: 12-May-2005 PEP 344 – 예외 연쇄 (Exception Chaining) 및 내장 트레이스백 (Embedded Tracebacks) 개요 (Abstract) 이 PEP는 예외 인스턴스에 세 가지 표준 속성을 추가할 것을 제안합니다: 묵시적으로 연쇄된 예외를 위한 __context__ 속성, 명시적으로 연쇄된...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/344/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 345 - Metadata for Python Software Packages 1.2",
        "excerpt":"원문 링크: PEP 345 - Metadata for Python Software Packages 1.2 상태: Superseded 유형: Standards Track 작성일: 28-Apr-2005 PEP 345 – Python 소프트웨어 패키지용 메타데이터 1.2 이 문서는 Python 배포판에 메타데이터를 추가하는 메커니즘을 설명합니다. 필드 이름, 의미 및 사용법에 대한 세부 정보를 포함합니다. 중요: 이 PEP는 역사적인 문서입니다. 최신 규격인...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/345/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 346 - User Defined (”with”) Statements",
        "excerpt":"원문 링크: PEP 346 - User Defined (”with”) Statements 상태: Withdrawn 유형: Standards Track 작성일: 06-May-2005 PEP 346 – 사용자 정의 (“with”) 문 (User Defined (“with”) Statements) 작성자: Alyssa Coghlan 상태: 철회됨 (Withdrawn) 유형: 표준 트랙 (Standards Track) 생성일: 2005년 5월 6일 Python 버전: 2.5 개요 (Abstract) 이 PEP는 PEP...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/346/",
        "teaser": null
      },{
        "title": "[Final] PEP 347 - Migrating the Python CVS to Subversion",
        "excerpt":"원문 링크: PEP 347 - Migrating the Python CVS to Subversion 상태: Final 유형: Process 작성일: 14-Jul-2004 PEP 347 – Python CVS를 Subversion으로 마이그레이션 개요 이 문서는 Python 소스 코드를 SourceForge.net의 CVS 저장소에서 svn.python.org의 Subversion 저장소로 이전할 것을 제안합니다. 도입 배경 (Rationale) 이번 변경은 두 가지 측면을 가집니다: CVS에서 Subversion으로의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/347/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 348 - Exception Reorganization for Python 3.0",
        "excerpt":"원문 링크: PEP 348 - Exception Reorganization for Python 3.0 상태: Rejected 유형: Standards Track 작성일: 28-Jul-2005 PEP 348 – Python 3.0을 위한 예외 재구성 (반려됨) 작성자: Brett Cannon 상태: 반려됨 (Rejected) 유형: 표준 트랙 (Standards Track) 생성일: 2005년 7월 28일 개요 (Abstract) Python 2.4 버전 기준으로, 내장(built-in) 네임스페이스에는 꽤...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/348/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 349 - Allow str() to return unicode strings",
        "excerpt":"원문 링크: PEP 349 - Allow str() to return unicode strings 상태: Rejected 유형: Standards Track 작성일: 02-Aug-2005 PEP 349 – str() 함수가 유니코드(Unicode) 문자열을 반환하도록 허용 작성자: Neil Schemenauer 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2005년 8월 2일 Python 버전: 2.5 해결: Python-Dev 메시지 개요 (Abstract) 이 PEP는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/349/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 350 - Codetags",
        "excerpt":"원문 링크: PEP 350 - Codetags 상태: Rejected 유형: Informational 작성일: 27-Jun-2005 PEP 350 – 코드태그 (Codetags) 거부 공지 이 PEP는 거부되었습니다. 커뮤니티가 이 제안에 관심을 가질 수는 있지만, 표준 라이브러리가 이 표준을 따르도록 만들려는 의도는 없습니다. 개요 이 정보성(Informational) PEP는 코드태그(codetags)의 일관된 사용을 위한 가이드라인을 제공하는 것을 목표로 합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/350/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 351 - The freeze protocol",
        "excerpt":"원문 링크: PEP 351 - The freeze protocol 상태: Rejected 유형: Standards Track 작성일: 14-Apr-2005 PEP 351 – The freeze protocol (동결 프로토콜) 작성자: Barry Warsaw **상태:** Rejected (거부됨) **유형:** Standards Track **생성일:** 2005년 4월 14일 **Python 버전:** 2.5 **게시 이력:** [원문 참고] 요약 (Abstract) 이 PEP는 가변(mutable) 객체의 동결된(frozen),...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/351/",
        "teaser": null
      },{
        "title": "[Final] PEP 352 - Required Superclass for Exceptions",
        "excerpt":"원문 링크: PEP 352 - Required Superclass for Exceptions 상태: Final 유형: Standards Track 작성일: 27-Oct-2005 PEP 352 – 예외를 위한 필수 슈퍼클래스 (Required Superclass for Exceptions) 작성자: Brett Cannon, Guido van Rossum 상태: Final (최종) 유형: Standards Track (표준 트랙) 작성일: 2005년 10월 27일 Python 버전: 2.5 번역 목표:...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/352/",
        "teaser": null
      },{
        "title": "[Final] PEP 353 - Using ssize_t as the index type",
        "excerpt":"원문 링크: PEP 353 - Using ssize_t as the index type 상태: Final 유형: Standards Track 작성일: 18-Dec-2005 PEP 353 – ssize_t를 인덱스 타입으로 사용하기 개요 (Abstract) Python 2.4에서는 시퀀스의 인덱스가 C 타입 int로 제한되었습니다. 이로 인해 64비트 머신에서는 시퀀스가 전체 주소 공간을 활용하지 못하고, 2^31개 요소로 제한되었습니다. 이 PEP는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/353/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 354 - Enumerations in Python",
        "excerpt":"원문 링크: PEP 354 - Enumerations in Python 상태: Superseded 유형: Standards Track 작성일: 20-Dec-2005 PEP 354 – Python의 Enumeration (열거형) 작성자: Ben Finney 상태: 폐기됨 (Superseded) 유형: 표준 트랙 (Standards Track) 생성일: 2005년 12월 20일 Python 버전: 2.6 대체됨: PEP 435 (2013년 5월 승인됨) 폐기 공지 (Rejection Notice) 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/354/",
        "teaser": null
      },{
        "title": "[Final] PEP 356 - Python 2.5 Release Schedule",
        "excerpt":"원문 링크: PEP 356 - Python 2.5 Release Schedule 상태: Final 유형: Informational 작성일: 07-Feb-2006 PEP 356 – Python 2.5 릴리스 스케줄 이 문서는 Python 2.5의 개발 및 릴리스 스케줄을 설명하는 PEP(Python Enhancement Proposal)입니다. 주로 PEP 규모의 항목들을 다루며, 소규모 기능은 첫 번째 베타 릴리스까지 추가될 수 있고, 버그는 최종...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/356/",
        "teaser": null
      },{
        "title": "[Final] PEP 357 - Allowing Any Object to be Used for Slicing",
        "excerpt":"원문 링크: PEP 357 - Allowing Any Object to be Used for Slicing 상태: Final 유형: Standards Track 작성일: 09-Feb-2006 PEP 357 – 슬라이싱에 모든 객체 사용 허용 작성자: Travis Oliphant 상태: Final (최종) 유형: Standards Track 작성일: 2006년 2월 9일 Python 버전: 2.5 사후 이력: (생략) 요약 (Abstract) 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/357/",
        "teaser": null
      },{
        "title": "[Final] PEP 358 - The “bytes” Object",
        "excerpt":"원문 링크: PEP 358 - The “bytes” Object 상태: Final 유형: Standards Track 작성일: 15-Feb-2006 PEP 358 – “bytes” 객체 작성자: Neil Schemenauer, Guido van Rossum 상태: Final (최종) 유형: Standards Track 작성일: 2006년 2월 15일 Python 버전: 2.6, 3.0 최종 수정: 2025년 2월 1일 개요 (Abstract) 이 PEP는 원시...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/358/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 359 - The “make” Statement",
        "excerpt":"원문 링크: PEP 359 - The “make” Statement 상태: Withdrawn 유형: Standards Track 작성일: 05-Apr-2006 PEP 359 – “make” Statement 작성자: Steven Bethard **상태:** 철회됨 (Withdrawn) **유형:** 표준 트랙 (Standards Track) **생성일:** 2006년 4월 5일 **Python 버전:** 2.6 **이력:** 2006년 4월 5일, 2006년 4월 6일, 2006년 4월 13일 개요 (Abstract)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/359/",
        "teaser": null
      },{
        "title": "[Final] PEP 360 - Externally Maintained Packages",
        "excerpt":"원문 링크: PEP 360 - Externally Maintained Packages 상태: Final 유형: Process 작성일: 30-May-2006 PEP 360 – 외부 관리 패키지 (Externally Maintained Packages) 요약 (Abstract) Python 표준 라이브러리 (stdlib) 외부에 개발된 훌륭한 Python 소프트웨어들이 많이 있습니다. 때로는 Python이 제공하는 도구의 공백을 메우기 위해 이러한 외부 관리 패키지들을 stdlib에 포함하는 것이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/360/",
        "teaser": null
      },{
        "title": "[Final] PEP 361 - Python 2.6 and 3.0 Release Schedule",
        "excerpt":"원문 링크: PEP 361 - Python 2.6 and 3.0 Release Schedule 상태: Final 유형: Informational 작성일: 29-Jun-2006 PEP 361 – Python 2.6 및 3.0 릴리스 스케줄 저자: Neal Norwitz, Barry Warsaw 상태: 최종 (Final) 유형: 정보성 (Informational) 주제: 릴리스 (Release) 생성일: 2006년 6월 29일 Python 버전: 2.6, 3.0 최종 변경일:...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/361/",
        "teaser": null
      },{
        "title": "[Final] PEP 362 - Function Signature Object",
        "excerpt":"원문 링크: PEP 362 - Function Signature Object 상태: Final 유형: Standards Track 작성일: 21-Aug-2006 PEP 362 – 함수 시그니처 객체 작성자: Brett Cannon, Jiwon Seo, Yury Selivanov, Larry Hastings 상태: Final 유형: Standards Track 생성일: 2006년 8월 21일 Python 버전: 3.3 해결: Python-Dev 메시지 개요 (Abstract) 파이썬은 함수와 메서드(이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/362/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 363 - Syntax For Dynamic Attribute Access",
        "excerpt":"원문 링크: PEP 363 - Syntax For Dynamic Attribute Access 상태: Rejected 유형: Standards Track 작성일: 29-Jan-2007 PEP 363 – 동적 속성 접근을 위한 새로운 문법 제안 (Syntax For Dynamic Attribute Access) 상태: 거부됨 (Rejected) 이 문서는 Python Enhancement Proposal (PEP) 363에 대한 한국어 번역 및 정리입니다. PEP 363은 Python에서...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/363/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 364 - Transitioning to the Py3K Standard Library",
        "excerpt":"원문 링크: PEP 364 - Transitioning to the Py3K Standard Library 상태: Withdrawn 유형: Standards Track 작성일: 01-Mar-2007 PEP 364 – Py3K 표준 라이브러리로의 전환 (Transitioning to the Py3K Standard Library) 작성자: Barry Warsaw 상태: 철회됨 (Withdrawn) 유형: Standards Track 생성일: 2007년 3월 1일 Python 버전: 2.6 개요 (Abstract) PEP...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/364/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 365 - Adding the pkg_resources module",
        "excerpt":"원문 링크: PEP 365 - Adding the pkg_resources module 상태: Rejected 유형: Standards Track 작성일: 30-Apr-2007 PEP 365 – pkg_resources 모듈 추가 작성자: Phillip J. Eby 상태: Rejected (거절됨) 유형: Standards Track 주제: Packaging (패키징) 생성일: 2007년 4월 30일 개요 (Abstract) 이 PEP는 개선된 버전의 pkg_resources 모듈을 Python 표준 라이브러리에...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/365/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 326 - A Case for Top and Bottom Values",
        "excerpt":"원문 링크: PEP 326 - A Case for Top and Bottom Values 상태: Rejected 유형: Standards Track 작성일: 20-Dec-2003 PEP 326 – Top 및 Bottom 값에 대한 제안 (Max, Min 상수) 요약 PEP 326은 모든 다른 객체보다 높거나 낮게 비교되는 두 개의 싱글톤(singleton) 상수, Max와 Min을 도입할 것을 제안했습니다. 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/326/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 329 - Treating Builtins as Constants in the Standard Library",
        "excerpt":"원문 링크: PEP 329 - Treating Builtins as Constants in the Standard Library 상태: Rejected 유형: Standards Track 작성일: 18-Apr-2004 PEP 329 – 표준 라이브러리에서 Builtin을 상수로 취급하기 작성자: Raymond Hettinger 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2004년 4월 18일 Python 버전: 2.4 이력: 2004년 4월 18일 개요 (Abstract)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/329/",
        "teaser": null
      },{
        "title": "[Final] PEP 366 - Main module explicit relative imports",
        "excerpt":"원문 링크: PEP 366 - Main module explicit relative imports 상태: Final 유형: Standards Track 작성일: 01-May-2007 PEP 366 – 메인 모듈의 명시적 상대 경로 임포트 작성자: Alyssa Coghlan 상태: Final (최종) 유형: Standards Track (표준 트랙) 생성일: 2007년 5월 1일 Python 버전: 2.6, 3.0 Post-History: 2007년 5월 1일, 2007년...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/366/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 367 - New Super",
        "excerpt":"원문 링크: PEP 367 - New Super 상태: Superseded 유형: Standards Track 작성일: 28-Apr-2007 PEP 367 – New Super 개요 이 문서는 Python Enhancement Proposal (PEP) 367에 대한 번역 및 정리입니다. 이 PEP는 super() 타입의 새로운 구문 설탕(syntactic sugar) 사용법을 제안합니다. 이는 메서드가 정의된 클래스와 현재 메서드를 호출하는 인스턴스(또는 클래스...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/367/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 368 - Standard image protocol and class",
        "excerpt":"원문 링크: PEP 368 - Standard image protocol and class 상태: Deferred 유형: Standards Track 작성일: 28-Jun-2007 PEP 368 – 표준 이미지 프로토콜 및 클래스 작성자: Lino Mastrodomenico 상태: 연기됨 (Deferred) 유형: Standards Track 생성일: 2007년 6월 28일 Python 버전: 2.6, 3.0 요약 (Abstract) 현재 Python 이미지 저장 및 조작...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/368/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 369 - Post import hooks",
        "excerpt":"원문 링크: PEP 369 - Post import hooks 상태: Withdrawn 유형: Standards Track 작성일: 02-Jan-2008 PEP 369 – Post import hooks 작성자: Christian Heimes 상태: 철회됨 (Withdrawn) 유형: Standards Track 생성일: 2008년 1월 2일 Python 버전: 2.6, 3.0 이력: 2012년 12월 2일 (Post-History) 철회 공지 (Withdrawal Notice) 이 PEP는 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/369/",
        "teaser": null
      },{
        "title": "[Final] PEP 370 - Per user site-packages directory",
        "excerpt":"원문 링크: PEP 370 - Per user site-packages directory 상태: Final 유형: Standards Track 작성일: 11-Jan-2008 PEP 370 – 사용자별 site-packages 디렉터리 작성자: Christian Heimes 상태: Final 유형: Standards Track 생성일: 2008년 1월 11일 Python 버전: 2.6, 3.0 개요 (Abstract) 이 PEP는 사용자들이 자신의 홈 디렉터리에 Python 패키지를 로컬로 설치할...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/370/",
        "teaser": null
      },{
        "title": "[Final] PEP 371 - Addition of the multiprocessing package to the standard library",
        "excerpt":"원문 링크: PEP 371 - Addition of the multiprocessing package to the standard library 상태: Final 유형: Standards Track 작성일: 06-May-2008 PEP 371 – 표준 라이브러리에 multiprocessing 패키지 추가 개요 (Abstract) 이 PEP는 pyProcessing 패키지를 “multiprocessing”으로 이름을 변경하여 Python 표준 라이브러리에 포함할 것을 제안합니다. processing 패키지는 표준 라이브러리의 threading 모듈과...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/371/",
        "teaser": null
      },{
        "title": "[Final] PEP 372 - Adding an ordered dictionary to collections",
        "excerpt":"원문 링크: PEP 372 - Adding an ordered dictionary to collections 상태: Final 유형: Standards Track 작성일: 15-Jun-2008 PEP 372 – collections 모듈에 순서가 있는 딕셔너리 추가 개요 이 PEP는 collections 모듈에 “OrderedDict”라는 이름의 순서가 있는 딕셔너리(ordered dictionary)를 새로운 데이터 구조로 추가할 것을 제안합니다. 제안된 API는 다양한 실제 애플리케이션 및...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/372/",
        "teaser": null
      },{
        "title": "[Final] PEP 373 - Python 2.7 Release Schedule",
        "excerpt":"원문 링크: PEP 373 - Python 2.7 Release Schedule 상태: Final 유형: Informational 작성일: 03-Nov-2008 제목 PEP 373 – Python 2.7 릴리스 스케줄 작성자 및 상태 작성자: Benjamin Peterson 상태: Final (최종) 유형: Informational (정보성) 주제: Release (릴리스) 생성일: 2008년 11월 3일 Python 버전: 2.7 개요 (Abstract) 이 문서는 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/373/",
        "teaser": null
      },{
        "title": "[Final] PEP 374 - Choosing a distributed VCS for the Python project",
        "excerpt":"원문 링크: PEP 374 - Choosing a distributed VCS for the Python project 상태: Final 유형: Process 작성일: 07-Nov-2008 PEP 374 – Python 프로젝트를 위한 분산 VCS 선택 작성자: Brett Cannon, Stephen J. Turnbull, Alexandre Vassalotti, Barry Warsaw, Dirkjan Ochtman 상태: Final 유형: Process 생성일: 2008년 11월 7일 개정 이력:...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/374/",
        "teaser": null
      },{
        "title": "[Final] PEP 375 - Python 3.1 Release Schedule",
        "excerpt":"원문 링크: PEP 375 - Python 3.1 Release Schedule 상태: Final 유형: Informational 작성일: 08-Feb-2009 개요 이 문서는 Python 3.1 버전의 개발 및 릴리스 스케줄을 설명합니다. 주요 내용은 PEP(Python Enhancement Proposal) 규모의 제안 사항에 중점을 둡니다. 작은 기능들은 첫 번째 베타 릴리스까지 추가될 수 있으며, 버그는 최종 릴리스까지 수정될 수...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/375/",
        "teaser": null
      },{
        "title": "[Final] PEP 376 - Database of Installed Python Distributions",
        "excerpt":"원문 링크: PEP 376 - Database of Installed Python Distributions 상태: Final 유형: Standards Track 작성일: 22-Feb-2009 PEP 376 – 설치된 Python 배포판 데이터베이스 초록 (Abstract) 이 PEP의 목표는 시스템에 설치된 프로젝트 배포판을 관리하는 표준 인프라를 제공하여, 프로젝트를 설치하거나 제거하는 모든 도구들이 상호 운용될 수 있도록 하는 것입니다. 이를 달성하기...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/376/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 377 - Allow __enter__() methods to skip the statement body",
        "excerpt":"원문 링크: PEP 377 - Allow enter() methods to skip the statement body 상태: Rejected 유형: Standards Track 작성일: 08-Mar-2009 PEP 377 – __enter__() 메서드가 with 문 본문 건너뛰기 허용 저자: Alyssa Coghlan 상태: Rejected (반려됨) 유형: Standards Track 생성일: 2009년 3월 8일 Python 버전: 2.7, 3.1 Post-History: 2009년 3월...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/377/",
        "teaser": null
      },{
        "title": "[Final] PEP 378 - Format Specifier for Thousands Separator",
        "excerpt":"원문 링크: PEP 378 - Format Specifier for Thousands Separator 상태: Final 유형: Standards Track 작성일: 12-Mar-2009 PEP 378 – Format Specifier for Thousands Separator 저자: Raymond Hettinger **상태:** 최종 (Final) **유형:** 표준 트랙 (Standards Track) **생성일:** 2009년 3월 12일 **Python 버전:** 2.7, 3.1 **이전 이력:** 2009년 3월 12일 개요...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/378/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 379 - Adding an Assignment Expression",
        "excerpt":"원문 링크: PEP 379 - Adding an Assignment Expression 상태: Withdrawn 유형: Standards Track 작성일: 14-Mar-2009 작성자: Jervis Whitley **상태:** 철회됨 (Withdrawn) **유형:** 표준 트랙 (Standards Track) **생성일:** 2009년 3월 14일 **Python 버전:** 2.7, 3.2 **이력:** (내용 없음) 개요 (Abstract) 이 PEP는 Python 언어에 새로운 할당 표현식을 추가하여, 거의 모든...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/379/",
        "teaser": null
      },{
        "title": "[Final] PEP 380 - Syntax for Delegating to a Subgenerator",
        "excerpt":"원문 링크: PEP 380 - Syntax for Delegating to a Subgenerator 상태: Final 유형: Standards Track 작성일: 13-Feb-2009 PEP 380 – 서브제너레이터 위임 문법 (Syntax for Delegating to a Subgenerator) 작성자: Gregory Ewing 상태: 최종 (Final) 유형: 표준 트랙 (Standards Track) 생성일: 2009년 2월 13일 Python 버전: 3.3 해결: Python-Dev...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/380/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 381 - Mirroring infrastructure for PyPI",
        "excerpt":"원문 링크: PEP 381 - Mirroring infrastructure for PyPI 상태: Withdrawn 유형: Standards Track 작성일: 21-Mar-2009 PEP 381 – PyPI 미러링 인프라 (PEP 381 – Mirroring infrastructure for PyPI) 작성자: Tarek Ziadé, Martin von Löwis 상태: 철회됨 (Withdrawn) 유형: 표준 트랙 (Standards Track) 생성일: 2009년 3월 21일 초록 (Abstract) 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/381/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 382 - Namespace Packages",
        "excerpt":"원문 링크: PEP 382 - Namespace Packages 상태: Rejected 유형: Standards Track 작성일: 02-Apr-2009 PEP 382 – 네임스페이스 패키지 (Namespace Packages) 작성자: Martin von Löwis 상태: Rejected (거부됨) 유형: Standards Track (표준 트랙) 생성일: 2009년 4월 2일 Python 버전: 3.2 사후 이력: 논의 후 PEP 402의 정신을 이어받는 새로운 PEP가...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/382/",
        "teaser": null
      },{
        "title": "[Final] PEP 383 - Non-decodable Bytes in System Character Interfaces",
        "excerpt":"원문 링크: PEP 383 - Non-decodable Bytes in System Character Interfaces 상태: Final 유형: Standards Track 작성일: 22-Apr-2009 PEP 383 – 시스템 문자 인터페이스의 디코딩 불가능한 바이트 처리 개요 (Abstract) POSIX 시스템에서 파일 이름, 환경 변수, 명령줄 인수는 문자 데이터로 정의되어 있습니다. 그러나 C API는 특정 인코딩을 따르든 따르지 않든...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/383/",
        "teaser": null
      },{
        "title": "[Final] PEP 384 - Defining a Stable ABI",
        "excerpt":"원문 링크: PEP 384 - Defining a Stable ABI 상태: Final 유형: Standards Track 작성일: 17-May-2009 PEP 384 – 안정적인 ABI 정의 (Defining a Stable ABI) 이 문서는 Python 3의 수명 주기 동안 안정적으로 유지되며, 여러 Python 버전 간에 바이너리 호환성을 보장하는 API 함수 집합인 “안정적인 ABI”를 정의할 것을 제안합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/384/",
        "teaser": null
      },{
        "title": "[Final] PEP 385 - Migrating from Subversion to Mercurial",
        "excerpt":"원문 링크: PEP 385 - Migrating from Subversion to Mercurial 상태: Final 유형: Process 작성일: 25-May-2009 PEP 385 – Subversion에서 Mercurial로 마이그레이션 저자: Dirkjan Ochtman, Antoine Pitrou, Georg Brandl 상태: Final (최종) 유형: Process (절차) 작성일: 2009년 5월 25일 목차 동기 타임라인 전환 계획 브랜치 전략 히스토리 관리 태그 변환...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/385/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 386 - Changing the version comparison module in Distutils",
        "excerpt":"원문 링크: PEP 386 - Changing the version comparison module in Distutils 상태: Superseded 유형: Standards Track 작성일: 04-Jun-2009 Title: PEP 386 – Changing the version comparison module in Distutils (Distutils의 버전 비교 모듈 변경) Author: Tarek Ziadé **Status:** Superseded (대체됨) **Type:** Standards Track (표준 트랙) **Topic:** Packaging (패키징) **Created:**...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/386/",
        "teaser": null
      },{
        "title": "[Active] PEP 387 - Backwards Compatibility Policy",
        "excerpt":"원문 링크: PEP 387 - Backwards Compatibility Policy 상태: Active 유형: Process 작성일: 18-Jun-2009 PEP 387 – 하위 호환성 정책 (Backwards Compatibility Policy) 작성자: Benjamin Peterson PEP 담당자: Brett Cannon 상태: Active (활성) 유형: Process (절차) 생성일: 2009년 6월 18일 대체: PEP 291 초록 (Abstract) 이 PEP는 Python의 하위 호환성...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/387/",
        "teaser": null
      },{
        "title": "[Final] PEP 389 - argparse - New Command Line Parsing Module",
        "excerpt":"원문 링크: PEP 389 - argparse - New Command Line Parsing Module 상태: Final 유형: Standards Track 작성일: 25-Sep-2009 PEP 389 – argparse - 새로운 커맨드 라인 파싱 모듈 개요 이 PEP는 Python 2.7 및 3.2 표준 라이브러리에 argparse 모듈을 포함할 것을 제안합니다. 동기 argparse 모듈은 표준 라이브러리의 기존 커맨드...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/389/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 390 - Static metadata for Distutils",
        "excerpt":"원문 링크: PEP 390 - Static metadata for Distutils 상태: Rejected 유형: Standards Track 작성일: 10-Oct-2009 PEP 390 – Distutils를 위한 정적 메타데이터 작성자: Tarek Ziadé BDFL-Delegate: Alyssa Coghlan 상태: Rejected (거부됨) 유형: Standards Track 주제: Packaging 생성일: 2009년 10월 10일 Python 버전: 2.7, 3.2 개요 (Abstract) 이 PEP는 setup.cfg...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/390/",
        "teaser": null
      },{
        "title": "[Final] PEP 391 - Dictionary-Based Configuration For Logging",
        "excerpt":"원문 링크: PEP 391 - Dictionary-Based Configuration For Logging 상태: Final 유형: Standards Track 작성일: 15-Oct-2009 PEP 391 – 로깅을 위한 딕셔너리 기반 설정 개요 이 PEP(Python Enhancement Proposal)는 딕셔너리를 사용하여 로깅(logging) 설정을 구성하는 새로운 방법을 제안합니다. 도입 배경 (Rationale) 현재 Python의 logging 패키지를 설정하는 방법은 두 가지입니다. 하나는 로깅...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/391/",
        "teaser": null
      },{
        "title": "[Final] PEP 392 - Python 3.2 Release Schedule",
        "excerpt":"원문 링크: PEP 392 - Python 3.2 Release Schedule 상태: Final 유형: Informational 작성일: 30-Dec-2009 PEP 392 – Python 3.2 릴리즈 일정 번역 및 정리 본 문서는 Python 3.2 시리즈의 개발 및 릴리즈 일정을 설명합니다. 이 일정은 주로 PEP 규모의 항목들을 다룹니다. 개요 (Abstract) 이 문서는 Python 3.2 시리즈의 개발...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/392/",
        "teaser": null
      },{
        "title": "[Final] PEP 393 - Flexible String Representation",
        "excerpt":"원문 링크: PEP 393 - Flexible String Representation 상태: Final 유형: Standards Track 작성일: 24-Jan-2010 PEP 393 – 유연한 문자열 표현 (Flexible String Representation) 개요 (Abstract) 이 PEP는 유니코드 문자열 타입이 여러 내부 표현 방식을 지원하도록 변경하는 것을 제안합니다. 이는 문자열 내 가장 큰 유니코드 코드 포인트(1, 2, 또는 4바이트)에...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/393/",
        "teaser": null
      },{
        "title": "[Active] PEP 394 - The “python” Command on Unix-Like Systems",
        "excerpt":"원문 링크: PEP 394 - The “python” Command on Unix-Like Systems 상태: Active 유형: Informational 작성일: 02-Mar-2011 PEP 394 – Unix 계열 시스템의 “python” 명령어 작성자: Kerrick Staley, Alyssa Coghlan, Barry Warsaw, Petr Viktorin, Miro Hrončok, Carol Willing 상태: Active (활성) 유형: Informational (정보성) 생성일: 2011년 3월 2일 수정 이력:...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/394/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 395 - Qualified Names for Modules",
        "excerpt":"원문 링크: PEP 395 - Qualified Names for Modules 상태: Withdrawn 유형: Standards Track 작성일: 04-Mar-2011 PEP 395 – 모듈의 정규화된 이름 (Qualified Names for Modules) 개요 PEP 395는 Python의 임포트(import) 시스템, 객체 직렬화(serialization), 그리고 인트로스펙션(introspection)을 다룰 때 발생하는 오래된 문제점들을 해결하기 위한 새로운 메커니즘을 제안하는 문서입니다. 이 제안은 PEP...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/395/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 396 - Module Version Numbers",
        "excerpt":"원문 링크: PEP 396 - Module Version Numbers 상태: Withdrawn 유형: Informational 작성일: 16-Mar-2011 PEP 396 – Module Version Numbers 작성자: Barry Warsaw 상태: 철회됨 (Withdrawn) 유형: 정보성 (Informational) 주제: 패키징 (Packaging) 생성일: 2011년 3월 16일 이력: 2011년 4월 5일 중요 공지 (Important Notice) 이 PEP는 철회되었습니다. 런타임에 패키지 버전...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/396/",
        "teaser": null
      },{
        "title": "[Final] PEP 397 - Python launcher for Windows",
        "excerpt":"원문 링크: PEP 397 - Python launcher for Windows 상태: Final 유형: Standards Track 작성일: 15-Mar-2011 PEP 397 – Windows용 Python 런처 작성자: Mark Hammond, Martin von Löwis 상태: Final (최종) 유형: Standards Track 생성일: 2011년 3월 15일 Python 버전: 3.3 요약 (Abstract) 이 PEP는 Windows 플랫폼용 Python 런처를 설명합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/397/",
        "teaser": null
      },{
        "title": "[Final] PEP 398 - Python 3.3 Release Schedule",
        "excerpt":"원문 링크: PEP 398 - Python 3.3 Release Schedule 상태: Final 유형: Informational 작성일: 23-Mar-2011 PEP 398 – Python 3.3 릴리스 스케줄 작성자: Georg Brandl 상태: Final (최종) 유형: Informational (정보성) 주제: Release (릴리스) 생성일: 2011년 3월 23일 Python 버전: 3.3 초록 (Abstract) 이 문서는 Python 3.3의 개발 및 릴리스...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/398/",
        "teaser": null
      },{
        "title": "[Final] PEP 399 - Pure Python/C Accelerator Module Compatibility Requirements",
        "excerpt":"원문 링크: PEP 399 - Pure Python/C Accelerator Module Compatibility Requirements 상태: Final 유형: Informational 작성일: 04-Apr-2011 PEP 399 – 순수 Python/C 가속 모듈 호환성 요구사항 번역 및 정리 개요 이 문서는 Python Enhancement Proposal (PEP) 399의 내용을 한국어 사용자가 이해하기 쉽게 번역하고 정리한 것입니다. PEP 399는 CPython 표준 라이브러리에...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/399/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 400 - Deprecate codecs.StreamReader and codecs.StreamWriter",
        "excerpt":"원문 링크: PEP 400 - Deprecate codecs.StreamReader and codecs.StreamWriter 상태: Deferred 유형: Standards Track 작성일: 28-May-2011 PEP 400 – codecs.StreamReader 및 codecs.StreamWriter Deprecation 제안 개요 이 PEP는 io.TextIOWrapper와 codecs.StreamReaderWriter가 유사한 API를 제공하지만, TextIOWrapper가 더 많은 기능과 더 빠른 성능을 제공한다는 점에 주목합니다. 코드 중복은 버그를 두 번 수정해야 하거나 두...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/400/",
        "teaser": null
      },{
        "title": "[April Fool!] PEP 401 - BDFL Retirement",
        "excerpt":"원문 링크: PEP 401 - BDFL Retirement 상태: April Fool! 유형: Process 작성일: 01-Apr-2009 PEP 401 – BDFL 은퇴 작성자: Barry Warsaw, Brett Cannon 상태: 만우절! (April Fool!) 유형: Process (프로세스) 생성일: 2009년 4월 1일 후속 기록: 2009년 4월 1일 개요 (Abstract) 20년 동안 Python 개발을 이끌어온 BDFL이 즉시 은퇴를...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/401/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 402 - Simplified Package Layout and Partitioning",
        "excerpt":"원문 링크: PEP 402 - Simplified Package Layout and Partitioning 상태: Rejected 유형: Standards Track 작성일: 12-Jul-2011 PEP 402 – 패키지 레이아웃 및 분할 간소화 작성자: Phillip J. Eby 상태: Rejected (거부됨) 유형: Standards Track 주제: Packaging 작성일: 2011년 7월 12일 Python 버전: 3.3 대체하는 PEP: 382 거부 고지 (Rejection...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/402/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 403 - General purpose decorator clause (aka “@in” clause)",
        "excerpt":"원문 링크: PEP 403 - General purpose decorator clause (aka “@in” clause) 상태: Deferred 유형: Standards Track 작성일: 13-Oct-2011 PEP 403 – 범용 데코레이터 절 (일명 “@in” 절) 개요 (Abstract) 이 PEP는 함수 또는 클래스 정의의 이름 바인딩(name binding) 단계를 오버라이드(override)할 수 있게 해주는 새로운 @in 데코레이터 절의 추가를 제안합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/403/",
        "teaser": null
      },{
        "title": "[Final] PEP 404 - Python 2.8 Un-release Schedule",
        "excerpt":"원문 링크: PEP 404 - Python 2.8 Un-release Schedule 상태: Final 유형: Informational 작성일: 09-Nov-2011 PEP 404 – Python 2.8 미출시 일정 작성자: Barry Warsaw 상태: Final 유형: Informational 주제: Release 작성일: 2011년 11월 9일 Python 버전: 2.8 초록 (Abstract) 이 문서는 Python 2.8의 “미개발(un-development)” 및 “미출시(un-release)” 일정에 대해 설명합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/404/",
        "teaser": null
      },{
        "title": "[Final] PEP 405 - Python Virtual Environments",
        "excerpt":"원문 링크: PEP 405 - Python Virtual Environments 상태: Final 유형: Standards Track 작성일: 13-Jun-2011 PEP 405 – Python 가상 환경 이 문서는 Python 3.3에 도입된 내장 가상 환경(venv) 메커니즘을 설명하는 PEP 405에 대한 한국어 번역 및 요약입니다. 이 PEP는 기존 서드파티 가상 환경 도구의 한계를 극복하고, Python 자체에 경량의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/405/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 406 - Improved Encapsulation of Import State",
        "excerpt":"원문 링크: PEP 406 - Improved Encapsulation of Import State 상태: Withdrawn 유형: Standards Track 작성일: 04-Jul-2011 PEP 406 – Import 상태의 캡슐화 개선 상태: Withdrawn (철회됨) 유형: Standards Track 작성자: Alyssa Coghlan, Greg Slodkowicz 생성일: 2011년 7월 4일 Python 버전: 3.4 최종 수정일: 2025년 2월 1일 초록 (Abstract) 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/406/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 407 - New release cycle and introducing long-term support versions",
        "excerpt":"원문 링크: PEP 407 - New release cycle and introducing long-term support versions 상태: Deferred 유형: Process 작성일: 12-Jan-2012 PEP 407 – 새로운 릴리스 주기 및 장기 지원 버전 도입 작성자: Antoine Pitrou, Georg Brandl, Barry Warsaw 상태: 보류됨 (Deferred) 유형: Process 생성일: 2012년 1월 12일 최종 수정일: 2025년 2월...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/407/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 408 - Standard library __preview__ package",
        "excerpt":"원문 링크: PEP 408 - Standard library preview package 상태: Rejected 유형: Standards Track 작성일: 07-Jan-2012 PEP 408 – 표준 라이브러리 __preview__ 패키지 작성자: Alyssa Coghlan, Eli Bendersky 상태: Rejected (거부됨) 유형: Standards Track (표준 트랙) 생성일: 2012년 1월 7일 Python 버전: 3.3 해결: Python-Dev 메시지 요약 (Abstract) 새로운 모듈을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/408/",
        "teaser": null
      },{
        "title": "[Final] PEP 409 - Suppressing exception context",
        "excerpt":"원문 링크: PEP 409 - Suppressing exception context 상태: Final 유형: Standards Track 작성일: 26-Jan-2012 PEP 409 – 예외 컨텍스트 억제 (Suppressing exception context) 개요 (Abstract) PEP 3134의 미해결 문제 중 하나는 예외 컨텍스트를 억제하는 방법에 대한 것이었습니다. 현재는 이를 수행할 방법이 없으며, 이 PEP는 그 해결책을 제안합니다. 배경 (Rationale)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/409/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 410 - Use decimal.Decimal type for timestamps",
        "excerpt":"원문 링크: PEP 410 - Use decimal.Decimal type for timestamps 상태: Rejected 유형: Standards Track 작성일: 01-Feb-2012 PEP 410 – 타임스탬프에 decimal.Decimal 타입 사용 작성자: Victor Stinner 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2012년 2월 1일 Python 버전: 3.3 해결: Python-Dev 메일링 리스트 메시지 거부 고지 (Rejection Notice) 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/410/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 411 - Provisional packages in the Python standard library",
        "excerpt":"원문 링크: PEP 411 - Provisional packages in the Python standard library 상태: Superseded 유형: Informational 작성일: 10-Feb-2012 PEP 411 – Python 표준 라이브러리의 잠정적(Provisional) 패키지 작성자: Alyssa Coghlan, Eli Bendersky 상태: Superseded (대체됨) 유형: Informational (정보 제공) 생성일: 2012년 2월 10일 Python 버전: 3.3 중요 알림 (Note) 이 PEP는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/411/",
        "teaser": null
      },{
        "title": "[Final] PEP 412 - Key-Sharing Dictionary",
        "excerpt":"원문 링크: PEP 412 - Key-Sharing Dictionary 상태: Final 유형: Standards Track 작성일: 08-Feb-2012 PEP 412 – 키 공유 딕셔너리 (Key-Sharing Dictionary) 개요 (Abstract) 이 PEP는 파이썬 내장 딕셔너리 타입인 dict의 구현 변경을 제안합니다. 새로운 구현은 객체의 속성 딕셔너리(예: 객체의 __dict__ 속성)로 사용되는 딕셔너리들이 동일한 클래스의 다른 인스턴스들의 속성 딕셔너리와...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/412/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 413 - Faster evolution of the Python Standard Library",
        "excerpt":"원문 링크: PEP 413 - Faster evolution of the Python Standard Library 상태: Withdrawn 유형: Process 작성일: 24-Feb-2012 PEP 413 – Python 표준 라이브러리의 더 빠른 발전 (철회됨) 작성자: Alyssa Coghlan 상태: 철회됨 (Withdrawn) 유형: Process 생성일: 2012년 2월 24일 PEP 철회 (PEP Withdrawal) PEP 413은 제안되었으나, 결국 철회되었습니다. 철회된...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/413/",
        "teaser": null
      },{
        "title": "[Final] PEP 414 - Explicit Unicode Literal for Python 3.3",
        "excerpt":"원문 링크: PEP 414 - Explicit Unicode Literal for Python 3.3 상태: Final 유형: Standards Track 작성일: 15-Feb-2012 PEP 414 – Python 3.3을 위한 명시적 유니코드 리터럴 작성자: Armin Ronacher, Alyssa Coghlan 상태: Final (최종) 유형: Standards Track 생성일: 2012년 2월 15일 Python 버전: 3.3 결정: Python-Dev 메시지 개요 (Abstract)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/414/",
        "teaser": null
      },{
        "title": "[Final] PEP 415 - Implement context suppression with exception attributes",
        "excerpt":"원문 링크: PEP 415 - Implement context suppression with exception attributes 상태: Final 유형: Standards Track 작성일: 26-Feb-2012 PEP 0415: 예외 속성을 이용한 컨텍스트 억제 구현 개요 (Abstract) PEP 0415는 raise exc from None 구문을 통해 예외 컨텍스트 표시를 명시적으로 억제할 수 있도록 PEP 0409에서 도입된 언어 수준의 변경 사항을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/415/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 416 - Add a frozendict builtin type",
        "excerpt":"원문 링크: PEP 416 - Add a frozendict builtin type 상태: Rejected 유형: Standards Track 작성일: 29-Feb-2012 파이썬 PEP 416: frozendict 내장 타입 추가 제안 (거부됨) 개요 이 문서는 PEP (Python Enhancement Proposal) 416의 내용을 한국어 사용자가 이해하기 쉽도록 번역하고 정리한 것입니다. PEP 416은 frozendict라는 새로운 내장 타입을 Python에 추가할...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/416/",
        "teaser": null
      },{
        "title": "[Final] PEP 417 - Including mock in the Standard Library",
        "excerpt":"원문 링크: PEP 417 - Including mock in the Standard Library 상태: Final 유형: Standards Track 작성일: 12-Mar-2012 PEP 417: mock 라이브러리의 표준 라이브러리 포함 작성자: Michael Foord 상태: Final (최종) 타입: Standards Track 생성일: 2012년 3월 12일 Python 버전: 3.3 결의: Python-Dev 메시지 초록 (Abstract) 이 PEP는 mock 테스팅...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/417/",
        "teaser": null
      },{
        "title": "[Final] PEP 418 - Add monotonic time, performance counter, and process time functions",
        "excerpt":"원문 링크: PEP 418 - Add monotonic time, performance counter, and process time functions 상태: Final 유형: Standards Track 작성일: 26-Mar-2012 PEP 418 – 단조 증가 시간, 성능 카운터 및 프로세스 시간 함수 추가 요약 (Abstract) 이 PEP는 Python 3.3에 time.get_clock_info(name), time.monotonic(), time.perf_counter(), time.process_time() 함수를 추가할 것을 제안합니다. 배경 (Rationale)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/418/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 419 - Protecting cleanup statements from interruptions",
        "excerpt":"원문 링크: PEP 419 - Protecting cleanup statements from interruptions 상태: Deferred 유형: Standards Track 작성일: 06-Apr-2012 파이썬 PEP 419: 정리 코드 블록 보호 요약 (Abstract) 이 PEP는 finally 절 또는 Context Manager (컨텍스트 관리자)의 정리 과정 중에 Python 코드가 KeyboardInterrupt나 GeneratorExit와 같은 인터럽트(방해)로부터 보호될 수 있는 방법을 제안합니다. PEP...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/419/",
        "teaser": null
      },{
        "title": "[Final] PEP 420 - Implicit Namespace Packages",
        "excerpt":"원문 링크: PEP 420 - Implicit Namespace Packages 상태: Final 유형: Standards Track 작성일: 19-Apr-2012 PEP 420 – 암시적 네임스페이스 패키지 (Implicit Namespace Packages) 번역 및 요약 초록 (Abstract) PEP 420은 단일 Python 패키지를 디스크상의 여러 디렉토리에 분할할 수 있는 네임스페이스 패키지 (Namespace packages)의 새로운 메커니즘을 제안합니다. 이전 Python 버전에서는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/420/",
        "teaser": null
      },{
        "title": "[Final] PEP 421 - Adding sys.implementation",
        "excerpt":"원문 링크: PEP 421 - Adding sys.implementation 상태: Final 유형: Standards Track 작성일: 26-Apr-2012 PEP 421 – sys.implementation 추가 개요 이 PEP (Python Enhancement Proposal)는 sys 모듈에 새로운 속성인 sys.implementation을 도입합니다. 이 속성은 현재 실행 중인 인터프리터 구현에 대한 통합된 정보를 담고 있습니다. 따라서 sys.implementation은 표준 라이브러리가 구현별 정보를 찾아볼...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/421/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 422 - Simpler customisation of class creation",
        "excerpt":"원문 링크: PEP 422 - Simpler customisation of class creation 상태: Withdrawn 유형: Standards Track 작성일: 05-Jun-2012 The provided document is PEP 422 – “Simpler customisation of class creation”. 참고: 이 PEP는 PEP 487이 더 간단하고 사용하기 쉬운 __init_subclass__ 훅을 통해 동일한 목표를 달성하므로 현재 철회(Withdrawn)된 상태입니다. PEP 422: 클래스...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/422/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 423 - Naming conventions and recipes related to packaging",
        "excerpt":"원문 링크: PEP 423 - Naming conventions and recipes related to packaging 상태: Deferred 유형: Informational 작성일: 24-May-2012 PEP 423은 파이썬 프로젝트, 패키지, 모듈, 그리고 네임스페이스 패키지의 이름 지정 규칙과 관련하여 배포 작성자들을 위한 가이드라인과 노하우를 제공합니다. 이 PEP는 원래 연기(Deferred)되었으며, PEP 426 (패키지 메타데이터 2.0) 및 관련 업데이트가 해결된...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/423/",
        "teaser": null
      },{
        "title": "[Final] PEP 424 - A method for exposing a length hint",
        "excerpt":"원문 링크: PEP 424 - A method for exposing a length hint 상태: Final 유형: Standards Track 작성일: 14-Jul-2012 PEP 424 – 길이 힌트 노출을 위한 메서드 저자: Alex Gaynor 상태: Final (최종) 유형: Standards Track (표준 추적) 생성일: 2012년 7월 14일 Python 버전: 3.4 수정 이력: 2012년 7월 15일...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/424/",
        "teaser": null
      },{
        "title": "[Final] PEP 425 - Compatibility Tags for Built Distributions",
        "excerpt":"원문 링크: PEP 425 - Compatibility Tags for Built Distributions 상태: Final 유형: Standards Track 작성일: 27-Jul-2012 PEP 425 – 빌드된 배포판을 위한 호환성 태그 (Compatibility Tags for Built Distributions) 개요 이 문서는 Python 패키징에서 빌드된 (또는 바이너리) 배포판이 어떤 Python 버전과 호환되는지 나타내기 위한 태그 시스템을 정의합니다. 이 시스템은...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/425/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 426 - Metadata for Python Software Packages 2.0",
        "excerpt":"원문 링크: PEP 426 - Metadata for Python Software Packages 2.0 상태: Withdrawn 유형: Informational 작성일: 30-Aug-2012 PEP 426 – Python 소프트웨어 패키지 메타데이터 2.0 (Metadata for Python Software Packages 2.0) 참고: 이 PEP는 철회된(Withdrawn) 문서이며, 현재는 역사적 문서(Historical Document)입니다. 제안된 메타데이터 재설계는 PEP 566으로 대체되었습니다. 초록 (Abstract) 이 PEP는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/426/",
        "teaser": null
      },{
        "title": "[Final] PEP 427 - The Wheel Binary Package Format 1.0",
        "excerpt":"원문 링크: PEP 427 - The Wheel Binary Package Format 1.0 상태: Final 유형: Standards Track 작성일: 20-Sep-2012 PEP 427: Wheel 이진 패키지 형식 1.0 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 “wheel”이라는 이름의 Python 빌드-패키지(built-package) 형식에 대해 설명합니다. Wheel은 특별한 파일 이름 형식을 가지며 .whl 확장자를 사용하는 ZIP 형식의 아카이브입니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/427/",
        "teaser": null
      },{
        "title": "[Final] PEP 428 - The pathlib module – object-oriented filesystem paths",
        "excerpt":"원문 링크: PEP 428 - The pathlib module – object-oriented filesystem paths 상태: Final 유형: Standards Track 작성일: 30-Jul-2012 PEP 428은 pathlib 모듈을 표준 라이브러리에 포함할 것을 제안합니다. 이 모듈의 목표는 파일 시스템 경로와 관련된 일반적인 작업을 처리하기 위한 간단한 클래스 계층을 제공하는 것입니다. 개요 기존 os.path 모듈이 문자열 기반으로...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/428/",
        "teaser": null
      },{
        "title": "[Final] PEP 429 - Python 3.4 Release Schedule",
        "excerpt":"원문 링크: PEP 429 - Python 3.4 Release Schedule 상태: Final 유형: Informational 작성일: 17-Oct-2012 PEP 429 – Python 3.4 릴리스 스케줄 이 문서는 Python 3.4의 개발 및 릴리스 스케줄을 설명하며, 주로 PEP (Python Enhancement Proposal) 규모의 항목들에 초점을 맞춥니다. 문서 정보: 작성자: Larry Hastings 상태: Final (최종) 유형: Informational...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/429/",
        "teaser": null
      },{
        "title": "[Final] PEP 430 - Migrating to Python 3 as the default online documentation",
        "excerpt":"원문 링크: PEP 430 - Migrating to Python 3 as the default online documentation 상태: Final 유형: Informational 작성일: 27-Oct-2012 PEP 430은 docs.python.org에서 제공되는 Python 온라인 문서의 기본 버전을 Python 2.7에서 Python 3.3으로 마이그레이션하기 위한 전략을 제안합니다. 이 PEP는 기존 Python 2 문서로 향하는 딥 링크(deep links)의 의미를 유지하면서도, 기본적으로...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/430/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 431 - Time zone support improvements",
        "excerpt":"원문 링크: PEP 431 - Time zone support improvements 상태: Superseded 유형: Standards Track 작성일: 11-Dec-2012 PEP 431 – 시간대 지원 개선 개요 (Abstract) 이 PEP는 Python 표준 라이브러리에 구체적인 시간대 지원을 구현하고, 일광 절약 시간(DST) 변경 시 모호한 시간 지정을 처리하기 위한 시간대 API 개선을 제안했습니다. 철회 (Withdrawal) PEP...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/431/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 432 - Restructuring the CPython startup sequence",
        "excerpt":"원문 링크: PEP 432 - Restructuring the CPython startup sequence 상태: Withdrawn 유형: Standards Track 작성일: 28-Dec-2012 PEP 432 – CPython 시작 시퀀스 재구성 개요 이 문서는 CPython 인터프리터의 시작 시퀀스를 재구성하여, 참조 인터프리터 실행 파일의 초기화 동작을 수정하고, 더 큰 애플리케이션에 Python 실행 엔진으로 CPython을 임베딩할 때 시작 동작을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/432/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 433 - Easier suppression of file descriptor inheritance",
        "excerpt":"원문 링크: PEP 433 - Easier suppression of file descriptor inheritance 상태: Superseded 유형: Standards Track 작성일: 10-Jan-2013 PEP 433 – 파일 디스크립터 상속을 더 쉽게 억제하기 (Easier suppression of file descriptor inheritance) 작성자: Victor Stinner 상태: Superseded (폐기됨 - PEP 446으로 대체됨) 유형: Standards Track 생성일: 2013년 1월 10일...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/433/",
        "teaser": null
      },{
        "title": "[Active] PEP 434 - IDLE Enhancement Exception for All Branches",
        "excerpt":"원문 링크: PEP 434 - IDLE Enhancement Exception for All Branches 상태: Active 유형: Informational 작성일: 16-Feb-2013 PEP 434 – 모든 브랜치에 대한 IDLE 향상 기능 예외 작성자: Todd Rovito, Terry Reedy BDFL 위임자 (BDFL-Delegate): Alyssa Coghlan 상태: Active (활성) 유형: Informational (정보 제공) 생성일: 2013년 2월 16일 해결: Python-Dev...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/434/",
        "teaser": null
      },{
        "title": "[Final] PEP 435 - Adding an Enum type to the Python standard library",
        "excerpt":"원문 링크: PEP 435 - Adding an Enum type to the Python standard library 상태: Final 유형: Standards Track 작성일: 23-Feb-2013 PEP 435 – Python 표준 라이브러리에 Enum 타입 추가 요약 (Abstract) 이 PEP는 Python 표준 라이브러리에 열거형(enumeration type)을 추가할 것을 제안합니다. 열거형은 고유하고 상수적인 값에 바인딩된 심볼릭 이름의 집합입니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/435/",
        "teaser": null
      },{
        "title": "[Final] PEP 436 - The Argument Clinic DSL",
        "excerpt":"원문 링크: PEP 436 - The Argument Clinic DSL 상태: Final 유형: Standards Track 작성일: 22-Feb-2013 다음은 PEP 436 – The Argument Clinic DSL 문서의 번역 및 요약입니다. 이 문서는 CPython 구현에서 내장 함수(built-in function)의 인자 처리를 용이하게 하기 위한 DSL(Domain Specific Language)인 “Argument Clinic”을 제안합니다. PEP 436 – The...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/436/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 437 - A DSL for specifying signatures, annotations and argument converters",
        "excerpt":"원문 링크: PEP 437 - A DSL for specifying signatures, annotations and argument converters 상태: Rejected 유형: Standards Track 작성일: 11-Mar-2013 PEP 437 – 시그니처, 어노테이션 및 인자 컨버터 지정을 위한 DSL 작성자: Stefan Krah 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2013년 3월 11일 Python 버전: 3.4 해결: Guido...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/437/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 438 - Transitioning to release-file hosting on PyPI",
        "excerpt":"원문 링크: PEP 438 - Transitioning to release-file hosting on PyPI 상태: Superseded 유형: Process 작성일: 15-Mar-2013 PEP 438 – PyPI에서 릴리스 파일 호스팅으로의 전환 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 pypi.python.org(PyPI) 패키지 인덱스에서 패키지를 설치하는 과정을 더 빠르고, 간단하며, 견고하게 만들기 위한 하위 호환성을 유지하는 2단계 전환 프로세스를 제안합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/438/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 439 - Inclusion of implicit pip bootstrap in Python installation",
        "excerpt":"원문 링크: PEP 439 - Inclusion of implicit pip bootstrap in Python installation 상태: Rejected 유형: Standards Track 작성일: 18-Mar-2013 PEP 439 – Python 설치 시 암묵적인 pip 부트스트랩 포함 요약 (Abstract) 이 PEP는 Python 사용자들이 서드파티 (3rd-party) 모듈을 더 쉽게 사용할 수 있도록, Python 설치 과정에 pip 부트스트랩 실행...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/439/",
        "teaser": null
      },{
        "title": "[Final] PEP 440 - Version Identification and Dependency Specification",
        "excerpt":"원문 링크: PEP 440 - Version Identification and Dependency Specification 상태: Final 유형: Standards Track 작성일: 18-Mar-2013 PEP 440 – 버전 식별 및 의존성 명세 (Version Identification and Dependency Specification) 개요 (Abstract) 이 PEP는 Python 소프트웨어 배포판의 버전을 식별하고 특정 버전에 대한 의존성을 선언하는 표준화된 체계를 설명합니다. 이 문서는 이전...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/440/",
        "teaser": null
      },{
        "title": "[Final] PEP 441 - Improving Python ZIP Application Support",
        "excerpt":"원문 링크: PEP 441 - Improving Python ZIP Application Support 상태: Final 유형: Standards Track 작성일: 30-Mar-2013 PEP 441 – Python ZIP 애플리케이션 지원 개선 이 문서는 Python 3.5 버전에서 도입된 PEP 441의 주요 내용을 한국어 사용자들이 이해하기 쉽게 번역하고 설명합니다. 이 PEP는 Python ZIP 애플리케이션의 지원을 개선하고, 이를 더...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/441/",
        "teaser": null
      },{
        "title": "[Final] PEP 442 - Safe object finalization",
        "excerpt":"원문 링크: PEP 442 - Safe object finalization 상태: Final 유형: Standards Track 작성일: 18-May-2013 파이썬 개발자를 위한 PEP 442 – 안전한 객체 마무리 (Safe Object Finalization) 요약 (Abstract) 이 PEP(Python Enhancement Proposal)는 현재 Python의 객체 마무리(finalization) 기능이 가진 한계를 다루는 것을 목표로 합니다. 그 목적은 객체 그래프(object graph) 내에서의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/442/",
        "teaser": null
      },{
        "title": "[Final] PEP 443 - Single-dispatch generic functions",
        "excerpt":"원문 링크: PEP 443 - Single-dispatch generic functions 상태: Final 유형: Standards Track 작성일: 22-May-2013 PEP 443: Single-dispatch Generic Functions 개요 (Abstract) 이 PEP는 functools 표준 라이브러리 모듈에 “단일 디스패치 제네릭 함수(single-dispatch generic functions)”라고 알려진 간단한 형태의 제네릭 프로그래밍을 제공하는 새로운 메커니즘을 제안합니다. 제네릭 함수(Generic function)는 서로 다른 타입(type)에 대해...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/443/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 444 - Python Web3 Interface",
        "excerpt":"원문 링크: PEP 444 - Python Web3 Interface 상태: Deferred 유형: Informational 작성일: 19-Jul-2010 PEP 444 – Python Web3 인터페이스 저자: Chris McDonough, Armin Ronacher 논의: Web-SIG list 상태: 연기됨 (Deferred) 유형: 정보 제공 (Informational) 생성일: 2010년 7월 19일 요약 (Abstract) 이 문서는 웹 서버와 Python 웹 애플리케이션 또는 프레임워크...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/444/",
        "teaser": null
      },{
        "title": "[Final] PEP 445 - Add new APIs to customize Python memory allocators",
        "excerpt":"원문 링크: PEP 445 - Add new APIs to customize Python memory allocators 상태: Final 유형: Standards Track 작성일: 15-Jun-2013 PEP 445 – Python 메모리 할당자 사용자 정의를 위한 새로운 API 추가 개요 이 PEP는 Python 메모리 할당자를 사용자 정의하기 위한 새로운 애플리케이션 프로그래밍 인터페이스(API)를 제안합니다. 이 PEP를 준수해야 하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/445/",
        "teaser": null
      },{
        "title": "[Final] PEP 446 - Make newly created file descriptors non-inheritable",
        "excerpt":"원문 링크: PEP 446 - Make newly created file descriptors non-inheritable 상태: Final 유형: Standards Track 작성일: 05-Aug-2013 PEP 446: 새로 생성되는 파일 디스크립터를 기본적으로 비상속으로 만들기 요약 (Abstract) 자식 프로세스로 파일 디스크립터가 누출(leaking)되는 것은 다양한 문제를 야기하며, 주요 보안 취약점으로 알려져 있습니다. subprocess 모듈에서 close_fds=True 매개변수를 사용하는 것이 모든...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/446/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 447 - Add __getdescriptor__ method to metaclass",
        "excerpt":"원문 링크: PEP 447 - Add getdescriptor method to metaclass 상태: Deferred 유형: Standards Track 작성일: 12-Jun-2013 PEP 447 – 메타클래스(Metaclass)에 __getdescriptor__ 메서드 추가 제안 작성자: Ronald Oussoren 상태: 연기됨 (Deferred) 유형: 표준 트랙 (Standards Track) 생성일: 2013년 6월 12일 요약 (Abstract) 현재 object.__getattribute__ 및 super.__getattribute__는 속성(attribute)을 찾을 때 MRO(Method...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/447/",
        "teaser": null
      },{
        "title": "[Final] PEP 448 - Additional Unpacking Generalizations",
        "excerpt":"원문 링크: PEP 448 - Additional Unpacking Generalizations 상태: Final 유형: Standards Track 작성일: 29-Jun-2013 PEP 448 – 추가적인 언패킹 일반화 (Additional Unpacking Generalizations) 요약 (Abstract) 이 PEP(Python Enhancement Proposal)는 * 이터러블 언패킹(iterable unpacking) 연산자와 ** 딕셔너리 언패킹(dictionary unpacking) 연산자의 확장된 사용법을 제안합니다. 이를 통해 더 많은 위치에서, 임의의 횟수로...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/448/",
        "teaser": null
      },{
        "title": "[Final] PEP 449 - Removal of the PyPI Mirror Auto Discovery and Naming Scheme",
        "excerpt":"원문 링크: PEP 449 - Removal of the PyPI Mirror Auto Discovery and Naming Scheme 상태: Final 유형: Process 작성일: 04-Aug-2013 PEP 449는 PyPI (Python Package Index) 미러의 자동 검색 및 명명 체계를 제거하기 위한 제안입니다. 이 PEP는 기존 미러링 인프라의 보안 취약점과 현대 PyPI CDN (콘텐츠 전송 네트워크)의 발전으로...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/449/",
        "teaser": null
      },{
        "title": "[Final] PEP 450 - Adding A Statistics Module To The Standard Library",
        "excerpt":"원문 링크: PEP 450 - Adding A Statistics Module To The Standard Library 상태: Final 유형: Standards Track 작성일: 01-Aug-2013 PEP 450 – 표준 라이브러리에 통계 모듈 추가 작성자: Steven D’Aprano 상태: Final 유형: Standards Track 생성일: 2013년 8월 1일 Python 버전: 3.4 요약 (Abstract) 이 PEP는 Python 표준 라이브러리에...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/450/",
        "teaser": null
      },{
        "title": "[Final] PEP 451 - A ModuleSpec Type for the Import System",
        "excerpt":"원문 링크: PEP 451 - A ModuleSpec Type for the Import System 상태: Final 유형: Standards Track 작성일: 08-Aug-2013 PEP 451 – Import 시스템을 위한 ModuleSpec 타입 작성자: Eric Snow BDFL-Delegate: Brett Cannon, Alyssa Coghlan 토론: Import-SIG list 상태: Final (최종) 유형: Standards Track (표준 트랙) 생성일: 2013년 8월 8일...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/451/",
        "teaser": null
      },{
        "title": "[Final] PEP 452 - API for Cryptographic Hash Functions v2.0",
        "excerpt":"원문 링크: PEP 452 - API for Cryptographic Hash Functions v2.0 상태: Final 유형: Informational 작성일: 15-Aug-2013 PEP 452 – 암호화 해시 함수용 API v2.0 번역 및 정리 개요 (Abstract) MD5 또는 SHA와 같은 암호화 해싱 알고리즘을 구현하는 여러 모듈이 존재합니다. 이 PEP는 이러한 알고리즘들을 위한 표준 API를 지정하여, 여러...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/452/",
        "teaser": null
      },{
        "title": "[Final] PEP 453 - Explicit bootstrapping of pip in Python installations",
        "excerpt":"원문 링크: PEP 453 - Explicit bootstrapping of pip in Python installations 상태: Final 유형: Standards Track 작성일: 10-Aug-2013 파이썬 PEP 0453은 “Explicit bootstrapping of pip in Python installations”이라는 제목의 제안서입니다. 이 PEP는 Python 3.4부터 pip를 Python 설치 시 기본으로 제공하도록 하고, pip를 Python 패키지 설치의 공식적인 기본 도구로 권장하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/453/",
        "teaser": null
      },{
        "title": "[Final] PEP 454 - Add a new tracemalloc module to trace Python memory allocations",
        "excerpt":"원문 링크: PEP 454 - Add a new tracemalloc module to trace Python memory allocations 상태: Final 유형: Standards Track 작성일: 03-Sep-2013 PEP 454 – Python 메모리 할당 추적을 위한 새로운 tracemalloc 모듈 추가 초록 (Abstract) 이 PEP는 Python에 의해 할당된 메모리 블록을 추적하기 위한 새로운 tracemalloc 모듈을 추가할 것을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/454/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 455 - Adding a key-transforming dictionary to collections",
        "excerpt":"원문 링크: PEP 455 - Adding a key-transforming dictionary to collections 상태: Rejected 유형: Standards Track 작성일: 13-Sep-2013 PEP 455 – collections 모듈에 키 변환 딕셔너리 추가 개요 (Abstract) 이 PEP는 collections 모듈을 위한 새로운 데이터 구조인 “TransformDict”를 제안합니다. TransformDict는 조회를 수행할 때 주어진 함수를 사용하여 키를 변환하지만, 값을 읽을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/455/",
        "teaser": null
      },{
        "title": "[Final] PEP 456 - Secure and interchangeable hash algorithm",
        "excerpt":"원문 링크: PEP 456 - Secure and interchangeable hash algorithm 상태: Final 유형: Standards Track 작성일: 27-Sep-2013 PEP 456 – 안전하고 상호 교환 가능한 해시 알고리즘 (Secure and interchangeable hash algorithm) 초록 (Abstract) 이 PEP는 해시 무작위화(hash randomization) 문제를 영구적으로 해결하기 위해 기본 문자열(string) 및 바이트(bytes) 해시 알고리즘으로 SipHash를 도입할...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/456/",
        "teaser": null
      },{
        "title": "[Final] PEP 457 - Notation For Positional-Only Parameters",
        "excerpt":"원문 링크: PEP 457 - Notation For Positional-Only Parameters 상태: Final 유형: Informational 작성일: 08-Oct-2013 PEP 457 – 위치 전용 매개변수 표기법 작성자: Larry Hastings 논의: Python-Dev list 상태: Final (최종) 유형: Informational (정보성) 생성일: 2013년 10월 8일 개요 (Overview) 이 PEP는 Python에서 위치 전용(positional-only) 매개변수를 위한 표기법을 제안합니다. 위치...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/457/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 458 - Secure PyPI downloads with signed repository metadata",
        "excerpt":"원문 링크: PEP 458 - Secure PyPI downloads with signed repository metadata 상태: Accepted 유형: Standards Track 작성일: 27-Sep-2013 PEP 458은 PyPI(Python Package Index) 다운로드의 보안 강화를 위한 제안서입니다. 이 PEP는 사용자가 PyPI에서 유효한 패키지를 다운로드할 수 있도록 PyPI 인프라에 필요한 변경 사항을 설명합니다. 특히, The Update Framework (TUF)를 PyPI에...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/458/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 459 - Standard Metadata Extensions for Python Software Packages",
        "excerpt":"원문 링크: PEP 459 - Standard Metadata Extensions for Python Software Packages 상태: Withdrawn 유형: Standards Track 작성일: 11-Nov-2013 PEP 459 – Python 소프트웨어 패키지를 위한 표준 메타데이터 확장 작성자: Alyssa Coghlan BDFL-Delegate: Alyssa Coghlan 논의처: Distutils-SIG list 상태: 철회됨 (Withdrawn) 유형: 표준 트랙 (Standards Track) 주제: 패키징 (Packaging) 요구사항:...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/459/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 460 - Add binary interpolation and formatting",
        "excerpt":"원문 링크: PEP 460 - Add binary interpolation and formatting 상태: Withdrawn 유형: Standards Track 작성일: 06-Jan-2014 PEP 460 – 바이너리 보간 및 포매팅 추가 (Add binary interpolation and formatting) 작성자: Antoine Pitrou 상태: 철회됨 (Withdrawn) 유형: Standards Track 생성일: 2014년 1월 6일 Python 버전: 3.5 초록 (Abstract) 이 PEP는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/460/",
        "teaser": null
      },{
        "title": "[Final] PEP 461 - Adding % formatting to bytes and bytearray",
        "excerpt":"원문 링크: PEP 461 - Adding % formatting to bytes and bytearray 상태: Final 유형: Standards Track 작성일: 13-Jan-2014 PEP 461: bytes 및 bytearray에 % 포매팅 추가 작성자: Ethan Furman 상태: Final (최종) 유형: Standards Track 생성일: 2014년 1월 13일 Python 버전: 3.5 해결: Python-Dev 메시지 요약 (Abstract) 이 PEP는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/461/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 462 - Core development workflow automation for CPython",
        "excerpt":"원문 링크: PEP 462 - Core development workflow automation for CPython 상태: Withdrawn 유형: Process 작성일: 23-Jan-2014 PEP 462 – CPython 핵심 개발 워크플로우 자동화 작성자: Alyssa Coghlan 상태: 철회됨 (Withdrawn) 유형: 프로세스 (Process) 생성일: 2014년 1월 23일 필요 PEP: 474 요약 (Abstract) 이 PEP는 CPython에 변경 사항을 통합하기 위해...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/462/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 463 - Exception-catching expressions",
        "excerpt":"원문 링크: PEP 463 - Exception-catching expressions 상태: Rejected 유형: Standards Track 작성일: 15-Feb-2014 PEP 463 – 예외 처리 표현식 (Exception-catching expressions) 번역 및 정리 개요 PEP 463은 표현식(expression) 내에서 예외(exception)를 처리할 수 있는 새로운 문법을 제안했습니다. 이는 PEP 308이 값 기반 조건(value-based conditions)을 표현식에 도입했던 것과 유사하게, 예외 기반...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/463/",
        "teaser": null
      },{
        "title": "[Final] PEP 464 - Removal of the PyPI Mirror Authenticity API",
        "excerpt":"원문 링크: PEP 464 - Removal of the PyPI Mirror Authenticity API 상태: Final 유형: Process 작성일: 02-Mar-2014 PEP 464 – PyPI 미러 인증 API 제거 요약 (Abstract) 이 PEP(Python Enhancement Proposal)는 PyPI(Python Package Index) 미러 인증 API의 사용 중단 및 제거를 제안합니다. 여기에는 /serverkey URL과 /serversig 하위의 모든 URL이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/464/",
        "teaser": null
      },{
        "title": "[Final] PEP 465 - A dedicated infix operator for matrix multiplication",
        "excerpt":"원문 링크: PEP 465 - A dedicated infix operator for matrix multiplication 상태: Final 유형: Standards Track 작성일: 20-Feb-2014 PEP 465: 행렬 곱셈을 위한 전용 중위(Infix) 연산자 @ 추가 제안 요약 이 PEP는 Python에 행렬 곱셈을 위한 새로운 이항(binary) 연산자 @를 도입할 것을 제안합니다. 이 연산자는 파이썬 3.5부터 도입되었습니다. 제안...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/465/",
        "teaser": null
      },{
        "title": "[Final] PEP 466 - Network Security Enhancements for Python 2.7.x",
        "excerpt":"원문 링크: PEP 466 - Network Security Enhancements for Python 2.7.x 상태: Final 유형: Standards Track 작성일: 23-Mar-2014 PEP 466 – Python 2.7.x의 네트워크 보안 강화 작성자: Alyssa Coghlan 상태: Final 유형: Standards Track 생성일: 2014년 3월 23일 Python 버전: 2.7.9 해결: Python-Dev 메시지 요약 (Abstract) 대부분의 CPython 트래커 이슈는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/466/",
        "teaser": null
      },{
        "title": "[Draft] PEP 467 - Minor API improvements for binary sequences",
        "excerpt":"원문 링크: PEP 467 - Minor API improvements for binary sequences 상태: Draft 유형: Standards Track 작성일: 30-Mar-2014 PEP 467 – 바이너리 시퀀스를 위한 사소한 API 개선 (Minor API improvements for binary sequences) 개요 (Abstract) 이 PEP는 bytes 및 bytearray 타입의 API에 작은 조정을 제안하여 바이너리 도메인(binary domain) 내에서 작업하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/467/",
        "teaser": null
      },{
        "title": "[Final] PEP 468 - Preserving the order of **kwargs in a function.",
        "excerpt":"원문 링크: PEP 468 - Preserving the order of **kwargs in a function. 상태: Final 유형: Standards Track 작성일: 05-Apr-2014 PEP 468 – 함수 내 **kwargs 순서 유지 개요 (Abstract) 함수 정의에서 **kwargs 구문은 다른 이름 있는 매개변수에 해당하지 않는 모든 키워드 인자(keyword arguments)를 수집하도록 인터프리터에 지시합니다. 그러나 Python은 수집된...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/468/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 469 - Migration of dict iteration code to Python 3",
        "excerpt":"원문 링크: PEP 469 - Migration of dict iteration code to Python 3 상태: Withdrawn 유형: Standards Track 작성일: 18-Apr-2014 PEP 469 – Python 3로의 dict 순회(Iteration) 코드 마이그레이션 저자: Alyssa Coghlan 상태: 철회됨 (Withdrawn) 유형: Standards Track 작성일: 2014년 4월 18일 Python 버전: 3.5 초록 (Abstract) Python 3에서는 PEP...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/469/",
        "teaser": null
      },{
        "title": "[Final] PEP 470 - Removing External Hosting Support on PyPI",
        "excerpt":"원문 링크: PEP 470 - Removing External Hosting Support on PyPI 상태: Final 유형: Process 작성일: 12-May-2014 PEP 470 – PyPI 외부 호스팅 지원 제거 초록 (Abstract) PEP 470은 PyPI(Python Package Index) 외부에서 파일을 호스팅하는 기능과 PEP 438에 의해 추가되었던 rel 정보(링크 분류) 및 메타 태그(API 버전 표시) 기능을 더...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/470/",
        "teaser": null
      },{
        "title": "[Final] PEP 471 - os.scandir() function – a better and faster directory iterator",
        "excerpt":"원문 링크: PEP 471 - os.scandir() function – a better and faster directory iterator 상태: Final 유형: Standards Track 작성일: 30-May-2014 다음은 PEP 471 – os.scandir() 함수 – 더 좋고 빠른 디렉토리 이터레이터에 대한 번역 및 요약입니다. 이 PEP는 Python 3.5에 os.scandir() 함수를 표준 라이브러리에 추가하여 디렉토리 순회 성능을 크게...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/471/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 472 - Support for indexing with keyword arguments",
        "excerpt":"원문 링크: PEP 472 - Support for indexing with keyword arguments 상태: Rejected 유형: Standards Track 작성일: 24-Jun-2014 PEP 472 – 키워드 인수를 사용한 인덱싱 지원 (Rejected) 작성자: Stefano Borini, Joseph Martinot-Lagarde 논의 채널: Python-Ideas list 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2014년 6월 24일 Python 버전: 3.6 최종...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/472/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 473 - Adding structured data to built-in exceptions",
        "excerpt":"원문 링크: PEP 473 - Adding structured data to built-in exceptions 상태: Rejected 유형: Standards Track 작성일: 29-Mar-2014 PEP 473 – 내장 예외에 구조화된 데이터 추가 작성자: Sebastian Kreft 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2014년 3월 29일 요약 (Abstract) AttributeError, IndexError, KeyError, LookupError, NameError, TypeError, ValueError와 같은 예외(Exception)들은...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/473/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 474 - Creating forge.python.org",
        "excerpt":"원문 링크: PEP 474 - Creating forge.python.org 상태: Withdrawn 유형: Process 작성일: 19-Jul-2014 PEP 474 – forge.python.org 생성 개요 이 PEP (Python Enhancement Proposal)는 새로운 PSF(Python Software Foundation) 제공 리소스인 forge.python.org를 설정하여, 새로운 기여자(contributor)들이 더 쉽게 접근하고, 핵심 개발자(core developer)들이 관리하기 더 용이한 방식으로 다양한 지원 저장소(supporting repositories) (예: Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/474/",
        "teaser": null
      },{
        "title": "[Final] PEP 475 - Retry system calls failing with EINTR",
        "excerpt":"원문 링크: PEP 475 - Retry system calls failing with EINTR 상태: Final 유형: Standards Track 작성일: 29-Jul-2014 PEP 475 – EINTR 오류로 실패하는 시스템 호출 재시도 초록 (Abstract) 표준 라이브러리에서 제공하는 시스템 호출 래퍼(wrapper)는 EINTR 오류로 실패할 경우 자동으로 재시도해야 합니다. 이는 애플리케이션 코드에서 이러한 재시도 로직을 직접 처리해야...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/475/",
        "teaser": null
      },{
        "title": "[Final] PEP 476 - Enabling certificate verification by default for stdlib http clients",
        "excerpt":"원문 링크: PEP 476 - Enabling certificate verification by default for stdlib http clients 상태: Final 유형: Standards Track 작성일: 28-Aug-2014 PEP 476 – stdlib HTTP 클라이언트에 기본적으로 인증서 검증 활성화 초록 (Abstract) 현재 Python 표준 라이브러리의 HTTP 클라이언트(urllib, urllib2, http, httplib 모듈)는 https:// URL을 처리할 때 TLS 스트림을 사용하지만,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/476/",
        "teaser": null
      },{
        "title": "[Final] PEP 477 - Backport ensurepip (PEP 453) to Python 2.7",
        "excerpt":"원문 링크: PEP 477 - Backport ensurepip (PEP 453) to Python 2.7 상태: Final 유형: Standards Track 작성일: 26-Aug-2014 PEP 477 – Python 2.7에 ensurepip (PEP 453) 백포트 개요 이 문서는 PEP 453에 의해 Python 3.4에 추가된 ensurepip 모듈을 Python 2.7 버전으로 백포트(backport)할 것을 제안합니다. 또한, Python 2.7 Windows 및...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/477/",
        "teaser": null
      },{
        "title": "[Final] PEP 478 - Python 3.5 Release Schedule",
        "excerpt":"원문 링크: PEP 478 - Python 3.5 Release Schedule 상태: Final 유형: Informational 작성일: 22-Sep-2014 PEP 478 – Python 3.5 릴리스 일정 이 문서는 Python 3.5의 개발 및 릴리스 일정에 대해 설명하며, 주로 PEP(Python Enhancement Proposal)에 해당하는 주요 항목들을 다룹니다. 초록 (Abstract) 이 문서는 Python 3.5의 개발 및 릴리스 일정을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/478/",
        "teaser": null
      },{
        "title": "[Final] PEP 479 - Change StopIteration handling inside generators",
        "excerpt":"원문 링크: PEP 479 - Change StopIteration handling inside generators 상태: Final 유형: Standards Track 작성일: 15-Nov-2014 PEP 479 – 제너레이터 내 StopIteration 처리 방식 변경 제안 작성자: Chris Angelico, Guido van Rossum 상태: Final (최종) 유형: Standards Track 생성일: 2014년 11월 15일 Python 버전: 3.5 요약 이 PEP는 제너레이터에...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/479/",
        "teaser": null
      },{
        "title": "[Draft] PEP 480 - Surviving a Compromise of PyPI: End-to-end signing of packages",
        "excerpt":"원문 링크: PEP 480 - Surviving a Compromise of PyPI: End-to-end signing of packages 상태: Draft 유형: Standards Track 작성일: 08-Oct-2014 PEP 480 – PyPI 침해로부터 생존: 패키지의 종단 간 서명 (End-to-end signing of packages) 초록 (Abstract) 이 PEP는 종단 간 서명(end-to-end signing)과 최대 보안 모델(maximum security model)을 지원하기 위한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/480/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 481 - Migrate CPython to Git, Github, and Phabricator",
        "excerpt":"원문 링크: PEP 481 - Migrate CPython to Git, Github, and Phabricator 상태: Withdrawn 유형: Process 작성일: 29-Nov-2014 PEP 481: CPython을 Git, GitHub, Phabricator로 이전하기 작성자: Donald Stufft 상태: 철회됨 (Withdrawn) 유형: 프로세스 (Process) 생성일: 2014년 11월 29일 요약 (Abstract) 참고: 이 PEP는 철회되었으며, GitHub로의 이전 과정을 문서화한 PEP는 PEP...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/481/",
        "teaser": null
      },{
        "title": "[Final] PEP 482 - Literature Overview for Type Hints",
        "excerpt":"원문 링크: PEP 482 - Literature Overview for Type Hints 상태: Final 유형: Informational 작성일: 08-Jan-2015 PEP 482 – 타입 힌트에 대한 문헌 개요 초록 (Abstract) 이 PEP는 타입 힌트 (Type Hinting)와 관련된 세 가지 PEP 중 하나입니다. 이 문서 (PEP 482)는 관련 연구에 대한 문헌 개요를 제공합니다. 주요 사양은...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/482/",
        "teaser": null
      },{
        "title": "[Final] PEP 483 - The Theory of Type Hints",
        "excerpt":"원문 링크: PEP 483 - The Theory of Type Hints 상태: Final 유형: Informational 작성일: 19-Dec-2014 PEP 483 – 타입 힌트의 이론 (The Theory of Type Hints) 개요 (Abstract) 이 PEP는 PEP 484에서 참조되는 타입 이론을 설명합니다. 서론 (Introduction) 이 문서는 Python 3.5를 위한 새로운 타입 힌트 제안의 이론적 배경을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/483/",
        "teaser": null
      },{
        "title": "[Final] PEP 484 - Type Hints",
        "excerpt":"원문 링크: PEP 484 - Type Hints 상태: Final 유형: Standards Track 작성일: 29-Sep-2014 PEP 484 – 타입 힌트 (Type Hints) 한국어 번역 및 정리 개요 PEP 3107은 함수 어노테이션(function annotations)을 위한 문법을 도입했지만, 그 의미는 의도적으로 정의되지 않은 채로 남겨두었습니다. 이제 정적 타입 분석을 위한 서드파티(3rd party) 사용이 충분히...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/484/",
        "teaser": null
      },{
        "title": "[Final] PEP 485 - A Function for testing approximate equality",
        "excerpt":"원문 링크: PEP 485 - A Function for testing approximate equality 상태: Final 유형: Standards Track 작성일: 20-Jan-2015 PEP 485 – 근사치 동등성 테스트 함수 초록 (Abstract) 이 PEP는 두 값이 서로 근사적으로 같거나 “가까운”지 여부를 판단하는 isclose() 함수를 표준 라이브러리의 math 모듈에 추가할 것을 제안합니다. 배경 (Rationale) 부동 소수점...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/485/",
        "teaser": null
      },{
        "title": "[Final] PEP 486 - Make the Python Launcher aware of virtual environments",
        "excerpt":"원문 링크: PEP 486 - Make the Python Launcher aware of virtual environments 상태: Final 유형: Standards Track 작성일: 12-Feb-2015 작성자: Paul Moore 상태: 최종 (Final) 타입: 표준 트랙 (Standards Track) 생성일: 2015년 2월 12일 Python 버전: 3.5 요약 (Abstract) Python Windows 설치 프로그램에는 올바른 Python 인터프리터를 찾아 실행하는 런처(PEP...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/486/",
        "teaser": null
      },{
        "title": "[Final] PEP 487 - Simpler customisation of class creation",
        "excerpt":"원문 링크: PEP 487 - Simpler customisation of class creation 상태: Final 유형: Standards Track 작성일: 27-Feb-2015 PEP 487 – 클래스 생성 사용자 정의 간소화 개요 이 PEP (Python Enhancement Proposal)는 클래스 생성 시 사용자 정의 방식을 간소화하기 위해 __init_subclass__ 훅(hook)과 __set_name__ 훅을 도입합니다. 기존에는 메타클래스(metaclass)를 통해 클래스 생성을 사용자...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/487/",
        "teaser": null
      },{
        "title": "[Final] PEP 488 - Elimination of PYO files",
        "excerpt":"원문 링크: PEP 488 - Elimination of PYO files 상태: Final 유형: Standards Track 작성일: 20-Feb-2015 PEP 488 – PYO 파일 제거 초록 (Abstract) 이 PEP는 Python에서 PYO 파일 개념을 제거할 것을 제안합니다. 바이트코드 파일이 최적화 수준에 따라 분리되어 저장되는 방식을 계속 지원하기 위해, 최적화가 적용된 경우 바이트코드 저장소 디렉터리...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/488/",
        "teaser": null
      },{
        "title": "[Final] PEP 489 - Multi-phase extension module initialization",
        "excerpt":"원문 링크: PEP 489 - Multi-phase extension module initialization 상태: Final 유형: Standards Track 작성일: 11-Aug-2013 PEP 489 – 다단계 확장 모듈 초기화 개요 (Abstract) 이 PEP는 내장(built-in) 및 확장 모듈(extension module)이 임포트(import) 메커니즘과 상호작용하는 방식을 재설계할 것을 제안합니다. 이 방식은 Python 3.0에서 PEP 3121을 통해 마지막으로 개정되었지만, 당시의 모든...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/489/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 490 - Chain exceptions at C level",
        "excerpt":"원문 링크: PEP 490 - Chain exceptions at C level 상태: Rejected 유형: Standards Track 작성일: 25-Mar-2015 PEP 490 – C 수준에서 예외 연결 (Chain exceptions at C level) 작성자: Victor Stinner 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2015년 3월 25일 Python 버전: 3.6 요약 (Abstract) 이 PEP는 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/490/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 491 - The Wheel Binary Package Format 1.9",
        "excerpt":"원문 링크: PEP 491 - The Wheel Binary Package Format 1.9 상태: Deferred 유형: Standards Track 작성일: 16-Apr-2015 PEP 491 – Wheel 바이너리 패키지 형식 1.9 초록 (Abstract) 이 PEP는 Python을 위한 빌드된 패키지 형식의 두 번째 버전인 “wheel”에 대해 설명합니다. Wheel은 Python에 특화된 재배치 가능한 패키지 형식으로, 매번 소스...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/491/",
        "teaser": null
      },{
        "title": "[Final] PEP 492 - Coroutines with async and await syntax",
        "excerpt":"원문 링크: PEP 492 - Coroutines with async and await syntax 상태: Final 유형: Standards Track 작성일: 09-Apr-2015 PEP 492 – async 및 await 구문을 사용한 코루틴 저자: Yury Selivanov 상태: Final 유형: Standards Track 생성일: 2015년 4월 9일 Python 버전: 3.5 초록 (Abstract) 인터넷의 성장과 전반적인 연결성 증가는 반응성(responsive)과...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/492/",
        "teaser": null
      },{
        "title": "[Final] PEP 493 - HTTPS verification migration tools for Python 2.7",
        "excerpt":"원문 링크: PEP 493 - HTTPS verification migration tools for Python 2.7 상태: Final 유형: Standards Track 작성일: 10-May-2015 PEP 493 – Python 2.7용 HTTPS 검증 마이그레이션 도구 작성자: Alyssa Coghlan, Robert Kuska, Marc-André Lemburg BDFL 위임자: Barry Warsaw 상태: Final (최종) 유형: Standards Track (표준 트랙) 생성일: 2015년 5월...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/493/",
        "teaser": null
      },{
        "title": "[Final] PEP 494 - Python 3.6 Release Schedule",
        "excerpt":"원문 링크: PEP 494 - Python 3.6 Release Schedule 상태: Final 유형: Informational 작성일: 30-May-2015 PEP 494: Python 3.6 릴리스 일정 이 문서는 Python 3.6의 개발 및 릴리스 일정을 설명하는 Python Enhancement Proposal (PEP)입니다. 이 PEP는 주로 PEP 단위의 항목들에 중점을 둡니다. 개요 (Abstract) PEP 494는 Python 3.6 버전의 개발...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/494/",
        "teaser": null
      },{
        "title": "[Final] PEP 495 - Local Time Disambiguation",
        "excerpt":"원문 링크: PEP 495 - Local Time Disambiguation 상태: Final 유형: Standards Track 작성일: 02-Aug-2015 PEP 495: 로컬 시간 중의성 해소 초록 (Abstract) 이 PEP는 datetime.time 및 datetime.datetime 클래스의 인스턴스에 fold라는 새로운 속성을 추가하는 것을 제안합니다. 이 fold 속성은 로컬 시간이 동일하지만 실제 시점은 다른 두 시간을 구별하는 데 사용됩니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/495/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 496 - Environment Markers",
        "excerpt":"원문 링크: PEP 496 - Environment Markers 상태: Rejected 유형: Informational 작성일: 03-Jul-2015 PEP 496 – 환경 마커 (Environment Markers) 번역 및 해설 PEP 상태 이 PEP가 처음 초안으로 작성된 후, 환경 마커를 포함한 의존성 선언 구문을 완전히 명세화하기 위해 PEP 508이 개발 및 제출되었습니다. 그 결과, 이 PEP는 더...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/496/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 497 - A standard mechanism for backward compatibility",
        "excerpt":"원문 링크: PEP 497 - A standard mechanism for backward compatibility 상태: Rejected 유형: Process 작성일: 04-Aug-2015 PEP 497 – 하위 호환성을 위한 표준 메커니즘 작성자: Ed Schofield **PEP 위임자:** Brett Cannon **상태:** Rejected (거부됨) **유형:** Process (프로세스) **생성일:** 2015년 8월 4일 거부 공지 스티어링 위원회(steering council)는 이 제안의 __past__...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/497/",
        "teaser": null
      },{
        "title": "[Final] PEP 498 - Literal String Interpolation",
        "excerpt":"원문 링크: PEP 498 - Literal String Interpolation 상태: Final 유형: Standards Track 작성일: 01-Aug-2015 PEP 498 – 리터럴 문자열 보간 (Literal String Interpolation) 번역 및 해설 작성자: Eric V. Smith 상태: Final 타입: Standards Track 생성일: 2015년 8월 1일 Python 버전: 3.6 해결: Python-Dev 메시지 초록 (Abstract) Python은 텍스트...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/498/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 499 - python-mfooshould also bind'foo'insys.modules",
        "excerpt":"원문 링크: PEP 499 - python-mfooshould also bind’foo’insys.modules 상태: Deferred 유형: Standards Track 작성일: 07-Aug-2015 PEP 499 – python -m foo 실행 시 foo 모듈도 sys.modules에 바인딩되어야 합니다. 개요 이 문서는 Python 개발자가 python -m module.name 형태로 모듈을 메인 프로그램으로 실행할 때 발생하는 문제를 해결하기 위한 제안입니다. 현재 방식으로는 프로그램...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/499/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 500 - A protocol for delegating datetime methods to their tzinfo implementations",
        "excerpt":"원문 링크: PEP 500 - A protocol for delegating datetime methods to their tzinfo implementations 상태: Rejected 유형: Standards Track 작성일: 08-Aug-2015 PEP 500 – datetime 메서드를 tzinfo 구현체로 위임하기 위한 프로토콜 작성자: Alexander Belopolsky, Tim Peters 논의: Datetime-SIG list 상태: Rejected (거부됨) 유형: Standards Track 요구 사항: PEP 495...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/500/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 501 - General purpose template literal strings",
        "excerpt":"원문 링크: PEP 501 - General purpose template literal strings 상태: Withdrawn 유형: Standards Track 작성일: 08-Aug-2015 PEP 501은 “범용 템플릿 리터럴 문자열(General purpose template literal strings)”에 대한 제안서였으나, 현재는 PEP 750에 의해 철회(Withdrawn)되었습니다. 이 문서는 Python의 f-string과 유사하지만, 렌더링을 지연시켜 보안 취약점을 해결하고 유연한 템플릿 처리 기능을 제공하려는 목적을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/501/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 502 - String Interpolation - Extended Discussion",
        "excerpt":"원문 링크: PEP 502 - String Interpolation - Extended Discussion 상태: Rejected 유형: Informational 작성일: 10-Aug-2015 PEP 502 – String Interpolation - 확장된 논의 (Rejected) 이 문서는 Python 3.6에 도입된 “f-string” (Literal String Formatting)인 PEP 498의 배경과 설계 이유에 대한 확장된 논의를 담고 있습니다. PEP 502는 최종적으로 거부(Rejected) 되었는데, 이는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/502/",
        "teaser": null
      },{
        "title": "[Final] PEP 503 - Simple Repository API",
        "excerpt":"원문 링크: PEP 503 - Simple Repository API 상태: Final 유형: Standards Track 작성일: 04-Sep-2015 PEP 503 – Simple Repository API 작성자: Donald Stufft BDFL-Delegate: Donald Stufft 토론: Distutils-SIG list 상태: Final 유형: Standards Track 주제: Packaging 생성일: 2015년 9월 4일 최종 수정일: 2025년 8월 20일 (GMT) 초록 (Abstract) Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/503/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 504 - Using the System RNG by default",
        "excerpt":"원문 링크: PEP 504 - Using the System RNG by default 상태: Withdrawn 유형: Standards Track 작성일: 15-Sep-2015 PEP 504 – 기본적으로 시스템 RNG 사용 (Using the System RNG by default) 저자: Alyssa Coghlan **상태:** 철회됨 (Withdrawn) **유형:** Standards Track **생성일:** 2015년 9월 15일 **Python 버전:** 3.6 **이력:** 2015년 9월...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/504/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 505 - None-aware operators",
        "excerpt":"원문 링크: PEP 505 - None-aware operators 상태: Deferred 유형: Standards Track 작성일: 18-Sep-2015 작성자: Mark E. Haase, Steve Dower 상태: Deferred (보류됨) 유형: Standards Track 생성일: 2015년 9월 18일 Python 버전: 3.8 개요 (Abstract) C#, Dart, Perl, Swift, PHP(버전 7부터), 그리고 ECMAScript(JavaScript)의 드래프트 제안과 같은 여러 현대 프로그래밍 언어에는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/505/",
        "teaser": null
      },{
        "title": "[Final] PEP 506 - Adding A Secrets Module To The Standard Library",
        "excerpt":"원문 링크: PEP 506 - Adding A Secrets Module To The Standard Library 상태: Final 유형: Standards Track 작성일: 19-Sep-2015 PEP 506 – 표준 라이브러리에 secrets 모듈 추가 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 토큰 생성과 같은 일반적인 보안 관련 기능을 위한 모듈을 Python 표준 라이브러리에 추가할 것을 제안합니다. 정의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/506/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 507 - Migrate CPython to Git and GitLab",
        "excerpt":"원문 링크: PEP 507 - Migrate CPython to Git and GitLab 상태: Rejected 유형: Process 작성일: 30-Sep-2015 PEP 507 – CPython을 Git 및 GitLab으로 이전 제안 작성자: Barry Warsaw 상태: Rejected (거부됨) 유형: Process (프로세스) 생성일: 2015년 9월 30일 해상도: Core-Workflow message 개요 (Abstract) 이 PEP는 CPython 및 관련 저장소의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/507/",
        "teaser": null
      },{
        "title": "[Final] PEP 508 - Dependency specification for Python Software Packages",
        "excerpt":"원문 링크: PEP 508 - Dependency specification for Python Software Packages 상태: Final 유형: Standards Track 작성일: 11-Nov-2015 PEP 508: Python 소프트웨어 패키지 의존성 명세 개요 이 PEP(Python Enhancement Proposal)는 Python 패키지의 의존성(dependency)을 설명하는 언어를 정의합니다. 이 문서는 단일 의존성을 기술하는 데 중점을 두며, 다양한 종류의 의존성과 설치 시기는 상위...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/508/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 509 - Add a private version to dict",
        "excerpt":"원문 링크: PEP 509 - Add a private version to dict 상태: Superseded 유형: Standards Track 작성일: 04-Jan-2016 PEP 509 – dict에 Private 버전 추가 초록 (Abstract) 이 PEP는 내장 dict 타입에 새로운 private 버전을 추가할 것을 제안합니다. 이 버전은 각 딕셔너리 생성 시, 그리고 각 딕셔너리 변경 시마다 증가하여,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/509/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 510 - Specialize functions with guards",
        "excerpt":"원문 링크: PEP 510 - Specialize functions with guards 상태: Rejected 유형: Standards Track 작성일: 04-Jan-2016 PEP 510 – 가드(Guards)를 통한 함수 특수화 (Specialize functions with guards) 작성자: Victor Stinner 상태: 거부됨 (Rejected) 유형: Standards Track 작성일: 2016년 1월 4일 Python 버전: 3.6 거부 통지 (Rejection Notice) 이 PEP는 저자에...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/510/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 511 - API for code transformers",
        "excerpt":"원문 링크: PEP 511 - API for code transformers 상태: Rejected 유형: Standards Track 작성일: 04-Jan-2016 PEP 511 – 코드 트랜스포머를 위한 API (API for code transformers) 상태: 이 PEP는 저자에 의해 거부(Rejected)되었습니다. 거부 사유 이 PEP는 일반 Python 언어와 유사하지만 호환되지 않는 새로운 Python 유사 프로그래밍 언어를 승인하는 것으로...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/511/",
        "teaser": null
      },{
        "title": "[Final] PEP 512 - Migrating from hg.python.org to GitHub",
        "excerpt":"원문 링크: PEP 512 - Migrating from hg.python.org to GitHub 상태: Final 유형: Process 작성일: 17-Jan-2015 PEP 512 – hg.python.org에서 GitHub로 마이그레이션 요약 (Abstract) 이 PEP는 Python의 개발 프로세스를 hg.python.org 에 호스팅되던 Mercurial 에서 GitHub 의 Git 으로 마이그레이션하는 데 필요한 단계들을 설명합니다. 이 PEP의 최소 목표를 달성하면 Python의 개발...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/512/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 513 - A Platform Tag for Portable Linux Built Distributions",
        "excerpt":"원문 링크: PEP 513 - A Platform Tag for Portable Linux Built Distributions 상태: Superseded 유형: Informational 작성일: 19-Jan-2016 PEP 513 – 휴대용 Linux 빌드 배포판을 위한 플랫폼 태그 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 Python 패키지 빌드 배포판, 특히 wheels를 위한 새로운 플랫폼 태그인 manylinux1_{x86_64,i686} 생성을 제안합니다. 이 태그를...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/513/",
        "teaser": null
      },{
        "title": "[Active] PEP 514 - Python registration in the Windows registry",
        "excerpt":"원문 링크: PEP 514 - Python registration in the Windows registry 상태: Active 유형: Informational 작성일: 02-Feb-2016 PEP 514: Windows 레지스트리에 Python 등록 (Python registration in the Windows registry) 개요 (Abstract) 이 PEP는 타사 설치 프로그램이 자신들의 Python 설치를 등록하고, 도구 및 애플리케이션이 사용자의 시스템에 있는 모든 Python 환경을 감지하고...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/514/",
        "teaser": null
      },{
        "title": "[Final] PEP 515 - Underscores in Numeric Literals",
        "excerpt":"원문 링크: PEP 515 - Underscores in Numeric Literals 상태: Final 유형: Standards Track 작성일: 10-Feb-2016 PEP 515 – 숫자 리터럴의 밑줄 (Underscores in Numeric Literals) 작성자: Georg Brandl, Serhiy Storchaka 상태: Final (최종) 타입: Standards Track (표준 트랙) 생성일: 2016년 2월 10일 Python 버전: 3.6 개요 및 제안 배경...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/515/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 516 - Build system abstraction for pip/conda etc",
        "excerpt":"원문 링크: PEP 516 - Build system abstraction for pip/conda etc 상태: Rejected 유형: Standards Track 작성일: 26-Oct-2015 PEP 516 – pip/conda 등을 위한 빌드 시스템 추상화 요약 (Abstract) 이 PEP는 pip 및 기타 배포 또는 설치 도구들이 Python 소스 트리(개발자 트리 또는 소스 배포판(sdist))와 작업할 때 사용할 프로그래밍 인터페이스를...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/516/",
        "teaser": null
      },{
        "title": "[Final] PEP 517 - A build-system independent format for source trees",
        "excerpt":"원문 링크: PEP 517 - A build-system independent format for source trees 상태: Final 유형: Standards Track 작성일: 30-Sep-2015 PEP 517 – 소스 트리를 위한 빌드 시스템 독립적인 형식 본 문서는 PEP 517의 내용을 한국어 Python 개발자들을 위해 번역하고 정리한 것입니다. 이 PEP는 Python 패키징 생태계에서 빌드 시스템의 유연성과 확장성을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/517/",
        "teaser": null
      },{
        "title": "[Final] PEP 518 - Specifying Minimum Build System Requirements for Python Projects",
        "excerpt":"원문 링크: PEP 518 - Specifying Minimum Build System Requirements for Python Projects 상태: Final 유형: Standards Track 작성일: 10-May-2016 PEP 518 – Python 프로젝트를 위한 최소 빌드 시스템 요구사항 지정 초록 (Abstract) 이 PEP는 Python 소프트웨어 패키지가 선택한 빌드 시스템을 실행하는 데 필요한 빌드 의존성(build dependencies)을 어떻게 명시해야 하는지...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/518/",
        "teaser": null
      },{
        "title": "[Final] PEP 519 - Adding a file system path protocol",
        "excerpt":"원문 링크: PEP 519 - Adding a file system path protocol 상태: Final 유형: Standards Track 작성일: 11-May-2016 다음은 Python Enhancement Proposal (PEP) 519, “Adding a file system path protocol”의 내용 요약 및 번역입니다. 이 PEP는 파일 시스템 경로를 나타내는 객체들이 str 또는 bytes 표현을 제공할 수 있는 프로토콜을 제안하며,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/519/",
        "teaser": null
      },{
        "title": "[Final] PEP 520 - Preserving Class Attribute Definition Order",
        "excerpt":"원문 링크: PEP 520 - Preserving Class Attribute Definition Order 상태: Final 유형: Standards Track 작성일: 07-Jun-2016 PEP 520 – 클래스 속성 정의 순서 유지 (Preserving Class Attribute Definition Order) 요약 (Abstract) 클래스 정의 구문은 본질적으로 순서가 있습니다. 여기에 정의된 클래스 속성들 역시 순서가 존재합니다. 이러한 순서는 가독성을 높일 뿐만...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/520/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 521 - Managing global context via ‘with’ blocks in generators and coroutines",
        "excerpt":"원문 링크: PEP 521 - Managing global context via ‘with’ blocks in generators and coroutines 상태: Withdrawn 유형: Standards Track 작성일: 27-Apr-2015 PEP 521은 Generator 및 Coroutine 내 with 블록을 통해 전역 컨텍스트를 관리하는 방법을 제안했지만, PEP 567에 찬성하여 Withdrawn (철회됨) 상태입니다. PEP 521: Generator 및 Coroutine 내 ‘with’ 블록을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/521/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 522 - Allow BlockingIOError in security sensitive APIs",
        "excerpt":"원문 링크: PEP 522 - Allow BlockingIOError in security sensitive APIs 상태: Rejected 유형: Standards Track 작성일: 16-Jun-2016 PEP 522: 보안에 민감한 API에서 BlockingIOError 허용 (거부됨) 요약 (Abstract) 표준 라이브러리 내의 여러 API는 보안에 민감한 작업에 적합한 무작위 값을 반환하는 것으로 알려져 있지만, 현재 일부 운영체제(특히 Linux 커널)에서는 시스템 난수...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/522/",
        "teaser": null
      },{
        "title": "[Final] PEP 523 - Adding a frame evaluation API to CPython",
        "excerpt":"원문 링크: PEP 523 - Adding a frame evaluation API to CPython 상태: Final 유형: Standards Track 작성일: 16-May-2016 PEP 523 – CPython에 프레임 평가 API 추가 개요 (Abstract) 이 PEP는 CPython의 C API를 확장하여 인터프리터별 프레임 평가 함수를 지정할 수 있도록 제안합니다. 또한, 이 제안은 프레임 평가 함수에서 사용할...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/523/",
        "teaser": null
      },{
        "title": "[Final] PEP 524 - Make os.urandom() blocking on Linux",
        "excerpt":"원문 링크: PEP 524 - Make os.urandom() blocking on Linux 상태: Final 유형: Standards Track 작성일: 20-Jun-2016 PEP 524: Linux에서 os.urandom()을 블로킹 방식으로 변경 초록 (Abstract) 이 PEP는 Python의 보안 강화를 위해 Linux 3.17 이상 버전에서 os.urandom() 함수가 운영체제의 URBG(Unblocking Random Bit Generator)가 초기화될 때까지 블로킹하도록 수정할 것을 제안합니다. 또한,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/524/",
        "teaser": null
      },{
        "title": "[Final] PEP 525 - Asynchronous Generators",
        "excerpt":"원문 링크: PEP 525 - Asynchronous Generators 상태: Final 유형: Standards Track 작성일: 28-Jul-2016 PEP 525 – 비동기 제너레이터 (Asynchronous Generators) 개요 (Abstract) PEP 492는 Python 3.5에 네이티브 코루틴(native coroutines)과 async/await 문법에 대한 지원을 도입했습니다. 이 PEP 525는 비동기 제너레이터(asynchronous generators) 지원을 추가하여 Python의 비동기 기능을 확장할 것을 제안합니다. 배경...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/525/",
        "teaser": null
      },{
        "title": "[Final] PEP 526 - Syntax for Variable Annotations",
        "excerpt":"원문 링크: PEP 526 - Syntax for Variable Annotations 상태: Final 유형: Standards Track 작성일: 09-Aug-2016 PEP 526 – 변수 어노테이션 구문 (Syntax for Variable Annotations) 개요 (Abstract) PEP 484는 타입 힌트(type hints), 즉 타입 어노테이션(type annotations)을 도입했습니다. 주로 함수 어노테이션에 중점을 두었지만, 변수를 어노테이션하기 위한 타입 주석(type comments) 개념도...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/526/",
        "teaser": null
      },{
        "title": "[Final] PEP 527 - Removing Un(der)used file types/extensions on PyPI",
        "excerpt":"원문 링크: PEP 527 - Removing Un(der)used file types/extensions on PyPI 상태: Final 유형: Standards Track 작성일: 23-Aug-2016 PEP 527 – PyPI에서 미사용/활용도가 낮은 파일 형식/확장자 제거 작성자: Donald Stufft 상태: Final 유형: Standards Track 주제: Packaging 생성일: 2016년 8월 23일 초록 (Abstract) 이 PEP는 PyPI(Python Package Index)에 특정 미사용...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/527/",
        "teaser": null
      },{
        "title": "[Final] PEP 528 - Change Windows console encoding to UTF-8",
        "excerpt":"원문 링크: PEP 528 - Change Windows console encoding to UTF-8 상태: Final 유형: Standards Track 작성일: 27-Aug-2016 PEP 528 – Windows 콘솔 인코딩을 UTF-8로 변경 개요 (Abstract) 과거에 Python은 Windows 운영체제와의 상호작용을 위해 ANSI API를 주로 사용했습니다. 그러나 이러한 ANSI API는 UTF-16 API에 비해 권장되지 않아 왔습니다. 운영체제 내부에서는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/528/",
        "teaser": null
      },{
        "title": "[Final] PEP 529 - Change Windows filesystem encoding to UTF-8",
        "excerpt":"원문 링크: PEP 529 - Change Windows filesystem encoding to UTF-8 상태: Final 유형: Standards Track 작성일: 27-Aug-2016 PEP 529 – Windows 파일 시스템 인코딩을 UTF-8로 변경 작성자: Steve Dower 상태: 최종 (Final) 유형: 표준 트랙 (Standards Track) 생성일: 2016년 8월 27일 Python 버전: 3.6 최종 이력: 2016년 9월 1일,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/529/",
        "teaser": null
      },{
        "title": "[Final] PEP 530 - Asynchronous Comprehensions",
        "excerpt":"원문 링크: PEP 530 - Asynchronous Comprehensions 상태: Final 유형: Standards Track 작성일: 03-Sep-2016 PEP 530 – 비동기 컴프리헨션 (Asynchronous Comprehensions) 개요 PEP 530은 Python 3.6에 도입된 기능으로, async/await 문법을 사용하는 비동기 버전의 list, set, dict 컴프리헨션(comprehension) 및 제너레이터 표현식(generator expressions)을 추가할 것을 제안합니다. 이는 PEP 492 (네이티브 코루틴)와 PEP...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/530/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 531 - Existence checking operators",
        "excerpt":"원문 링크: PEP 531 - Existence checking operators 상태: Withdrawn 유형: Standards Track 작성일: 25-Oct-2016 PEP 531 – 존재 확인 연산자 (Existence Checking Operators) 상태: 철회됨 (Withdrawn) 초록 (Abstract) PEP 505와 관련 논의에서 영감을 받은 이 PEP는 Python에 두 가지 새로운 제어 흐름 연산자를 추가할 것을 제안했습니다: 존재 확인 전제...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/531/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 532 - A circuit breaking protocol and binary operators",
        "excerpt":"원문 링크: PEP 532 - A circuit breaking protocol and binary operators 상태: Deferred 유형: Standards Track 작성일: 30-Oct-2016 PEP 532 – 회로 차단(Circuit Breaking) 프로토콜 및 이항(Binary) 연산자 PEP 연기 (PEP Deferral) 이 PEP에 대한 추가 검토는 최소한 Python 3.8까지 연기되었습니다. 요약 (Abstract) PEP 335, PEP 505, PEP 531...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/532/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 533 - Deterministic cleanup for iterators",
        "excerpt":"원문 링크: PEP 533 - Deterministic cleanup for iterators 상태: Deferred 유형: Standards Track 작성일: 18-Oct-2016 PEP 533 – 이터레이터의 확정적 정리 (Deterministic cleanup for iterators) 요약 (Abstract) 본 PEP는 이터레이터 프로토콜에 새로운 __(a)iterclose__ 슬롯(slot)을 확장할 것을 제안합니다. 이 슬롯은 for (또는 async for) 루프가 어떤 방식으로든 종료될 때 자동으로...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/533/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 534 - Improved Errors for Missing Standard Library Modules",
        "excerpt":"원문 링크: PEP 534 - Improved Errors for Missing Standard Library Modules 상태: Deferred 유형: Standards Track 작성일: 05-Sep-2016 PEP 534 – 누락된 표준 라이브러리 모듈에 대한 오류 메시지 개선 개요 Python은 종종 전체 표준 라이브러리 없이 빌드되거나 배포됩니다. 하지만 현재까지는 누락된 표준 라이브러리 모듈을 import하지 못했을 때 사용자에게 실패...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/534/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 535 - Rich comparison chaining",
        "excerpt":"원문 링크: PEP 535 - Rich comparison chaining 상태: Deferred 유형: Standards Track 작성일: 12-Nov-2016 PEP 535 – 풍부한 비교 체인 (Rich comparison chaining) 개요 (Abstract) PEP 535는 PEP 335에서 영감을 받고 PEP 532에 설명된 회로 차단(circuit breaking) 프로토콜을 기반으로, 체인 비교(chained comparisons)의 정의 변경을 제안합니다. 이 제안의 핵심은 좌측...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/535/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 536 - Final Grammar for Literal String Interpolation",
        "excerpt":"원문 링크: PEP 536 - Final Grammar for Literal String Interpolation 상태: Withdrawn 유형: Standards Track 작성일: 11-Dec-2016 PEP 536 – 리터럴 문자열 보간법(Literal String Interpolation)을 위한 최종 문법 작성자: Philipp Angerer 상태: 철회됨 (Withdrawn) 유형: 표준 트랙 (Standards Track) 생성일: 2016년 12월 11일 Python 버전: 3.7 이력: 2016년 8월...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/536/",
        "teaser": null
      },{
        "title": "[Final] PEP 537 - Python 3.7 Release Schedule",
        "excerpt":"원문 링크: PEP 537 - Python 3.7 Release Schedule 상태: Final 유형: Informational 작성일: 23-Dec-2016 PEP 537 – Python 3.7 릴리스 스케줄 메타 정보 작성자(Author): Ned Deily 상태(Status): Final 타입(Type): Informational 토픽(Topic): Release 생성일(Created): 2016년 12월 23일 Python 버전(Python-Version): 3.7 개요 (Abstract) 이 문서는 Python 3.7의 개발 및 릴리스 스케줄을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/537/",
        "teaser": null
      },{
        "title": "[Final] PEP 538 - Coercing the legacy C locale to a UTF-8 based locale",
        "excerpt":"원문 링크: PEP 538 - Coercing the legacy C locale to a UTF-8 based locale 상태: Final 유형: Standards Track 작성일: 28-Dec-2016 PEP 538 – 레거시 C locale을 UTF-8 기반 locale로 강제 변환 (Coercing the legacy C locale to a UTF-8 based locale) 개요 이 PEP는 Python 3.7부터 *nix 시스템에서...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/538/",
        "teaser": null
      },{
        "title": "[Final] PEP 539 - A New C-API for Thread-Local Storage in CPython",
        "excerpt":"원문 링크: PEP 539 - A New C-API for Thread-Local Storage in CPython 상태: Final 유형: Standards Track 작성일: 20-Dec-2016 PEP 539 – CPython에서 스레드 로컬 스토리지를 위한 새로운 C-API 이 문서는 CPython 인터프리터 내에서 스레드 로컬 스토리지(Thread Local Storage, TLS)를 관리하기 위한 새로운 C-API인 “Thread Specific Storage (TSS) API”를...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/539/",
        "teaser": null
      },{
        "title": "[Final] PEP 540 - Add a new UTF-8 Mode",
        "excerpt":"원문 링크: PEP 540 - Add a new UTF-8 Mode 상태: Final 유형: Standards Track 작성일: 05-Jan-2016 PEP 540: 새로운 UTF-8 모드 추가 요약 (Abstract) PEP 540은 Python의 UTF-8 활용을 강화하기 위한 새로운 “UTF-8 모드” 추가를 제안합니다. 이 모드가 활성화되면 Python은 현재 플랫폼에 설정된 로케일(locale)과 관계없이 utf-8 인코딩을 사용하고, stdin...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/540/",
        "teaser": null
      },{
        "title": "[Final] PEP 541 - Package Index Name Retention",
        "excerpt":"원문 링크: PEP 541 - Package Index Name Retention 상태: Final 유형: Process 작성일: 12-Jan-2017 PEP 541 – Package Index 이름 유지 (Package Index Name Retention) 작성자: Łukasz Langa BDFL-Delegate: Mark Mangoba 상태: 최종 (Final) 유형: 프로세스 (Process) 생성일: 2017년 1월 12일 초록 (Abstract) 이 PEP는 Package Index (PyPI)의 이용...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/541/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 542 - Dot Notation Assignment In Function Header",
        "excerpt":"원문 링크: PEP 542 - Dot Notation Assignment In Function Header 상태: Rejected 유형: Standards Track 작성일: 10-Feb-2017 PEP 542 – 함수 헤더 내 점 표기법 할당 (Dot Notation Assignment In Function Header) 작성자: Markus Meskanen 상태: Rejected (반려됨) 유형: Standards Track (표준 트랙) 생성일: 2017년 2월 10일 해결: Python-Dev...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/542/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 543 - A Unified TLS API for Python",
        "excerpt":"원문 링크: PEP 543 - A Unified TLS API for Python 상태: Withdrawn 유형: Standards Track 작성일: 17-Oct-2016 PEP 543 – Python을 위한 통합 TLS API 작성자: Cory Benfield, Christian Heimes 상태: 철회됨 (Withdrawn) 유형: Standards Track 생성일: 2016년 10월 17일 Python 버전: 3.7 대체: 748 개요 (Abstract) 이 PEP는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/543/",
        "teaser": null
      },{
        "title": "[Final] PEP 544 - Protocols: Structural subtyping (static duck typing)",
        "excerpt":"원문 링크: PEP 544 - Protocols: Structural subtyping (static duck typing) 상태: Final 유형: Standards Track 작성일: 05-Mar-2017 PEP 544 – Protocols: 구조적 서브타이핑 (정적 덕 타이핑) 이 문서는 Python Enhancement Proposal (PEP) 544의 내용을 한국어 사용자가 이해하기 쉽게 번역하고 정리한 것입니다. Python 개발자들이 이 PEP의 제안 내용, 도입 배경,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/544/",
        "teaser": null
      },{
        "title": "[Active] PEP 545 - Python Documentation Translations",
        "excerpt":"원문 링크: PEP 545 - Python Documentation Translations 상태: Active 유형: Process 작성일: 04-Mar-2017 PEP 545 – Python 문서 번역 (Python Documentation Translations) 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 기존의 파이썬(Python) 문서 번역본에 대한 접근성과 발견 가능성을 높이는 것을 목표로 합니다. 이를 통해 새로운 번역가와 번역 작업 유입을 유도하고자 합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/545/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 546 - Backport ssl.MemoryBIO and ssl.SSLObject to Python 2.7",
        "excerpt":"원문 링크: PEP 546 - Backport ssl.MemoryBIO and ssl.SSLObject to Python 2.7 상태: Rejected 유형: Standards Track 작성일: 30-May-2017 PEP 546 – Python 2.7에 ssl.MemoryBIO 및 ssl.SSLObject 백포팅 제안 (거부됨) 개요 이 문서는 Python 3의 ssl.MemoryBIO 및 ssl.SSLObject 클래스를 Python 2.7 버전으로 백포팅(backporting)하여 Python 2.7의 전반적인 보안을 강화하자는 제안이었습니다. 상태...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/546/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 547 - Running extension modules using the -m option",
        "excerpt":"원문 링크: PEP 547 - Running extension modules using the -m option 상태: Deferred 유형: Standards Track 작성일: 25-May-2017 PEP 547 – -m 옵션을 사용하여 확장 모듈 실행 저자: Marcel Plch, Petr Viktorin 상태: 연기됨 (Deferred) 유형: 표준 트랙 (Standards Track) 생성일: 2017년 5월 25일 Python 버전: 3.7 연기 알림...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/547/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 548 - More Flexible Loop Control",
        "excerpt":"원문 링크: PEP 548 - More Flexible Loop Control 상태: Rejected 유형: Standards Track 작성일: 05-Sep-2017 Title: PEP 548 – 더욱 유연한 반복문 제어 (More Flexible Loop Control) 서론 (Introduction) PEP 548이 무엇을 제안했는지 간략하게 설명. 작성자, 상태(Rejected), 유형(Standards Track), 생성일, Python 버전(3.7) 명시. 거절 사유 (Rejection Note) Guido van...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/548/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 549 - Instance Descriptors",
        "excerpt":"원문 링크: PEP 549 - Instance Descriptors 상태: Rejected 유형: Standards Track 작성일: 04-Sep-2017 PEP 549 – 인스턴스 디스크립터 (Instance Descriptors) 작성자: Larry Hastings 상태: Rejected (거부됨) 생성일: 2017년 9월 4일 Python 버전: 3.7 요약: 이 PEP는 인스턴스의 멤버에 대해서도 디스크립터 프로토콜을 사용할 수 있도록 Python의 디스크립터 프로토콜 확장을 제안합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/549/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 550 - Execution Context",
        "excerpt":"원문 링크: PEP 550 - Execution Context 상태: Withdrawn 유형: Standards Track 작성일: 11-Aug-2017 PEP 550 – Execution Context 문서를 한국어로 번역하고 요약합니다. PEP 550: 실행 컨텍스트 (Execution Context) - 폐기됨 (Withdrawn) 요약: PEP 550은 Python 제너레이터(generator) 및 코루틴(coroutine)과 같이 순서가 뒤섞인 실행(out-of-order execution) 환경에서 비-지역(non-local) 상태에 일관되게 접근할 수...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/550/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 551 - Security transparency in the Python runtime",
        "excerpt":"원문 링크: PEP 551 - Security transparency in the Python runtime 상태: Withdrawn 유형: Informational 작성일: 23-Aug-2017 PEP 551 – Python 런타임의 보안 투명성 (Security transparency in the Python runtime) 저자: Steve Dower **상태:** 철회됨 (Withdrawn) **유형:** 정보 제공 (Informational) **생성일:** 2017년 8월 23일 **Python 버전:** 3.7 **이력:** 2017년 8월...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/551/",
        "teaser": null
      },{
        "title": "[Final] PEP 552 - Deterministic pycs",
        "excerpt":"원문 링크: PEP 552 - Deterministic pycs 상태: Final 유형: Standards Track 작성일: 04-Sep-2017 PEP 552 – 결정론적 .pyc 파일 개요 이 PEP는 .pyc 파일 형식을 확장하여, 파일의 결정론적(deterministic) 특성을 강화할 것을 제안합니다. 도입 배경 (Rationale) 재현 가능한 빌드(Reproducible Build)의 중요성 재현 가능한 빌드란 동일한 소스 코드를 빌드할 때, 빌드...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/552/",
        "teaser": null
      },{
        "title": "[Final] PEP 553 - Built-in breakpoint()",
        "excerpt":"원문 링크: PEP 553 - Built-in breakpoint() 상태: Final 유형: Standards Track 작성일: 05-Sep-2017 PEP 553 – 내장 함수 breakpoint() 개요 이 PEP는 호출 지점에서 Python 디버거를 실행하는 새로운 내장 함수 breakpoint()를 추가할 것을 제안합니다. 또한, 어떤 디버거를 사용할지 설정할 수 있도록 sys 모듈에 두 개의 새로운 이름이 추가됩니다. 도입...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/553/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 554 - Multiple Interpreters in the Stdlib",
        "excerpt":"원문 링크: PEP 554 - Multiple Interpreters in the Stdlib 상태: Superseded 유형: Standards Track 작성일: 05-Sep-2017 주어진 URL의 PEP 554 문서를 바탕으로 한국어 번역 및 요약을 제공합니다. 이 문서는 Python 3.12에서 [PEP 684]를 통해 per-interpreter GIL이 도입된 이후 특히 중요해진 stdlib에 다중 인터프리터를 추가하는 제안입니다. PEP 554 – stdlib의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/554/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 555 - Context-local variables (contextvars)",
        "excerpt":"원문 링크: PEP 555 - Context-local variables (contextvars) 상태: Withdrawn 유형: Standards Track 작성일: 06-Sep-2017 PEP 555: Context-local variables (contextvars) (컨텍스트-로컬 변수) 작성자: Koos Zevenhoven 상태: 철회됨 (Withdrawn) 유형: 표준 트랙 (Standards Track) 생성일: 2017년 9월 6일 Python 버전: 3.7 사후 변경 이력: 2017년 9월 6일 개요 (Abstract) 특별한 경우에,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/555/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 556 - Threaded garbage collection",
        "excerpt":"원문 링크: PEP 556 - Threaded garbage collection 상태: Deferred 유형: Standards Track 작성일: 08-Sep-2017 PEP 556 – Threaded garbage collection 작성자: Antoine Pitrou 상태: 연기됨 (Deferred) 유형: 표준 트랙 (Standards Track) 생성일: 2017년 9월 8일 Python 버전: 3.7 연기 공지 (Deferral Notice) 이 PEP는 현재 활발히 작업 중이지 않습니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/556/",
        "teaser": null
      },{
        "title": "[Final] PEP 557 - Data Classes",
        "excerpt":"원문 링크: PEP 557 - Data Classes 상태: Final 유형: Standards Track 작성일: 02-Jun-2017 PEP 557 – Data Classes (데이터 클래스) 번역 및 요약 개요 PEP 557은 Python 3.7부터 표준 라이브러리에 추가된 dataclasses 모듈을 설명하는 문서입니다. 이 PEP는 주로 데이터를 저장하는 데 사용되는 클래스를 더 쉽고 간결하게 작성할 수 있도록...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/557/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 558 - Defined semantics for locals()",
        "excerpt":"원문 링크: PEP 558 - Defined semantics for locals() 상태: Withdrawn 유형: Standards Track 작성일: 08-Sep-2017 PEP 558은 locals() 내장 함수의 동작을 명확히 정의하려는 제안이었으나, 2021년 12월에 PEP 667과의 내용 통합으로 인해 철회되었습니다. 이 문서는 locals()의 의미론적 정의와 관련된 배경, 문제점 및 제안된 해결책을 담고 있습니다. 특히, 함수 스코프에서의 locals()...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/558/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 559 - Built-in noop()",
        "excerpt":"원문 링크: PEP 559 - Built-in noop() 상태: Rejected 유형: Standards Track 작성일: 08-Sep-2017 PEP 559 – Built-in noop() peps.python.org 문서를 번역하고 정리합니다. PEP 559 – Built-in noop() 작성자: Barry Warsaw 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2017년 9월 8일 Python 버전: 3.7 사후 이력: 2017년 9월 9일 해결:...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/559/",
        "teaser": null
      },{
        "title": "[Final] PEP 560 - Core support for typing module and generic types",
        "excerpt":"원문 링크: PEP 560 - Core support for typing module and generic types 상태: Final 유형: Standards Track 작성일: 03-Sep-2017 PEP 560 – typing 모듈 및 제네릭 타입에 대한 핵심 지원 개요 PEP 560은 typing 모듈과 제네릭 타입(Generic types)을 더 효율적으로 지원하기 위해 CPython 인터프리터 코어에 두 가지 특별 메서드인...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/560/",
        "teaser": null
      },{
        "title": "[Final] PEP 561 - Distributing and Packaging Type Information",
        "excerpt":"원문 링크: PEP 561 - Distributing and Packaging Type Information 상태: Final 유형: Standards Track 작성일: 09-Sep-2017 PEP 561 – 타입 정보 배포 및 패키징 개요 (Abstract) PEP 484는 점진적이고 쉽게 채택할 수 있는 목표를 가지고 Python에 타입 힌팅(Type Hinting)을 도입했습니다. 현재 타입 정보는 수동으로 배포되어야 합니다. 이 PEP는 기존...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/561/",
        "teaser": null
      },{
        "title": "[Final] PEP 562 - Module __getattr__ and __dir__",
        "excerpt":"원문 링크: PEP 562 - Module getattr and dir 상태: Final 유형: Standards Track 작성일: 09-Sep-2017 I have successfully browsed the PEP 0562 document. Now I will translate and summarize it according to the given instructions. PEP 562 – 모듈 __getattr__ 및 __dir__ 작성자: Ivan Levkivskyi 상태: Final (최종) 유형:...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/562/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 563 - Postponed Evaluation of Annotations",
        "excerpt":"원문 링크: PEP 563 - Postponed Evaluation of Annotations 상태: Superseded 유형: Standards Track 작성일: 08-Sep-2017 PEP 563 – 어노테이션 지연 평가 (Postponed Evaluation of Annotations) 상태: 이 PEP에서 제안된 기능은 기본 동작이 되지 못했으며, PEP 649 및 PEP 749에서 제안된 어노테이션의 지연된 평가로 대체되었습니다. 개요 (Abstract) PEP 3107은 함수...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/563/",
        "teaser": null
      },{
        "title": "[Final] PEP 564 - Add new time functions with nanosecond resolution",
        "excerpt":"원문 링크: PEP 564 - Add new time functions with nanosecond resolution 상태: Final 유형: Standards Track 작성일: 16-Oct-2017 Here’s the translated and summarized content of PEP 564, adhering to the specified guidelines. PEP 564: 나노초 해상도를 지원하는 새로운 시간 함수 추가 개요 PEP 564는 Python의 time 모듈에 나노초(nanosecond) 해상도를...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/564/",
        "teaser": null
      },{
        "title": "[Final] PEP 565 - Show DeprecationWarning in __main__",
        "excerpt":"원문 링크: PEP 565 - Show DeprecationWarning in main 상태: Final 유형: Standards Track 작성일: 12-Nov-2017 PEP 565: __main__ 모듈에서 DeprecationWarning 표시 (Show DeprecationWarning in __main__) 요약 (Abstract) Python 2.7 및 3.2부터 DeprecationWarning은 기본적으로 숨겨져 있었습니다. 이는 개발 도구나 애플리케이션 사용자들이 불필요한 경고를 보지 않도록 하기 위함이었습니다. 그러나 이로 인해...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/565/",
        "teaser": null
      },{
        "title": "[Final] PEP 566 - Metadata for Python Software Packages 2.1",
        "excerpt":"원문 링크: PEP 566 - Metadata for Python Software Packages 2.1 상태: Final 유형: Standards Track 작성일: 01-Dec-2017 PEP 566 – Python 소프트웨어 패키지용 메타데이터 2.1 초록 (Abstract) 이 PEP (Python Enhancement Proposal)는 Python 패키지의 핵심 메타데이터 사양 버전 1.2와 2.1 사이의 변경 사항을 설명합니다. 버전 1.2는 PEP 345에 명시되어...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/566/",
        "teaser": null
      },{
        "title": "[Final] PEP 567 - Context Variables",
        "excerpt":"원문 링크: PEP 567 - Context Variables 상태: Final 유형: Standards Track 작성일: 12-Dec-2017 PEP 567 – Context Variables 한국어 번역 및 요약 초록 (Abstract) 이 PEP(Python Enhancement Proposal)는 컨텍스트 변수(context variables)를 지원하기 위한 새로운 contextvars 모듈과 CPython C API 집합을 제안합니다. 이 개념은 스레드 로컬 저장소(thread-local storage, TLS)와 유사하지만,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/567/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 568 - Generator-sensitivity for Context Variables",
        "excerpt":"원문 링크: PEP 568 - Generator-sensitivity for Context Variables 상태: Deferred 유형: Standards Track 작성일: 04-Jan-2018 다음은 Python Enhancement Proposal (PEP) 568 문서의 한국어 번역 및 정리입니다. 이 문서는 Context Variable에 대한 Generator 감도 (Generator-sensitivity)를 추가하는 내용을 다루고 있습니다. PEP 568 – Context Variables에 대한 Generator 감도 작성자: Nathaniel J....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/568/",
        "teaser": null
      },{
        "title": "[Final] PEP 569 - Python 3.8 Release Schedule",
        "excerpt":"원문 링크: PEP 569 - Python 3.8 Release Schedule 상태: Final 유형: Informational 작성일: 27-Jan-2018 PEP 569 – Python 3.8 릴리스 스케줄 작성자: Łukasz Langa **상태:** Final **유형:** Informational **주제:** Release **생성일:** 2018년 1월 27일 **Python 버전:** 3.8 개요 (Abstract) 이 문서는 Python 3.8의 개발 및 릴리스 스케줄을 설명합니다. 스케줄은...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/569/",
        "teaser": null
      },{
        "title": "[Final] PEP 570 - Python Positional-Only Parameters",
        "excerpt":"원문 링크: PEP 570 - Python Positional-Only Parameters 상태: Final 유형: Standards Track 작성일: 20-Jan-2018 Now I have the content of PEP 0570. I will proceed with the translation and summarization according to the provided guidelines. # PEP 570 – Python Positional-Only Parameters (위치 전용 매개변수) ## 개요 (Abstract) 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/570/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 571 - The manylinux2010 Platform Tag",
        "excerpt":"원문 링크: PEP 571 - The manylinux2010 Platform Tag 상태: Superseded 유형: Informational 작성일: 05-Feb-2018 PEP 571 – manylinux2010 플랫폼 태그 작성자: Mark Williams, Geoffrey Thomas, Thomas Kluyver BDFL-Delegate: Alyssa Coghlan 토론: Distutils-SIG list 상태: Superseded (교체됨) 유형: Informational (정보성) 주제: Packaging (패키징) 작성일: 2018년 2월 5일 Superseded-By: PEP 600...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/571/",
        "teaser": null
      },{
        "title": "[Final] PEP 572 - Assignment Expressions",
        "excerpt":"원문 링크: PEP 572 - Assignment Expressions 상태: Final 유형: Standards Track 작성일: 28-Feb-2018 다음은 PEP 572 – 할당 표현식(Assignment Expressions) 문서의 번역 및 정리 내용입니다. 이 PEP는 Python 3.8에 도입된 := 연산자를 설명하며, 이를 통해 표현식 내부에서 변수에 값을 할당할 수 있게 됩니다. 이 연산자는 흔히 “walrus operator(바다코뿔소 연산자)”로...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/572/",
        "teaser": null
      },{
        "title": "[Final] PEP 573 - Module State Access from C Extension Methods",
        "excerpt":"원문 링크: PEP 573 - Module State Access from C Extension Methods 상태: Final 유형: Standards Track 작성일: 02-Jun-2016 PEP 573 – C 확장 메서드에서 모듈 상태 접근 개요 (Abstract) 이 PEP(Python Enhancement Proposal) 573은 CPython 확장 메서드(C Extension Methods)가 자신이 정의된 모듈의 상태와 같은 컨텍스트에 접근할 수 있는 방법을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/573/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 599 - The manylinux2014 Platform Tag",
        "excerpt":"원문 링크: PEP 599 - The manylinux2014 Platform Tag 상태: Superseded 유형: Informational 작성일: 29-Apr-2019 PEP 599 – manylinux2014 플랫폼 태그 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 기존 PEP 513에서 도입된 manylinux2010 태그를 계승하는 manylinux2014 플랫폼 태그의 생성을 제안합니다. 또한, PyPI(Python Package Index)와 pip가 호환 가능한 플랫폼에서 manylinux2014 배포판의 업로드,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/599/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 608 - Coordinated Python release",
        "excerpt":"원문 링크: PEP 608 - Coordinated Python release 상태: Rejected 유형: Standards Track 작성일: 25-Oct-2019 PEP 608 – Coordinated Python release는 Python 릴리스를 특정 필수 프로젝트들의 호환 가능한 버전이 준비될 때까지 보류하는 것을 제안하는 문서입니다. 이 제안은 거부(Rejected)되었습니다. 목표 Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/608/",
        "teaser": null
      },{
        "title": "[Final] PEP 626 - Precise line numbers for debugging and other tools.",
        "excerpt":"원문 링크: PEP 626 - Precise line numbers for debugging and other tools. 상태: Final 유형: Standards Track 작성일: 15-Jul-2020 PEP 626 – 디버깅 및 기타 도구를 위한 정밀한 줄 번호 (Precise line numbers for debugging and other tools) 저자: Mark Shannon BDFL-Delegate: Pablo Galindo 상태: Final 타입: Standards Track...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/626/",
        "teaser": null
      },{
        "title": "[Final] PEP 627 - Recording installed projects",
        "excerpt":"원문 링크: PEP 627 - Recording installed projects 상태: Final 유형: Standards Track 작성일: 15-Jul-2020 PEP 627 – 설치된 프로젝트 기록 (Recording installed projects) 요약 (Abstract) 이 PEP는 기존의 PEP 376(설치된 Python 배포판 데이터베이스, Database of Installed Python Distributions)을 상호 운용성 표준으로 재작성하여 명확히 하고 업데이트합니다. 표준의 공식 위치를 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/627/",
        "teaser": null
      },{
        "title": "[Final] PEP 628 - Addmath.tau",
        "excerpt":"원문 링크: PEP 628 - Addmath.tau 상태: Final 유형: Standards Track 작성일: 28-Jun-2011 PEP 628 – math.tau 추가 제안 개요 이 문서는 Python 표준 라이브러리에 원 상수 math.tau를 추가할 것을 제안합니다. tau (τ)의 개념은 원의 둘레(circumference)와 반지름(radius)의 비율이 둘레와 지름(diameter)의 비율보다 훨씬 더 근본적이고 흥미롭다는 관찰에 기반합니다. tau는 단순히 2...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/628/",
        "teaser": null
      },{
        "title": "[Final] PEP 629 - Versioning PyPI’s Simple API",
        "excerpt":"원문 링크: PEP 629 - Versioning PyPI’s Simple API 상태: Final 유형: Standards Track 작성일: 16-Jul-2020 PEP 629 – PyPI의 Simple API 버전 관리 초록 (Abstract) 이 PEP는 PyPI(Python Package Index)의 Simple API에 버전 관리 방식을 추가할 것을 제안합니다. 이를 통해 클라이언트가 특정 저장소(repository)가 Simple API의 어떤 기능을 지원하는지 파악할...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/629/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 335 - Overloadable Boolean Operators",
        "excerpt":"원문 링크: PEP 335 - Overloadable Boolean Operators 상태: Rejected 유형: Standards Track 작성일: 29-Aug-2004 PEP 335: 오버로딩 가능한 불리언 연산자 (Overloadable Boolean Operators) 본 문서는 거부(Rejected)된 제안입니다. 개요 (Abstract) 이 PEP는 객체가 불리언 연산자 and, or, not에 대해 자신만의 의미를 정의할 수 있도록 확장하는 방안을 제안하며, 효율적인 구현 전략을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/335/",
        "teaser": null
      },{
        "title": "[Final] PEP 343 - The “with” Statement",
        "excerpt":"원문 링크: PEP 343 - The “with” Statement 상태: Final 유형: Standards Track 작성일: 13-May-2005 PEP 343 – with 문 초록 (Abstract) 이 PEP(Python Enhancement Proposal)는 Python 언어에 새로운 with 문을 추가하여, try/finally 문의 표준적인 사용 패턴을 간결하게 만들 수 있도록 합니다. with 문 내에서, 컨텍스트 매니저(context manager)는 with 문...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/343/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 355 - Path - Object oriented filesystem paths",
        "excerpt":"원문 링크: PEP 355 - Path - Object oriented filesystem paths 상태: Rejected 유형: Standards Track 작성일: 24-Jan-2006 PEP 355 – Path: 객체 지향 파일 시스템 경로 (거부됨) 개요 이 문서는 Python Enhancement Proposal (PEP) 355의 내용을 한국어로 번역하고 요약한 것입니다. PEP 355는 파일 시스템 경로를 객체 지향 방식으로 처리하기...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/355/",
        "teaser": null
      },{
        "title": "[Final] PEP 630 - Isolating Extension Modules",
        "excerpt":"원문 링크: PEP 630 - Isolating Extension Modules 상태: Final 유형: Informational 작성일: 25-Aug-2020 PEP 630 – 확장 모듈 격리 (Isolating Extension Modules) 개요 (Abstract) 기존에는 Python 확장 모듈의 상태(state)가 프로세스 전역 범위(process-wide scope)를 가지는 C 정적 변수(static variables)에 저장되었습니다. 이 문서는 이러한 프로세스 전역 상태의 문제점과, 더 나은 기본값인...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/630/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 631 - Dependency specification in pyproject.toml based on PEP 508",
        "excerpt":"원문 링크: PEP 631 - Dependency specification in pyproject.toml based on PEP 508 상태: Superseded 유형: Standards Track 작성일: 20-Aug-2020 PEP 631: pyproject.toml을 통한 의존성 명세 (PEP 508 기반) 작성자: Ofek Lev 스폰서: Paul Ganssle 상태: Superseded (대체됨) - PEP 621에 병합됨 주제: 패키징 생성일: 2020년 8월 20일 초록 (Abstract)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/631/",
        "teaser": null
      },{
        "title": "[Final] PEP 632 - Deprecate distutils module",
        "excerpt":"원문 링크: PEP 632 - Deprecate distutils module 상태: Final 유형: Standards Track 작성일: 03-Sep-2020 PEP 632 – distutils 모듈 Deprecate (사용 중단) 개요 (Abstract) distutils 모듈은 오랫동안 setuptools 패키지를 대신 사용할 것을 권장해 왔습니다. setuptools는 최근 distutils의 전체 복사본을 통합하여 더 이상 표준 라이브러리에 의존하지 않습니다. pip은 이미 오래전부터...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/632/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 633 - Dependency specification in pyproject.toml using an exploded TOML table",
        "excerpt":"원문 링크: PEP 633 - Dependency specification in pyproject.toml using an exploded TOML table 상태: Rejected 유형: Standards Track 작성일: 02-Sep-2020 PEP 633 – pyproject.toml에서 확장된 TOML 테이블을 사용한 의존성 명세 (Dependency specification in pyproject.toml using an exploded TOML table) 거부 통지 (Rejection Notice) 이 PEP는 PEP 631의 인기도, 기존...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/633/",
        "teaser": null
      },{
        "title": "[Final] PEP 634 - Structural Pattern Matching: Specification",
        "excerpt":"원문 링크: PEP 634 - Structural Pattern Matching: Specification 상태: Final 유형: Standards Track 작성일: 12-Sep-2020 개요 이 문서는 Python 3.10에 도입된 match 문의 핵심 기능인 구조적 패턴 매칭(Structural Pattern Matching)에 대한 기술 명세를 제공합니다. PEP 634는 이전의 PEP 622를 세 부분으로 나눈 것 중 하나로, 패턴 매칭의 구현 및...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/634/",
        "teaser": null
      },{
        "title": "[Final] PEP 635 - Structural Pattern Matching: Motivation and Rationale",
        "excerpt":"원문 링크: PEP 635 - Structural Pattern Matching: Motivation and Rationale 상태: Final 유형: Informational 작성일: 12-Sep-2020 PEP 635 – 구조적 패턴 매칭: 동기 및 근거 (Structural Pattern Matching: Motivation and Rationale) 번역 및 정리 개요 이 문서는 Python 3.10에 도입된 구조적 패턴 매칭(Structural Pattern Matching)의 동기와 설계 배경을 설명하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/635/",
        "teaser": null
      },{
        "title": "[Final] PEP 636 - Structural Pattern Matching: Tutorial",
        "excerpt":"원문 링크: PEP 636 - Structural Pattern Matching: Tutorial 상태: Final 유형: Informational 작성일: 12-Sep-2020 PEP 636 – 구조적 패턴 매칭: 튜토리얼 Python Enhancement Proposals Python » PEP Index » PEP 636 PEP 636 – Structural Pattern Matching: Tutorial 작성자 (Author): Daniel F Moisset 후원자 (Sponsor): Guido van Rossum BDFL-대리인...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/636/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 637 - Support for indexing with keyword arguments",
        "excerpt":"원문 링크: PEP 637 - Support for indexing with keyword arguments 상태: Rejected 유형: Standards Track 작성일: 24-Aug-2020 PEP 637: 키워드 인자를 사용한 인덱싱 지원 (결론: 거부됨) 요약 PEP 637은 Python의 아이템 접근(item access), 즉 [] (대괄호)를 사용한 인덱싱 연산에 키워드 인자(keyword arguments)를 허용하도록 확장하는 것을 제안했습니다. 이 제안은 f(a=1,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/637/",
        "teaser": null
      },{
        "title": "[Draft] PEP 638 - Syntactic Macros",
        "excerpt":"원문 링크: PEP 638 - Syntactic Macros 상태: Draft 유형: Standards Track 작성일: 24-Sep-2020 PEP 638 – 구문 매크로 (Syntactic Macros) 작성자: Mark Shannon 상태: 초안 (Draft) 생성일: 2020년 9월 24일 요약 (Abstract) 이 PEP는 Python에 구문 매크로(syntactic macros) 지원을 추가하는 것을 제안합니다. 매크로는 일반 라이브러리 코드로는 깔끔하게 표현할 수...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/638/",
        "teaser": null
      },{
        "title": "[Final] PEP 639 - Improving License Clarity with Better Package Metadata",
        "excerpt":"원문 링크: PEP 639 - Improving License Clarity with Better Package Metadata 상태: Final 유형: Standards Track 작성일: 15-Aug-2019 PEP 639 – 더 나은 패키지 메타데이터로 라이선스 명확성 향상 개요 이 PEP (Python Enhancement Proposal)는 Python 프로젝트에서 라이선스를 명확하게 문서화하기 위한 새로운 표준을 정의합니다. 주요 목표는 패키지 작성자가 라이선스를 더...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/639/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 640 - Unused variable syntax",
        "excerpt":"원문 링크: PEP 640 - Unused variable syntax 상태: Rejected 유형: Standards Track 작성일: 04-Oct-2020 PEP 640: 사용되지 않는 변수 구문 제안 번역 및 해설 거부(Rejection) 사유 PEP 640은 스티어링 위원회에 의해 거부되었습니다. 관련 내용은 다음 링크에서 확인할 수 있습니다: https://mail.python.org/archives/list/python-dev@python.org/message/SQC2FTLFV5A7DV7RCEAR2I2IKJKGK7W3/ 초록 (Abstract) 이 PEP는 사용되지 않는 변수를 위한 새로운...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/640/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 641 - Using an underscore in the version portion of Python 3.10 compatibility tags",
        "excerpt":"원문 링크: PEP 641 - Using an underscore in the version portion of Python 3.10 compatibility tags 상태: Rejected 유형: Standards Track 작성일: 20-Oct-2020 PEP 641: Python 3.10 호환성 태그 버전 부분에 언더스코어 사용 작성자: Brett Cannon, Steve Dower, Barry Warsaw PEP 대리인: Pablo Galindo 상태: 거절됨 (Rejected) 유형: Standards...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/641/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 642 - Explicit Pattern Syntax for Structural Pattern Matching",
        "excerpt":"원문 링크: PEP 642 - Explicit Pattern Syntax for Structural Pattern Matching 상태: Rejected 유형: Standards Track 작성일: 26-Sep-2020 PEP 642: 구조적 패턴 매칭을 위한 명시적 패턴 구문 초록 (Abstract) 이 PEP는 PEP 634의 구조적 패턴 매칭(structural pattern matching)에 대한 대체 구문 제안을 다룹니다. 이 제안은 모든 캡처 패턴(capture patterns)과...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/642/",
        "teaser": null
      },{
        "title": "[Final] PEP 643 - Metadata for Package Source Distributions",
        "excerpt":"원문 링크: PEP 643 - Metadata for Package Source Distributions 상태: Final 유형: Standards Track 작성일: 24-Oct-2020 PEP 643 – 패키지 소스 배포판을 위한 메타데이터 개요 (Abstract) Python 패키지 메타데이터는 Core Metadata Specification에 정의된 표준 형식으로 배포 파일에 저장됩니다. 그러나 소스 배포판(Source Distributions, sdist)의 경우, 데이터 형식은 정의되어 있지만 어떤...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/643/",
        "teaser": null
      },{
        "title": "[Final] PEP 644 - Require OpenSSL 1.1.1 or newer",
        "excerpt":"원문 링크: PEP 644 - Require OpenSSL 1.1.1 or newer 상태: Final 유형: Standards Track 작성일: 27-Oct-2020 PEP 644 – OpenSSL 1.1.1 이상 버전 요구 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 CPython의 표준 라이브러리가 OpenSSL 1.1.1 LTS(Long Term Support) 버전 또는 그 이후 버전만을 지원하도록 제안합니다. 지원 기간이 종료된 OpenSSL...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/644/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 645 - Allow writing optional types asx?",
        "excerpt":"원문 링크: PEP 645 - Allow writing optional types asx? 상태: Withdrawn 유형: Standards Track 작성일: 25-Aug-2020 PEP 645 – Optional 타입 표기를 위한 x? 문법 허용 제안 (철회됨) 개요 이 문서는 Optional[int] 대신 int?와 같이 ? 연산자를 사용하여 Optional 타입을 표기하는 새로운 문법을 추가할 것을 제안했습니다. PEP 철회 동기...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/645/",
        "teaser": null
      },{
        "title": "[Final] PEP 646 - Variadic Generics",
        "excerpt":"원문 링크: PEP 646 - Variadic Generics 상태: Final 유형: Standards Track 작성일: 16-Sep-2020 PEP 646 – 가변 제네릭 (Variadic Generics) 개요 PEP 484는 단일 타입으로 매개변수화되는 제네릭을 생성하기 위한 TypeVar를 도입했습니다. 이 PEP에서는 임의의 수의 타입으로 매개변수화를 가능하게 하는 TypeVarTuple을 소개하며, 이를 통해 가변 제네릭(variadic generics)을 지원합니다. 이는 다양한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/646/",
        "teaser": null
      },{
        "title": "[Final] PEP 647 - User-Defined Type Guards",
        "excerpt":"원문 링크: PEP 647 - User-Defined Type Guards 상태: Final 유형: Standards Track 작성일: 07-Oct-2020 PEP 647은 Python의 타입 힌팅 시스템을 강화하여, 런타임 검사에 기반한 조건부 타입 좁히기(conditional type narrowing) 기능을 사용자 정의 함수로 확장할 수 있도록 TypeGuard라는 새로운 개념을 도입합니다. 이 제안의 목표는 정적 타입 검사기가 런타임 시 특정...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/647/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 648 - Extensible customizations of the interpreter at startup",
        "excerpt":"원문 링크: PEP 648 - Extensible customizations of the interpreter at startup 상태: Rejected 유형: Standards Track 작성일: 30-Dec-2020 PEP 648: 인터프리터 시작 시 확장 가능한 사용자 정의 요약 (Abstract) 이 PEP는 사용자가 시작 시 실행될 파일을 설치할 수 있도록 하여 인터프리터의 확장 가능한 사용자 정의를 지원하는 방법을 제안합니다. PEP...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/648/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 649 - Deferred Evaluation Of Annotations Using Descriptors",
        "excerpt":"원문 링크: PEP 649 - Deferred Evaluation Of Annotations Using Descriptors 상태: Accepted 유형: Standards Track 작성일: 11-Jan-2021 PEP 649 – Descriptors를 사용한 Annotation 지연 평가 (Deferred Evaluation Of Annotations Using Descriptors) 요약 (Abstract) Annotation은 Python 함수, 클래스, 모듈에 대한 타입 정보 및 기타 메타데이터를 표현하는 Python 기술입니다. 하지만 Python의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/649/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 650 - Specifying Installer Requirements for Python Projects",
        "excerpt":"원문 링크: PEP 650 - Specifying Installer Requirements for Python Projects 상태: Withdrawn 유형: Standards Track 작성일: 16-Jul-2020 PEP 650 – Python 프로젝트를 위한 설치 프로그램 요구사항 명세 (Withdrawn) 작성자: Vikram Jayanthi, Dustin Ingram, Brett Cannon 토론: Discourse 스레드 상태: 철회됨 (Withdrawn) 유형: 표준 트랙 (Standards Track) 주제: 패키징 (Packaging)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/650/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 651 - Robust Stack Overflow Handling",
        "excerpt":"원문 링크: PEP 651 - Robust Stack Overflow Handling 상태: Rejected 유형: Standards Track 작성일: 18-Jan-2021 PEP 651 – 견고한 스택 오버플로우 처리 작성자: Mark Shannon 상태: 거절됨 (Rejected) 유형: 표준 트랙 (Standards Track) 생성일: 2021년 1월 18일 최종 수정일: 2025년 2월 1일 거절 공지 (Rejection Notice) 이 PEP는 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/651/",
        "teaser": null
      },{
        "title": "[Final] PEP 652 - Maintaining the Stable ABI",
        "excerpt":"원문 링크: PEP 652 - Maintaining the Stable ABI 상태: Final 유형: Standards Track 작성일: 09-Feb-2021 PEP 652 – Stable ABI 유지 관리 개요 PEP 652는 CPython의 Limited C-API와 Stable ABI(PEP 384에서 도입)를 단일하고 명확한 파일로 공식화하고, 이를 테스트하며 문서화하는 것을 목표로 합니다. 이를 통해 CPython 확장 모듈 개발자들이 바이너리...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/652/",
        "teaser": null
      },{
        "title": "[Draft] PEP 653 - Precise Semantics for Pattern Matching",
        "excerpt":"원문 링크: PEP 653 - Precise Semantics for Pattern Matching 상태: Draft 유형: Standards Track 작성일: 09-Feb-2021 PEP 653 – 패턴 매칭을 위한 정밀한 의미론 저자: Mark Shannon 상태: Draft (초안) 유형: Standards Track (표준 트랙) 생성일: 2021년 2월 9일 개정 이력: 2021년 2월 18일 요약 (Abstract) 이 PEP는 PEP...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/653/",
        "teaser": null
      },{
        "title": "[Final] PEP 654 - Exception Groups and except*",
        "excerpt":"원문 링크: PEP 654 - Exception Groups and except* 상태: Final 유형: Standards Track 작성일: 22-Feb-2021 PEP 654 – 예외 그룹 및 except* (Exception Groups and except*) 한국어 번역 및 요약 초록 (Abstract) 이 문서는 프로그램이 여러 개의 관련 없는 예외를 동시에 발생시키고 처리할 수 있도록 하는 언어 확장을 제안합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/654/",
        "teaser": null
      },{
        "title": "[Final] PEP 655 - Marking individual TypedDict items as required or potentially-missing",
        "excerpt":"원문 링크: PEP 655 - Marking individual TypedDict items as required or potentially-missing 상태: Final 유형: Standards Track 작성일: 30-Jan-2021 PEP 655 – TypedDict 개별 항목을 필수 또는 선택으로 표시하기 개요 PEP 589는 모든 키가 필수인 TypedDict와 모든 키가 선택인 TypedDict를 선언하는 방법을 정의하지만, 일부 키는 필수이고 다른 키는 선택인...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/655/",
        "teaser": null
      },{
        "title": "[Final] PEP 656 - Platform Tag for Linux Distributions Using Musl",
        "excerpt":"원문 링크: PEP 656 - Platform Tag for Linux Distributions Using Musl 상태: Final 유형: Standards Track 작성일: 17-Mar-2021 PEP 656 – Musl을 사용하는 Linux 배포판을 위한 플랫폼 태그 개요 이 PEP 656은 musl 기반의 Linux 배포판에서 Python 바이너리 패키지를 배포하기 위한 새로운 플랫폼 태그 시리즈인 musllinux를 제안합니다. 이 태그는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/656/",
        "teaser": null
      },{
        "title": "[Final] PEP 657 - Include Fine Grained Error Locations in Tracebacks",
        "excerpt":"원문 링크: PEP 657 - Include Fine Grained Error Locations in Tracebacks 상태: Final 유형: Standards Track 작성일: 08-May-2021 PEP 657 – 트레이스백에 상세한 오류 위치 정보 포함 (Include Fine Grained Error Locations in Tracebacks) 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 각 바이트코드(bytecode) 명령어에 대해 해당 명령어를 생성한 코드 라인의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/657/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 658 - Serve Distribution Metadata in the Simple Repository API",
        "excerpt":"원문 링크: PEP 658 - Serve Distribution Metadata in the Simple Repository API 상태: Accepted 유형: Standards Track 작성일: 10-May-2021 PEP 658 – Simple Repository API에서 배포 메타데이터 제공 개요 이 문서는 PEP 503 “simple” 저장소 API에서 배포(distribution)의 METADATA 파일을 노출하기 위해 앵커 태그(anchor tag)를 추가할 것을 제안합니다. data-dist-info-metadata 속성이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/658/",
        "teaser": null
      },{
        "title": "[Final] PEP 659 - Specializing Adaptive Interpreter",
        "excerpt":"원문 링크: PEP 659 - Specializing Adaptive Interpreter 상태: Final 유형: Informational 작성일: 13-Apr-2021 PEP 659: 특수화 적응형 인터프리터 (Specializing Adaptive Interpreter) 요약 (Abstract) 동적 언어용 가상 머신(Virtual Machine)이 좋은 성능을 내기 위해서는 실행되는 프로그램의 타입(type)과 값(value)에 맞춰 코드를 특수화(specialize)해야 합니다. 이러한 특수화는 종종 JIT(Just-In-Time) 컴파일러와 연관되지만, 기계어 코드 생성...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/659/",
        "teaser": null
      },{
        "title": "[Final] PEP 660 - Editable installs for pyproject.toml based builds (wheel based)",
        "excerpt":"원문 링크: PEP 660 - Editable installs for pyproject.toml based builds (wheel based) 상태: Final 유형: Standards Track 작성일: 30-Mar-2021 PEP 660 – pyproject.toml 기반 빌드를 위한 편집 가능(Editable) 설치 (휠 기반) 초록 (Abstract) 이 문서는 패키지를 편집 가능(editable) 모드로 설치하기 위한 PEP 517 스타일의 메서드를 설명합니다. 동기 (Motivation) Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/660/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 661 - Sentinel Values",
        "excerpt":"원문 링크: PEP 661 - Sentinel Values 상태: Deferred 유형: Standards Track 작성일: 06-Jun-2021 PEP 661 – Sentinel 값 (Sentinel Values) 작성자: Tal Einat 논의처: Discourse 스레드 상태: 연기됨 (Deferred) 유형: 표준 트랙 (Standards Track) 생성일: 2021년 6월 6일 게시 이력: 2021년 5월 20일, 2021년 6월 6일 개요 (Abstract) 프로그래밍에서...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/661/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 662 - Editable installs via virtual wheels",
        "excerpt":"원문 링크: PEP 662 - Editable installs via virtual wheels 상태: Rejected 유형: Standards Track 작성일: 28-May-2021 PEP 662 – 가상 휠(Virtual Wheels)을 통한 편집 가능 설치 (Editable Installs) 개요 (Abstract) 이 문서는 PEP 517에서 도입된 빌드 백엔드(build backend)와 프론트엔드(frontend) 간의 통신을 확장하여, 가상 휠(virtual wheels)을 통해 프로젝트를 편집 가능...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/662/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 663 - Standardizing Enum str(), repr(), and format() behaviors",
        "excerpt":"원문 링크: PEP 663 - Standardizing Enum str(), repr(), and format() behaviors 상태: Rejected 유형: Informational 작성일: 30-Jun-2021 PEP 663 – Enum의 str(), repr(), format() 동작 표준화 작성자: Ethan Furman 상태: Rejected (거부됨) 타입: Informational (정보성) 생성일: 2021년 6월 30일 Python 버전: 3.11 해결: Python-Dev 메시지 개요 (Abstract) 이 PEP는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/663/",
        "teaser": null
      },{
        "title": "[Active] PEP 664 - Python 3.11 Release Schedule",
        "excerpt":"원문 링크: PEP 664 - Python 3.11 Release Schedule 상태: Active 유형: Informational 작성일: 12-Jul-2021 개요 이 문서는 Python 3.11의 개발 및 릴리스 일정을 기술합니다. 일정은 주로 PEP 규모의 항목들을 다룹니다. 릴리스 매니저 및 팀 3.11 릴리스 매니저: Pablo Galindo Salgado Windows 인스톨러: Steve Dower Mac 인스톨러: Ned Deily 문서화:...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/664/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 665 - A file format to list Python dependencies for reproducibility of an application",
        "excerpt":"원문 링크: PEP 665 - A file format to list Python dependencies for reproducibility of an application 상태: Rejected 유형: Standards Track 작성일: 29-Jul-2021 PEP 665: 애플리케이션 재현 가능성을 위한 Python 의존성 목록 파일 형식 (거부됨) 개요 (Abstract) 이 PEP는 애플리케이션의 Python 패키지 설치 요구사항 목록과 그 관계를 명시하는 파일...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/665/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 666 - Reject Foolish Indentation",
        "excerpt":"원문 링크: PEP 666 - Reject Foolish Indentation 상태: Rejected 유형: Standards Track 작성일: 03-Dec-2001 PEP 666 – 어리석은 들여쓰기 거부 (Reject Foolish Indentation) 작성자: Laura Creighton 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2001년 12월 3일 Python 버전: 2.2 게시 이력: 2001년 12월 5일 초록 (Abstract) 모든 Python 개발자는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/666/",
        "teaser": null
      },{
        "title": "[Final] PEP 667 - Consistent views of namespaces",
        "excerpt":"원문 링크: PEP 667 - Consistent views of namespaces 상태: Final 유형: Standards Track 작성일: 30-Jul-2021 PEP 667 – Consistent views of namespaces (네임스페이스의 일관된 뷰) 작성자: Mark Shannon, Tian Gao 상태: Final (최종) 유형: Standards Track Python 버전: 3.13 생성일: 2021년 7월 30일 해결일: 2024년 4월 25일 이 PEP는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/667/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 668 - Marking Python base environments as “externally managed”",
        "excerpt":"원문 링크: PEP 668 - Marking Python base environments as “externally managed” 상태: Accepted 유형: Standards Track 작성일: 18-May-2021 PEP 668 – Python 기본 환경을 “외부 관리”로 표시 개요 (Abstract) 이 PEP는 OS 패키지 관리자와 pip와 같은 Python 전용 패키지 관리 도구 간의 오랜 충돌 문제를 해결하기 위한 메커니즘을 제안합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/668/",
        "teaser": null
      },{
        "title": "[Final] PEP 669 - Low Impact Monitoring for CPython",
        "excerpt":"원문 링크: PEP 669 - Low Impact Monitoring for CPython 상태: Final 유형: Standards Track 작성일: 18-Aug-2021 PEP 669 – CPython을 위한 저영향 모니터링 (Low Impact Monitoring for CPython) 개요 (Abstract) CPython에서 프로파일러(profiler)나 디버거(debugger)를 사용하는 것은 프로그램 성능에 심각한 영향을 미칠 수 있으며, 성능 저하가 한 자릿수(order of magnitude)에 달하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/669/",
        "teaser": null
      },{
        "title": "[Final] PEP 670 - Convert macros to functions in the Python C API",
        "excerpt":"원문 링크: PEP 670 - Convert macros to functions in the Python C API 상태: Final 유형: Standards Track 작성일: 19-Oct-2021 PEP 670 – Python C API의 매크로를 함수로 변환 개요 (Abstract) 이 PEP (Python Enhancement Proposal)는 Python C API 내의 매크로(macros)를 static inline 함수 또는 일반 함수(regular functions)로 변환하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/670/",
        "teaser": null
      },{
        "title": "[Draft] PEP 671 - Syntax for late-bound function argument defaults",
        "excerpt":"원문 링크: PEP 671 - Syntax for late-bound function argument defaults 상태: Draft 유형: Standards Track 작성일: 24-Oct-2021 PEP 671 – 함수 인자 지연 바인딩 기본값 구문 초록 (Abstract) 함수 매개변수는 함수 정의 시점에 계산되어 저장되는 기본값을 가질 수 있습니다. 이 제안은 함수 호출 시점에 평가되는 표현식으로 정의되는 새로운 형태의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/671/",
        "teaser": null
      },{
        "title": "[Active] PEP 672 - Unicode-related Security Considerations for Python",
        "excerpt":"원문 링크: PEP 672 - Unicode-related Security Considerations for Python 상태: Active 유형: Informational 작성일: 01-Nov-2021 PEP 672 – Python의 유니코드 관련 보안 고려사항 작성자: Petr Viktorin 상태: Active (활성) 유형: Informational (정보성) 생성일: 2021년 11월 1일 초록 (Abstract) 이 문서는 유니코드를 오용하여 실제 의도와 다르게 보이는 Python 프로그램을 작성할...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/672/",
        "teaser": null
      },{
        "title": "[Final] PEP 673 - Self Type",
        "excerpt":"원문 링크: PEP 673 - Self Type 상태: Final 유형: Standards Track 작성일: 10-Nov-2021 PEP 673 – Self 타입 요약 (Abstract) 이 PEP는 메서드가 자신의 클래스 인스턴스를 반환할 때 이를 어노테이션(annotation)하는 간단하고 직관적인 방법을 제안합니다. 이 방식은 기존의 TypeVar 기반 접근 방식(PEP 484에 명시됨)과 동일하게 작동하지만, 더 간결하고 이해하기 쉽습니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/673/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 674 - Disallow using macros as l-values",
        "excerpt":"원문 링크: PEP 674 - Disallow using macros as l-values 상태: Deferred 유형: Standards Track 작성일: 30-Nov-2021 PEP 674 – 매크로를 좌변값(l-value)으로 사용하는 것을 금지 초록 (Abstract) 이 PEP는 C API에서 매크로를 좌변값(l-value)으로 사용하는 것을 금지하는 것을 제안합니다. 예를 들어, Py_TYPE(obj) = new_type과 같은 코드는 이제 컴파일러 오류를 발생시킵니다. 실제로는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/674/",
        "teaser": null
      },{
        "title": "[Final] PEP 675 - Arbitrary Literal String Type",
        "excerpt":"원문 링크: PEP 675 - Arbitrary Literal String Type 상태: Final 유형: Standards Track 작성일: 30-Nov-2021 PEP 675: 임의의 리터럴 문자열 타입 (Arbitrary Literal String Type) 개요 (Abstract) 현재 Python에서는 특정 리터럴 문자열(예: Literal[\"foo\"])이 아닌, “어떤” 리터럴 문자열 타입이든 허용하는 함수 매개변수를 타입 어노테이션으로 지정할 방법이 없습니다. 이 PEP는 리터럴...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/675/",
        "teaser": null
      },{
        "title": "[Active] PEP 676 - PEP Infrastructure Process",
        "excerpt":"원문 링크: PEP 676 - PEP Infrastructure Process 상태: Active 유형: Process 작성일: 01-Nov-2021 파이썬 PEP 676 – PEP 인프라 프로세스 번역 및 설명 개요 PEP 676은 reStructuredText 파일에서 HTML 웹페이지로 PEP 파일을 렌더링하는 인프라를 다룹니다. 이 제안은 PEP 독자, 작성자 및 편집자를 위한 자체 포함되고 유지보수 가능한 솔루션을 명확히...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/676/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 677 - Callable Type Syntax",
        "excerpt":"원문 링크: PEP 677 - Callable Type Syntax 상태: Rejected 유형: Standards Track 작성일: 13-Dec-2021 요약 (Abstract) 이 PEP는 typing.Callable과 동일한 기능을 지원하면서도, 타입이 지정된 함수 시그니처에서 영감을 받은 화살표 문법으로 Callable 타입을 표현하는 간결하고 친숙한 문법을 도입합니다. 이를 통해 Callable[[int, str], bool]과 같은 타입은 (int, str) -&gt; bool로 작성할...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/677/",
        "teaser": null
      },{
        "title": "[Final] PEP 678 - Enriching Exceptions with Notes",
        "excerpt":"원문 링크: PEP 678 - Enriching Exceptions with Notes 상태: Final 유형: Standards Track 작성일: 20-Dec-2021 PEP 678 – 예외에 Notes 추가하기 초록 (Abstract) Python의 예외(Exception) 객체는 일반적으로 발생한 오류를 설명하는 메시지로 초기화됩니다. 하지만 예외가 포착(catch)되어 다시 발생(re-raise)되거나 ExceptionGroup에 포함될 때 추가 정보가 필요할 수 있습니다. PEP 678은 이러한 필요에...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/678/",
        "teaser": null
      },{
        "title": "[Draft] PEP 679 - New assert statement syntax with parentheses",
        "excerpt":"원문 링크: PEP 679 - New assert statement syntax with parentheses 상태: Draft 유형: Standards Track 작성일: 07-Jan-2022 PEP 679 – 괄호가 있는 새로운 assert 문법 개요 (Abstract) 이 PEP는 두 인수를 받는 assert 문에서 괄호 사용을 허용하는 것을 제안합니다. 즉, assert (expr, msg) 형태의 코드를 인터프리터가 assert expr, msg로...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/679/",
        "teaser": null
      },{
        "title": "[Final] PEP 680 - tomllib: Support for Parsing TOML in the Standard Library",
        "excerpt":"원문 링크: PEP 680 - tomllib: Support for Parsing TOML in the Standard Library 상태: Final 유형: Standards Track 작성일: 01-Jan-2022 PEP 680 – tomllib: 표준 라이브러리에 TOML 파싱 지원 추가 요약 (Abstract) 이 PEP는 TOML(Tom’s Obvious Minimal Language, https://toml.io) 파싱을 위한 tomllib 모듈을 Python 표준 라이브러리에 추가할 것을 제안합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/680/",
        "teaser": null
      },{
        "title": "[Final] PEP 681 - Data Class Transforms",
        "excerpt":"원문 링크: PEP 681 - Data Class Transforms 상태: Final 유형: Standards Track 작성일: 02-Dec-2021 PEP 681 – Data Class Transforms 개요 (Abstract) PEP 557은 Python 표준 라이브러리에 dataclass를 도입했습니다. dataclass와 유사한 동작을 제공하지만 표준 타입 어노테이션으로는 설명할 수 없는 인기 있는 라이브러리들(예: attrs, pydantic, SQLAlchemy, Django와 같은 ORM 패키지)이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/681/",
        "teaser": null
      },{
        "title": "[Final] PEP 682 - Format Specifier for Signed Zero",
        "excerpt":"원문 링크: PEP 682 - Format Specifier for Signed Zero 상태: Final 유형: Standards Track 작성일: 29-Jan-2022 PEP 682 – 부호 있는 0에 대한 형식 지정자 개요 이 문서는 Python의 float 및 Decimal 타입이 부호 있는 0(예: -0.0)을 표현할 수 있음에도 불구하고, 많은 수학 분야에서 음수 0이 예상치 못하거나 원치...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/682/",
        "teaser": null
      },{
        "title": "[Final] PEP 683 - Immortal Objects, Using a Fixed Refcount",
        "excerpt":"원문 링크: PEP 683 - Immortal Objects, Using a Fixed Refcount 상태: Final 유형: Standards Track 작성일: 10-Feb-2022 PEP 683 – 고정된 참조 카운트(Refcount)를 사용하는 불멸(Immortal) 객체 목표 이 PEP는 CPython 내부적으로 특정 객체들을 “불멸(Immortal)”로 지정하여 참조 카운트(refcount) 조작으로 인한 오버헤드를 줄이고, 멀티코어 및 멀티프로세스 환경에서의 성능과 확장성을 개선하는 것을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/683/",
        "teaser": null
      },{
        "title": "[Final] PEP 684 - A Per-Interpreter GIL",
        "excerpt":"원문 링크: PEP 684 - A Per-Interpreter GIL 상태: Final 유형: Standards Track 작성일: 08-Mar-2022 PEP 684 – 인터프리터별 GIL (A Per-Interpreter GIL) 작성자: Eric Snow 상태: Final (최종) 유형: Standards Track (표준 트랙) Python 버전: 3.12 생성일: 2022년 3월 8일 개요 (Abstract) Python 1.5 (1997년) 이후로 CPython 사용자들은 동일...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/684/",
        "teaser": null
      },{
        "title": "[Final] PEP 685 - Comparison of extra names for optional distribution dependencies",
        "excerpt":"원문 링크: PEP 685 - Comparison of extra names for optional distribution dependencies 상태: Final 유형: Standards Track 작성일: 08-Mar-2022 PEP 685 – 선택적 배포 종속성(extra name) 비교를 위한 이름 정규화 개요 (Abstract) 이 PEP는 배포 extra name을 비교할 때 어떻게 이름을 정규화해야 하는지를 명시합니다. 이를 통해 도구들이 extra name을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/685/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 686 - Make UTF-8 mode default",
        "excerpt":"원문 링크: PEP 686 - Make UTF-8 mode default 상태: Accepted 유형: Standards Track 작성일: 18-Mar-2022 PEP 686 – UTF-8 모드 기본값으로 설정 작성자: Inada Naoki 상태: Accepted (승인됨) 유형: Standards Track (표준 트랙) 생성일: 2022년 3월 18일 Python 버전: 3.15 해결: Discourse 메시지 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/686/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 687 - Isolating modules in the standard library",
        "excerpt":"원문 링크: PEP 687 - Isolating modules in the standard library 상태: Accepted 유형: Standards Track 작성일: 04-Apr-2022 요약 이 PEP는 표준 라이브러리의 확장 모듈(Extension Modules)을 다단계 초기화(multi-phase initialization, PEP 489) 방식으로 전환하고, 가능한 모든 상태를 프로세스 전역 변수 대신 모듈 객체에 저장하도록 제안합니다. 배경 및 동기 이 제안의 배경,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/687/",
        "teaser": null
      },{
        "title": "[Final] PEP 688 - Making the buffer protocol accessible in Python",
        "excerpt":"원문 링크: PEP 688 - Making the buffer protocol accessible in Python 상태: Final 유형: Standards Track 작성일: 23-Apr-2022 PEP 688 – Python에서 버퍼 프로토콜 접근성 확보 초록 (Abstract) 이 PEP는 현재 C 코드에서만 접근 가능한 버퍼 프로토콜(buffer protocol)에 대해 Python 레벨 API를 제안합니다. 이를 통해 타입 체커(type checker)가 객체가...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/688/",
        "teaser": null
      },{
        "title": "[Final] PEP 689 - Unstable C API tier",
        "excerpt":"원문 링크: PEP 689 - Unstable C API tier 상태: Final 유형: Standards Track 작성일: 22-Apr-2022 PEP 689 – 불안정한 C API 계층 (Unstable C API tier) 요약 (Abstract) 이 PEP는 C-API의 일부 함수와 타입을 “불안정(unstable)”으로 지정할 것을 제안합니다. 이는 해당 API가 패치 (버그 수정/보안) 릴리스에서는 변경되지 않지만, 마이너 릴리스...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/689/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 690 - Lazy Imports",
        "excerpt":"원문 링크: PEP 690 - Lazy Imports 상태: Rejected 유형: Standards Track 작성일: 29-Apr-2022 PEP 690 – Lazy Imports (지연 임포트) 개요 (Abstract) 이 PEP는 임포트된 모듈의 검색 및 실행을 임포트된 객체가 처음 사용되는 순간까지 투명하게 지연시키는 기능을 제안합니다. Python 프로그램은 일반적으로 한 번의 실행에서 실제로 사용될 가능성이 있는 것보다...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/690/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 691 - JSON-based Simple API for Python Package Indexes",
        "excerpt":"원문 링크: PEP 691 - JSON-based Simple API for Python Package Indexes 상태: Accepted 유형: Standards Track 작성일: 04-May-2022 초록 (Abstract) PEP 503에 정의된(그리고 그보다 훨씬 오래 사용되어 온) “Simple Repository API”는 오랫동안 상당히 잘 사용되어 왔습니다. 그러나 데이터 교환 메커니즘으로 HTML을 사용하는 방식에는 몇 가지 단점이 있습니다. HTML 기반...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/691/",
        "teaser": null
      },{
        "title": "[Final] PEP 692 - Using TypedDict for more precise **kwargs typing",
        "excerpt":"원문 링크: PEP 692 - Using TypedDict for more precise **kwargs typing 상태: Final 유형: Standards Track 작성일: 29-May-2022 PEP 692 – 보다 정밀한 **kwargs 타입 지정을 위한 TypedDict 활용 개요 이 PEP는 **kwargs에 포함된 키워드 인자들의 타입이 서로 다를 때, TypedDict를 사용하여 보다 정밀하게 **kwargs의 타입을 지정할 수 있는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/692/",
        "teaser": null
      },{
        "title": "[Active] PEP 693 - Python 3.12 Release Schedule",
        "excerpt":"원문 링크: PEP 693 - Python 3.12 Release Schedule 상태: Active 유형: Informational 작성일: 24-May-2022 PEP 693 – Python 3.12 릴리스 스케줄 작성자: Thomas Wouters 상태: Active (활성) 유형: Informational (정보성) 주제: Release (릴리스) 생성일: 2022년 5월 24일 Python 버전: 3.12 개요 (Abstract) 이 문서는 Python 3.12의 개발 및 릴리스...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/693/",
        "teaser": null
      },{
        "title": "[Draft] PEP 694 - Upload 2.0 API for Python Package Indexes",
        "excerpt":"원문 링크: PEP 694 - Upload 2.0 API for Python Package Indexes 상태: Draft 유형: Standards Track 작성일: 11-Jun-2022 PEP 694 – Python 패키지 인덱스를 위한 Upload 2.0 API 개요 (Abstract) 이 PEP는 PyPI(Python Package Index)와 같은 Python 패키지 인덱스에 파일을 업로드하기 위한 확장 가능한 API를 제안합니다. 이 새로운 업로드...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/694/",
        "teaser": null
      },{
        "title": "[Final] PEP 695 - Type Parameter Syntax",
        "excerpt":"원문 링크: PEP 695 - Type Parameter Syntax 상태: Final 유형: Standards Track 작성일: 15-Jun-2022 PEP 695 – 타입 매개변수 구문 작성자: Eric Traut 후원자: Guido van Rossum 상태: Final 타입: Standards Track (표준 트랙) 주제: Typing (타입 힌트) 생성일: 2022년 6월 15일 Python 버전: 3.12 해결책: Discourse message 초록...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/695/",
        "teaser": null
      },{
        "title": "[Final] PEP 696 - Type Defaults for Type Parameters",
        "excerpt":"원문 링크: PEP 696 - Type Defaults for Type Parameters 상태: Final 유형: Standards Track 작성일: 14-Jul-2022 PEP 696 – 타입 파라미터의 기본값 (Type Defaults for Type Parameters) 개요 이 PEP (Python Enhancement Proposal)는 TypeVar, ParamSpec, TypeVarTuple을 포함한 타입 파라미터에 ‘타입 기본값 (type defaults)’ 개념을 도입합니다. 이는 특정 타입이 지정되지...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/696/",
        "teaser": null
      },{
        "title": "[Final] PEP 697 - Limited C API for Extending Opaque Types",
        "excerpt":"원문 링크: PEP 697 - Limited C API for Extending Opaque Types 상태: Final 유형: Standards Track 작성일: 23-Aug-2022 PEP 697 – 불투명 타입 확장을 위한 Limited C API 이 문서는 Python Enhancement Proposal (PEP) 697의 내용을 한국어 사용자가 이해하기 쉽게 번역하고 정리한 것입니다. 이 PEP는 C API를 사용하여 불투명(opaque)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/697/",
        "teaser": null
      },{
        "title": "[Final] PEP 698 - Override Decorator for Static Typing",
        "excerpt":"원문 링크: PEP 698 - Override Decorator for Static Typing 상태: Final 유형: Standards Track 작성일: 05-Sep-2022 PEP 698 – 정적 타이핑을 위한 Override 데코레이터 초록 (Abstract) 이 PEP는 Python 타입 시스템에 @override 데코레이터를 추가할 것을 제안합니다. 이 데코레이터를 통해 타입 검사기는(type checkers) 기본 클래스(base class)가 파생 클래스(derived class)에 의해...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/698/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 699 - Remove private dict version field added in PEP 509",
        "excerpt":"원문 링크: PEP 699 - Remove private dict version field added in PEP 509 상태: Accepted 유형: Standards Track 작성일: 03-Oct-2022 PEP 699: PEP 509에서 추가된 비공개 딕셔너리 버전 필드 제거 작성자: Ken Jin 상태: Accepted (수락됨) 유형: Standards Track 생성일: 2022년 10월 3일 Python 버전: 3.12 대체: PEP 509...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/699/",
        "teaser": null
      },{
        "title": "[Final] PEP 700 - Additional Fields for the Simple API for Package Indexes",
        "excerpt":"원문 링크: PEP 700 - Additional Fields for the Simple API for Package Indexes 상태: Final 유형: Standards Track 작성일: 21-Oct-2022 PEP 700: Simple Package Index를 위한 추가 필드 개요 PEP 700은 Python Package Index (PyPI)와 같은 Simple Repository API의 JSON 형식에 세 가지 필드를 추가하는 제안입니다. 이 제안은 PyPI의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/700/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 701 - Syntactic formalization of f-strings",
        "excerpt":"원문 링크: PEP 701 - Syntactic formalization of f-strings 상태: Accepted 유형: Standards Track 작성일: 15-Nov-2022 PEP 701 – f-string의 문법적 형식화 (Syntactic formalization of f-strings) 저자: Pablo Galindo, Batuhan Taskaya, Lysandros Nikolaou, Marta Gómez Macías 상태: Accepted (수락됨) 유형: Standards Track 생성일: 2022년 11월 15일 Python 버전: 3.12 최종...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/701/",
        "teaser": null
      },{
        "title": "[Final] PEP 702 - Marking deprecations using the type system",
        "excerpt":"원문 링크: PEP 702 - Marking deprecations using the type system 상태: Final 유형: Standards Track 작성일: 30-Dec-2022 PEP 702 – 타입 시스템을 이용한 Deprecation 표시 개요 이 PEP (Python Enhancement Proposal) 702는 @warnings.deprecated() 데코레이터를 추가하여 클래스나 함수가 더 이상 사용되지 않음(deprecated)을 표시하는 방법을 제안합니다. 이 데코레이터를 사용하면 정적 타입...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/702/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 703 - Making the Global Interpreter Lock Optional in CPython",
        "excerpt":"원문 링크: PEP 703 - Making the Global Interpreter Lock Optional in CPython 상태: Accepted 유형: Standards Track 작성일: 09-Jan-2023 PEP 703: CPython에서 전역 인터프리터 락(GIL) 선택적 사용 가능하게 하기 초록 (Abstract) CPython의 전역 인터프리터 락(Global Interpreter Lock, GIL)은 여러 스레드가 동시에 Python 코드를 실행하는 것을 막습니다. GIL은 Python에서 멀티코어...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/703/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 704 - Require virtual environments by default for package installers",
        "excerpt":"원문 링크: PEP 704 - Require virtual environments by default for package installers 상태: Withdrawn 유형: Standards Track 작성일: 16-Jan-2023 PEP 704: 패키지 설치 관리자를 위한 가상 환경 기본 요구 사항 (Require virtual environments by default for package installers) 작성자: Pradyun Gedam 후원자: Brett Cannon PEP 대리인: Paul Moore 상태:...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/704/",
        "teaser": null
      },{
        "title": "[Final] PEP 705 - TypedDict: Read-only items",
        "excerpt":"원문 링크: PEP 705 - TypedDict: Read-only items 상태: Final 유형: Standards Track 작성일: 07-Nov-2022 PEP 705 – TypedDict: 읽기 전용 항목 (Read-only items) 초록 (Abstract) PEP 589는 고정된 키 집합을 가진 딕셔너리를 위한 구조적 타입인 TypedDict를 정의합니다. 그러나 TypedDict는 가변(mutable) 타입이기 때문에, 읽기 전용 매개변수를 받는 메서드를 정확하게 타입...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/705/",
        "teaser": null
      },{
        "title": "[Final] PEP 706 - Filter for tarfile.extractall",
        "excerpt":"원문 링크: PEP 706 - Filter for tarfile.extractall 상태: Final 유형: Standards Track 작성일: 09-Feb-2023 PEP 706 - Filter for tarfile.extractall Abstract: tarfile 모듈의 압축 해제 메서드에 filter 인자가 추가됩니다. 이 filter 인자는 아카이브를 추출할 때 파일을 거부하거나 메타데이터를 수정할 수 있게 합니다. 놀라움이나 위험을 초래할 수 있는 기능을 제한하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/706/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 707 - A simplified signature for __exit__ and __aexit__",
        "excerpt":"원문 링크: PEP 707 - A simplified signature for exit and aexit 상태: Rejected 유형: Standards Track 작성일: 18-Feb-2023 PEP 707: __exit__ 및 __aexit__ 메서드의 간소화된 시그니처 (거부됨) 거부 공지 이 PEP는 Python Steering Council(SC)에 의해 거부되었습니다. SC는 제안된 변경사항의 “마법(magic)”과 잠재적인 호환성 파괴(breakage) 위험이 얻을 수 있는 이점보다 크다고...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/707/",
        "teaser": null
      },{
        "title": "[Provisional] PEP 708 - Extending the Repository API to Mitigate Dependency Confusion Attacks",
        "excerpt":"원문 링크: PEP 708 - Extending the Repository API to Mitigate Dependency Confusion Attacks 상태: Provisional 유형: Standards Track 작성일: 20-Feb-2023 PEP 708: 의존성 혼란 공격 완화를 위한 저장소 API 확장 번역 및 요약 요약 (Abstract) 의존성 혼란 공격(Dependency confusion attacks)은 사용자가 예상한 패키지 대신 악성 패키지가 설치되는 형태로, 점점...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/708/",
        "teaser": null
      },{
        "title": "[Final] PEP 709 - Inlined comprehensions",
        "excerpt":"원문 링크: PEP 709 - Inlined comprehensions 상태: Final 유형: Standards Track 작성일: 24-Feb-2023 PEP 709 – 인라인 컴프리헨션 (Inlined Comprehensions) 개요 (Abstract) 현재 Python의 리스트, 딕셔너리, 셋 컴프리헨션(comprehensions)은 내부적으로 중첩된 함수(nested functions)로 컴파일됩니다. 이는 컴프리헨션의 이터레이션 변수(iteration variable)를 격리하는 장점을 제공하지만, 런타임 성능에서는 비효율적입니다. 이 PEP는 리스트, 딕셔너리, 셋...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/709/",
        "teaser": null
      },{
        "title": "[Draft] PEP 710 - Recording the provenance of installed packages",
        "excerpt":"원문 링크: PEP 710 - Recording the provenance of installed packages 상태: Draft 유형: Standards Track 작성일: 27-Mar-2023 PEP 710 – 설치된 패키지의 출처 기록 (Recording the provenance of installed packages) 초록 (Abstract) 이 PEP(Python Enhancement Proposal)는 설치된 Python 배포 패키지(distribution package)의 출처(provenance)를 기록하는 방법을 설명합니다. 이 기록은 설치 프로그램(installer)에...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/710/",
        "teaser": null
      },{
        "title": "[Draft] PEP 711 - PyBI: a standard format for distributing Python Binaries",
        "excerpt":"원문 링크: PEP 711 - PyBI: a standard format for distributing Python Binaries 상태: Draft 유형: Standards Track 작성일: 06-Apr-2023 초록 (Abstract) 이 PEP는 Python 패키지를 위한 wheel 형식과 유사하게, 미리 빌드된 (pre-built) Python 인터프리터를 배포하기 위한 표준 형식인 PyBI를 제안합니다. PyBI는 “미리 빌드된 Python 패키지 대신, 미리 빌드된 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/711/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 712 - Adding a “converter” parameter to dataclasses.field",
        "excerpt":"원문 링크: PEP 712 - Adding a “converter” parameter to dataclasses.field 상태: Rejected 유형: Standards Track 작성일: 01-Jan-2023 PEP 712 – dataclasses.field에 “converter” 매개변수 추가 (거부됨) 개요 이 문서는 Python Enhancement Proposal (PEP) 712의 번역본입니다. PEP 712는 dataclasses.field() 함수에 converter 매개변수를 추가하여, dataclass 초기화 시 필드에 할당되는 값을 자동으로 변환하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/712/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 713 - Callable Modules",
        "excerpt":"원문 링크: PEP 713 - Callable Modules 상태: Rejected 유형: Standards Track 작성일: 20-Apr-2023 PEP 713 – 호출 가능한 모듈 (Callable Modules) 상태: 거부됨 (Rejected) 작성자: Amethyst Reese 후원자: Łukasz Langa 생성일: 2023년 4월 20일 Python 버전: 3.12 거부 공지 (Rejection Notice) PEP 713은 Python Steering Council에 의해 거부되었습니다. Steering...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/713/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 714 - Rename dist-info-metadata in the Simple API",
        "excerpt":"원문 링크: PEP 714 - Rename dist-info-metadata in the Simple API 상태: Accepted 유형: Standards Track 작성일: 06-Jun-2023 PEP 714 – Simple API에서 dist-info-metadata 이름 변경 작성자: Donald Stufft PEP 담당자: Paul Moore 상태: Accepted (수락됨) 유형: Standards Track 주제: Packaging 생성일: 2023년 6월 6일 해결일: 2023년 6월 27일 초록...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/714/",
        "teaser": null
      },{
        "title": "[Final] PEP 715 - Disabling bdist_egg distribution uploads on PyPI",
        "excerpt":"원문 링크: PEP 715 - Disabling bdist_egg distribution uploads on PyPI 상태: Final 유형: Standards Track 작성일: 06-Jun-2023 PEP 715 – PyPI에서 bdist_egg 배포 업로드 비활성화 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 PyPI에서 bdist_egg 배포 유형의 새로운 업로드를 점진적으로 중단(deprecate)하고 최종적으로 비활성화할 것을 권고합니다. 이와 함께, .egg 접미사를 가진 배포...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/715/",
        "teaser": null
      },{
        "title": "[Draft] PEP 718 - Subscriptable functions",
        "excerpt":"원문 링크: PEP 718 - Subscriptable functions 상태: Draft 유형: Standards Track 작성일: 23-Jun-2023 PEP 718 – Subscriptable functions (서브스크립트 가능한 함수) 개요 (Abstract) 이 PEP는 타이핑(typing) 목적으로 함수 객체(function objects)를 서브스크립트 가능하게 만드는 것을 제안합니다. 이를 통해 개발자는 타입 체커(type checker)가 생성하는 타입에 대해 명시적인 제어를 할 수 있게...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/718/",
        "teaser": null
      },{
        "title": "[Active] PEP 719 - Python 3.13 Release Schedule",
        "excerpt":"원문 링크: PEP 719 - Python 3.13 Release Schedule 상태: Active 유형: Informational 작성일: 26-May-2023 PEP 719 – Python 3.13 릴리스 스케줄 작성자: Thomas Wouters 상태: Active (진행 중) 유형: Informational (정보성) 주제: 릴리스 생성일: 2023년 5월 26일 Python 버전: 3.13 초록 (Abstract) 이 문서는 Python 3.13의 개발 및 릴리스...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/719/",
        "teaser": null
      },{
        "title": "[Draft] PEP 720 - Cross-compiling Python packages",
        "excerpt":"원문 링크: PEP 720 - Cross-compiling Python packages 상태: Draft 유형: Informational 작성일: 01-Jul-2023 PEP 720 – Python 패키지 교차 컴파일 작성자: Filipe Laíns PEP 담당자: 상태: 초안 (Draft) 유형: 정보성 (Informational) 작성일: 2023년 7월 1일 Python 버전: 3.12 목차 초록 동기 분석 서론 Upstream 지원 적절한 Cross-Build 지원을 제공하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/720/",
        "teaser": null
      },{
        "title": "[Final] PEP 721 - Using tarfile.data_filter for source distribution extraction",
        "excerpt":"원문 링크: PEP 721 - Using tarfile.data_filter for source distribution extraction 상태: Final 유형: Standards Track 작성일: 12-Jul-2023 PEP 721: 소스 배포 추출을 위한 tarfile.data_filter 사용 개요 (Abstract) Python Source Distribution (sdist) 아카이브를 추출할 때, PEP 706에서 도입된 tarfile.data_filter의 사용을 명확히 하고, 이 필터를 직접 사용할 수 없는 도구들의 동작...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/721/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 722 - Dependency specification for single-file scripts",
        "excerpt":"원문 링크: PEP 722 - Dependency specification for single-file scripts 상태: Rejected 유형: Standards Track 작성일: 19-Jul-2023 PEP 722 – 단일 파일 스크립트의 의존성(Dependency) 명세 (Rejected) 작성자: Paul Moore PEP 위임자: Brett Cannon 상태: 거부됨 (Rejected) - PEP 723으로 대체됨 생성일: 2023년 7월 19일 해결일: 2023년 10월 21일 개요 (Abstract)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/722/",
        "teaser": null
      },{
        "title": "[Final] PEP 723 - Inline script metadata",
        "excerpt":"원문 링크: PEP 723 - Inline script metadata 상태: Final 유형: Standards Track 작성일: 04-Aug-2023 PEP 723은 단일 파일 Python 스크립트에 메타데이터를 포함하는 표준 형식을 정의하여 런처(launcher), IDE 및 기타 외부 도구와 같은 도구가 스크립트와 상호 작용하는 데 도움을 주기 위한 Python Enhancement Proposal (PEP)입니다. 요약 (Abstract) 이 PEP는 단일...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/723/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 724 - Stricter Type Guards",
        "excerpt":"원문 링크: PEP 724 - Stricter Type Guards 상태: Withdrawn 유형: Standards Track 작성일: 28-Jul-2023 PEP 724 – Stricter Type Guards (더 엄격한 Type Guard) 상태: 이 PEP는 철회되었습니다 (Withdrawn). Typing Council이 이 제안에 대해 합의에 도달하지 못하여, 저자들이 철회하기로 결정했습니다. 개요 (Abstract) PEP 647은 사용자 정의 TypeGuard 함수 개념을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/724/",
        "teaser": null
      },{
        "title": "[Draft] PEP 725 - Specifying external dependencies in pyproject.toml",
        "excerpt":"원문 링크: PEP 725 - Specifying external dependencies in pyproject.toml 상태: Draft 유형: Standards Track 작성일: 17-Aug-2023 Citations: PEP 725 – pyproject.toml에 외부 의존성 지정 초록 (Abstract) 이 PEP는 파이썬 프로젝트의 외부 또는 PyPI가 아닌 빌드 및 런타임 의존성을 pyproject.toml 파일에 패키징 관련 도구가 활용할 수 있도록 지정하는 방법을 설명합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/725/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 726 - Module__setattr__and__delattr__",
        "excerpt":"원문 링크: PEP 726 - Module__setattr__and__delattr__ 상태: Rejected 유형: Standards Track 작성일: 24-Aug-2023 PEP 726 – 모듈 __setattr__ 및 __delattr__ 초록 (Abstract) 이 PEP는 모듈에 사용자 정의 __setattr__ 및 __delattr__ 메서드를 지원하여 PEP 562를 넘어선 모듈 속성 접근 사용자 정의를 확장할 것을 제안합니다. 동기 (Motivation) 모듈 __setattr__에는 몇 가지 잠재적인...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/726/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 727 - Documentation in Annotated Metadata",
        "excerpt":"원문 링크: PEP 727 - Documentation in Annotated Metadata 상태: Withdrawn 유형: Standards Track 작성일: 28-Aug-2023 PEP 727은 Annotated 메타데이터에 문서화를 추가하는 방법을 표준화하려는 제안이었으나, 현재는 철회된(Withdrawn) 상태입니다. 이 문서는 Annotated를 사용하여 파이썬 심볼에 대한 문서화 문자열을 제공하는 표준화된 방법을 제안했으며, 이를 위해 typing.Doc이라는 새로운 클래스를 도입하려 했습니다. PEP 727...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/727/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 728 - TypedDict with Typed Extra Items",
        "excerpt":"원문 링크: PEP 728 - TypedDict with Typed Extra Items 상태: Accepted 유형: Standards Track 작성일: 12-Sep-2023 PEP 728 – TypedDict에 타입이 지정된 추가 항목 개요 이 PEP는 TypedDict에 추가 항목(extra items)의 타입을 지정하기 위한 두 가지 클래스 매개변수, closed와 extra_items를 추가합니다. 이는 ‘닫힌(closed)’ TypedDict 타입을 정의하거나, dict에 나타날 수...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/728/",
        "teaser": null
      },{
        "title": "[Active] PEP 729 - Typing governance process",
        "excerpt":"원문 링크: PEP 729 - Typing governance process 상태: Active 유형: Process 작성일: 19-Sep-2023 PEP 729 – 타입 거버넌스 프로세스 초록 (Abstract) 이 PEP는 Python 타입 시스템을 관리하고 발전시키기 위한 새로운 방식, 즉 “타이핑 위원회 (Typing Council)”의 설립을 제안합니다. 이 위원회는 Python 타입 시스템의 명세 (specification)와 적합성 테스트 스위트 (conformance...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/729/",
        "teaser": null
      },{
        "title": "[Final] PEP 730 - Adding iOS as a supported platform",
        "excerpt":"원문 링크: PEP 730 - Adding iOS as a supported platform 상태: Final 유형: Standards Track 작성일: 09-Oct-2023 PEP 730은 CPython에 iOS를 지원 플랫폼으로 추가하는 내용을 제안합니다. 초기 목표는 Python 3.13에서 Tier 3 지원을 달성하는 것이며, 이 PEP는 iOS 지원에 필요한 기술적 변경 사항과 프로젝트 관리 관련 사항을 다룹니다. 개요...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/730/",
        "teaser": null
      },{
        "title": "[Active] PEP 731 - C API Working Group Charter",
        "excerpt":"원문 링크: PEP 731 - C API Working Group Charter 상태: Active 유형: Process 작성일: 11-Oct-2023 PEP 731은 Python C API 워킹 그룹(Working Group)의 설립을 제안하는 문서로, 이 워킹 그룹은 Python C API의 개발 및 유지보수를 감독하고 조율하는 역할을 담당합니다. 개요 (Abstract) 이 PEP는 Python C API의 개발 및 유지보수를...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/731/",
        "teaser": null
      },{
        "title": "[Active] PEP 732 - The Python Documentation Editorial Board",
        "excerpt":"원문 링크: PEP 732 - The Python Documentation Editorial Board 상태: Active 유형: Process 작성일: 14-Oct-2023 PEP 732 – Python 문서 편집 위원회 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 Python 문서 편집 위원회(Python Documentation Editorial Board)를 설립하고, 이 편집 위원회가 어떻게 운영될 것인지 제안합니다. 배경 (Motivation) 2021년 3월, Steering Council은...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/732/",
        "teaser": null
      },{
        "title": "[Final] PEP 733 - An Evaluation of Python’s Public C API",
        "excerpt":"원문 링크: PEP 733 - An Evaluation of Python’s Public C API 상태: Final 유형: Informational 작성일: 16-Oct-2023 PEP 733 – Python Public C API 평가 작성자: Erlend Egeberg Aasland 외 25명 상태: 최종 (Final) 유형: 정보 (Informational) 생성일: 2023년 10월 16일 게시 이력: 2023년 11월 1일 요약 (Abstract) 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/733/",
        "teaser": null
      },{
        "title": "[Final] PEP 734 - Multiple Interpreters in the Stdlib",
        "excerpt":"원문 링크: PEP 734 - Multiple Interpreters in the Stdlib 상태: Final 유형: Standards Track 작성일: 06-Nov-2023 PEP 734 – Stdlib 내 다중 인터프리터 (Multiple Interpreters in the Stdlib) 이 문서는 역사적인 기록입니다. 최신 공식 문서는 concurrent.interpreters에서 찾을 수 있습니다. 요약 (Abstract) 이 PEP는 현재 프로세스 내에서 여러 인터프리터를 조사하고,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/734/",
        "teaser": null
      },{
        "title": "[Final] PEP 735 - Dependency Groups in pyproject.toml",
        "excerpt":"원문 링크: PEP 735 - Dependency Groups in pyproject.toml 상태: Final 유형: Standards Track 작성일: 20-Nov-2023 PEP 735 – pyproject.toml 내 의존성 그룹 (Dependency Groups) 상태: Final (최종) 유형: Standards Track (표준 추적) 주제: Packaging (패키징) 생성일: 2023년 11월 20일 해결일: 2024년 10월 10일 중요 사항: 이 PEP는 역사적 문서입니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/735/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 736 - Shorthand syntax for keyword arguments at invocation",
        "excerpt":"원문 링크: PEP 736 - Shorthand syntax for keyword arguments at invocation 상태: Rejected 유형: Standards Track 작성일: 28-Nov-2023 PEP 736 – 함수 호출 시 키워드 인수에 대한 축약 문법 제안 (Shorthand syntax for keyword arguments at invocation) 작성자: Joshua Bambrick, Chris Angelico 상태: Rejected (거부됨) 유형: Standards Track 생성일:...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/736/",
        "teaser": null
      },{
        "title": "[Final] PEP 737 - C API to format a type fully qualified name",
        "excerpt":"원문 링크: PEP 737 - C API to format a type fully qualified name 상태: Final 유형: Standards Track 작성일: 29-Nov-2023 PEP 737 – 타입의 Fully Qualified Name 포맷을 위한 C API 개요 이 문서는 PEP 737, “C API to format a type fully qualified name”의 내용을 한국어 사용자가 이해하기...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/737/",
        "teaser": null
      },{
        "title": "[Final] PEP 738 - Adding Android as a supported platform",
        "excerpt":"원문 링크: PEP 738 - Adding Android as a supported platform 상태: Final 유형: Standards Track 작성일: 12-Dec-2023 PEP 738 – Android를 지원 플랫폼으로 추가 개요 (Abstract) 이 PEP는 CPython에 Android를 지원 플랫폼으로 추가할 것을 제안합니다. 초기 목표는 Python 3.13에서 Android가 Tier 3 지원을 달성하는 것입니다. 이 PEP는 Russell Keith-Magee의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/738/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 739 - build-details.json1.0 — a static description file for Python build details",
        "excerpt":"원문 링크: PEP 739 - build-details.json1.0 — a static description file for Python build details 상태: Accepted 유형: Standards Track 작성일: 19-Dec-2023 PEP 739 – build-details.json 1.0 — Python 빌드 세부 정보를 위한 정적 설명 파일 개요 (Abstract) 이 PEP는 Python 설치의 빌드 세부 정보를 포함하는 정적 설명 파일인 build-details.json을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/739/",
        "teaser": null
      },{
        "title": "[Final] PEP 740 - Index support for digital attestations",
        "excerpt":"원문 링크: PEP 740 - Index support for digital attestations 상태: Final 유형: Standards Track 작성일: 08-Jan-2024 PEP 740: 디지털 증명(Digital Attestations)을 위한 인덱스 지원 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 PyPI와 같은 Python 패키지 저장소에서 디지털 서명된 증명(attestations) 및 이를 검증하는 데 사용되는 메타데이터의 업로드 및 배포와 관련된 변경...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/740/",
        "teaser": null
      },{
        "title": "[Final] PEP 741 - Python Configuration C API",
        "excerpt":"원문 링크: PEP 741 - Python Configuration C API 상태: Final 유형: Standards Track 작성일: 18-Jan-2024 PEP 741 – Python Configuration C API 번역 및 정리 개요 이 문서는 Python Enhancement Proposal (PEP) 741의 내용을 한국어 사용자가 이해하기 쉽도록 번역하고 정리한 것입니다. Python 개발자들이 이 PEP의 제안 내용, 도입 배경,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/741/",
        "teaser": null
      },{
        "title": "[Final] PEP 742 - Narrowing types with TypeIs",
        "excerpt":"원문 링크: PEP 742 - Narrowing types with TypeIs 상태: Final 유형: Standards Track 작성일: 07-Feb-2024 PEP 742 – TypeIs를 사용한 타입 내로잉 저자: Jelle Zijlstra 상태: Final 타입: Standards Track - Typing 생성일: 2024년 2월 7일 Python 버전: 3.13 개요 (Abstract) 이 PEP는 새로운 특수 형태인 TypeIs를 제안합니다. TypeIs는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/742/",
        "teaser": null
      },{
        "title": "[Draft] PEP 743 - Add Py_COMPAT_API_VERSION to the Python C API",
        "excerpt":"원문 링크: PEP 743 - Add Py_COMPAT_API_VERSION to the Python C API 상태: Draft 유형: Standards Track 작성일: 11-Mar-2024 PEP 743: Python C API에 Py_COMPAT_API_VERSION 추가 초록 (Abstract) 이 PEP는 오래되었거나 (soft-deprecated) 사용이 권장되지 않는 일부 심볼을 숨기는 Py_COMPAT_API_VERSION C 매크로를 추가할 것을 제안합니다. 이 매크로를 통해 사용자들은 이미 알려진...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/743/",
        "teaser": null
      },{
        "title": "[Draft] PEP 744 - JIT Compilation",
        "excerpt":"원문 링크: PEP 744 - JIT Compilation 상태: Draft 유형: Informational 작성일: 11-Apr-2024 PEP 744: JIT Compilation 요약 (Abstract) 최근 CPython의 메인 개발 브랜치에 실험적인 JIT(Just-In-Time) 컴파일러가 병합되었습니다. 이 PEP는 JIT 컴파일러의 도입 배경, 설계 결정, 현재 구현 상태, 그리고 CPython의 영구적인 비실험적 기능으로 만들기 위한 향후 계획을 요약합니다. 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/744/",
        "teaser": null
      },{
        "title": "[Active] PEP 745 - Python 3.14 Release Schedule",
        "excerpt":"원문 링크: PEP 745 - Python 3.14 Release Schedule 상태: Active 유형: Informational 작성일: 24-Apr-2024 PEP 745는 Python 3.14의 릴리스 스케줄을 다루는 정보성 문서입니다. 이 문서는 Python 3.14의 개발 및 릴리스 일정에 대해 상세히 설명하며, 릴리스 관리자 및 관련 팀원 정보도 포함하고 있습니다. PEP 745: Python 3.14 릴리스 스케줄 초록...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/745/",
        "teaser": null
      },{
        "title": "[Draft] PEP 746 - Type checking Annotated metadata",
        "excerpt":"원문 링크: PEP 746 - Type checking Annotated metadata 상태: Draft 유형: Standards Track 작성일: 20-May-2024 PEP 746 – Annotated 메타데이터의 타입 체킹 요약 이 PEP는 typing.Annotated 타입을 사용하는 메타데이터에 대한 타입 체킹 메커니즘을 제안합니다. 새로운 __supports_annotated_base__ 프로토콜을 구현하는 메타데이터 객체는 주어진 타입에 대해 메타데이터가 유효한지 정적 타입 체커에 의해...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/746/",
        "teaser": null
      },{
        "title": "[Draft] PEP 747 - Annotating Type Forms",
        "excerpt":"원문 링크: PEP 747 - Annotating Type Forms 상태: Draft 유형: Standards Track 작성일: 27-May-2024 PEP 747 – 타입 폼 어노테이션 (Annotating Type Forms) 요약 (Abstract) PEP 747은 Python 타입 시스템에서 타입을 명시하는 표준화된 방법인 “타입 표현식(type expression)”에 의해 생성되는 “타입 폼(type form) 객체”를 정확하게 어노테이션(annotation)할 수 있도록 typing.TypeForm이라는 새로운...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/747/",
        "teaser": null
      },{
        "title": "[Draft] PEP 748 - A Unified TLS API for Python",
        "excerpt":"원문 링크: PEP 748 - A Unified TLS API for Python 상태: Draft 유형: Standards Track 작성일: 27-Jun-2024 PEP 748 – Python을 위한 통합 TLS API 개요 (Abstract) 이 PEP는 프로토콜 클래스(protocol classes) 모음의 형태로 표준 TLS 인터페이스를 정의합니다. 이 인터페이스는 Python 구현체(implementations)와 서드파티 라이브러리가 OpenSSL 외의 다른 TLS 라이브러리에...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/748/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 749 - Implementing PEP 649",
        "excerpt":"원문 링크: PEP 749 - Implementing PEP 649 상태: Accepted 유형: Standards Track 작성일: 28-May-2024 PEP 749 – PEP 649 구현 이 문서는 PEP 649를 보완하는 Python Enhancement Proposal (PEP)입니다. PEP 649의 사양에 대한 다양한 조정 및 추가 사항을 제공하여, Python 3.14에서 annotations의 동작을 명확히 하고 개선하는 것을 목표로 합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/749/",
        "teaser": null
      },{
        "title": "[Final] PEP 750 - Template Strings",
        "excerpt":"원문 링크: PEP 750 - Template Strings 상태: Final 유형: Standards Track 작성일: 08-Jul-2024 PEP 750 – Template Strings 작성자: Jim Baker 외 다수 논의처: Discourse thread 상태: Final 유형: Standards Track 생성일: 2024년 7월 8일 Python 버전: 3.14 해결일: 2025년 4월 10일 중요: 이 PEP는 역사적인 문서이며, 최신 공식...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/750/",
        "teaser": null
      },{
        "title": "[Final] PEP 751 - A file format to record Python dependencies for installation reproducibility",
        "excerpt":"원문 링크: PEP 751 - A file format to record Python dependencies for installation reproducibility 상태: Final 유형: Standards Track 작성일: 24-Jul-2024 PEP 751 – 설치 재현성을 위한 Python 종속성 기록 파일 형식 요약 (Abstract) 이 PEP는 Python 환경에서 재현 가능한(reproducible) 설치를 가능하게 하는 새로운 종속성 명세 파일 형식을 제안합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/751/",
        "teaser": null
      },{
        "title": "[Draft] PEP 752 - Implicit namespaces for package repositories",
        "excerpt":"원문 링크: PEP 752 - Implicit namespaces for package repositories 상태: Draft 유형: Standards Track 작성일: 13-Aug-2024 Python Enhancement Proposal (PEP) 752는 패키지 저장소에 대한 암묵적 네임스페이스(Implicit namespaces)를 도입하는 방안을 제시합니다. 이 제안은 Python 패키징 생태계에서 특정 조직이 패키지 이름 접두사를 예약하고 관리할 수 있도록 하여, 이름 스쿼팅(name-squatting) 및 의존성...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/752/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 753 - Uniform project URLs in core metadata",
        "excerpt":"원문 링크: PEP 753 - Uniform project URLs in core metadata 상태: Accepted 유형: Standards Track 작성일: 29-Aug-2024 PEP 753 – 코어 메타데이터 내 통일된 프로젝트 URL (Uniform project URLs in core metadata) 개요 (Abstract) PEP 753은 PyPI와 같은 인덱스 및 기타 코어 메타데이터 소비자(consumer)가 코어 메타데이터를 처리하는 방식에 두...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/753/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 754 - IEEE 754 Floating Point Special Values",
        "excerpt":"원문 링크: PEP 754 - IEEE 754 Floating Point Special Values 상태: Rejected 유형: Standards Track 작성일: 28-Mar-2003 PEP 754 – IEEE 754 부동 소수점 특수 값 상태: 거부됨 (Rejected) 유형: 표준 트랙 (Standards Track) 생성일: 2003년 3월 28일 Python 버전: 2.3 작성자: Gregory R. Warnes 거부 통지 (Rejection Notice)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/754/",
        "teaser": null
      },{
        "title": "[Draft] PEP 755 - Implicit namespace policy for PyPI",
        "excerpt":"원문 링크: PEP 755 - Implicit namespace policy for PyPI 상태: Draft 유형: Process 작성일: 05-Sep-2024 PEP 755: PyPI에 대한 암묵적 네임스페이스 정책 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 PyPI에 대한 PEP 752의 구현을 체계화합니다. 동기 (Motivation) 많은 프로젝트와 커뮤니티는 네임스페이스를 예약하는 기능으로부터 이점을 얻을 것입니다. PyPI가 Python 커뮤니티를 위해...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/755/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 756 - Add PyUnicode_Export() and PyUnicode_Import() C functions",
        "excerpt":"원문 링크: PEP 756 - Add PyUnicode_Export() and PyUnicode_Import() C functions 상태: Withdrawn 유형: Standards Track 작성일: 13-Sep-2024 PEP 756: PyUnicode_Export() 및 PyUnicode_Import() C 함수 추가 제안 번역 및 정리 개요 PEP 756은 Python 3.14의 Limited C API에 PyUnicode_Export() 및 PyUnicode_Import() C 함수를 추가하여, C 확장 모듈이 Python str 객체의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/756/",
        "teaser": null
      },{
        "title": "[Final] PEP 757 - C API to import-export Python integers",
        "excerpt":"원문 링크: PEP 757 - C API to import-export Python integers 상태: Final 유형: Standards Track 작성일: 13-Sep-2024 PEP 757 – C API를 이용한 Python 정수 import/export 개요 새로운 C API, 특히 PyLongWriter_Create() 및 PyLong_Export() 함수를 추가하여 Python 정수(int 객체)를 import하고 export하는 기능을 제공합니다. 도입 배경 (Rationale) gmpy2, SAGE, Python-FLINT와...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/757/",
        "teaser": null
      },{
        "title": "[Final] PEP 758 - Allowexceptandexcept*expressions without parentheses",
        "excerpt":"원문 링크: PEP 758 - Allowexceptandexcept*expressions without parentheses 상태: Final 유형: Standards Track 작성일: 30-Sep-2024 PEP 758 – except 및 except* 표현식에서 괄호 없이 사용 허용 저자: Pablo Galindo, Brett Cannon 상태: Final 타입: Standards Track 생성일: 2024년 9월 30일 Python 버전: 3.14 해결일: 2025년 3월 14일 초록 (Abstract) 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/758/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 759 - External Wheel Hosting",
        "excerpt":"원문 링크: PEP 759 - External Wheel Hosting 상태: Withdrawn 유형: Standards Track 작성일: 01-Oct-2024 PEP 759 – External Wheel Hosting (외부 휠 호스팅) 작성자: Barry Warsaw, Emma Harper Smith PEP 위임자: Donald Stufft 논의: Discourse 스레드 상태: 철회됨 (Withdrawn) 유형: 표준 트랙 (Standards Track) 주제: 패키징 (Packaging) 생성일: 2024년...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/759/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 760 - No More Bare Excepts",
        "excerpt":"원문 링크: PEP 760 - No More Bare Excepts 상태: Withdrawn 유형: Standards Track 작성일: 02-Oct-2024 PEP 760 – Bare Except 금지 제안 번역 및 정리 개요 이 문서는 Python의 예외 처리 구문에서 except: (bare except) 절을 금지할 것을 제안합니다. 현재 Python은 except: 절을 사용하여 모든 예외를 잡을 수 있게...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/760/",
        "teaser": null
      },{
        "title": "[Active] PEP 761 - Deprecating PGP signatures for CPython artifacts",
        "excerpt":"원문 링크: PEP 761 - Deprecating PGP signatures for CPython artifacts 상태: Active 유형: Process 작성일: 08-Oct-2024 PEP 761 – CPython 아티팩트에 대한 PGP 서명 지원 중단 제안 이 문서는 CPython 배포 아티팩트(artifacts)에 대한 PGP(Pretty Good Privacy) 서명 방식을 지원 중단하고, Sigstore를 통한 서명 방식으로 전환할 것을 제안합니다. 초록 (Abstract)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/761/",
        "teaser": null
      },{
        "title": "[Final] PEP 762 - REPL-acing the default REPL",
        "excerpt":"원문 링크: PEP 762 - REPL-acing the default REPL 상태: Final 유형: Informational 작성일: 11-Oct-2024 PEP 762 – 기본 REPL 교체 (REPL-acing the default REPL) 초록 (Abstract) 이 PEP는 Python 3.13부터 도입될 새로운 REPL (Read-Eval-Print Loop), 즉 대화형 모드의 구현을 설명합니다. 새로운 REPL은 Python으로 작성되었으며, 다중 라인 편집, 구문 강조(syntax...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/762/",
        "teaser": null
      },{
        "title": "[Draft] PEP 763 - Limiting deletions on PyPI",
        "excerpt":"원문 링크: PEP 763 - Limiting deletions on PyPI 상태: Draft 유형: Standards Track 작성일: 24-Oct-2024 PEP 763 – PyPI에서 삭제 제한 (Limiting deletions on PyPI) 초록 (Abstract) 이 PEP(Python Enhancement Proposal)는 PyPI(Python Package Index)에서 사용자(user)가 파일(files), 릴리스(releases), 프로젝트(projects)를 삭제할 수 있는 시점을 제한하는 것을 제안합니다. 프로젝트, 릴리스 또는 파일은...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/763/",
        "teaser": null
      },{
        "title": "[Draft] PEP 764 - Inline typed dictionaries",
        "excerpt":"원문 링크: PEP 764 - Inline typed dictionaries 상태: Draft 유형: Standards Track 작성일: 25-Oct-2024 PEP 764 – 인라인 TypedDict 제안 (Inline typed dictionaries) 개요 (Abstract) PEP 589는 TypedDict를 생성하기 위한 클래스 기반 및 함수형(functional) 문법을 정의합니다. 그러나 이 두 방식 모두 클래스를 정의하거나 값에 할당하는 과정을 필요로 합니다. 특정...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/764/",
        "teaser": null
      },{
        "title": "[Final] PEP 765 - Disallow return/break/continue that exit a finally block",
        "excerpt":"원문 링크: PEP 765 - Disallow return/break/continue that exit a finally block 상태: Final 유형: Standards Track 작성일: 15-Nov-2024 PEP 765 – finally 블록을 종료하는 return/break/continue 금지 제안 저자: Irit Katriel, Alyssa Coghlan 상태: Final 유형: Standards Track 생성일: 2024년 11월 15일 Python 버전: 3.14 대체: PEP 601 요약 (Abstract)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/765/",
        "teaser": null
      },{
        "title": "[Draft] PEP 766 - Explicit Priority Choices Among Multiple Indexes",
        "excerpt":"원문 링크: PEP 766 - Explicit Priority Choices Among Multiple Indexes 상태: Draft 유형: Informational 작성일: 18-Nov-2024 PEP 766: 여러 인덱스 간 명시적 우선순위 선택 (Explicit Priority Choices Among Multiple Indexes) 요약 (Abstract) 패키지 해결(package resolution)은 Python의 핵심 기능을 확장하는 수단으로서 Python 사용자 경험의 중요한 부분입니다. 패키지 인스톨러(package installer)가 예상치...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/766/",
        "teaser": null
      },{
        "title": "[Draft] PEP 767 - Annotating Read-Only Attributes",
        "excerpt":"원문 링크: PEP 767 - Annotating Read-Only Attributes 상태: Draft 유형: Standards Track 작성일: 18-Nov-2024 PEP 767: 읽기 전용 속성 어노테이션 초록 (Abstract) PEP 705에서 typing.ReadOnly 타입 한정자(type qualifier)를 도입하여 typing.TypedDict 항목을 읽기 전용으로 정의할 수 있게 했습니다. 이 PEP는 클래스와 프로토콜(protocol) 속성 어노테이션(annotation)에서 ReadOnly를 사용하여 속성을 읽기 전용으로 표시하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/767/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 768 - Safe external debugger interface for CPython",
        "excerpt":"원문 링크: PEP 768 - Safe external debugger interface for CPython 상태: Accepted 유형: Standards Track 작성일: 25-Nov-2024 PEP 768 – CPython을 위한 안전한 외부 디버거 인터페이스 개요 (Abstract) 이 PEP는 디버거와 프로파일러가 실행 중인 Python 프로세스에 안전하게 연결할 수 있도록 CPython에 zero-overhead 디버깅 인터페이스를 추가할 것을 제안합니다. 이 인터페이스는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/768/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 769 - Add a ‘default’ keyword argument to ‘attrgetter’, ‘itemgetter’ and ‘getitem’",
        "excerpt":"원문 링크: PEP 769 - Add a ‘default’ keyword argument to ‘attrgetter’, ‘itemgetter’ and ‘getitem’ 상태: Rejected 유형: Standards Track 작성일: 22-Dec-2024 PEP 769 – attrgetter, itemgetter, getitem에 default 키워드 인자 추가 제안 작성자: Facundo Batista 토론: Discourse thread 상태: Rejected (거절됨) 유형: Standards Track 생성일: 2024년 12월 22일 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/769/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 770 - Improving measurability of Python packages with Software Bill-of-Materials",
        "excerpt":"원문 링크: PEP 770 - Improving measurability of Python packages with Software Bill-of-Materials 상태: Accepted 유형: Standards Track 작성일: 02-Jan-2025 PEP 770 – 소프트웨어 BOM(Bill-of-Materials)을 통한 Python 패키지 측정 가능성 개선 작성자: Seth Larson 스폰서: Brett Cannon PEP 대리인: Brett Cannon 상태: Accepted (수락됨) 유형: Standards Track (표준 트랙) 생성일:...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/770/",
        "teaser": null
      },{
        "title": "[Draft] PEP 771 - Default Extras for Python Software Packages",
        "excerpt":"원문 링크: PEP 771 - Default Extras for Python Software Packages 상태: Draft 유형: Standards Track 작성일: 13-Jan-2025 PEP 771 – Python 소프트웨어 패키지를 위한 기본 Extras 초록 (Abstract) PEP 508은 패키지 의존성을 선언하기 위한 미니 언어(mini-language)를 정의합니다. 이 언어의 한 가지 특징은 extras를 지정할 수 있다는 것입니다. extras는 배포판의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/771/",
        "teaser": null
      },{
        "title": "[Draft] PEP 772 - Packaging Council governance process",
        "excerpt":"원문 링크: PEP 772 - Packaging Council governance process 상태: Draft 유형: Process 작성일: 21-Jan-2025 PEP 772 – Packaging Council 거버넌스 프로세스 초록 (Abstract) 이 PEP(Python Enhancement Proposal)는 Python 패키징 표준, 도구 및 구현에 대한 광범위한 권한을 가진 Python 패키징 위원회(Packaging Council)를 제안합니다. Python 스티어링 위원회(Steering Council)와 마찬가지로, 패키징 위원회는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/772/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 773 - A Python Installation Manager for Windows",
        "excerpt":"원문 링크: PEP 773 - A Python Installation Manager for Windows 상태: Accepted 유형: Standards Track 작성일: 21-Jan-2025 PEP 773: Windows용 Python 설치 관리자 제안 초록 (Abstract) Windows에서 python.org 파이썬 배포판을 설치하는 것은 복잡합니다. 사용자 경험은 비슷하지만 각각 다른 한계를 가진 세 가지 주요 설치 방식이 있으며, 이 모든 방식은...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/773/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 774 - Removing the LLVM requirement for JIT builds",
        "excerpt":"원문 링크: PEP 774 - Removing the LLVM requirement for JIT builds 상태: Deferred 유형: Standards Track 작성일: 27-Jan-2025 PEP 774: JIT 빌드 시 LLVM 요구사항 제거 제안 초록 (Abstract) Python 3.13부터 CPython은 --enable-experimental-jit (Linux 및 Mac) 또는 --experimental-jit (Windows) 플래그를 통해 실험적인 JIT (Just-In-Time) 컴파일러를 사용하여 구성 및 빌드될...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/774/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 775 - Make zlib required to build CPython",
        "excerpt":"원문 링크: PEP 775 - Make zlib required to build CPython 상태: Withdrawn 유형: Standards Track 작성일: 24-Feb-2025 PEP 775 – CPython 빌드 시 zlib 필수화 (철회됨) 본 문서는 2025년 5월 7일에 작성자에 의해 철회(Withdrawn)되었습니다. 제안의 가치가 불충분하고 특히 WASI 예외 조항에 대한 부정적인 피드백으로 인해 철회되었습니다. 개요 (Abstract) 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/775/",
        "teaser": null
      },{
        "title": "[Draft] PEP 776 - Emscripten Support",
        "excerpt":"원문 링크: PEP 776 - Emscripten Support 상태: Draft 유형: Informational 작성일: 18-Mar-2025 PEP 776 – Emscripten 지원 개요 (Abstract) Emscripten은 C/C++ 코드를 WebAssembly/JavaScript 실행 파일로 컴파일하여 브라우저 및 Node.js를 포함한 JavaScript 런타임에서 사용할 수 있게 하는 완전한 오픈 소스 컴파일러 도구 체인입니다. Rust 언어 또한 Emscripten 타겟을 지원합니다. 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/776/",
        "teaser": null
      },{
        "title": "[Draft] PEP 777 - How to Re-invent the Wheel",
        "excerpt":"원문 링크: PEP 777 - How to Re-invent the Wheel 상태: Draft 유형: Standards Track 작성일: 09-Oct-2024 PEP 777 – Wheel 재발명 방법 (How to Re-invent the Wheel) 번역 및 요약 개요 (Abstract) PEP 777은 10년 이상 사용된 현재의 wheel 1.0 사양에 역호환성(backwards-incompatible)이 있는 기능을 추가하는 과정이 명확히 정의되어 있지...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/777/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 778 - Supporting Symlinks in Wheels",
        "excerpt":"원문 링크: PEP 778 - Supporting Symlinks in Wheels 상태: Deferred 유형: Standards Track 작성일: 18-May-2024 PEP 778 – Wheels에서의 심볼릭 링크 지원 개요 (Abstract) 현재 Wheels는 심볼릭 링크(symlinks)를 제대로 처리하지 못하며, 설치 시 심볼릭 링크 대신 내용을 복사합니다. Wheels를 통해 라이브러리를 적절하게 배포하기 위해, 플랫폼에 독립적인 방식으로 심볼릭 링크를...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/778/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 779 - Criteria for supported status for free-threaded Python",
        "excerpt":"원문 링크: PEP 779 - Criteria for supported status for free-threaded Python 상태: Accepted 유형: Standards Track 작성일: 13-Mar-2025 PEP 779 – 스레드-프리 Python의 지원 상태 기준 초록 (Abstract) PEP 779는 PEP 703 (CPython에서 Global Interpreter Lock (GIL)을 선택 사항으로 만들기)의 구현에 있어 중요한 이정표를 제시합니다. GIL 제거 작업을 위한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/779/",
        "teaser": null
      },{
        "title": "[Draft] PEP 780 - ABI features as environment markers",
        "excerpt":"원문 링크: PEP 780 - ABI features as environment markers 상태: Draft 유형: Standards Track 작성일: 21-Mar-2025 PEP 780 – 환경 마커로서의 ABI 기능 개요 (Abstract) 이 PEP는 새로운 sys_abi_features 환경 마커를 통해 프로젝트 종속성에 ABI(Application Binary Interface) 기능을 환경 마커로 사용하는 방법을 정의합니다. PEP 508(이후 Dependency specifiers로 이동)은 종속성을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/780/",
        "teaser": null
      },{
        "title": "[Draft] PEP 781 - MakeTYPE_CHECKINGa built-in constant",
        "excerpt":"원문 링크: PEP 781 - MakeTYPE_CHECKINGa built-in constant 상태: Draft 유형: Standards Track 작성일: 24-Mar-2025 PEP 781 – TYPE_CHECKING을 내장(Built-in) 상수로 만들기 개요 이 문서는 Python 3.15에 도입될 예정인 PEP 781 – Make TYPE_CHECKING a built-in constant에 대한 번역 및 요약본입니다. 이 PEP는 TYPE_CHECKING이라는 새로운 내장 변수를 추가하여, Python 코드에...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/781/",
        "teaser": null
      },{
        "title": "[Final] PEP 782 - Add PyBytesWriter C API",
        "excerpt":"원문 링크: PEP 782 - Add PyBytesWriter C API 상태: Final 유형: Standards Track 작성일: 27-Mar-2025 PEP 782 – PyBytesWriter C API 추가 저자: Victor Stinner 상태: Final 생성일: 2025년 3월 27일 Python 버전: 3.15 초록 (Abstract) PEP 782는 bytes 객체를 생성하기 위한 새로운 C API인 PyBytesWriter를 추가하는 것을 제안합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/782/",
        "teaser": null
      },{
        "title": "[Draft] PEP 783 - Emscripten Packaging",
        "excerpt":"원문 링크: PEP 783 - Emscripten Packaging 상태: Draft 유형: Standards Track 작성일: 28-Mar-2025 PEP 783 – Emscripten 패키징 초록 (Abstract) 이 PEP는 Pyodide Python 런타임을 위한 바이너리 Python 패키지 배포판을 위한 새로운 플랫폼 태그 시리즈인 pyodide를 제안합니다. Emscripten은 완전한 오픈 소스 컴파일러 툴체인입니다. 이는 C/C++ 코드를 WebAssembly/JavaScript 실행 파일로...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/783/",
        "teaser": null
      },{
        "title": "[Final] PEP 784 - Adding Zstandard to the standard library",
        "excerpt":"원문 링크: PEP 784 - Adding Zstandard to the standard library 상태: Final 유형: Standards Track 작성일: 06-Apr-2025 PEP 784 – 표준 라이브러리에 Zstandard 추가 개요 이 문서는 Python Enhancement Proposal (PEP) 784에 대한 한국어 번역 및 정리입니다. PEP 784는 Python 표준 라이브러리에 Zstandard (zstd) 압축 알고리즘을 추가하고, 기존 압축...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/784/",
        "teaser": null
      },{
        "title": "[Draft] PEP 785 - New methods for easier handling ofExceptionGroups",
        "excerpt":"원문 링크: PEP 785 - New methods for easier handling ofExceptionGroups 상태: Draft 유형: Standards Track 작성일: 08-Apr-2025 PEP 785는 ExceptionGroup을 더 쉽게 다룰 수 있는 새로운 메서드들을 제안합니다. 이 PEP는 Python 3.14 버전을 대상으로 하며, BaseExceptionGroup.leaf_exceptions()와 BaseException.preserve_context()라는 두 가지 새로운 메서드를 추가하여 예외 처리 로직을 간결하게 표현하고 디버깅 경험을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/785/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 787 - Safer subprocess usage using t-strings",
        "excerpt":"원문 링크: PEP 787 - Safer subprocess usage using t-strings 상태: Deferred 유형: Standards Track 작성일: 13-Apr-2025 PEP 787 – t-string을 사용한 더 안전한 서브프로세스 활용 저자: Nick Humrich, Alyssa Coghlan 상태: Deffered (연기됨) Python 버전: 3.15 생성일: 2025년 4월 13일 개요 (Abstract) PEP 750에서 f-string의 일반화된 형태로 template string...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/787/",
        "teaser": null
      },{
        "title": "[Draft] PEP 788 - PyInterpreterRef: Interpreter References in the C API",
        "excerpt":"원문 링크: PEP 788 - PyInterpreterRef: Interpreter References in the C API 상태: Draft 유형: Standards Track 작성일: 23-Apr-2025 PEP 788 – PyInterpreterRef: C API의 인터프리터 참조 (Interpreter References in the C API) 초록 (Abstract) C API에서 스레드는 현재 스레드에 연결된 스레드 상태(thread state)를 보유함으로써 인터프리터와 상호 작용할 수 있습니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/788/",
        "teaser": null
      },{
        "title": "[Draft] PEP 789 - Preventing task-cancellation bugs by limiting yield in async generators",
        "excerpt":"원문 링크: PEP 789 - Preventing task-cancellation bugs by limiting yield in async generators 상태: Draft 유형: Standards Track 작성일: 14-May-2024 PEP 789은 async 제너레이터에서 yield 사용을 제한하여 태스크 취소 관련 버그를 방지하는 것을 제안합니다. 이 PEP의 목표는 구조적 동시성(Structured Concurrency) 모델과 yield의 근본적인 비호환성으로 인해 발생하는 문제를 해결하는 것입니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/789/",
        "teaser": null
      },{
        "title": "[Active] PEP 790 - Python 3.15 Release Schedule",
        "excerpt":"원문 링크: PEP 790 - Python 3.15 Release Schedule 상태: Active 유형: Informational 작성일: 26-Apr-2025 PEP 790 – Python 3.15 릴리스 일정 작성자: Hugo van Kemenade 상태: Active (활성) 유형: Informational (정보성) 주제: Release (릴리스) 생성일: 2025년 4월 26일 Python 버전: 3.15 개요 (Abstract) 이 문서는 Python 3.15 버전의 개발...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/790/",
        "teaser": null
      },{
        "title": "[Draft] PEP 791 - intmath — module for integer-specific mathematics functions",
        "excerpt":"원문 링크: PEP 791 - intmath — module for integer-specific mathematics functions 상태: Draft 유형: Standards Track 작성일: 12-May-2025 PEP 791: intmath — 정수 전용 수학 함수 모듈 개요 (Abstract) 이 PEP는 math.gcd() 또는 math.isqrt()와 같이 정수 인수를 위해 정의된 수론, 조합론 및 기타 함수를 위한 새로운 모듈을 제안합니다. 도입...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/791/",
        "teaser": null
      },{
        "title": "[Final] PEP 792 - Project status markers in the simple index",
        "excerpt":"원문 링크: PEP 792 - Project status markers in the simple index 상태: Final 유형: Standards Track 작성일: 21-May-2025 PEP 792 – simple index에 프로젝트 상태 마커 추가 (Project status markers in the simple index) 초록 (Abstract) 이 PEP는 simple index에서 제공되는 표준화된 프로젝트 상태 마커(project status markers) 세트와, 이러한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/792/",
        "teaser": null
      },{
        "title": "[Draft] PEP 793 - PyModExport: A new entry point for C extension modules",
        "excerpt":"원문 링크: PEP 793 - PyModExport: A new entry point for C extension modules 상태: Draft 유형: Standards Track 작성일: 23-May-2025 PEP 793: PyModExport - C 확장 모듈을 위한 새로운 진입점 작성자: Petr Viktorin 상태: Draft (초안) 생성일: 2025년 5월 23일 Python 버전: 3.15 개요 (Abstract) PEP 793은 C 확장...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/793/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 794 - Import Name Metadata",
        "excerpt":"원문 링크: PEP 794 - Import Name Metadata 상태: Accepted 유형: Standards Track 작성일: 05-Jun-2025 PEP 794 – Import Name Metadata (가져오기 이름 메타데이터) 개요 (Abstract) 이 PEP는 Python 패키징을 위한 핵심 메타데이터 사양을 확장하여 Import-Name과 Import-Namespace라는 두 개의 새롭고 반복 가능한 필드를 도입할 것을 제안합니다. 이 필드들은 프로젝트가 설치될...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/794/",
        "teaser": null
      },{
        "title": "[Draft] PEP 798 - Unpacking in Comprehensions",
        "excerpt":"원문 링크: PEP 798 - Unpacking in Comprehensions 상태: Draft 유형: Standards Track 작성일: 19-Jul-2025 PEP 798 – Comprehension 내 언패킹 (Unpacking) 개요 (Abstract) 이 PEP는 list, set, dictionary Comprehension (컴프리헨션) 및 generator expression (제너레이터 표현식)을 확장하여 표현식 시작 부분에 언패킹(Unpacking) 표기법(* 및 **)을 허용할 것을 제안합니다. 이는 임의의 수의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/798/",
        "teaser": null
      },{
        "title": "[Draft] PEP 799 - A dedicatedprofilingpackage for organizing Python profiling tools",
        "excerpt":"원문 링크: PEP 799 - A dedicatedprofilingpackage for organizing Python profiling tools 상태: Draft 유형: Standards Track 작성일: 21-Jul-2025 PEP 799 – Python 프로파일링 도구 정리를 위한 전용 프로파일링 패키지 초록 (Abstract) 이 PEP는 Python의 내장 프로파일링 도구들을 단일하고 일관된 네임스페이스 아래에S profiling이라는 새로운 표준 라이브러리 모듈을 생성할 것을 제안합니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/799/",
        "teaser": null
      },{
        "title": "[Draft] PEP 800 - Disjoint bases in the type system",
        "excerpt":"원문 링크: PEP 800 - Disjoint bases in the type system 상태: Draft 유형: Standards Track 작성일: 21-Jul-2025 PEP 800: 타입 시스템 내의 Disjoint Base (분리된 기본 클래스) 개요 (Abstract) 정확한 Python 프로그램 분석을 위해, 타입 체커(type checker)는 두 클래스가 공통 자식 클래스를 가질 수 있는지 여부를 알아야 합니다. 하지만...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/800/",
        "teaser": null
      },{
        "title": "[Active] PEP 801 - Reserved",
        "excerpt":"원문 링크: PEP 801 - Reserved 상태: Active 유형: Informational 작성일: 21-Jun-2018 PEP 801 – 예약됨 (Reserved) 번역 및 설명 PEP 801은 현재 “예약됨(Reserved)” 상태의 문서이며, 향후 사용을 위해 지정된 placeholder(자리 표시자)입니다. 따라서 이 PEP는 특정 기술 제안, 도입 배경, 또는 Python 사용에 미치는 영향에 대한 자세한 내용을 담고 있지...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/801/",
        "teaser": null
      },{
        "title": "[Draft] PEP 802 - Display Syntax for the Empty Set",
        "excerpt":"원문 링크: PEP 802 - Display Syntax for the Empty Set 상태: Draft 유형: Standards Track 작성일: 08-Aug-2025 PEP 802 – 빈 집합(Empty Set)을 위한 표기법 제안 번역 및 정리 개요 (Abstract) PEP 802는 빈 집합(empty set)을 생성하고 표현하기 위한 새로운 표기법인 {/}를 제안합니다. 이 표기법은 수학적 기호 ‘∅’에서 영감을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/802/",
        "teaser": null
      },{
        "title": "[Draft] PEP 803 - Stable ABI for Free-Threaded Builds",
        "excerpt":"원문 링크: PEP 803 - Stable ABI for Free-Threaded Builds 상태: Draft 유형: Standards Track 작성일: 19-Aug-2025 PEP 803 – 자유 스레드 빌드를 위한 Stable ABI 개요 (Abstract) 이 PEP (Python Enhancement Proposal)는 Python 3.15 버전의 Stable ABI가 자유 스레드(free-threaded) 빌드와 GIL-enabled 빌드 모두와 호환되도록 제안합니다. 이를 위해, PyObject 내부...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/803/",
        "teaser": null
      },{
        "title": "[Draft] PEP 804 - An external dependency registry and name mapping mechanism",
        "excerpt":"원문 링크: PEP 804 - An external dependency registry and name mapping mechanism 상태: Draft 유형: Standards Track 작성일: 03-Sep-2025 PEP 804: 외부 의존성 레지스트리 및 이름 매핑 메커니즘 초록 (Abstract) PEP 804는 패키징 도구들이 PEP 725에서 소개된 외부 의존성 식별자(DepURL)를 다른 패키지 저장소의 해당 식별자로 매핑할 수 있게 하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/804/",
        "teaser": null
      },{
        "title": "[Draft] PEP 806 - Mixed sync/async context managers with precise async marking",
        "excerpt":"원문 링크: PEP 806 - Mixed sync/async context managers with precise async marking 상태: Draft 유형: Standards Track 작성일: 05-Sep-2025 PEP 806 – 혼합 동기/비동기 컨텍스트 관리자 (정확한 비동기 표기법) 초록 (Abstract) 현재 Python에서는 with 또는 async with 문을 사용하여 여러 컨텍스트 관리자를 한 번에 처리할 수 있지만, 이들은 각각...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/806/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 2026 - Calendar versioning for Python",
        "excerpt":"원문 링크: PEP 2026 - Calendar versioning for Python 상태: Rejected 유형: Process 작성일: 11-Jun-2024 PEP 2026 – Python의 캘린더 버전 관리 (Calendar Versioning for Python) 상태: Rejected (거부됨) 유형: Process (프로세스) 생성일: 2024년 6월 11일 Python 버전: 3.26 논의: Discourse thread 해결: Discourse message 개요 (Abstract) 이 PEP는 Python의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/2026/",
        "teaser": null
      },{
        "title": "[Final] PEP 3000 - Python 3000",
        "excerpt":"원문 링크: PEP 3000 - Python 3000 상태: Final 유형: Process 작성일: 05-Apr-2006 PEP 3000 – Python 3000 작성자: Guido van Rossum 상태: Final (최종) 유형: Process (프로세스) 생성일: 2006년 4월 5일 개요 (Abstract) 이 PEP는 Python 3000 개발을 위한 지침을 설정합니다. 이상적으로는 먼저 프로세스에 합의한 후, 해당 프로세스가 결정되고...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3000/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 3001 - Procedure for reviewing and improving standard library modules",
        "excerpt":"원문 링크: PEP 3001 - Procedure for reviewing and improving standard library modules 상태: Withdrawn 유형: Process 작성일: 05-Apr-2006 PEP 3001 – 표준 라이브러리 모듈 검토 및 개선 절차 작성자: Georg Brandl 상태: 철회됨 (Withdrawn) 유형: 프로세스 (Process) 생성일: 2006년 4월 5일 개요 (Abstract) 이 PEP는 표준 라이브러리 모듈, 특히...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3001/",
        "teaser": null
      },{
        "title": "[Final] PEP 3002 - Procedure for Backwards-Incompatible Changes",
        "excerpt":"원문 링크: PEP 3002 - Procedure for Backwards-Incompatible Changes 상태: Final 유형: Process 작성일: 27-Mar-2006 PEP 3002 – 하위 호환성을 깨는 변경사항을 위한 절차 작성자: Steven Bethard 상태: Final (최종) 유형: Process (프로세스) 생성일: 2006년 3월 27일 요약 (Abstract) 이 PEP는 Python 2.X 시리즈와 Python 3000 (Python 3.x의 초기 명칭)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3002/",
        "teaser": null
      },{
        "title": "[Final] PEP 3003 - Python Language Moratorium",
        "excerpt":"원문 링크: PEP 3003 - Python Language Moratorium 상태: Final 유형: Process 작성일: 21-Oct-2009 PEP 3003 – Python 언어 변경 유예 (Moratorium) 개요 (Abstract) 이 PEP는 Python 3.1 출시일로부터 최소 2년 동안 Python 언어 문법, 의미론, 내장 함수(built-ins)에 대한 모든 변경을 일시적으로 중단(moratorium)할 것을 제안합니다. 특히 이 유예 기간은 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3003/",
        "teaser": null
      },{
        "title": "[Final] PEP 3099 - Things that will Not Change in Python 3000",
        "excerpt":"원문 링크: PEP 3099 - Things that will Not Change in Python 3000 상태: Final 유형: Process 작성일: 04-Apr-2006 PEP 3099 – Python 3000에서 변경되지 않을 것들 작성자: Georg Brandl 상태: Final 유형: Process 생성일: 2006년 4월 4일 개요 (Abstract) 몇몇 아이디어는 단순히 좋지 않습니다. Python의 진화에 대한 일부 의견은...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3099/",
        "teaser": null
      },{
        "title": "[Final] PEP 3100 - Miscellaneous Python 3.0 Plans",
        "excerpt":"원문 링크: PEP 3100 - Miscellaneous Python 3.0 Plans 상태: Final 유형: Process 작성일: 20-Aug-2004 PEP 3100 – Miscellaneous Python 3.0 Plans 작성자: Brett Cannon 상태: Final (최종) 유형: Process (프로세스) 생성일: 2004년 8월 20일 초록 (Abstract) 이 PEP는 이전에 PEP 3000으로 알려졌으며, Python 3000을 목표로 하는 소규모 변경사항과 아직...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3100/",
        "teaser": null
      },{
        "title": "[Final] PEP 3101 - Advanced String Formatting",
        "excerpt":"원문 링크: PEP 3101 - Advanced String Formatting 상태: Final 유형: Standards Track 작성일: 16-Apr-2006 PEP 3101 – 고급 문자열 포매팅 초록 (Abstract) 이 PEP(Python Enhancement Proposal)는 기존의 ‘%’ 문자열 포매팅 연산자를 대체하기 위한 새로운 내장 문자열 포매팅 시스템을 제안합니다. 도입 배경 (Rationale) Python은 현재 두 가지 문자열 보간(interpolation) 방식을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3101/",
        "teaser": null
      },{
        "title": "[Final] PEP 3102 - Keyword-Only Arguments",
        "excerpt":"원문 링크: PEP 3102 - Keyword-Only Arguments 상태: Final 유형: Standards Track 작성일: 22-Apr-2006 PEP 3102 – 키워드 전용 인자 (Keyword-Only Arguments) 초록 (Abstract) 이 PEP는 함수 인자가 명명된 매개변수 슬롯에 할당되는 방식에 대한 변경을 제안합니다. 특히 “키워드 전용 인자(keyword-only arguments)”의 선언을 가능하게 하는데, 이는 반드시 키워드를 통해서만 제공될 수...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3102/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 3103 - A Switch/Case Statement",
        "excerpt":"원문 링크: PEP 3103 - A Switch/Case Statement 상태: Rejected 유형: Standards Track 작성일: 25-Jun-2006 PEP 3103 – switch/case 문 제안 (거부됨) 거부 공지 PyCon 2007 기조연설 중 진행된 빠른 설문조사에서 이 제안이 대중적 지지를 받지 못했음이 확인되어, 결국 PEP 3103은 거부되었습니다. 개요 Python-dev 커뮤니티에서는 최근 switch 문 추가에 대한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3103/",
        "teaser": null
      },{
        "title": "[Final] PEP 3104 - Access to Names in Outer Scopes",
        "excerpt":"원문 링크: PEP 3104 - Access to Names in Outer Scopes 상태: Final 유형: Standards Track 작성일: 12-Oct-2006 PEP 3104 – 외부 스코프의 이름 접근 작성자: Ka-Ping Yee **상태:** Final **유형:** Standards Track **생성일:** 2006-10-12 **Python 버전:** 3.0 **히스토리:** [Post-History](https://peps.python.org/pep-3104/) 요약 (Abstract) 대부분의 중첩 스코프(nested scopes)를 지원하는 언어에서 코드는 가장...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3104/",
        "teaser": null
      },{
        "title": "[Final] PEP 3105 - Make print a function",
        "excerpt":"원문 링크: PEP 3105 - Make print a function 상태: Final 유형: Standards Track 작성일: 19-Nov-2006 PEP 3105 – print를 함수로 만들기 작성자: Georg Brandl 상태: Final (최종) 유형: Standards Track 생성일: 2006년 11월 19일 Python 버전: 3.0 요약 (Abstract) 이 PEP는 print 문(statement)을 대체하는 새로운 내장 함수 print()를 제안하며,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3105/",
        "teaser": null
      },{
        "title": "[Final] PEP 3106 - Revamping dict.keys(), .values() and .items()",
        "excerpt":"원문 링크: PEP 3106 - Revamping dict.keys(), .values() and .items() 상태: Final 유형: Standards Track 작성일: 19-Dec-2006 PEP 3106 – dict.keys(), .values(), .items() 메서드 개편 요약 (Abstract) 이 PEP(Python Enhancement Proposal)는 내장 dict 타입의 .keys(), .values(), .items() 메서드가 더 이상 키, 값 또는 아이템의 복사본인 리스트(list)를 반환하지 않고, 대신 기본...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3106/",
        "teaser": null
      },{
        "title": "[Final] PEP 3107 - Function Annotations",
        "excerpt":"원문 링크: PEP 3107 - Function Annotations 상태: Final 유형: Standards Track 작성일: 02-Dec-2006 PEP 3107 – 함수 Annotation (Function Annotations) 번역 및 설명 이 문서는 Python Enhancement Proposal (PEP) 3107의 내용을 한국어 사용자가 이해하기 쉽도록 번역하고 설명합니다. 이 PEP는 Python 함수에 임의의 메타데이터 Annotation을 추가하는 문법을 소개합니다. 개요 (Abstract)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3107/",
        "teaser": null
      },{
        "title": "[Final] PEP 3108 - Standard Library Reorganization",
        "excerpt":"원문 링크: PEP 3108 - Standard Library Reorganization 상태: Final 유형: Standards Track 작성일: 01-Jan-2007 PEP 3108 – 표준 라이브러리 재편성 작성자: Brett Cannon 상태: Final (최종) 유형: Standards Track (표준 트랙) 생성일: 2007년 1월 1일 Python 버전: 3.0 최종 기록: 2008년 4월 28일 개요 (Abstract) 언어 자체와 마찬가지로 Python의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3108/",
        "teaser": null
      },{
        "title": "[Final] PEP 3109 - Raising Exceptions in Python 3000",
        "excerpt":"원문 링크: PEP 3109 - Raising Exceptions in Python 3000 상태: Final 유형: Standards Track 작성일: 19-Jan-2006 PEP 3109 – Python 3000에서의 예외 발생 (Raising Exceptions) 작성자: Collin Winter 상태: Final (최종) 유형: Standards Track 생성일: 2006년 1월 19일 Python 버전: 3.0 초록 (Abstract) 이 PEP는 Python의 예외 발생(raising exceptions)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3109/",
        "teaser": null
      },{
        "title": "[Final] PEP 3110 - Catching Exceptions in Python 3000",
        "excerpt":"원문 링크: PEP 3110 - Catching Exceptions in Python 3000 상태: Final 유형: Standards Track 작성일: 16-Jan-2006 파이썬 3000의 예외 처리 (PEP 3110) 개요 이 PEP (Python Enhancement Proposal)는 Python 3.0에서 예외(exception) 처리 구문의 모호성을 제거하고, 예외 클래스를 간소화하며, 예외의 가비지 컬렉션(garbage collection)을 단순화하고, 언어의 크기를 줄이는 것을 목표로 하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3110/",
        "teaser": null
      },{
        "title": "[Final] PEP 3111 - Simple input built-in in Python 3000",
        "excerpt":"원문 링크: PEP 3111 - Simple input built-in in Python 3000 상태: Final 유형: Standards Track 작성일: 13-Sep-2006 PEP 3111: Python 3000의 단순 input 내장 함수 작성자: Andre Roberge 상태: Final 유형: Standards Track 생성일: 2006년 9월 13일 Python 버전: 3.0 최종 수락: 2006년 12월 (BDFL에 의해 수락됨) 개요 (Abstract)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3111/",
        "teaser": null
      },{
        "title": "[Final] PEP 3112 - Bytes literals in Python 3000",
        "excerpt":"원문 링크: PEP 3112 - Bytes literals in Python 3000 상태: Final 유형: Standards Track 작성일: 23-Feb-2007 PEP 3112 – Python 3000의 바이트 리터럴 (Bytes literals in Python 3000) 초록 (Abstract) 이 PEP는 PEP 358에서 도입된 bytes 객체를 위한 리터럴 구문을 제안합니다. 이 제안의 목적은 ASCII 문자열 및 임의의 이진...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3112/",
        "teaser": null
      },{
        "title": "[Final] PEP 3113 - Removal of Tuple Parameter Unpacking",
        "excerpt":"원문 링크: PEP 3113 - Removal of Tuple Parameter Unpacking 상태: Final 유형: Standards Track 작성일: 02-Mar-2007 PEP 3113 – 튜플 매개변수 언패킹 제거 개요 이 문서는 Python 3.0에서 튜플 매개변수 언패킹(Tuple Parameter Unpacking) 기능을 제거할 것을 제안합니다. 튜플 매개변수 언패킹은 함수 시그니처(function signature)에서 튜플을 매개변수로 사용하여 시퀀스(sequence) 인자가 자동으로...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3113/",
        "teaser": null
      },{
        "title": "[Final] PEP 3114 - Renaming iterator.next() to iterator.__next__()",
        "excerpt":"원문 링크: PEP 3114 - Renaming iterator.next() to iterator.next() 상태: Final 유형: Standards Track 작성일: 04-Mar-2007 PEP 3114 – iterator.next()를 iterator.__next__()로 이름 변경 작성자: Ka-Ping Yee 상태: Final (최종) 유형: Standards Track 작성일: 2007년 3월 4일 Python 버전: 3.0 초록 (Abstract) 이 PEP 3114는 Python 2.x의 이터레이터(iterator) 프로토콜에서 next() 메서드를...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3114/",
        "teaser": null
      },{
        "title": "[Final] PEP 3115 - Metaclasses in Python 3000",
        "excerpt":"원문 링크: PEP 3115 - Metaclasses in Python 3000 상태: Final 유형: Standards Track 작성일: 07-Mar-2007 상태: Final (최종) 유형: Standards Track (표준 트랙) 작성자: Talin 생성일: 2007년 3월 7일 Python 버전: 3.0 수정 이력: 2007년 3월 11일, 2007년 3월 14일 요약 (Abstract) 이 PEP는 메타클래스 선언을 위한 구문을 변경하고,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3115/",
        "teaser": null
      },{
        "title": "[Final] PEP 3116 - New I/O",
        "excerpt":"원문 링크: PEP 3116 - New I/O 상태: Final 유형: Standards Track 작성일: 26-Feb-2007 PEP 3116 – 새로운 I/O (New I/O) 작성자: Daniel Stutzbach, Guido van Rossum, Mike Verdone 상태: Final (최종) 유형: Standards Track (표준 트랙) 생성일: 2007년 2월 26일 Python 버전: 3.0 서론 이 문서는 Python 3.0에 도입된...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3116/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 3117 - Postfix type declarations",
        "excerpt":"원문 링크: PEP 3117 - Postfix type declarations 상태: Rejected 유형: Standards Track 작성일: 01-Apr-2007 PEP 3117 – Postfix type declarations (후위 타입 선언) 개요 (Abstract) 이 PEP는 Python에 후위(postfix) 타입 선언 문법을 추가할 것을 제안합니다. 또한, 타입과 선언자(declarator) 사이의 새로운 매핑을 생성하는 데 사용되는 새로운 typedef 문(statement)을 명시합니다. 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3117/",
        "teaser": null
      },{
        "title": "[Final] PEP 3118 - Revising the buffer protocol",
        "excerpt":"원문 링크: PEP 3118 - Revising the buffer protocol 상태: Final 유형: Standards Track 작성일: 28-Aug-2006 PEP 3118 – 버퍼 프로토콜 재설계 (Revising the buffer protocol) 작성자: Travis Oliphant, Carl Banks 상태: Final 유형: Standards Track 생성일: 2006년 8월 28일 Python 버전: 3.0 최종 수정일: 2025년 2월 14일 중요: 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3118/",
        "teaser": null
      },{
        "title": "[Final] PEP 3119 - Introducing Abstract Base Classes",
        "excerpt":"원문 링크: PEP 3119 - Introducing Abstract Base Classes 상태: Final 유형: Standards Track 작성일: 18-Apr-2007 PEP 3119 – 추상 기본 클래스 (Abstract Base Classes) 도입 개요 (Abstract) 이 문서는 Python 3000에 Abstract Base Class (ABC) 지원을 추가하기 위한 제안입니다. 주요 제안 내용은 다음과 같습니다. isinstance() 및 issubclass() 함수를 오버로드(overload)하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3119/",
        "teaser": null
      },{
        "title": "[Final] PEP 3120 - Using UTF-8 as the default source encoding",
        "excerpt":"원문 링크: PEP 3120 - Using UTF-8 as the default source encoding 상태: Final 유형: Standards Track 작성일: 15-Apr-2007 PEP 3120 – 기본 소스 인코딩으로 UTF-8 사용 개요 이 문서는 Python 3.0부터 기본 소스 인코딩을 ASCII에서 UTF-8로 변경할 것을 제안합니다. PEP 263에서 도입된 다른 소스 인코딩 지원은 계속 유지되며, 명시적인...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3120/",
        "teaser": null
      },{
        "title": "[Final] PEP 3121 - Extension Module Initialization and Finalization",
        "excerpt":"원문 링크: PEP 3121 - Extension Module Initialization and Finalization 상태: Final 유형: Standards Track 작성일: 27-Apr-2007 PEP 3121 – 확장 모듈 초기화 및 종료 본 문서는 역사적 문서입니다. 최신 규범 문서는 PyInit_modulename() 및 PyModuleDef에서 확인할 수 있습니다. 개요 (Abstract) 현재 확장 모듈(Extension Module)의 초기화 과정에는 몇 가지 문제점이 있습니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3121/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 3122 - Delineation of the main module",
        "excerpt":"원문 링크: PEP 3122 - Delineation of the main module 상태: Rejected 유형: Standards Track 작성일: 27-Apr-2007 PEP 3122 – 메인 모듈의 경계 설정 (Delineation of the main module) 작성자: Brett Cannon 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2007년 4월 27일 주의 사항 이 PEP는 거부되었습니다. Guido van Rossum은...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3122/",
        "teaser": null
      },{
        "title": "[Final] PEP 3123 - Making PyObject_HEAD conform to standard C",
        "excerpt":"원문 링크: PEP 3123 - Making PyObject_HEAD conform to standard C 상태: Final 유형: Standards Track 작성일: 27-Apr-2007 PEP 3123 – PyObject_HEAD를 표준 C에 맞게 변경 개요 (Abstract) Python은 현재 PyObject_HEAD 사용에서 C 표준에 정의되지 않은 동작에 의존하고 있습니다. 이 PEP는 이러한 의존성을 표준 C에 부합하도록 변경할 것을 제안합니다. 배경...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3123/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 3124 - Overloading, Generic Functions, Interfaces, and Adaptation",
        "excerpt":"원문 링크: PEP 3124 - Overloading, Generic Functions, Interfaces, and Adaptation 상태: Deferred 유형: Standards Track 작성일: 28-Apr-2007 PEP 3124 – 오버로딩, 제네릭 함수, 인터페이스 및 어댑테이션 작성자: Phillip J. Eby 논의처: Python-3000 list 상태: Deferred (보류됨) 유형: Standards Track 요구사항: PEP 3107, 3115, 3119 생성일: 2007년 4월 28일 교체...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3124/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 3125 - Remove Backslash Continuation",
        "excerpt":"원문 링크: PEP 3125 - Remove Backslash Continuation 상태: Rejected 유형: Standards Track 작성일: 29-Apr-2007 PEP 3125 – Backslash Continuation 제거 제안 작성자: Jim J. Jewett 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2007년 4월 29일 거부 고지 (Rejection Notice) 이 PEP는 거부되었습니다. 해당 제안에 대한 충분한 지지가 없었고, 제거될...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3125/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 3126 - Remove Implicit String Concatenation",
        "excerpt":"원문 링크: PEP 3126 - Remove Implicit String Concatenation 상태: Rejected 유형: Standards Track 작성일: 29-Apr-2007 PEP 3126 – 암시적 문자열 연결 제거 (Remove Implicit String Concatenation) 개요 이 문서는 Python 3000(Python 3의 초기 개발 단계 명칭)의 목표 중 하나인 불필요한 기능을 제거하여 언어를 단순화하는 데 기여하기 위해 작성되었습니다. Python은...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3126/",
        "teaser": null
      },{
        "title": "[Final] PEP 3127 - Integer Literal Support and Syntax",
        "excerpt":"원문 링크: PEP 3127 - Integer Literal Support and Syntax 상태: Final 유형: Standards Track 작성일: 14-Mar-2007 PEP 3127 – 정수 리터럴 지원 및 구문 이 문서는 Python 3.0에 도입된 정수 리터럴(Integer Literal) 처리 방식의 변경 사항에 대한 Python Enhancement Proposal (PEP) 3127의 번역 및 요약입니다. 이 PEP는 정수 리터럴의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3127/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 3128 - BList: A Faster List-like Type",
        "excerpt":"원문 링크: PEP 3128 - BList: A Faster List-like Type 상태: Rejected 유형: Standards Track 작성일: 30-Apr-2007 PEP 3128 – BList: 더 빠른 List-like 타입 작성자: Daniel Stutzbach 논의처: Python-3000 메일링 리스트 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2007년 4월 30일 Python 버전: 2.6, 3.0 이력: 2007년 4월 30일...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3128/",
        "teaser": null
      },{
        "title": "[Final] PEP 3129 - Class Decorators",
        "excerpt":"원문 링크: PEP 3129 - Class Decorators 상태: Final 유형: Standards Track 작성일: 01-May-2007 PEP 3129 – 클래스 데코레이터 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 PEP 318에서 도입된 함수 및 메서드 데코레이터의 확장인 클래스 데코레이터를 제안합니다. 도입 배경 (Rationale) 함수 데코레이터가 Python 2.4에 포함될지에 대해 처음 논의되었을 때, 클래스 데코레이터는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3129/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 3130 - Access to Current Module/Class/Function",
        "excerpt":"원문 링크: PEP 3130 - Access to Current Module/Class/Function 상태: Rejected 유형: Standards Track 작성일: 22-Apr-2007 PEP 3130 – 현재 모듈/클래스/함수에 접근 작성자: Jim J. Jewett 상태: Rejected (거부됨) 유형: Standards Track 생성일: 2007년 4월 22일 Python 버전: 3.0 히스토리: 2007년 4월 22일 거부 고지 (Rejection Notice) 이 PEP는 거부되었습니다....","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3130/",
        "teaser": null
      },{
        "title": "[Final] PEP 3131 - Supporting Non-ASCII Identifiers",
        "excerpt":"원문 링크: PEP 3131 - Supporting Non-ASCII Identifiers 상태: Final 유형: Standards Track 작성일: 01-May-2007 PEP 3131 – 비(Non)-ASCII 식별자 지원 (Supporting Non-ASCII Identifiers) 작성자: Martin von Löwis 상태: 최종 (Final) 유형: 표준 트랙 (Standards Track) 생성일: 2007년 5월 1일 Python 버전: 3.0 개요 (Abstract) 이 PEP는 Python 식별자(identifier)에 악센트...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3131/",
        "teaser": null
      },{
        "title": "[Final] PEP 3132 - Extended Iterable Unpacking",
        "excerpt":"원문 링크: PEP 3132 - Extended Iterable Unpacking 상태: Final 유형: Standards Track 작성일: 30-Apr-2007 PEP 3132 – 확장된 이터러블 언패킹 (Extended Iterable Unpacking) 개요 (Abstract) 이 PEP는 이터러블(iterable) 언패킹(unpacking) 문법의 변경을 제안합니다. 이 변경을 통해 “catch-all” 이름을 지정할 수 있게 되는데, 이 이름에는 “일반” 이름에 할당되지 않은 모든 항목의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3132/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 3133 - Introducing Roles",
        "excerpt":"원문 링크: PEP 3133 - Introducing Roles 상태: Rejected 유형: Standards Track 작성일: 01-May-2007 PEP 3133 – 역할(Roles) 소개 (PEP 3133 – Introducing Roles) 작성자: Collin Winter 상태: 거부됨 (Rejected) 유형: 표준 트랙 (Standards Track) 요구 사항: PEP 3115, PEP 3129 작성일: 2007년 5월 1일 Python 버전: 3.0 게시 이력:...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3133/",
        "teaser": null
      },{
        "title": "[Final] PEP 3134 - Exception Chaining and Embedded Tracebacks",
        "excerpt":"원문 링크: PEP 3134 - Exception Chaining and Embedded Tracebacks 상태: Final 유형: Standards Track 작성일: 12-May-2005 PEP 3134 – 예외 체인(Exception Chaining) 및 임베디드 트레이스백(Embedded Tracebacks) 이 문서는 Python 3.0에 도입된 예외 처리 메커니즘 개선 제안인 PEP 3134를 한국어 사용자가 이해하기 쉽도록 번역 및 정리한 것입니다. 개요 (Abstract) 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3134/",
        "teaser": null
      },{
        "title": "[Final] PEP 3135 - New Super",
        "excerpt":"원문 링크: PEP 3135 - New Super 상태: Final 유형: Standards Track 작성일: 28-Apr-2007 PEP 3135 – 새로운 super() 개요 이 PEP는 super 타입을 사용하여 메서드가 정의된 클래스와 현재 메서드가 작동하는 인스턴스(또는 클래스 메서드의 경우 클래스 객체)에 자동으로 바인딩되는 super 인스턴스를 구성하기 위한 “구문 설탕(syntactic sugar)”을 제안합니다. 제안된 새로운 super...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3135/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 3136 - Labeled break and continue",
        "excerpt":"원문 링크: PEP 3136 - Labeled break and continue 상태: Rejected 유형: Standards Track 작성일: 30-Jun-2007 PEP 3136 – Labeled break 및 continue 개요 (Abstract) 이 PEP는 Python의 break 및 continue 문에 레이블(label) 지원을 제안합니다. 이 아이디어는 다른 언어의 레이블이 있는 break 및 continue 기능과, 저자가 드물지만 지속적으로 이러한 기능의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3136/",
        "teaser": null
      },{
        "title": "[Final] PEP 3137 - Immutable Bytes and Mutable Buffer",
        "excerpt":"원문 링크: PEP 3137 - Immutable Bytes and Mutable Buffer 상태: Final 유형: Standards Track 작성일: 26-Sep-2007 Python Enhancement Proposal (PEP) 3137은 Python 3.0에서 bytes 타입의 불변성(immutable)과 가변성(mutable)을 명확하게 분리하는 제안입니다. 이 PEP는 초기 Python 3.0a1 버전에서 bytes 타입이 가변(mutable)으로 도입된 이후, 불변 bytes 타입의 필요성이 제기되면서 시작되었습니다. 목표 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3137/",
        "teaser": null
      },{
        "title": "[Final] PEP 3138 - String representation in Python 3000",
        "excerpt":"원문 링크: PEP 3138 - String representation in Python 3000 상태: Final 유형: Standards Track 작성일: 05-May-2008 PEP 3138 – Python 3000에서의 문자열 표현 (String representation in Python 3000) 작성자: Atsuo Ishimoto 상태: 최종 (Final) 유형: 표준 트랙 (Standards Track) 생성일: 2008년 5월 5일 Python 버전: 3.0 최근 이력: 2008년...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3138/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 3139 - Cleaning out sys and the “interpreter” module",
        "excerpt":"원문 링크: PEP 3139 - Cleaning out sys and the “interpreter” module 상태: Rejected 유형: Standards Track 작성일: 04-Apr-2008 PEP 3139 – sys 모듈 및 “interpreter” 모듈 정리 작성자: Benjamin Peterson 상태: Rejected (거부됨) 유형: Standards Track 작성일: 2008년 4월 4일 Python 버전: 3.0 거부 통지 (Rejection Notice) Guido van...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3139/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 3140 - str(container) should call str(item), not repr(item)",
        "excerpt":"원문 링크: PEP 3140 - str(container) should call str(item), not repr(item) 상태: Rejected 유형: Standards Track 작성일: 27-May-2008 PEP 3140 – str(container)는 repr(item) 대신 str(item)을 호출해야 합니다. 작성자: Oleg Broytman, Jim J. Jewett 상태: Rejected (거절됨) 유형: Standards Track 생성일: 2008년 5월 27일 거절 사유 Guido van Rossum은 이 제안이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3140/",
        "teaser": null
      },{
        "title": "[Final] PEP 3141 - A Type Hierarchy for Numbers",
        "excerpt":"원문 링크: PEP 3141 - A Type Hierarchy for Numbers 상태: Final 유형: Standards Track 작성일: 23-Apr-2007 PEP 3141: 숫자형을 위한 타입 계층 구조 (A Type Hierarchy for Numbers) 작성자: Jeffrey Yasskin 상태: Final (최종) 타입: Standards Track (표준 트랙) 생성일: 2007년 4월 23일 Python 버전: 3.0 요약 (Abstract) 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3141/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 3142 - Add a “while” clause to generator expressions",
        "excerpt":"원문 링크: PEP 3142 - Add a “while” clause to generator expressions 상태: Rejected 유형: Standards Track 작성일: 12-Jan-2009 PEP 3142 – 제너레이터 표현식에 “while” 절 추가 제안 작성자: Gerald Britton 상태: 거부됨 (Rejected) 유형: 표준 트랙 (Standards Track) 생성일: 2009년 1월 12일 Python 버전: 3.0 해결: Python-Dev 메시지 요약...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3142/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 3143 - Standard daemon process library",
        "excerpt":"원문 링크: PEP 3143 - Standard daemon process library 상태: Deferred 유형: Standards Track 작성일: 26-Jan-2009 초록 (Abstract) 잘 작동하는 유닉스(Unix) 데몬(daemon) 프로그램을 작성하는 것은 다소 복잡하고 제대로 구현하기 까다롭지만, 프로그램이 해야 할 다른 작업과는 관계없이 대부분의 데몬에서 그 단계는 비슷합니다. 이 PEP는 데몬 프로세스가 되는 작업을 위한 간단한 인터페이스를...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3143/",
        "teaser": null
      },{
        "title": "[Final] PEP 3144 - IP Address Manipulation Library for the Python Standard Library",
        "excerpt":"원문 링크: PEP 3144 - IP Address Manipulation Library for the Python Standard Library 상태: Final 유형: Standards Track 작성일: 06-Feb-2012 PEP 3144 – Python 표준 라이브러리를 위한 IP 주소 조작 라이브러리 초록 (Abstract) 이 PEP는 Python을 위한 IP 주소 조작 모듈의 설계 및 구현을 제안합니다. PEP 승인 (PEP Acceptance)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3144/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 3145 - Asynchronous I/O For subprocess.Popen",
        "excerpt":"원문 링크: PEP 3145 - Asynchronous I/O For subprocess.Popen 상태: Withdrawn 유형: Standards Track 작성일: 04-Aug-2009 PEP 3145 – subprocess.Popen을 위한 비동기 I/O 작성자: Eric Pruitt, Charles R. McCreary, Josiah Carlson 상태: 철회됨 (Withdrawn) 유형: 표준 트랙 (Standards Track) 생성일: 2009년 8월 4일 Python 버전: 3.2 개요 (Abstract) 현재 subprocess.Popen...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3145/",
        "teaser": null
      },{
        "title": "[Withdrawn] PEP 3146 - Merging Unladen Swallow into CPython",
        "excerpt":"원문 링크: PEP 3146 - Merging Unladen Swallow into CPython 상태: Withdrawn 유형: Standards Track 작성일: 01-Jan-2010 PEP 3146 – Unladen Swallow을 CPython으로 통합하기 (철회됨) 작성자: Collin Winter, Jeffrey Yasskin, Reid Kleckner 상태: 철회됨 (Withdrawn) 유형: 표준 트랙 (Standards Track) 생성일: 2010년 1월 1일 Python 버전: 3.3 PEP 철회 Unladen...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3146/",
        "teaser": null
      },{
        "title": "[Final] PEP 3147 - PYC Repository Directories",
        "excerpt":"원문 링크: PEP 3147 - PYC Repository Directories 상태: Final 유형: Standards Track 작성일: 16-Dec-2009 PEP 3147 – PYC 저장소 디렉터리 요약 (Abstract) 이 PEP는 여러 다른 버전의 Python 인터프리터 간에 Python 소스 코드 파일을 공유하는 방법을 개선하는 Python의 import 메커니즘 확장에 대해 설명합니다. 이는 단일 Python 소스 파일(.py 파일)과...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3147/",
        "teaser": null
      },{
        "title": "[Final] PEP 3148 - futures - execute computations asynchronously",
        "excerpt":"원문 링크: PEP 3148 - futures - execute computations asynchronously 상태: Final 유형: Standards Track 작성일: 16-Oct-2009 PEP 3148 – futures - 비동기 연산 실행 개요 (Abstract) 이 PEP는 스레드와 프로세스를 활용하여 호출 가능한(callable) 객체의 연산을 용이하게 하는 패키지 설계를 제안합니다. 이 패키지는 비동기 연산을 추상화하여 개발자가 병렬 처리 로직을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3148/",
        "teaser": null
      },{
        "title": "[Final] PEP 3149 - ABI version tagged .so files",
        "excerpt":"원문 링크: PEP 3149 - ABI version tagged .so files 상태: Final 유형: Standards Track 작성일: 09-Jul-2010 PEP 3149 – ABI 버전 태그가 지정된 .so 파일 개요 (Abstract) 이 PEP(Python Enhancement Proposal)는 Python의 import 메커니즘을 확장하여 확장 모듈 파일(.so)을 유사한 방식으로 함께 배치할 수 있는 기능을 정의합니다. 이는 선택적인 빌드-타임(build-time)...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3149/",
        "teaser": null
      },{
        "title": "[Deferred] PEP 3150 - Statement local namespaces (aka “given” clause)",
        "excerpt":"원문 링크: PEP 3150 - Statement local namespaces (aka “given” clause) 상태: Deferred 유형: Standards Track 작성일: 09-Jul-2010 다음은 PEP 3150 문서의 내용을 한국어로 번역하고 정리한 것입니다. PEP 3150 – Statement local namespaces (일명 “given” 절) 작성자: Alyssa Coghlan 상태: Deferred (보류됨) 유형: Standards Track 생성일: 2010년 7월 9일 Python...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3150/",
        "teaser": null
      },{
        "title": "[Final] PEP 3151 - Reworking the OS and IO exception hierarchy",
        "excerpt":"원문 링크: PEP 3151 - Reworking the OS and IO exception hierarchy 상태: Final 유형: Standards Track 작성일: 21-Jul-2010 PEP 3151 – OS 및 IO 예외 계층 구조 재작업 이 문서는 Python Enhancement Proposal (PEP) 3151의 내용을 한국어 사용자가 이해하기 쉽도록 번역하고 정리한 것입니다. Python 개발자들이 이 PEP의 제안 내용,...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3151/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 3152 - Cofunctions",
        "excerpt":"원문 링크: PEP 3152 - Cofunctions 상태: Rejected 유형: Standards Track 작성일: 13-Feb-2009 개요 (Abstract) PEP 3152는 ‘cofunction’이라는 특수한 유형의 제너레이터(generator)를 정의하고 호출하기 위한 새로운 문법을 제안했습니다. 이 제안의 목표는 제너레이터 기반 코루틴(coroutine)을 작성하는 과정을 간소화하고, 이러한 코드 작성 시 흔히 발생하는 특정 유형의 오류를 조기에 감지하도록 돕는 것이었습니다. 이러한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3152/",
        "teaser": null
      },{
        "title": "[Superseded] PEP 3153 - Asynchronous IO support",
        "excerpt":"원문 링크: PEP 3153 - Asynchronous IO support 상태: Superseded 유형: Standards Track 작성일: 29-May-2011 PEP 3153 – 비동기 IO 지원 작성자: Laurens Van Houtven 상태: 대체됨 (Superseded) 유형: 표준 트랙 (Standards Track) 생성일: 2011년 5월 29일 후속 PEP: PEP 3156에 의해 대체됨 (Superseded-By: 3156) 초록 (Abstract) 이 PEP는 파이썬...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3153/",
        "teaser": null
      },{
        "title": "[Final] PEP 3154 - Pickle protocol version 4",
        "excerpt":"원문 링크: PEP 3154 - Pickle protocol version 4 상태: Final 유형: Standards Track 작성일: 11-Aug-2011 PEP 3154 – Pickle 프로토콜 버전 4 작성자: Antoine Pitrou 상태: Final (최종) 유형: Standards Track (표준 트랙) 생성일: 2011년 8월 11일 Python 버전: 3.4 초록 (Abstract) pickle 모듈을 사용하여 직렬화된 데이터는 Python 버전...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3154/",
        "teaser": null
      },{
        "title": "[Final] PEP 3155 - Qualified name for classes and functions",
        "excerpt":"원문 링크: PEP 3155 - Qualified name for classes and functions 상태: Final 유형: Standards Track 작성일: 29-Oct-2011 PEP 3155 – 클래스 및 함수를 위한 Qualified Name (정규화된 이름) 개요 PEP 3155는 Python의 클래스(class)와 함수(function) 객체에 __qualname__이라는 새로운 속성을 추가하는 것을 제안합니다. 이 속성은 객체가 정의된 모듈(module) 최상위 레벨로부터 객체까지의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3155/",
        "teaser": null
      },{
        "title": "[Final] PEP 3156 - Asynchronous IO Support Rebooted: the “asyncio” Module",
        "excerpt":"원문 링크: PEP 3156 - Asynchronous IO Support Rebooted: the “asyncio” Module 상태: Final 유형: Standards Track 작성일: 12-Dec-2012 PEP 3156 – 비동기 I/O 지원 재정비: “asyncio” 모듈 작성자: Guido van Rossum 상태: Final 타입: Standards Track 생성일: 2012년 12월 12일 Python 버전: 3.3 요약 (Abstract) 이 문서는 Python 3...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3156/",
        "teaser": null
      },{
        "title": "[Final] PEP 3333 - Python Web Server Gateway Interface v1.0.1",
        "excerpt":"원문 링크: PEP 3333 - Python Web Server Gateway Interface v1.0.1 상태: Final 유형: Informational 작성일: 26-Sep-2010 PEP 3333 – Python Web Server Gateway Interface v1.0.1 번역 및 요약 서문 (PEP 333 독자를 위한) 이 문서는 기존 PEP 333의 업데이트된 버전으로, Python 3에서의 사용성을 개선하고, WSGI 프로토콜에 대한 몇 가지...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/3333/",
        "teaser": null
      },{
        "title": "[Final] PEP 8000 - Python Language Governance Proposal Overview",
        "excerpt":"원문 링크: PEP 8000 - Python Language Governance Proposal Overview 상태: Final 유형: Informational 작성일: 24-Aug-2018 PEP 8000 – Python 언어 거버넌스 제안 개요 작성자: Barry Warsaw 상태: Final (최종) 유형: Informational (정보성) 주제: Governance (거버넌스) 생성일: 2018년 8월 24일 초록 (Abstract) 이 PEP는 Guido van Rossum의 은퇴 이후 새로운...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8000/",
        "teaser": null
      },{
        "title": "[Final] PEP 8001 - Python Governance Voting Process",
        "excerpt":"원문 링크: PEP 8001 - Python Governance Voting Process 상태: Final 유형: Process 작성일: 24-Aug-2018 PEP 8001 – Python 거버넌스 투표 절차 (Python Governance Voting Process) 저자: Brett Cannon 외 다수 상태: Final (최종) 유형: Process (절차) 주제: Governance (거버넌스) 생성일: 2018년 8월 24일 개요 (Abstract) 이 PEP는 귀도 반...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8001/",
        "teaser": null
      },{
        "title": "[Final] PEP 8002 - Open Source Governance Survey",
        "excerpt":"원문 링크: PEP 8002 - Open Source Governance Survey 상태: Final 유형: Informational 작성일: 24-Aug-2018 PEP 8002 – 오픈 소스 거버넌스 설문조사 이 문서는 Python Enhancement Proposal (PEP) 8002의 내용을 한국어 사용자가 이해하기 쉽게 번역하고 정리한 것입니다. Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8002/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 8010 - The Technical Leader Governance Model",
        "excerpt":"원문 링크: PEP 8010 - The Technical Leader Governance Model 상태: Rejected 유형: Informational 작성일: 24-Aug-2018 파이썬 개선 제안 (PEP) 8010: 기술 리더 거버넌스 모델 개요 이 문서는 Python Enhancement Proposal (PEP) 8010, 즉 “기술 리더 거버넌스 모델”에 대한 한국어 번역 및 요약입니다. 이 PEP는 단일 기술 프로젝트 리더 모델의...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8010/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 8011 - Python Governance Model Lead by Trio of Pythonistas",
        "excerpt":"원문 링크: PEP 8011 - Python Governance Model Lead by Trio of Pythonistas 상태: Rejected 유형: Informational 작성일: 24-Aug-2018 PEP 8011: 세 명의 파이써니스타가 이끄는 파이썬 거버넌스 모델 제안 (거절됨) 개요 이 문서는 파이썬 핵심 개발 커뮤니티를 위한 거버넌스(Governance) 모델을 제안하는 PEP 8011의 한국어 번역 및 정리입니다. PEP 8011은 동등한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8011/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 8012 - The Community Governance Model",
        "excerpt":"원문 링크: PEP 8012 - The Community Governance Model 상태: Rejected 유형: Informational 작성일: 03-Oct-2018 PEP 8012 – 커뮤니티 거버넌스 모델 작성자: Łukasz Langa 상태: Rejected (거부됨) 유형: Informational (정보성) 주제: Governance (거버넌스) 생성일: 2018년 10월 3일 PEP 거부 사유 PEP 8012는 2018년 12월 17일 월요일, PEP 8001에 명시된 핵심...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8012/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 8013 - The External Council Governance Model",
        "excerpt":"원문 링크: PEP 8013 - The External Council Governance Model 상태: Rejected 유형: Informational 작성일: 14-Sep-2018 PEP 8013 – 외부 위원회 거버넌스 모델 작성자: Steve Dower 상태: Rejected (거부됨) 유형: Informational (정보성) 주제: Governance (거버넌스) 작성일: 2018년 9월 14일 개요 (Abstract) 이 PEP는 Python 언어의 최종 의사결정을 담당하는 감사 위원회(Council...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8013/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 8014 - The Commons Governance Model",
        "excerpt":"원문 링크: PEP 8014 - The Commons Governance Model 상태: Rejected 유형: Informational 작성일: 16-Sep-2018 PEP 8014 – 커먼즈 거버넌스 모델 요약 (Abstract) 이 PEP는 절차, 정의된 용어, 비율을 가능한 한 적게 사용하는 거버넌스 모델을 제안합니다. 이 모델은 ‘무정부주의 거버넌스 모델(The Anarchist Governance Model)’이라고도 불릴 수 있지만, 일부 사람들에게 ‘무정부주의’라는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8014/",
        "teaser": null
      },{
        "title": "[Rejected] PEP 8015 - Organization of the Python community",
        "excerpt":"원문 링크: PEP 8015 - Organization of the Python community 상태: Rejected 유형: Informational 작성일: 04-Oct-2018 PEP 8015 – Python 커뮤니티의 조직 (Organization of the Python community) 작성자: Victor Stinner 상태: 거부됨 (Rejected) 유형: 정보 (Informational) 주제: 거버넌스 (Governance) 생성일: 2018년 10월 4일 초록 (Abstract) 이 PEP는 Python 커뮤니티의 현재...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8015/",
        "teaser": null
      },{
        "title": "[Accepted] PEP 8016 - The Steering Council Model",
        "excerpt":"원문 링크: PEP 8016 - The Steering Council Model 상태: Accepted 유형: Informational 작성일: 01-Nov-2018 PEP 8016 – 스티어링 위원회 모델 요약 PEP 8016은 Python 거버넌스 모델을 스티어링 위원회(Steering Council) 중심으로 제안하는 문서입니다. 이 위원회는 광범위한 권한을 가지지만, 이 권한을 가능한 한 드물게 행사하려고 노력합니다. 대신, 다른 801x 시리즈 PEP에서...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8016/",
        "teaser": null
      },{
        "title": "[Final] PEP 8100 - January 2019 Steering Council election",
        "excerpt":"원문 링크: PEP 8100 - January 2019 Steering Council election 상태: Final 유형: Informational 작성일: 03-Jan-2019 개요 이 문서는 PEP 13에 명시된 2019년 1월 Python 운영 위원회 선거의 일정 및 기타 세부 사항을 설명합니다. 이는 첫 번째 운영 위원회 선거입니다. 선거 관리관 (Returns officer) 향후 선거에서는 퇴임하는 운영 위원회에서 선거...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8100/",
        "teaser": null
      },{
        "title": "[Final] PEP 8101 - 2020 Term Steering Council election",
        "excerpt":"원문 링크: PEP 8101 - 2020 Term Steering Council election 상태: Final 유형: Informational 작성일: 16-Nov-2019 PEP 8101은 2019년 12월에 실시된 Python 스티어링 카운슬(Steering Council) 선거에 대한 정보를 담고 있는 문서입니다. 이 문서는 선거의 배경, 절차, 후보자, 투표 결과 등을 상세히 설명하여 Python 커뮤니티의 거버넌스(governance) 및 핵심 개발자들의 참여를 이해하는...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8101/",
        "teaser": null
      },{
        "title": "[Final] PEP 8102 - 2021 Term Steering Council election",
        "excerpt":"원문 링크: PEP 8102 - 2021 Term Steering Council election 상태: Final 유형: Informational 작성일: 29-Oct-2020 PEP 8102 – 2021년 임기 스티어링 카운슬 선거 (2021 Term Steering Council election) 개요 이 문서는 PEP 13에 명시된 바와 같이, 2020년 12월에 실시된 Python 스티어링 카운슬 (Steering Council) 선거의 일정 및 세부 사항을...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8102/",
        "teaser": null
      },{
        "title": "[Final] PEP 8103 - 2022 Term Steering Council election",
        "excerpt":"원문 링크: PEP 8103 - 2022 Term Steering Council election 상태: Final 유형: Informational 작성일: 04-Oct-2021 PEP 8103 – 2022년도 Steering Council 선거 작성자: Ewa Jodlowska, Ee Durbin, Joe Carey 후원자: Barry Warsaw 상태: Final 유형: Informational (정보성) 주제: Governance (거버넌스) 생성일: 2021년 10월 4일 개요 (Abstract) 이 문서는 PEP...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8103/",
        "teaser": null
      },{
        "title": "[Final] PEP 8104 - 2023 Term Steering Council election",
        "excerpt":"원문 링크: PEP 8104 - 2023 Term Steering Council election 상태: Final 유형: Informational 작성일: 08-Nov-2022 PEP 8104는 “2023 Term Steering Council election”에 대한 정보성(Informational) PEP로, 2022년 12월에 진행된 Python 스티어링 카운슬(Steering Council) 선거의 일정 및 세부 사항을 다루고 있습니다. 이 문서는 Python 3.12 버전에 해당하는 2023년 임기의 스티어링 카운슬...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8104/",
        "teaser": null
      },{
        "title": "[Final] PEP 8105 - 2024 Term Steering Council election",
        "excerpt":"원문 링크: PEP 8105 - 2024 Term Steering Council election 상태: Final 유형: Informational 작성일: 23-Oct-2023 PEP 8105 – 2024년 임기 Steering Council 선거 작성자: Ee Durbin «ee at python.org» 후원자: Thomas Wouters «thomas at python.org» 상태: 최종 (Final) 유형: 정보 제공 (Informational) 주제: 거버넌스 (Governance) 생성일: 2023년 10월 23일...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8105/",
        "teaser": null
      },{
        "title": "[Final] PEP 8106 - 2025 Term Steering Council election",
        "excerpt":"원문 링크: PEP 8106 - 2025 Term Steering Council election 상태: Final 유형: Informational 작성일: 21-Oct-2024 PEP 8106 – 2025년 임기 스티어링 카운슬 선거 번역 및 정리 1. 개요 (Abstract) 이 문서는 PEP 13에 명시된 바에 따라, Python 스티어링 카운슬(Steering Council)의 2024년 선거 일정 및 기타 세부 사항을 기술합니다. 이...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/8106/",
        "teaser": null
      },{
        "title": "[Active] PEP 0 - Index of Python Enhancement Proposals (PEPs)",
        "excerpt":"원문 링크: PEP 0 - Index of Python Enhancement Proposals (PEPs) 상태: Active 유형: Informational 작성일: 13-Jul-2000 PEP 0 – Python Enhancement Proposals (PEPs) 색인 소개 PEP 번호는 PEP 편집자에 의해 할당되며, 한 번 할당되면 변경되지 않습니다. PEP 텍스트의 버전 관리 기록은 역사적 기록을 나타냅니다. 주제별 색인 전문 분야에 대한...","categories": ["Python","PEP"],
        "tags": ["Python","PEP","Translation"],
        "url": "/python/pep/0/",
        "teaser": null
      }]
