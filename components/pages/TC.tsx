import React from 'react';
import {Box} from '@chakra-ui/react';

import TCContent from 'components/TCContent';

const TC = () => {
  return (
    <Box bg="brand.darkBlue">
      <Box position="relative" zIndex="10">
        <TCContent />
      </Box>
    </Box>
  );
};

export default TC;
