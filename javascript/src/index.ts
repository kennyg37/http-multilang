import net from 'node:net'

const server = net.createServer((c) => {
    console.log('client connected')
    c.on('end', () => {
        console.log("client disconnected")
    })
    c.write(httpHeader, () => {
        setTimeout(() =>{
            c.end()
        }, 3000)
    })
    c.pipe(c)
    c.on('data', (data) => {
        console.log(data.toString())
        return data.toString()
    })
})

server.on('error', (err) => {
    throw err
})

server.listen(5000, 'localhost', () => {
    console.log("server bounded")
})



const httpHeader = "HTTP/1.1 200 OK\r\n"+"Content-Type: text/plain\r\n"+"Content-Length:12\r\n"+"\r\n"+"Hello world"+"\n"



