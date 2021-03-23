<template>
    <div class="ConfigManage">
        <div class="Search_Top_Input">
            <div class="input_flex">
                <el-select v-model="queryForm.env_id" placeholder="请选择" clearable filterable>
                    <el-option
                            v-for="(item,index) in searchList"
                            :key="index"
                            :label="item.ENV_CNAME"
                            :value="item.ENV_ID">
                        <span style="float: left">{{ item.ENV_CNAME }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.ENV_ENAME }}</span>
                    </el-option>
                </el-select>
            </div>
            <div class="">
                <span class="zll-search" @click="searchApp">搜索</span>
            </div>
        </div>
        <div class="box-contain contain1">
            <div class="box_left">
                <div class="txt">我的项目</div>
            </div>
            <div class="box">
                <el-card class="box-card add" style=" background: #A9D96C;" @click.native="addApp()">
                    <img src="@/assets/img/plus.png">
                    <div style="color: white;font-size: inherit;font-family: 微软雅黑;font-weight: bold;letter-spacing: 2px">
                        创建应用
                    </div>
                </el-card>

                <el-card class="box-card card" v-for="envir in myApp.displayCard " :key="envir.key"
                         v-dragging="{ item: envir, list:  myApp.displayCard, group: 'envir' }">
                    <div class="new"  v-show="envir.tag">
                        <img src="@/assets/img/new.png">
                    </div>
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.APP_CNAME}}
                    </div>
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.APP_ENAME}}
                    </div>
                    <div class="icon_img">
                        <!--<p class="el-icon-circle-plus-outline" title="克隆" @click.stop="cloneEnvir"></p>-->
                        <p class="el-icon-delete" title="删除" @click.stop="delApp(envir)"></p>
                        <p class="el-icon-edit" title="编辑" @click.stop="editApp(envir)"></p>
                        <p class="el-icon-search" title="查看" @click.stop="seeApp(envir)"></p>
                    </div>
                    <!--<div style="color: black;font-size: inherit;font-family: 微软雅黑">-->
                    <!--{{envir.count}}-->
                    <!--</div>-->
                </el-card>
                <el-card class="box-card more" v-show="myApp.myAppCards.length > 10" @click.native="moreMyAppCard">
                    <img src="@/assets/img/more.png" class="img-more" v-show="!myApp.extend">
                    <img src="@/assets/img/up.png" class="img-more" v-show="myApp.extend">
                    <p style="font-family: 微软雅黑">加载更多</p>
                </el-card>
            </div>
            <div class="clearBoth"></div>
        </div>
        <div class="box-contain contain2">
            <div class="box_left box_left2">
                <div class="txt">收藏的项目</div>
            </div>
            <div class="box">
                <el-card class="box-card card" v-for="envir in favApp.displayCard " :key="envir.key"
                         v-dragging="{ item: envir, list: favApp.displayCard , group: 'envir' }">
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.APP_CNAME}}
                    </div>
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.APP_ENAME}}
                    </div>
                    <div class="icon_img">
                        <p class="el-icon-star-on"  style="font-size: 21px" title="取消收藏" @click.stop="delCollectionApp(envir,'1')"></p>
                    </div>
                    <!--<div style="color: black;font-size: inherit;font-family: 微软雅黑">-->
                        <!--{{envir.count}}-->
                    <!--</div>-->
                </el-card>
                <el-card class="box-card more" v-if="favApp.myAppCards.length > 10" @click="moreFavAppCard">
                    <img src="@/assets/img/more.png" class="img-more" v-show="!favApp.extend">
                    <img src="@/assets/img/up.png" class="img-more" v-show="favApp.extend">
                    <p style="font-family: 微软雅黑">加载更多</p>
                </el-card>
            </div>
            <div class="clearBoth"></div>
        </div>
        <div class="box-contain contain3">
            <div class="box_left box_left3">
                <div class="txt">最近浏览的项目</div>
            </div>
            <div class="box">
                <el-card class="box-card card" v-for="envir in hisApp.displayCard " :key="envir.key"
                         v-dragging="{ item: envir, list: hisApp.displayCard, group: 'envir' }">
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.APP_CNAME}}
                    </div>
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.APP_ENAME}}
                    </div>
                    <div class="icon_img">
                        <p class="el-icon-star-off"  style="font-size: 19px" title="收藏" @click.stop="collectionApp(envir)"></p>
                        <p class="el-icon-delete"  title="删除" @click.stop="delCollectionApp(envir,'2')"></p>
                    </div>
                    <!--<div style="color: black;font-size: inherit;font-family: 微软雅黑">-->
                        <!--{{envir.count}}-->
                    <!--</div>-->
                </el-card>
            </div>
            <div class="clearBoth"></div>
        </div>
        <div class="zll-dialog">
            <popout :visible.sync="addDialog" v-show="addDialog" class="Config_add">
                <Add ref="add" slot="content" :addType="type" :editData="editData" :envList="searchList" @closeApp="closeApp"></Add>
            </popout>
        </div>
    </div>
