---
title: '使用 OpenGraph 协议显示微信链接图片'
date: '2021-10-02 11:09:21'
tags: ['website', 'wechat', 'seo', 'share']
language: 'zh-cn'
description: '每当我想把博文分享到微信朋友圈的时候，会发现头像不显示，非常尴尬'
---

每当我想把博文分享到微信朋友圈的时候，都会碰到一个很蛋疼的问题  
![kohai-blog-wechat-link-avatar-error](/blog/wechat-link-avatar/kohai-blog-wechat-link-avatar-error.jpeg)  
~没错柯灰就是反面教材~

找了一下别的网站，发现了一个非常奇怪的 meta 标签

```html
<meta property="og:image" content="xxx" />
```

查了一下原来是 [OpenGraph 协议](https://ogp.me/)  
![open-graph-index](/blog/wechat-link-avatar/open-graph-index.png)

加上后成功显示了

```html
<meta
  property="og:image"
  content="https://gitee.com/jsun969/assets/raw/master/avatar.png"
/>
```

![link-avatar-success](/blog/wechat-link-avatar/link-avatar-success.jpeg)

其实 OpenGraph 还有很多用法，比如`og:title`或者`og:description`，这样在 telegram 上可以实现一个比较美观的链接  
![telegram-link](/blog/wechat-link-avatar/telegram-link.png)
