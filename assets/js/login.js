$(function () {
  //点击去'注册账号'的链接
  $(".reg").on("click", function () {
    $(".login").hide();
    $(".reg-box").show();
  });
  //点击'去登录'的链接
  $(".tologin").on("click", function () {
    $(".login").show();
    $(".reg-box").hide();
  });
  //从layui中获取from对象
  var form = layui.form;
  var layer = layui.layer;
  //通过form.verify()函数自定义校验规则
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //校验两次密码是否一致的规则
    repwd: function (value) {
      //通过形参都拿到的是确认密码框中的内容
      //还需要拿到密码框中的内容
      //然后进行一次等于的判断
      //若果判断失败，则return一个提示消息即可
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致";
      }
    },
  });
  //监听注册表单提交事件
  $("#form_reg").on("submit", function (e) {
    //1.阻止默认的提交行为
    e.preventDefault();
    var data = {
      username: $("#form_reg [ name=username] ").val(),
      password: $("#form_reg [ name=password] ").val(),
    };
    //发起ajax的post请求
    $.post("http://ajax.frontend.itheima.net/api/reguser", data, function (
      res
    ) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
    });
    layer.msg("注册成功.请登录！");
    $("#link_login").click();
  });
  //监听登录表单提交事件
  $("#form_login").on("submit", function (e) {
    //1.阻止默认的提交行为
    e.preventDefault();
    var data = {
      username: $("#form_reg [ name=username] ").val(),
      password: $("#form_reg [ name=password] ").val(),
    };
    //发起ajax的post请求
    $.post("http://ajax.frontend.itheima.net/api/login", data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
    });
    layer.msg("登录成功！");
    location.href = "index.html";
  });
});
