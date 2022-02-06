import React, { FC } from 'react';
import { Box, Flex, Text, HStack, Image } from '@chakra-ui/react';
import { fromTerraAmount } from '@arthuryeti/terra';

import { useTokenInfo } from 'modules/common';
import numeral from 'numeral';
import { CrowdFundStateResponse } from 'modules/crowdfund';

type Props = {
    token:  string;
    money_market: string;
    claimable: CrowdFundStateResponse;
    description?: string;
};

const FundAmountCard: FC<Props> = ({token, description, claimable}) => {
    const {getIcon, getSymbol} = useTokenInfo();
    const amount = numeral(claimable.pool_value).format('0,0.00a');
    const claimableAmount = numeral(claimable.claimable).format('0,0.00a');
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
                    <HStack spacing="4">
                        <Box>
                            <Image
                                src={getIcon(token)}
                                h={'10'}
                                alt="Logo"
                            />
                        </Box>
                        <Box>
                            <Text fontSize="2xl" color="white">
                                {getSymbol(token)}
                            </Text>
                            {description && <Text variant="light">{description}</Text>}
                        </Box>
                    </HStack>
                </Box>
                <Box fontWeight="500" textAlign="right">
                    <Text fontSize="2xl" color="white">
                       Amount in Pool {amount}
                    </Text>
                    <Text fontSize="2xl" color="white">
                       Amount to be claimed {claimableAmount}
                    </Text>
                    <Text fontSize="2xl" color="white">
                       Your amount ~###,###.## UST
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
};

export default FundAmountCard;
