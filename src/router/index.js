import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Member from "../pages/Member";
import SignUp from "../pages/SignUp";

const router = new VueRouter({
    mode: 'history',
    routes: [
      { 
        path: '/', component: Layout,
        children: [
          { path: '/', component: Home },
          { path: 'login', component: Login },
          { path: 'member', component: Member },
          { path: 'signup', component: SignUp }
        ]
      },
    ]
  })
  
  export default router


  