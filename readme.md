# @tryforge/webserver
This package helps all the developers that want to make an extensions using express and ws without having to worry about having issues with other extensions. Using 2 express and ws extensions can be hard, that's why `@tryforge/webserver` exists!

# Usage
Using this package is really simple, here is everything you need to know:
1. Install this extension
```bash
npm i @tyrforge/webserver
```
2. Create your first route
```js
const { app } = require('@tryforge/webserver')

const server = new app(port)
//And from now on you can use anything that express uses!
//If you wanna use ws then just do server.ws and you can use whatever ws uses!
```
3. Have fun making your own forge extension that requires express and/or ws

## Credits
This package was made by [aggelos](https://discord.com/users/637648484979441706), a developer of ForgeScript. Use ForgeScript, it's better and easier.