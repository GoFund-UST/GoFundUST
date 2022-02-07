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

import { truncate } from "libs/text";

import Card from "components/Card";
import CloseModalIcon from "components/icons/CloseModalIcon";
import {
  CrowdFundConfigResponse,
  CrowdFundStateResponse,
} from "modules/crowdfund";
import { useCrowdFundDepositPool } from "modules/crowdfund/hooks/useCrowdDepositPool";
import FundAdminAmountCard from "components/common/FundAdminAmountCard";
import Lottie from "react-lottie";
import * as animationData from "libs/animations/66643-waitwhite.json";
import USTIcon from "components/icons/USTIcon";

type Props = {
  detail: CrowdFundConfigResponse;
  claimable: CrowdFundStateResponse;
  address: string;
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const FundAdminDetail: FC<Props> = ({
  detail,
  claimable,
  address,
  onCloseClick,
}) => {
  const truncatedAddress = truncate(address);
  const depositPoolDetails = useCrowdFundDepositPool(detail.dp_token);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (depositPoolDetails.isLoading) {
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
              <USTIcon />
              <Text fontSize="lg" color="yellow.500">
                {detail.pool_oneliner} (ADMIN)
              </Text>
            </HStack>
            <IconButton
              aria-label="Close"
              icon={<CloseModalIcon w="1.5rem" h="1.5rem" />}
              variant="icon"
              onClick={onCloseClick}
            />
          </Flex>
          <Text fontSize="light" color="yellow.500">
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

          <FundAdminAmountCard
            token={detail.dp_token}
            money_market={detail.money_market}
            claimable={claimable}
            description={truncatedAddress}
            token_details={depositPoolDetails.data}
          />
          <HStack>
            {claimable.claimable > 0 && (
              <Button variant="primary" width="256px">
                Withdraw earnings
              </Button>
            )}
          </HStack>
        </Card>
      </MotionBox>
    );
  }
};

export default FundAdminDetail;
