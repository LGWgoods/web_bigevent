//调用ajax请求之前，拼接地址字符串
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    //统一为有权限的接口，设置 headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂载complete回调函数
    options.complete = function (resb) {
        if ((resb.responseJSON.status == 1) && (resb.responseJSON.message == '身份认证失败！')) {
            //强制清空token
            localStorage.removeItem('token')
            //强制跳转到登录页
            location.href = "/big-event/login.html"
        }
    }

})
