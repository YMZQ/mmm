// routerToDirective.js

import router from '../router'

const routerToDirective = {
    mounted(el, binding) {
        if (router) {
            el.addEventListener('click', () => {
                router.push({path:binding.value});
            });
        } else {
            console.error('Router is not available.');
        }
    },
};

export default routerToDirective;
