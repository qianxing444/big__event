$(function () {
  // 点击去注册页面
  $('#link-reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
    }
  )
  // 点击去登录页面
  $('#link-login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })
  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    //1.阻止默认的提交行为
    e.preventDefault(); 
    //2.发起Ajax的post请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val(),
      repassword: $('#form_reg [name=repassword]').val()
    };
    $.ajax({
      type: 'POST',
      url: 'http://www.liulongbin.top:3007/api/reguser',
      data: data,
      success: function (res) {
        console.log(JSON.stringify(res));
      }
    })
    // $.post('http://www.liulongbin.top:3007/api/reguser', JSON.stringify(data), function (res) {
    //   if (res.status !== 0) {
    //   return console.log(res.message)
    //   }
    //   alert("success");
    //   console.log('注册成功, 请登录');
    // })
  
  })

  //监听登录表单的提交事件
  // $('#form_login').on('submit', function (e) {
  $('#form_login').submit(function (e) {
    //1.阻止默认的提交行为
    e.preventDefault()
    // var data = $(this).serialize();
    var data = {
      username: $('#form_login [name=username]').val(),
      password: $('#form_login [name=password]').val()
    };
    // console.log(data);
    //2.发起Ajax的post请求
    $.ajax({
      method: 'POST',
      url: 'http://www.liulongbin.top:3007/api/login',
      //快速获取表单中的数据
      data: data, 
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('登录成功！')
          //将登录成功得到的token字符串，保存到localStorage中
          localStorage.setItem('token',res.token)
          //跳转到后台主页
          location.href='/index.html'
        }
      })
      
    })
})
//从layui中获取form对象
var form = layui.form
var layer=layui.layer
//通过form.verify()函数自定义校验规则
form.verify({
//自定义一个叫做pwd的校验规则
  pwd: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ] ,
  //校验两次密码不一致的规则
  repwd:  function(value){ 
   //通过形参拿到的是确认密码框中的内容
  //还需要拿到密码框中的内容
    //然后进行一次等于的判断
    //如果判断失败，则return一个提示消息即可
    var pwd = $('.reg-box [name=password]').val()
    if (pwd !== value) {
      return'两次密码不一致！'
    }
    
  }
});   
