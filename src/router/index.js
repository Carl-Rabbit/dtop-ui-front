import VueRouter from 'vue-router'
import BaseLayout from "@/layout/BaseLayout";

import ClusterStatus from "@/views/ClusterStatus"
import Profiling from "@/views/Profiling"

const views = [
    {
        path: 'cluster-status',
        name: 'ClusterStatus',
        component: ClusterStatus
    },
    {
        path: 'profiling',
        name: 'Profiling',
        component: Profiling
    },
]

const routes = [
    {path: '/interface', component: BaseLayout, children: views},
    {path: '/', redirect: '/interface/cluster-status'},
    {path: '/interface', redirect: '/interface/cluster-status'},
]

export default new VueRouter({
    mode: 'history',
    routes
})
