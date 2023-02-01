---
title: '飞鸽传书 校园弹窗通知软件'
date: '2021-05-24'
tags:
  [
    'code',
    'electron',
    'javascript',
    'node.js',
    'vue',
    'vuetify',
    'web',
    'socket.io',
    'school',
  ]
language: 'zh-cn'
description: 'from 螓首蛾眉'
---

## 起因

大概是**初三**的时候，班主任办公室离教室太远了，于是用**易语言**和**CQ 机器人**写了一个**弹窗**的小软件

![](/blog/fei-ge-chuan-shu-xiao-yuan-tan-chuang-tong-zhi-ruan-jian/image-1.png)

界面设计

![](/blog/fei-ge-chuan-shu-xiao-yuan-tan-chuang-tong-zhi-ruan-jian/image-3.png)

一部分核心代码

**中考**考完，物是人非，**CQ 倒闭了**。但初中**数学老师**找到我要当时的软件。我只好以**部署太麻烦**推辞一下

**高中**这学期有**研究课**，我就选择了一个类似的**课题**~~假公济私实锤~~，**大概**地完成了一个**差不多还行**的项目

GitHub: <https://github.com/jsun969/Pigeon>

### 使用教程

项目分为**网页**(教师端，以下称为**网页端**) 和 **电脑软件**(教室端，以下称为**客户端**)  
此外，**网页端**适配**电脑**和**移动设备**，**界面**可能不同，但功能**完全一致**。此教程仅展示**手机**操作

### 注册登陆

![](/blog/fei-ge-chuan-shu-xiao-yuan-tan-chuang-tong-zhi-ruan-jian/image-4.png)

**教师**首先要在网页端**注册**，**邀请码**应由**服务器管理员**提供(**获取命令**已经写在**Readme**里了)

### 使用客户端

**直接打开 exe 即可**

可以直接**关闭**，会挂在**后台**，可在通知区找到**图标**，可由此**退出**程序

![](/blog/fei-ge-chuan-shu-xiao-yuan-tan-chuang-tong-zhi-ruan-jian/image-14.png)

### 绑定设备

打开**客户端**，可以看到一个设备代码

![](/blog/fei-ge-chuan-shu-xiao-yuan-tan-chuang-tong-zhi-ruan-jian/image-5.png)

**网页端**可在**添加设备**中**申请**设备绑定

![](/blog/fei-ge-chuan-shu-xiao-yuan-tan-chuang-tong-zhi-ruan-jian/image-6.png)

**客户端**会**弹出**一个**提示**，请在**30 秒**内点击**同意**

![](/blog/fei-ge-chuan-shu-xiao-yuan-tan-chuang-tong-zhi-ruan-jian/image-7.png)

**绑定成功**后，设备**状态**应由**未知**变为**在线**

![](/blog/fei-ge-chuan-shu-xiao-yuan-tan-chuang-tong-zhi-ruan-jian/image-8.png)

### 发送消息

**注意:消息建议不是纯英语+数字或有换行，可能会引起格式错误**

![](/blog/fei-ge-chuan-shu-xiao-yuan-tan-chuang-tong-zhi-ruan-jian/image-9.png)

网页端发送消息

![](/blog/fei-ge-chuan-shu-xiao-yuan-tan-chuang-tong-zhi-ruan-jian/image-10.png)

客户端成功弹窗

### 历史记录

**网页端**和**客户端**有**历史记录**，教师端支持**实时显示**消息接收**状态**

![](/blog/fei-ge-chuan-shu-xiao-yuan-tan-chuang-tong-zhi-ruan-jian/image-12.png)

## 结语

项目暂不**对外开放**，如果需要使用，请自行**编译**并部署到**服务器**，或联系我

**Logo**由**费天翔**进行绘制，同时我的**研究小组**成员

**这个项目也写了将近两个月了，如果对您有所帮助，希望能在 Github 给我一个 Star，感激不尽**

![](/blog/fei-ge-chuan-shu-xiao-yuan-tan-chuang-tong-zhi-ruan-jian/image.png)
