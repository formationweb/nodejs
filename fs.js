//const fs = require('fs') // cjs
import fs from 'fs'
//import { add } from './math'

fs.writeFile('./test.txt', 'hello world', () => {
    console.log('terminé')
})

fs.readFile('./test.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err.message)
        return
    }
    console.log(data)
})
