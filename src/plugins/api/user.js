/**
 * user 模块接口列表
 */

import base from './base' // 导入接口域名列表
import axios from '@/plugins/axios' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const user = {
  // 登录 post
  login (params) {
    return axios.post(`${base}/user/login`, qs.stringify(params))
  },
  // 修改个人信息 get
  edit (params) {
    return axios.post(`${base}/user/modify`, qs.stringify(params))
  },
  // 获取用户信息 get
  getInfo (params) {
    return axios.get(`${base}/user/getUserInfo`, {
      params: params
    })
  },
  // 用户注册 post
  register (params) {
    return axios.post(`${base}/user/register`, qs.stringify(params))
  },
  // 上传图片加标签 post
  addTag (params) {
    return axios.post(`${base}/user/addTagsandTitle`, params)
  },
  // 获取用户 id
  getUid (params) {
    return axios.get(`${base}/user/getUid`, {
      params: params
    })
  },
  // 删除自己的作品
  delPic (params) {
    return axios.post(`${base}/user/deleteImage`, qs.stringify(params))
  },
  // 关注用户
  goFollow (params) {
    return axios.post(`${base}/user/isFollow`, qs.stringify(params))
  },
  // 获取关注用户列表
  getFollowers (params) {
    return axios.get(`${base}/user/getFollowers`, {
      params: params
    })
  },
  // 获取粉丝列表
  getFans (params) {
    return axios.get(`${base}/user/getFans`, {
      params: params
    })
  },
  // 判断是否已经关注过
  followRelate (params) {
    return axios.post(`${base}/user/followRelate`, qs.stringify(params))
  }
}

export default user
