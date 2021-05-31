# SheBang
在 `linux` 以及其他的类 unix 操作系统里面，在脚本文件第一行用 `#!`

```bash
#!/bin/bash
echo hello world
```
这里指定了使用 `/bin/bash` 来解释执行当期的脚本内容，同样的我们也可以使用 `nodejs` 来解释执行当前的脚本文件
```bash
#!/opt/node-v10.23.0-linux-x64/bin/node
console.log("hello world")
```
或者我们这样写
```bash
#!/usr/bin/env node
console.log("hello world")
```
当我们编写好了文件以后保存为 [hello.js](../src/hello.js) ,然后给文件添加上可执行权限，就能直接执行了
```
chmod +x src/hello.js
hellojukay@local nodejs-command-line (main) $ src/hello.js 
hello world
```
## 参考信息:
    * https://en.wikipedia.org/wiki/Shebang_(Unix)