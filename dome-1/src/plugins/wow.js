import WOW from 'wow.js';

export function initWow() {
  var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true,
    resetAnimation: true,
  });
  wow.init();
}
