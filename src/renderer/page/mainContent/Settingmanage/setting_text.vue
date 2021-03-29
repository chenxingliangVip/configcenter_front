<template>
    <div class="addProject">
        <div class="addForm zll-form">
            <div id="leftBox">
                <textarea wrap="off" cols="2" id="leftNum" disabled></textarea>
            </div>
            <textarea @input="handleTextareaInput" v-model="areatext" onscroll="document.getElementById('leftNum').scrollTop = this.scrollTop;" id="edit-content"></textarea>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            num: "",
            areatext: "",
            content: "",
            settingList: [
                {
                    publish_status: "成功",
                    key: "tomcat",
                    value: "tomcat1.2.1版本",
                    remark: "在linux1.5版本以上部署",
                    edit_people: "陈兴亮",
                    update_time: "2021-03-01",
                },
                {
                    publish_status: "失败",
                    key: "java",
                    value: "jdk1.87",
                    remark: "在linux1.5版本以上部署",
                    edit_people: "张三",
                    update_time: "2021-03-02",
                },
                {
                    publish_status: "发布中",
                    key: "serverless",
                    value: "openwhisk",
                    remark: "在linux1.5版本以上部署",
                    edit_people: "里斯",
                    update_time: "2021-03-03",
                },
            ],
            customToolbar: [["bold"]],
            rules: {},
        };
    },
    methods: {
        handleTextareaInput(e) {
            var str = e.target.value;
            str = str.replace(/\r/gi, "");
            str = str.split("\n");
            var n = str.length;
            var lineobj = document.getElementById("leftNum");
            for (var i = 1; i <= n; i++) {
                if (document.all) {
                    this.num += i + "\r\n"; //判断浏览器是否是IE
                } else {
                    this.num += i + "\n";
                }
            }
            lineobj.value = this.num;
            this.num = "";
        },
    },
    mounted() {
        this.handleTextareaInput({ target: { value: this.areatext } });
    },
    components: {},

    watch: {},
};
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
.addForm {
    display: flex;
    height: 300px;
}
#leftBox {
    width: 40px;
    height: 100%;
    text-align: left;
    border: 1px solid #eaeaea;
}
#edit-content {
    padding: 10px 8px;
    width: calc(100% - 40px);
    height: 100%;
    font-size: 12px;
    line-height: 24px;
    color: black;
    font-family: inherit;
    border: 1px solid #eaeaea;
    background: rgb(255, 255, 255, 1);
    box-sizing: border-box;
    outline: none;
    resize: none;
}
#leftNum {
    padding: 10px 4px;
    height: 100%;
    width: 100%;
    line-height: 24px;
    font-size: 12px;
    text-align: right;
    color: #999;
    font-weight: bold;
    resize: none;
    outline: none;
    overflow-y: hidden;
    overflow-x: hidden;
    border: 0;
    background: #e4e7ed;
    box-sizing: border-box;
}
</style>
