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

### isValidBankCardNumber（校验银行卡号）

校验银行卡号：不能 0 开头，位数满足 16 ~ 19 位

```typescript
import { isValidBankCardNumber } from '@kqfe/utils';

isValidBankCardNumber('5473895749332232');

// true
```

```typescript run
console.log(isValidBankCardNumber('5473895749332232'));
// true

console.log(isValidBankCardNumber('0473895749332232'));
// false
```