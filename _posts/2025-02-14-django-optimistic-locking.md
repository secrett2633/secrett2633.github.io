---
title: "[Django] 낙관적 락"
excerpt: "Django에서 낙관적 락에 대해 알아보자"

categories:
  - Django
tags:
  - [Django]

permalink: /backend/django/optimistic-locking/

toc: true
toc_sticky: true

date: 2025-02-14 08:33:11+0900
last_modified_at: 2025-02-14 08:49:11+0900
published: true
---

## 낙관적 락 (Optimistic Lock)

### 낙관적 락이란?

낙관적 락(Optimistic Lock)은 실제로 데이터베이스에서 락을 걸지 않고, 데이터의 `version` 컬럼을 통해 동시성을 제어하는 방법입니다. 

이 방식은 비관적 락(Pessimistic Lock)과 비교했을 때 동시성 처리가 더 효율적이지만, 충돌이 발생할 가능성도 존재하고, 충돌이 발생했을 때 이를 처리할 로직을 구현해야 합니다. 즉, 데이터가 자주 변경되지 않는 환경에서 유용하게 사용할 수 있습니다.

### 낙관적 락 사용하기

낙관적 락을 사용하려면 데이터 모델에 `version` 컬럼을 추가해야 합니다. 이 컬럼은 데이터가 수정될 때마다 버전 번호를 갱신하여, 충돌이 발생하는지 확인하는 데 사용됩니다.

#### 모델 정의

먼저, 데이터 모델에 `version` 컬럼을 추가합니다:

```python
class Post(models.Model):
    name = models.CharField(max_length=32)
    status = models.CharField(max_length=7, default=PostStatus.DRAFT)
    version = models.PositiveIntegerField(default=0)
```

여기서 `version` 필드는 `PositiveIntegerField`로 정의되어 있으며, 기본값은 0입니다. 이 필드는 데이터가 수정될 때마다 증가하며, 동시성 충돌을 탐지하는 데 사용됩니다.

#### 낙관적 락을 활용한 업데이트

낙관적 락을 사용하여 데이터베이스 업데이트를 처리하는 예제 코드는 다음과 같습니다:

```python
with transaction.atomic():
    # 데이터 조회
    post = Post.objects.get(id=1)
    
    # 낙관적 락을 이용해 version 비교 후 업데이트
    success: int = Post.objects.filter(
        id=1, version=post.version
    ).update(
        name="new_name",
        version=post.version + 1,
    )
    
    # 업데이트가 실패하면 예외 발생
    if not success:
        raise Exception("Version conflict")
```

위 코드는 다음과 같은 순서로 동작합니다:

1. `Post` 모델에서 `id`가 1인 데이터를 조회합니다.
2. 조회한 데이터의 `version`과 데이터베이스에 저장된 `version`을 비교합니다.
3. `version`이 일치하면 `name`과 `version`을 업데이트합니다.
4. 만약 `version`이 일치하지 않으면, 다른 사용자가 이미 해당 데이터를 수정했음을 의미하므로 예외를 발생시킵니다.

#### 트랜잭션 처리

만약 예외가 발생하면 이전에 저장된 데이터는 롤백해야 하므로, 전체 처리 과정은 `transaction.atomic()` 블록 내에서 수행됩니다. 이렇게 함으로써 데이터 무결성을 보장할 수 있습니다.

낙관적 락을 사용할 때는 충돌이 발생할 가능성도 염두에 두어야 합니다. 충돌이 발생하면 예외를 처리할 수 있는 로직을 구현해야 하며, 이때 사용자에게 충돌이 발생했음을 알리고 재시도할 수 있는 방법을 제공하는 것이 좋습니다. 
