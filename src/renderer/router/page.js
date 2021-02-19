import FirstPage from '@/page/mainContent/Firstpage/Index' //首页
import MineProject from '@/page/mainContent/Project/MineProject/Index' //项目——我的项目
import ProjectManage from '@/page/mainContent/Project/ProjectManage/Index' //项目——项目管理
import MineContract from '@/page/mainContent/Contract/MineContract/Index' //合同——我的合同
import ContractManage from '@/page/mainContent/Contract/ContractManage/Index' //合同——合同管理
import MineWork from '@/page/mainContent/Technology/MineWork/Index' //技术——我的工作
import WorkManage from '@/page/mainContent/Technology/WorkManage/Index' //技术——工作管理
import BuyTask from '@/page/mainContent/Purchase/BuyTask/Index' //采购——采购任务
import Suply from '@/page/mainContent/Purchase/Suply/Index' //采购——供应商管理
import ProductManage from '@/page/mainContent/Purchase/ProductManage/Index' //采购——产品管理
import InStorage from '@/page/mainContent/OutInStorage/InStorage/Index' //出入库——入库
import OutStorage from '@/page/mainContent/OutInStorage/OutStorage/Index' //出入库——出库
import OutDetail from '@/page/mainContent/OutInStorage/OutDetail/Index' //出入库——出库信息
import AccountManage from '@/page/mainContent/Expense/AccountManage/Index' //报销——报销管理
import MineAccount from '@/page/mainContent/Expense/MineAccount/Index' //报销——我的报销
import Approval from '@/page/mainContent/Approval/Index' //审批
import MainFare from '@/page/mainContent/Finance/MainFare/Index' //财务——主营票款
import BillManage from '@/page/mainContent/Finance/BillManage/Index' //财务——发票管理
import BudgetManage from '@/page/mainContent/Budget/BudgetManage/Index' //收支——收支管理
import BudgetSearch from '@/page/mainContent/Budget/BudgetSearch/Index' //收支——收支查询
import BankDeposit from '@/page/mainContent/Budget/BankDeposit/Index' //收支——银行存款
import CashOnHand from '@/page/mainContent/Budget/CashOnHand/Index' //收支——库存现金
import SalaryDeclare from '@/page/mainContent/Budget/SalaryDeclare/Index' //收支——工资申报
import User from '@/page/mainContent/System/User/Index' //系统——用户管理
import Power from '@/page/mainContent/System/Power/Index' //系统——角色管理
import SetSubject from '@/page/mainContent/System/SetSubject/Index' //系统——科目设定
import ParamManage from '@/page/mainContent/System/ParamManage/Index' //系统——参数管理
import DataCopy from '@/page/mainContent/System/DataCopy/Index' //系统——参数管理
import SystemLog from '@/page/mainContent/System/SystemLog/Index' //系统——系统日志
import Send from '@/page/mainContent/System/Send/Index' //系统——消息发布
import Environment from '@/page/mainContent/Environment/Index' //项目——我的项目

// **************登录后访问的路由**********
export default [
    {
        path: 'FirstPage',
        name: 'FirstPage',
        meta: {title: '首页'},
        component: FirstPage
    }, {
        path: 'MineProject',
        name: 'MineProject',
        meta: {title: '我的项目'},
        component: MineProject
    }, {
        path: 'ProjectManage',
        name: 'ProjectManage',
        meta: {title: '项目管理'},
        component: ProjectManage
    }, {
        path: 'MineContract',
        name: 'MineContract',
        meta: {title: '我的合同'},
        component: MineContract
    }, {
        path: 'ContractManage',
        name: 'ContractManage',
        meta: {title: '合同管理'},
        component: ContractManage
    }, {
        path: 'MineWork',
        name: 'MineWork',
        meta: {title: '我的工作'},
        component: MineWork
    }, {
        path: 'WorkManage',
        name: 'WorkManage',
        meta: {title: '工作管理'},
        component: WorkManage
    }, {
        path: 'BuyTask',
        name: 'BuyTask',
        meta: {title: '采购任务'},
        component: BuyTask
    }, {
        path: 'Suply',
        name: 'Suply',
        meta: {title: '供应商管理'},
        component: Suply
    }, {
        path: 'ProductManage',
        name: 'ProductManage',
        meta: {title: '产品管理'},
        component: ProductManage
    }, {
        path: 'InStorage',
        name: 'InStorage',
        meta: {title: '入库'},
        component: InStorage
    }, {
        path: 'OutStorage',
        name: 'OutStorage',
        meta: {title: '出库'},
        component: OutStorage
    }, {
        path: 'OutDetail',
        name: 'OutDetail',
        meta: {title: '出库信息'},
        component: OutDetail
    }, {
        path: 'AccountManage',
        name: 'AccountManage',
        meta: {title: '报销管理'},
        component: AccountManage
    },{
        path: 'MineAccount',
        name: 'MineAccount',
        meta: {title: '我的报销'},
        component: MineAccount
    }, {
        path: 'Approval',
        name: 'Approval',
        meta: {title: '审批'},
        component: Approval
    }, {
        path: 'MainFare',
        name: 'MainFare',
        meta: {title: '主营票款'},
        component: MainFare
    }, {
        path: 'BillManage',
        name: 'BillManage',
        meta: {title: '发票管理'},
        component: BillManage
    }, {
        path: 'BudgetManage',
        name: 'BudgetManage',
        meta: {title: '收支管理'},
        component: BudgetManage
    }, {
        path: 'BudgetSearch',
        name: 'BudgetSearch',
        meta: {title: '收支查询'},
        component: BudgetSearch
    }, {
        path: 'BankDeposit',
        name: 'BankDeposit',
        meta: {title: '银行存款'},
        component: BankDeposit
    }, {
        path: 'CashOnHand',
        name: 'CashOnHand',
        meta: {title: '库存现金'},
        component: CashOnHand
    }, {
        path: 'SalaryDeclare',
        name: 'SalaryDeclare',
        meta: {title: '工资申报'},
        component: SalaryDeclare
    },{
        path: 'User',
        name: 'User',
        meta: {title: '用户管理'},
        component: User
    }, {
        path: 'Power',
        name: 'Power',
        meta: {title: '角色管理'},
        component: Power
    }, {
        path: 'SetSubject',
        name: 'SetSubject',
        meta: {title: '科目设定'},
        component: SetSubject
    }, {
        path: 'ParamManage',
        name: 'ParamManage',
        meta: {title: '参数管理'},
        component: ParamManage
    }, {
        path: 'DataCopy',
        name: 'DataCopy',
        meta: {title: '数据备份'},
        component: DataCopy
    }, {
        path: 'SystemLog',
        name: 'SystemLog',
        meta: {title: '系统日志'},
        component: SystemLog
    }, {
        path: 'Send',
        name: 'Send',
        meta: {title: '消息发布'},
        component: Send
    }, {
        path: 'environment',
        name: 'environment',
        meta: {title: '环境管理'},
        component: Environment
    }
]
