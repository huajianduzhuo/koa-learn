const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
  ctx.throw(500)
})

app.on('error', (error, ctx) => {
  console.log('server error listener', error)
})

app.listen(3000)