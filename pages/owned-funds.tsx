import {useAddress} from '@arthuryeti/terra';
import {Container} from '@chakra-ui/react';
import FundList from 'components/pages/FundList';
import {useQueryFundListByOwner} from 'modules/crowdfund/hooks/useQueryFund';
import {NextPage} from 'next';
import Head from 'next/head';
import React from 'react';

export const OwnedFundsPage: NextPage = () => {
  const address = useAddress();
  const {data, isLoading} = useQueryFundListByOwner(address);

  return (
    <>
      <Head>
        <title>Owned Funds</title>
      </Head>
      <Container my="12" px={['6', null, '12']} maxWidth="container.xl">
        <FundList data={data} isLoading={isLoading} />
      </Container>
    </>
  );
};

export default OwnedFundsPage;
