import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
    const url = req.url
    const fileName = url == '/' ? 'index.html' : ''
    const bool = fs.existsSync(fileName)

    if (bool) {
        fs.readFile(fileName, 'utf-8', (err, data) => {
            if (err)  res.writeHead(500)
            else res.end(data)
        })
    }
    else {
        res.writeHead(404)
        res.end('Page non trouvée')
    }
    
})

server.listen(3000, () => {
    console.log('Serveur tourne bien sur le port 3000')
})