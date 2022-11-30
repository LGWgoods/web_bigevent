$(function () {
    //点击注册
    $('#reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击登录
    $('#log').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    //从layui获取form对象.form为layui对象的一个属性
    let form = layui.form
    let layer = layui.layer
    // 自定义正则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        regb: function (value) {
            if ($('.reg-box [name=password]').val() !== value) {
                return '两次密码不一致'
            }
        }
    })
    //监测注册表单提交
    $('#form_reg').on('submit', function (e) {
        //获取表单数据
        let data = $(this).serialize()
        //阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 注册成功后跳转登录界面
                $('#log').click()
            }
        })
    })
    //监测登录表单提交
    $('#form_log').on('submit', function (e) {
        //获取表单数据
        let data = $(this).serialize()
        //阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 注册成功后跳转登录界面
                console.log(res.token)
                location.href = "/big-event/index.html"
            }
        })
    })
    console.log($('.reg-box[name=password]')[0])
})
