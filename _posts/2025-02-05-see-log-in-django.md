---
title: "[Django] DB 로그 확인하기"
excerpt: "Django에서 ORM을 사용하여 데이터베이스에 접근하는 경우, 쿼리 로그를 확인하는 방법을 공유합니다."

categories:
  - Django
tags:
  - [Django]

permalink: /backend/django/see-log-in-django/

toc: true
toc_sticky: true

date: 2025-02-05 19:03:11+0900
last_modified_at: 2025-02-05 19:03:11+0900
published: true
---

## **들어가며**

Django에서 데이터베이스에 접근할 때, 우리는 주로 ORM(Object-Relational Mapping)을 사용합니다.  
ORM을 사용하면 쿼리문을 직접 작성하지 않고도 데이터베이스와 상호작용할 수 있어 매우 편리하지만,  
쿼리 로그를 확인하기 어려워 최적화가 필요한 부분을 파악하기 힘들 수 있습니다.

이번 포스트에서는 Django에서 쿼리 로그를 확인하는 방법에 대해 소개하려고 합니다.  
쿼리 로그를 활용하면 ORM이 어떻게 동작하는지 파악하고 성능 최적화에 도움을 받을 수 있습니다.

---

## **쿼리 로그 확인하기**

### **1. 환경 설정**

먼저, `settings.py` 파일에 다음과 같이 설정을 추가합니다. 이 설정은 Django에서 쿼리 로그를 콘솔에 출력할 수 있도록 도와줍니다.

```python
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",  # 콘솔에 로그를 출력하는 핸들러
        },
    },
    "loggers": {
        "django.db.backends": {  # 데이터베이스 쿼리 로그를 출력하는 로거
            "handlers": ["console"],  # 콘솔 핸들러로 로그를 출력
            "level": "DEBUG",  # 로그 레벨을 DEBUG로 설정하여 자세한 쿼리 정보 출력
        },
    },
}
```

이 설정을 추가하면 Django는 데이터베이스 쿼리 로그를 콘솔에 출력하게 됩니다.  
이제 개발 중에 ORM이 실행하는 쿼리를 직접 확인할 수 있게 됩니다.

### **2. 쿼리 로그 확인하기**

설정을 마친 후, 실제로 Django에서 쿼리 로그를 확인할 수 있습니다.  
개발 중에 ORM을 통해 쿼리를 실행하면, 그 쿼리가 콘솔에 출력됩니다.

예를 들어, `save`를 사용할 때 실행되는 쿼리들을 확인해보았습니다.  
이 방법을 통해 쿼리 로그를 보면 ORM이 어떻게 동작하는지 쉽게 파악할 수 있습니다.

![django-query-log](/assets/images/posts_img/backend/django/django-query-log.png)

---

## **마무리**

Django에서 쿼리 로그를 확인하는 방법을 알아보았습니다.  
이 방법을 통해 쿼리 성능을 분석하고 최적화 포인트를 찾는 데 유용할 것입니다.  
쿼리 로그를 적극적으로 활용하여 Django 프로젝트에서 성능을 최적화해보세요.
