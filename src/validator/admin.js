/**
 *
 * @description user 数据格式校验
 */

const validate = require("./validate");

//校验规则
const SCHEMA = {
  type: "object",
  properties: {
    userName: {
      type: "string",
      pattern: "^[a-zA-Z][a-zA-Z0-9_]+$", //字母开头，字母数字下划线
      maxLength: 255,
      minLength: 2,
    },
    password: {
      type: "string",
      maxLength: 255,
      minLength: 3,
    },
    newPassword: {
      type: "string",
      maxLength: 255,
      minLength: 3,
    },
    picture: {
      type: "string",
      maxLength: 255,
    },
    city: {
      type: "string",
      maxLength: 255,
      minLength: 2,
    },
  },
};

//执行校验
function userValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = userValidate;