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

const LockdropIntroduction = () => {
  return (
    <Card>
      <Stack
        spacing={['16', null, '5%']}
        direction={['column', null, 'row']}
        align="center"
        justify="space-between"
      >
        <VStack spacing="6" align="flex-start" width={['100%', null, '45%']}>
          <Heading as="h1" size="2xl" my="2" mr="6">
         GoFund US(T)
          </Heading>
          <Text fontSize="14px">
        Want to help someone out ? {' '} GoFund US(T) allows anyone to create a simple fun that will help them achieve their goals.
            Unlike typical crowd funding platforms, we are capital preserving. This means you can deposit your funds here, and the earnings they get
            (currently via Anchor Earn) will be given to the person who set up the fund.
            <Link
              color="#83B3FD"
              href="https://example.com/docs/go/here"
              isExternal={true}
            >
              Learn More
            </Link>{' '}
            to learn more about GoFund Us(T).
          </Text>
          <NextLink href="/create-a-fund" passHref={true}>
            <Button as="a" variant="primary" width="256px">
            TBD .. create a fund
            </Button>
          </NextLink>
        </VStack>
        <AspectRatio
          position="relative"
          width={['100%', null, '50%']}
          ratio={527 / 357}
        >
          <Box position="relative" width="100%" height="100%">
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              zIndex="1"
            >
              <Image
                src="/placeholder-image-300x225.png"
                srcSet="placeholder@2x.png 2x"
                alt=""
                className="intro-1"
                width="100%"
              />
            </Box>
            <Flex
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              zIndex="2"
              align="center"
              justify="center"
            >
              <Image
                src="/placeholder-image-300x225.png"
                srcSet="placeholder@2x.png 2x"
                alt=""
                className="intro-2"
                width="100%"
              />
            </Flex>
            <Flex
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              zIndex="3"
              align="center"
              justify="center"
            >
              <Image
                  src="/placeholder-image-300x225.png"
                  srcSet="/placeholder-image-300x225.png"
                alt=""
                className="intro-3"
                width="100%"
              />
            </Flex>
          </Box>
        </AspectRatio>
      </Stack>
    </Card>
  );
};

export default LockdropIntroduction;
