import VueRouter from 'vue-router'
import BaseLayout from "@/layout/BaseLayout";

import Overview from "@/views/Overview"

const views = [
    {
        path: 'overview',
        name: 'Overview',
        component: Overview
    },
]

const routes = [
    {path: '/interface', component: BaseLayout, children: views},
    {path: '/', redirect: '/interface/overview'},
    {path: '/interface', redirect: '/interface/overview'},
]

export default new VueRouter({
    mode: 'history',
    routes
})
