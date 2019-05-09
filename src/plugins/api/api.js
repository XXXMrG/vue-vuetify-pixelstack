/**
 * api接口的统一出口
 */

import user from './user'
// 其他模块的接口……
import admin from './admin'
import image from './image'
import root from './root'
// 导出接口
export default {
  user,
  admin,
  image,
  root
  // ……
}
