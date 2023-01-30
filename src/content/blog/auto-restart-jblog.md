---
title: '自动化部署博客流程'
date: '2021-10-01 09:38:14'
tags: ['code', 'blog', 'automation', 'script', 'shell', 'deploy']
language: 'zh-cn'
description: '每次修改博客代码后实现自动化 clone 和 build 的流程'
---

每次 Github 上修改了一点点博客代码，然后就要在服务器上做数据备份，然后重新 clone，太麻烦了，于是总结了一下发现

其实每次部署的过程也就是

1. 备份.env 和数据库
2. 删除原有的博客文件
3. 重新 clone
4. build 和 start

于是做了一个简单的 shell 脚本来实现自动化

```sh
mkdir jblog-temp
mv JBlog/prisma/db.db jblog-temp/db.db.tmp
mv 'JBlog/.env.local' 'jblog-temp/.env.local.tmp'
rm -rf JBlog
git clone https://github.com/jsun969/JBlog.git
mv jblog-temp/db.db.tmp JBlog/prisma/db.db
mv 'jblog-temp/.env.local.tmp' 'JBlog/.env.local'
rmdir jblog-temp
cd JBlog
yarn
yarn db:init
yarn build
yarn start -p 2103
```
