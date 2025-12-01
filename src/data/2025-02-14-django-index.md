---
title: "[Django] index"
excerpt: "Django에서 index의 사용법을 공유합니다."

categories:
  - Django
tags:
  - [Django]

permalink: /backend/django/index/

toc: true
toc_sticky: true

date: 2025-02-14 07:30:00+0900
last_modified_at: 2025-02-14 07:30:00+0900
published: true
---

## 들어가며

Django에서 **인덱스** 를 사용하는 예시를 먼저 살펴보겠습니다. 인덱스는 데이터베이스에서 검색 성능을 향상시키는 중요한 기능입니다. 특히 자주 조회하는 필드에 대해 인덱스를 설정하면, 조회 성능을 크게 개선할 수 있습니다.

### 예시 1: 기본 카테고리 모델

```python
class CategoryStatus(StrEnum):
    ACTIVE = "active"
    INACTIVE = "inactive"

class Category(models.Model):
    name = models.CharField(max_length=32)
    status = models.CharField(max_length=7, default=CategoryStatus.INACTIVE)
```

위와 같이 `Category` 모델이 있을 때, 대부분 `ACTIVE` 상태인 카테고리만 조회하는 상황이 많다면 **인덱스를 사용하는 것을 고려** 할 수 있습니다.

### 예시 2: 인덱스를 추가한 모델

Django에서 인덱스를 설정하는 방법은 다음과 같습니다.

```python
class Category(models.Model):
    name = models.CharField(max_length=32)
    status = models.CharField(max_length=7, default=CategoryStatus.INACTIVE)

    class Meta:
        indexes = [
            models.Index(fields=["status"])
        ]
```

위와 같이 `status` 필드에 대해 **인덱스를 설정** 할 수 있습니다. 이제 데이터베이스는 `status` 값을 기준으로 데이터를 정렬하여 저장하므로, **Index Scan** 방식으로 데이터를 조회하게 되어 성능이 향상됩니다.

### 인덱스 사용의 장단점

**장점:**
- 인덱스를 사용하면 조회 성능이 향상됩니다. `status` 필드를 기준으로 데이터를 빠르게 검색할 수 있습니다.

**단점:**
- 인덱스를 설정하면 데이터의 **삽입, 수정, 삭제** 시에 인덱스가 재구성되어야 하기 때문에, 성능 저하가 발생할 수 있습니다. 
- 따라서 인덱스를 설정하기 전에 **쿼리문** 을 충분히 분석하고, 인덱스가 정말 필요한지 고민해야 합니다.

### 결론

인덱스는 조회 성능을 개선하는 데 매우 유용하지만, 데이터베이스의 성능에 영향을 미칠 수 있는 만큼 신중하게 설정해야 합니다. 인덱스를 설정하기 전에 자주 실행되는 쿼리들을 분석하고, 성능을 측정하는 것이 중요합니다.
