import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  AspectRatio,
  Image,
  Stack,
  VStack,
  Button,
} from '@chakra-ui/react';

import NextLink from 'next/link';

import Card from 'components/Card';

const GoFundIntroduction = () => {
  return (
    <Card>
      <Stack
        spacing={['16', null, '5%']}
        direction={['column', null, 'row']}
        align="center"
        justify="space-between">
        <VStack spacing="6" align="flex-start" width={['100%', null, '45%']}>
          <Heading as="h1" size="2xl" my="2" mr="6">
            GoFund US(T)
          </Heading>
          <Text fontSize="14px">
            Want to help someone out ? GoFund US(T) allows anyone to create a simple fund that will
            help them achieve their goals. Unlike typical crowd funding platforms, we are capital
            preserving. This means you can deposit your funds here, and the earnings they get
            (currently via Anchor Earn) will be given to the person who set up the fund.{' '}
            <Link color="#83B3FD" href="https://example.com/docs/go/here" isExternal={true}>
              Learn More
            </Link>{' '}
            to learn more about GoFund US(T).
          </Text>
          <NextLink href="/new" passHref={true}>
            <Button as="a" variant="primary" width="256px">
              Create Fund
            </Button>
          </NextLink>
          <Text>
            The core principle of this is that it is 100% decentralized. The code is open source,
            once this code has been audited we plan on throwing away the key, so these will be
            un-stoppable.
          </Text>
        </VStack>
        <AspectRatio position="relative" width={'md'} ratio={527 / 357}>
          <Box position="relative" width="100%" height="100%">
            <Box position="absolute" top="0" left="0" width="100%" height="100%" zIndex="1">
              <Flex justify="center" alignItems="center" width="100%" height="100%">
                <Image src="/favicon.png" alt="" height="100%" />
              </Flex>
            </Box>
          </Box>
        </AspectRatio>
      </Stack>
    </Card>
  );
};

export default GoFundIntroduction;
