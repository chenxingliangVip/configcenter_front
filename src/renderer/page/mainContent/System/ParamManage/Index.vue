<template>
    <div class="ParamManage">
        <div class="list" v-for="(item, index) in paramList" :key="index"
            @mouseenter="showActive(index,1)"
            @mouseleave="showActive(index,0)"
            @click="edit(item)"
        >
            <img v-show="item.active === 0" :src="item.icon" />
            <img v-show="item.active === 1" :src="item.hovericon" />
            <p class="name">{{ item.name }}</p>
        </div>
        <div style="clear: both"></div>

        <div class="zll-dialog">
            <popout :title="title" :visible.sync="addDialog" v-if="addDialog" :class="{ 'minSize' :  title == '初始密码','bigSize' : title == 'LOGO设定'}">
                <depart-add ref="add" slot="content" @addForm="getFormData" v-if="title == '部门管理'"></depart-add>
                <tax-rate-add ref="add" slot="content" @addForm="getFormData" v-if="title == '税率管理'"></tax-rate-add>
                <social-add ref="add" slot="content" @addForm="getFormData" v-if="title == '社保比例'"></social-add>
                <category-add ref="add" slot="content" @addForm="getFormData" v-if="title == '品类品目'"></category-add>
                <logo-add ref="add" slot="content" @addForm="getFormData" v-if="title == 'LOGO设定'"></logo-add>
                <password-add ref="add" slot="content" @addForm="getFormData" v-if="title == '初始密码'"></password-add>
                <sn-add ref="add" slot="content" @addForm="getFormData" v-if="title == 'S/N变更'"></sn-add>
                <template slot="bottom">
                    <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
                </template>
            </popout>
        </div>
    </div>
</template>

<script>
import departAdd from './departAdd'
import taxRateAdd from './taxRateAdd'
import socialAdd from './socialAdd'
import categoryAdd from './categoryAdd'
import logoAdd from './logoAdd'
import passwordAdd from './passwordAdd'
import snAdd from './snAdd'
export default {
    data() {
        return {
            title: '',
            paramList: [
                {
                    name: "部门管理",
                    icon: require("@/assets/img/department.png"),
                    hovericon: require("@/assets/img/department2.png"),
                    active: 0,
                }, {
                    name: "税率管理",
                    icon: require("@/assets/img/taxrate.png"),
                    hovericon: require("@/assets/img/taxrate2.png"),
                    active: 0,
                }, {
                    name: "社保比例",
                    icon: require("@/assets/img/socialsecurity.png"),
                    hovericon: require("@/assets/img/socialsecurity2.png"),
                    active: 0,
                }, {
                    name: "品类品目",
                    icon: require("@/assets/img/category.png"),
                    hovericon: require("@/assets/img/category2.png"),
                    active: 0,
                }, {
                    name: "LOGO设定",
                    icon: require("@/assets/img/weblogo.png"),
                    hovericon: require("@/assets/img/weblogo2.png"),
                    active: 0,
                    height: '650px',
                }, {
                    name: "初始密码",
                    icon: require("@/assets/img/initialpassword.png"),
                    hovericon: require("@/assets/img/initialpassword2.png"),
                    active: 0,
                }, {
                    name: "S/N变更",
                    icon: require("@/assets/img/change1.png"),
                    hovericon: require("@/assets/img/change2.png"),
                    active: 0,
                }
            ],
            addDialog: false,
        };
    },
    methods: {
        showActive(index, active) {
            this.paramList[index].active = active
        },
        edit(val) {
            this.title = val.name
            this.addDialog = true
        },
        getFormData(data){
            console.log(data)
            this.addDialog = false
        },
    },
    components: {
        departAdd, taxRateAdd, socialAdd, categoryAdd, logoAdd, passwordAdd, snAdd
    }
};
</script>

<style lang="scss" scoped>
.ParamManage {
    margin-top: 150px;
    .list {
        float: left;
        cursor: pointer;
        width: 100px;
        margin: 15px 20px;
        border-radius: 15px;
        padding: 10px 0;
        img {
            width: 50px;
            height: 50px;
            display: inherit;
            margin: 0 auto;
        }
        .name {
            margin-top: 10px;
            text-align: center;
        }
        &:hover {
            box-shadow: 0 0 10px #ccc;
            transition: all .3s;
            .name {
                color: #e26835;
            }
        }
    }
}
</style>