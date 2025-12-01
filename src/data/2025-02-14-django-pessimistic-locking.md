---
title: "[Django] 비관적 락"
excerpt: "Django에서 비관적 락에 대해 알아보자"

categories:
  - Django
tags:
  - [Django]

permalink: /backend/django/pessimistic-locking/

toc: true
toc_sticky: true

date: 2025-02-14 08:03:11+0900
last_modified_at: 2025-02-14 08:31:11+0900
published: true
---

## 비관적 락 (Pessimistic Lock)

### 비관적 락이란?

비관적 락은 **데이터베이스에서 동시성 제어** 를 위해 락을 사용하여 작업을 처리하는 방법입니다. 이 방식은 **데이터 정합성** 을 강하게 보장하지만, 락을 획득하고 있는 동안 다른 작업들이 대기하거나 영향을 받을 수 있는 단점이 있습니다. 이는 주로 충돌 가능성이 높거나 데이터의 정합성이 매우 중요한 상황에서 사용됩니다.

### Django에서 비관적 락 사용하기

Django에서는 비관적 락을 **`select_for_update`** 메서드를 통해 구현할 수 있습니다. 이 메서드는 특정 레코드에 대해 **락을 걸어두고** 다른 트랜잭션이 해당 데이터를 수정하지 못하도록 합니다. 

#### 예시 코드:

```python
from django.db import transaction

with transaction.atomic():
    # 데이터를 잠그고, id가 1인 Category 객체를 가져옵니다.
    category = Category.objects.select_for_update().get(id=1)
    
    # 데이터 수정
    category.name = "new_name"
    
    # 수정된 데이터 저장
    category.save()
```

### 코드 설명

- **`select_for_update()`** : 이 메서드는 선택된 데이터베이스 레코드를 **잠금 상태** 로 만들며, 다른 트랜잭션이 해당 데이터에 접근할 수 없도록 합니다. 다른 트랜잭션은 해당 데이터에 대한 작업이 완료될 때까지 대기해야 합니다.
  
- **`transaction.atomic()`** : 이 컨텍스트 매니저는 트랜잭션의 **원자성** 을 보장합니다. 모든 작업이 완료된 후에 **커밋** 이 이루어지며, 만약 도중에 오류가 발생하면 모든 작업을 **롤백** 합니다. 따라서 위 예시에서 `save()`를 여러 번 수행하는 상황에서, 중간에 오류가 발생하면 **첫 번째 작업** 은 롤백되고, 두 번째 작업은 진행되지 않습니다.

`select_for_update`는 반드시 `transaction.atomic()` 블록 안에서 사용해야 합니다. 이 둘이 함께 사용되지 않으면 select_for_update 가 적용되지 않습니다.

### 비관적 락의 장단점

#### 장점:
- **강력한 데이터 정합성 보장** : 락을 사용하여 데이터가 동시에 수정되지 않도록 보장합니다.
  
#### 단점:
- **성능 저하** : 락을 걸어둔 상태에서 다른 트랜잭션이 대기해야 하기 때문에, 성능이 저하될 수 있습니다.
- **교착 상태(Deadlock)** : 여러 트랜잭션이 상호 의존적인 락을 걸 경우, 교착 상태가 발생할 수 있습니다. 이럴 때는 적절한 락 해제 및 관리가 필요합니다.
