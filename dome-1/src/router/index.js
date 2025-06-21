import {createRouter, createWebHashHistory} from 'vue-router'
import {appStore} from '@/stores/index'
import web3Utils from '@/utils/web3js/web3-utils.min'
import App from '@/views/App.vue'
import {showFailToast} from 'vant'
import i18n from '@/i18n/i18n'

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
    path: '/deposit',
    name: 'app',
    component: App,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/deposit',
        name: 'deposit',
        component: () => import('@/views/Deposit/Index.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/leaderboard',
        name: 'leaderboard',
        component: () => import('@/views/Leaderboard/Index.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/community',
        name: 'community',
        component: () => import('@/views/Community/Index.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/assets',
        name: 'assets',
        component: () => import('@/views/assets/Index.vue'),
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/financialDetail',
    name: 'financialDetail',
    component: () => import('@/views/Assets/FinancialDetail/Index.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/:pathMatch(.*)*", redirect: {name: "home"}
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {left: 0, top: 0, behavior: 'smooth'}
    // if (savedPosition) {
    //   return savedPosition // 返回历史记录中的滚动位置
    // } else {
    //   return {left: 0, top: 0, behavior: 'smooth'}
    // }
  }
})

router.beforeEach(async (to, from, next) => {
  const user = appStore().user;
  const requireAuth = to.meta.requireAuth;

  const redirectToHome = (query = {}) => next({path: '/home', query});
  if (user.username) {
    try {
      const account = await web3Utils.getAccounts();
      if (user.username.toLowerCase() !== account?.toLowerCase()) {
        appStore().address = '';
        appStore().token = '';
        appStore().user = [];
        appStore().info = [];
        if (to.fullPath.includes('code')) {
          redirectToHome({code: to.query.code});
        } else {
          redirectToHome();
        }
      } else {
        next();
      }
    } catch (errors) {
      showFailToast(errors);
    }
  } else {
    if (!requireAuth) {
      next();
    } else {
      showFailToast(i18n.global.t('auth.connectWalletPrompt'));
      if (to.fullPath.includes('code')) {
        redirectToHome({code: to.query.code});
      } else {
        redirectToHome();
      }
    }
  }
});

export default router
