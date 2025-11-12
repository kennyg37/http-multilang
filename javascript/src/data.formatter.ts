export class FormatResponse{
    private data: string[]
    private dataStore: Record<string, any> = {}
    constructor(dataArr: string[], datastore: Record<string, any>){
        this.data = dataArr, 
        this.dataStore = datastore
    }

    getReqParams(){
        const reqArr = this.data[0]
        if (reqArr){
            return reqArr
        } else {
            return null
        }
    }

    getMethod() {
        const paramArr = this.getReqParams()
        let method;
        if (paramArr) {
            method = paramArr.split(" ")[0]
            return method
        } else {
            return null
        }
    }

    getPath() {
        const paramArr = this.getReqParams()
        let path;
        if (paramArr) {
            path = paramArr.split(" ")[1]
            return path
        } else{
            return null
        }
    }

    getProtocol() {
        const paramArr = this.getReqParams()
        let reqprotocol;
        if (paramArr) {
            reqprotocol = paramArr.split(" ")[2]
            return reqprotocol
        } else{
            return null
        }
    }

    countBytes(body: string) {
        const Length = body.length + 1
        return Length
    }

    getHeaders(){
        const headArr = this.data.slice(1)
        return headArr
    }

    populateHeaders(){
        const headers = this.getHeaders()
        let key: string | undefined
        let data: string[]
        headers.forEach((item) => {
            const splitItem = item.split(":")
            key = splitItem[0]?.toLocaleLowerCase()
            data = splitItem.slice(1)
            if (splitItem && key) {
                this.dataStore[key] = data
                return
            } else{
                return "no data found"
            }
        })

        return this.dataStore
    }

    lookupValues(value: string){
        const store = this.dataStore
        if (value in store) {
            return store[value]
        } else {
            return " header does not exist" 
        }

    }
    
}
