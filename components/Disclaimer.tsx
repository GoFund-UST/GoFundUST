import {Box, Link, Text} from '@chakra-ui/react';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import React from 'react';

const Disclaimer = () => {
  return (
    <Box>
      <CardHeader label="Disclaimer" />

      <Card p={['6', null, null, '12']}>
        <Text>
          This project is not affiliated with any other protocol or service. The smart contracts
          used in this project are under heavy development, and have not been audited. The authors
          of this project collect fees from the use of this website. If you are a charity, feel free
          to contact the authors, to discuss fee-free alternatives
        </Text>
        <Text>
          <Link href="/disclaimer">legal disclaimer (draft)</Link>
        </Text>
      </Card>
    </Box>
  );
};

export default Disclaimer;
