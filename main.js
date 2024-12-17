import http from 'http'
import fs from 'fs'
import path from 'path'

const port = 3000
const dirname = import.meta.dirname // le dossier où se trouve main.js

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        fs.readFile(path.join(dirname, 'static', 'index.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500)
                res.end(err.message)
                return
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.end(data)
        })
    }
    else {
        res.writeHead(404)
        res.end('Page non trouvée')
    }
})

server.listen(port, () => {
    console.log('serveur démarre sur le port', port)
})


