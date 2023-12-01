# UNCSCAN

utility scan explorer

## Initialize Running Env

install node check version（Exp: v18.0）

``` shell
node -v
```

install npm check version（Exp: v8.6.0）

``` shell
npm -v
```

install vue3.2 check version（Exp: v5.0.8）

``` shell
vue --version
```
## Launch
npm install dependencies

``` shell
npm install
```
execute in the project directory

``` shell
npm run dev
```

## Release
Build production
``` shell
npm run build
```

## Other
Preview the release environment effects

``` shell
npm run preview
```
Preview the release environment effects, Static resource analysis

``` shell
npm run preview -- --report
```
format check & fix

``` shell
npm run lint -- --fix
```
## Install failure solution
Delete node modules from the project directory
``` shell
npm cache clean (choosable)
npm i --legacy-peer-deps
```

## Configure the axios default request address
default
``` dotenv
VITE_API_BASE_URL= 'http://localhost:8080'
```
operation
``` dotenv
VITE_API_BASE_URL= 'http://your ip: your port'
``` 

## Vite serve configuration
``` typescript
 {
    mode: 'development',
    server: {
      open: true, // Whether to open by default after startup
      open: false,
      fs: {
        strict: true,
      },
      host: '0.0.0.0', // Add host configuration to expose ip access via LAN
  }
```

