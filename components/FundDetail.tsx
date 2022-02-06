import React, { FC } from 'react';
import { Box, Flex, HStack, Text, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { fromTerraAmount } from '@arthuryeti/terra';

import { truncate } from 'libs/text';
import { useContracts } from 'modules/common';

import Card from 'components/Card';
import CloseModalIcon from 'components/icons/CloseModalIcon';
import SuccessIcon from 'components/icons/SuccessIcon';
import TokenCard from 'components/common/TokenCard';
import { CrowdFundConfigResponse, CrowdFundStateResponse } from 'modules/crowdfund';
import FundAmountCard from 'components/common/FundAmountCard';

type Props = {
  detail: CrowdFundConfigResponse;
  claimable: CrowdFundStateResponse;
  address: string;
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const FundDetail: FC<Props> = ({ detail, claimable, address, onCloseClick }) => {
  const { astroToken } = useContracts();
  const truncatedAddress = truncate(address);

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
          beneficiary <a href={'https://finder.extraterrestrial.money/testnet/address/' + detail.beneficiary} target="_beneficiary">{detail.beneficiary}</a>
        </Text>
        <pre>
          {detail.pool_description}
        </pre>
        <Text variant="light" mb="2">
         Funds in pool
        </Text>

        <FundAmountCard
          token= {detail.dp_token}
          money_market={detail.money_market}
          claimable={claimable}
          description={truncatedAddress}
        />

        <Text>Fund .. Redeem</Text>
      </Card>
    </MotionBox>
  );
};

export default FundDetail;
