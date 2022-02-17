import { useQuery } from "react-query";
import { useTerraWebapp } from "@arthuryeti/terra";
import { CrowdFundConfigResponse } from "../../crowdfund";

export const useCrowdFund = (address: string | undefined) => {
  // const [value, setValue] = useState(null);
  const { client } = useTerraWebapp();

  const { data, isLoading } = useQuery(["crowdFactory", "config"], () => {
    return client.wasm.contractQuery<CrowdFundConfigResponse>(address, {
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

export default useCrowdFund;
