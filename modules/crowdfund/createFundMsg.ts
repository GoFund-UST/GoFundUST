import {MsgExecuteContract} from '@terra-money/terra.js';
import {NewFundFormValues} from 'components/fund/NewFundForm';

type CreateFundMsgsOptions = {
  contract: string;
  newFundFormValues: NewFundFormValues;
};

export const createFundMsgs = (options: CreateFundMsgsOptions, sender: string) => {
  const {contract, newFundFormValues} = options;

  const executeMsg = {
    create_anchor_fund: {
      ...newFundFormValues,
    },
  };

  const msg = new MsgExecuteContract(sender, contract, executeMsg);

  return [msg];
};
