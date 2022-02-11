import {Box, Button, Flex, Grid, GridItem, Heading, Text} from '@chakra-ui/react';
import Card from 'components/Card';
import {truncate} from 'libs/text';
import {useQueryFundList} from 'modules/crowdfund/hooks/useQueryFund';
import NextLink from 'next/link';
import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from 'libs/animations/66643-waitwhite.json';

const FundList: React.FC = () => {
  const {data, isLoading} = useQueryFundList();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (isLoading) {
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
    <Box>
      <Flex flex="1" flexWrap={'wrap'}>
        {data?.funds?.map((fund, index) => {
          return (
            <div style={{width: '50%', maxWidth: '50%'}} key={index}>
              <div style={{padding: 8}}>
                <Card p={['12', null, null, '12']} w={'100%'}>
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem w="100%" h="10">
                      <Text variant={'cardHeader'} fontSize="xl" fontWeight={'bold'}>
                        {fund.pool_name}
                      </Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text variant={'light'}>Contract</Text>
                      <Text variant={'content'}>{truncate(fund.contract)}</Text>
                    </GridItem>
                    <GridItem w="100%" h="10">
                      <Text variant={'light'}>Beneficiary</Text>
                      <Text variant={'content'}>{truncate(fund.beneficiary)}</Text>
                    </GridItem>
                  </Grid>
                  <Flex justify={'flex-end'} mt={'50px'}>
                    <NextLink href={`fund/${fund.contract}`} passHref>
                      <Button as="a" variant="primary" width="256px">
                        Fund Details
                      </Button>
                    </NextLink>
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

export default FundList;
