import {Flex, Link, Text} from '@chakra-ui/react';
import useFinder from 'hooks/useFinder';
import {truncate} from 'libs/text';
import {FC} from 'react';

type Props = {txHash: string; instantiateContractAddress: string};

const NewFundFormSuccessContent: FC<Props> = ({txHash, instantiateContractAddress}) => {
  const finder = useFinder();

  return (
    <div>
      <Text variant="content" fontSize="md">
        You&apos;ve created the fund!
      </Text>
      <br />
      <div>
        <Text variant="light" fontSize="md">
          Fund address:
        </Text>
        <Text variant="cardDescription" fontWeight="bold">
          <Link fontWeight="bold" href={`fund/${instantiateContractAddress}`} target="_blank">
            {instantiateContractAddress}
          </Link>
        </Text>
      </div>
      <br />
      <Flex justify="space-between" align="center" mt="12" w="full">
        <Text variant="light" fontSize="md">
          Tx Hash
        </Text>
        <Link fontWeight="bold" href={finder(txHash, 'tx')} target="_blank">
          {truncate(txHash)}
        </Link>
      </Flex>
    </div>
  );
};

export default NewFundFormSuccessContent;
