"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const apps = [];
class Server {
    app;
    ws;
    constructor(port) {
        const app = apps.find(s => s.port == port);
        const instance = app?.instance ?? (0, express_1.default)();
        const ws = app?.ws ?? new ws_1.WebSocketServer({ noServer: true });
        this.app = instance;
        this.ws = ws;
        if (!app) {
            instance.listen(port).on('upgrade', (req, socket, head) => {
                this.ws.handleUpgrade(req, socket, head, (ws) => {
                    this.ws.emit('connection', ws, req);
                });
            });
            apps.push({ port, instance, ws });
        }
        ;
    }
    ;
}
;
function app(port) {
    const instance = new Server(port);
    instance.app.ws = instance.ws;
    return instance.app;
}
exports.app = app;
