//左侧菜单数据
export default [
    {
        name: 'FirstPage',//路由name
        title: '首页',
        icon: require("@/assets/img/nr-home.png"),
    },

    {
        name: 'environment',//路由name
        title: '环境管理',
        icon: require("@/assets/img/nr-envir.png"),
    }, {
        name: 'applymanage',//路由name
        title: '应用管理',
        icon: require("@/assets/img/nr-apply.png"),
    },{
        name: 'settingmanage',//路由name
        title: '配置管理',
        icon: require("@/assets/img/nr-setting.png"),
    },{
        name: 'approve',//路由name
        title: '审核发布',
        icon: require("@/assets/img/nr-approve.png"),
    },{
        title: '版本管理',
        icon: require("@/assets/img/nr-version.png"),
        children:[
            {
                name: 'versionManage',//路由name
                title: '版本管理',
                icon: require("@/assets/img/nr-version-ch.png"),
            }, {
                name: 'versionMove',//路由name
                title: '版本迁移',
                icon: require("@/assets/img/nr-version-move.png"),
            },
        ]
    },{
        name: 'logOperate',//路由name
        title: '日志操作',
        icon: require("@/assets/img/nr-log.png"),
    },{
        name: 'AgGrid',//路由name
        title: 'AgGrid',
        icon: require("@/assets/img/nr-log.png"),
    },{
        name: 'ProjectInfo',//路由name
        title: '项目信息',
        icon: require("@/assets/img/nr-log.png"),
    }
]
