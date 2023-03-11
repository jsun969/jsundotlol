---
title: '我的 17 岁'
description: '18 岁生日在即，谨以此文记录这个平凡的 17 岁'
date: '2023-3-11'
language: 'zh-cn'
tags: ['life', 'review', 'summary', 'birth']
---

其实我本来想写一篇 2022 年度总结的，但是原来写的那个博客感觉太丑了，所以过年期间在写现在这个博客系统，干脆拖到 18 岁成人生日前写这篇文章。

## 伊始

17 岁的开始我记得很清楚，是上海通知疫情封控停课。

![](/blog/my-17th/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230311150825.jpg)

经历了 2020 年初三的停课，我深刻地意识到自己**肯定不会**认真上文化课，于是有了后文 😂

## 代码

### 飞鸽传书

简单来说就是老师可以在网站上给教室电脑发送弹窗通知。

这其实是一个老项目了，从初三用易语言写的 QQ 机器人插件，到[高一用 VUE 写的第一个 Web 开发项目](/blog/fei-ge-chuan-shu-xiao-yuan-tan-chuang-tong-zhi-ruan-jian)。发布后，老师都很喜欢用。而在高一写的代码由于刚刚入门，实在难于维护，但是年级中很多老师都喜欢用。于是打算用 React+TS 重构。

![](/blog/my-17th/Snipaste_2023-03-11_15-35-18.png)

最后用整个项目都用了 TypeScript 进行开发。学生端用了 Tauri，但 Rust 没认真学，写的不是很好。Tauri 的 Discord 社区很活跃，当时刚发布 1.0，有个维护者一直在帮忙解决问题。后端用了 NestJS，第一次接触 OOP 开发，挺有意思。前端第一次尝试 React 全家桶，用 React Hook Form 做了表单处理，还有阿里的 ahooks，为之后的开源贡献埋下伏笔。

独立开发业务项目实际上对代码水平的提升很大，我也非常庆幸自己有这个项目的想法并有地方实践。

### ahooks

其实之前提过一些 PR，但都是无关痛痒的 docs，这次在飞鸽写完后，无聊看了一下 ahooks 的 Issue 列表，解决了一个小 Issue

<https://github.com/alibaba/hooks/pull/1640>

![](/blog/my-17th/Snipaste_2023-03-11_15-53-23.png)

### React Hook Form

21 年在机缘巧合下认识了丹麦的 Tobias，聊天的时候他推荐我给这个项目的 Resolver 添加 Ajv 支持

试了一下，还真被我写出来了

<https://github.com/react-hook-form/resolvers/pull/408>

![](/blog/my-17th/Snipaste_2023-03-11_16-04-45.png)

后来认识了项目作者 Bill（居然是国人），在他的支持下，接手了浏览器插件开发。挺复杂的，但是写完很有成就感。

<https://github.com/react-hook-form/devtools-extension>

![](/blog/my-17th/Snipaste_2023-03-11_16-13-25.png)

非常感谢 Bill 在代码上给我的建议和鼓励 ❤️

### React Hook Dialog

<https://github.com/jsun969/react-hook-dialog>

~~名字上粗劣地模仿了 React Hook Form~~

实际上是在写飞鸽的时候感觉对话框组件的复用非常繁琐，于是写了这个项目，能更方便的操作对话框组件。

也算是我写的第一个轮子，很青涩，但也是一个大胆的尝试。

### 其他

除了这些，也帮助 Jest Preview 做了中文翻译，给 Astro（也就是写这个博客系统的时候）加了 Vercel Analytics 支持等等。

## 游戏

网课期间，死亡细胞打到了 5 细胞

![](/blog/my-17th/Snipaste_2023-03-11_16-38-07.png)

暑假和 Char2s 打 Hypixel，也算是童年回忆了。我不太会玩，打得很菜，不过学会了蹲起搭。

![](/blog/my-17th/2023-03-11_16.46.06.png)

设备上也算有所更新，买了罗技 g102 鼠标和飞智冰原狼手柄，便宜好用 ~~穷学生必备~~

![](/blog/my-17th/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230311164803.jpg)

其他游戏也玩了不少。最近则是在 Char2s 的安利下入了怪物猎人世界，玩不太懂，抽空多试试。

## 社交

之前在 QQ 上有不少的交流群，但今年试着减少了很多无用的社交。开了个微信的群，拉了一些朋友聊天吹水。

![](/blog/my-17th/Snipaste_2023-03-11_17-00-40.png)

在 Twitter 上也认识了不少国外的朋友，很感谢他们给予我的鼓励和支持。

## 现状

高考在即，希望能上一个不错的大学。

最后，感谢你看完这篇流水账。🙌
