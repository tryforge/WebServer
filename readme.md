# @tryforge/express
This package helps all the developers that want to make an extensions using express without having to worry about having issues with other extensions. Using 2 express extensions can be hard, that's why `@tryforge/express` exists!

# Usage
Using this package is really simple, here is everything you need to know:
1. Install this extension
```bash
npm i @tyrforge/express
```
2. Create your first route
```js
const { app } = require('@tryforge/express')

const server = new app(port)
//And from now on you can use anything that express uses!
```
3. Have fun making your own forge extension that requires express

## Credits
This package was made by [aggelos](https://discord.com/users/637648484979441706), a developer of ForgeScript. Use ForgeScript, it's better and easier.