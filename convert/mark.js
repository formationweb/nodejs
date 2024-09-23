import markdown from 'markdown-it'
import fs from 'fs/promises'
import path from 'path'

const md = markdown()
const __dirname = path.dirname(new URL(import.meta.url).pathname);
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

async function existsAndCreate(outputDir) {
    const bool = await existsDir(outputDir)
    if (!bool) await fs.mkdir(outputDir, { recursive: true })
}

const assetsDir = path.join(outputDir, 'assets')
await existsAndCreate(outputDir)
await existsAndCreate(assetsDir)

async function processDirectory(dir) {
    const files = await fs.readdir(dir, { recursive: true })
    for (let pathFile of files) {
        const inputFile = path.join(__dirname, inputDir, pathFile)
        const pathInfo = await fs.stat(inputFile)
        if (pathInfo.isDirectory()) {
            const outputDirPath = path.join(__dirname, outputDir,pathFile)
            await fs.mkdir(outputDirPath, { recursive: true })
        }
        else {
            const ext = path.extname(inputFile)
            if (ext == '.md') {
                const content = await fs.readFile(inputFile, 'utf8')
                const html = md.render(content)
                const outputFilePath = path.join(
                    __dirname, 
                    outputDir, 
                    pathFile.replace(/\.md$/, '.html')
                )
                await fs.writeFile(outputFilePath, html)
            }
            else if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                const outputFilePath = path.join(
                    __dirname, 
                    outputDir, 
                    'assets',
                    pathFile
                )
                await fs.copyFile(inputFile, outputFilePath)
            }
        }
    }
}

await processDirectory(inputDir)

console.log('Conversion terminée')