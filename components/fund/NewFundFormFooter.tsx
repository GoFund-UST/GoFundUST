import {TxStep} from '@arthuryeti/terra';
import CommonFooter, {ConfirmButton} from 'components/CommonFooter';
import React, {FC} from 'react';

type Props = {
  data: any;
  onConfirmClick: () => void;
};

const NewFundFormFooter: FC<Props> = ({data, onConfirmClick}) => {
  const cells = [];

  const confirmButton: ConfirmButton = {
    title: 'Create Fund',
    isLoading: data.txStep === TxStep.Estimating,
    isDisabled: data.txStep !== TxStep.Ready,
    type: 'submit',
    onClick: onConfirmClick,
  };

  return <CommonFooter cells={cells} fee={data.fee} confirmButton={confirmButton} />;
};

export default NewFundFormFooter;
