---
title: 'xChess 叉棋 类五子棋小游戏'
date: '2020-12-05'
tags: ['code', 'csharp', 'gobang', 'game']
language: 'zh-cn'
description: 'from 螓首蛾眉'
---

## 前言

失踪人口回归，其实这个项目我**两个星期**之前就写完了。但是由于~~懒~~**各种原因**一直~~拖着~~没发出来。起因是我跟轩然某天无聊**各自**写了个**cli**的**五子棋**

![](/blog/xchess-cha-qi-lei-wu-zi-qi-xiao-you-xi/image-10.png)

轩然(左)我(右)

放到**学校**里跟同学玩了一会就突然想做**窗体**了

## 玩法

### 下载

**_温馨提示：本游戏在触摸屏上游玩体验更佳_**  
首先你要**下载**这个软件，先点击**下面**这个**链接**

GitHub: <https://github.com/jsun969/xChess>

![](/blog/xchess-cha-qi-lei-wu-zi-qi-xiao-you-xi/image-1.png)

点击 Release

![](/blog/xchess-cha-qi-lei-wu-zi-qi-xiao-you-xi/image-2.png)

下载最新版本的 exe 文件

下载完以后**打开**即可，**绿色软件**无需安装

![](/blog/xchess-cha-qi-lei-wu-zi-qi-xiao-you-xi/image-3.png)

点击**方格**即可落子，首次打开默认为**双人五子棋**

### 设置

**设置**中可以设置一些**基本**游戏**玩法**，**滑块**输入当然是为了方便**触摸屏**

![](/blog/xchess-cha-qi-lei-wu-zi-qi-xiao-you-xi/image-5.png)

### 扩大棋盘

如果嫌棋盘**太小**，**拖动窗口**点击**新游戏**即可**最大化也行**

![](/blog/xchess-cha-qi-lei-wu-zi-qi-xiao-you-xi/20201205.gif)

### 存档

游戏支持**导出**为 xChess**存档**文件，**使用**存档仅需**导入**或**拖入**游戏界面即可

![](/blog/xchess-cha-qi-lei-wu-zi-qi-xiao-you-xi/image-6.png)

## 代码

### 新建棋盘

new Button 来**自定义**棋盘**大小**

```csharp
for (int i = 1; i <= rowNum; i++) {
  for (int j = 1; j <= columnNum; j++) {
    Btn[i, j] = new chessBtn {
      btnPosX = i,
        btnPosY = j,
        Location = new Point(12 + 36 * (j - 1), 12 + 36 * (i - 1)),
        Size = new Size(30, 30),
        Text = "",
        TabStop = false,
    };
    groupBox1.Controls.Add(Btn[i, j]);
    Btn[i, j].Click += new EventHandler(Btn_Click);
    playerNameTmp[i, j] = 0;
  }
}
```

### 输赢判断

**轩然**给的**思路**，还挺**不错**

```csharp
int cou = 0;
int i, j;
//行
for (i = chessBt.btnPosY + 1; playerNameTmp[chessBt.btnPosX, i] == playerNum; i++) {
  cou++;
}
for (i = chessBt.btnPosY - 1; playerNameTmp[chessBt.btnPosX, i] == playerNum; i--) {
  cou++;
}
if (cou == winChessNum - 1) ifPlayerWin();
//列
cou = 0;
for (i = chessBt.btnPosX + 1; playerNameTmp[i, chessBt.btnPosY] == playerNum; i++) {
  cou++;
}
for (i = chessBt.btnPosX - 1; playerNameTmp[i, chessBt.btnPosY] == playerNum; i--) {
  cou++;
}
if (cou == winChessNum - 1) ifPlayerWin();
//右对角线
cou = 0;
i = chessBt.btnPosX + 1;
j = chessBt.btnPosY + 1;
while (playerNameTmp[i, j] == playerNum) {
  cou++;
  i++;
  j++;
}
i = chessBt.btnPosX - 1;
j = chessBt.btnPosY - 1;
while (playerNameTmp[i, j] == playerNum) {
  cou++;
  i--;
  j--;
}
if (cou == winChessNum - 1) ifPlayerWin();
//左对角线
cou = 0;
i = chessBt.btnPosX - 1;
j = chessBt.btnPosY + 1;
while (playerNameTmp[i, j] == playerNum) {
  cou++;
  i--;
  j++;
}
i = chessBt.btnPosX + 1;
j = chessBt.btnPosY - 1;
while (playerNameTmp[i, j] == playerNum) {
  cou++;
  i++;
  j--;
}
if (cou == winChessNum - 1) ifPlayerWin();
```

### 设置暂存

再次打开游戏时，棋盘大小和设置不会改变

```csharp
private void Form1_FormClosed(object sender, FormClosedEventArgs e) {
  Properties.Settings.Default.playerCou = playerCnt;
  Properties.Settings.Default.winChessNum = winChessNum;
  Properties.Settings.Default.formWidth = Width;
  Properties.Settings.Default.formHeight = Height;
  if (WindowState == FormWindowState.Maximized) Properties.Settings.Default.ifMaximize = true;
  else Properties.Settings.Default.ifMaximize = false;
  Properties.Settings.Default.Save();
}
```

### 存档

采用**Base64**编码存档

```csharp
string outputData = Height.ToString() + "\n" + Width.ToString() + "\n" + playerCnt.ToString() + "\n" + winChessNum.ToString() + "\n" + playerNum.ToString() + "\n" + playedChessCnt.ToString() + "\n";
if (WindowState == FormWindowState.Maximized) outputData += "true";
else outputData += "false";
for (int i = 1; i <= rowNum; i++) {
  for (int j = 1; j <= columnNum; j++) {
    if (playerNameTmp[i, j] != 0) {
      outputData += "\n" + playerNameTmp[i, j].ToString();
      outputData += "\n" + i;
      outputData += "\n" + j;
    }
  }
}
File.WriteAllText(sfd.FileName, Convert.ToBase64String(Encoding.UTF8.GetBytes(outputData)));
```

## 后记

本来是作为班级**娱乐活动**放到学校**大屏幕**上玩的，但后来被**班主任**删了 QwQ
