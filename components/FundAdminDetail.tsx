import React, { FC, useCallback, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Button,
  Heading,
  Link,
  VStack,
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
import { TxResult, useConnectedWallet } from "@terra-money/wallet-provider";
import {  MsgExecuteContract } from "@terra-money/terra.js";

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
  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);
  const connectedWallet = useConnectedWallet();

  const withdrawEarnings = useCallback(() => {
    setTxError(null);
    setTxResult(null);

    let msg = new MsgExecuteContract(connectedWallet.walletAddress, address, {
      earn: {},
    });

    // eslint-disable-next-line no-console
    console.log(msg.toJSON());
    return connectedWallet
      .post({ memo: "GoFund US(T)", msgs: [msg] })
      .then((txResultReturned) => {
        // eslint-disable-next-line no-console
        console.log(txResultReturned);
        setTxResult(txResultReturned);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log("ERROR", error);
        setTxError(error.toString);
      });
  },                                   [connectedWallet, address]);

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
          <VStack>
            <HStack>
              {claimable.claimable > 0 && (
                <Button
                  variant="primary"
                  width="256px"
                  onClick={(e) => {
                    e.preventDefault();
                    withdrawEarnings();
                  }}
                >
                  Withdraw earnings
                </Button>
              )}
            </HStack>
            {connectedWallet && txResult && (
              <Text>
                <Link
                  href={`https://finder.terra.money/${connectedWallet.network.chainID}/tx/${txResult.result.txhash}`}
                  target="_blank"
                  rel="noreferrer"
                  external={true}
                >
                  Open Tx Result in Terra Finder
                </Link>
              </Text>
            )}
            {txError && <Text color="red.500">{txError}</Text>}
          </VStack>
        </Card>
      </MotionBox>
    );
  }
};

export default FundAdminDetail;
