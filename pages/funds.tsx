import {Container, Flex} from '@chakra-ui/react';
import FundList from 'components/pages/FundList';
import {NextPage} from 'next';
import Head from 'next/head';
import React from 'react';

export const FundsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fund List</title>
      </Head>
      <Container my="12" px={['6', null, '12']} maxWidth="container.xl">
        <FundList />
      </Container>
    </>
  );
};

export default FundsPage;
