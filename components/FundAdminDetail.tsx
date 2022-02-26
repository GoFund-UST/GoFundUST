import {useAddress} from '@arthuryeti/terra';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import {TxResult, useConnectedWallet} from '@terra-money/wallet-provider';
import Card from 'components/Card';
import {motion} from 'framer-motion';
import {CrowdFundConfigResponse} from 'modules/crowdfund';

import React, {FC, useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {usePostAdmin} from 'modules/crowdfund/hooks/usePostAdmin';

type Props = {
  detail: CrowdFundConfigResponse;
  factory: string;
  address: string;
  onCloseClick: () => void;
};

const MotionBox = motion(Box);
const getDescripton = (detail: CrowdFundConfigResponse) => {
  if (!detail.pool_description) {
    return <></>;
  }
  return (
    <>
      <Text variant="content" fontSize="3xl">
        Description
      </Text>
      <Text variant="cardDescription" fontSize="xl">
        {detail.pool_description}
      </Text>
    </>
  );
};
const FundAdminDetail: FC<Props> = ({detail, factory, address}) => {
  const userAddress = useAddress();
  const connectedWallet = useConnectedWallet();

  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);
  const form = useForm<{imageActive: string; imagePast: string}>({
    mode: 'onChange',
    defaultValues: {
      imageActive: 'https://',
      imagePast: 'https://',
    },
  });

  const {submit: postAdmin} = usePostAdmin({
    factoryAddress: factory,
    active: form.watch('imageActive'),
    inactive: form.watch('imagePast'),
    contractAddress: address,
    name: detail.pool_title || detail.pool_name,
  });

  const setImages = useCallback(async () => {
    setTxError(null);
    setTxResult(null);

    try {
      const res = await postAdmin();
      setTxResult(res);
    } catch (error) {
      setTxError(error.toString);
    }
  }, [postAdmin]);

  const getUserButtons = () => {
    return (
      <>
        <Button
          variant="primary"
          width="256px"
          m="20px"
          disabled={!form?.formState?.isValid}
          onClick={e => {
            e.preventDefault();
            setImages();
          }}>
          Set Images
        </Button>
      </>
    );
  };

  if (detail.beneficiary != userAddress) {
    return (
      <Box>
        <Text color="red">Only the beneficiary can use this page</Text>
      </Box>
    );
  }

  if (detail.nft_collection_active || detail.nft_collection_redeemed) {
    return (
      <Box>
        <Text color="red.500">You&apos;ve already configured this.</Text>
      </Box>
    );
  }
  return (
    <MotionBox
      initial={{opacity: 0, scale: 0.8}}
      animate={{opacity: 1, scale: 1}}
      w="800px"
      m="0 auto"
      mt="10">
      <Card>
        <>
          <Flex flexDir="column">
            <Text variant="content" fontSize="3xl">
              Pool Name
            </Text>
            <Text variant="cardDescription" fontSize="xl">
              {detail.pool_name}
            </Text>
            <Text mt="4" variant="content" fontSize="3xl">
              Title
            </Text>
            <Text variant="cardDescription" fontSize="xl">
              {detail.pool_title}
            </Text>
            {getDescripton(detail)}
            <Text mt="4" variant="content" fontSize="3xl">
              Beneficiary
            </Text>
            <Text variant="cardDescription" fontSize="xl">
              {detail.beneficiary}
            </Text>
          </Flex>
        </>

        <Divider mt="8" mb="8" />
        <Text>You are responsible for hosting your own images.</Text>
        <Text>Acceptable forms are https:// or ipfs:// links</Text>
        <Text color="red.500">There is no way to modify these at the moment. So be careful.</Text>
        <Divider mt="8" mb="8" />
        <form>
          <FormControl isInvalid={!!form.formState.errors.imageActive}>
            <FormLabel htmlFor="imageActive">Image for active participants</FormLabel>
            <Input
              type="text"
              id="imageActive"
              {...form.register('imageActive', {
                required: 'This is required',
                valueAsNumber: false,
              })}
            />
            <FormErrorMessage>{form.formState.errors?.imageActive?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!form.formState.errors.imagePast}>
            <FormLabel htmlFor="imagePast">Image for past participants</FormLabel>
            <Input
              type="text"
              id="imagePast"
              {...form.register('imagePast', {
                required: 'This is required',
                valueAsNumber: false,
              })}
            />
            <FormErrorMessage>{form.formState.errors?.imagePast?.message}</FormErrorMessage>
          </FormControl>
          <Flex justifyContent="space-evenly">{getUserButtons()}</Flex>
        </form>
        {connectedWallet && txResult && (
          <Flex justifyContent="center">
            <Text>
              <Link
                href={`https://finder.terra.money/${connectedWallet.network.chainID}/tx/${txResult.result.txhash}`}
                target="_blank"
                rel="noreferrer"
                external="true">
                Open Tx Result in Terra Finder
              </Link>
            </Text>
          </Flex>
        )}
        {txError && <Text color="red.500">{txError}</Text>}
      </Card>
    </MotionBox>
  );
};

export default FundAdminDetail;
