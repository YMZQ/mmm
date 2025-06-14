const mainnetConfig = {
    '0x38': { // Binance Smart Chain Mainnet
        chainId: '0x38',
        chainName: 'Binance Smart Chain',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com']
    },
};

const testnetConfig = {
    '0x38': { // Binance Smart Chain Mainnet
        chainId: '0x38',
        chainName: 'Binance Smart Chain',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com']
    },
    // '0x61': { // BSC test
    //     chainId: '0x61',
    //     chainName: 'BNB Smart Chain Testnet',
    //     nativeCurrency: {
    //         name: 'BNB',
    //         symbol: 'BNB',
    //         decimals: 18
    //     },
    //     rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    //     blockExplorerUrls: ['https://testnet.bscscan.com/']
    // }
};

const targetChainIdMainnet = '0x61'; // Ethereum Mainnet
const targetChainIdTestnet = '0x61'; // BSC test



const isDevelopment = import.meta.env.MODE === 'development';
const nativeNetwork = isDevelopment ? testnetConfig : mainnetConfig;
const targetChainId = isDevelopment ? targetChainIdTestnet : targetChainIdMainnet;

export {
    nativeNetwork,
    targetChainId
};
