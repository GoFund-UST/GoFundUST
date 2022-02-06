import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { useUserInfo } from "modules/lockdrop";

export const useAstroBalance = () => {
  const lockUserInfo = useUserInfo();
  // TODO .. do we want to show 'claimable' here?
  const airdropBalance = 0; // useAirdropBalance();

  const lockdropBalance = useMemo(() => {
    if (lockUserInfo == null) {
      return null;
    }

    return num(lockUserInfo.total_astro_rewards)
      .minus(lockUserInfo.delegated_astro_rewards)
      .toString();
  }, [lockUserInfo]);

  return {
    lockdropBalance : lockdropBalance,
    airdropBalance : airdropBalance,
    astroBalance : num(lockdropBalance).plus(airdropBalance).toString(), 
  };
};

export default useAstroBalance;
