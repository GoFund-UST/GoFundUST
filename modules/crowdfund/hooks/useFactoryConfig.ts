import {useTerraWebapp} from '@arthuryeti/terra';
import {useQuery} from 'react-query';

import {useContracts} from 'modules/common';

export type CrowdFundFactoryConfigResponse = {
  beneficiary: string;
  fee_collector: string;
  money_market: string;
  nft_contract?: string;
  homepage: string;
};

export const useFactoryConfig = () => {
  const {client} = useTerraWebapp();
  const {fundFactory} = useContracts();

  const {data, isLoading} = useQuery(['crowdFactory', 'config'], () => {
    return client.wasm.contractQuery<CrowdFundFactoryConfigResponse>(fundFactory, {
      config: {},
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

export default useFactoryConfig;
