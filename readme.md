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
const { server } = require('@tryforge/express')

const app = new server(port)

app.route({
    route: '/', //or any path you want to use
    method: HTTPMethods | HTTPMethods[], //http method(s) you want the endpoint to use
    code: (req, res) => {
        //route code goes here
    }
})
```
3. Have fun making your own forge extension that requires express

## Credits
This package was made by [aggelos](https://discord.com/users/637648484979441706), a developer of ForgeScript. Use ForgeScript, it's better and easier.