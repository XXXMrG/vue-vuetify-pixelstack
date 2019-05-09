/**
 * user 模块接口列表
 */

// import base from './base' // 导入接口域名列表
import axios from '@/plugins/axios' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

const admin = {
  // 查看用户列表
  getUserList (params) {
    return axios.get(`/admin/getUserList`, {
      params: params
    })
  },
  manageStatus (params) {
    return axios.post(`/admin/manageCountStatus`, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  createCount (params) {
    return axios.post(`/admin/createCount`, qs.stringify(params))
  },
  // 返回被举报的评论列表
  getReportComment (params) {
    return axios.get(`/Comment/getReportComment`, {
      params: params
    })
  },
  // 处理举报评论
  dealWithReport (params) {
    return axios.post(`/admin/dealWithReport`, qs.stringify(params))
  }
}

export default admin
