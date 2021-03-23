<template>
    <div class="Login">
        <div class="Header">
            <h3>
                <img class="logo_img" src="@/assets/img/Roms1.png">
                <i></i>
                配置管理系统
                <span>欢迎您，请登录</span>
            </h3>
        </div>
        <div class="loginBody login_input">
            <div class="login-top">登 录</div>
            <el-form :model="LoginForm" ref="LoginForm" label-width="50px" class="demo-ruleForm">
                <el-form-item>
                    <el-input v-model="LoginForm.name" placeholder="请输入用户名" class="loginInput">
                        <i slot="prefix" class="el-input__icon el-icon-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="LoginForm.password" autocomplete="off" show-password
                              placeholder="请输入密码" @keyup.enter.native="LoginSubmit" class="loginInput">
                        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-checkbox v-model="LoginForm.remember">记住用户</el-checkbox>
                </el-form-item>
                <div class="login-button" @click="LoginSubmit">登 录</div>
            </el-form>
        </div>
        <div class="footer">
            <p>Copyright 2019 © Refull All rights reserved 建议使用“Chrome / IE / 搜狗高速” 浏览器</p>
        </div>
    </div>
</template>

<script>
  import { ipcRenderer } from 'electron';
  export default {
    name: 'Login',
    data () {
      return {
        LoginForm: {
          name: '',
          password: '',
          remember: false
        },
      }
    },
    mounted(){
      ipcRenderer.send('getPrinterList');
      ipcRenderer.on('getPrinterList',(event, data) => {
        //data就是打印机列表
        console.log("-------ipcRenderer------------")
        console.log(data)
        this.$store.dispatch('outParam/setOutParam', data)
      });
    },
    methods: {
      LoginSubmit () {
        let self = this
        if (!self.LoginForm.name) {
          self.$message.error('用户名不能为空!')
          return
        }
        if (!self.LoginForm.password) {
          self.$message.error('密码不能为空!')
          return
        }
        // setTimeout(function () {
        //   // let resp_data = JSON.parse(resp)
        //   let testData = {
        //     id: '12344234',
        //     user_name: '陈兴亮',
        //     user_account: 'chenxingliang',
        //     role_type: '1',
        //     role_name: '管理员'
        //   }
        //   self.$store.dispatch('user/setLoginUserDetail', testData).then(res => {
        //     self.$router.push({path: '/FirstPage'})
        //   })
        // },1000)
        self.$serRequestService('GetEnv_CODE', JSON.stringify(self.LoginForm)).then(function (resp) {
          if (resp == null) {
            self.$message.error('登陆异常!')
          } else {
            let resp_data = JSON.parse(resp)
            let testData = {
              id: '100002',
              user_name: '陈兴亮',
              user_account: 'chenxingliang',
              role_type: '1',
              role_name: '管理员'
            }
            self.$store.dispatch('user/setLoginUserDetail', testData).then(res => {
              let user = self.$store.getters.user;
              if(!user || !user.userInfo){
                self.$message.error('登录异常，请刷新后再登录!')
              }
              self.$router.push({path: '/FirstPage'})
            })
          }
        })
      }
    },
  }
</script>

<style scoped lang="scss">

    .Login {
        background-image: url(../assets/img/banner_bg1.jpg);
        height: 100vh;
        background-size: cover;

        .Header {
            height: 70px;
            line-height: 70px;
            color: #fff;
            background: rgba(0, 0, 0, 0.3);

            h3 {
                width: 100%;
                margin: 0 auto;
                padding: 0 100px;
                font-size: 30px;
                font-weight: normal;
            }

            span {
                font-size: 14px;
                font-weight: 400;
                float: right;
            }

            .logo_img {
                height: 70px;
                float: left;
            }
        }

        .loginBody {
            width: 600px;
            margin: 0 auto;
            height: 380px;
            background-color: rgba(255, 255, 255, 0.8);
            margin-top: calc(50vh - 280px);
            box-shadow: 0 0 20px #797575;
            padding: 40px 50px 50px 0;
            border-radius: 10px;

            .login-top {
                font-size: 24px;
                box-sizing: border-box;
                color: #333333;
                margin-bottom: 30px;
                text-align: center;
                padding-left: 50px;
            }

            .login-button {
                cursor: pointer;
                // width: 250px;
                text-align: center;
                padding: 10px 0px;
                background-color: #368ae0;
                margin: 0 auto;
                color: #ffffff;
                margin-left: 50px;
                font-size: 14px;
                border-radius: 4px;

                &:active {
                    opacity: 0.8;
                }
            }
        }

        .footer {
            color: #ffffff;
            position: fixed;
            bottom: 0px;
            width: 100%;
            padding: 10px;

            p {
                text-align: center;
            }
        }
    }
</style>
