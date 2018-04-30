import Vue from 'vue'
import Router from 'vue-router'
// Import components to use in view
//import HelloWorld from '@/components/HelloWorld'
import Error404 from '@/layouts/Error'
import Login from '@/components/login/Login'
import LoginTemplate from '@/layouts/Login'
import ProductsTemplate from '@/layouts/Home'
import Products from '@/components/products/products'


Vue.use(Router)
 const router = new Router({
  mode: 'history',
  base: process.env.BASE_ROUTE,
  routes: [
    // Load login views
    {
      path: '/404',
      component: Error404
    },
    {
      path: '/',
      component: ProductsTemplate,
      children:[
        {
          path: 'products',
          name: 'Products',
          component: Products
        },
        {
          path: '',
          name: 'Products',
          component: Products
        },
        {
          path: '404',
          name: 'Error404',
          component: Error404
        }
      ]
    },
    {
      path: '/login',
      component: LoginTemplate,
      children:[
        {
          path: '',
          name: 'Login',
          component: Login
        },
        {
          path: '404',
          name: 'Error404',
          component: Error404
        }
      ]
    },


  ],
})



// router.beforeEach((to, from, next) => {
//   //console.log(JSON.stringify(to));
//   if(to.meta.requiresAuth) {
//     console.log("requiere audit");
//     console.log
//     const authUser = JSON.parse(window.localStorage.getItem('rol'))
//     if(!authUser ) {
//       next({name:'Login'})
//     }
//     else if(to.meta.adminAuth) {
//     const authUser = JSON.parse(window.localStorage.getItem('rol'))
//     if(authUser == 1 ) {
//       next()
//     }else {
//       next('/juez')
//     }
//   } else if(to.meta.juezAuth) {
//     const authUser = JSON.parse(window.localStorage.getItem('rol'))
//     if(authUser == 2) {
//       next()
//     }else {
//       console.log('Im in admin')
//       next('/admin')
//     }
//   }
//   }else {
//   next()
//   }
// })

export default router;
