const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const router = require('koa-router')()
const fs = require('fs')
const app = new Koa()

const main = serve(path.join(__dirname, '../src/views'))
app.use(main)

router.get('/getFileList', async (ctx, next) => {
  let files = await fs.readdirSync(path.join(__dirname, '../src/views'))
  files = files.filter(filename => filename.endsWith('.html') && filename !== 'index.html').map(filename => filename.replace(/\.html/, ''))
  ctx.type = 'json'
  ctx.body = {code: 0, files}
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)