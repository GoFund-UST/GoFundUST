import {useAddress} from '@arthuryeti/terra';
import {Coin} from '@terra-money/terra.js';
import {TxResult, useConnectedWallet} from '@terra-money/wallet-provider';
import {createContributeFundMsgs} from '../createContributeFundMsg';
import {useMemo} from 'react';

export type State = {
  submit: () => Promise<TxResult>;
};

type Params = {
  fundAmount: number;
  contractAddress: string;
};

export const usePostContributeFund = ({fundAmount, contractAddress}: Params): State => {
  const address = useAddress();
  const connectedWallet = useConnectedWallet();

  const msgs = useMemo(() => {
    let coin = new Coin('uusd', fundAmount * 1_000_000);

    if (!coin) {
      return null;
    }

    return createContributeFundMsgs(
      {
        contract: contractAddress,
        coin,
      },
      address
    );
  }, [fundAmount, address, contractAddress]);

  return {
    submit: () => {
      return connectedWallet.post({memo: 'GoFund US(T)', msgs});
    },
  };
};
