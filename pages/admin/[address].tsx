import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import Disclaimer from "components/Disclaimer";
import FundAdmin from "components/pages/FundAdmin";

const FundAdminPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fund Admin</title>
      </Head>
      <Flex>
        <FundAdmin />
      </Flex>
      <Disclaimer />
    </>
  );
};

export default FundAdminPage;
