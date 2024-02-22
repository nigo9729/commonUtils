---
title: Url 路径
id: url
---

> 提供一些 url 相关的工具函数

### getQueryParams

获取路径 query 参数。

支持浏览器，微信小程序，支付宝小程序。

```typescript
import { getQueryParams } from '@kqfe/utils';

getQueryParams();
```

```typescript run
console.log(getQueryParams());
```
