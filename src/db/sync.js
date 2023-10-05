/**
 * @description sequelize 同步数据库
 */
const seq = require('./seq');

require('./model/index');

// 测试连接
seq.authenticate().then(() => {
    console.log('ok');
}).catch((err) => {
    console.log(err);
})

// // 执行同步但删除原有表
// seq.sync({ force: true }).then(() => {
//     console.log('sync ok');
//     process.exit();
// });

//执行同步但不删除原有表
seq.sync().then(() => {
    console.log('sync ok');
    process.exit();
});