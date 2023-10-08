/**
 * 
 * @description 加密方法
 */

const crypto = require('crypto')
const { CRTPTO_SECRET_KEY } = require('../conf/secretKeys')

/**
 * SHA-256加密
 * @param {string} content 明文
 */
function _sha256(content) {
  const sha256 = crypto.createHash('sha256')
  return sha256.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 明文
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRTPTO_SECRET_KEY}`
  return _sha256(str)
}

module.exports = doCrypto
