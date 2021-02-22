<template>
    <div class="ConfigManage" >
        <div class="top_line">
            <h1>环 境 管 理</h1>
        </div>
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
        <div class="box-contain">
            <div class="box">
                <el-card class="box-card" style=" background: #A9D96C;cursor: pointer" @click.native="add()">
                    <img src="@/assets/img/plus.png">
                    <div style="color: white;font-size: inherit;font-family: 微软雅黑;font-weight: bold;letter-spacing: 2px">
                        创建项目
                    </div>
                </el-card>

                <el-card @click.native="clickCard(envir)" class="box-card" v-for="(envir ,index) in displayCard "
                         :key="index"
                         v-dragging="{ item: envir, list: displayCard, group: 'envir' }"
                         :style="{background:envir.color}">
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.env_ename}}
                    </div>
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.env_cname}}
                    </div>
                    <div style="color: black;font-size: inherit;font-family: 微软雅黑">
                        {{envir.comm_app_count}}
                    </div>
                </el-card>
                <el-card class="box-card more" v-show="environmentCards.length > displayLen" @click.native="moreCard">
                    <img src="@/assets/img/more.png" class="img-more" v-show="!extend">
                    <img src="@/assets/img/up.png" class="img-more" v-show="extend">
                    <p style="font-family: 微软雅黑">加载更多</p>
                </el-card>
            </div>
        </div>
        <div class="zll-dialog">
            <popout :title="type" :visible.sync="addDialog" v-show="addDialog" class="Config_add">
                <Add ref="add" slot="content" :titleTxt="type" @closeEnvir="closeEnvir" :editData="editData"></Add>
                <template slot="bottom">
                    <p class="zll-botton" v-if="type !== '查看'" @click="()=>{this.$refs.add.setFormData('addForm')}">提
                        交</p>
                    <p class="zll-botton" v-if="type == '查看'" @click="addDialog = false">确 定</p>
                </template>
            </popout>
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
        displayLen: 16,
        extend: false,
        queryForm: {},
        environmentCards: [],
        displayCard: [],
        type: '',
        addDialog: false,
        loading: true, //table刷新
        currentCard: null,
        editData: {}
      }
    },
    methods: {
      clickCard (envir) {
        for (let data of this.environmentCards) {
          if (data != envir) {
            this.$set(data, 'color', '')
          }
        }
        let color = envir.color
        if (!color) {
          this.$set(envir, 'color', '#f2fbe8')
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
      getEnvirCards () { //获取表格数据
        let self = this
        self.loading = true
        self.$serRequestService(JSON.stringify(self.queryForm)).then(function (data) {
          if (data == null) {
            self.$message.error('查询出错!')
          } else {
            self.environmentCards = [
              {env_cname: 'tomcat1', env_ename: 'tomcat1', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat2', env_ename: 'tomcat2', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat3', env_ename: 'tomcat3', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat4', env_ename: 'tomcat4', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat5', env_ename: 'tomcat5', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat6', env_ename: 'tomcat6', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat7', env_ename: 'tomcat7', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat8', env_ename: 'tomcat8', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat9', env_ename: 'tomcat9', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat10', env_ename: 'tomcat10', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat11', env_ename: 'tomcat11', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat12', env_ename: 'tomcat12', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat13', env_ename: 'tomcat13', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat14', env_ename: 'tomcat14', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat15', env_ename: 'tomcat15', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat16', env_ename: 'tomcat16', comm_app_count: '2', pro_app_count: '3'},
              {env_cname: 'tomcat17', env_ename: 'tomcat17', comm_app_count: '2', pro_app_count: '3'},
            ]
            if (self.environmentCards.length > 16) {
              self.displayCard = self.environmentCards.slice(0, self.displayLen)
            } else {
              self.displayCard = self.environmentCards
            }
            self.loading = false
          }
        })
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
          self.$serRequestService(JSON.stringify({env_id:this.currentCard.env_id})).then(function (data) {
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
