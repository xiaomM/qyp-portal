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
nvm i v5.0.0
~~~


### 2.工程安装&启动

进入工程目录

~~~
npm install
~~~

 
应用程序启动

~~~
NODE_ENV=local node --harmony app.js
~~~


127.0.0.1:3002
