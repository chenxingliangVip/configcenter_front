//左侧菜单数据
export default [
    {
        name: 'FirstPage',//路由name
        title: '首页',
        icon: 'el-icon-s-home'
    }, {
        title: '项目',
        icon: 'el-icon-document-copy',
        children: [ //子菜单
            {
                name: 'MineProject',//路由name
                title: '我的项目',
            }, {
                name: 'ProjectManage',//路由name
                title: '项目管理',
            }
        ]
    }, {
        title: '合同',
        icon: 'el-icon-files',
        children: [
            {
                name: 'MineContract',//路由name
                title: '我的合同',
            }, {
                name: 'ContractManage',//路由name
                title: '合同管理',
            },
        ]
    }, {
        title: '技术',
        icon: 'el-icon-s-data',
        children: [
            {
                name: 'MineWork',//路由name
                title: '我的工作',
            }, {
                name: 'WorkManage',//路由name
                title: '工作管理',
            },
        ]
    }, {
        title: '采购',
        icon: 'el-icon-shopping-cart-full',
        children: [ //子菜单
            {
                name: 'BuyTask',//路由name
                title: '采购任务',
            }, {
                name: 'Suply',//路由name
                title: '供应商管理',
            }, {
                name: 'ProductManage',//路由name
                title: '产品管理',
            },
        ]
    }, {
        title: '出入库',
        icon: 'el-icon-coin',
        children: [ //子菜单
            {
                name: 'InStorage',//路由name
                title: '入库',
            }, {
                name: 'OutStorage',//路由name
                title: '出库',
            }, {
                name: 'OutDetail',//路由name
                title: '出库信息',
            },
        ]
    }, {
        title: '报销',
        icon: 'el-icon-receiving',
        children: [ //子菜单
            {
                name: 'MineAccount',//路由name
                title: '我的报销',
            }, {
                name: 'AccountManage',//路由name
                title: '报销管理',
            }
        ]
    }, {
        title: '审批',
        icon: 'el-icon-s-check',
        name: 'Approval',//路由name
    }, {
        title: '财务',
        icon: 'el-icon-bank-card',
        children: [ //子菜单
            {
                name: 'MainFare',//路由name
                title: '主营票款',
            }, {
                name: 'BillManage',//路由name
                title: '发票管理',
            }, {
                name: 'BudgetManage',//路由name
                title: '收支管理',
            }, {
                name: 'BudgetSearch',//路由name
                title: '收支查询',
            }, {
                name: 'BankDeposit',//路由name
                title: '银行存款',
            }, {
                name: 'CashOnHand',//路由name
                title: '库存现金',
            }, {
                name: 'SalaryDeclare',//路由name
                title: '工资申报',
            },
        ]
    }, {
        title: '系统',
        icon: 'el-icon-setting',
        children: [ //子菜单
            {
                name: 'Send',//路由name
                title: '消息发布',
            }, {
                name: 'User',//路由name
                title: '用户管理',
            }, {
                name: 'Power',//路由name
                title: '角色管理',
            }, {
                name: 'SetSubject',//路由name
                title: '科目设定',
            }, {
                name: 'ParamManage',//路由name
                title: '参数管理',
            }, {
                name: 'DataCopy',//路由name
                title: '数据备份',
            }, {
                name: 'SystemLog',//路由name
                title: '系统日志',
            }
        ]
    },
    {
        name: 'environment',//路由name
        title: '环境管理',
        icon: 'el-icon-setting',
    }
]
