import {Box, Flex, Heading} from '@chakra-ui/react';
import Card from 'components/Card';
import React from 'react';
import * as animationData from 'utils/animations/66643-waitwhite.json';
import Lottie from 'react-lottie';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const PageLoading: React.FC = () => {
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
};

export default PageLoading;
