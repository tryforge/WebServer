import { RequestHandler } from 'express';
type RawHTTPMethods = "get" | "put" | "post" | "delete" | "patch" | "options" | "trace" | "connect";
type HTTPMethods = Uppercase<RawHTTPMethods> | RawHTTPMethods;
type RouteOptions = {
    route: string;
    method: HTTPMethods | HTTPMethods[];
    code: RequestHandler;
};
export declare class server {
    private app;
    constructor(port: number);
    route(options: RouteOptions): void;
}
export {};
//# sourceMappingURL=index.d.ts.map