const Koa = require('koa')
const compose = require('koa-compose')
const app = new Koa()

const one = async (ctx, next) => {
  console.log('one')
  console.log(await next())
  console.log('one')
}

const two = (ctx, next) => {
  console.log('two')
  next()
  console.log('two')
}

const three = (ctx, next) => {
  console.log('three')
  next()
  console.log('three')
  return "this is three"
}

app.use(compose([one, three]))
app.use(two)

app.listen(3000)