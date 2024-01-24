---
title: String 字符串
id: string
---

> 字符串相关的处理函数

### encName（姓名脱敏）

对明细进行加密

```typescript
import { encName } from '@kq/utils';

encName('张三');

//`张三`=> `张*`
```

```typescript run
console.log(encName('测试'));
```
