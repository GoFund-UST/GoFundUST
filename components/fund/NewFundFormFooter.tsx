import {TxStep} from '@arthuryeti/terra';
import CommonFooter, {ConfirmButton} from 'components/CommonFooter';
import {NewFundFormValues} from 'components/fund/NewFundForm';
import React, {FC} from 'react';
import {useFormContext} from 'react-hook-form';

type Props = {
  data: any;
  onConfirmClick: () => void;
};

const NewFundFormFooter: FC<Props> = ({data, onConfirmClick}) => {
  const cells = [];
  const {
    formState: {isValid: isFormValid},
  } = useFormContext<NewFundFormValues>();

  const confirmButton: ConfirmButton = {
    title: 'Create Fund',
    isLoading: data.txStep === TxStep.Estimating,
    isDisabled: data.txStep !== TxStep.Ready || !isFormValid,
    type: 'submit',
    onClick: onConfirmClick,
  };

  return <CommonFooter cells={cells} fee={data.fee} confirmButton={confirmButton} />;
};

export default NewFundFormFooter;
