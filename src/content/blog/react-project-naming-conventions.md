---
title: '几种 React 文件名和目录规范最佳实践'
description: 'React 在使用时非常灵活，如果没有一个规范约束项目，在开发过程中会非常混乱，本文将介绍几个优秀的规范。'
date: '2022-5-10'
language: 'zh-cn'
tags: ['code', 'react', 'naming', 'convention']
---

## 2023-2-7 更

此文内容已过时，目前更推荐参考：<https://github.com/alan2207/bulletproof-react>

---

> <https://juejin.cn/post/7095980489160261639>

React 在使用时非常灵活，如果没有一个规范约束项目，在开发过程中会非常混乱，本文将介绍几个优秀的规范。

## 文件类型

介绍文件名和目录前，需要先简述一下几种通用的类型，用来区分文件的功能。

- **component** 组件文件
- **page** 如果有路由(React Router、NextJS 等)，则有页面文件
- **util** 需要复用的工具函数
- **helper** 一段特定逻辑，不是通用工具，可复用也可仅作为代码拆分片段
- **hook** 自定义 React Hook
- **constant** 定义常量，大写+下划线命名 `CONSTANT_VALUE`

## 处理 index 文件

在做组件或者页面的时候，你可能会划分组件，并把主组件用`index.tsx`导出。这样做的时候有一个好处就是可以按照文件夹名引入，从结构上看是很清晰的。

但是事实上，在编辑器中会有多个`index.tsx`文件，开发时需要看文件所在的文件夹，非常难受。

我的解决方案是，你的主组件应该和原来一样导出，`index.ts` 文件二次导出主组件。

你的 `index.ts` 应该这样写：

```ts
export * from './MainComponent';
export { default } from './MainComponent';
```

虽然把一个文件变成了两个文件，但是有效地减少了开发时的心智负担。

> 接下来规范中所有的 `index.ts` 都是这个作用

## 规范

### 类型文件夹

这应该是一个比较官方的规范，很多项目都在使用。

此处使用**大驼峰**命名组件（component）和页面（page），其他文件通常用**小驼峰**

如果你有路由，那么此时 component 中的组件应为通用组件。

```
src/
├── components/
│   ├── MyHeader.tsx
│   └── MyFooter.tsx
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   └── Widget/
│       ├── components/
│       │   ├── Tool.tsx
│       │   └── Option.tsx
│       ├── helpers/
│       │   └── setOptionStorage.ts
│       ├── Widget.tsx
│       └── index.ts
├── hooks/
│   └── useTheme.ts
├── utils/
│   └── getRamdomNumber.ts
└── constants.ts
```

这个规范在小项目中尚可实行。但是如果相对复杂的项目，由于文件夹层数多，会导致引入混乱。接下来会推荐特性分类的规范。

示例项目：[Ant Design Pro](https://github.com/ant-design/ant-design-pro)

### 特性文件夹

特性文件夹分类很好地解决了层数过多的问题，增加平铺的可能。并更直观地展示了代码逻辑，方便维护。

#### 大驼峰命名

这种命名规范中，除了组件和页面以外，所有的文件都需要添加类型后缀。  
并且在一个特性中，可以将类型相同的函数放在一个文件内。  
例如 `Widget.helper.ts` `Widget.util.ts`

如果是通用的或复用的代码，都建议放到 `common` 文件夹统一管理，其余特性文件夹均大写。

非组件或页面的独立的文件，请使用烧烤串命名（中划线分割）

同一个特性的组件可以不另设 `components` 文件夹

```
src/
├── common/
│   ├── components/
│   │   ├── MyHeader.tsx
│   │   └── MyFooter.tsx
│   ├── utils/
│   │   └── get-random-number.util.ts
│   ├── hooks/
│   │   └── use-theme.hook.ts
│   └── constants.ts
├── Home/
│   └── Home.tsx
├── Widget/
│   ├── Tool.tsx
│   ├── Option.tsx
│   ├── Widget.helpers.ts
│   ├── Widget.utils.ts
│   ├── Widget.constants.ts
│   ├── Widget.tsx
│   └── index.ts
└── About/
    └── About.tsx
```

参考文章：[Delightful React File/Directory Structure](https://www.joshwcomeau.com/react/file-structure/)

#### 烧烤串命名

这个实际上是参考了 Angular 规范，如果你对上面这个规范的大小写命名强迫症，不妨试试这个更严苛的规范。

- 所有文件名、文件夹名都小写，使用烧烤串命名（中划线分割）。
- 所有的文件都需要添加类型后缀。
- 只有主要的页面组件可以放在特性文件夹底层，其余文件都需要在特性文件夹中再设置类型文件夹。
- 每个函数都应该是一个文件，不要把相同功能的函数放在一个文件内。
- 移除 `index.ts` 导出，因为文件名变长且有类型后缀，引入方便判断类型

```
src/
├── common/
│   ├── components/
│   │   ├── my-header.component.tsx
│   │   └── my-footer.component.tsx
│   ├── utils/
│   │   └── get-random-number.util.ts
│   ├── hooks/
│   │   └── use-theme.hook.ts
│   └── constants.ts
├── home/
│   └── home.page.tsx
├── widget/
│   ├── components/
│   │   ├── tool.component.tsx
│   │   └── option.component.tsx
│   ├── helpers/
│   │   └── set-option-storage.helper.ts
│   └── widget.page.tsx
└── about/
    └── about.page.tsx
```

示例项目：[飞鸽传书教师端](https://github.com/MessagePigeon/client-teacher)  
~~其实是笔者自己的项目，因为这个规范还没有人在 React 中用~~
