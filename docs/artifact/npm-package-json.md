---
title: 读懂 package.json
order: 0
nav:
  title: 制品发布
  order: 1
group:
  title: 发布 npm
  order: 0
---

# 读懂 package.json

我们对 `package.json` 这个文件并不陌生。

使用 `yarn init` 或 `npm init` 来初始化项目时，通过交互式命令填写完必要信息后，便可以创建出一个 `package.json` 文件。
所有的前端项目也都离不开它，因为它记录了一个和项目的**依赖项**、**入口**和**命令**这三项最重要的信息。

## 举个例子

这里放出 `antd@4.6.1` 的 `package.json` 文件内容片段（非完整内容，经过修整和删减）：

```json
{
  "name": "antd",
  "version": "4.6.1",
  "description": "An enterprise-class UI design language and React components implementation",
  "title": "Ant Design",
  "keywords": ["ant"],
  "homepage": "https://ant.design/",
  "bugs": {
    "url": "https://github.com/ant-design/ant-design/issues"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ant-design/ant-design"
  },
  "license": "MIT",
  "contributors": ["ant"],
  "funding": {
    "type": "opencollective",
    "url": "https://opencollective.com/ant-design"
  },
  "files": ["dist", "lib", "es"],
  "sideEffects": ["dist/*", "es/**/style/*", "lib/**/style/*", "*.less"],
  "main": "lib/index.js",
  "module": "es/index.js",
  "unpkg": "dist/antd.min.js",
  "typings": "lib/index.d.ts",
  "scripts": {
    "build": "npm run compile && NODE_OPTIONS='--max-old-space-size=4096' npm run dist",
    "deploy": "bisheng gh-pages --push-only --dotfiles",
    "dist": "antd-tools run dist",
    "lint": "npm run tsc && npm run lint:script && npm run lint:demo && npm run lint:style && npm run lint:deps && npm run lint:md",
    "start": "antd-tools run clean && cross-env NODE_ENV=development concurrently \"npm run color-less\" \"bisheng start -c ./site/bisheng.config.js\"",
    "test": "jest --config .jest.js --no-cache"
  },
  "husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged"
    }
  },
  "browserslist": ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 11"],
  "dependencies": {
    "@babel/runtime": "^7.10.4",
    "array-tree-filter": "^2.1.0",
    "classnames": "^2.2.6",
    "copy-to-clipboard": "^3.2.0",
    "lodash": "^4.17.20",
    "moment": "^2.25.3",
    "omit.js": "^2.0.2",
    "raf": "^3.4.1",
    "rc-animate": "~3.1.0"
  },
  "devDependencies": {
    "@types/classnames": "^2.2.8",
    "@types/lodash": "^4.14.139",
    "@typescript-eslint/eslint-plugin": "^3.0.0",
    "@typescript-eslint/parser": "^3.0.0",
    "cross-env": "^7.0.0",
    "eslint": "^7.3.1",
    "eslint-config-prettier": "^6.0.0",
    "husky": "^4.0.3",
    "rimraf": "^3.0.0",
    "typescript": "~4.0.0"
  },
  "peerDependencies": {
    "react": ">=16.9.0",
    "react-dom": ">=16.9.0"
  },
  "publishConfig": {
    "registry": "https://registry.npmjs.org/"
  }
}
```

大型项目的 `package.json` 往往有数十个字段，我们看到这些内容，可能会引发怀疑：

- 这些字段真的有用吗？还是说，单纯是为了标注一下？
- 如果有用，是不是要遵循一定的格式？是不是需要某些工具来读取，才能生效？

以 `antd` 的为例，其实这些字段大部分都是有用的。耐心看完本文，你对 `package.json` 的理解将更上一层楼。

## 包信息和公共信息

这部分字段标识了包的名称、版本等信息。
其中包的名称、版本号可以认为是最重要的部分之一；而还有例如简介、关键词、主页等字段则是无关紧要，主要起到 SEO 和描述作用。

这里给出一个例子：

```json
{
  "name": "my-lib",
  "private": true,
  "version": "1.2.3",

  "title": "我是项目标题，可以随便写点啥",
  "description": "我是项目描述，可以随便写点啥",
  "keywords": ["keyword1", "keyword2"],
  "homepage": "https://careerintlinc-tech-share.paperplane.cc/",
  "bugs": {
    "url": "https://git.paperplane.cc/jia-niang/careerintlinc-tech-share/issues"
  },
  "repository": {
    "type": "git",
    "url": "https://git.paperplane.cc/jia-niang/careerintlinc-tech-share"
  },
  "license": "MIT",
  "contributors": ["Frank Pu <1@paperplane.cc> (https://paperplane.cc/)"]
}
```

