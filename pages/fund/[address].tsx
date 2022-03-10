import {Box, Container, Text} from '@chakra-ui/react';
import Disclaimer from 'components/Disclaimer';
import Fund from 'components/pages/Fund';
import {NextPage} from 'next';
import Head from 'next/head';
import React from 'react';
import Card from "components/Card";

const FundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fund</title>
      </Head>
      <Container my="12" px={['6', null, '12']} position="relative" maxWidth="container.xl">
          <Card p={['12', null, null, '12']} w={'100%'} bg='white' color='red'>
              <Box>
                  <Text size='lg'><b>Warning</b></Text>
                  <Text> Anyone can create a fund claiming they are whomever they want to be.</Text>
                  <Text> Please use links provided by reputable people on their own pages, and don&apos;t just blindly ape into any you find here</Text>
              </Box>
          </Card>
        <Fund />
        <Disclaimer />
      </Container>
    </>
  );
};

export default FundPage;
