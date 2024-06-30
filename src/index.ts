import express, { Express } from 'express';
import { WebSocketServer } from 'ws';

type apps = {
    port: number;
    instance: Express;
    ws: WebSocketServer;
};

const apps: apps[] = [];

class server {
    public app: Express;
    public ws: WebSocketServer;
    
    public constructor(port: number){
        const app = apps.find(s => s.port == port)
        const instance = app?.instance ?? express();
        const ws = app?.ws ?? new WebSocketServer({noServer: true})
        this.app = instance;
        this.ws = ws
        if(!apps.find(s => s.port == port)){
            instance.listen(port).on('upgrade', (req, socket, head) => {
                this.ws.handleUpgrade(req, socket, head, (ws) => {
                    ws.emit('connection', ws, req);
                });
            });
            apps.push({port, instance, ws});
        };
    };
};

export function app(port: number){
    const instance = new server(port)
    return { ...instance.app, ws: instance.ws }
}