import {useMemo} from 'react';
import {useWallet} from '@terra-money/wallet-provider';

type Contracts = {
  moneyMarket: string;
  crowdFactory: string;
  fundFactory: string;
};

type Networks = {
  mainnet: Contracts;
  testnet: Contracts;
};

const defaultContracts: Networks = {
  mainnet: {
    moneyMarket: 'terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s',
    crowdFactory: 'terra1dpe2aqykm2vnakcz4vgpha0agxnlkjvgfahhk7',
    // TODO change with the real mainnet address
    fundFactory: 'terra1l5p2vdcwg7vd67d6s93pe2t60pnlxt49ndkh4j'
  },
  testnet: {
    moneyMarket: 'terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal',
    crowdFactory: 'terra1ssnm85jr0jqrzqsz8h5zj5stdkmg42mpg4v423',
    fundFactory: 'terra1l5p2vdcwg7vd67d6s93pe2t60pnlxt49ndkh4j'
  },
};

export const useContracts = (initial?: Networks): Contracts => {
  const {
    network: {name},
  } = useWallet();
  const contracts = initial ?? defaultContracts;

  return useMemo(() => {
    return contracts[name];
  }, [contracts, name]);
};

export default useContracts;
