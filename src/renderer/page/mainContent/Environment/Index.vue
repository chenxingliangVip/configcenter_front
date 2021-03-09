<template>
    <div class="ConfigManage" v-loading="loading">
        <!--<div class="top_line">-->
        <!--<h1>环 境 管 理</h1>-->
        <!--</div>-->
        <div class="config_top_btn">
            <div class="list" @click="cloneEnvir">
                <p class="zll-botton">克隆环境</p>
            </div>
            <div class="list" @click="editEnvir">
                <p class="zll-botton">编辑环境</p>
            </div>
            <div class="list" @click="delEnvir">
                <p class="zll-botton">删除环境</p>
            </div>
            <div class="list" @click="seeEnvir">
                <p class="zll-botton">查看环境</p>
            </div>
            <div class="clearBoth"></div>
        </div>
        <div class="Search_Top_Input">
            <div class="input_flex">
                <el-input clearable v-model="queryForm.key" placeholder="环境名称"></el-input>
            </div>
            <div class="input_flex" style="width: 240px">
                <el-select v-model="queryForm.ENV_ID" placeholder="请选择" clearable>
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
                <span class="zll-search" @click="searchEnvir">搜索</span>
            </div>
        </div>
        <div>
            <div  class="box-contain">
                <el-card class="box-card " style=" background: #A9D96C;cursor: pointer" @click.native="add()">
                    <img src="@/assets/img/plus.png">
                    <div style="color: white;font-size: inherit;font-family: 微软雅黑;font-weight: bold;letter-spacing: 2px">
                        创建项目
                    </div>
                </el-card>
                <draggable element="div" v-model="displayCard" class="box"  @change="handleDraggableFormItemChange">

                    <el-card @click.native="clickCard(envir)" class="box-card" v-for="(envir ,index) in displayCard "
                             :key="index"
                             :style="{background:envir.color}">
                        <!--<div class="new">-->
                        <!--<img src="@/assets/img/new.png" >-->
                        <!--</div>-->
                        <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                            {{envir.ENV_ENAME}}
                        </div>
                        <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                            {{envir.ENV_CNAME}}
                        </div>
                        <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                            组件应用数：{{envir.PRO_APP_COUNT}}
                        </div>
                    </el-card>
                </draggable>
                <el-card class="box-card more" v-show="environmentCards.length > displayLen" @click.native="moreCard">
                    <img src="@/assets/img/more.png" class="img-more" v-show="!extend">
                    <img src="@/assets/img/up.png" class="img-more" v-show="extend">
                    <p style="font-family: 微软雅黑">加载更多</p>
                </el-card>
            </div>
        </div>
        <div class="zll-dialog">
            <popout  :visible.sync="addDialog" v-show="addDialog" class="Config_add">
                <Add ref="add" slot="content" :titleTxt="type" @closeEnvir="closeEnvir" :editData="editData"></Add>
                <!--<template slot="bottom">-->
                    <!--<p class="zll-botton" v-if="type !== '查看'" @click="()=>{this.$refs.add.setFormData('addForm')}">提-->
                        <!--交</p>-->
                    <!--<p class="zll-botton" v-if="type == '查看'" @click="addDialog = false">确 定</p>-->
                <!--</template>-->
            </popout>
        </div>
    </div>
</template>

