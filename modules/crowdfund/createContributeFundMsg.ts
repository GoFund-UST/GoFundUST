import {Coin, MsgExecuteContract} from '@terra-money/terra.js';

type CreateContributeFundMsgsOptions = {
  contract: string;
  coin: Coin;
};

export const createContributeFundMsgs = (
  options: CreateContributeFundMsgsOptions,
  sender: string
) => {
  const {contract, coin} = options;

  const executeMsg = {
    deposit: {},
  };

  const msg = new MsgExecuteContract(sender, contract, executeMsg, [coin]);

  return [msg];
};
