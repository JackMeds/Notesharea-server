const { addUser } = require('./user');

// 调用addUser函数并传递所需的参数
const userName = 'lisi';
const nickName = '李四';
const password = '123456';
const picture = '新用户的图片URL';
const gender = '1';
const email = 'lisi@email.com';
const phoneNum = '12345678910';
const userIntro = '新用户的简介';

addUser(userName, nickName, password, picture, gender, email, phoneNum, userIntro)
  .then(() => {
    console.log('用户添加成功');
  })
  .catch((error) => {
    console.error('用户添加失败', error);
  });

// const { User, Note, Collect, Comment, Like, Reply } = require('../db/model/index');

// console.log(User.findAll());
// console.log(Note.findAll());
// console.log(Collect.findAll());
// console.log(Comment.findAll());
// console.log(Like.findAll());
// console.log(Reply.findAll());

