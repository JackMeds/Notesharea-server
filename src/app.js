const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const cors = require('koa2-cors');

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')
const {SESSION_SECRET_KEY} = require('./conf/secretKeys')

// 配置 CORS 中间件
app.use(cors({
  origin: '*', // 允许任何来源的跨域请求，实际部署时建议设置为具体的域名
  credentials: true, // 允许携带凭证信息（如 Cookies）
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // 允许的 HTTP 请求方法
  allowHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
  credentials: true // 允许携带cookie
}));

const index = require('./routes/index')
// // const users = require('./routes/users')
const userAPIRouter = require('./routes/api/user')
const adminAPIRouter = require('./routes/api/admin')
const noteAPIRouter = require('./routes/api/note')
const commentsAPIRouter = require('./routes/api/comment_and_reply')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// debugger

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'Notesharea.sid', // cookie name 默认是 koa.sid
  prefix: 'Notesharea:sess:', // redis key 的前缀，默认是 koa:sess:
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000, // ms
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // 或者 'strict'
  },
  // ttl : 3 * 24 * 60 * 60 * 1000, // redis 过期时间
  store: redisStore({
    host: REDIS_CONF.host,
    port: REDIS_CONF.port,
    password: REDIS_CONF.password
  })
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(adminAPIRouter.routes(), adminAPIRouter.allowedMethods())
app.use(noteAPIRouter.routes(), noteAPIRouter.allowedMethods())
app.use(commentsAPIRouter.routes(), commentsAPIRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
