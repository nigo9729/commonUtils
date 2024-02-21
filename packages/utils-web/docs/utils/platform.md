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

### parseBrowser

判断当前运行浏览器

```typescript
import { parseBrowser } from '@kqfe/utils';

parseBrowser();

// ali  wechat ios ....

```

```typescript run
console.log(parseBrowser());
```

### setWechatWebFontSize

禁止微信浏览器调整字体

```typescript
import { setWechatWebFontSize } from '@kqfe/utils';

setWechatWebFontSize();



```
