---
title: '记一次英语节投票活动'
date: '2020-12-22'
tags: ['code', 'python', 'web', 'vote']
language: 'zh-cn'
description: 'from 螓首蛾眉'
---

> 轩然大佬给的方法，仅整理成文进行分享

**学校**组织了这么个活动

![](/blog/ji-yi-ci-ying-yu-jie-tou-piao-huo-dong/image-11.png)

但是我又没有什么**七大姑八大姨**的，怎么得奖呢？  
答案是——**刷票**

首先可以看到这个网站的判断机制是**本地的 Session**

![](/blog/ji-yi-ci-ying-yu-jie-tou-piao-huo-dong/image-12.png)

那么最**暴力**的办法就是打开浏览器**无痕**模式，**重复**投票  
那么现在**问题**来了，能不能做到**自动化**？

简单**抓包**后可以发现这两个**Data 值至关重要**

![](/blog/ji-yi-ci-ying-yu-jie-tou-piao-huo-dong/image-13.png)

那么**简单**地用 Python 写个**小脚本**就完事了  
（**混淆年级参数**是由于一次**只能投三票**，所以在给定的年级**随机抽取**班级投票，就不会**影响**到刷票班级的**名次**了）

![](/blog/ji-yi-ci-ying-yu-jie-tou-piao-huo-dong/image-14.png)

**想要脚本？您在想桃子！**

---

**12 月 14 号更新**

![](/blog/ji-yi-ci-ying-yu-jie-tou-piao-huo-dong/image-15.png)

---

**12 月 15 号更新**

写代码的时候**忘记截图**了，幸亏在学校**胡老师**那里问到了**网站源码**。简要写下**教程**

首先是**班级代码**查找，其实**每个班级**的 html 标签里面自带了一个**for**的参数其实也可以在**投票**的时候**抓包**记录

```csharp
<label for="@("xx"+item.id)"> @Html.Raw(item.xxname+" "+item.shenhe.ToString()) </label>
```

使用强大的**BeautifulSoup 爬虫**，可以非常**简单**地获取

```python
soup1 = BeautifulSoup(req_get.text, "html5lib")
lable_list = soup1.find_all("label")
for label in lable_list:
    print(label.get("for")[2:5], end=" ")
```

但是碍于投票机制是一次只能投**三个班级**，并且不能**重复**，于是就有了**混淆年级**选项。  
原理很简单，就是在**选定年级**获取两个班级投票，这样**平均**分给**一个年级**就不会影响**刷票**班级了

```python
if confuse == "1":
    vote_id2 = random.randrange(134, 137)
    vote_id3 = random.randrange(vote_id2 + 1, 141)
elif confuse == "2":
    vote_id2 = random.randrange(142, 145)
    vote_id3 = random.randrange(vote_id2 + 1, 149)
elif confuse == "3":
    vote_id2 = random.randrange(150, 153)
    vote_id3 = random.randrange(vote_id2 + 1, 157)
```

最麻烦的是**Token**，第一天**误**以为是藏在**Cookies 里面**，找了**好久**，最后**请教**了[轩然大佬](https://github.com/TheNightmareX)，原来是**隐藏**在一个**input 标签**里

**好家伙**，其实是这句话

```html
<input type="hidden" value="@hd.huodongid" name="hdid" />
```

继续**爬虫**

```python
tmp_token = soup2.input.get('value')
```

最后**Post**一下，**一次投票**就完成了

```python
post_data = (
    ("__RequestVerificationToken", tmp_token),
    ("hdid", "8"),
    ("xxs", int(vote_id1)),
    ("xxs", vote_id2),
    ("xxs", vote_id3),
)
res_post = ses.post("http://42.192.199.237/mng/Author/Toupiao/8", data=post_data)
```

**附上源码[~~下载地址~~(已失效)](https://jsun969.lanzous.com/iULxsjpiycd)**
