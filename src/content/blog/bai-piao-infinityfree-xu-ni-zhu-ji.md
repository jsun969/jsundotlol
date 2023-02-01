---
title: '白嫖 InfinityFree 虚拟主机'
date: '2020-05-29'
tags:
  ['website', 'cloudflare', 'infinityfree', 'server', 'free', 'virtual host']
language: 'zh-cn'
description: 'from 螓首蛾眉'
---

## 前言

这部**主机**的使用是**Lime**在**2018 年**一手把我教会的，也是**网站建设**让我们成为了非常好的**朋友**，**十分感谢他！**

**[InfinityFree](https://infinityfree.net)**是一款非常**老牌**的虚拟主机网站，**无限空间**，唯一的限制是**单文件**不能超过**10M**，但是作为**个人网站**已经**绰绰有余**了

## 注册

**InfinityFree 官网：[https://infinityfree.net/](https://infinityfree.net/)**

**注册**对于**国内**用户**非常不友好**，首先点击**用户空间**

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-21-10.png)

然后点击**最下面**的**注册按钮**

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-21-54.png)

然后**照常**填写就好了？不，这样会使**Recaptcha 报错**

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-24-31.png)

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-24-59.png)

在**国内**，**最佳**的解决方案使安装**Gooreplacer 插件**，重定向**Recaptcha**地址到**国内**，这里不多**赘述**了

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_22-02-10.png)

出现**验证码**后**通过**才能**继续注册**

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-27-55.png)

接下来会**验证邮箱**，由于**某些**原因，会被认定为**垃圾邮件**，如果找不到**验证邮件**了，多半在你的**垃圾邮件**内

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-28-30.png)

比如这个腾讯企业邮就把他认错了

**点击 Verify**就行了

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-28-53.png)

致此，**注册完毕**

## 添加网站

点击**添加**按钮

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-29-28.png)

第一步，选择**域名**，这里有**两种域名**可供添加，**但是**强烈建议**添加根域名**而非**子域名**，因为

**子域名无法开启 CloudFlare**  
**子域名无法开启 CloudFlare**  
**子域名无法开启 CloudFlare**

另外，**无法**绑定 **.tk** 域名

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-31-13.png)

像我这样添加自己的**子域名**属于**错误示范**其实是懒得开新域名了，如果您想**防止 DDOS/CC 攻击**，请**务必不要模仿**

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-31-29.png)

第二步**啥也别动**，点**Create**就完事了，请提前将**域名的 NameServer**修改为

**ns1.epizy.com**  
**ns2.epizy.com**

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-32-48.png)

致此，**域名添加完毕**，点击进入**配置界面**

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-33-25.png)

## 配置网站&CloudFlare

### 修改语言

当域名**添加完毕**以后，需要一定时间**等待激活**

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-34-02.png)

这个时候，为**节约时间**，可以先配置一下**账户语言**，方便**面板操作**

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-36-40.png)

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-36-58.png)

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-37-25.png)

### 添加网站文件

当**File Manager**为**橙色**，即域名**激活成功**，点击进入

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-38-08.png)

点击进入**htdocs 文件夹**，即可**上传网站文件**

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-38-41.png)

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-38-59.png)

### 配置 CloudFlare

CloudFlare 仅支持**根域名**，添加**子域名**的可以**忽略**了，先点击进入**控制面板**

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-39-14.png)

翻到**最下面**，点击**软件**\->**Cloudflare**

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-39-48.png)

**有啥点啥**就行，十分**简单**

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-39-58.png)

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-40-11.png)

由于我添加的是**子域名**反面教材切勿模仿，**无法开启**CloudFlare，如果您添加的是**根域名**，会通过**邮件**发送给您**CloudFlare 链接**的

![](/blog/bai-piao-infinityfree-xu-ni-zhu-ji/Snipaste_2020-05-29_21-42-23.png)

**未完待续**..咕咕咕
