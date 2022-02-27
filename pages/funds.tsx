import {Container} from '@chakra-ui/react';
import {WalletNotConnectedOverlay} from 'components/common/WalletNotConnectedOverlay';
import FundList from 'components/pages/FundList';
import {useQueryFundList} from 'modules/crowdfund/hooks/useQueryFund';
import {NextPage} from 'next';
import Head from 'next/head';
import React from 'react';
import {useAddress} from '@arthuryeti/terra';

export const FundsPage: NextPage = () => {
  const {data, isLoading} = useQueryFundList();
  const address = useAddress();
  return (
    <>
      <Head>
        <title>Fund List</title>
      </Head>
      <Container my="12" px={['6', null, '12']} position="relative" maxWidth="container.xl">
        <FundList data={data} isLoading={isLoading} address={address} />
        <WalletNotConnectedOverlay />
      </Container>
    </>
  );
};

export default FundsPage;
