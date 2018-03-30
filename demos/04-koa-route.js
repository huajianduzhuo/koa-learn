const Koa = require('koa')
const route = require('koa-route')
const app = new Koa()

const main = ctx => {
  ctx.body = 'Hello World'
}

const about = ctx => {
  ctx.type = 'html'
  ctx.body = 'ABOUT<br><a href="/">MAIN</a>'
}

app.use(route.get('/', main))
app.use(route.get('/about', about))

app.listen(3000)