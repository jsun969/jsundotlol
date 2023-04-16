---
title: '如何在 Ant Design 中使用 React Hook Form?'
description: '可能是 React Hook Form 和 Ant Design 的最佳实践'
date: '2023-4-16'
language: 'zh-cn'
tags: ['code', 'react-hook-form', 'antd', 'oss', 'tutorial']
---

## 前言

先解释一下标题。 Ant Design 大家应该非常熟悉了，但是 React Hook Form 可能在国内并没有那么火。尽管 Ant Design 拥有自己的 `Form` 组件，不过 React Hook Form 也有其优势：

1. 强性能，减少渲染次数
2. 轻量无依赖
3. 类型安全
4. 支持多种验证库校验（如 Zod、Yup、Class Validator、Ajv 等等）
5. 支持多种 UI 库

GitHub（3w+⭐）：<https://github.com/react-hook-form/react-hook-form>  
官网：<https://react-hook-form.com>

从功能上来说，其比 Ant Design 的 `Form.useForm` 要强大不少。但是 Ant Design 目前并没有官方支持 React Hook Form。

## 解决

为了解决在 Ant Design 中使用 React Hook Form。我为此写了一个开源库来包装 Ant Design 的 `Form.Item`

GitHub: <https://github.com/jsun969/react-hook-form-antd>

## 示例

[CodeSandbox 示例](https://codesandbox.io/s/react-hook-form-antd-example-6s0i3z?file=/src/App.tsx)

其中使用了 Zod 进行表单校验

## 使用

### 原表单

首先，你可能原来有这样一个表单

```tsx
<Form onFinish={onFinish}>
  <Form.Item
    label="Username"
    name="username"
    rules={[
      { required: true, message: 'Required' },
      { max: 15, message: 'Username should be less than 15 characters' },
    ]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    label="Password"
    name="password"
    rules={[{ required: true, message: 'Required' }]}
  >
    <Input.Password />
  </Form.Item>
  <Form.Item name="remember" valuePropName="checked">
    <Checkbox>Remember me</Checkbox>
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form.Item>
</Form>
```

### 使用 React Hook Form

使用 React Hook Form 的 `useForm` 并获取 `control`

```ts
const { control } = useForm({
  defaultValues: { username: 'jsun969', password: '', remember: true },
});
```

### 替换 `Form.Item`

从 `react-hook-form-antd` 中使用 `FormItem` 代替 `Form.Item`，将 `control` 传递给每个 `FormItem`

这样一来，每个 `FormItem` 都受到 React Hook Form 的控制，并且 `name` （即表单字段名）可以从 `control` 中推断

```tsx
import { FormItem } from 'react-hook-form-antd';

// ...
<Form onFinish={onFinish}>
  <FormItem control={control} label="Username" name="username">
    <Input />
  </FormItem>
  <FormItem control={control} label="Password" name="password">
    <Input.Password />
  </FormItem>
  <FormItem control={control} name="remember" valuePropName="checked">
    <Checkbox>Remember me</Checkbox>
  </FormItem>
  <Form.Item>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form.Item>
</Form>;
```

用表单验证库（本文中使用 Zod，其他验证库使用方法见 [React Hook Form Resolver](https://github.com/react-hook-form/resolvers)）
代替原先的 `rules`

```ts
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// ...

const schema = z.object({
  username: z
    .string()
    .min(1, { message: 'Required' })
    .max(15, { message: 'Username should be less than 15 characters' }),
  password: z.string().min(1, { message: 'Required' }),
  remember: z.boolean(),
});

const App = () => {
  const { control } = useForm({
    defaultValues: { username: 'jsun969', password: '', remember: true },
    resolver: zodResolver(schema),
  });
  // ...
};
```

在 `onFinish` 中使用 React Hook Form 的 `handleSubmit`

```tsx
const { control, handleSubmit } = useForm(...);

return (
    <Form
      style={{ maxWidth: 600 }}
      onFinish={handleSubmit((data) => {
        ...
      })}
    >
    // ...
    </Form>
);
```

## 搞定

如此一来，即可在 Ant Design 中很方便地使用 React Hook Form。  
以上使用教程的结果即为 [CodeSandbox 示例](https://codesandbox.io/s/react-hook-form-antd-example-6s0i3z?file=/src/App.tsx)
