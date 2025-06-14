import { showLoadingToast, showSuccessToast, showFailToast, closeToast, showToast } from 'vant';

export function setupToast(app) {
  app.config.globalProperties.$toast = {
    loading: function(text) {
      showLoadingToast({
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner',
        message: text,
      });
    },
    success: function(text) {
      showSuccessToast(text);
    },
    error: function(text) {
      showFailToast(text);
    },
    show: function(text) {
      showToast(text);
    },
    close: function() {
      closeToast();
    },
  };
}
