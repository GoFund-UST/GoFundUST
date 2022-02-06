import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { Container } from "@chakra-ui/react";

import GoFundIntro from "components/pages/GoFundIntro";
import FundFavorites from "components/FundFavorites";
import Disclaimer from "components/Disclaimer";

const LaunchPlanPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>GoFund US(T)</title>
      </Head>
      <Container my="12" px={["6", null, "12"]} maxWidth="container.xl">
        <GoFundIntro />
        <FundFavorites />
        <Disclaimer />
      </Container>
    </>
  );
};

export default LaunchPlanPage;
