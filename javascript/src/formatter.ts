export class FormatResponse{
    private data: string[]
    constructor(dataArr: string[]){this.data = dataArr}

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
}
