---
title: '使用 React Hook Dialog 管理对话框弹窗组件'
description: '最近做了一个开源库：React Hook Dialog 这个库能够解决 React 中对话框组件的复用问题，用类型安全的方式复用对话框组件，很有效地提高开发效率'
date: '2022-7-22 09:26'
language: 'zh-cn'
tags: ['code', 'react', 'dialog', 'modal']
---

> <https://juejin.cn/post/7123002035439403045>

## 介绍

最近做了一个开源库：React Hook Dialog (求 Star 🌟🌟🌟)

GitHub: <https://github.com/jsun969/react-hook-dialog>

这个库能够解决 React 中对话框组件的复用问题，用类型安全的方式复用对话框组件，很有效地提高开发效率

## 安装

```bash
npm install react-hook-dialog
```

## 使用

使用非常方便，并且只要声明一次对话框组件，就可以在各种地方复用

以下这个例子用 Ant Design 作为 UI 库，完整的例子在：  
<https://codesandbox.io/s/rhd-antd-example-qhj7zy>

首先创建一个文件，用来定义这个对话框的默认属性

`lib/dialog.ts`

```ts
import { createDialogs, createDialogHooks } from 'react-hook-dialog';

type CustomDialogProps = {
  title: string;
  content: string;
  onOk: () => void;
  onCancel: () => void;
};

// 初始化对话框组件
// 如果有多个对话框组件，为了类型安全，可以传入两个泛型
// 1.对话框组件属性的联合类型(props)
// 2.对话框组件名的联合类型(name)
export const dialogs = createDialogs<CustomDialogProps, 'customDialog'>({
  customDialog: {
    title: '',
    content: '',
    onOk: () => {
      console.log('ok');
    },
    onCancel: () => {
      console.log('cancel');
    },
  },
});

// 创建类型安全的Hook
export const dialog = createDialogHooks(dialogs);
```

接下来，在对话框组件中，`useDialogController` 接管组件所有属性

```tsx
import { Modal } from 'antd';

import { dialog } from '../lib/dialog';

const CustomDialog: React.FC = () => {
  const { isOpen, handleClose, props } =
    dialog.useDialogController('customDialog');

  return (
    <Modal
      visible={isOpen}
      onOk={() => {
        props.onOk();
        handleClose();
      }}
      onCancel={() => {
        props.onCancel();
        handleClose();
      }}
    >
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </Modal>
  );
};

export default CustomDialog;
```

在入口文件中，使用`DialogProvider`将对话框应用全局

```tsx
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { DialogProvider } from 'react-hook-dialog';

import App from './App';
import CustomDialog from './components/CustomDialog';
import { dialogs } from './lib/dialog';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DialogProvider dialogs={dialogs}>
      <App />
      <CustomDialog />
    </DialogProvider>
  </React.StrictMode>,
);
```

完成！你现在可以用类型安全的方式在各种地方调用对话框组件了

`App.tsx`

```tsx
import { Button, Space } from 'antd';

import { dialog } from './lib/dialog';

const App: React.FC = () => {
  const { open, close, isOpen } = dialog.useDialog('customDialog', {
    title: '标题',
    content: '内容',
  });

  return (
    <>
      <div>Dialog Status: {isOpen ? 'open' : 'closed'}</div>
      <Space>
        <Button type="primary" onClick={() => open()}>
          打开对话框
        </Button>
        <Button type="primary" onClick={() => close()}>
          关闭对话框
        </Button>
        <Button onClick={() => open({ title: '另一个标题' })}>
          打开另一个对话框
          {/* 此时对话框标题会改为“另一个标题” */}
        </Button>
      </Space>
    </>
  );
};

export default App;
```

## 更多

更多使用文档，请见 GitHub Readme

API 文档：<https://github.com/jsun969/react-hook-dialog#-api>

求 Star 🌟🌟🌟
