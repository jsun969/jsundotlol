---
title: 'React Native Canvas 中使用 toDataUrl'
date: '2021-10-05'
tags: ['code', 'canvas', 'react native']
language: 'zh-cn'
description: '使用 react-native-canvas 保存图片的时候遇到了一个非常离谱的问题'
---

最近在用 React Native 写一个给头像加国旗的 App，主要是参加~~水~~个竞赛，详见  
[jsun969/chinese-flag-avatar-builder](https://github.com/jsun969/chinese-flag-avatar-builder)

因为涉及到了图像处理，React Native 并不能使用原生的 DOM，于是找到了这个项目  
[iddan/react-native-canvas](https://github.com/iddan/react-native-canvas)

因为他的操作和原生 canvas 很相似~~所以就没写文档~~，导致用下来的感觉就是 **~~别的库读文档，这个库读 Issues~~**

我需要把操作完的 canvas 导出成 base64，首先想到了的是原生的`canvas.toDataUrl()`。  
事与愿违，首先他这个调用是异步的，而且如果用的话会报一个`The operation is insecure`的错

既然你**insecure**，那八成是`crossOrigin`炸了，看了一下[react-native-canvas#143](https://github.com/iddan/react-native-canvas/issues/143)，加了一句

```ts
img.crossOrigin = 'anonymous';
```

然后就遇到了另一个问题，图片**不显示**了

继续翻 Issue，找到了这么个 comment  
[react-native-canvas#77#821788006](https://github.com/iddan/react-native-canvas/issues/77#issuecomment-821788006)

最后用 expo 自带的转换器把图片转换成 base64，就显示了

```ts
const [{ localUri }] = await Asset.loadAsync(frameImages[frameIndex]);
const frameBase64 = await FileSystem.readAsStringAsync(localUri!, {
  encoding: FileSystem.EncodingType.Base64,
});
frame.src = `data:image/png;base64,${frameBase64}`;
```
