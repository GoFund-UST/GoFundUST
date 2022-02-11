import {PairResponse} from './astroswap';

export type Token = {
  protocol: string;
  symbol: string;
  token: string;
  icon: string;
};

export type Tokens = {
  [token: string]: Token;
};

export type Routes = {
  [from: string]: {
    [to: string]: PairResponse;
  };
};

export type Data = {
  mainnet: {
    tokens: any;
  };
  testnet: {
    tokens: any;
  };
} & {[key: string]: any};
