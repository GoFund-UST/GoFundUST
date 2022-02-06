import { useMemo } from "react";
import { useAddress, useTransaction, TxStep, num } from "@arthuryeti/terra";

import { createProvideMsgs } from "modules/auction";
import { useContracts } from "modules/common";
//import { useAirdrop, useUserInfo } from "modules/airdrop";

export type ProvideState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  uusdAmount: string | null;
  astroAirdropAmount: string | null;
  astroLockdropAmount: string | null;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useProvide = ({
  uusdAmount,
  astroAirdropAmount,
  astroLockdropAmount,
  onSuccess,
  onError,
}: Params): ProvideState => {
  const { auction, lockdrop, crowdFactory } = useContracts();
  const address = useAddress();
  const { data } = {data: {amount: "9", merkle_proof: ["8888"], index: 11}}; // useAirdrop(address);
  const userInfo = {airdrop_amount: "123" }; // useUserInfo();

  const msgs = useMemo(() => {
    return createProvideMsgs(
      {
        auctionContract: auction,
        lockdropContract: lockdrop,
        airdropContract: crowdFactory,
        uusdAmount,
        astroAirdropAmount,
        astroLockdropAmount,
        hasClaimed: num(userInfo?.airdrop_amount).gt(0),
        airdropClaimAmount: data?.amount,
        merkleProof: data?.merkle_proof,
        rootIndex: data?.index,
      },
      address
    );
  }, [
    userInfo,
    address,
    auction,
    crowdFactory,
    lockdrop,
    data,
    uusdAmount,
    astroAirdropAmount,
    astroLockdropAmount,
  ]);

  return useTransaction({
    msgs,
    gasAdjustment: 1.4,
    onSuccess,
    onError,
  });
};

export default useProvide;
