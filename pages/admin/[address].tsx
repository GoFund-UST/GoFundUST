import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import Fund from "components/pages/Fund";
import Disclaimer from "components/Disclaimer";

const FundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fund Admin</title>
      </Head>
      <Flex>
        <Fund  />

      </Flex>
        <Disclaimer/>
    </>
  );
};

export default FundPage;
