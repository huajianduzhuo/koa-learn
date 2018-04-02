const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500
    ctx.type = 'html'
    ctx.body = '<p style="color: red;">Something wrong, please contact administrator</p>'
    // 如果错误被 try...catch 捕获，就不会触发 error 事件。这时，必须调用 ctx.app.emit()，手动释放 error 事件，才能让监听函数生效。
    ctx.app.emit('error', error, ctx)
  }
})

app.use(ctx => {
  ctx.throw(500)
})

app.on('error', (error, ctx) => {
  console.log('logging error: ' + error.message)
  console.log(error)
})

app.listen(3000)