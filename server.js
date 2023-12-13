import http from 'http'

const server = http.createServer((req, res) => {
    console.log(req.headers)
    res.writeHead(500)
    res.end('Test')
})

server.listen(3000, () => {
    console.log('Serveur tourne bien sur le port 3000')
})