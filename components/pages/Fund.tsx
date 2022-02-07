import React, { FC } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Lottie from "react-lottie";

import * as animationData from "libs/animations/66643-waitwhite.json";

import Card from "components/Card";
import FundFailed from "components/FundFailed";
import { useCrowdFund, useCrowdFundState } from "modules/crowdfund";
import FundDetail from "components/FundDetail";

const Fund: FC = () => {
  const router = useRouter();
  const address = router.query.address as string;
  const { isLoading, data } = useCrowdFund(address);
  const cwState = useCrowdFundState(address);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleClose = () => {
    router.push("/");
  };

  const renderFund = () => {
    if (!isLoading && data == null) {
      return <FundFailed onCloseClick={handleClose} />;
    }
    if (!cwState.isLoading && cwState.data == null) {
      return <FundFailed onCloseClick={handleClose} />;
    }

    return (
      <FundDetail
        detail={data}
        claimable={cwState.data}
        address={address}
        onCloseClick={handleClose}
      />
    );
  };

  if (isLoading || cwState.isLoading) {
    return (
      <Box m="0 auto" pt="12">
        <Flex direction="column" gridGap="8" color="white">
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            isStopped={false}
            isPaused={false}
          />

          <Card>
            <Heading fontSize="xl" fontWeight="500" textAlign="center">
              Loading...
            </Heading>
          </Card>
        </Flex>
      </Box>
    );
  }

  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">{renderFund()}</Box>
      </Flex>
    </Box>
  );
};

export default Fund;
