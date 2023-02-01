---
title: 'Vue+Node.js 写一个 TodoList'
date: '2021-02-14'
tags:
  [
    'website',
    'code',
    'javascript',
    'node.js',
    'todolist',
    'vue',
    'web',
    'fullstack',
  ]
language: 'zh-cn'
description: 'from 螓首蛾眉'
---

初学，这篇文章不想写太长，代码写的也很菜，纯属想记录一下这个寒假的成果

GitHub: <https://github.com/jsun969/real-todolist>

## 效果图

### 添加

![](/blog/vue-node-js-xie-yi-ge-todolist/添加.gif)

### 完成

![](/blog/vue-node-js-xie-yi-ge-todolist/完成.gif)

### 编辑

![](/blog/vue-node-js-xie-yi-ge-todolist/编辑.gif)

### 删除

![](/blog/vue-node-js-xie-yi-ge-todolist/删除.gif)

## 坑

### UI 框架 CSS 先找 Class

特地请教了阿阳大大

![](/blog/vue-node-js-xie-yi-ge-todolist/image-1.png)

**前端代码**

```css
.card {
  margin-bottom: 10px;
  .el-card\_\_body {
    height: 80.5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .ckecked_item {
      text-decoration: line-through;
    }
    ...;
  }
}
```

### Delete 请求

Delete 请求不能像 Post 一样传 Body，应和 Get 请求类似（感谢阿阳大大和群内大佬们，这个 Bug 找了半天）

![](/blog/vue-node-js-xie-yi-ge-todolist/image.png)

**前端代码**

```js
axios
  .delete(`${URL}/todo`, { params: { id: item.id } })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

**后端代码**

```js
app.delete('/todo', async (req, res) => {
  try {
    const deleteID = { id: Number(req.query.id) };
    const result = await collection.deleteOne(deleteID);
    if (result.deletedCount === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(400);
  }
});
```

### 使用 v-for 记得给子组件传 id

如题，这个没代码，感谢 小 C 给的思路

## 结语

第一次接触 Web 项目，前后端代码都写的很菜，欢迎大佬们帮我的代码挑挑毛病，感激不尽！
