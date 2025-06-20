import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/', redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/Index/Index.vue'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/assetsRecords',
    name: 'assetsRecords',
    component: () => import('@/views/Feeding/AssetsRecords/Index.vue'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: "/:pathMatch(.*)*", redirect: {name: "home"}
  },]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {left: 0, top: 0, behavior: 'smooth'}
  }
})

router.beforeEach(async (to, from, next) => {
  next();
});

export default router
