import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import Home from './pages/Home.vue';
import Profile from './pages/Profile.vue';
import Articles from './pages/Articles.vue';
import ArticleForm from './pages/Article-form.vue';

import LoginForm from './pages/Login-form.vue';

Vue.use(VueRouter);

Vue.use(VueResource);

var router = new VueRouter({
    routes: [
        {
            path:'/', component: Home
        },
        {
            path:'/profile', component: Profile
        },
        {
            path:'/articles', component: Articles
        },
        {
            path:'/login', component: LoginForm
        },
{
            path:'/new-article', component: ArticleForm
        },

    ]
});

Vue.http.headers.common['Authorization'] = localStorage.getItem('Authorization');

new Vue({
    el: '#app',

    data: function () {
        return {
            loginFormState: 'disable',
            authorize: localStorage.getItem('Authorization')?'enable':'disable'
        }
    },
    methods: {
        showLoginForm: function () {
            this.$router.push('/login');
        },
        closeLoginForm: function () {
            this.$router.push('/');
        },
        loginSuccess: function () {
            Vue.http.headers.common['Authorization'] = localStorage.getItem('Authorization');
            this.authorize = 'enable';
            this.$router.push('/profile');
        }
    },
    router: router,
})
