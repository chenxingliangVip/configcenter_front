<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <el-form ref="addForm" class="demo-ruleForm">
                <el-form-item class="formList" label="配置：">
                    <vue-editor v-model="content" :editorToolbar="customToolbar" />
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        content: '',
        settingList: [{
          publish_status: '成功',
          key: 'tomcat',
          value: 'tomcat1.2.1版本',
          remark: '在linux1.5版本以上部署',
          edit_people: '陈兴亮',
          update_time: '2021-03-01'
        },
          {
            publish_status: '失败',
            key: 'java',
            value: 'jdk1.87',
            remark: '在linux1.5版本以上部署',
            edit_people: '张三',
            update_time: '2021-03-02'
          },
          {
            publish_status: '发布中',
            key: 'serverless',
            value: 'openwhisk',
            remark: '在linux1.5版本以上部署',
            edit_people: '里斯',
            update_time: '2021-03-03'
          }],
        customToolbar: [
          ['bold'],
        ],
        rules: {}
      }
    },
    methods: {

    },
    mounted () {

    },
    components: {},

    watch: {

    }
  }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/dialog.scss";
</style>

<style>
    .ace_variable {
        color: rgb(127, 0, 85);
    }

    .ace_string {
        color: rgb(42, 0, 255);
    }
</style>
