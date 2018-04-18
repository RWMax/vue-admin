/**
 * 工具类
 * @author liuht
 */

import axios from 'axios';
import qs from 'querystring';
import {config} from './config';
import {Loading, Message} from 'element-ui';

//请求拦截器
axios.interceptors.request.use(config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
    return config
}, error => {
    return Promise.reject(error)
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    return response
}, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break;
        case 401:
          err.message = '未授权，请重新登录'
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.message = '请求方法未允许'
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器端出错'
          break;
        case 501:
          err.message = '网络未实现'
          break;
        case 502:
          err.message = '网络错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网络超时'
          break;
        case 505:
          err.message = 'http版本不支持该请求'
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = "连接到服务器失败"
    }
    message.error(err.message)
    return Promise.resolve(err.response)
})
// 设置默认
axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.baseURL = config.request_prefix;

let util = {};

/**
 * 发起ajax请求
 *
 * @param {*请求路劲} url
 * @param {*请求方法} method
 * @param {*请求参数} params
 * @param {*headers} headers
 * @param {*是否显示加载中,默认false} showLoading
 */
util.ajax = (url, method, params, headers, showLoading) => {
    showLoading = showLoading ? showLoading: false;
    if (showLoading) {
        let loadingInstance = util.showLoading();
    }
    return new Promise((resolve, reject) => {
        let config = {
            url: url,
            method: method
        }
        if (headers) {
            config.headers = headers;
        }
        switch (method) {
            case 'get':
                config.params =  params;
                break;
            default:
                config.data = params;
                break;
        }
        axios(config).then(response => {
            let data = response.data;
            checkResponse(data)
            resolve(data);
            if (showLoading) {
                util.hideLoading(loadingInstance);
            }
        })
        .catch((error) => {
            handleError(error)
            reject(error);
            if (showLoading) {
                util.hideLoading(loadingInstance);
            }
        })
    });
}

/**
 * 以表单的形式提交数据
 * 利用 qs.stringify
 * 参数参考 util.ajax
 */
util.ajaxForm = (url, method, params, headers, showLoading) => {
    params = qs.stringify(params);
    return util.ajax(url, method, params, headers, showLoading);
}

/**
 * 显示加载中 ...
 */
util.showLoading = () => {
    return Loading.service({
        fullscreen: true,
        text: '拼命加载中...'
    });
}

/**
 * 关闭加载中
 *
 */
util.hideLoading = (instance) => {
    instance.close();
}

/**
 * 检查异步请求回调是否成功
 *
 * @param data 异步返回数据
 */
function checkResponse (data) {
    if (data.meta.code === 0) {
        Message({
            message: data.meta.message ?  data.meta.message : "请求出错, 请稍候重试...",
            type: 'error',
            duration: 3000,
            showClose: true
        });
    }
}

/**
 * 请求异常处理
 *
 * @param {*请求异常} e
 */
function handleError (e) {
    if (e.response.data.meta.message) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        Message({
            message: e.response.data.meta.message,
            type: 'error',
            duration: 3000,
            showClose: true
        });
    } else {
        Message({
            message: e.message,
            type: 'error',
            duration: 3000,
            showClose: true
        });
    }
}

/**
 * 获取当前登录用户所有信息
 *
 */
util.getLoginUser = () => {
    
    return null;
}

/**
 * 获取当前登录用户权限资源
 *
 */
util.getResources = () => {
    
    return null;
}

/**
 * 设置当前path 面包屑设置
 *
 * @param {*vue实例} vm
 * @param {*路由名称} name
 */
util.setCurrentPath = (vm, name) => {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.global.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'dashboard') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.global.routers, 'dashboard')),
                path: '/dashboard',
                name: 'dashboard'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'dashboard') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.global.routers, 'dashboard')),
                path: '/dashboard',
                name: 'dashboard'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.global.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'dashboard') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/dashboard',
                    name: 'dashboard'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'dashboard') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/dashboard',
                    name: 'dashboard'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/dashboard',
                    name: 'dashboard'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);
    return currentPathArr;
};

util.handleTitle = (vm, item) => {
    if (typeof item.title === 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};

util.getRouterObjByName = (routers, name) => {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

export default util;