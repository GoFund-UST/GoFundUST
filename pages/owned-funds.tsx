import {useAddress} from '@arthuryeti/terra';
import {Container} from '@chakra-ui/react';
import {WalletNotConnectedOverlay} from 'components/common/WalletNotConnectedOverlay';
import FundList from 'components/pages/FundList';
import {useQueryFundListByBeneficiary} from 'modules/crowdfund/hooks/useQueryFund';
import {NextPage} from 'next';
import Head from 'next/head';
import React from 'react';

export const OwnedFundsPage: NextPage = () => {
  const address = useAddress();
  const {data, isLoading} = useQueryFundListByBeneficiary(address);

  return (
    <>
      <Head>
        <title>Owned Funds</title>
      </Head>
      <Container my="12" px={['6', null, '12']} position="relative" maxWidth="container.xl">
        <FundList data={data} isLoading={isLoading} />
        <WalletNotConnectedOverlay />
      </Container>
    </>
  );
};

export default OwnedFundsPage;
