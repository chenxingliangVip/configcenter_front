<template>
    <div class="ProjectInfo">
        <el-row :gutter="15">
            <el-col :span="4">
                <div class="info_left">
                    <div class="item-1">
                        <h1>环境列表<span class="el-icon-question question"></span></h1>
                        <div class="dev">
                            <p class="txt-1">DEV</p>
                        </div>
                    </div>
                    <div class="item-1">
                        <h1>项目信息
                            <span class="el-icon-star-off question"></span>
                            <span class="el-icon-edit-outline question"></span>
                        </h1>
                        <div class="dev">
                            <p class="dev_list">
                                <span class="title">AppId：</span>
                                <span class="detail">toy2018</span>
                            </p>
                            <p class="dev_list">
                                <span class="title">应用名称：</span>
                                <span class="detail">app-toy</span>
                            </p>
                            <p class="dev_list">
                                <span class="title">部门：</span>
                                <span class="detail">产品研发部（development）</span>
                            </p>
                            <p class="dev_list">
                                <span class="title">负责人：</span>
                                <span class="detail">toy</span>
                            </p>
                            <p class="dev_list">
                                <span class="title">邮箱：</span>
                                <span class="detail">test@163.com</span>
                            </p>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="20">
                <div class="info_right">
                    <div class="collapse_list" v-for="(item,index) in collapseList" :key="index">
                        <div class="collapse_botton" @click="showClick(item)">[ 展开 / 收缩 ]</div>
                        <div v-if="item.activeName">
                            <el-tabs v-model="item.activeName">
                                <el-tab-pane :label="item.label1" name="1">
                                    <span slot="label"><i class="el-icon-guide"></i> {{item.label1}}</span>
                                    <div class="showTitle">
                                        <p class="title">
                                            {{item.title1}}
                                            <span class="haveEdit" v-if="item.haveEdit">有修改 <span class="num">1</span></span>
                                        </p>
                                        <div class="buttonList">
                                            <p class="zll-botton success"><i class="el-icon-s-promotion"></i> 发布</p>
                                            <p class="zll-botton normal"><i class="el-icon-back"></i> 回滚</p>
                                            <p class="zll-botton normal"><i class="el-icon-date"></i> 发布历史</p>
                                            <p class="zll-botton normal"><i class="el-icon-user"></i> 授权</p>
                                            <p class="zll-botton normal"><i class="el-icon-s-tools"></i> </p>
                                        </div>
                                        <div class="clearBoth"></div>
                                    </div>
                                    <el-collapse-transition>
                                        <div class="showDetail"  ref="liCon" v-show="item.isShow">
                                            <div class="buttonList">
                                                <p class="zll-botton normal"><i class="el-icon-connection"></i> 过滤配置</p>
                                                <p class="zll-botton normal"><i class="el-icon-refresh"></i> 同步配置</p>
                                                <p class="zll-botton normal"><i class="el-icon-back"></i> 撤销配置</p>
                                                <p class="zll-botton normal"><i class="el-icon-office-building"></i> 比较配置</p>
                                                <p class="zll-botton addp"><i class="el-icon-circle-plus-outline"></i> 新增配置</p>
                                            </div>
                                            <el-tabs v-model="item.activeName2">
                                                <el-tab-pane label="表格" name="first">
                                                    <div class="zll-table">
                                                        <el-table :data="item.tableData" :stripe="true" style="width: 100%">
                                                            <el-table-column prop="data1" label="发布状态" width="100"> </el-table-column>
                                                            <el-table-column prop="data2" label="Key"></el-table-column>
                                                            <el-table-column prop="data3" label="Value"></el-table-column>
                                                            <el-table-column prop="data4" label="备注"></el-table-column>
                                                            <el-table-column prop="data5" label="最后修改人" width="100"></el-table-column>
                                                            <el-table-column prop="data6" label="最后修改时间"></el-table-column>
                                                            <el-table-column fixed="right" label="操作" width="100">
                                                                <template>
                                                                    <el-button type="text" size="small">编辑</el-button>
                                                                    <el-button type="text" size="small">删除</el-button>
                                                                </template>
                                                            </el-table-column>
                                                        </el-table>
                                                    </div>
                                                </el-tab-pane>
                                                <el-tab-pane label="文本" name="second">文本</el-tab-pane>
                                                <el-tab-pane label="更改历史" name="third">更改历史</el-tab-pane>
                                                <el-tab-pane label="实例列表" name="fourth">实例列表</el-tab-pane>
                                            </el-tabs>
                                        </div>
                                    </el-collapse-transition>
                                </el-tab-pane>
                                <el-tab-pane :label="item.label2" name="2">
                                    <span slot="label"><i class="el-icon-guide"></i> {{item.label2}}</span>
                                    <div class="showTitle">
                                        <p class="title">
                                            {{item.title2}}
                                            <span class="haveEdit" v-if="item.haveEdit">有修改 <span class="num">1</span></span>
                                        </p>
                                        <div class="buttonList">
                                            <p class="zll-botton success"><i class="el-icon-s-promotion"></i> 发布</p>
                                            <p class="zll-botton normal"><i class="el-icon-back"></i> 回滚</p>
                                            <p class="zll-botton normal"><i class="el-icon-date"></i> 发布历史</p>
                                            <p class="zll-botton normal"><i class="el-icon-user"></i> 授权</p>
                                            <p class="zll-botton normal"><i class="el-icon-s-tools"></i> </p>
                                        </div>
                                        <div class="clearBoth"></div>
                                    </div>
                                    <el-collapse-transition>
                                        <div class="showDetail"  ref="liCon" v-show="item.isShow">
                                            灰度版本
                                        </div>
                                    </el-collapse-transition>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                        <div class="tabother" v-else>
                            <div class="showTitle">
                                <p class="title">
                                    {{item.title}}
                                    <span class="haveEdit" v-if="item.haveEdit">有修改 <span class="num">1</span></span>
                                </p>
                                <div class="buttonList">
                                    <p class="zll-botton success"><i class="el-icon-s-promotion"></i> 发布</p>
                                    <p class="zll-botton normal"><i class="el-icon-back"></i> 回滚</p>
                                    <p class="zll-botton normal"><i class="el-icon-date"></i> 发布历史</p>
                                    <p class="zll-botton normal"><i class="el-icon-user"></i> 授权</p>
                                    <p class="zll-botton normal"><i class="el-icon-s-tools"></i> </p>
                                </div>
                                <div class="clearBoth"></div>
                            </div>
                            <el-collapse-transition>
                                <div class="showDetail" v-show="item.isShow">
                                    qq
                                </div>
                            </el-collapse-transition>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            collapseList: [{
                index: '1',
                isShow: true,
                title1: 'application',
                title2: 'application2',
                label1: '主版本',
                label2: '灰度版本',
                activeName: '1',
                activeName2: 'first',
                tableData: [{
                        data1: "已发布",
                        data2: "toy1",
                        data3: "124324", 
                        data4: '', 
                        data5: "apolly", 
                        data6: "2021-05-09", 
                    },{
                        data1: "已发布",
                        data2: "toy2",
                        data3: "fr", 
                        data4: '', 
                        data5: "apolly", 
                        data6: "2021-05-09", 
                    },{
                        data1: "已发布",
                        data2: "toy3",
                        data3: "hryh", 
                        data4: '', 
                        data5: "apolly", 
                        data6: "2021-05-10", 
                    },
                ],
            }, {
                index: '2',
                isShow: false,
                title1: 'application',
                title2: 'application2',
                label1: '主版本',
                label2: '灰度版本',
                activeName: '1',
                activeName2: 'first',
                tableData: [{
                        data1: "已发布",
                        data2: "toy1",
                        data3: "124324", 
                        data4: '', 
                        data5: "apolly", 
                        data6: "2021-05-09", 
                    },{
                        data1: "已发布",
                        data2: "toy2",
                        data3: "fr", 
                        data4: '', 
                        data5: "apolly", 
                        data6: "2021-05-09", 
                    },{
                        data1: "已发布",
                        data2: "toy3",
                        data3: "hryh", 
                        data4: '', 
                        data5: "apolly", 
                        data6: "2021-05-10", 
                    },
                ],
                haveEdit: true,//有修改
            }, {
                index: '3',
                isShow: false,
                title: 'Toy.LPL',
                haveEdit: true,//有修改
            }, {
                index: '4',
                isShow: false,
                title: 'target',
            }]
        }
    },
    methods: {
        showClick(val) {
            for(let i = 0;i < this.collapseList.length;i++){
               if(this.collapseList[i].index == val.index) {
                    this.collapseList[i].isShow = !this.collapseList[i].isShow
               }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
   
</style>