---
title: '带邀请码注册登陆开发笔记'
date: '2021-03-27'
tags: ['code', 'node.js', 'vue', 'web', 'register', 'login']
language: 'zh-cn'
description: 'from 螓首蛾眉'
---

GitHub: <https://github.com/jsun969/PigeonServer>

最近在写研究课项目**飞鸽传书**，其中的**注册登陆**被我搞了好久，用这篇文章记录一下  
看下**效果**(前端样式用了**Vuetify**，吹爆**Materical Design**)

![](/blog/dai-yao-qing-ma-zhu-ce-deng-lu-kai-fa-bi-ji/image.png)

登录界面

![](/blog/dai-yao-qing-ma-zhu-ce-deng-lu-kai-fa-bi-ji/image-1.png)

登陆完了

## 后端

好像都是**柯灰**大佬推荐的

### Mongoose

上次用了 mongodb 原生的包，不太爽，于是换成了 Mongoose

```js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema);
```

用户信息模板

```js
router.post('/register', async (req, res) => {
  try {
    const doc = await User.findOne({ username: req.body.username });
    if (!doc) {
      const codeDoc = await InviteCode.findOneAndUpdate(
        { code: req.body.inviteCode },
        { username: req.body.username },
      );
      if (!codeDoc) {
        console.log(
          `User [ ${req.body.username} ] try to register, but the invite code is wrong.`,
        );
        res.status(404).json({ error: 'InviteCodeNotFound' });
      } else if (codeDoc.username) {
        console.log(
          `User [ ${req.body.username} ] try to register, but the invite code has been used.`,
        );
        res.status(404).json({ error: 'InviteCodeIsUsed' });
      } else {
        const user = new User({
          username: req.body.username,
          password: crypto
            .createHash('sha256')
            .update(req.body.password)
            .digest('hex'),
        });
        userRes = await user.save();
        console.log(`User [ ${userRes.username} ] register successfully!`);
        res.sendStatus(200);
      }
    } else {
      console.log(`User [ ${req.body.username} ] has already registered.`);
      res.status(404).json({ error: 'DuplicateUsername' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
```

注册(好像有些代码冗余)

### JsonWebToken

代替 Session 做用户存储，不占我数据库 2333

```js
router.post('/login', async (req, res) => {
  try {
    const doc = await User.findOne({
      username: req.body.username,
      password: crypto
        .createHash('sha256')
        .update(req.body.password)
        .digest('hex'),
    });
    if (doc !== null) {
      console.log(`User [ ${req.body.username} ] login successfully.`);
      const token = jwt.sign({ userId: doc._id }, cfg.token.secret, {
        expiresIn: cfg.token.maxAge,
      });
      res.json({ token });
    } else {
      console.log(`User [ ${req.body.username} ] login error.`);
      res.status(404).json({ error: 'LoginError' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
```

登陆成功即发送 Token

```js
router.post('/token-verify', async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.auth, cfg.token.secret);
    const { username } = await User.findById(decoded.userId);
    console.log(`User [ ${username} ] login with token successfully.`);
    res.json({ username });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});
```

验证用户 Token

## 前端

没啥**新**的其实，记录一点**语法糖**吧

### 解构赋值

**峰神**教的，针不戳

```js
async function login() {
  if (this.isLoginBtnDisabled) return;
  try {
    const { loginName: username, loginPwd: password } = this;
    const userData = { username, password };
    const { status, data } =
      (await axios.post(`${this.$store.state.reqUrl}/user/login`, userData)) ||
      {};
    if (status === 200) {
      this.$emit('login-success', username);
      localStorage.setItem('userToken', data.token);
    }
  } catch ({
    response: {
      status,
      data: { error },
    },
  }) {
    if (status === 404) {
      this.$emit('login-error');
    } else if (status === 500) {
      this.$emit('server-error', error.code);
    }
  }
  this.loginName = '';
  this.loginPwd = '';
}
```

登陆请求

### async...await

本来有点**一知半解**的

```js
async function created() {
  try {
    const {
      status,
      data: { username },
    } =
      (await axios.post(`${this.$store.state.reqUrl}/user/token-verify`, {
        auth: localStorage.getItem('userToken'),
      })) || {};
    this.isLogin = status === 200;
    this.loginUsername = username;
  } catch (error) {
    return;
  }
}
```

验证本地 Token
