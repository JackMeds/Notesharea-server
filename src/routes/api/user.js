/**
 * @description User APT 路由
 */

const router = require("koa-router")();
const { isExist, register, login, changeInfo, getPeronalInfo, logoutController } = require("../../controller/user");
const userValidate = require("../../validator/user");
const { genValidator } = require("../../middlewares/validator");
router.prefix("/api/user");

//text
router.post("/changeInfo", genValidator(userValidate), async (ctx, next) => {
  try {
    const { userName, nickName, email, phoneNum, userIntro, picture } = ctx.request.body;
    // ... 其他处理
    ctx.body = await changeInfo(ctx, { userName, nickName, email, phoneNum, userIntro, picture });
  } catch (error) {
    console.error('Error in changeInfo:', error);
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});


//注册路由
router.post("/register", genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender, nickName, email, phoneNum, userIntro, picture } = ctx.request.body;
  ctx.body = await register({
    userName,
    password,
    gender,
    nickName,
    email,
    phoneNum,
    userIntro,
    picture,
  });
  //   errno: 0,
  //   data: {
  //     userName,
  //     password,
  //   },
  // };
});

//用户名是否存在
router.post("/isExist", async (ctx, next) => {
  const { userName } = ctx.request.body;
  console.log("api" + userName);
  ctx.body = await isExist({ userName });
});

//登录
router.post("/login", async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = await login(ctx, userName, password);
})

//获取个人信息
router.get('/getPersonal', async (ctx, next) => {
  const userId = ctx.query.userId;  // 使用 query 获取参数
  try {
    const userInfo = await getPeronalInfo(ctx, userId);
    console.log('api', userInfo);
    // 设置 ctx.body 为控制器中返回的值
    ctx.body = userInfo;
  } catch (error) {
    console.error('Error in API /getPersonal:', error);
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
  // 调用 next() 继续中间件链
  await next();
});
//修改个人信息
// const userId = 1;
router.patch("/changeInfo", genValidator(userValidate), async (ctx, next) => {
  const { userId, userName, nickName, gender, email, phoneNum, userIntro, picture } = ctx.request.body;
  console.log('apiinfo' + userId)
  console.log('Received userId:', userId);
  ctx.body = await changeInfo(ctx,
    {
      userId,
      userName,
      gender,
      nickName,
      email,
      phoneNum,
      userIntro,
      picture,
    });
  console.log('apis',)
})

// 检查登录状态的路由
router.get('/check', async (ctx) => {
  if (ctx.session.user) {
    ctx.body = { message: '已登录', user: ctx.session.user };
  } else {
    ctx.body = { message: '未登录' };
  }
});

//退出登录
router.post("/logout", async (ctx, next) => {
  ctx.body = await logoutController(ctx);
});



module.exports = router;
