---
title: 'Prisma 多次操作导致的连接器超时问题解决'
date: '2021-10-02 09:38:14'
tags: ['code', 'prisma', 'error', 'bug', 'async', 'promise']
language: 'zh-cn'
description: '在使用 Prisma 时，多次操作使用 Promise.all 可能会导致连接器超时'
---

问题复现详见 [Prisma#9465](https://github.com/prisma/prisma/issues/9465)

首先我们有一个 orders 数组

```ts
const orders = [
  { id: 2, order: 5 },
  { id: 3, order: 4 },
];
```

我想做每次都按照 id 查询然后修改值的操作。由于是异步，很自然地想到了`Promise.all`

```ts
await Promise.all(
  orders.map(({ id, order }) => {
    return prisma.friend.update({
      where: { id },
      data: { order },
    });
  }),
);
```

然后就抛 Error 了

```
Error:
Invalid `prisma.friend.update()` invocation:
Error occurred during query execution:
ConnectorError(ConnectorError { user_facing_error: None, kind: ConnectionError(Timed out during query execution.) })
```

于是我就想到了`orders.forEach`，但是**forEach 也是同步的**

所以正解应该用`for`

```ts
for (const { id, order } of orders) {
  await prisma.friend.update({
    where: { id },
    data: { order },
  });
}
```
