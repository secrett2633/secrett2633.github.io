---
title: "[Django] prefetch_related"
excerpt: "Django에서 prefetch_related의 사용법을 공유합니다."

categories:
  - Django
tags:
  - [Django]

permalink: /backend/django/prefetch_related/

toc: true
toc_sticky: true

date: 2025-02-14 06:03:11+0900
last_modified_at: 2025-02-14 06:03:11+0900
published: true
---

## prefetch_related

다음과 같은 모델이 있을때 이 모델에 접근하기 위해 조회를 하면 다음과 같은 쿼리가 나간다.

```python
class Category(models.Model):
    name = models.CharField(max_length=32)
    parent = models.ForeignKey("self", on_delete=models.SET_NULL, null=True, related_name="children")
```
![django-prefetch-related-1](/assets/images/posts_img/backend/django/django-prefetch-related-1.png)

이때 조회한 category 의 name 을 조회할때는 따로 추가적인 쿼리가 나가지 않는다.
하지만 category 의 parent 를 조회할때는 다음과 같이 추가적인 쿼리가 나가는데 이를 방지하기 위해 미리 조회해두는 것이 prefetch_related 이다.

![django-prefetch-related-2](/assets/images/posts_img/backend/django/django-prefetch-related-2.png)

처음 조회할때만 parent 에 대해서 추가적으로 조회하고 이후에는 추가적인 쿼리가 발생하지 않는것을 확인할 수 있다.
