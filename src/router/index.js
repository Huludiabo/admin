

import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/home/index.vue'),
        redirect:'/home',
        children:[
            {
                path: '/home',
                name: 'home',
                component: ()=>import( '../views/home/home.vue'),
            },
            {
                path: '/update',
                name: 'update',
                component: ()=>import( '../views/home/update.vue'),
            }
        ]

    },
    { path: '/login', name: 'login', component: () => import('../views/login.vue') },
]

// RouterOptions是路由选项类型
const options = {
    history: createWebHashHistory(),
    routes,
}

// Router是路由对象类型
const router = createRouter(options)

router.beforeEach((to,from,next)=>{
    if (!localStorage.getItem('user')) {
        if (to.name == "login") {
            next();
        } else {
            router.push('/login')
        }
    } else {
        next();
    }
})

export default router
