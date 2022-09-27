import {useMemo} from 'react';
import {useWallet} from '@terra-money/wallet-provider';

type Contracts = {
  // moneyMarket: string;
  // crowdFactory: string;
  fundFactory: string;
};

type Networks = {
  classic: Contracts;
  mainnet: Contracts;
  testnet: Contracts;
};

const defaultContracts: Networks = {
  classic: {
    fundFactory: 'terra1u3uxd530nd62gjerwlsth08x776fej3eeer3vd',
  },
  mainnet: {
    fundFactory: 'terra1u3uxd530nd62gjerwlsth08x776fej3eeer3vd',
  },
  testnet: {
    fundFactory: 'terra1vd04tm25d4r0uey38d6v870ehpdsptdrxpxpqw',
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
