import axios from 'axios';
import { ElMessage } from "element-plus";
// 创建axios实例
const instance = axios.create();
// 报错拦截器，弹窗提示报错内容
instance.interceptors.request.use(config => {
    return config
}, error => {
    ElMessage.error(`请求错误：${error.message}`)
    return Promise.reject(error)
})
instance.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response) {
        // Message.error(`状态码错误：${error.response.data}`)
        ElMessage.error(`错误信息：${error.response.data.msg}`)
    } else {
        // Message.error(`网络错误：${error.message}`)
    }
    return Promise.reject(error)
})
export default (url = '', data = {}, type = 'GET', contentType = 'application/json', responseType) => {
    return new Promise((resolve, reject) => {
        let promise;
        const headers = {};
        const token = sessionStorage.getItem('token') || '';
        if (token) {
            headers['Authorization'] = `${token}`;
        }
        if (contentType) {
            headers['Content-Type'] = contentType;
        }
        if(responseType) {
            headers['Response-Type'] = responseType
        }
        if (type === 'GET') {
            let dataStr = ''; // 数据拼接字符串
            Object.keys(data).forEach((key) => {
                dataStr += key + '=' + data[key] + '&';
            });
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
                url = url + '?' + dataStr;
            }
            // 发送GET请求
            promise = instance.get(url, { headers: headers });
        } else {
            promise = instance.post(url, data, { headers: headers });
        }
        promise.then((res) => {
            // 返回状态码和数据
            resolve({data: res.data, status: res.status});
        }).catch(err => {
            ElMessage.error(`网络错误：${err.message}`)
            reject(err);
        });
    });
};
