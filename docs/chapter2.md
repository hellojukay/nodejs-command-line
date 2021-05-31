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

# 输出和终端

# 信号处理
