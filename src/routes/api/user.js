/**
 * @description User APT 路由
 */

const router = require("koa-router")();
const { isExist,register, login, logoutController, getAllUsersController } = require("../../controller/user");
const userValidate = require("../../validator/user");
const { genValidator } = require("../../middlewares/validator");

router.prefix("/api/user");

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
  ctx.body = await isExist({userName});
});

//登录
router.post("/login", async (ctx, next) => {
  const {userName, password} = ctx.request.body;
  ctx.body = await login(ctx, userName, password);  
})

//查询所有用户
router.get("/allUsers", async (ctx, next) => {
  ctx.body = await getAllUsersController();
});

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
