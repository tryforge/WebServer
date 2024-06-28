import express, { Express, RequestHandler  } from 'express';

type apps = {
    port: number;
    instance: Express;
};

type RawHTTPMethods = "get" | "put" | "post" | "delete" | "patch" | "options" | "trace" | "connect";
type HTTPMethods = Uppercase<RawHTTPMethods> | RawHTTPMethods;

type RouteOptions = {
    route: string;
    method: HTTPMethods | HTTPMethods[];
    code: RequestHandler;
}

const apps: apps[] = [];

export class server {
    private app: Express;

    public constructor(port: number){
        const instance = apps.find(s => s.port == port)?.instance ?? express();
        this.app = instance;
        if(!apps.find(s => s.port == port)){
            instance.listen(port);
            apps.push({port, instance});
        };
    };

    public route(options: RouteOptions){
        const { route, method, code } = options;
        const types = Array.isArray(method) ? method : [method];
        types.forEach((method:HTTPMethods) => {
            method = method.toLowerCase() as RawHTTPMethods;
            this.app[method](route, code);
        });
    };
};