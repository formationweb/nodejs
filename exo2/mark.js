import fs from 'node:fs/promises'
import path from 'node:path'
import markdown from 'markdown-it'

const dirname = path.dirname(new URL(import.meta.url).pathname)
const args = process.argv
const inputDir = args[2]
const outputDir = args[3] || 'dist'
const md = markdown()

/**
 * fs.copyFile(inputFile, outputFilePath)
 * fs.readFile(inputFile, 'utf8')
 * fs.mkdir(outputDirPath, { recursive: true })
 * 
 */

await fs.mkdir(
    path.join(dirname, outputDir),
    { recursive: true }
)

async function processDirectory(dir, outputDir) {
    const files = await fs.readdir(dir, { recursive: true })
    for (let pathFile of files) {
        const inputFile = path.join(dirname, dir, pathFile)
        const pathInfo = await fs.stat(inputFile)
        if (pathInfo.isDirectory()) {
            const outputDirPath = path.join(dirname, outputDir, pathFile)
            await fs.mkdir(outputDirPath, { recursive: true })
        }
        else {
            const ext = path.extname(inputFile)
            if (ext == '.md') {
                const content = await fs.readFile(inputFile, 'utf-8')
                const html = md.render(content)
                const outputFilePath = path.join(
                    dirname, 
                    outputDir, 
                    pathFile.replace(/\.md$/, '.html')
                )
                await fs.writeFile(outputFilePath, html)
            }
            else if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                const outputFilePath = path.join(
                    dirname, 
                    outputDir, 
                    pathFile
                )
                await fs.copyFile(inputFile, outputFilePath)
            }
        }
    }
}

await processDirectory(inputDir, outputDir)

console.log('Conversion terminée')