//const fs = require('fs') // cjs
import fs from 'fs/promises'
//import { add } from './math'

// fs.writeFile('./test.txt', 'hello world', () => {
//     console.log('terminé')
// })

// fs.readFile('./test.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.log(err.message)
//         return
//     }
//     console.log(data)
// })

try {
    await fs.writeFile('./test.txt', 'hello world')
    const data = await fs.readFile('./test.txt', 'utf8')
    console.log(data)
}
catch (err) {
    console.log(err)
}