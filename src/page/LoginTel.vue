<template>
  <el-main >
    <div class="logo">
    <img src="../assets/logo.png"  style="height:50px;width:50px;" >
    </div>
    <div class="validata-info"  style="width:350px;margin: 0 auto; margin-bottom: 10px">
      <i class="el-icon-warning"></i>
      {{valmsg}}
    </div>
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
      <el-form-item prop="phone" style="padding-top:5px;">

        <el-input
          v-model="LoginForm.phone"
          prefix-icon="el-icon-phone"
          placeholder="手机号，未注册将自动注册"
          @input="phoneChange"
         >
        </el-input>
      </el-form-item>

      <el-form-item prop="confirmCode">

        <el-input
          v-model="LoginForm.confirmCode"
          prefix-icon="el-icon-lock"
          placeholder="验证码" >
          <el-button  :disabled="getConfirmCodeButton" style="width: 112px" slot="append" @click="getConfirmCode"><div id="timer"></div></el-button>
        </el-input>
      </el-form-item>
        <p class="notify">新用户登录将会自动注册，并表示已经同意<a href="/" style="text-decoration: none;color:#606266;" target="_blank">《用户服务协议》</a></p>
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
  import {GetConfirmCode} from "../api/permission";

  export default {
    // ....
    data () {
      return {
        LoginForm: {
          phone: '',
          confirmCode: '',
        },
        valmsg: '手机号输入不正确，请重新输入',
        getConfirmCodeButton:false,
        logining: false,
        rule: {
          username: [
            {
              //required: true,
              trigger: 'blur'
            }
          ],
          password: [
            {
              //required: true,
              //message: "",
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
      getConfirmCode() {
        if(!this.isPhoneNum(this.LoginForm.phone)) {
          var vali = document.getElementsByClassName("validata-info")[0]
          this.valmsg="手机号输入不正确，请重新输入"
          vali.style.visibility = "visible";
          setTimeout(function(){
            vali.style.visibility = "hidden";
          },3000)
          return;
        }
        else {
          // var vali = document.getElementsByClassName("validata-info")[0]
          // vali.style.visibility = "visible";
          // this.valmsg="已发送验证码";
          var fd = new FormData();
          fd.append('tel',this.LoginForm.phone)
          GetConfirmCode(fd).then(res => {}).catch(err=>{});
          this.$message({
            type: 'success',//success,warning
            message: '已发送验证码'
          })
          var con = document.getElementById("timer");
          con.style.color = "#909399";
          //console.log('phone change')
          //getConfirmCodeButton.style.cursor = "not-allow";
          this.getConfirmCodeButton=true;
          //this.phoneChange();
          this.time(10);
        }
      },
      isPhoneNum(value) {
        const reg =/^[1][3,4,5,7,8][0-9]{9}$/;
        if(value==''||value==undefined||value==null){
          return false;
        }else {
          if ((reg.test(value))) {
            return true;
          } else {
            return false;
          }
        }
      },
      time(i) {
        document.getElementById("timer").innerHTML = "重新获取("+i+")";
        var i = i-1;
        //console.log(i);
        if(i<0) {
          document.getElementById("timer").innerHTML = "获取验证码";
          this.getConfirmCodeButton=false;
          return;
        }
        let _this = this;
        setTimeout(function() {
          _this.time(i);
        },1000);
      },
      phoneChange() {
        var confirmCode = document.getElementById("timer");
        if(this.LoginForm.phone.length==11)
          confirmCode.style.color = "#000";
        else
          confirmCode.style.color = "#909399";

      }
    },
    mounted() {
      var header = document.getElementsByClassName("header-box")[0];
      header.style.visibility = "hidden";
      document.getElementById("timer").innerHTML = "获取验证码";
    }
  }
</script>

<style scoped>

  .login-form {
    margin: 0px auto;
    width: 310px;
    //background: #fff;
    //box-shadow: 0 0 35px #B4BCCC;
    padding: 0px 30px 0 30px;
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
  .logo {
    text-align: center;
  }
  .validata-info {
    margin-bottom: 10px;
    padding: 10px;

    border: 1px solid #f5d8a7;
    border-radius: 2px;
    background: #fff6db;
    font-size: 12px;
    border-color: #EEE;
    visibility: hidden;
    //background: #f6f6f6
  }
  .el-button.is-disabled {
    background-color: #EBEEF5;
    color:#909399;
  }
  .el-form {
    background-color: #fff;
    padding-bottom: 15px;
    padding-top: 15px;
    border-radius: 5px;
  }
</style>

