$(function () {
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 原密码与新密码规则
        reg: function (value) {
            if ($('[name=oldPwd').val() === value) {
                return '新旧密码不能相同'
            }
        },
        // 判断新密码与再次输入是否相同
        regs: function (value) {
            if ($('[name=newPwd').val() !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 监听提交事件
    $('.layui-form').on('submit', function (e) {
        //阻止表单的默认提交行为
        e.preventDefault()
        let form = layui.form
        //发起ajax请求
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败')
                }
                layui.layer.msg('更新密码成功')
                //调用原生JS中的表单重置
                $('.layui-form')[0].reset()
            }
        })
    })
})