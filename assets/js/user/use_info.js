$(function () {
    let form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                '昵称长度必须在1-6个字符之间！'
            }
        }
    })

    //初始化用户信息
    function initUserInfo() {
        let form = layui.form
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                //快速为表单填充数据
                form.val('useo', res.data)
            }
        });
    }
    initUserInfo()
    //重置表单信息
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    //监听提交事件
    $('.layui-form').on('submit', function (e) {
        //阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败')
                }
                layui.layer.msg('更新用户信息成功')
                //调用父页面的方法，重新渲染用户信息
                window.parent.getUserInfo()
            }
        });
    })
})

