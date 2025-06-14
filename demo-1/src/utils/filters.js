// filters.js
import i18n from '@/i18n/i18n'

const transactionTypes = {
    1: 'transactionType1',
    2: 'transactionType2',
    3: 'transactionType3',
    4: 'transactionType4',
    5: 'transactionType5',
    6: 'transactionType6',
    7: 'transactionType7',
    8: 'transactionType8',
    9: 'transactionType9',
    10: 'transactionType10',
    11: 'transactionType11',
    12: 'transactionType12',
    13: 'transactionType13',
    14: 'transactionType14',
    15: 'transactionType15',
    16: 'transactionType16',
    17: 'transactionType17',
    20: 'transactionType20',
    21: 'transactionType21',
    22: 'transactionType22',
    23: 'transactionType23',
    24: 'transactionType24',
    25: 'transactionType25',
    26: 'transactionType26',
    27: 'transactionType27',
    28: 'transactionType28',
};

export const transactionFlows = (value) => {
    return i18n.global.t(transactionTypes[value] || 'unknown');
};

const withdrawStates = {
    0: 'withdraw.state.text-0',
    1: 'withdraw.state.text-1',
    2: 'withdraw.state.text-2',
    3: 'withdraw.state.text-3',
    4: 'withdraw.state.text-4',
    5: 'withdraw.state.text-5',
    6: 'withdraw.state.text-6',
    7: 'withdraw.state.text-7',
    8: 'withdraw.state.text-8',
    9: 'withdraw.state.text-9',
    10: 'withdraw.state.text-10'
};

export const withdrawState = (value) => {
    return i18n.global.t(withdrawStates[value] || 'unknown');
};

export const formatNumber = (number) => {
    number = Number(number)
    if (typeof number !== 'number') {
        return 'Invalid input';
    }
    const million = 10000;  // 更改为万的单位
    const billion = 100000000;  // 更改为亿的单位
    if (number >= billion) {
        return (number / billion).toFixed(2) + i18n.global.t('亿');
    } else if (number >= 1000000) {
        return (number / million).toFixed(2) + i18n.global.t('万');
    } else {
        return number.toFixed(2) ;
    }
};
































