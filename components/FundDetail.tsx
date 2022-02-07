import React, { FC } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Button,
  Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAddress } from "@arthuryeti/terra";

import { truncate } from "libs/text";

import Card from "components/Card";
import CloseModalIcon from "components/icons/CloseModalIcon";
import SuccessIcon from "components/icons/SuccessIcon";
import {
  CrowdFundConfigResponse,
  CrowdFundStateResponse,
} from "modules/crowdfund";
import FundAmountCard from "components/common/FundAmountCard";
import {
  useCrowdFundDepositPool,
  useCrowdFundDepositPoolBalance,
} from "modules/crowdfund/hooks/useCrowdDepositPool";
import * as animationData from "libs/animations/66643-waitwhite.json";
import Lottie from "react-lottie";

type Props = {
  detail: CrowdFundConfigResponse;
  claimable: CrowdFundStateResponse;
  address: string;
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const FundDetail: FC<Props> = ({
  detail,
  claimable,
  address,
  onCloseClick,
}) => {
  const truncatedAddress = truncate(address);
  const userAddress = useAddress();
  const depositPoolDetails = useCrowdFundDepositPool(detail.dp_token);
  const depositPoolBalance = useCrowdFundDepositPoolBalance(
    detail.dp_token,
    userAddress
  );
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (depositPoolDetails.isLoading || depositPoolBalance.isLoading) {
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
  } else {
    return (
      <MotionBox
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        w="800px"
        m="0 auto"
        mt="10"
      >
        <Card>
          <Flex justify="space-between" align="center" mb="4">
            <HStack>
              <SuccessIcon />
              <Text fontSize="lg" color="green.500">
                {detail.pool_oneliner}
              </Text>
            </HStack>
            <IconButton
              aria-label="Close"
              icon={<CloseModalIcon w="1.5rem" h="1.5rem" />}
              variant="icon"
              onClick={onCloseClick}
            />
          </Flex>
          <Text fontSize="light" color="green.500">
            beneficiary{" "}
            <a
              href={
                "https://finder.extraterrestrial.money/testnet/address/" +
                detail.beneficiary
              }
              target="_beneficiary"
            >
              {detail.beneficiary}
            </a>
          </Text>
          <pre>{detail.pool_description}</pre>

          <FundAmountCard
            token={detail.dp_token}
            money_market={detail.money_market}
            claimable={claimable}
            description={truncatedAddress}
            token_details={depositPoolDetails.data}
            account_details={depositPoolBalance.data}
          />
          <HStack>
            <Button variant="primary" width="256px">
              Fund
            </Button>
            {depositPoolBalance.data.balance > 0 && (
              <Button variant="primary" width="256px">
                Redeem
              </Button>
            )}
          </HStack>
        </Card>
      </MotionBox>
    );
  }
};

export default FundDetail;
