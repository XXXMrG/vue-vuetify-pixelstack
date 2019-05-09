/**
 * user 模块接口列表
 */

import base from './base' // 导入接口域名列表

const root = {
  // 切割字符串
  getUrl (url) {
    return base.pro + '/image' + url.slice(28)
  },
  // 切割原图 url
  getOriginalUrl (url) {
    var header = url.slice(28)
    header = header.split('/')
    header[3] = 'original'
    header = header.join('/')
    return base.pro + '/image' + header
  }
}

export default root
