/**
 * @description User APT 路由
 */

const router = require("koa-router")();
const { isExist,register } = require("../../controller/user");
const userValidate = require("../../validator/user");
const { genValidator } = require("../../middlewares/validator");

router.prefix("/api/user");

//注册路由
router.post("/register", genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  ctx.body = await register({
    userName,
    password,
    gender,
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
  ctx.body = await isExist(userName);
});

//测试
router.post("/test", async (ctx, next) => {
  console.log(ctx.request.body);
  const { username, password } = ctx.request.body;
    let result = {
        code: -1,
        message: "登录失败",
    };
    function mytest(username, password){
    if (username == "123456" && password == "123456") {
      result = {
        code: 0,
        message: "登录成功",
        data: {
          username,
          password,
        }
      };
      return result;
    } else {
      return result;
    }
  };
  ctx.body = await mytest(username, password);
});

module.exports = router;
