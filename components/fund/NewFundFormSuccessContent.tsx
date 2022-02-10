import {Flex, Text} from '@chakra-ui/react';
import {useConnectedWallet} from '@terra-money/wallet-provider';
import Card from 'components/Card';
import useFinder from 'hooks/useFinder';
import {truncate} from 'libs/text';
import {FC} from 'react';

type Props = {txHash: string; instantiateContractAddress: string};

const NewFundFormSuccessContent: FC<Props> = ({txHash, instantiateContractAddress}) => {
  const connectedWallet = useConnectedWallet();
  const finder = useFinder();

  return (
    <div>
      <Text variant="content" fontSize="md">You&apos;ve created the fund!</Text>
      <br />
      <div>
        <Text variant="light" fontSize="md">
          Fund address:
        </Text>
        <Text variant="cardDescription" fontWeight="bold">
          <a target="_blank" href={`fund/${instantiateContractAddress}`} rel="noreferrer">
            {instantiateContractAddress}
          </a>
        </Text>
      </div>
      <br />
      <Flex justify="space-between" align="center" mt="12" w="full">
        <Text variant="light" fontSize="md">
          Tx Hash
        </Text>
        <a target="_blank" href={finder(txHash, 'tx')} rel="noreferrer">
          {truncate(txHash)}
        </a>
      </Flex>
    </div>
  );
};

export default NewFundFormSuccessContent;
