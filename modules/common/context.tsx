import {useWallet} from '@terra-money/wallet-provider';
import React, {Consumer, Context, createContext, FC, ReactNode, useContext, useMemo} from 'react';
import {Data, Tokens} from './types';

type GoFundUst = {
  tokens: Tokens | null;
  data: Data | null;
};

export const GoFundUstAppContext: Context<GoFundUst> = createContext<GoFundUst>({
  tokens: null,
  data: null,
});

type Props = {
  children: ReactNode;
  data: Data;
};

export const GoFundUstAppProvider: FC<Props> = ({children, data}) => {
  const {
    network: {name},
  } = useWallet();

  const tokens = useMemo(() => {
    return data[name].tokens;
  }, [name, data]);

  return (
    <GoFundUstAppContext.Provider
      value={{
        tokens,
        data
      }}>
      {children}
    </GoFundUstAppContext.Provider>
  );
};

export function useGoFundUstApp(): GoFundUst {
  return useContext(GoFundUstAppContext);
}

export const GoFundUstAppConsumer: Consumer<GoFundUst> = GoFundUstAppContext.Consumer;
