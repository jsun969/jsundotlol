---
title: '如何手动升级 WordPress'
date: '2020-05-04'
tags: ['website', 'wordpress', 'update', 'manual', 'database']
language: 'zh-cn'
description: 'from 螓首蛾眉'
---

> 参考: https://www.wpdaxue.com/wordpress-update-problem.html http://www.yzipi.com/5.htm

## 前言

由于 WordPress **限制天朝访问**并且今日好像**被攻击**原因，在天朝访问[WordPress 官网](http://wordpress.org)无疑是**没法访问**的，那么现在问题来了，我的 WordPress **版本太老**了，如何**升级**呢

## 另一更新正在进行

第一次更新用的是 WordPress 的**自动升级**，但是他有一个**弊端**，点击更新以后会**锁住**，而且它占着茅坑不拉屎也**没升**，这样你就**没法升级**了

![](/blog/ru-he-shou-dong-sheng-ji-wordpress/wp-update-error-2.jpg)

主要现象

那么怎么办呢，其实他只是在**数据库**内增加了一个**锁住的记录**，进入数据库**删掉**就行了

```sql
delete from wp_options where option_name='core_updater.lock';
```

## 手动更新

首先你要**连接国际互联网**~~不解释了我怕~~，然后[下载 WordPress](https://wordpress.org/latest.zip)最新版，删除**wp-content 文件夹**

然后把**处理完**的压缩包上传至服务器**解压**然后**覆盖**

最后输入 **域名/wp-admin/upgrade.php** 升级数据库就**大功告成**了
