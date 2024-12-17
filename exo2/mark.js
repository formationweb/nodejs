import fs from 'node:fs/promises'
import path from 'node:path'

const dirname = import.meta.dirname

async function processDirectory(dir) {
    const files = await fs.readdir(dir, { recursive: true })
    for (let pathFile of files) {
        const inputFile = path.join(dirname, dir, pathFile)
        const pathInfo = await fs.stat(inputFile)
        if (pathInfo.isDirectory()) {
            console.log('un répertoire')
        }
        else {
            const ext = path.extname(inputFile)
            if (ext == '.md') {
                console.log('md')
            }
            else if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                console.log('image')
            }
        }
    }
}

processDirectory('files')