<template>
    <div class="ConfigManage">
        <div class="top_line">
            <h1>环 境 管 理</h1>
        </div>
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
        <div style="display: flex">
            <el-card class="box-card" style=" background: #A9D96C;">
                <img src="@/assets/img/plus.png" style="margin-top: -10%">
                <div style="color: white;font-size: inherit;font-family: 微软雅黑;font-weight: bold;letter-spacing: 2px">
                    创建项目
                </div>
            </el-card>

            <el-card class="box-card" v-for="(envir,index) in environmentCards " :key="index" v-dragging="{ item: envir, list: environmentCards, group: 'envir' }">
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
        </div>
    </div>
</template>

<script>
  import Add from './add'


  export default {
    data () {
      return {
        environmentCards:[
          {nameCn:"tomcat",nameEn:"tomcat",count:"2",professCount:"3"},
          {nameCn:"无服务平台",nameEn:"serverless",count:"2",professCount:"3"},
          {nameCn:"java",nameEn:"java",count:"2",professCount:"3"},
          {nameCn:"tomcat",nameEn:"tomcat",count:"2",professCount:"3"},
          {nameCn:"tomcat",nameEn:"tomcat",count:"2",professCount:"3"},
          {nameCn:"tomcat",nameEn:"tomcat",count:"2",professCount:"3"},
          {nameCn:"tomcat",nameEn:"tomcat",count:"2",professCount:"3"},
          {nameCn:"tomcat",nameEn:"tomcat",count:"2",professCount:"3"},
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
        tableLoading: true, //table刷新
      }
    },
    methods: {
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
      this.getTableList() //显示table
      this.$dragging.$on('dragged', ({ value }) => {
        console.log(value.item)
        console.log(value.list)
        console.log(value)
      })
      this.$dragging.$on('dragend', (res) => {
        console.error(res);
      })
    },
    components: {
      Add,
    },
  }
</script>
<style scoped lang="scss">
    @import "@/assets/style/SearchTop.scss";

    .box-card {
        width: 15%;
        text-align: center;
    }

    .ConfigManage {
        width: 1200px;
        margin: 0 auto;

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
                // margin: 0;
            }
        }
    }
</style>
