#!/usr/bin/env node
const process = require('process')
const flag = require('flags')

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
})


flag.defineString('name','licong','your name')
flag.parse()

console.info('my name is %s\n',flag.get('name'))
