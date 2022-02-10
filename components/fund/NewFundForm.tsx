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
import useDebounceValue from 'hooks/useDebounceValue';
import {useInstantiateContract} from 'modules/auction/hooks/useInstantiateContract';
import {useContracts} from 'modules/common';
import {useRouter} from 'next/router';
import React, {FC, useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';

export type NewFundFormValues = {
  pool_name: string;
  pool_title: string;
  pool_description: string;
  beneficiary: string;
  dp_code_id: number;
  fee_amount: string;
  fee_collector: string;
  fee_max: string;
  fee_reset_every_num_blocks: number;
  money_market: string;
  owner_can_change_config: boolean;
};

const NewFundForm: FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const address = useAddress();
  const {moneyMarket} = useContracts();
  const form = useForm<NewFundFormValues>({
    mode: 'onBlur',
    defaultValues: {
      beneficiary: address,
      dp_code_id: DP_CODE_ID,
      fee_amount: FEE_AMOUNT,
      fee_collector: FEE_COLLECTOR,
      fee_max: FEE_MAX.toString(10),
      fee_reset_every_num_blocks: FEE_RESET_EVERY_NUM_BLOCKS,
      money_market: moneyMarket,
      owner_can_change_config: false,
    },
  });

  const onSubmit = _ => {
    state.submit();
  };

  const poolNameValue = useDebounceValue(form.watch('pool_name'), 500);
  let state = useInstantiateContract({
    poolNameValue,
    newFundFormValues: form.getValues(),
  });

  const {fee, txStep} = state;

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
        contentComponent={
          <div>
            You&apos;ve created the fund! <b>TBD</b> show fund links
          </div>
        }
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
            contentComponent={
              <div>
                <b>TBD</b> confirm details here
              </div>
            }
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default NewFundForm;
