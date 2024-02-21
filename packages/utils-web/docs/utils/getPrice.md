---
title: getPrice 校验
id: getPrice
---

> 分转成元函数

### getPrice

```typescript
import { getPrice } from '@kqfe/utils';

getPrice(1000);
// 10.00
```

```typescript run
//默认保留两位小数点
console.log(getPrice(1011));// 10.11

//第二个参数控制保留的小数位数
console.log(getPrice(1011,0));// 10

//第三个参数支持每3位数添加一个,符号
console.log(getPrice(101111,2,true));// 1,011.11

```
