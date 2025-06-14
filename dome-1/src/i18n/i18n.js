import { createI18n } from 'vue-i18n'
import messages from './langs'

const i18n = createI18n({
    globalInjection: true, //全局生效$t
    locale: localStorage.lang || 'zhmsg',
    messages,
    legacy: false,
    missing:true,
    fallbackRoot:true,
    silentFallback: true // Disable console warnings about missing translations
})


export default i18n
export function setupI18n(app) {
    app.use(i18n);
}
