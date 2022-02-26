import {Box, Button, Flex, Grid, GridItem, Text} from '@chakra-ui/react';
import Card from 'components/Card';
import PageLoading from 'components/common/PageLoading';
import {truncate} from 'libs/text';
import {FundListResponse} from 'modules/crowdfund/hooks/useQueryFund';
import NextLink from 'next/link';
import React from 'react';

const FundList: React.FC<{
  data: FundListResponse;
  isLoading: boolean;
  address: string | undefined;
}> = ({data, isLoading, address}) => {
  if (isLoading) {
    return <PageLoading />;
  }

  if (data?.funds?.length === 0) {
    return <EmptyList />;
  }

  return (
    <Box>
      <Flex flex="1" flexWrap={'wrap'}>
        {data?.funds?.map((fund, index) => {
          return (
            <div style={{width: '50%', maxWidth: '50%'}} key={index}>
              <div style={{padding: 8}}>
                <Card p={['12', null, null, '12']} w={'100%'}>
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem w="100%" h="10">
                      <Text variant="cardHeader" fontSize="xl" fontWeight={'bold'}>
                        {fund.pool_name}
                      </Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text variant="light">Contract</Text>
                      <Text variant="content">{truncate(fund.contract)}</Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text variant="light">Beneficiary</Text>
                      <Text variant="content">{truncate(fund.beneficiary)}</Text>
                    </GridItem>
                  </Grid>
                  <Flex justify="flex-end" mt="50px">
                    <NextLink href={`fund/${fund.contract}`} passHref>
                      <Button as="a" variant="primary" width="256px">
                        Fund Details
                      </Button>
                    </NextLink>
                    {fund.beneficiary == address && (
                      <NextLink href={`admin/${fund.contract}`} passHref>
                        <Button as="a" variant="primary" width="256px">
                          Setup NFT
                        </Button>
                      </NextLink>
                    )}
                  </Flex>
                </Card>
              </div>
            </div>
          );
        })}
      </Flex>
    </Box>
  );
};

const EmptyList: React.FC = () => {
  return (
    <Box>
      <Flex flex="1" justifyContent={'center'}>
        <Text variant="cardHeader" fontSize="5xl">
          No Funds Found!
        </Text>
      </Flex>
    </Box>
  );
};

export default FundList;
