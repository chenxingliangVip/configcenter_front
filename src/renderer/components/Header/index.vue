<template>
    <div class="header" :style="{backgroundColor:$store.state.leftMenu.colorData.top.topBgColor,color:$store.state.leftMenu.colorData.top.topFontColor}">
        <div class="Title_header" :style="{backgroundColor:$store.state.leftMenu.colorData.top.topBgColor,color:$store.state.leftMenu.colorData.top.topFontColor}" >
            <img class="Roms" src="@/assets/img/Roms1.png" />
            <span class="splite">|</span> 配置管理系统
        </div>
        <!-- <div class="user">
            <span>{{ userInfo }}</span>
            <span class="loginOut" @click="loginOut('Login')">退出</span>
        </div> -->
        <!-- 右侧按钮 -->
        <div class="header_user" :style="{backgroundColor:$store.state.leftMenu.colorData.top.topBgColor,color:$store.state.leftMenu.colorData.top.topFontColor}">
            <!-- <div class="headalist"  @click="showTheme = true">
                <span class="changeColor" title="切换主题"><i class="el-icon-orange"></i></span>
            </div> -->
            <div class="headalist headLayout">
                <span>{{ userInfo }} <i class="el-icon-caret-bottom"></i></span>
                <div class="mouseHoverParent">
                    <div class="mouseHover">
                        <p @click="resetDialog = true"><i class="el-icon-key"></i> 修改密码</p>
                        <p @click="addDialog = true"><i class="el-icon-folder-add"></i> 功能标签</p>
                        <p @click="loginOut('Login')"><i class="el-icon-switch-button"></i> 退出登录</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 导航栏 -->
        <div class="menuListParent" ref="mainViewNavParent" :class="$store.state.leftMenu.leftMenuMin && 'max'">
            <div class="fold-icon" @click="setLeftMenuMin"><i :class="$store.state.leftMenu.leftMenuMin ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i></div>
            <div class="menuList">
                <li v-for="(item,index) in menuList" :key="item.routeName"
                            @click="goPage(item.routeName)"
                            v-bind:class="{active:$route.name == item.routeName}"
                            :style="{'background-color': $route.name == item.routeName ? $store.state.leftMenu.colorData.top.topBgColor : '#dddddd','border-color': $route.name == item.routeName ? $store.state.leftMenu.colorData.top.topBgColor : '#cccccc',}">
                    {{item.name}}
                    <span v-if="index" @click.stop="closePage(index,item.routeName)" class="el-icon-close"></span>
                </li>
                <div class="clearBoth"></div>
                <div class="closeAll">
                    <i class="el-icon-arrow-down"></i>
                    <div class="mouseHovercloseAll">
                        <div class="mouseHover">
                            <p @click="closeNow()">关闭当前标签</p>
                            <p @click="closeOthers()">关闭其他标签</p>
                            <p @click="closeAll()">关闭全部标签</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!--修改密码-->
        <div class="zll-dialog changePassword">
            <popout title="修改密码" :visible.sync="resetDialog" v-if="resetDialog" class="minSize">
                <password ref="reset" slot="content" @resetForm="getResetFormData"></password>
                <template slot="bottom">
                    <p class="zll-botton" @click="()=>{this.$refs.reset.setResetFormData('resetForm')}">提 交</p>
                </template>
            </popout>
        </div>
        <!--功能标签-->
        <div class="zll-dialog changePassword">
            <popout title="功能标签" :visible.sync="addDialog" v-if="addDialog">
                <addLabel ref="add" slot="content" @addForm="getaddFormData"></addLabel>
                <template slot="bottom">
                    <p class="zll-botton" @click="()=>{this.$refs.add.setAddFormData('addForm')}">提 交</p>
                </template>
            </popout>
        </div>
        <!--切换主题-->
        <color-popout :showPopout.sync="showTheme"></color-popout>
    </div>
</template>

<script>
    import colorPopout from '@/components/colorPopout/index'
    import password from './changePassword'
    import addLabel from './addLabel'
    export default {
        components:{ colorPopout, password, addLabel },
        data(){
			return {
			    menuList:[{name:'首页',routeName:'FirstPage'}],
                showTheme:false, //主题弹框显示
                addDialog: false,
                resetDialog: false,
                userInfo: '',
            }
        },
        methods: {
            setLeftMenuMin(){//设置切换左侧菜单最小化
                this.$store.commit('leftMenu/SET_leftMenuMin',!this.$store.state.leftMenu.leftMenuMin);
            },
            setMenu(routeData){//父组件调用
                for (let i = 0; i < this.menuList.length; i++) {
                    if(this.menuList[i].routeName == routeData.name) {
                        this.goPage(routeData.name);
                        return;
                    }
                }
                this.menuList.push({name:routeData.meta.title,routeName:routeData.name})
                this.goPage(routeData.name);
            },
            goPage(name){//页面跳转
                if(this.$route.name != name) this.$router.push({name});

                this.$nextTick(()=>{//head nav已更新 计算滚动位置
                    let mainViewNavParent = this.$refs.mainViewNavParent;//滚动标签
                    let activeLi = mainViewNavParent.getElementsByClassName('active')[0],//选中的标签
                        scrollRight = mainViewNavParent.scrollWidth - mainViewNavParent.offsetWidth;//滚动条的距离(最大滚动距离)

                    //距离父标签得距离(应该滚动的距离)
                    let distance = activeLi.offsetLeft;
                    //应该滚动的距离小于最大滚动距离时候 滚动为应该滚动 否则为最大滚动距离
                    this.$refs.mainViewNavParent.scrollLeft = distance < scrollRight ? distance : scrollRight;
                })
            },
            closePage(index,name){//关闭页面
                if(this.$route.name == name) {//关闭了当前
                    this.goPage(this.menuList[index - 1].routeName);
                }
                this.menuList.splice(index, 1);
            },
            closeAll(){//关闭全部标签
                this.menuList= [{name:'首页',routeName:'FirstPage'}]
                this.goPage('FirstPage');
            },
            closeNow(){ //关闭当前标签
                for (let i = 0; i < this.menuList.length; i++) {
                    if(this.$route.name != "FirstPage"){
                        if(this.menuList[i].routeName == this.$route.name) {
                            this.menuList.splice(i, 1);
                            this.goPage(this.menuList[i-1].routeName);
                        }
                    }
                }
            },
            closeOthers(){//关闭其他标签
                for (let i = 0; i < this.menuList.length; i++) {
                    if(this.$route.name != "FirstPage"){
                        if(this.menuList[i].routeName == this.$route.name) {
                            this.menuList= [
                                {
                                    name:'首页',routeName:'FirstPage'
                                },{
                                    name:this.$route.meta.title,routeName:this.$route.name
                                }
                            ]
                        }
                    }
                }
            },
            loginOut(name){//退出登录
                localStorage.setItem('loginStatus',0) //设置登录状态为未登录
                if(this.$route.name != name) this.$router.push({name});
            },
            getResetFormData(data){ //修改密码
                this.resetDialog = false
                console.log(data)
            },
            getaddFormData(data) {//功能标签
                this.addDialog = false
            },
        },
        mounted() {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.userInfo = userInfo.name;
        }
    }
</script>

<style scoped lang="scss">
    @import "~@/assets/style/Header.scss";
</style>
