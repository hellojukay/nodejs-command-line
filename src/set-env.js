#!/usr/bin/env node

const process = require('process')

process.env['HOST_PATH'] = '/opt/'



Object.keys(process.env).forEach((key) => {
    console.info("%s=>%s",key.padEnd(30),process.env[key])
})
