# qyp-portal 穷游派前端


### 1.使用nvm进行 node 版本管理

首先clone nvm的代码库

~~~
git clone https://github.com/creationix/nvm.git ~/.nvm
~~~

然后打开`~/.bashrc`,添加

~~~
source ~/.nvm/nvm.sh
~~~

然后执行

~~~
source ~/.bashrc
~~~

安装node5.0.0版本

~~~
nvm install v5.0.0
~~~


### 2.工程安装&启动

进入工程目录

~~~
npm install
~~~

 
应用程序启动

~~~
NODE_ENV=local node --harmony bin/app.js
~~~


127.0.0.1:3002


### 3.资料

- [koa教程](http://koa.bootcss.com/)


### 4.环境说明

- 日常环境

编译部署用户名 node-dev

代码路径:~/qyp-portal/ 重新部署命令 bash ./reactor.sh

访问域名:http://test.dream623.com
只能通过域名访问


- 线上环境

编译部署用户名 node

代码路径:~/qyp-portal/ 重新部署命令 bash ./reactor.sh

访问域名:http://www.dream623.com  公众号入口可用

### 5.代码说明

- 前端样式统一使用weui的风格
- DB访问层在model里面完成,提供生成器风格的接口
- 所有的异步操作依赖KOA 的yield,能够编写同步风格的代码
- callback 格式的异步操作会先封装成promise
- wxpay是微信支付的组件,wepay 是对他做了进一步包装

### 6.领域模型
- member 记录用户的信息
- activity 活动内容
- signup 报名信息
