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
# 环境变量
不管是 windows 还是 linux 系统，都有一些值来指定当前系统的运行配置，在 linux 或者 mac 下面有一个 printenv 命令就能查看当期系统的环境参数
```
hellojukay@local nodejs-command-line (main) $ printenv
SHELL=/bin/bash
SESSION_MANAGER=local/local:@/tmp/.ICE-unix/3704,unix/local:/tmp/.ICE-unix/3704
WINDOWID=12582916
COLORTERM=truecolor
XDG_CONFIG_DIRS=/etc/xdg
XDG_SESSION_PATH=/org/freedesktop/DisplayManager/Session0
XDG_MENU_PREFIX=xfce-
GTK_IM_MODULE=fcitx
LC_ADDRESS=zh_CN.UTF-8
JAVA_HOME=/usr/lib/jvm/default-runtime/
LC_NAME=zh_CN.UTF-8
```
我们可以通过这些环境变量来控制系统或者程序的行为。

## PATH 环境变量
`$PATH` 是一个文件夹数组，默认情况下系统会到 `$PATH` 环境变量所处的文件夹中寻找命令行，如果你的命令不在 `$PATH` 中，那么就无法在全局调用该命令，
```
hellojukay@local nodejs-command-line (main) $ echo "$PATH" | tr ":" "\n" | nl
     1	/home/hellojukay/.local/bin
     2	/home/hellojukay/.local/bin
     3	/usr/local/bin
     4	/usr/bin
     5	/bin
     6	/usr/local/sbin
     7	/usr/lib/jvm/default/bin
     8	/usr/bin/site_perl
     9	/usr/bin/vendor_perl
    10	/usr/bin/core_perl
    11	/var/lib/snapd/snap/bin
    12	/usr/lib/jvm/default/bin
    13	/opt/kotlin-native-prebuilt-linux-1.4.20/bin
    14	/opt/node-v10.23.0-linux-x64/bin/
    15	/home/hellojukay/.local/bin
    16	/bin
    17	/home/hellojukay/bin
    18	/home/hellojukay/.cargo/bin
    19	/home/hellojukay/github/bashrc/tools
    20	/home/hellojukay/.local/bin
    21	/home/hellojukay/go/bin
    22	/home/hellojukay/github/bashrc/tools
```
我们也可以通过 `export` 命令将指定的目录添加到 `PATH` 中
```
export $PATH=$PATH:/home/mydir
```
这样我们就能在全局调用 `/home/mydir` 中的命令了.

# 命令行参数
我们在命令行运行程序的时候可以给程序指定命令行参数
```
command arg1  arg2 arg3
```
默认情况下 arg0 表示当前程序本身
# 输入和输出
在命令行下输出叫做标准输出 stdin，通过 stdin 能够和命令行交互，输出有 stdout 和 stderr, 这个三分别是
* 标准输入
* 标准输出
* 标准错误输出

如果程序想标准错误输出中输出了数据，则说明程序执行报错了，默认情况下，标准输出和标准错误输出都是屏幕。
# 返回值
脚本的返回值决定了脚本的运行状态，如果脚本返回了 0 则表示脚本执行成功，返回非0则表示脚本执行异常