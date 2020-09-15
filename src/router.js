import Vue from 'vue'
import Router from 'vue-router'
import VueCanCan from 'vue-cancan'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: () => import('@/views/dashboard/pages/login'),


    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'patient',
          path: 'patient',
          component: () => import('@/views/dashboard/pages/patient'),
        },
        {
          name: 'user',
          path: 'user',
          component: () => import('@/views/dashboard/pages/users'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
        },
        {
          name: 'species',
          path: 'species',
          component: () => import('@/views/dashboard/pages/especie'),
        },
        {
          name: 'pdf',
          path: 'pdf',
          component: () => import('@/views/dashboard/pages/pdf'),
        },
        {
          name: 'analitos',
          path: 'analitos',
          component: () => import('@/views/dashboard/pages/analitos'),
        },
        {
          name: 'area',
          path: 'area',
          component: () => import('@/views/dashboard/pages/area'),
        },
      ],
    },
  ],
})


export default router;