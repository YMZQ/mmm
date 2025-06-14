import { createPinia } from 'pinia';
import PiniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export function setupPinia(app) {
  const pinia = createPinia();
  pinia.use(PiniaPluginPersistedstate);
  app.use(pinia);
}
