---
title: String 字符串
id: string
---

> 字符串相关的处理函数

### desensitizeName（姓名脱敏）

对明细进行加密

```typescript
import { desensitizeName } from '@kqfe/utils';

desensitizeName('张三');

//`张三`=> `张*`
```

```typescript run
console.log(desensitizeName('测试'));
```

### desensitizePhone（手机号脱敏）

对明细进行加密

```typescript
import { desensitizePhone } from '@kqfe/utils';

desensitizeName('13800138000');

//`13800138000` => `138****8000`
```

```typescript run
console.log(desensitizePhone('13800138000'));
```
