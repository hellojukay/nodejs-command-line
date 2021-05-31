#!/usr/bin/env node
const process = require('process')
const flag = require('flags')

flag.defineString('name','licong','your name')
flag.parse()

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
})


console.info('my name is %s\n',flag.get('name'))
