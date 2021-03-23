<template>
    <div class="ConfigManage" v-loading="loading">
        <div class="Search_Top_Input">
            <div class="input_flex">
                <el-input clearable v-model="queryForm.key" placeholder="环境名称"></el-input>
            </div>
            <div class="input_flex" style="width: 240px">
                <el-select v-model="queryForm.ENV_ID" placeholder="请选择" clearable filterable>
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
            <div class="box-contain">
                <el-card class="box-card add" @click.native="add()">
                    <img src="@/assets/img/plus.png">
                    <div class="addclick">创建环境</div>
                </el-card>

                <draggable element="div" v-model="displayCard" class="box" @change="handleDraggableFormItemChange">
                    <el-card @click.native="clickCard(envir)" class="box-card" v-for="(envir ,index) in displayCard "
                             :key="index"
                             :style="{background:envir.color}">
                        <div class="box_inner"> {{envir.ENV_ENAME}}</div>
                        <div class="box_inner"> {{envir.ENV_CNAME}}</div>
                        <div class="box_inner"> 组件应用数：{{envir.PRO_APP_COUNT}}</div>
                        <div class="icon_img">
                            <p class="el-icon-delete" title="删除" @click.stop="delEnvir(envir)"></p>
                            <p class="el-icon-edit" title="编辑" @click.stop="editEnvir(envir)"></p>
                            <p class="el-icon-search" title="查看" @click.stop="seeEnvir(envir)"></p>
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
            <popout :visible.sync="addDialog" v-show="addDialog" class="Config_add">
                <Add ref="add" slot="content" :addType="type" @closeEnvir="closeEnvir" :cloneList="cloneList"
                     :editData="editData"></Add>
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
          key: '',
        },
        searchList: [],
        cloneList: [],
        environmentCards: [],
        displayCard: [],
        type: '',
        addDialog: false,
        loading: true, //table刷新
        editData: {}
      }
    },
    methods: {
      handleDraggableFormItemChange (e) {
        console.log('handleDraggableFormItemChange')
        let self = this;
        let moved = e.moved
        let newIndex = moved.newIndex
        let updateEnv = []
        //拖拽到第一个
        if (newIndex == 0) {
          if (this.displayCard.length > 1) {
            let second = this.displayCard[1]
            let order_index = second.SORT_INDEX
            let element = moved.element
            let update = {}
            update.env_id = element.ENV_ID
            update.sort_index = order_index + 1
            updateEnv.push(update)
          }
        }
        //拖拽到最后
        else if (newIndex == this.displayCard.length - 1) {
          if (this.displayCard.length > 1) {
            let pre = this.displayCard[newIndex - 1]
            let order_index = pre.SORT_INDEX
            let element = moved.element
            let update = {}
            update.env_id = element.ENV_ID
            update.sort_index = order_index - 1
            updateEnv.push(update)
          }
        } else {
          if (this.displayCard.length > 2) {
            let next = this.displayCard[newIndex + 1]
            let newOrderIndex = next.SORT_INDEX + 1
            let element = moved.element
            let update = {}
            update.env_id = element.ENV_ID
            update.sort_index = newOrderIndex - 1
            updateEnv.push(update);
            this.getAllUpdateList(updateEnv,newIndex -1,newOrderIndex);
          }
        }
        console.log(updateEnv)
        if(updateEnv.length > 0){
          let params = {list:updateEnv};
          self.$serRequestService('UpdateEnv_CODE', JSON.stringify(params)).then(function (resp) {
            console.log(resp)
          })
        }
      },

      getAllUpdateList (updateEnv, index, orderIndex) {
        if (index >= 0) {
          let pre = this.displayCard[index]
          if (pre.SORT_INDEX <= orderIndex) {
            let update = {}
            update.env_id = pre.ENV_ID
            update.sort_index = pre.SORT_INDEX + 1
            updateEnv.push(update)
          }
          index--
          if (index > 0) {
            this.getAllUpdateList(updateEnv,index,pre.SORT_INDEX);
          }
        }
      },
      searchEnvir () {
        this.getEnvirCards()
      },
      clickCard (envir) {
        // for (let data of this.environmentCards) {
        //   if (data != envir) {
        //     this.$set(data, 'color', '')
        //   }
        // }
        // let color = envir.color
        // if (!color) {
        //   this.$set(envir, 'color', '#b2c7ec')
        //   this.currentCard = envir
        // } else {
        //   envir.color = ''
        //   this.currentCard = null
        // }

      },
      moreCard () {
        this.extend = !this.extend
        if (this.extend) {
          this.displayCard = this.environmentCards
        } else {
          this.displayCard = this.environmentCards.slice(0, this.displayLen)
        }
      },
      getEnvirCards () { //获取表格数据
        let self = this
        self.loading = true
        self.$serRequestService('GetEnv_CODE', JSON.stringify(self.queryForm)).then(function (resp) {
          if (resp == null) {
            self.$message.error('查询出错!')
          } else {
            let resp_data = JSON.parse(resp)
            console.log(resp_data.data)
            self.environmentCards = resp_data.data.list
            self.searchList = self.searchList.length == 0 ? JSON.parse(JSON.stringify(self.environmentCards)) : self.searchList
            if (self.environmentCards.length > 16) {
              self.displayCard = self.environmentCards.slice(0, self.displayLen)
            } else {
              self.displayCard = self.environmentCards
            }
            self.loading = false
          }
        })
      },
      // getEnvirCards () { //获取表格数据
      //   let self = this
      //   self.loading = true
      //   setTimeout(()=>{
      //     if (self.environmentCards.length > 16) {
      //       self.displayCard = self.environmentCards.slice(0, self.displayLen)
      //     } else {
      //       self.displayCard = self.environmentCards
      //     }
      //     self.loading = false
      //   },500)
      // },
      add () { //新增
        this.addDialog = true
        this.editData = {
          env_ename: '',
          env_cname: '',
          comm_app_count: '',
          pro_app_count: '',
        }
        this.type = 'add'
        this.cloneList = JSON.parse(JSON.stringify(this.searchList))
      },
      editEnvir (envir) { //编辑
        this.editData = Object.assign({}, envir)
        this.addDialog = true
        this.type = 'edit'
      },

      cloneEnvir (envir) { //编辑
        this.editData = Object.assign({}, envir)
        this.addDialog = true
        this.type = 'clone'
      },
      seeEnvir (envir) { //查看
        this.editData = Object.assign({}, envir)
        this.addDialog = true
        this.type = 'see'
      },
      delEnvir (envir) { //删除
        let self = this
        let ids = {lists: [{id:envir.ENV_ID}]}
        self.$confirm('确定删除该记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$serRequestService('DelEnv_CODE', JSON.stringify(ids)).then(function (data) {
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
        // display: flex;
        // flex-wrap: wrap;
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

        .box {
            // display: flex;
            // flex-wrap: wrap;
            width: 100%;

            .box-card {
                width: calc(16.667% - 10px);
                margin: 5px;
                text-align: center;
                height: 90px;
                transition: transform .3s;
                position: relative;
                float: left;

                .box_inner {
                    color: #333;
                    font-size: inherit;
                }

                &.dragging {
                    transform: scale(1.1);
                }

                &:hover {
                    transform: scale(1.05);
                }

                .new {
                    position: absolute;
                    top: 0;
                    left: 0;
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

                /*&:active {*/
                /*background: #f2fbe8;*/
                /*}*/
            }
        }

        .more {
            width: calc(16.667% - 10px);
            margin: 5px;
            text-align: center;
            height: 90px;
            transition: transform .3s;
            cursor: pointer;
            float: left;

            .img-more {
                width: 25px;
            }

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
