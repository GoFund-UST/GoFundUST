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
  poolNameValue: string | null;
  newFundFormValues: NewFundFormValues;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useInstantiateContract = ({
  poolNameValue,
  newFundFormValues,
  onSuccess,
  onError,
}: Params): State => {
  const address = useAddress();

  // TODO_D make a PR on arthur's terra project, so it also takes this type
  const msgs: any = useMemo(() => {
    if (!newFundFormValues && !poolNameValue) {
      return null;
    }

    return createFundMsgs(
      {
        newFundFormValues,
      },
      address
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, poolNameValue]);

  return useTransaction({
    msgs,
    onSuccess,
    onError,
  });
};

export default useInstantiateContract;
