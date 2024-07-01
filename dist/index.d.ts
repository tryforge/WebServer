import express from 'express';
import { WebSocketServer } from 'ws';
declare global {
    namespace Express {
        interface Application {
            ws: WebSocketServer;
        }
    }
}
export declare function app(port: number): express.Express;
//# sourceMappingURL=index.d.ts.map