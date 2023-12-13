import fs from 'fs' // ESM

fs.writeFile('test.txt', 'Hello World', (err) => {
    if (err) console.log(err)
    else console.log('terminé')
})

fs.readFile('test.txt', 'utf-8', (err, data) => {
    console.log(data)
})

const bool = fs.existsSync('test.txt')

console.log('test')