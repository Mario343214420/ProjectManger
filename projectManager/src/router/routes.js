// import { RouteRecordRaw } from 'vue-router';
export const staticRoutes = [
    // 主页
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/Home.vue'),
    },
    // 登录页
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/Login.vue'),
    },
    // 项目管理页
    {
        path: '/projectManage',
        name: 'projectManage',
        component: () => import('@/views/ProjectManage/ProjectManage.vue'),
    },
    {
        path: '/',
        redirect: '/projectManage',
    }
]
