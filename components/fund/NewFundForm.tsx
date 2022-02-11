import {TxStep, useAddress} from '@arthuryeti/terra';
import {chakra} from '@chakra-ui/react';
import {TxInfo} from '@terra-money/terra.js';
import FormConfirm from 'components/common/FormConfirm';
import FormError from 'components/common/FormError';
import FormGenericSummary from 'components/common/FormGenericSummary';
import FormLoading from 'components/common/FormLoading';
import FormSuccess from 'components/common/FormSuccess';
import NewFundFormInitial from 'components/fund/NewFundFormInitial';
import NewFundFormSuccessContent from 'components/fund/NewFundFormSuccessContent';
import useDebounceValue from 'hooks/useDebounceValue';
import {objectToArrayOfTuple} from 'libs/helpers';
import {useCreateFund} from 'modules/terra/hooks/useCreateFund';
import {useRouter} from 'next/router';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';

export type NewFundFormValues = {
  pool_name: string;
  pool_title: string;
  pool_description: string;
  beneficiary: string;
};

const NewFundForm: FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const address = useAddress();
  const [fundAddress, setFundAddress] = useState<string>();
  const form = useForm<NewFundFormValues>({
    mode: 'onBlur',
    defaultValues: {
      beneficiary: address,
    },
  });

  const onSubmit = _ => {
    state.submit();
  };

  const onSuccess = useCallback((txHash: string, txInfo: TxInfo) => {
    const fundAddress: string = txInfo.logs?.[0].eventsByType['wasm']?.contract_address?.[0];
    setFundAddress(fundAddress);
  }, []);

  const newFundFormValues: NewFundFormValues = useDebounceValue(form.watch(), 500);
  let state = useCreateFund({
    newFundFormValues,
    onSuccess,
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
          <NewFundFormSuccessContent txHash={state.txHash} fundAddress={fundAddress} />
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
              <FormGenericSummary
                fields={objectToArrayOfTuple({
                  'Fund name': newFundFormValues.pool_name,
                  Title: newFundFormValues.pool_title,
                  Description: newFundFormValues.pool_description,
                })}
              />
            }
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default NewFundForm;
