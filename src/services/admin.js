/**
 * @description admin service
 */

const { Administrator } = require("../db/model/index");
const { formatUser } = require("./_format");
/**
 *
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getAdminInfo({ userName, password }) {
  console.log("service" + userName);
  console.log("service" + password);
  //查询条件
  const whereOpt = {
    userName,
  };
  if (password) {
    Object.assign(whereOpt, { password });
  }

  //查询
  const result = await Administrator.findOne({
    attributes: [
      "id",
      "userName",
      "password",
      "email",
      "picture",
      "phoneNum",
      "userIntro",
    ],
    where: whereOpt,
  });
  if (result == null) {
    //未找到
    return result;
  }

  //格式化
  const formatRes = formatUser(result.dataValues);

  return formatRes;
}

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function createAdmin({
  userName,
  password,
  email,
  phoneNum,
  userIntro,
  picture,
}) {
  console.log("cccservice" + userName);
  console.log("cccservice" + password);
  const result = await Administrator.create({
    userName: userName,
    password: password,
    email: email,
    picture,
    phoneNum: phoneNum,
    userIntro: userIntro,
  });
  // console.log(result.dataValues);
  return result.dataValues;
}

module.exports = {
  getAdminInfo,
  createAdmin,
};
