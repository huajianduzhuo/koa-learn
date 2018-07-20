const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('./routes')

// static files
const main = require('koa-static')(path.join(__dirname, '../public'))
app.use(main)

// body-parser
app.use(bodyParser())
app.use(async (ctx, next) => {
  ctx.body = ctx.request.body
  next()
})

// router
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)