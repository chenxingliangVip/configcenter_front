<template>
    <div class="addProject Config">
        <h1>{{title}}环境管理</h1>
        <div class="addForm zll-form">
            <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                <el-form-item class="formList" prop="env_ename" label="中文名：">
                    <el-input clearable class="input_right" placeholder="请输入中文名" v-model="addForm.env_ename"
                              :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item class="formList" prop="env_cname" label="英文名：">
                    <el-input clearable class="input_right" placeholder="请输入英文名" v-model="addForm.env_cname"
                              :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item class="formList"  label="创建人：">
                    <el-input clearable class="input_right"  v-model="addForm.create_user_name"
                              disabled></el-input>
                </el-form-item>
                <!--<el-form-item class="formList" prop="pro_app_count" label="专业应用数：">-->
                    <!--<el-input clearable class="input_right" placeholder="请输入专业应用数" v-model="addForm.pro_app_count"-->
                              <!--:disabled="disabled"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
        </div>
        <div class="bottom" style="text-align: center;margin-top: 10px">
            <p class="zll-botton"  style="display: inline;margin-right: 20%" @click="add">提 交</p>
            <p class="zll-botton"  style="display: inline;background: #a1a2a7" @click="close">取 消</p>
        </div>
    </div>
</template>
<script>
  export default {
    props: ['editData', 'titleTxt'],
    data () {
      return {
        disabled: false,
        title:"",
        addForm: {
          env_ename: '',
          env_cname: '',
          create_user_id: '',
          create_user_name: '',
          modify_user_id:'',
          modify_user_name:''
        },
        rules: {
          env_ename: [
            {required: true, message: '请输入中文名', trigger: 'blur',},
          ],
          env_cname: [
            {required: true, message: '请输入英文名', trigger: 'blur',},
          ],
          // comm_app_count: [
          //   {required: true, message: '请输入组件应用数', trigger: 'blur',},
          // ],
          // pro_app_count: [
          //   {required: true, message: '请输入专业应用数', trigger: 'blur',},
          // ],
        },
      }
    },
    methods: {
      close(){
        this.$emit('closeEnvir', this.addForm)
      },

      add () {
        let self = this
        self.$refs['addForm'].validate((valid) => {
          if (valid) {
            let self = this
            self.loading = true
            self.$serRequestService('AddEnv_CODE',JSON.stringify(self.addForm)).then(function (data) {
              if (data == null) {
                self.$message.error('添加环境配置出错!')
              } else {
                self.$message.success('添加成功!')
                self.close();
              }
            })
          } else {
            return false
          }
        })
      },
    },
    mounted () {

    },
    watch: {
      editData (val) {
        this.disabled = false
        this.addForm = val
        if (this.titleTxt == 'see') {
          this.disabled = true;
          this.title = "查看"
        }
        if (this.titleTxt == 'add') {
          this.title = "新增"
        }
        if (this.titleTxt == 'clone') {
          this.title = "克隆"
        }
        if (this.titleTxt == 'edit') {
          this.title = "编辑"
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "@/assets/style/dialog.scss";
    .bottom{
        .zll-botton {
            width: 120px;
            border-radius: 8px;
            /*margin-left: 90px;*/
        }
    }
    .addProject {
        width: 600px;
        margin: 0 auto;

        h1 {
            text-align: center;
            font-size: 20px;
            font-weight: normal;
            color: #3a8ee6;
            margin: 20px 0;
        }

        .zll-form {
            /*border: 1px solid #3a8ee6;*/
            border-radius: 10px;
            padding: 0 40px 2px;
        }

        .formList {
            margin-top: 20px;
            height: auto !important;
        }

    }
</style>
