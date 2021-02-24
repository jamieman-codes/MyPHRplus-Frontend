import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/core/Login'
import Register from '../components/core/Register'
import Dashboard from '../components/core/Dashboard'
import Welcome from '../components/core/Welcome'
import Profile from '../components/core/Profile'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        }
    ]
});

export default router