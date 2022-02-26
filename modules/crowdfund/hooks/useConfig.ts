export type CrowdFundConfigResponse = {
  beneficiary: string;
  fee_collector: string;
  money_market: string;
  stable_denom: string;
  anchor_token: string;
  dp_token: string;
  pool_name: string;
  pool_title: string;
  pool_description: string;
  nft_contract?: string;
  nft_collection_active?: string;
  nft_collection_redeemed?: string;
};
