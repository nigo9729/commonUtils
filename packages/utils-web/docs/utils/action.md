---
title: Action 操作相关
id: action
---

> 提供一些操作相关的工具函数

### copy

复制功能。

支持浏览器，微信小程序，支付宝小程序

```typescript
import { copy } from '@kqfe/utils';

copy('321')
  .then(() => {
    console.log('复制成功');
  })
  .catch(() => {
    console.log('复制失败');
  });
```

```typescript run
copy('321')
  .then(() => {
    console.log('复制成功');
  })
  .catch(() => {
    console.log('复制失败');
  });
```
