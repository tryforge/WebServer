"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = app;
const fastify_1 = __importDefault(require("fastify"));
const apps = [];
const registeredPlugins = new Set();
class Server {
    app;
    constructor(port) {
        const existingApp = apps.find((s) => s.port === port);
        const instance = existingApp?.instance ?? (0, fastify_1.default)();
        //@ts-ignore
        this.app = instance;
        this.app.safeRegister = this.safeRegister.bind(this);
        if (!existingApp) {
            instance.listen({ port, host: "0.0.0.0" }, (err, address) => {
                if (err) {
                    console.error("Server failed to start:", err);
                    process.exit(1);
                }
            });
            apps.push({ port, instance, plugins: new Set() });
        }
    }
    safeRegister(plugin, options = {}) {
        const pluginName = plugin.name || null;
        console.log(pluginName);
        console.log(registeredPlugins);
        if (!pluginName || registeredPlugins.has(pluginName))
            return;
        this.app.register(plugin, options);
        if (pluginName)
            registeredPlugins.add(pluginName);
    }
}
function app(port) {
    const instance = new Server(port);
    return instance.app;
}
