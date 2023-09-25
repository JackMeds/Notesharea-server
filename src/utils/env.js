//环境变量

const env = process.env.NODE_ENV // 环境参数

module.exports = {
    isDev: env === 'dev',
    notDev: env !== 'dev',
    isProd: env === 'production',
    notProd: env !== 'production',
    isTest: env === 'test',
    notTest: env !== 'test',
}