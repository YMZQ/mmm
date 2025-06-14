import Vant, { Lazyload } from 'vant';

export function setupVant(app) {
  app.use(Vant);
  app.use(Lazyload, { lazyComponent: true });
}
