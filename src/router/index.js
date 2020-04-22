import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from "../components/Home";
import Login from "../components/Login";
import Member from "../components/Member";
import SignUp from "../components/SignUp";

const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', component: Home },
      { path: '/login', component: Login },
      { path: '/member', component: Member },
      { path: '/signup', component: SignUp }
    ]
  })
  
  export default router


  