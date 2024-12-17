import http from 'http'

const port = 3000

const server = http.createServer((req, res) => {
    console.log(
        req.headers,
        req.method,
        req.url
    )
    
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end('<h1>Hello World</h1>')
})

server.listen(port, () => {
    console.log('serveur démarre sur le port', port)
})