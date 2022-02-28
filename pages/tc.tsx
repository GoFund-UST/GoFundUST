import React from 'react';
import Head from 'next/head';
import {NextPage} from 'next';
import {Container} from '@chakra-ui/react';

import TC from 'components/pages/TC';

const TCPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>GoFund US(T) Terms &amp; Conditions</title>
      </Head>
      <Container px={['6', null, '12']} maxWidth="container.xl">
        <TC />
      </Container>
    </>
  );
};

export default TCPage;
