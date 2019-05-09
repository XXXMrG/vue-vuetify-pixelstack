/**
 * user 模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from '@/plugins/axios' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const image = {
  // 查看图片详细信息
  getImageDetails (params) {
    return axios.get(`/image/getImageDetails`, {
      params: params
    })
  },
  // 请求图片主页数据
  getImageList (params) {
    return axios.get(`/image/getImageList`, {
      params: params
    })
  },
  // 请求图片评论数据
  getCommentsByiid (params) {
    return axios.get(`/Comment/getCommentsByiid`, {
      params: params
    })
  },
  // 请求该用户所有图片
  getImageListByUid (params) {
    return axios.get(`/image/getImageListByUid`, {
      params: params
    })
  },
  // 添加评论
  addComment (params) {
    return axios.post(`/Comment/add`, qs.stringify(params))
  },
  // 收藏图片
  setStar (params) {
    return axios.get(`/image/isStar`, {
      params: params
    })
  },
  // 👍图片
  setThumb (params) {
    return axios.get(`/image/isThumb`, {
      params: params
    })
  },
  // 请求图片收藏列表
  myStars (params) {
    return axios.get(`/image/myStars`, {
      params: params
    })
  },
  // 👮🏿‍♀️ 评论
  report (params) {
    return axios.post(`/Comment/report`, qs.stringify(params))
  },
  // 根据 🏷 返回图片
  getListByTagName (params) {
    return axios.get(`/image/getListByTagName`, {
      params: params
    })
  },
  // 修改标题
  updateTitle (params) {
    return axios.post(`/image/updateTitle`, qs.stringify(params))
  },
  // 关键字搜索图片
  getListBySearch (params) {
    return axios.get(`/image/getListBySearch`, {
      params: params
    })
  }
}

export default image
