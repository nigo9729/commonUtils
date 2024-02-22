---
title: Action 操作相关
id: action
---

> 提供一些操作相关的工具函数

### copyToClipboad

复制功能。

支持浏览器，微信小程序，支付宝小程序

```typescript
import { copyToClipboad } from '@kqfe/utils';

copyToClipboad('321').then((res) => {
  res ? console.log('复制成功') : console.log('复制失败');
});
```

```typescript run
copyToClipboad('321').then((res) => {
  res ? console.log('复制成功') : console.log('复制失败');
});
```
