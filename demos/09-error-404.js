const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
  ctx.status = 404
  ctx.body = 'this is 404 page'
})

app.listen(3000)