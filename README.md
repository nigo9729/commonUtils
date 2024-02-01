## 凯桥前端通用基础库

为了统一管理业务开发过程中的基础工具方法，减少重复开发与复制粘贴，我们将这些方法统一收口到这个仓库中进行统一管理和发布。

整个基础库使用`pnpm`提供的`monorepo`技术进行组织，主要包括：

- `packages/utils`：通用的工具库仓库，发布到`npm`上复用
- `packages/utils-web`：文档演示库，用于展示`utils`库的使用方法

### 快速开始

开发要求： `node版本`必须高于`18`， 使用`pnpm`作为包管理工具。

技术栈：

- [tsup](https://tsup.egoist.dev/)：基于`esbuild`的打包工具，轻量小巧
- [docusaurus](https://docusaurus.io/)：基于`react`和`mdx`技术的文档网站生成工具
- [turbo](https://turbo.build/repo/docs)：任务执行器，用于并行执行多个任务
- [jest](https://jestjs.io/)：测试框架

安装依赖：

```bash
pnpm install
```
