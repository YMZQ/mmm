import {showFailToast, showSuccessToast} from 'vant';
import useClipboard from 'vue-clipboard3';
import i18n from '@/i18n/i18n'

const copyToClipboard = async (text) => {
    const {toClipboard} = useClipboard();
    try {
        await toClipboard(text);
        showSuccessToast(i18n.global.t('public.copy.success'));
    } catch (error) {
        showFailToast(i18n.global.t('public.copy.failure'));
    }
}
export default copyToClipboard;