</template>

<script>
  import Add from './add'

  export default {
    data () {
      return {
        searchList:[],
        type: '',
        addDialog: false,
        editData:{},
        queryForm: {
          page_num: 1,
          page_size: 1000,
          user_id:'',
          focus_type:'',
          env_id:''
        },

        myApp: {
          myAppCards: [],
          displayCard: [],
          loading: false,
          extend:false
        },
        favApp: {
          myAppCards: [],
          displayCard: [],
          loading: false,
          extend:false
        },
        hisApp: {
          displayCard: [],
          loading: false,
          extend:false
        }
      }
    },
    methods: {
      closeApp(){
        this.getMyAppList();
        this.addDialog = false
      },
      searchApp(){
        this.getMyAppList();
        this.getFavList();
        this.getHisList();
      },
      initUserInfo(object){
        let self = this;
        let userInfo = self.$store.getters.user.userInfo;
        if(!userInfo){
          self.$message.error('获取用户信息出错!');
          return;
        }
        if(this.type == 'add'){
          object.create_user_id = userInfo.id;
          object.create_user_name = userInfo.user_name;
        }
        object.modify_user_id = userInfo.id;
        object.modify_user_name = userInfo.user_name;
      },
      addApp(){
        this.addDialog = true
        this.type = 'add'
        let editData = {
          app_ename: '',
          app_cname: '',
          app_id:'',
          env_id:'',
        }
        this.initUserInfo(editData);
        this.editData = editData;

      },
      editApp (item) { //编辑
        this.type = 'edit'
        let editData = {
          app_ename: '',
          app_cname: '',
          app_id:'',
          env_id:'',
        };
        this.initUserInfo(editData);
        editData.app_ename = item.APP_ENAME;
        editData.app_cname = item.APP_CNAME;
        editData.app_id = item.APP_ID;
        editData.env_id = item.ENV_ID;
        editData.create_user_id = item.CREATE_USER_ID;
        editData.create_user_name = item.CREATE_USER_NAME;
        this.editData = editData;
        this.addDialog = true
      },

      seeApp (item) { //查看
        let editData = {
          app_ename: '',
          app_cname: '',
          app_id:'',
          env_id:'',
        };
        this.initUserInfo(editData);
        editData.app_ename = item.APP_ENAME;
        editData.app_cname = item.APP_CNAME;
        editData.app_id = item.APP_ID;
        editData.env_id = item.ENV_ID;
        editData.create_user_id = item.CREATE_USER_ID;
        editData.create_user_name = item.CREATE_USER_NAME;
        this.editData = editData;
        this.addDialog = true
        this.type = 'see'
      },

      delApp (item) { //删除
        let self = this
        let ids = {ids: [item.APP_ID]}
        self.$confirm('确定删除该记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$serRequestService('DelApp_CODE', JSON.stringify(ids)).then(function (data) {
            if (data == null||!JSON.parse(data).status) {
              self.$message.error('删除环境配置出错!')
            } else {
              self.$message.success('删除成功!')
              self.getMyAppList()
            }
          })
        })
      },
      getEnvirQueryList () { //获取表格数据
        let self = this
        let queryForm = { page_num: 1, page_size: 1000,};
        self.$serRequestService('GetEnv_CODE', JSON.stringify(queryForm)).then(function (resp) {
          if (resp == null) {
            self.$message.error('查询出错!')
          } else {
            let resp_data = JSON.parse(resp)
            self.searchList =  resp_data.data.list;
          }
        })
      },

      collectionApp(item){
        let self = this;
        let userInfo = self.$store.getters.user.userInfo;
        let param = {};
        param.user_id = userInfo.id;
        param.app_id = item.APP_ID;
        param.focus_type = '1';
        self.$serRequestService('AddFocusApp_CODE', JSON.stringify(param)).then(function (data) {
          if (data == null||!JSON.parse(data).status) {
            self.$message.error('已经收藏!')
          } else {
            self.$message.success('收藏成功!')
            self.getFavList();
            self.getHisList();
          }
        })
      },

      delCollectionApp(item,type){
        let self = this;
        let userInfo = self.$store.getters.user.userInfo;
        let param = {list:[{user_id:userInfo.id,app_id:item.APP_ID,focus_type:type}]};
        self.$confirm(type=='1'?'确定取消收藏？':'确定删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$serRequestService('DelFocusApp_CODE', JSON.stringify(param)).then(function (data) {
            if (data == null||!JSON.parse(data).status) {
              self.$message.error(type=='1'?'取消收藏出错!':'删除出错')
            } else {
              self.$message.success(type=='1'?'取消收藏成功!':'删除成功')
              if(type == '1'){
                self.getFavList();
              }
              if(type == '2'){
                self.getHisList();
              }
            }
          })
        })
      },
      moreMyAppCard(){
        this.myApp.extend = !this.myApp.extend
        if (this.myApp.extend) {
          this.myApp.displayCard = this.myApp.myAppCards
        } else {
          this.myApp.displayCard = this.myApp.myAppCards.slice(0, 10)
        }
      },

      moreFavAppCard(){
        this.favApp.extend = !this.favApp.extend
        if (this.favApp.extend) {
          this.favApp.displayCard = this.favApp.myAppCards
        } else {
          this.favApp.displayCard = this.favApp.myAppCards.slice(0, 10)
        }
      },

      getMyAppList () {
        let self = this
        self.myApp.loading = true
        self.$serRequestService('GetApp_CODE', JSON.stringify(self.queryForm)).then(function (resp) {
          if (resp == null) {
            self.$message.error('查询出错!')
          } else {
            let resp_data = JSON.parse(resp)
            console.log(resp_data.data)
            self.myApp.myAppCards = resp_data.data.list
            if (self.myApp.myAppCards.length > 10) {
              self.myApp.displayCard = self.myApp.myAppCards.slice(0, 10)
            } else {
              self.myApp.displayCard = self.myApp.myAppCards
            }
            for (let data of self.myApp.displayCard) {

              let CREATE_TIME = data.CREATE_TIME*1000;
              let nowDate = (new Date()).getTime()
              if (nowDate - CREATE_TIME < 3 *24 *3600 *1000) {
                 data.tag = true;
              }
            }
            self.myApp.loading = false
          }
        })
      },

      getHisList () {
        let self = this
        let user = self.$store.getters.user;
        self.queryForm.user_id = user.userInfo.id
        self.hisApp.loading = true
        self.hisApp.displayCard = [];
        let param = Object.assign({}, self.queryForm);
        param.focus_type='2';
        self.$serRequestService('GetFocusApp_CODE', JSON.stringify(param)).then(function (resp) {
          if (resp == null) {
            self.$message.error('查询出错!')
          } else {
            let resp_data = JSON.parse(resp)
            for (let data of resp_data.data.list) {
              self.hisApp.displayCard.push(data);
              if(self.hisApp.displayCard.length >= 6){
                return;
              }
            }
            self.hisApp.loading = false
          }
        })
      },

      getFavList () {
        let self = this
        let user = self.$store.getters.user;
        self.queryForm.user_id = user.userInfo.id
        self.favApp.loading = true
        self.favApp.myAppCards = [];
        let param = Object.assign({}, self.queryForm);
        param.focus_type = '1';
        self.$serRequestService('GetFocusApp_CODE', JSON.stringify(param)).then(function (resp) {
          if (resp == null) {
            self.$message.error('查询出错!')
          } else {
            let resp_data = JSON.parse(resp)
            console.log("-------------")
            console.log(resp_data.data)
            for (let data of resp_data.data.list) {
              self.favApp.myAppCards.push(data)
            }
            if (self.favApp.myAppCards.length > 10) {
              self.favApp.displayCard = self.favApp.myAppCards.slice(0, 10)
            } else {
              self.favApp.displayCard = self.favApp.myAppCards
            }
            self.favApp.loading = false
          }
        })
      },
    },
    mounted () {
      this.getMyAppList();
      this.getFavList();
      this.getHisList();
      this.getEnvirQueryList();
      this.$dragging.$on('dragged', ({value}) => {
        console.log(value.item)
        console.log(value.list)
        console.log(value)
      })
      this.$dragging.$on('dragend', (res) => {
        console.error(res)
      })
    },
    components: {
      Add,
    },
  }
