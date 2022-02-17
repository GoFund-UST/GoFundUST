import {Text} from '@chakra-ui/react';
import React from 'react';
import Card from '../../components/Card';
import {useCrowdFund} from '../../modules/crowdfund';
import LibWrapper from './util/LibWrapper';
import {useWallet} from '@terra-money/wallet-provider';
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
  console.log(wallet?.network?.name);

  return (
    <>
      <Card>
        <Text fontSize="3xl">Fund Address</Text>
        <Text variant="cardDescription" fontSize="xl">
          {fundAddress}
        </Text>
        <Text variant="content" fontSize="3xl">
          Pool Name
        </Text>
        <Text variant="cardDescription" fontSize="xl">
          {data?.pool_name}
        </Text>
      </Card>
    </>
  );
};

export default ContributeToFund;
