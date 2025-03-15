# 一个 vue 的快速创建命令

## 安装

```base
npm i cmd-v3 -g

cv -V 或 cv --version  //查看版本
```

## 用法

    1.根据当前命令行下进行文件的创建，例如输入命令的文件路径为/user/xxx/code 则在该文件夹下创建文件（以下统称命令行目录）

```bash

cv index   //在命令行目录下创建index.vue

cv all  //读取命令行文件下cvSetting.json文件 批量创建vue组件

```

```json
json案例
{
    "base":"",//创建vue文件公共路径， 在命令路径基础上加 开头不需要写/ 如 src/view
    "more":["inde","home"] //批量创建文件的数组如会根据命令路径➕base路径下创建index.vue与home.vue
}
```
