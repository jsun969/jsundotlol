---
title: '纯 CSS 给图片加个旋转动画'
date: '2020-04-23'
tags: ['website', 'code', 'css', 'animation', 'image']
language: 'zh-cn'
description: 'from 螓首蛾眉'
---

> 参考: <https://blog.csdn.net/zyddj123/article/details/81489364>

## 一些废话

本来有个**买了 6 年**的域名 jsun969.cn，但是**没法备案**就一直**闲置**，网页用了**HTML5UP**的模板，自己**稍微**修改了一下，开了个[主页](https://github.com/jsun969/old-home)，看起来也**不错**。

![](/blog/chun-css-ge-tu-pian-jia-ge-xuan-zhuan-dong-hua/Snipaste_2020-04-23_09-25-14.png)

网页背景调用了 Bing 日图但是服务器非常土豆，很可能没法显示

## 演示

如题，这是**旋转**动画的 demo

![](/blog/chun-css-ge-tu-pian-jia-ge-xuan-zhuan-dong-hua/demo.gif)

鼠标触发

## 代码

用了**hover**，直接上代码

```css
img.turnAround:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
}
```

但是不能让他**直接旋转**，得有个**动画过程**，所以**加**上

```css
\-webkit-transition: all 1.5s ease-in-out;
-moz-transition: all 1.5s ease-in-out;
-o-transition: all 1.5s ease-in-out;
-ms-transition: all 1.5s ease-in-out;
```

然后，鼠标移开要**转回来**，那么**全部**代码就是

```css
img.turnAround:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
}
img.turnAround {
  transform: rotate(-360deg);
  -webkit-transition: all 1.5s ease-in-out;
  -moz-transition: all 1.5s ease-in-out;
  -o-transition: all 1.5s ease-in-out;
  -ms-transition: all 1.5s ease-in-out;
  -webkit-transform: rotate(-360deg);
  -moz-transform: rotate(-360deg);
  -o-transform: rotate(-360deg);
  -ms-transform: rotate(-360deg);
}
```

最后，给**图片**加上这个**turnAround 的 class**就完事了

```html
<img src="xxx" class="turnAround" alt="xxx" />
```
