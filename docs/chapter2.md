# 命令行参数处理
Node.js 的标准库 `process` 包就能简单的处理命令行传过来的参数，[代码](../src/args.js)如下：
```
#!/usr/bin/env node
const process = require('process')

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
```
```
hellojukay@local nodejs-command-line (main) $ node src/args.js hello world
0: /opt/node-v10.23.0-linux-x64/bin/node
1: /home/hellojukay/github/nodejs-command-line/src/args.js
2: hello
3: world
```
通过 `node` 命令执行脚本，脚本的第一个参数就是`node`本身，第二参数是当前的脚本文件的文件路径`/home/hellojukay/github/nodejs-command-line/src/args.js`,同样的直接运行`src/args.js`文件也是
```
hellojukay@local nodejs-command-line (main) $ chmod +x src/args.js
hellojukay@local nodejs-command-line (main) $ src/args.js hello world
0: /opt/node-v10.23.0-linux-x64/bin/node
1: /home/hellojukay/github/nodejs-command-line/src/args.js
2: hello
3: world
```
## 命令行选项
默认情况下，程序是不能识别命令行选项的，我们可以通过一些三方的库来解析命令行参数,这里用的是
```
https://github.com/dpup/node-flags
```
```
#!/usr/bin/env node
const process = require('process')
const flag = require('flags')

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
})


flag.defineString('name','licong','your name')
flag.parse()

console.info('my name is %s\n',flag.get('name'))
```
这样程序就能失败参数`--name`了
```
hellojukay@local nodejs-command-line (main) $ src/flag.js --name=hellojukay
0: /opt/node-v10.23.0-linux-x64/bin/node
1: /home/hellojukay/github/nodejs-command-line/src/flag.js
2: --name=hellojukay
my name is hellojukay
```
稍加处理，还能输出帮助选项
```
#!/usr/bin/env node
const process = require('process')
const flag = require('flags')

flag.defineString('name','licong','your name')
flag.parse()

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
})


console.info('my name is %s\n',flag.get('name'))
```
在我们执行`--help`的时候输出了帮助信息
```
hellojukay@local nodejs-command-line (main) $ node src/help.js --help
Usage: node help.js [options]

Options:
  --name: your name
    (default: "licong")
```
# 处理环境变量
`Node.js`的标准库的`process`包就能处理环境变量，这里输出所有的环境变量
```
#!/usr/bin/env node

const process = require('process')

Object.keys(process.env).forEach((key) => {
    console.info("%s=>%s",key.padEnd(30),process.env[key])
})
```
也能设置程序的环境变量
```
process.env['HOST_PATH'] = '/opt/'
```

# 输出和终端
如果我们需要输出日志到终端，直接使用 `console.log`就可以了，也可以使用底层的实现`process`包
```
const process = require('process')
process.stdout.write(message)
```
或者输出到标准错误输出
```
const process = require('process')
process.stderr.write(message)
```
## 非打印字符
有的字符能直接输出到屏幕上，或者输出到打印机器上，但是有的字符是无法打印的,他们用来控制计算机的行为，比如'\a'这个字符会蜂鸣器报警。一些常用的非打印字符:
* \n 换行
* \t 制表符
* \r 光标回到行首
* \b 光标退格

# 信号处理
