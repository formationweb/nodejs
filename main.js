import http from 'http'
import fs from 'node:fs/promises'
import path from 'path'

const port = process.argv[2] || 3000
const dirname = import.meta.dirname // le dossier où se trouve main.js

const server = http.createServer(async (req, res) => {
    if (req.url == '/') {
        // fs.readFile(path.join(dirname, 'static', 'index.html'), 'utf8', (err, data) => {
        //     if (err) {
        //         res.writeHead(500)
        //         res.end(err.message)
        //         return
        //     }
        //     res.writeHead(200, {
        //         'Content-Type': 'text/html'
        //     })
        //     res.end(data)
        // })
        try {
            const data = await fs.readFile(path.join(dirname, 'static', 'index.html'), 'utf8')
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.end(data)
        }
        catch (err) {
            res.writeHead(500)
            res.end(err.message)
        }
    }
    else {
        res.writeHead(404)
        res.end('Page non trouvée')
    }
})

server.listen(port, () => {
    console.log('serveur démarre sur le port', port)
})


