import net from 'node:net'
import { FormatResponse } from './data.formatter.js'
import { RouteHandler, HttpMethod } from './route.handler.js'


const createHeader = (statusCode: number, message: string, contentType: string, contentLength: number, body: any): string => {
    return `HTTP/1.1 ${statusCode} ${message}\r\n` +
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

        console.log(data)

        let dataStore: Record<string, any> = {}
        
        const formatter = new FormatResponse(data, dataStore)
        const path = formatter.getPath()

        const routeHandler = new RouteHandler(path || '', (formatter.getMethod() || 'GET') as HttpMethod, {
            paths: {
                '/home': { method: 'GET', body: 'Welcome to the home page!' },
                '/about': { method: 'GET', body: 'This is the about page.' }
            }
        })
        
        formatter.populateHeaders()
        const browser = formatter.lookupValues("user-agent")
        const host = formatter.lookupValues("host")

        const reqEval = routeHandler.evaluate()
        const reqBody = routeHandler.routes.paths[`${path}`]?.body + ` your browser is ${browser} and the host is${host}`
        let httpHeader;
        let statusCode = 200
        if(!reqEval) {
            statusCode = 400
            httpHeader =createHeader(statusCode, 'Not Found', 'text/plain', 10, "Not found")
        } else if(reqEval && reqBody) {
            httpHeader = createHeader(statusCode, 'OK', 'text/plain', formatter.countBytes(reqBody), `${reqBody}`)
        } else {
            httpHeader = createHeader(statusCode, 'OK', 'text/plain', 20, `${reqBody}`)
        }

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



