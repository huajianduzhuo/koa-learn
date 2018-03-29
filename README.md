# Koa learn note

# Create simple koa server

```javascript
const Koa = require('koa')
const app = new Koa()
app.use(ctx => {
  console.log(ctx)
  ctx.body = 'Hello World2'
})
app.listen(3001)
```

# MiddleWare

koa 通过 app.use(middlewareCallback) 使用中间件，中间件回调函数接收（ctx, next）参数。
  * ctx: 上下文对象
  * next: 调用 next 函数，则当前中间件暂停执行，继续执行下一个中间件，当下游没有中间件执行时，回复执行上游中间件

```javascript
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
app.use(ctx => {
  console.log(ctx)
  ctx.body = 'Hello World2'
})
```
