import VueRouter from 'vue-router'

// var rootPath=config.build.assetsPublicPath;
var rootPath = "/";


/** -------------------------------------------------- 懒加载start --------------------------------------------*/

const Home = resolve => require(['../components/Home.vue'], resolve)
const Main = resolve => require(['../components/main/Main.vue'], resolve)
const News = resolve => require(['../components/news/Hello.vue'], resolve)

/** -------------------------------------------------- 懒加载end --------------------------------------------*/
const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  //路由映射map
  routes: [
    { path: '/', redirect: '/main' },
    {
      path: rootPath,
      component: Home,
      meta: {scrollToTop: true},
      name: 'home'
    },
    {
      path: rootPath + 'main',
      component: Main,
      name: 'main'
    },
    {
      path: rootPath + 'news',
      component: News,
      name: 'news'
    },
    {
      path: '*',
      component: {template: '<p style="height:300px;text-align:center">404</p>'}
    }
  ]
});
// // 跳转前的逻辑
// router.beforeEach((to, from, next) => {

//     console.log('before---------------');

//     console.log(to.auth);
//     next()
// })

// window.routeList = [];

// // 跳转后的逻辑
// router.afterEach(function(transition) {
//     console.log('-----------------after');
//     for (var i = 0; i < routeList.length; i++) {
//         console.log(routeList[i].name);
//     };
// });


export default router
