---
title: platform 环境
id: platform
---

> 与环境相关的一些工具

### getRunningEnvironment

判断当前运行环境

```typescript
import { getRunningEnvironment } from '@kqfe/utils';

getRunningEnvironment();

// ali aliH5 wechat wechatH5 ....

```

```typescript run
console.log(getRunningEnvironment());
```