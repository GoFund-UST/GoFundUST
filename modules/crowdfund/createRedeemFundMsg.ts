import {MsgExecuteContract} from '@terra-money/terra.js';

type CreateRedeemFundMsgsOptions = {
  contract: string;
  amount: number;
};

export const createRedeemFundMsgs = (
  options: CreateRedeemFundMsgsOptions,
  sender: string,
  contract: string
) => {
  const executeMsg = {
    send: {
      msg: 'eyJyZWRlZW0iOnt9fQ==',
      amount: options.amount.toString(10),
      contract: options.contract,
    },
  };

  const msg = new MsgExecuteContract(sender, contract, executeMsg);

  return [msg];
};
