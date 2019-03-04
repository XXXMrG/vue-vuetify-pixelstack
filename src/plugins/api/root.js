/**
 * user 模块接口列表
 */

import base from './base'; // 导入接口域名列表



const root = {
    // 切割字符串
    getUrl(url){
        return base.pro + '/image' +url.slice(28)
    }
}

export default root;