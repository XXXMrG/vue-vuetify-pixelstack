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
    },
    // 请求该用户所有图片
    getImageListByUid(params) {
        return axios.get(`${base.pro}/image/getImageListByUid`, {
            params: params
        })
    },
    // 添加评论
    addComment(params) {
        return axios.post(`${base.pro}/Comment/add`, qs.stringify(params))
    },
    // 收藏图片
    setStar(params) {
        return axios.get(`${base.pro}/image/isStar`, {
            params: params
        })
    },
    // 👍图片
    setThumb(params) {
        return axios.get(`${base.pro}/image/isThumb`, {
            params: params
        })
    },
    // 请求图片收藏列表
    myStars(params) {
        return axios.get(`${base.pro}/image/myStars`, {
            params: params
        })
    },
    // 👮🏿‍♀️ 评论
    report(params) {
        return axios.post(`${base.pro}/Comment/report`, qs.stringify(params))
    }
}

export default image;