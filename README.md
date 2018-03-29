# Koa learn note

# Create simple koa server

```javascript
const Koa = require('koa')
const app = new Koa()
app.use(ctx => {
  console.log(ctx)
  ctx.body = 'Hello World'
})
app.listen(3000)
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
  ctx.body = 'Hello World'
})
```

# Context

每个请求都将创建一个 Context，并在中间件中作为接收器引用，或者 ctx 标识符。

## API

* ctx.req
  Node 的 request 对象
* ctx.res
  Node 的 response 对象
* ctx.request
  koa 的 request 对象
* ctx.response
  koa 的 response 对象
* ctx.state
  推荐的命名空间，用于通过中间件传递信息给前端视图
* ctx.app
  应用程序实例引用
* ctx.cookies.get(name, [options])
  获取 cookie
* ctx.cookies.set(name, value, [options])
  设置 cookie。 options：
    * maxAge
    * signed cookie 签名值
    * expires cookie 过期时间
    * path cookie 路径，默认是 '/'
    * domain cookie 域名
    * secure 安全cookie
    * httpOnly 服务器可访问 cookie，默认是 true
    * overwrite 布尔值，默认是 false

# Request

Koa Request 对象是在 node 的 vanilla 请求对象之上的抽象，提供了诸多对 HTTP 服务器开发有用的功能。

## API

* request.header
  请求标头对象
* request.headers
  请求标头对象。别名为 request.header
* request.method
  请求方法
* request.length
  返回请求的 Content-Length，或 undefined
* request.url
  请求 URL
* request.originalUrl
  请求原始 URL
* request.origin
  URL 的来源，包括 protocol 和 host
* request.href
  完整的请求 URL，包括 protocol，host 和 url
* request.path
  请求路径名
* request.querystring
  根据 ? 获取原始查询字符串
* request.search
  根据 ? 获取原始查询字符串
  > querystring 和 search 的区别：（访问 localhost:3001/?a=aaa&b=bbb）
    * querystring: a=aaa&b=bbb
    * search: ?a=aaa&b=bbb
* request.host
  hostname:port
* request.hostname
  主机名
* request.URL
  获取 WHATWG 解析的 URL 对象
* request.type
  请求 Content-Type 不含参数 “charset”，如 "image/png"
* request.charset
  请求字符集，或者 undefined
* request.query
  获取解析的**查询字符串对象**，当没有查询字符串时，返回一个**空对象**。此 getter **不支持嵌套解析**。  
  访问 localhost:3001/?a=aaa&b=bbb，query 为 {a: 'aaa', b: 'bbb'}
* request.fresh
  检查请求缓存是否“新鲜”，也就是内容没有改变。此方法用于 If-None-Match / ETag, 和 If-Modified-Since 和 Last-Modified 之间的缓存协商。 在设置一个或多个这些响应头后应该引用它。
* request.stale
  与 request.fresh 相反
* request.protocol
  请求协议
* request.ip
  请求远程地址
* request.is(types...)
  检查传入请求是否包含 Content-Type 头字段， 并且包含任意的 mime type。 如果没有请求主体，返回 null。 如果没有内容类型，或者匹配失败，则返回 false。 反之则返回匹配的 content-type。
  ```javascript
  // 使用 Content-Type: text/html; charset=utf-8
  ctx.is('html'); // => 'html'
  ctx.is('text/html'); // => 'text/html'
  ctx.is('text/*', 'text/html'); // => 'text/html'

  // 当 Content-Type 是 application/json 时
  ctx.is('json', 'urlencoded'); // => 'json'
  ctx.is('application/json'); // => 'application/json'
  ctx.is('html', 'application/*'); // => 'application/json'
  ctx.is('html'); // => false
  ```
