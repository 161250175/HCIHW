<template>
  <el-main>

    <el-form
      :model="LoginForm"
      ref="LoginForm"
      :rules="rule"
      label-width="0"
      class="login-form">
      <span style="color:#606266; padding-right: 135px;" >用户登录
      </span>
      <el-link type='info' ref="" style="color:#606266;">普通方式登录<i></i>
      </el-link>
      <i class="el-icon-user-solid"></i>
      <el-form-item prop="username" style="padding-top:5px;">

        <el-input
          v-model="LoginForm.phone"
          prefix-icon="el-icon-phone"
          placeholder="手机号，未注册将自动注册" >
        </el-input>
      </el-form-item>

      <el-form-item prop="password">

        <el-input
          v-model="LoginForm.confirmCode"
          prefix-icon="el-icon-lock"
          placeholder="验证码" >

        </el-input>
      </el-form-item>
      <p class="notify">新用户登录即自动注册，并表示已经同意<a href="/" style="text-decoration: none;color:#606266;" target="_blank">《用户服务协议》</a></p>
      <el-form-item >
        <el-button
          type="warning"
          class="submitBtn"
          @click.native.prevent="submit"
          :loading="logining">
          登录
        </el-button>

      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  export default {
    // ....
    data () {
      return {
        LoginForm: {
          username: '',
          password: ''
        },
        logining: false,
        rule: {
          username: [
            {
              required: true,
              type: 'email',
              message: '邮箱格式错误',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '密码是必须的！',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      // ...
      submit () {
        this.$refs.LoginForm.validate(valid => {
          if (valid) {
            this.logining = true
            // console.log('开始请求后台数据，验证返回之类的操作！')
            // 登录作为参数的用户信息
            let LoginParams = {
              username: this.LoginForm.username,
              password: this.LoginForm.password
            }
            // 调用axios登录接口
            LoginUser(LoginParams).then(res => {
              this.logining = false
              // 根据返回的code判断是否成功
              let user = res.data
              console.log(user)
              user.avatar = '../assets/user/'+user.email.split("@")[0]+'.jpg'
              console.log(user)
              if (user == '') {
                this.$message({
                  type: 'error',
                  message: '账号或密码错误'
                })
              } else {
                this.$message({
                  type: 'success',
                  message: '成功登陆'
                })
                // 将返回的数据注入sessionStorag
                sessionStorage.setItem('user', JSON.stringify(user))
                this.$store.dispatch('login')
                // 跳转到我的信息的页面
                this.$router.push('/main')
              }
            }).catch((err) => {
              console.log(err)
              this.logining = false
              this.$message({
                type: 'error',
                message: '网络错误请重试'
              })
            })
          } else {
            console.log('submit err')
          }
        })
      },
      reset () {
        this.$refs.LoginForm.resetFields()
      },
      toregin () {
        this.$router.push('/cus/regin')
      },
      getConfirmCode() {}
    }
  }
</script>

<style scoped>

  .login-form {
    margin: 20px auto;
    width: 310px;
  //background: #fff;
  //box-shadow: 0 0 35px #B4BCCC;
    padding: 30px 30px 0 30px;
    border-radius: 25px;
  }
  .el-link:hover {
    color:#606266;
    text-decoration-color:#606266;
  }
  .submitBtn {
    width: 100%;
  }
  .resetBtn {
    width: 100%;
  }
  .to {
    color: #67C23A;
    cursor: pointer;
  }
  .notify{
    font-size:10px;
    margin-top: 5px;
  }
  .notyfy a:hover {

  }
</style>

