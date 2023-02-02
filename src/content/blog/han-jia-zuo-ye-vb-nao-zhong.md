---
title: '寒假作业: VB 闹钟'
date: '2021-01-23'
tags: ['code', 'visual basic', 'homework']
language: 'zh-cn'
description: 'from 螓首蛾眉'
---

> 初学 VB，写的很菜，大佬勿喷

## 前言

**众所周知**，在**课改**没有波及到的**上海**，**信息课**还在用**早已淘汰**的**VB**授课**实名羡慕 Lime**

所以就有了**寒假作业**

![](/blog/han-jia-zuo-ye-vb-nao-zhong/image-1.png)

截取自钉钉

**教程视频**源自**Bilibili**，地址为[BV1C7411e7pt](https://www.bilibili.com/video/BV1C7411e7pt)

## 解析&小改

指出几个视频内的**弊端**和**改进措施**吧

### 瞎写缩进

![](/blog/han-jia-zuo-ye-vb-nao-zhong/image-2.png)

smjbwy

我**不清楚**VB 是不是有某种**规范**是这种**缩进**方式，但是这个**缩进**我看起来是真的**不爽**，所以**稍作**改进应该是这样

![](/blog/han-jia-zuo-ye-vb-nao-zhong/image-3.png)

爽了

其他地方**同理**

### 判断嵌套

![](/blog/han-jia-zuo-ye-vb-nao-zhong/image-4.png)

让我想到了 NASA 火箭代码梗

其实**不是**啥**大问题**，但是可以改成**And**更加**简洁**

### 硬核开关

![](/blog/han-jia-zuo-ye-vb-nao-zhong/image-5.png)

跟上面是同一段

这个判断也**没问题**，但是看起来属实太**憨**了

**综上所述**，这块代码可以**改**成这样

![](/blog/han-jia-zuo-ye-vb-nao-zhong/image-6.png)

又爽了

**加**了一个**alarmOn**的变量记录**状态**

## 大改

![](/blog/han-jia-zuo-ye-vb-nao-zhong/image-7.png)

~~成绩太菜，就不展示了~~

**本来**想用**C#**的 WinForm 写的，但是**考试**考的是**VB**，不如**练练手**

![](/blog/han-jia-zuo-ye-vb-nao-zhong/image-8.png)

成果图

**说说**写代码时候的几个**难点**吧**其实是我太菜了**

### 输入限制

**判断**文本再**弹窗**的**用户体验**太差，所以我从**根源**尝试**解决**问题

![](/blog/han-jia-zuo-ye-vb-nao-zhong/image-12.png)

思路是在**按下按键**的时候只允许**数字**和**删除/退格**，并把文本限制改为**2**  
接着**限制**数字**大小**让其符合**时间格式**，只有**符合**了才允许其**加入闹钟**时间

### 保存时间

因为用了**两个**窗口，所以用到了**全局变量**，然后用**循环**将其**导入**数组，最后每次打开**设置**的时候再**导出**一下就行

![](/blog/han-jia-zuo-ye-vb-nao-zhong/image-10.png)

## 总结

**VB**写起来属实**麻烦**，可能这正是它**逐渐淘汰**的原因吧

**代码**就**不发**了怕被老师说是给同学**抄作业**

**祝大家寒假愉快！！**
