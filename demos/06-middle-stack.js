const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
  console.log('one')
  next()
  console.log('one')
})

app.use((ctx, next) => {
  console.log('two')
  next()
  console.log('two')
})

app.use((ctx, next) => {
  console.log('three')
  next()
  console.log('three')
})

app.listen(3000)