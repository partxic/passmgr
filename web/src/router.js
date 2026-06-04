import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/view/Login.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/view/Dashboard.vue'),
            children: [
                {
                    path: 'list',
                    name: 'dash-list-account',
                    component: () => import('@/view/dashboard/ListAccount.vue')
                },
                {
                    path: 'create',
                    name: 'dash-account-create',
                    component: () => import('@/view/dashboard/AccountCreate.vue')
                }
            ]
        }
    ]
})