<script>
  import Add from './add'
  import draggable from 'vuedraggable'

  export default {
    data () {
      return {
        displayLen: 16,
        extend: false,
        queryForm: {
          page_num: 1,
          page_size: 1000,
          ENV_ID: '',
          key:''
        },
        searchList:[],
        // environmentCards: [],
        environmentCards:[
          {nameCn:"tomcat",nameEn:"tomcat",count:"2",professCount:"3",key: "1"},
          {nameCn:"无服务平台",nameEn:"serverless",count:"2",professCount:"3",key: "2"},
          {nameCn:"java1",nameEn:"java",count:"2",professCount:"3",key: "3"},
          {nameCn:"tomcat2",nameEn:"tomcat",count:"2",professCount:"3",key: "4"},
          {nameCn:"tomcat3",nameEn:"tomcat",count:"2",professCount:"3",key: "5"},
          {nameCn:"tomcat4",nameEn:"tomcat",count:"2",professCount:"3",key: "6"},
          {nameCn:"tomcat5",nameEn:"tomcat",count:"2",professCount:"3",key: "7"},
          {nameCn:"tomcat6",nameEn:"tomcat",count:"2",professCount:"3",key: "8"},
          {nameCn:"tomcat6",nameEn:"tomcat",count:"2",professCount:"3",key: "8"},
          {nameCn:"tomcat6",nameEn:"tomcat",count:"2",professCount:"3",key: "8"},
          {nameCn:"tomcat6",nameEn:"tomcat",count:"2",professCount:"3",key: "8"},
          {nameCn:"tomcat6",nameEn:"tomcat",count:"2",professCount:"3",key: "8"},
          {nameCn:"tomcat6",nameEn:"tomcat",count:"2",professCount:"3",key: "8"},
          {nameCn:"tomcat6",nameEn:"tomcat",count:"2",professCount:"3",key: "8"},
          {nameCn:"tomcat6",nameEn:"tomcat",count:"2",professCount:"3",key: "8"},
          {nameCn:"tomcat6",nameEn:"tomcat",count:"2",professCount:"3",key: "8"},
          {nameCn:"tomcat6",nameEn:"tomcat",count:"2",professCount:"3",key: "8"},
          {nameCn:"tomcat6",nameEn:"tomcat",count:"2",professCount:"3",key: "8"},
          {nameCn:"tomcat6",nameEn:"tomcat",count:"2",professCount:"3",key: "8"},
        ],
        displayCard: [],
        type: '',
        addDialog: false,
        loading: true, //table刷新
        currentCard: null,
        editData: {}
      }
    },
    methods: {
      handleDraggableFormItemChange(e){
        console.log("handleDraggableFormItemChange");
        console.log(e);
      },
      searchEnvir () {
        this.getEnvirCards();
      },
      clickCard (envir) {
        for (let data of this.environmentCards) {
          if (data != envir) {
            this.$set(data, 'color', '')
          }
        }
        let color = envir.color
        if (!color) {
          this.$set(envir, 'color', '#b2c7ec')
          this.currentCard = envir
        } else {
          envir.color = ''
          this.currentCard = null
        }
      },
      moreCard () {
        this.extend = !this.extend
        if (this.extend) {
          this.displayCard = this.environmentCards
        } else {
          this.displayCard = this.environmentCards.slice(0, this.displayLen)
        }
      },
      // getEnvirCards () { //获取表格数据
      //   let self = this
      //   self.loading = true
      //   self.$serRequestService('GetEnv_CODE', JSON.stringify(self.queryForm)).then(function (resp) {
      //     if (resp == null) {
      //       self.$message.error('查询出错!')
      //     } else {
      //       let resp_data = JSON.parse(resp)
      //       console.log(resp_data.data)
      //       self.environmentCards = resp_data.data.list;
      //       self.searchList = self.searchList.length == 0?JSON.parse(JSON.stringify(self.environmentCards)):self.searchList;
      //       if (self.environmentCards.length > 16) {
      //         self.displayCard = self.environmentCards.slice(0, self.displayLen)
      //       } else {
      //         self.displayCard = self.environmentCards
      //       }
      //       self.loading = false
      //     }
      //   })
      // },
      getEnvirCards () { //获取表格数据
        let self = this
        self.loading = true
        setTimeout(()=>{
          if (self.environmentCards.length > 16) {
            self.displayCard = self.environmentCards.slice(0, self.displayLen)
          } else {
            self.displayCard = self.environmentCards
          }
          self.loading = false
        },500)
      },
      add () { //新增
        this.addDialog = true
        this.editData = {
          env_ename: '',
          env_cname: '',
          comm_app_count: '',
          pro_app_count: '',
        },
          this.type = 'add'
      },
      editEnvir () { //编辑
        if (this.currentCard == null) {
          this.$message.warning('请选中需要编辑的配置项!')
          return
        }
        this.editData = Object.assign({}, this.currentCard)
        this.addDialog = true
        this.type = 'edit'
      },

      cloneEnvir () { //编辑
        if (this.currentCard == null) {
          this.$message.warning('请选中需要克隆的配置项!')
          return
        }
        this.editData = Object.assign({}, this.currentCard)
        this.addDialog = true
        this.type = 'clone'
      },
      seeEnvir () { //查看
        if (this.currentCard == null) {
          this.$message.warning('请选中需要查看的配置项!')
          return
        }
        this.editData = Object.assign({}, this.currentCard)
        this.addDialog = true
        this.type = 'see'
      },
      delEnvir () { //删除
        let self = this
        if (self.currentCard == null) {
          self.$message.warning('请选中需要删除的配置项!')
          return
        }
        self.$confirm('确定删除该记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$serRequestService("DelEnv_CODE",JSON.stringify({ENV_ID: this.currentCard.ENV_ID})).then(function (data) {
            if (data == null) {
              self.$message.error('删除环境配置出错!')
            } else {
              self.$message.success('删除成功!')
              self.getEnvirCards()
            }
          })
        })
      },

      closeEnvir (data) {
        this.getEnvirCards()
        this.addDialog = false
      }
    },
    mounted () {
      this.getEnvirCards() //显示table
      this.$dragging.$on('dragged', ({value}) => {
        console.log(value)
      })
      this.$dragging.$on('dragend', (res) => {
        console.error(res)
      })
    },
    components: {
      Add,
      draggable
    },
  }
</script>
<style scoped lang="scss">
    @import "@/assets/style/SearchTop.scss";

    .box-contain {
        display: flex;
        flex-wrap: wrap;
        height: auto;

        .box {
            display: flex;
            flex-wrap: wrap;
            width: calc(100% - 50px);

            .box-card {
                width: calc(16.667% - 10px);
                margin: 5px;
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

                /*&:active {*/
                /*background: #f2fbe8;*/
                /*}*/
            }
        }

        .more {
            width: 50px;

            span {
                cursor: pointer;
                margin-top: 40px;
            }
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
