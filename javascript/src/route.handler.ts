export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Route {
    method: HttpMethod
    body: string
}

interface RouteObject {
    [route: string]: Route
}

interface RouteCollectiion {
    paths: RouteObject
}


export class RouteHandler {
  constructor(
    private path: string,
    private method: HttpMethod,
    public routes: RouteCollectiion
  ) {}


  evaluate(){
    const usedPath = this.routes.paths[this.path]
    if (!usedPath) {
        return false
    } else {
        return this.retrieveBody(usedPath)
    }
  }

  retrieveBody(route: Route){
    const usedMethod = route.method
    if (usedMethod == this.method){
        return true
    } else {
        return false
    }
  }

}