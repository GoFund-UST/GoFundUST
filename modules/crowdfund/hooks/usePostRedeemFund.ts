import {useAddress} from '@arthuryeti/terra';
import {Coin} from '@terra-money/terra.js';
import {TxResult, useConnectedWallet} from '@terra-money/wallet-provider';
import {createRedeemFundMsgs} from 'modules/crowdfund/createRedeemFundMsg';
import {useMemo} from 'react';

export type State = {
  submit: () => Promise<TxResult>;
};

type Params = {
  redeemAmount: number;
  contractAddress: string;
  bodyContract: string;
};

export const usePostRedeemFund = ({redeemAmount, contractAddress, bodyContract}: Params): State => {
  const address = useAddress();
  const connectedWallet = useConnectedWallet();

  const msgs = useMemo(() => {
    if (!redeemAmount) {
      return null;
    }
    const amount = redeemAmount * 1_000_000;
    return createRedeemFundMsgs(
      {
        contract: bodyContract,
        amount,
      },
      address,
      contractAddress
    );
  }, [redeemAmount, address, bodyContract, contractAddress]);

  return {
    submit: () => {
      return connectedWallet.post({memo: 'GoFund US(T)', msgs});
    },
  };
};
