import routerToDirective from '@/utils/routerToDirective.js';

export function setupDirectives(app) {
  app.directive('router-to', routerToDirective);
}
