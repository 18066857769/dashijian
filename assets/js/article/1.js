$(function () {
    var layer = layui.layer
    $.ajax({
        mothed: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取文章失败')
            }
            layer.msg('获取文章成功')
            var htmlStr = template('tpl-cate', res)
            $('tbody').html(htmlStr)
            layui.form.render()
        }
    })
})