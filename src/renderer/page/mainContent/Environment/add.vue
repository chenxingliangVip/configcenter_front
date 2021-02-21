<template>
    <div class="addProject Config">
        <h1>环境管理</h1>
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
                <el-form-item class="formList" prop="comm_app_count" label="组件应用数：">
                    <el-input clearable class="input_right" placeholder="请输入组件应用数" v-model="addForm.comm_app_count"
                              :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item class="formList" prop="pro_app_count" label="专业应用数：">
                    <el-input clearable class="input_right" placeholder="请输入专业应用数" v-model="addForm.pro_app_count"
                              :disabled="disabled"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
  export default {
    props: ['editData', 'titleTxt'],
    data () {
      return {
        disabled: false,
        addForm: {
          env_ename: '',
          env_cname: '',
          comm_app_count: '',
          pro_app_count: '',
        },
        rules: {
          env_ename: [
            {required: true, message: '请输入中文名', trigger: 'blur',},
          ],
          env_cname: [
            {required: true, message: '请输入英文名', trigger: 'blur',},
          ],
          comm_app_count: [
            {required: true, message: '请输入组件应用数', trigger: 'blur',},
          ],
          pro_app_count: [
            {required: true, message: '请输入专业应用数', trigger: 'blur',},
          ],
        },
      }
    },
    methods: {
      setFormData (formName) {
        let self = this
        self.$refs[formName].validate((valid) => {
          if (valid) {
            let self = this
            self.loading = true
            self.$serRequestService(JSON.stringify(self.addForm)).then(function (data) {
              if (data == null) {
                self.$message.error('添加环境配置出错!')
              } else {
                self.$message.success('添加成功!')
                self.$emit('closeEnvir', self.addForm)
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
          this.disabled = true
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "@/assets/style/dialog.scss";

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
