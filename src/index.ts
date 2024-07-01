import express, { Express } from 'express';
import { WebSocketServer } from 'ws';

declare global {
    namespace Express {
        interface Application {
            ws: WebSocketServer;
        }
    }
}

type apps = {
    port: number;
    instance: Express;
    ws: WebSocketServer;
};

const apps: apps[] = [];

class Server {
    public app: Express;
    public ws: WebSocketServer;
    
    public constructor(port: number){
        const app = apps.find(s => s.port == port)
        const instance = app?.instance ?? express();
        const ws = app?.ws ?? new WebSocketServer({noServer: true})
        this.app = instance;
        this.ws = ws
        
        if(!app){
            instance.listen(port).on('upgrade', (req, socket, head) => {
                this.ws.handleUpgrade(req, socket, head, (ws) => {
                    this.ws.emit('connection', ws, req);
                });
            });
            apps.push({port, instance, ws});
        };
    };
};

export function app(port: number){
    const instance = new Server(port)
    instance.app.ws = instance.ws
    return instance.app
}