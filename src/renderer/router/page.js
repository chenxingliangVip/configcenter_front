import FirstPage from '@/page/mainContent/Firstpage/Index'
import Environment from '@/page/mainContent/Environment/Index'
import Applymanage from '@/page/mainContent/Applymanage/Index'
import Settingmanage from '@/page/mainContent/Settingmanage/Index'
import Approvemanage from '@/page/mainContent/Approvemanage/Index'
import History from '@/page/mainContent/History/Index'
import AgGrid from '@/page/mainContent/AgGrid/index'
import ProjectInfo from '@/page/mainContent/ProjectInfo/index'

// **************登录后访问的路由**********
export default [
    {
        path: '/FirstPage',
        name: 'FirstPage',
        meta: {title: '首页'},
        component: FirstPage
    },{
        path: 'environment',
        name: 'environment',
        meta: {title: '环境管理'},
        component: Environment
    }, {
        path: 'applymanage',
        name: 'applymanage',
        meta: {title: '应用管理'},
        component: Applymanage
    }, {
        path: 'settingmanage',
        name: 'settingmanage',
        meta: {title: '配置管理'},
        component: Settingmanage
    }, {
        path: 'approve',
        name: 'approve',
        meta: {title: '审核发布'},
        component: Approvemanage
    }, {
        path: 'versionManage',
        name: 'versionManage',
        meta: {title: '版本管理'},
        component: Settingmanage
    }, {
        path: 'versionMove',
        name: 'versionMove',
        meta: {title: '版本迁移'},
        component: Settingmanage
    }, {
        path: 'logOperate',
        name: 'logOperate',
        meta: {title: '日志操作'},
        component: History
    }, {
        path: 'AgGrid',
        name: 'AgGrid',
        meta: {title: 'AgGrid'},
        component: AgGrid
    }, {
        path: 'ProjectInfo',
        name: 'ProjectInfo',
        meta: {title: '项目信息'},
        component: ProjectInfo
    }
]
