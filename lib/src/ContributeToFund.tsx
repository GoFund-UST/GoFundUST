import {Text, ThemeProvider} from '@chakra-ui/react';
import React from 'react';
import theme from '../../theme';

const ContributeToFund: React.FC<{fundAddress: string}> = ({fundAddress}) => {
  const id = 'go-fund-ust-contribute-to-fund';
  return (
    <div id={id}>
      <ThemeProvider theme={theme} cssVarsRoot={`#${id}`}>
        <>
          <Text fontSize="3xl">Fund Address</Text>
          <Text variant="cardDescription" fontSize="xl">
            {fundAddress}
          </Text>
        </>
      </ThemeProvider>
    </div>
  );
};

export default ContributeToFund;
