const Koa = require('koa')
const SocketIO = require('socket.io')
const path = require('path')
const serve = require('koa-static')

const app = new Koa()
const server = app.listen(3000)
const io = SocketIO(server)

app.use(serve(path.join(__dirname, '../public')))

app.use(ctx => {
  ctx.body = 'use socket.io'
})

io.on('connection', socket => {
  console.log('socket connection')
  socket.emit('success', 'connect socket.io successed')
})