</script>
<style scoped lang="scss">
    @import "@/assets/style/SearchTop.scss";

    .box-contain {
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        border: 1px solid #e8e8e8;
        height: auto;

        .add {
            background: #A9D96C;
            width: calc(16.667% - 10px);
            margin: 5px;
            text-align: center;
            height: 90px;
            transition: transform .3s;
            cursor: pointer;
            float: left;

            .addclick {
                color: #fff;
                font-size: inherit;
                font-family: 微软雅黑;
                font-weight: bold;
                letter-spacing: 2px
            }
        }

        .box_left {
            width: 140px;
            min-height: 130px;
            background: rgb(169, 217, 108);
            color: #fff;
            font-size: 14px;
            font-family: 微软雅黑;
            margin-right: 10px;

            &.box_left2 {
                background: #409eff;
            }

            &.box_left3 {
                background: #34bfc6;
            }

            .txt {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
            }
        }

        .box {
            width: calc(100% - 150px);
            display: flex;
            flex-wrap: wrap;
            background: #fff;
            padding: 10px 0;

            .card{
                &:hover {
                    transform: scale(1.05);
                }
            }

            .box-card {
                width: calc(16.667% - 10px);
                margin: 6px 5px;;
                text-align: center;
                height: 90px;
                transition: transform .3s;
                position: relative;

                &.dragging {
                    transform: scale(1.1);
                }

                &.more {
                    cursor: pointer;

                    .img-more {
                        width: 25px;
                    }
                }

                &:hover {
                    .icon_img {
                        opacity: 1;
                        transition: all .5s;
                    }
                }

                .icon_img {
                    opacity: 0;
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 20px;
                    height: 100%;

                    p {
                        font-size: 16px;
                        margin: 3px 0;

                        &:hover {
                            color: #A9D96C;
                            cursor: pointer;
                            font-weight: 600;
                        }
                    }

                    .el-icon-delete {
                        color: #b50e0e;
                    }

                    .el-icon-edit {
                        color: blue;
                    }

                    .el-icon-search {
                        color: black;
                    }
                }

                .new {
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            }
        }

        &.contain1 {
            /*.box-card:active {*/
            /*background: #f2fbe8;*/
            /*} */
        }

        &.contain2 {
            /*.box-card:active {*/
            /*background: #e7f3ff;*/
            /*} */
        }

        &.contain3 {
            /*.box-card:active {*/
            /*background: #ecfeff;*/
            /*}*/
        }
    }

    .in-out-translate-fade-enter-active, .in-out-translate-fade-leave-active {
        transition: all .5s;
    }

    .in-out-translate-fade-enter, .in-out-translate-fade-leave-active {
        opacity: 0;
    }

    .in-out-translate-fade-enter {
        transform: translate3d(100%, 0, 0);
    }

    .in-out-translate-fade-leave-active {
        transform: translate3d(-100%, 0, 0);
    }

    .ConfigManage {
        .top_line {
            height: 60px;
            line-height: 60px;
            border-bottom: 5px solid #efefef;
            margin-bottom: 20px;

            h1 {
                text-align: center;
                color: #3a8ee6;
                font-weight: normal;
            }
        }
    }

    .config_top_btn {
        margin-bottom: 20px;

        .list {
            width: 25%;
            float: left;

            .zll-botton {
                width: 120px;
                border-radius: 8px;
                margin-left: 90px;
            }
        }
    }
</style>
