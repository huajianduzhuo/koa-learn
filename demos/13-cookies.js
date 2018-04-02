const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
  let views = Number(ctx.cookies.get('view') || 0) + 1
  ctx.cookies.set('view', views)
  ctx.body = views + ' view'
})

app.listen(3000)