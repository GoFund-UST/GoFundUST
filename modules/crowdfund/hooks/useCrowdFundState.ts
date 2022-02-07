import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

export type CrowdFundStateResponse = {
    total_value: string;
    pool_value: string;
    earned: string;
    claimable: string;
    fee: string;
};

export const useCrowdFundState = (address: string | undefined) => {
    const {client} = useTerraWebapp();

    const {data, isLoading} = useQuery(["crowdFactory", "state"], () => {
        return client.wasm.contractQuery<CrowdFundStateResponse>(address, {
            claimable: {},
        });
    });

    if (isLoading || data == null) {
        return {isLoading: true, data: null};
    }

    return {isLoading: false, data};
};

export default useCrowdFundState;
