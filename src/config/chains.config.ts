// Simplified chain configuration for display purposes only
// No wallet connection functionality needed for marketing site

export interface ChainInfo {
  id: number;
  name: string;
  shortName: string;
  iconUrl: string;
  isTestnet: boolean;
  features: string[];
  popular: boolean;
}

export const SUPPORTED_CHAINS: ChainInfo[] = [
  // Major Mainnets
  {
    id: 1,
    name: 'Ethereum',
    shortName: 'ETH',
    iconUrl: '/chains/ethereum.svg',
    isTestnet: false,
    features: ['Smart Contracts', 'DeFi', 'NFTs'],
    popular: true,
  },
  {
    id: 137,
    name: 'Polygon',
    shortName: 'MATIC',
    iconUrl: '/chains/polygon.svg',
    isTestnet: false,
    features: ['Low Fees', 'Fast Transactions', 'Ethereum Compatible'],
    popular: true,
  },
  {
    id: 42161,
    name: 'Arbitrum',
    shortName: 'ARB',
    iconUrl: '/chains/arbitrum.svg',
    isTestnet: false,
    features: ['Layer 2', 'Low Fees', 'Ethereum Compatible'],
    popular: true,
  },
  {
    id: 10,
    name: 'Optimism',
    shortName: 'OP',
    iconUrl: '/chains/optimism.svg',
    isTestnet: false,
    features: ['Layer 2', 'Optimistic Rollups', 'Ethereum Compatible'],
    popular: true,
  },
  {
    id: 8453,
    name: 'Base',
    shortName: 'BASE',
    iconUrl: '/chains/base.svg',
    isTestnet: false,
    features: ['Layer 2', 'Coinbase', 'Ethereum Compatible'],
    popular: true,
  },
  // New High-Performance Chains
  {
    id: 1337,
    name: 'Monad',
    shortName: 'MON',
    iconUrl: '/chains/monad.svg',
    isTestnet: true,
    features: ['Parallel Execution', 'High Throughput', 'EVM Compatible'],
    popular: false,
  },
  {
    id: 2077,
    name: 'MegaETH',
    shortName: 'METH',
    iconUrl: '/chains/megaeth.svg',
    isTestnet: true,
    features: ['Ultra High TPS', 'Real-time', 'EVM Compatible'],
    popular: false,
  },
  {
    id: 3721,
    name: 'Humanity Protocol',
    shortName: 'HUM',
    iconUrl: '/chains/humanity.svg',
    isTestnet: true,
    features: ['Biometric Identity', 'Proof of Personhood', 'EVM Compatible'],
    popular: false,
  },
  {
    id: 998899,
    name: 'HyperEVM',
    shortName: 'HYPER',
    iconUrl: '/chains/hyperevm.svg',
    isTestnet: true,
    features: ['High Performance', 'Optimized EVM', 'Scalable'],
    popular: false,
  },
];

export const getChainInfo = (chainId: number): ChainInfo | undefined => {
  return SUPPORTED_CHAINS.find(chain => chain.id === chainId);
};

export const getPopularChains = (): ChainInfo[] => {
  return SUPPORTED_CHAINS.filter(chain => chain.popular);
};

export const getMainnetChains = (): ChainInfo[] => {
  return SUPPORTED_CHAINS.filter(chain => !chain.isTestnet);
};