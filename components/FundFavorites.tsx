import React from 'react';

import PageLoading from 'components/common/PageLoading';

import FundFavoritesNFTConnected from 'components/FundFavoritesNFTConnected';
import {useFactoryConfig} from 'modules/crowdfund/hooks/useFactoryConfig';

const FundFavorites = () => {
  const factoryConfig = useFactoryConfig();

  if (factoryConfig.isLoading) {
    return <PageLoading />;
  } else {
    const nft_contract = factoryConfig.data.nft_contract;

    if (nft_contract) {
      return (
        <FundFavoritesNFTConnected factoryConfig={factoryConfig.data}></FundFavoritesNFTConnected>
      );
    } else {
      return <></>;
    }
  }
};

export default FundFavorites;
