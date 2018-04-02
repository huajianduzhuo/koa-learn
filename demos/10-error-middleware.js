const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500
    ctx.body = {message: error.message}
  }
})

app.use(ctx => {
  ctx.throw(500)
})

app.listen(3000)