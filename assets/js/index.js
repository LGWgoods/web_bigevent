$(function () {
    //调用getUserInfo 获取用户基本信息
    getUserInfo()
    // let layer = layui.layer
    $('#btnLogout').on('click', function () {
        //提示用户是否退出
        layer.confirm('确定退出登入?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //清空本地存储的数据
            localStorage.removeItem('token')
            //从新跳转到登录页
            location.href = "/big-event/login.html"
            //关闭询问框
            layer.close(index);
        });
    })

})
//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        //请求头配置对象
        data: {},
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
        // //无论成功失败都会调用complete函数
        // complete: function (resb) {
        //     console.log(resb)
        //     if ((resb.responseJSON.status == 1) && (resb.responseJSON.message == '身份认证失败！')) {
        //         //强制清空token
        //         localStorage.removeItem('token')
        //         //强制跳转到登录页
        //         location.href = "/big-event/login.html"
        //     }
        // }
    });
}
function renderAvatar(data) {
    //获取用户名称
    let name = data.nickname || data.username
    //设置欢迎文本
    $('#welcome').html(`欢迎  ${name}`)
    if (data.user_pic !== null) {
        $('.layui-nav-img').prop("src", data.user_pic).show()
        $('.text-avatar').hide()
    }
    else {
        $('.text-avatar').text((data.username).slice(0, 1).toUpperCase()).show()
        $('.layui-nav-img').hide()
    }
}