---
title: '使用 i18next 在 React 中优雅地国际化'
description: 'i18next 是一个非常优秀的国际化库，能够与多种框架进行耦合使用。本文将介绍其在 React 业务中的使用。'
date: '2022-5-13'
language: 'zh-cn'
tags: ['code', 'react', 'i18next', 'internationalization']
---

> <https://juejin.cn/post/7097090281136357407>

i18next 是一个非常优秀的国际化库，能够与多种框架进行耦合使用。本文将介绍其在 React 业务中的使用。

## 安装

有三个包需要安装

```bash
npm i i18next react-i18next i18next-browser-languagedetector
```

- **i18next** 用来解析 i18n 文件，做一些初始化操作
- **react-i18next** 在 React 中用 hook 调用 i18next
- **i18next-browser-languagedetector** 能够检测浏览器的语言

## 初始化

先创建 `locales` 文件夹，文件夹中创建 `en.json` 和 `zh.json` 分别对应英语和中文。

在项目目录创建 `i18n.ts`

```ts
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import zh from './locales/zh.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    fallbackLng: 'en',
    preload: ['en', 'zh'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

在 `main.tsx` 中直接引入即可使用

```ts
import './i18n';
```

## 使用

建议这样写国际化文件（其他语言同理）

```json
"login": {
    "username": "用户名",
    "password":"密码",
    "title": "登录"
}
```

在 React 组件中，你可以这样调用

```ts
import { useTranslation } from 'react-i18next';

const SomeComponent: React.FC = () => {
  const { t } = useTranslation();
  return <div>{t('login.username')}</div>;
};
```

当然你一定需要一个切换语言的按钮，你可以这样获取语言并切换

```ts
const { i18n } = useTranslation();
// 获取当前语言
i18n.language;
// 切换语言
i18n.changeLanguage('zh');
```

## i18n ally 插件

这是一款很好用的 VSCode 国际化插件。这是官方动画演示图

![annotation animated](/blog/use-i18next-in-react/annotation-animated.gif)

你同样可以将其用在 React 中，它能够解析你的语言 json 并提供自动补全

![autocomplete](/blog/use-i18next-in-react/autocomplete.png)

## 参考

- [i18next react 文档](https://react.i18next.com/)
- [i18next/i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector)
- [lokalise/i18n-ally: 🌍 All in one i18n extension for VS Code](https://github.com/lokalise/i18n-ally)
