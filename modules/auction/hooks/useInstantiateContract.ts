import {TxStep, useAddress, useTransaction} from '@arthuryeti/terra';
import {NewFundFormValues} from 'components/fund/NewFundForm';
import {createFundMsgs} from 'modules/auction/createFundMsg';
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
  newFundFormValues: NewFundFormValues | null;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useInstantiateContract = ({newFundFormValues, onSuccess, onError}: Params): State => {
  const address = useAddress();

  // TODO_D make a PR on arthur's terra project, so it also takes this type
  const msgs: any = useMemo(() => {
    if (!newFundFormValues) {
      return null;
    }

    return createFundMsgs(
      {
        newFundFormValues,
      },
      address
    );
    // TODO_D I guess this stringify is bad practice, remote it somehow
  }, [address, JSON.stringify(newFundFormValues)]);

  return useTransaction({
    msgs,
    onSuccess,
    onError,
  });
};

export default useInstantiateContract;
