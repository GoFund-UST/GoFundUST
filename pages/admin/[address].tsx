import {Container} from '@chakra-ui/react';
import Disclaimer from 'components/Disclaimer';
import FundAdmin from 'components/pages/FundAdmin';
import {NextPage} from 'next';
import Head from 'next/head';
import React from 'react';

const FundAdminPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fund Admin</title>
      </Head>
      <Container my="12" px={['6', null, '12']} position="relative" maxWidth="container.xl">
        <FundAdmin />
        <Disclaimer />
      </Container>
    </>
  );
};

export default FundAdminPage;
