import { useAddress, useTerraWebapp } from '@arthuryeti/terra';
import { useQuery } from 'react-query';

import { useContracts } from 'modules/common';

export type CrowdFundConfigResponse = {
    beneficiary: string;
    fee_collector: string;
    money_market: string;
    stable_denom: string;
    anchor_token: string;
    dp_token: string;
    pool_name: string;
    pool_oneliner: string;
    pool_description: string;
};

export const useConfig = () => {
    const {client} = useTerraWebapp();
    const {crowdFactory} = useContracts();

    const {data, isLoading} = useQuery(['crowdFactory', 'config'], () => {
        return client.wasm.contractQuery<CrowdFundConfigResponse>(crowdFactory, {
            config: {},
        });
    });

    if (isLoading || data == null) {
        return null;
    }

    return data;
};

export default useConfig;
