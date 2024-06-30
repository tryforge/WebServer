import express, { Express } from 'express';

type apps = {
    port: number;
    instance: Express;
};

const apps: apps[] = [];

class server {
    public app: Express;

    public constructor(port: number){
        const instance = apps.find(s => s.port == port)?.instance ?? express();
        this.app = instance;
        if(!apps.find(s => s.port == port)){
            instance.listen(port);
            apps.push({port, instance});
        };
    };
};

export function app(port: number){
    const instance = new server(port)
    return instance.app
}