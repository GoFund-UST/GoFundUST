import {Text} from '@chakra-ui/react';
import React from 'react';
import Card from '../../components/Card';
import {useCrowdFund} from '../../modules/crowdfund';
import LibWrapper from './util/LibWrapper';
import {Wallet} from '@terra-money/terra.js';

const ContributeToFund: React.FC<{fundAddress: string; wallet: Wallet}> = ({
  fundAddress,
  wallet,
}) => {
  return (
    <LibWrapper>
      <Component fundAddress={fundAddress} wallet={wallet} />
    </LibWrapper>
  );
};

const Component: React.FC<{fundAddress: string; wallet: Wallet}> = ({fundAddress, wallet}) => {
  const {isLoading, data} = useCrowdFund(fundAddress);

  return (
    <>
      <div
        style={{
          height: '100%',
          width: '100%',
          overflowX: 'hidden',
          position: 'relative',
          backgroundColor: '#000D37',
          borderRadius: "1rem"
        }}>
        <Card>
          <Text variant="content" fontSize="3xl">
            Pool Name
          </Text>
          <Text variant="cardDescription" fontSize="xl">
            {data?.pool_name}
          </Text>
        </Card>
      </div>
    </>
  );
};

export default ContributeToFund;
