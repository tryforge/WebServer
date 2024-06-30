"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const apps = [];
class server {
    app;
    constructor(port) {
        const instance = apps.find(s => s.port == port)?.instance ?? (0, express_1.default)();
        this.app = instance;
        if (!apps.find(s => s.port == port)) {
            instance.listen(port);
            apps.push({ port, instance });
        }
        ;
    }
    ;
}
;
function app(port) {
    const instance = new server(port);
    return instance.app;
}
exports.app = app;
