import React, { FC } from "react";
import { Box, Flex, Text, HStack, VStack } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { useTokenInfo } from "modules/common";

import { CrowdFundStateResponse } from "modules/crowdfund";
import {
  CrowdFundDepositPoolBalanceResponse,
  CrowdFundDepositPoolTokenInfoResponse,
} from "modules/crowdfund/hooks/useCrowdDepositPool";

type Props = {
  token: string;
  money_market: string;
  claimable: CrowdFundStateResponse;
  description?: string;
  token_details: CrowdFundDepositPoolTokenInfoResponse;
  account_details: CrowdFundDepositPoolBalanceResponse;
};
const FundAmountCard: FC<Props> = ({
  token,
  description,
  claimable,
  token_details,
  account_details,
}) => {
  // const { getIcon, getSymbol } = useTokenInfo();
  const tokenName = token_details.name;
  const tokenSymbol = token_details.symbol;
  const _fraction = token_details.decimals;

  const amount = fromTerraAmount(claimable.pool_value, "0,0.00a");
  const earnedAmount = fromTerraAmount(claimable.earned, "0,0.0000a");
  const accountAmount = fromTerraAmount(account_details.balance, "0,0.00a");
  // TODO get query balance.
  // TODO get exchange rate from money market
  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      borderColor="white.200"
      bg="white.100"
      px="4"
      py="3"
      lineHeight="1.3"
    >
      <Flex justify="space-between" align="center">
        <Box>
          <VStack>
            <HStack spacing="4">
              <Box>{tokenSymbol}</Box>
              <Box>
                <Text fontSize="2xl" color="white">
                  {tokenName}
                </Text>
                {description && <Text variant="light">{description}</Text>}
              </Box>
            </HStack>
            <Box fontWeight="500" textAlign="left">
              <Text fontSize="xl" color="white">
                Amount in Pool {amount}
              </Text>
              <Text fontSize="xl" color="white">
                Total UST generated {earnedAmount}
              </Text>
              <Text fontSize="xl" color="white">
                Your amount {accountAmount} UST
              </Text>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default FundAmountCard;
