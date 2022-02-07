import { useQuery } from "react-query";
import { useTerraWebapp } from "@arthuryeti/terra";

export type CrowdFundDepositPoolTokenInfoResponse = {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: number;
};
export type CrowdFundDepositPoolBalanceResponse = {
  balance: number;
};

export const useCrowdFundDepositPool = (address: string) => {
  // const [value, setValue] = useState(null);
  const { client } = useTerraWebapp();

  const { data, isLoading } = useQuery([address, "token_info"], () => {
    return client.wasm.contractQuery<CrowdFundDepositPoolTokenInfoResponse>(
      address,
      {
        token_info: {},
      }
    );
  });

  if (isLoading || data == null) {
    return { isLoading: true, data: null };
  }

  return {
    isLoading: false,
    data,
  };
};

export const useCrowdFundDepositPoolBalance = (
  address: string,
  account: string
) => {
  // const [value, setValue] = useState(null);
  const { client } = useTerraWebapp();

  const { data, isLoading } = useQuery([address, "balance"], () => {
    return client.wasm.contractQuery<CrowdFundDepositPoolBalanceResponse>(
      address,
      {
        balance: { address: account },
      }
    );
  });

  if (isLoading || data == null) {
    return { isLoading: true, data: null };
  }

  return {
    isLoading: false,
    data,
  };
};

// export default useCrowdFundDepositPool;
