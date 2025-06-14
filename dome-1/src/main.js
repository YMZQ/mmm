import {createApp} from 'vue';
import App from './App.vue';
import router from './router';

import 'lib-flexible/flexible';
import './common/style/main.css';
import './common/style/theme.css';
import './common/style/tailwind.less';
import 'vant/es/toast/style';
import 'animate.css';

import {setupI18n} from './i18n/i18n';
import {setupVant} from './plugins/vant';
import {setupPinia} from './plugins/pinia';
import {setupFilters} from './plugins/filters';
import {setupToast} from './plugins/toast';
import {initWow} from './plugins/wow';

const app = createApp(App);

app.use(router);
setupPinia(app);
setupVant(app);
setupI18n(app);
setupFilters(app);
setupToast(app);

app.mount('#app');

initWow();
