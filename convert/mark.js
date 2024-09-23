import markdown from 'markdown-it'
import fs from 'fs/promises'
// const md = markdown()

// console.log(md.render('# Test'))

const args = process.argv
const inputDir = args[2]
const outputDir = args[3] || 'dist'

if (!inputDir) {
    console.log('Enter input directory')
    process.exit()
}

async function existsDir(dir) {
    try {
        await fs.stat(dir)
        return true
    }
    catch (err) {
        if (err.code == 'ENOENT') {
            return false
        }
    }
}

const bool = await existsDir(outputDir)
if (!bool) await fs.mkdir(outputDir, { recursive: true })

async function processDirectory(dir) {
    const files = await fs.readdir(dir)
    console.log(files)
}

await processDirectory(inputDir)

console.log('Conversion terminée')