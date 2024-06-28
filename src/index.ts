import express, { Express, RequestHandler  } from 'express';

type apps = {
    port: number;
    instance: Express
}

type RawHTTPMethods = "get" | "put" | "post" | "delete" | "patch" | "options" | "trace" | "connect"
type HTTPMethods = Uppercase<RawHTTPMethods> | RawHTTPMethods

type RouteOptions = {
    type: HTTPMethods | HTTPMethods[]
    route: string;
    handler: RequestHandler 
}

const apps: apps[] = []

export class server {
    private app: Express;

    public constructor(port: number){
        const instance = apps.find(s => s.port == port)?.instance ?? express()
        this.app = instance
        if(!apps.find(s => s.port == port)){
            instance.listen(port)
            apps.push({port, instance})
        }
    }

    public route(options: RouteOptions){
        const { type, route, handler } = options;
        const types = Array.isArray(type) ? type : [type];
        types.forEach((type:HTTPMethods) => {
            type = type.toLowerCase() as RawHTTPMethods
            this.app[type](route, handler)
        });
    }
}