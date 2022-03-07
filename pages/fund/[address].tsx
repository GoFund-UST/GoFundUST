import {Container} from '@chakra-ui/react';
import Disclaimer from 'components/Disclaimer';
import Fund from 'components/pages/Fund';
import {NextPage} from 'next';
import Head from 'next/head';
import React from 'react';

const FundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fund</title>
      </Head>
      <Container my="12" px={['6', null, '12']} position="relative" maxWidth="container.xl">
        <Fund />
        <Disclaimer />
      </Container>
    </>
  );
};

export default FundPage;
