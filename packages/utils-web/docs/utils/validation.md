---
title: Validation 校验
id: validation
---

> 校验相关的处理函数

### isValidateIdNum

校验身份证号是否合法

```typescript
import { isValidIdNum } from '@kqfe/utils';

isValidIdNum('110101199007126115');

// true
```

```typescript run
console.log(isValidIdNum('110101199007126115'));
// true

console.log(isValidIdNum('11010119900712611'));
// false
```
