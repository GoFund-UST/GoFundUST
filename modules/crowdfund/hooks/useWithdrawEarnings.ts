import {useAddress} from '@arthuryeti/terra';
import {MsgExecuteContract} from '@terra-money/terra.js';
import {TxResult, useConnectedWallet} from '@terra-money/wallet-provider';
import {useMemo} from 'react';

export type State = {
  submit: () => Promise<TxResult>;
};

type Params = {
  contractAddress: string;
};

export const useWithdrawEarnings = ({contractAddress}: Params): State => {
  const address = useAddress();
  const connectedWallet = useConnectedWallet();

  const msgs = useMemo(() => {
    const executeMsg = {
      earn: {},
    };

    const msg = new MsgExecuteContract(address, contractAddress, executeMsg);

    return [msg];
  }, [address, contractAddress]);

  return {
    submit: () => {
      return connectedWallet.post({memo: 'GoFund US(T)', msgs});
    },
  };
};
