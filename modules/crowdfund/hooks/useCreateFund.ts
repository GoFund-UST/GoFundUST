import {TxStep, useAddress, useTransaction} from '@arthuryeti/terra';
import {TxInfo} from '@terra-money/terra.js';
import {NewFundFormValues} from 'components/fund/NewFundForm';
import {useContracts} from 'modules/common';
import {createFundMsgs} from 'modules/crowdfund/createFundMsg';
import {useMemo} from 'react';

export type State = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  newFundFormValues: NewFundFormValues;
  onSuccess?: (txHash: string, txInfo: TxInfo) => void;
  onError?: (txHash?: string) => void;
};

export const useCreateFund = ({newFundFormValues, onSuccess, onError}: Params): State => {
  const {fundFactory} = useContracts();
  const address = useAddress();

  const msgs = useMemo(() => {
    if (!newFundFormValues) {
      return null;
    }

    return createFundMsgs(
      {
        contract: fundFactory,
        newFundFormValues,
      },
      address
    );
  }, [address, fundFactory, JSON.stringify(newFundFormValues)]);

  return useTransaction({
    msgs,
    onSuccess,
    onError,
  });
};
