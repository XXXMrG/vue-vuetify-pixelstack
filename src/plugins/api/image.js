/**
 * user 模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/plugins/axios'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块


const image = {
    // 查看图片详细信息
    getImageDetails(params) {
        return axios.get(`${base.pro}/image/getImageDetails`, {
            params: params
        })
    },
    // 请求图片主页数据
    getImageList(params) {
        return axios.get(`${base.pro}/image/getImageList`, {
            params: params
        })
    },

    //请求图片评论数据
    getCommentsByiid(params) {
        return axios.get(`${base.pro}/Comment/getCommentsByiid`, {
            params: params
        })
    }
    // manageStatus(params) {
    //     return axios.post(`${base.pro}/admin/manageCountStatus`, params, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    // }
}

export default image;