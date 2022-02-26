import {useQuery} from 'react-query';
import {useTerraWebapp} from '@arthuryeti/terra';

export type TokenListResponse = {
  tokens: string[];
};
export type Trait = {
  trait_type: string;
  value: string;
};
export type Extension = {
  token_uri: string;
  image: string;
  description: string;
  name: string;
  attributes: Trait[];
};
export type NFTInfo = {
  token_uri: string;
  extension: Extension;
};

export const useNFTsForAddress = (nft_contract: string, address: string | undefined) => {
  // const [value, setValue] = useState(null);
  const {client} = useTerraWebapp();

  const {data, isLoading} = useQuery([nft_contract, address], () => {
    return client.wasm.contractQuery<TokenListResponse>(nft_contract, {
      tokens: {
        owner: address,
      },
    });
  });

  if (isLoading || data == null) {
    return {isLoading: true, data: null};
  }

  return {
    isLoading: false,
    data,
  };
};

export const useNFTInfo = (nft_contract: string, token: string | undefined) => {
  const {client} = useTerraWebapp();

  const {data, isLoading} = useQuery([nft_contract, token], () => {
    return client.wasm.contractQuery<NFTInfo>(nft_contract, {
      nft_info: {
        token_id: token,
      },
    });
  });

  if (isLoading || data == null) {
    return {isLoading: true, data: null};
  }

  return {
    isLoading: false,
    data,
  };
};
