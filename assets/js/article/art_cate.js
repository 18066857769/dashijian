$(function () {
    var layer = layui.layer;
    var form = layui.form;
    initArtCatelst()
    // 获取文章分类的列表
    function initArtCatelst() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);

                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                layer.msg('获取文章列表成功')
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }


        })
    }
    //为添加类别的按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()

        })
    })
    //通过代理的形式 ，为form-add表单绑定 submit事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                initArtCatelst()
                layer.msg('新增分类成功')
                //根据索引关闭弹窗
                layer.close(indexAdd)
            }
        })
    })
    //为编辑类别的按钮绑定点击事件
    var indexAdd = null
    $('body').on('click', '#btn-edit', function () {
        var id = $(this).data('id')
        console.log(id);
        //发起请求获取对应分类的数据
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('111')
                }
                console.log(res.data);
                form.val('formreCate', res.data)
            }
        })
        // 弹出一个修改文章分类信息的层
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#form-edit').html()

        })
    })

    // //通过代理的形式，未修改分类的表单添加sumbit事件
    $('body').on('sumbit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                layer.msg('获取文章列表成功')
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    })
    //通过代理的形式，为删除按钮添加点击事件
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        //提示用户是否要删除
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败')
                    }
                    initArtCatelst()
                    layer.msg('删除分类成功')
                    //根据索引关闭弹窗
                    layer.close(index)
                    initArtCatelst()
                }

            })
        })
    })
})