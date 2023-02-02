---
title: '如何在 CentOS 中部署远程 PostgreSQL'
date: '2022-1-27'
tags: ['website', 'database', 'postgresql', 'centos', 'linux']
language: 'zh-cn'
description: '想在服务器上部署后端，但是 PostgreSQL 数据库连接遇到好多坑，总结一下'
---

## 安装

查找可用的 PostgreSQL 版本

```bash
dnf module list postgresql
```

安装

```bash
sudo dnf module enable postgresql:12
```

安装其他依赖

```bash
sudo dnf install postgresql-server
```

## 初始化

```bash
sudo postgresql-setup --initdb
```

## 启动服务

启动

```bash
sudo systemctl start postgresql
```

设置为服务 (开机自启动)

```bash
sudo systemctl enable postgresql
```

## 创建用户

登录 PostgreSQL 默认用户并创建用户

```bash
sudo -u postgres createuser --interactive
```

## 设置用户密码

使用数据库管理员账户登录 psql 命令行

```bash
sudo -u postgres psql
```

设置密码(psql 中输入)

```
\password <用户名>
```

退出 psql

```
\q
```

## 允许远程连接

找到 `postgresql.conf` 和 `pg_hba.conf`

> 一般在`/var/lib/pgsql/data`中 地址可能稍有出入

### `postgresql.conf`

开启远程连接和设置端口

```
listen_addresses = '*'
port = <端口>
```

### `pg_hba.conf`

允许远程访问

```
host all all 0.0.0.0/0 md5
```

## 重启服务

```bash
sudo systemctl reload postgresql
```

## 备注

如果安全组开端口了还是访问不了, 多半是内置的 `iptables` 把端口 ban 了

```bash
iptables -I INPUT -p tcp -m tcp --dport <端口> -j ACCEPT
```

## 参考

[How To Install and Use PostgreSQL on CentOS 8 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-centos-8)

[Configure PostgreSQL to allow remote connection | BigBinary Blog](https://www.bigbinary.com/blog/configure-postgresql-to-allow-remote-connection)

[FATAL: password authentication failed for user "postgres" (postgresql 11 with pgAdmin 4) - Stack Overflow](https://stackoverflow.com/questions/55038942/fatal-password-authentication-failed-for-user-postgres-postgresql-11-with-pg)

[php - connect to PostgreSQL server: FATAL: no pg_hba.conf entry for host - Database Administrators Stack Exchange](https://dba.stackexchange.com/questions/83984/connect-to-postgresql-server-fatal-no-pg-hba-conf-entry-for-host)

[Allow web traffic in iptables software firewall -](https://docs.rackspace.com/support/how-to/allow-web-traffic-in-iptables/)
