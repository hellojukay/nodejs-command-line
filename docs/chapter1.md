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
# 输入和输出
linux 里面一切都是文件操作，包括输入和输出都是可以认为在对文件操作.使用文件句柄来操作文件，文件句柄是一个非负的数字，所有程序在读取任何磁盘文件的情况下都默认的打开了三个文件句柄`0,1,2`他们对应分别是
* 0 -> 标准输出
* 1 -> 标准输出
* 2 -> 标准错误输出

标准输出默认来自键盘的输出，标准输出和标准错误输出默认都是向当前屏幕终端输出，当然这三个文件都可以被重写，我们可以标准输出从文件读取，也可以设置标准输出写入到文件中。
# 错误输出
标准错误输出和标准输出默认都是输出到当前屏幕，当程序有异常或者有报错的时候，我们应该将错误信息输出到标准错误输出而不是标准输出
# 管道
在 linux 里面，我们可以将一个命令的输出当成另外一个命令的输出，这个是通过管道符号 `|` 实现的，比如我们将 `printev` 的输出通过管道服符传给 `grep` 命令
```bash
hellojukay@local nodejs-command-line (main) $ printenv | grep SHELL
SHELL=/bin/bash
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
## 几个特殊的环境变量
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
## shell的自动扩展参数
这里有一个特别有意思的事情，当我们执行某个命令的时候，如果参数中包含了shell通配符或者取只的符号，shell会我们自动展开参数
```
export N=100
echo $n
```
这里 echo 命令的第一个参数其实不是`$N` 而是 100，这个通过是由 shell 完成的，而不是 echo 命令完成的。
# 返回值
脚本的返回值决定了脚本的运行状态，如果脚本返回了 0 则表示脚本执行成功，返回非0则表示脚本执行异常。在shell脚本中通过 `exit` 命令来主动返回:
```
exit 0
```
