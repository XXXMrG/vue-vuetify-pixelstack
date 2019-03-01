/**
 * user 模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/plugins/axios'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

// const article = {
//     // 新闻列表    
//     articleList() {
//         return axios.get(`${base.sq}/topics`);
//     },
//     // 新闻详情,演示    
//     articleDetail(id, params) {
//         return axios.get(`${base.sq}/topic/${id}`, {
//             params: params
//         });
//     },
//     // post提交    
//     login(params) {
//         return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
//     }
//     // 其他接口…………
// }

// export default article;

const user = {
    // 登录
    login(params) {
        return axios.post(`${base.dev}/user/login`, qs.stringify(params));
    },
    //修改个人信息
    edit(params){
        return axios.post(`${base.dev}/user/modify`, qs.stringify(params));
    },
    test(params) {
        return axios.get(`${base.dev}/query/bykey`, {
            params: params
        })
    },
    test_02(){
        return axios.post(`${base.dev}/user/getMessage`)
    }
}

export default user;