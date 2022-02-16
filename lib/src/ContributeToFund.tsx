import React from 'react';
import {Text} from '@chakra-ui/react';

const ContributeToFund: React.FC<{fundAddress: string}> = ({fundAddress}) => {
  return (
    <>
      <Text fontSize="3xl">
        Fund Address
      </Text>
      <Text variant="cardDescription" fontSize="xl">
        {fundAddress}
      </Text>
    </>
  );
};

export default ContributeToFund;
