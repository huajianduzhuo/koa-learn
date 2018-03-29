const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// logger
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// response
app.use(async ctx => {
  // ctx.body = 'Hello World'
  ctx.attachment('w3.jpg')
  ctx.body = fs.createReadStream('public/w3.jpg')
})

app.listen(3000)