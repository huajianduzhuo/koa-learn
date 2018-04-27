const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const app = new Koa()

const main = serve(path.join(__dirname, '../public'))

let count = 0

app.use(main)
app.use(async (ctx, next) => {
  /** 
   * 程序计数器
   * 因为 node 是单线程，count 在每次请求连接时都会加 1
   * 可以用来记录网页访问次数
   */
  count++
  ctx.body = `count: ${count}`
})

app.listen(3000)