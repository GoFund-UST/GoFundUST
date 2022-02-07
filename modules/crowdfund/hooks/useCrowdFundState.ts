import { useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

export type CrowdFundStateResponse = {
  total_value: number;
  pool_value: number;
  earned: number;
  claimable: number;
  fee: number;
};

export const useCrowdFundState = (address: string | undefined) => {
  const { client } = useTerraWebapp();

  const { data, isLoading } = useQuery(["crowdFactory", "state"], () => {
    return client.wasm.contractQuery<CrowdFundStateResponse>(address, {
      claimable: {},
    });
  });

  if (isLoading || data == null) {
    return { isLoading: true, data: null };
  }

  return { isLoading: false, data };
};

export default useCrowdFundState;
