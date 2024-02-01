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

#### 安装依赖：

```bash
pnpm install
```

#### 开发

如果需要同时调试工具库和文档演示库，执行这个命令进行调试：

```bash
pnpm run docs:start
```

如果只需要调试工具库或者文档演示库，建议到子仓库分别执行对应的命令。

比如，如果只想调试工具库，执行：

```bash
# 跳转到工具库目录
cd packages/utils
# 执行工具库中的工具命令
pnpm run start
```

### 开发流程

增加任何一个基础的工具库方法，需要执行这几个流程：

1. 执行`pnpm run docs:start`启动项目
2. 在`utils/src`中找到对应的文件，增加对应的方法
3. 在`utils/src/__tests__`中找到对应的文件，增加对应的测试用例
4. 在`utils-web/docs/utils`中找到对应的`mdx`文件，增加对应的文档说明

### 开发规范

在新开发一个方式时，必须遵守以下规范：

- 所有的工具库方法都需要有对应的测试用例
- 所有的工具库方法都需要有对应的文档说明
- 工具库方式必须使用`/** */`的注释方式，而不是`//`的注释方式
