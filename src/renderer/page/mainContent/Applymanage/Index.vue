<template>
    <div class="ConfigManage">
        <!--<div class="top_line">-->
        <!--<h1>应 用 管 理</h1>-->
        <!--</div>-->
        <div class="config_top_btn">
            <div class="list">
                <p class="zll-botton" @click="add()">新增配置</p>
            </div>
            <div class="list">
                <p class="zll-botton">编辑配置</p>
            </div>
            <div class="list">
                <p class="zll-botton">删除配置</p>
            </div>
            <div class="list">
                <p class="zll-botton">返回</p>
            </div>
            <div class="clearBoth"></div>
        </div>
        <div class="Search_Top_Input">
            <div class="input_flex">
                <el-input clearable v-model="searchInput1" placeholder="环境"></el-input>
            </div>
            <div class="input_flex">
                <el-select clearable v-model="searchInput2" placeholder="环境">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                </el-select>
            </div>
            <div class="">
                <span class="zll-search">搜索</span>
                <span class="zll-search-reset">重置</span>
            </div>
        </div>
        <div class="box-contain contain1">
            <div class="box_left">
                <div class="txt">我的项目</div>
            </div>
            <div class="box">
                <el-card class="box-card" style=" background: #A9D96C;">
                    <img src="@/assets/img/plus.png">
                    <div style="color: white;font-size: inherit;font-family: 微软雅黑;font-weight: bold;letter-spacing: 2px">
                        创建项目
                    </div>
                </el-card>

                <el-card class="box-card" v-for="envir in myApp.displayCard " :key="envir.key"
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
                    <!--<div style="color: black;font-size: inherit;font-family: 微软雅黑">-->
                    <!--{{envir.count}}-->
                    <!--</div>-->
                </el-card>
                <el-card class="box-card more" v-show="myApp.myAppCards.length > 10" @click="moreMyAppCard">
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
                <el-card class="box-card" v-for="envir in favApp.displayCard " :key="envir.key"
                         v-dragging="{ item: envir, list: favApp.displayCard , group: 'envir' }">
                    <div class="new">
                        <img src="@/assets/img/new.png">
                    </div>
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.nameCn}}
                    </div>
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.nameEn}}
                    </div>
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.count}}
                    </div>
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
                <el-card class="box-card" v-for="envir in hisApp.displayCard " :key="envir.key"
                         v-dragging="{ item: envir, list: hisApp.displayCard, group: 'envir' }">
                    <div class="new">
                        <img src="@/assets/img/new.png">
                    </div>
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.nameCn}}
                    </div>
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.nameEn}}
                    </div>
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.count}}
                    </div>
                </el-card>
                <el-card class="box-card more" v-if="hisApp.myAppCards.length > 10" @click="moreHisAppCard">
                    <img src="@/assets/img/more.png" class="img-more" v-show="!hisApp.extend">
                    <img src="@/assets/img/up.png" class="img-more" v-show="hisApp.extend">
                    <p style="font-family: 微软雅黑">加载更多</p>
                </el-card>
            </div>
            <div class="clearBoth"></div>
        </div>
    </div>
</template>

