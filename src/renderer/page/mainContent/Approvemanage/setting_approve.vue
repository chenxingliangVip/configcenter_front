<template>
    <div>
        <sys-table :isMultipleSelection="false"
                   :tableData="tableData"
                   :tableLoading="loading"
                   :tableHeader="tableHeader"
                   :scopeWidth="150"
        >
            <template slot-scope="scope" slot="operate">
                <img src="~@/assets/img/nr-edit.png" style="margin-right: 8px;cursor: pointer"  title="编辑">
                <img src="~@/assets/img/nr-delete.png" style="cursor: pointer"  title="删除">
            </template>
        </sys-table>
    </div>
</template>
<script>
    export default {
      name:"setting_table",
      data(){
        return{
          loading:true,
          tableData:[],
          tableHeader:[],
          queryForm: {
            page_num: 1,
            page_size: 1000
          },
        }
      },
      methods:{
        getSettingTable(){
          let self = this
          self.loading = true
          self.$serRequestService('GetEnv_CODE', JSON.stringify(self.queryForm)).then(function (resp) {
            if (resp == null) {
              self.$message.error('查询出错!')
            } else {
              let resp_data = JSON.parse(resp)
              console.log(resp_data.data)
              // self.tableData = resp_data.data.list;
              self.tableData = [
                {publish_status:"成功",key:"tomcat",value:"tomcat1.2.1版本",remark:"在linux1.5版本以上部署",edit_people:"陈兴亮",update_time:"2021-03-01"},
                {publish_status:"失败",key:"java",value:"jdk1.87",remark:"在linux1.5版本以上部署",edit_people:"张三",update_time:"2021-03-02"},
                {publish_status:"发布中",key:"serverless",value:"openwhisk",remark:"在linux1.5版本以上部署",edit_people:"里斯",update_time:"2021-03-03"},
                ];
              self.tableHeader = [
                {columnValue: "publish_status", columnName: "发布状态",type:'tag'},
                {columnValue: "key", columnName: "Key",},
                {columnValue: "value", columnName: "Value"},
                {columnValue: "remark", columnName: "备注"},
                {columnValue: "edit_people", columnName: "最后修改人"},
                {columnValue: "update_time", columnName: "最后修改时间"},
              ];
              self.loading = false
            }
          })
        }
      },
      mounted () {
        this.getSettingTable();
      },
      watch:{

      }
    }
</script>
