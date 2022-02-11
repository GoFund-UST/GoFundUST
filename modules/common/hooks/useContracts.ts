import {useMemo} from 'react';
import {useWallet} from '@terra-money/wallet-provider';

type Contracts = {
  moneyMarket: string;
  crowdFactory: string;
};

type Networks = {
  mainnet: Contracts;
  testnet: Contracts;
};

const defaultContracts: Networks = {
  mainnet: {
    moneyMarket: 'terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal',
    crowdFactory: 'terra1dpe2aqykm2vnakcz4vgpha0agxnlkjvgfahhk7',
  },
  testnet: {
    moneyMarket: 'terra15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal',
    crowdFactory: 'terra1ssnm85jr0jqrzqsz8h5zj5stdkmg42mpg4v423',
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
