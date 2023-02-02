---
title: '易语言处女作: 学号助手'
date: '2020-03-10'
tags: ['code', 'epl']
language: 'zh-cn'
description: 'from 螓首蛾眉'
---

GitHub: <https://github.com/jsun969/xuehaozhushou>

这个事情最早可以追溯到**两年前**，班里老师说是~~有选择恐惧症~~提高课堂积极性，想让我给她整一个抽学号软件。我可能当时脑回路比较**清奇**，以为是让我自己写一个软件，于是...

我发现我从来没写过**窗体**软件，请教了一下[一位大佬](http://ltlec.cn)，他推荐了我一个简单的编程语言：易语言。本来只是简单的做一下就完事了，不过可能因为这几天真的没啥东西好折腾，所以经过~~亿~~一点点的优化，这款**看似**是教学工具的软件诞生了

你问我为什么说**看似**？好吧我先演示一下

![](/blog/yi-yu-yan-chu-nv-zuo-xue-hao-zhu-shou/01.gif)

还可以设置（双击**学号**）

![](/blog/yi-yu-yan-chu-nv-zuo-xue-hao-zhu-shou/02.gif)

老师说抽学号的时候不够**刺激**，于是我就添加了**音乐播放**机制（双击**音乐**）

![](/blog/yi-yu-yan-chu-nv-zuo-xue-hao-zhu-shou/03.gif)

你以为这就完了？其他功能先卖个关子，说一下**缓存文件**。当时因为憨批初学者，于是把缓存文件放到了**C 盘**现在也懒得修改了。

![](/blog/yi-yu-yan-chu-nv-zuo-xue-hao-zhu-shou/Snipaste_2020-03-10_16-33-36.png)

好吧看得出来我的英语姿势水平确实很高...

为什么要说这个呢，**下一个功能**就在这里。先创建一个 goodstu.txt 的文件

![](/blog/yi-yu-yan-chu-nv-zuo-xue-hao-zhu-shou/Snipaste_2020-03-10_16-39-14-1.png)

"好学生"

txt 中的文本格式是：n+n 个学号

![](/blog/yi-yu-yan-chu-nv-zuo-xue-hao-zhu-shou/Snipaste_2020-03-10_16-43-17.png)

这个例子的意思:3 名学生 36 号 37 号 38 号

完事！再抽个学号？

![](/blog/yi-yu-yan-chu-nv-zuo-xue-hao-zhu-shou/04.gif)

没错，抽不到 goodstu 文件里的学号了 2333

代码在这儿（简单递归）

![](/blog/yi-yu-yan-chu-nv-zuo-xue-hao-zhu-shou/Snipaste_2020-03-10_16-55-21.png)

如果老师发现了你还能搞个小区间让老师查

好了废话说完了，[~~下载链接~~(已失效)](https://www.lanzous.com/ia4a8yb)，需要源代码也可以联系我要 2333
