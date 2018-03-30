const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
  ctx.throw(500, 'throw 500') // 错误信息 throw 500 会显示在后台控制台
})

app.listen(3000)