* request.accepts(types)
  检查给定的 type(s) 是否可以接受，如果 true，返回最佳匹配，否则为 false。 type 值可能是一个或多个 mime 类型的字符串，如 application/json，扩展名称如 json，或数组 ["json", "html", "text/plain"]。
  ```javascript
  // Accept: text/html
  ctx.accepts('html'); // => "html"

  // Accept: text/*, application/json
  ctx.accepts('html'); // => "html"
  ctx.accepts('text/html'); // => "text/html"
  ctx.accepts('json', 'text'); // => "json"
  ctx.accepts('application/json'); // => "application/json"

  // Accept: text/*, application/json
  ctx.accepts('image/png'); // => false
  ctx.accepts('png'); // => false

  // Accept: text/*;q=.5, application/json
  ctx.accepts(['html', 'json']); // => "json"
  ctx.accepts('html', 'json'); // => "json"

  // No Accept header
  ctx.accepts('html', 'json'); // => "html"
  ctx.accepts('json', 'html'); // => "json"
  ```
* request.socket
  请求套接字

# Response

Koa Response 对象是在 node 的 vanilla 响应对象之上的抽象，提供了诸多对 HTTP 服务器开发有用的功能。

## API

* response.header
  响应头对象
* response.headers
  响应头对象。别名是 response.header
* response.socket
  请求套接字
* response.status
  获取响应状态。默认设置为 404，而不是像 node 的 statusCode 那样默认为 200
* response.message
  获取响应的状态消息，默认情况下，与 response.status 关联
* response.length
  响应的 Content-Length，或者从 ctx.body 推导出来，或者是 undefined，可以手动设置为给定值
* response.body
  响应主体，可以设置为以下之一：
    * String 写入 -- Content-Type 默认为 text/html 或 text/plain，默认字符集是 utf-8
    * Buffer 写入 -- Content-Type 默认为 application/octet-stream
    * Stream 管道 -- Content-Type 默认为 application/octet-stream
    * Object || Array JSON-字符串化 -- Content-Type 默认为 application/json
    * null 无响应内容
  如果 response.status 未被设置，koa 将会自动设置为 200 或 204
* response.get(filed)
  不区分大小写获取响应头字段值
* response.set(field, value)
  设置响应头
* response.append(field, value)
  附加额外的响应头
* response.set(fields)
  用一个对象设置多个响应头
* response.remove(field)
  删除响应头
* response.type
  响应 Content-Type，不含参数“charset”。可设置，如 'text/plain; charset=utf-8', 'image/png', '.png', 'png'
* response.is(types)
  类似 ctx.request.is()。检测响应类型是否是所提供的类型之一。这对于创建操纵响应的中间件特别有用。
* response.redirect(url, [alt])
  重定向到 url
* response.attachment([filename])
  将 Content-Disposition 设置为“附件”以指示客户端提示下载。相当于：
  ```
  ctx.set('Content-disposition', `attachment; filename=${filename}`)
  ```
* response.headerSent
  检测是否已经发送了一个响应头。用于查看客户端是否可能会收到错误通知
* response.lastModified
  响应头 Last-Modified
* response.etag
  ETag 响应
* response.vary(field)
  在 field 上变化
* response.flushHeaders()
  刷新任何设置的响应头，并开始主体

# ctx 代理 request 访问器（getter 或 setter）

* ctx.header
* ctx.headers
* ctx.method
* ctx.method=
* ctx.url
* ctx.url=
* ctx.originalUrl
* ctx.origin
* ctx.href
* ctx.path
* ctx.path=
* ctx.query
* ctx.query=
* ctx.querystring
* ctx.querystring=
* ctx.host
* ctx.hostname
* ctx.fresh
* ctx.stale
* ctx.socket
* ctx.protocol
* ctx.secure
* ctx.ip
* ctx.ips
* ctx.subdomains
* ctx.is()
* ctx.accepts()
* ctx.acceptsEncodings()
* ctx.acceptsCharsets()
* ctx.acceptsLanguages()
* ctx.get()

# ctx 代理 response 访问器（getter 或 setter）

* ctx.body
* ctx.body=
* ctx.status
* ctx.status=
* ctx.message
* ctx.message=
* ctx.length=
* ctx.length
* ctx.type=
* ctx.type
* ctx.headerSent
* ctx.redirect()
* ctx.attachment()
* ctx.set()
* ctx.append()
* ctx.remove()
* ctx.lastModified=
* ctx.etag=

# koa + fs 返回流，实现文件下载

```javascript
app.use(async ctx => {
  ctx.attachment('w3.jpg')
  ctx.body = fs.createReadStream('public/w3.jpg')
})
```