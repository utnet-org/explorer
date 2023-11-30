# UNCSCAN

utility scan explorer

## 初始化运行环境

安装node 并检查（Exp: v18.0）

``` shell
node -v
```

安装npm 并检查（Exp: v8.6.0）

``` shell
npm -v
```

安装vue 并检查（Exp: v5.0.8）

``` shell
vue --version
```
## 启动
npm安装依赖

``` shell
npm install
```
cd到工程目录下执行

``` shell
npm run dev
```

## 发布
构建生产环境
``` shell
npm run build
```

## 其它
预览发布环境效果

``` shell
npm run preview
```
预览发布环境效果 + 静态资源分析

``` shell
npm run preview -- --report
```
代码格式检查

``` shell
npm run lint
```
代码格式检查并自动修复

``` shell
npm run lint -- --fix
```
## npm install 失败解决办法
删除project目录下的node_modules
``` shell
npm cache clean (可选)
npm i --legacy-peer-deps
```

## 配置axios默认请求地址
默认
``` dotenv
VITE_API_BASE_URL= 'http://localhost:8080'
```
自定义
``` dotenv
VITE_API_BASE_URL= 'http://your ip: your port'
``` 

## vite 启动服务配置
``` typescript
 {
    mode: 'development',
    server: {
      open: true, // 启动后是否默认打开
      open: false,
      fs: {
        strict: true,
      },
      host: '0.0.0.0', // 加上host配置即可暴露ip通过局域网访问
  }
```

