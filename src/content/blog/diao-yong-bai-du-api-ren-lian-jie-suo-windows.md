---
title: '调用百度 API 人脸解锁 Windows'
date: '2020-04-07'
tags: ['code', 'ai', 'python', 'baidu', 'facial recognition']
language: 'zh-cn'
description: 'from 螓首蛾眉'
---

GitHub: <https://github.com/jsun969/windows-face-lock>

## 起因

某天，我发现**开机输密码**太麻烦了~~其实就是懒~~。然鹅又是**Windows7 系统**，没有啥 Windows Hello 可以**快捷解锁**。于是根据手机可以**人脸解锁**，电脑又有摄像头，百度了一下如何**人脸解锁 Windows**

![](/blog/diao-yong-bai-du-api-ren-lian-jie-suo-windows/Snipaste_2020-04-07_08-16-17.png)

![](/blog/diao-yong-bai-du-api-ren-lian-jie-suo-windows/Snipaste_2020-04-07_08-14-07.png)

最后都得出来一个叫做**LuxandBlink**的软件，得，那就下载一下就完事了呗

![](/blog/diao-yong-bai-du-api-ren-lian-jie-suo-windows/Snipaste_2020-04-07_08-19-13.png)

不过就在我搜下载链接的时候，却发现这玩意儿已经**好久没更新**了，**安全性**可想而知。不过现在**各种大厂**都有自己的人脸识别 api，为何不**自己做一个**呢？

好了**废话**说完了，现在是以下为**教程**

## 教程

### 获取百度 API

选择**百度**API 是由于我~~想白嫖~~**财力不足**，不过既然是**免费**的，**QPS(每秒查询率)**肯定**不会**给我很**高**，所以就**没法直接分享**给大家，只能由大家**自己申请**

这是[官网](http://ai.baidu.com)，首先你要**登录**，直接用**百度账号(就是你登录百度网盘的账号)**就行。

![](/blog/diao-yong-bai-du-api-ren-lian-jie-suo-windows/Snipaste_2020-04-07_08-40-40.png)

进入**控制台**，选择人脸识别

![](/blog/diao-yong-bai-du-api-ren-lian-jie-suo-windows/Snipaste_2020-04-07_08-41-06.png)

然后**创建**一个**应用**

![](/blog/diao-yong-bai-du-api-ren-lian-jie-suo-windows/Snipaste_2020-04-07_08-46-07.png)

![](/blog/diao-yong-bai-du-api-ren-lian-jie-suo-windows/Snipaste_2020-04-07_08-46-39.png)

![](/blog/diao-yong-bai-du-api-ren-lian-jie-suo-windows/Snipaste_2020-04-07_08-42-25.png)

创建完**以后**你会获得**一个 API Key**和**一个 Secret Key**，把他**复制下来**

### 创建 JSON

想让**程序**读取你的 API，需要**创建**一个 JSON。其实这步**非常简单**

![](/blog/diao-yong-bai-du-api-ren-lian-jie-suo-windows/Snipaste_2020-04-07_08-51-53-1.png)

先创建一个文本文件

![](/blog/diao-yong-bai-du-api-ren-lian-jie-suo-windows/Snipaste_2020-04-07_08-54-27-1.png)

改文件名和后缀名

在这个**文件**里**输入**

```json
{ "api_key": "你复制的API Key", "secret_key": "你复制的Secret Key" }
```

![](/blog/diao-yong-bai-du-api-ren-lian-jie-suo-windows/Snipaste_2020-04-07_08-56-45-1.png)

最后是这样

### 安装 Python 和模块

这步就请**自行百度**吧，Python 建议**版本是 3.7.6**，兼容性**好**，**方便**装模块

**模块**的话，需要装**两个**模块，**直接 pip**问题不大

```
pip install opencv-python
pip install requests
```

### 自拍一张

这步貌似**没啥**好说的，注意不要开**美颜**啥的就行，将拍好的**照片**(必须为**jpg 格式**)，命名为**face**。与你**之前创建**的 JSON 放在**同一个目录**

![](/blog/diao-yong-bai-du-api-ren-lian-jie-suo-windows/Snipaste_2020-04-07_09-15-48.png)

### 主程序

首先你要在**前面这个文件夹**里再**创建**一个**error_photos**的文件夹，用来存放**解锁失败**的图片

![](/blog/diao-yong-bai-du-api-ren-lian-jie-suo-windows/Snipaste_2020-04-07_09-19-21.png)

然后就可以**下载主程序**了，虽然我在**Github 上**也上传了，但是鉴于天朝的**网络速度**，还是分享给大家**蓝奏云**的[~~下载地址~~(已失效)](https://www.lanzous.com/ib2n5pg)吧。同样，**解压**下来放**同一个文件夹**，**大功告成**！

![](/blog/diao-yong-bai-du-api-ren-lian-jie-suo-windows/Snipaste_2020-04-07_09-28-03.png)

## 使用及原理

**使用**的话只要在**命令行**内输入

```
python face.py
```

程序的**原理**则是：**打开程序**则**监听是否进入锁屏界面**(锁屏界面建议**不要加设密码**)，**解锁**屏幕的时候，程序会**自动拍照**进行**人脸识别**，如果**没有通过**，会将照片**自动保存**到 error_photos 文件夹内，电脑再次**自动锁屏**
