import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import NewFund from "components/pages/NewFund";
import { WalletNotConnectedOverlay } from 'components/common/WalletNotConnectedOverlay';

const NewFundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create a new GoFund US(T)</title>
      </Head>
      <Flex position="relative">
        <NewFund />
        <WalletNotConnectedOverlay />
      </Flex>
    </>
  );
};

export default NewFundPage;
