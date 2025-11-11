import net from 'node:net'
import { FormatResponse } from './formatter'


const createHeader = (statusCode: number, contentType: string, contentLength: number, body: any): string => {
    return `HTTP/1.1 ${statusCode} OK\r\n` +
           `Content-Type: ${contentType}\r\n` +
           `Content-Length: ${contentLength}\r\n` +
           `\r\n` +
           `${body}`+
           `\n`
}


const server = net.createServer((c) => {
    console.log('client connected')
    c.on('end', () => {
        console.log("client disconnected")
    })
    
    c.on('data', (e) => {
        const data = parseData(e)
        
        const formatter = new FormatResponse(data)
        
        const method = formatter.getMethod()
        const path = formatter.getPath()
        const protocol = formatter.getProtocol()
        const httpHeader = createHeader(200, 'text/plain', 40, `you are ${method}ing at ${path} with ${protocol}`)
        c.write(httpHeader, ()=>{
            setTimeout(() => {
                c.end()
            }, 3000)
        })
    })
})

server.on('error', (err) => {
    throw err
})

server.listen(5000, 'localhost', () => {
    console.log("server bounded")
})


const parseData = (data: Buffer) => {
    const result =data.toString()
    const resultArray = result.split("\r\n")
    return resultArray
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

class RouteHandler {
  constructor(
    private path: string,
    private method: HttpMethod
  ) {}

  
}

