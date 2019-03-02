/** 
 * api接口的统一出口
 */

import user from './user';
// 其他模块的接口……
import admin from './admin';

// 导出接口
export default {
    user,
    admin,
    // ……
}