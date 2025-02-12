import Fastify, { FastifyInstance } from "fastify";

type AppInstance = {
    port: number;
    instance: FastifyInstance & { safeRegister?: (plugin: any, options?: any) => void };
    plugins: Set<string>;
};


const apps: AppInstance[] = [];
const registeredPlugins = new Set()
class Server {
    public app: FastifyInstance & { safeRegister: (plugin: any, options?: any) => void };

    public constructor(port: number) {
        const existingApp = apps.find((s) => s.port === port);
        const instance: FastifyInstance = existingApp?.instance ?? Fastify();

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

    private safeRegister(plugin: any, options = {}) {
        const pluginName = plugin.name || null;
        console.log(pluginName)
        console.log(registeredPlugins)
        if(!pluginName || registeredPlugins.has(pluginName)) return;
        this.app.register(plugin, options);
        if(pluginName) registeredPlugins.add(pluginName);
    }
}

export function app(port: number): FastifyInstance & { safeRegister: (plugin: any, options?: any) => void } {
    const instance = new Server(port);
    return instance.app;
}