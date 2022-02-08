import {MsgInstantiateContract} from '@terra-money/terra.js';
import {NewFundFormValues} from 'components/fund/NewFundForm';
import {GO_FUND_UST_CODE_ID} from 'constants/constants';

type CreateFundMsgsOptions = {
  newFundFormValues: NewFundFormValues;
};

export const createFundMsgs = (options: CreateFundMsgsOptions, sender: string) => {
  const {newFundFormValues} = options;
  const instantiate = new MsgInstantiateContract(
    sender,
    '',
    GO_FUND_UST_CODE_ID,
    newFundFormValues
  );

  return [instantiate];
};
