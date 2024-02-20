---
title: format 格式化
id: format
---

> 提供诊断信息在数组与字符串格式之间转换的函数。

### formatDiagnosis

将诊断信息的数组格式化为一个字符串，便于存储或传输。

#### 参数

- `diagnosis`: `DiagnosisObj[]` | 可选 | 诊断信息数组，每个对象包含 `name`（诊断名称）和 `code`（诊断代码）。

#### 返回值

- `string`: 格式化后的诊断信息字符串，格式为：`无|诊断名称|无|诊断代码`，不同诊断之间用分号(`;`)分隔。

```typescript
import { formatDiagnosis } from '@kqfe/utils';

formatDiagnosis([
  { name: '感冒', code: 'J02.900' },
  { name: '发烧', code: 'A01.000' },
]);

// "无|感冒|无|J02.900;无|发烧|无|A01.000"
```

```typescript run
console.log(
  formatDiagnosis([
    { name: '感冒', code: 'J02.900' },
    { name: '发烧', code: 'A01.000' },
  ]),
);
// 输出："无|感冒|无|J02.900;无|发烧|无|A01.000"
```

### parseDiagnosis

将格式化的诊断信息字符串解析为诊断信息数组。

#### 参数

- `diagnosis`: `string` | 必需 | 格式化的诊断信息字符串。

#### 返回值

- `DiagnosisObj[]`: 解析后的诊断信息数组，每个对象包含 `name`（诊断名称）和 `code`（诊断代码）。

```typescript
import { parseDiagnosis } from '@kqfe/utils';

parseDiagnosis('无|感冒|无|J02.900;无|发烧|无|A01.000');

// [ { name: '感冒', code: 'J02.900' }, { name: '发烧', code: 'A01.000' } ]
```

```typescript run
console.log(parseDiagnosis('无|感冒|无|J02.900;无|发烧|无|A01.000'));
// 输出：[ { name: '感冒', code: 'J02.900' }, { name: '发烧', code: 'A01.000' } ]
```