**最重要的字段：**

`name` 字段，表示包的名称。如果项目需要作为 npm 包来发布，这个名字需要好好考虑避免重名或者歧义，重名的包是无法发布的；如果是普通的公司项目、内部项目，则名称可以随意取，只要能区分项目即可。

:::warning
虽然包名允许下划线 `_` 、英文句点 `.` 和大写字母，但是强烈不推荐使用这些符号，如果要分词请尽量只使用横杠 `-`。
:::

`private` 字段，表示包是否为私有。如果项目不需作为 npm 库发布，直接设为 `true` 即可。

`version` 字段，表示包的版本号，一般来说版本号可以分为三段：`major`.`mirror`.`patch`，可以这么理解：主要版本.次要版本.补丁版本。还可以在版本号后面接标签，例如 `1.2.3-alpha`。如果是公司项目或者前端项目，不需要作为 npm 库发布，那么这个字段不需要改动。
一般来说 `patch` 版本号的变更应只包含 bugfix；而 `mirror` 版本号的变更可以包含功能的增加，但需做到向前兼容；而 `major` 版本号的变更可以包含破坏性的改动，可以不兼容以前的版本。
一般来说，如果一个库认为自己未完成开发，功能暂不稳定，那么 `major` 版本号应该为 `0`。例如 `react` 的版本号，在过去的七年里，一直处于 “未完成” 的状态，最后一个版本号是 `0.14.8`，然后开发人员终于认为这个项目 “完成” 了，正式版第一个版本号就直接是 `15.0.0` 了。

