---
title: String 字符串
id: string
---

> 字符串相关的处理函数

### desensitizeName（姓名脱敏）

对姓名进行脱敏

```typescript
import { desensitizeName } from '@kqfe/utils';

desensitizeName('张三');

//`张三`=> `张*`
```

```typescript run
console.log(desensitizeName('测试'));
```

### desensitizePhone（手机号脱敏）

对手机号进行脱敏

```typescript
import { desensitizePhone } from '@kqfe/utils';

desensitizeName('13800138000');

//`13800138000` => `138****8000`
```

```typescript run
console.log(desensitizePhone('13800138000'));
```

### desensitizeIdNum（身份证号脱敏）

对身份证号进行脱敏

```typescript
import { desensitizeIdNum } from '@kqfe/utils';

desensitizeName('110101199007123811');

//110101199007123811 => 1101**********3811
```

```typescript run
console.log(desensitizeIdNum('110101199007123811'));
```
