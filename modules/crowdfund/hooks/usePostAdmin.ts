import {useAddress} from '@arthuryeti/terra';
import {TxResult, useConnectedWallet} from '@terra-money/wallet-provider';
import {useMemo} from 'react';
import {createCollectionsForFund} from 'modules/crowdfund/createCollectionsForFund';

export type State = {
  submit: () => Promise<TxResult>;
};

type Params = {
  active: string;
  inactive: string;
  contractAddress: string;
  factoryAddress: string;
  name: string;
};

export const usePostAdmin = ({
  active,
  inactive,
  contractAddress,
  factoryAddress,
  name,
}: Params): State => {
  const address = useAddress();
  const connectedWallet = useConnectedWallet();

  const msgs = useMemo(() => {
    return createCollectionsForFund(
      {
        contract: contractAddress,
        factory: factoryAddress,
        imageActive: active,
        imageInActive: inactive,
        name: name,
      },
      address
    );
  }, [active, inactive, address, factoryAddress, name, contractAddress]);

  return {
    submit: () => {
      return connectedWallet.post({memo: 'GoFund US(T)', msgs});
    },
  };
};