另外如果你对项目里的版本号的对比、判断等操作有需求，可以试试 [semver](https://www.npmjs.com/package/semver) 这个库。

**公共信息类字段：**

`contributors`（数组） 或者是 `author` 字段，用于提供包的作者或维护者信息，如果有多个人用前者，作者只有一个则用后者，可以把人名、邮箱、主页等信息放在里面，方便包的使用者后续联系。

`title`、`description`、`keywords`（数组） 字段，用于标识一个 npm 包的功能和描述，这样更有利于 SEO，方便别人在 npm 上搜索到这个包。如果项目是公司项目或不准备发布包，那么可以留空。展现方式见下图：

![](../images/image-20230420170720899.png)

`bugs`、`repository`、`homepage`、`license` 字段，分别表示了**项目 bug 提交地址**、**项目代码仓库地址**、**项目主页地址**和**项目开原许可**。如果项目要作为 npm 包发布，那么可以一同给出这些地址，npm 可能会从这些地址自动读取一些信息，并展示在包的主页上。公司项目或不作为包发布的项目，则不需要提供这些字段。

:::info
请注意，如果是 `create-react-app` 创建的项目，可以将 `homepage` 设置为项目部署后的站点，`create-react-app` 会自动读取这个字段网址中的子路径来作为网站的子路径（subpath），并注入到 `process.env.PUBLIC_URL` 这个环境变量里。例如，设置了 `homepage: "https://paperplane.cc/app"`，那么 `process.env.PUBLIC_URL` 的值便等于 `/app`。
:::

展现方式见下图：

![](../images/image-20230420171102227.png)

## 项目入口

通常来说，只有 npm 库需要入口，提供入口后别人才可以直接 `import your_lib from "你的包名"`；
曾经，包的入口只需要一个 `main` 字段即可。经过前端工具多年的进化，现在的包通常会提供多个入口。

以 `antd` 举例：

```json
{
  "main": "lib/index.js",
  "module": "es/index.js",
  "jsnext:main": "es/index.js",
  "unpkg": "dist/antd.min.js",
  "typings": "lib/index.d.ts",
  "sideEffects": ["dist/*", "es/**/style/*", "lib/**/style/*", "*.less"]
}
```

`main` 字段，使用 CommonJS 方式加载包时入口文件的相对路径。

`module` 字段，使用 Module 方式加载包时入口文件的相对路径。使用这种方式加载的包支持 [Treeshaking](https://webpack.docschina.org/guides/tree-shaking/)。

`jsnext:main` 字段，曾经的 Module 方式加载包时入口文件的相对路径，现已被 `module` 字段取代；如果你的包需要兼容老项目，建议还是保留此字段。使用这种方式加载的包支持 [Treeshaking](https://webpack.docschina.org/guides/tree-shaking/)。

`typings` 字段，如果这个包自身带有 Typescript 类型定义，此字段为类型定义的 .d.ts 入口文件。

`unpkg` 字段，使用 UMD 方式加载包时入口文件的相对路径。如果提供此字段，在 npm 包完成发布后，便可以通过 `https://unpkg.com/包名` 来直接访问你的包，例如在网页中写 `<script src="https://unpkg.com/lodash"></script>` 便可以直接引入 `lodash`。项目如果想支持 `unpkg` 方式访问，必须在目录中准备一份 UMD 模块的代码，因为现在很少有人会用 `type="module"` 的方式来引入库。

`type` 字段，这个字段通常是给 Node.js 项目使用的，取值为 `"commonjs"` （默认）或 `"module"`，它表示 .js 后缀文件的格式是是 CommonJS 还是 ES Module，注意 .mjs 后缀的文件始终会视为是 ES Module 格式，.cjs 后缀的文件始终会视为 CommonJS 格式。Node.js 现在默认是 CommonJS 模式，因此写 `import xx from "xx"` 会直接报错，把这个值改为 `"module"` 便不会报错了。

`sideEffects`（数组） 字段，只对 Webpack 之类的打包工具有用，此字段用于指定有副作用的文件，这样在 TreeShaking 时就不会把这些带有副作用的文件给删掉了。
这个字段的值可以为 `true` （也是默认的情况） 表示所有文件都有副作用；设置为 `false` 表示所有文件都无副作用；或者是一个数组，数组中列出了有副作用的文件列表，支持 glob 通配符。对于这些带有副作用的文件，TreeShaking 时不会从它们中删去任何代码。
因为样式文件没有任何导出，会被 TreeShaking 当做没有用到的模块而删掉，所以我们可以看到 `antd` 把所有的样式文件都配置在了此字段里，这样可以避免 TreeShaking 删去任何 `import 'antd/lib/button/index.less'` 类的语句。而 `create-react-app` 创建的项目，其 Webpack 配置已经帮我们做了一些 `sideEffects` 的配置，所以我们直接引入样式文件都能正确生效。

:::info
如果某个 polyfill 库（例如 `core-js`）的 `package.json` 的 `sideEffects` 被设置为了 `false`，会发生什么情况？

这些库通常都是在项目入口处直接引入的：

```js
import 'core-js'
```

如果这类库的 `sideEffects` 被配置为了 `false`，那么 TreeShaking 会认为这个库未被使用，直接把这些代码删掉，导致功能失效。
:::

## 项目依赖

这些字段也是我们熟悉的，每个项目都离不开这些配置，否则可能根本无法运行。
常见的依赖字段：

```json
{
  "dependencies": {
    "lodash": "^4.17.20",
    "typescript": "~4.0.0"
  },
  "devDependencies": {
    "@types/lodash": "^4.14.139",
    "eslint": "^7.3.1"
  },
  "peerDependencies": {
    "react": ">=16.9.0",
    "react-dom": ">=16.9.0"
  }
}
```

如果想安装某个依赖项，并把它加入到 `package.json` 的依赖字段 `dependencies` 中，可以通过以下方式：
`npm add lodash` 或者 `npm i -s lodash`（新版已经默认 `-s` 了），当然还有 `yarn add lodash`

注意这里的版本号，安装依赖的时候如果不指定版本号，那么默认会安装最新版；
常见的版本号有三种格式：

- 指定固定版本号，例如：`1.2.3` 或 `1.2.3-bete`，运行 `npm i` 的时候会固定安装依赖包的这个版本；
- 固定主要版本号，例如：`^1.2.3`，这种表示接受 `1.x.x` 的版本（较为宽松）；
- 固定次要版本号，例如：`~1.2.3`，这种表示接受 `1.2.x` 的版本（较为严格）。

另外，这三种字段也是有区别的：

`dependencies` 字段，项目运行必须的依赖，这是最常用的此处不再赘述。

`devDependencies` 字段，项目的 “开发依赖”，一般在开发项目的时候才需要用到的依赖项会放在这里；例如 `eslint`、`prettier` 这种，只有编写代码时才需要用到，真正运行时是不需要的，还有就是 `@types/` 这种类型定义的包，前端项目运行时代码已经被编译为 JS 了，类型定义自然也就无需使用。
通过 `npm i -D eslint` 这种添加 `-D` 后缀的方式安装的依赖会添加到这里。

`peerDependencies` 字段，这是 “对等依赖”，它的格式不同于普通依赖项的版本号，例如 `"react": ">=16.9.0"`，它的作用是这样：例如我要为 `react` 开发一个组件库，那么我不能把 `react` 作为项目的依赖，而是要认为这个组件库的使用者已经安装好了 `react`，所以需要把 `react` 作为项目的 “对等依赖” 添加到 `peerDependencies` 字段。

## 项目指令

## 给其他工具准备的字段

### 给 `husky` 的配置

### 给 `browserslist` 的配置

### 给 `eslint`、`babel` 的配置
