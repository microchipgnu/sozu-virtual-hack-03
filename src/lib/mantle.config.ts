export const MANTLE_NETWORKS = {
  mainnet: {
    id: 5000,
    name: 'Mantle',
    network: 'mainnet',
    rpcUrls: {
      default: {
        http: ['https://rpc.mantle.xyz'],
        webSocket: ['wss://rpc.mantle.xyz']
      },
      public: {
        http: ['https://rpc.mantle.xyz'],
        webSocket: ['wss://rpc.mantle.xyz']
      }
    },
    blockExplorers: {
      default: {
        name: 'Explorer',
        url: 'https://explorer.mantle.xyz'
      }
    },
    nativeCurrency: {
      name: 'MNT',
      symbol: 'MNT',
      decimals: 18
    },
    customMethods: {
      eth_getBlockRange: {
        description: 'Returns block info for multiple blocks, takes a block range as parameter',
        params: [
          {
            name: 'startBlock',
            type: 'QUANTITY | TAG',
            description: 'Starting block no. of the range, or one of "earliest", "latest", or "pending"'
          },
          {
            name: 'endBlock', 
            type: 'QUANTITY | TAG',
            description: 'Ending block no. of the range, or one of "earliest", "latest", or "pending"'
          },
          {
            name: 'fullTx',
            type: 'BOOLEAN',
            description: 'If true, returns full transaction objects. If false, returns transaction hashes only'
          }
        ]
      },
      rollup_getInfo: {
        description: 'Returns L2 node info',
        params: []
      }
    },
    unsupportedMethods: [
      'eth_getAccounts',
      'eth_sendTransaction'
    ]
  },
  testnet: {
    id: 5001,
    name: 'Mantle Sepolia', 
    network: 'testnet',
    rpcUrls: {
      default: {
        http: ['https://rpc.sepolia.mantle.xyz'],
      },
      public: {
        http: [
          'https://rpc.sepolia.mantle.xyz',
          'https://rpc.ankr.com/mantle_sepolia',
          'https://mantle-sepolia.drpc.org'
        ],
        webSocket: [
          'wss://mantle-sepolia.drpc.org'
        ]
      }
    },
    blockExplorers: {
      default: {
        name: 'Explorer',
        url: 'https://explorer.testnet.mantle.xyz'
      }
    },
    nativeCurrency: {
      name: 'MNT',
      symbol: 'MNT',
      decimals: 18
    },
    customMethods: {
      eth_getBlockRange: {
        description: 'Returns block info for multiple blocks, takes a block range as parameter',
        params: [
          {
            name: 'startBlock',
            type: 'QUANTITY | TAG', 
            description: 'Starting block no. of the range, or one of "earliest", "latest", or "pending"'
          },
          {
            name: 'endBlock',
            type: 'QUANTITY | TAG',
            description: 'Ending block no. of the range, or one of "earliest", "latest", or "pending"'
          },
          {
            name: 'fullTx',
            type: 'BOOLEAN',
            description: 'If true, returns full transaction objects. If false, returns transaction hashes only'
          }
        ]
      },
      rollup_getInfo: {
        description: 'Returns L2 node info',
        params: []
      }
    },
    unsupportedMethods: [
      'eth_getAccounts',
      'eth_sendTransaction'  
    ]
  }
} as const;
