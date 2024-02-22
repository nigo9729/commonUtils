---
title: String 字符串
id: string
---

> 字符串相关的处理函数

### desensitizeName

对姓名进行脱敏

```typescript
import { desensitizeName } from '@kqfe/utils';

desensitizeName('张三');

//`张三`=> `张*`
```

```typescript run
console.log(desensitizeName('测试'));
```

### desensitizePhone

对手机号进行脱敏

```typescript
import { desensitizePhone } from '@kqfe/utils';

desensitizeName('13800138000');

//`13800138000` => `138****8000`
```

```typescript run
console.log(desensitizePhone('13800138000'));
```

### desensitizeIdNum

对身份证号进行脱敏

```typescript
import { desensitizeIdNum } from '@kqfe/utils';

desensitizeName('110101199007123811');

//110101199007123811 => 1101**********3811
```

```typescript run
console.log(desensitizeIdNum('110101199007123811'));
```

### translateGender

对输入的性别标识进行转换

```typescript
import { translateGender } from '@kqfe/utils';

translateGender('M');

//m | M | 1 | 男 => 男
```

```typescript run
console.log(translateGender('M'));
```

### parseJSON

对输入的性别标识进行转换

```typescript
import { parseJSON } from '@kqfe/utils';

parseJSON('{"name":"John", "age":30, "city":"New York"}');
```

```typescript run
console.log(parseJSON('{"name":"John", "age":30, "city":"New York"}'));
```

### parseQueryStr

解析字符串(其格式类似于 url 的 query 参数形式)

```typescript
import { parseQueryStr } from '@kqfe/utils';

parseQueryStr();
// {}

parseQueryStr('http://www.baidu.com?key1=value1&key2=value2');
// {key1: 'value1', key2: 'value2'}
```

```typescript run
parseQueryStr();
// {}

parseQueryStr('http://www.baidu.com?key1=value1&key2=value2');
// {key1: 'value1', key2: 'value2'}
```
