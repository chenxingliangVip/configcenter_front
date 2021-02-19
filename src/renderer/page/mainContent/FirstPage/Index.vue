<template>
    <div class="FirstPage">
        <div class="message">
            <div class="listNav" v-for="(item,index) in list" :key="index" :class="{ 'isread': !item.isread }" @click="goDetail">
                <el-row class="item">
                    <el-col :span="5">
                        <p class="tableTime">{{ item.time }}</p>
                    </el-col>
                    <el-col :span="16">
                        <p class="tableTxt">{{ item.txt }}</p>
                    </el-col>
                    <el-col :span="3">
                        <p class="tableDept">{{ item.dept }}</p>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="label-nav">
            <div class="labelList" v-for="(item, index) in labelList" :key="index"
                @mouseenter="showActive(index,1)"
                @mouseleave="showActive(index,0)"
                @click="goPage(item.url)"
            >
                <img v-show="item.active === 0" :src="item.icon" />
                <img v-show="item.active === 1" :src="item.hovericon" />
                <p class="name">{{ item.name }}</p>
            </div>
        </div>
        <div style="clear: both"></div>
        <div class="zll-dialog">
            <popout title="查看通知" :visible.sync="detailDialog" v-if="detailDialog">
                <Detail ref="detail" slot="content" ></Detail>
                <template slot="bottom">
                    <p class="zll-botton" @click="detailDialog = false">确 定</p>
                </template>
            </popout>
        </div>
    </div>
</template>

<script>
import Detail from './detail'
import labelList from './list'
export default {
    data() {
        return {
            detailDialog: false,
            list: [{
                time: '2020-02-22 11:11:11',
                txt: '优秀员工通知优秀员工通知',
                dept: '技术部',
                isread: false,
            }, {
                time: '2020-02-22 11:11:11',
                txt: '优秀员工通知优秀员工通知',
                dept: '技术部',
                isread: true,
            }],
            labelList: labelList
        };
    },
    methods: {
        goDetail(){
            this.detailDialog = true
        },
        showActive(index, active) {
            this.labelList[index].active = active
        },
        goPage(name) {
            if(name) {
                if(this.$route.name != name) this.$router.push({name});
            }
        },
    },
    components: {
        Detail
    },
    
};
</script>
<style scoped lang="scss">
    .FirstPage {
        .message {
            padding: 20px 30px;    
            box-shadow: 0 0 10px #ccc;
            margin: 0 20px;
        }
        .listNav {
            .item {
                color: #666666;
                cursor: pointer;
                transition: all 0.3s;
                &:hover {
                    color: #34BFC6 ;
                }
            }
            p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 8px 10px;
            }
            &.isread .item {
                color: #34BFC6 ;
            }
        }
        .label-nav {
            margin-top: 30px;
            .labelList {
                float: left;
                cursor: pointer;
                width: 100px;
                margin: 15px 20px;
                border-radius: 15px;
                padding: 10px 0;
                img {
                    display: inherit;
                    margin: 0 auto;
                    width: 50px;
                    height: 50px;
                }
                .name {
                    margin-top: 10px;
                    text-align: center;
                }
                &:hover {
                    box-shadow: 0 0 10px #ccc;
                    transition: all .3s;
                    .name {
                        color: #3fc4b1;
                    }
                }
            }
        }
    }
</style>
