import {TxStep, useAddress} from '@arthuryeti/terra';
import {chakra} from '@chakra-ui/react';
import FormConfirm from 'components/common/FormConfirm';
import FormError from 'components/common/FormError';
import FormLoading from 'components/common/FormLoading';
import FormSuccess from 'components/common/FormSuccess';
import NewFundFormInitial from 'components/fund/NewFundFormInitial';
import {
  DP_CODE_ID,
  FEE_AMOUNT,
  FEE_COLLECTOR,
  FEE_MAX,
  FEE_RESET_EVERY_NUM_BLOCKS,
} from 'constants/constants';
import {useContracts} from 'modules/common';
import {useRouter} from 'next/router';
import React, {FC, useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';

export type NewFundFormValues = {
  poolName: string;
  poolOneLiner: string;
  poolDescription: string;
  beneficiary: string;
  dpCodeId: number;
  feeAmount: string;
  feeCollector: string;
  feeMax: number;
  feeResetEveryNumBlocks: number;
  moneyMarket: string;
};

const NewFundForm: FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const address = useAddress();
  const {moneyMarket} = useContracts();
  const form = useForm<NewFundFormValues>({
    defaultValues: {
      beneficiary: address,
      dpCodeId: DP_CODE_ID,
      feeAmount: FEE_AMOUNT,
      feeCollector: FEE_COLLECTOR,
      feeMax: FEE_MAX,
      feeResetEveryNumBlocks: FEE_RESET_EVERY_NUM_BLOCKS,
      moneyMarket,
    },
  });

  const onSubmit = data => {
    console.log(data);
  };

  // TODO removed mock
  const state = {
    fee: null,
    txStep: TxStep.Ready,
    txHash: 'hash',
    error: null,
    reset: () => {},
    submit: () => console.log('submitted to BE'),
  };

  const {fee, txStep, submit} = state;

  const handleSuccessClose = () => {
    router.push('/');
  };

  useEffect(() => {
    if (txStep === TxStep.Broadcasting) {
      setShowConfirm(false);
    }
  }, [txStep]);

  if (txStep === TxStep.Broadcasting || txStep === TxStep.Posting) {
    return <FormLoading txHash={state.txHash} />;
  }

  if (txStep === TxStep.Success) {
    return (
      <FormSuccess
        contentComponent={<div>You've created the fund!</div>}
        onCloseClick={handleSuccessClose}
      />
    );
  }

  if (txStep === TxStep.Failed) {
    return <FormError content={state.error} onCloseClick={state.reset} onClick={state.reset} />;
  }

  return (
    <FormProvider {...form}>
      <chakra.form onSubmit={form.handleSubmit(onSubmit)} width="full">
        {!showConfirm && <NewFundFormInitial state={state} onClick={() => setShowConfirm(true)} />}
        {showConfirm && (
          <FormConfirm
            fee={fee}
            actionLabel="Confirm Fund Creation"
            contentComponent={<div></div>}
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default NewFundForm;
