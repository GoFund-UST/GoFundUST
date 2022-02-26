import React, {FC} from 'react';
import {Box, Text} from '@chakra-ui/react';

import CardHeader from 'components/CardHeader';
import Card from 'components/Card';
import {CrowdFundFactoryConfigResponse} from 'modules/crowdfund/hooks/useFactoryConfig';
import PageLoading from 'components/common/PageLoading';
import {useAddress} from '@arthuryeti/terra';
import {useNFTsForAddress} from 'modules/crowdfund/hooks/useQueryNFT';

import NFTList from 'components/common/NFTList';
type Props = {
  factoryConfig: CrowdFundFactoryConfigResponse;
};
const FundFavoritesNFTConnected: FC<Props> = ({factoryConfig}) => {
  const address = useAddress();

  const nft_contract = factoryConfig.nft_contract;
  const home_page = factoryConfig.homepage;
  const current = window.location.protocol + '//' + window.location.hostname;
  const nft_list = useNFTsForAddress(nft_contract, address);
  if (nft_list.isLoading) {
    return <PageLoading />;
  } else {
    let alert = <></>;
    if (home_page != current) {
      alert = (
        <Text color="red">
          Alert: Are you on the correct site? This is configured for{' '}
          <a href={home_page}>{home_page}</a>, which doesn&apos;t appear to be where you are. Please
          be aware of frauds, and NEVER give out your seed phrase.
        </Text>
      );
    }

    if (nft_contract) {
      // @ts-ignore
      return (
        <Box>
          <CardHeader label="List of popular GoFunds" />
          <Card p={['6', null, null, '12']}>
            {alert}
            <Text>
              <NFTList nft_contract={nft_contract} nfts={nft_list.data.tokens} />
            </Text>
          </Card>
        </Box>
      );
    } else {
      return <></>;
    }
  }
};

export default FundFavoritesNFTConnected;
