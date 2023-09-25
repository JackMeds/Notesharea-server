const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  // console.log('before debugger');
  // debugger
  // console.log('after debugger')
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  const session = ctx.session
  if(session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum++

  ctx.body = {
    'koa2 string': `Hello Koa 2! ${session.viewNum}`,
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
