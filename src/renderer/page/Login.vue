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
  import {getRoutePages} from '@/router'

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
    methods: {
      LoginSubmit () {
        if (this.LoginForm.name) {
          if (this.LoginForm.password) {
            //登录成功
            localStorage.setItem('loginStatus', 1) //设置登录状态为已登录
            localStorage.setItem('userInfo', JSON.stringify(this.LoginForm)) //记录登录信息

            this.$router.addRoutes([getRoutePages()])//添加路由
            this.$router.push({
              name: 'FirstPage'
            })
            return
          }
          this.$message.error('密码不能为空!')
          return
        } else {
          this.$message.error('用户名不能为空!')
        }
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