<script>
  import Add from './add'

  export default {
    data () {
      return {
        searchInput1: '',
        searchInput2: '',
        environmentCards: [
          {nameCn: 'tomcat', nameEn: 'tomcat', count: '2', professCount: '3', key: '1'},
          {nameCn: '无服务平台', nameEn: 'serverless', count: '2', professCount: '3', key: '2'},
          {nameCn: 'java1', nameEn: 'java', count: '2', professCount: '3', key: '3'},
          {nameCn: 'tomcat2', nameEn: 'tomcat', count: '2', professCount: '3', key: '4'},
          {nameCn: 'tomcat3', nameEn: 'tomcat', count: '2', professCount: '3', key: '5'},
          {nameCn: 'tomcat4', nameEn: 'tomcat', count: '2', professCount: '3', key: '6'},
          {nameCn: 'tomcat5', nameEn: 'tomcat', count: '2', professCount: '3', key: '7'},
          {nameCn: 'tomcat6', nameEn: 'tomcat', count: '2', professCount: '3', key: '8'},
        ],
        type: '',
        addDialog: false,
        searchData1: '',
        searchData2: '',
        tableData: [
          {
            date: 'dname1',
            name: 'jkxt-proxy',
            address: '无信息',
            state: '2016-05-02'
          }, {
            date: 'css-sta1',
            name: 'jkxt-graph',
            address: '内存配置升级',
            state: '2016-05-02'
          }, {
            date: 'css-sta2',
            name: 'jkxt1',
            address: '服务器地址更新',
            state: '2016-05-02'
          },
        ],
        tableHeader: [],
        tableLoading: true, //table刷新，

        queryForm: {
          page_num: 1,
          page_size: 1000,
          USER_ID:'100002'
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
          myAppCards: [],
          displayCard: [],
          loading: false,
          extend:false
        }
      }
    },
    methods: {
      moreMyAppCard(){
        this.myApp.extend = !this.myApp.extend
        if (this.myApp.extend) {
          this.myApp.displayCard = this.myApp.myAppCards
        } else {
          this.myApp.displayCard = this.myApp.environmentCards.slice(0, 10)
        }
      },

      moreFavAppCard(){
        this.favApp.extend = !this.favApp.extend
        if (this.favApp.extend) {
          this.favApp.displayCard = this.favApp.myAppCards
        } else {
          this.favApp.displayCard = this.favApp.environmentCards.slice(0, 10)
        }
      },

      moreHisAppCard(){
        this.hisApp.extend = !this.hisApp.extend
        if (this.hisApp.extend) {
          this.hisApp.displayCard = this.hisApp.myAppCards
        } else {
          this.hisApp.displayCard = this.hisApp.environmentCards.slice(0, 10)
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

      getFavAndHisList () {
        let self = this
        self.favApp.loading = true
        self.hisApp.loading = true
        self.favApp.myAppCards = [];
        self.hisApp.myAppCards = [];
        self.$serRequestService('GetFocusApp_CODE', JSON.stringify(self.queryForm)).then(function (resp) {
          if (resp == null) {
            self.$message.error('查询出错!')
          } else {
            let resp_data = JSON.parse(resp)
            console.log("-------------")
            console.log(resp_data.data)
            for (let data of resp_data.data.list) {
              let type = data.FOCUS_TYPE;
              if(type == 1){
                self.favApp.myAppCards.push(data)
              }else {
                self.hisApp.myAppCards.push(data)
              }
            }
            if (self.favApp.myAppCards.length > 10) {
              self.favApp.displayCard = self.favApp.myAppCards.slice(0, 10)
            } else {
              self.favApp.displayCard = self.favApp.myAppCards
            }

            if (self.hisApp.myAppCards.length > 10) {
              self.hisApp.displayCard = self.hisApp.myAppCards.slice(0, 10)
            } else {
              self.hisApp.displayCard = self.hisApp.myAppCards
            }
            self.favApp.loading = false
            self.hisApp.loading = false
          }
        })
      },
      getTableList () { //获取表格数据
        this.tableLoading = true
        setTimeout(() => {
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i]['index'] = i + 1
          }
          this.tableHeader = [
            {columnValue: 'index', columnName: '序号', width: '50'},
            {columnValue: 'date', columnName: '配置项',},
            {columnValue: 'name', columnName: '配置值'},
            {columnValue: 'address', columnName: '备注'},
            {columnValue: 'state', columnName: '更新时间'},
          ]
          this.tableData = JSON.parse(JSON.stringify(this.tableData))
          this.tableLoading = false
        }, 500)
      },
      add () { //新增
        this.addDialog = true
        this.type = '新增'
      },
      edit () { //编辑
        this.addDialog = true
        this.type = '编辑'
      },
      goDetail () { //查看
        this.addDialog = true
        this.type = '查看'
      },
      getFormData (data) {

      },
      cancal (index, rows) { //删除
        rows.splice(index, 1)
        this.getTableList()
      },
    },
    mounted () {
      this.getMyAppList();
      this.getFavAndHisList();
      this.getTableList() //显示table
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

        .box_left {
            width: 140px;
            height: 130px;
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
                    transform: scale(1.05);
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
