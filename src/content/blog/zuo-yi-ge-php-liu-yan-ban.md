---
title: '做一个 PHP 留言板'
date: '2021-06-05'
tags: ['code', 'javascript', 'mdui', 'php', 'web', 'message board']
language: 'zh-cn'
description: 'from 螓首蛾眉'
---

> 测试站地址(白嫖 Lime 的域名)  
> ~~**<https://msg.jsun.limecho.net/>**~~ (已失效)

GitHub: <https://github.com/jsun969/MessageBoard>

**起因**是，**飞鸽传书**差不多写完了，写点**休闲**的东西，于是想到了**前后端耦合**的 **PHP** 和一直想用但是没用上的 [**MDUI**](http://mdui.org)

如果你需要**部署到**自己的**服务器**上应该没有，请**事先**查看 **GitHub** 上的 **Readme**

![](/blog/zuo-yi-ge-php-liu-yan-ban/image.png)

**初学 PHP**，没**写**多久 PHP 倒是环境配置了挺久，**功能**也就**截图**上的这么点，记录一点**技术**层面遇到的**问题**和**解决方案**吧

## 文本框动态属性

需要实现勾选**匿名**后**昵称**和**邮箱**输入框**禁用**，这里由于使用了 **MDUI** ，可以使用它**自带**的一个**类 JQ** 的**工具库：**[https://www.mdui.org/docs/jq](https://www.mdui.org/docs/jq)

但是**修改完**之后，输入框确实**禁用**了，但是**样式**没有**改变**，查了半天应该用

![](/blog/2021/06/image-4.png)

以下是**代码**，**userInfoTmp** 缓存了**匿名前**的输入，**取消勾选后**无需**再次**输入

```js
let userInfoTmp = [];
$('#isAnonymous').on('click', () => {
  $('.userInfoInput').prop({
    disabled: $('#isAnonymous').prop('checked'),
    value: (index, oldValue) => {
      if ($('#isAnonymous').prop('checked')) {
        userInfoTmp[index] = oldValue;
        return '';
      } else {
        return userInfoTmp[index];
      }
    },
  });
  mdui.updateTextFields($('.userInfo'));
});
```

## SQL 操作预处理

**好像**是可以防止**SQL 注入**？

```php
if ($stmt = $conn->prepare("INSERT INTO message (`is_anonymous`,`ip`,`name`,`email`,`message`) VALUES (?,?,?,?,?)")) {
  $stmt -> bind_param("issss", $isAnonymous, $ip, $name, $email, $message);
  $isAnonymous = (bool)$_POST["isAnonymous"];
$ip = $_SERVER['REMOTE_ADDR'];
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];
$stmt -> execute();
}
```

此处 **$\_SERVER['REMOTE_ADDR']** 记录了 **用户 IP**，虽然 **isAnonymous** 在 **SQL** 中是 **tinyint(1)** 但是依然可以**传入 bool**，会转换成 **0/1**

## Github 图标按钮

**原本**以为加一个 **icon 按钮**就完事了，但是**并没有**搜到这个 icon

![](/blog/2021/06/image-2.png)

那么**文档顶部**的图标是怎么**实现**的呢，原来是**SVG**

![](/blog/2021/06/image-3.png)

## 过滤 HTML

如果**用户**留言了 **HTML**，用 **echo** 可能造成 **xss 注入**的问题，于是将 **echo 修改**为

```php
echo htmlspecialchars($message["message"])
```
