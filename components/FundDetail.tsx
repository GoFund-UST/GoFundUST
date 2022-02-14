import {useAddress} from '@arthuryeti/terra';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import {TxResult, useConnectedWallet} from '@terra-money/wallet-provider';
import Card from 'components/Card';
import FundAmountCard from 'components/common/FundAmountCard';
import PageLoading from 'components/common/PageLoading';
import CloseModalIcon from 'components/icons/CloseModalIcon';
import SuccessIcon from 'components/icons/SuccessIcon';
import {motion} from 'framer-motion';
import {truncate} from 'libs/text';
import {CrowdFundConfigResponse, CrowdFundStateResponse} from 'modules/crowdfund';
import {
  useCrowdFundDepositPool,
  useCrowdFundDepositPoolBalance,
} from 'modules/crowdfund/hooks/useCrowdDepositPool';
import {usePostContributeFund} from 'modules/crowdfund/hooks/usePostContributeFund';
import {usePostRedeemFund} from 'modules/crowdfund/hooks/usePostRedeemFund';
import React, {FC, useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';

type Props = {
  detail: CrowdFundConfigResponse;
  claimable: CrowdFundStateResponse;
  address: string;
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const FundDetail: FC<Props> = ({detail, claimable, address, onCloseClick}) => {
  const userAddress = useAddress();
  const depositPoolDetails = useCrowdFundDepositPool(detail.dp_token);
  const depositPoolBalance = useCrowdFundDepositPoolBalance(detail.dp_token, userAddress);
  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);
  const form = useForm<{amount: number}>({
    mode: 'onChange',
    defaultValues: {
      amount: 0,
    },
  });

  const connectedWallet = useConnectedWallet();

  const {submit: submitContribution} = usePostContributeFund({
    fundAmount: form.watch('amount'),
    contractAddress: address,
  });

  const {submit: submitRedeem} = usePostRedeemFund({
    redeemAmount: form.watch('amount'),
    contractAddress: detail.dp_token,
    bodyContract: address,
  });

  const fundProject = useCallback(async () => {
    setTxError(null);
    setTxResult(null);

    try {
      const res = await submitContribution();
      setTxResult(res);
    } catch (error) {
      setTxError(error.toString);
    }
  }, [submitContribution]);

  const redeem = useCallback(async () => {
    setTxError(null);
    setTxResult(null);

    try {
      const res = await submitRedeem();
      setTxResult(res);
    } catch (error) {
      setTxError(error.toString);
    }
  }, [submitRedeem]);

  if (depositPoolDetails.isLoading || depositPoolBalance.isLoading) {
    return <PageLoading />;
  } else {
    return (
      <MotionBox
        initial={{opacity: 0, scale: 0.8}}
        animate={{opacity: 1, scale: 1}}
        w="800px"
        m="0 auto"
        mt="10">
        <Card>
          <Flex justify="space-between" align="center" mb="4">
            <HStack>
              <SuccessIcon />
              <Text fontSize="lg" color="green.500">
                {detail.pool_title}
              </Text>
            </HStack>
            <IconButton
              aria-label="Close"
              icon={<CloseModalIcon w="1.5rem" h="1.5rem" />}
              variant="icon"
              onClick={onCloseClick}
            />
          </Flex>
          <Text fontSize="light" color="green.500">
            beneficiary{' '}
            <a
              href={'https://finder.extraterrestrial.money/testnet/address/' + detail.beneficiary}
              target="_beneficiary">
              {detail.beneficiary}
            </a>
          </Text>
          <pre>{detail.pool_description}</pre>

          <FundAmountCard
            token={detail.dp_token}
            money_market={detail.money_market}
            claimable={claimable}
            description={truncate(address)}
            token_details={depositPoolDetails.data}
            account_details={depositPoolBalance.data}
          />
          <VStack>
            <HStack>
              <VStack>
                <form color="black">
                  <label>$UST</label>
                  <FormControl mt={4} isInvalid={!!form.formState.errors.amount}>
                    <FormLabel htmlFor="amount">Fund name</FormLabel>
                    <Input
                      type="number"
                      id="amount"
                      {...form.register('amount', {
                        required: 'This is required',
                        min: {value: 0.1, message: 'Min value is 0.1'},
                        valueAsNumber: true,
                      })}
                    />
                    <FormErrorMessage>{form.formState.errors?.amount?.message}</FormErrorMessage>
                  </FormControl>
                  <Button
                    variant="primary"
                    width="256px"
                    disabled={!form?.formState?.isValid}
                    onClick={e => {
                      e.preventDefault();
                      fundProject();
                    }}>
                    Fund
                  </Button>
                  {depositPoolBalance.data.balance > 0 && (
                    <Button
                      variant="primary"
                      width="256px"
                      disabled={!form?.formState?.isValid}
                      onClick={e => {
                        e.preventDefault();
                        redeem();
                      }}>
                      Redeem
                    </Button>
                  )}
                </form>
              </VStack>
            </HStack>
            {connectedWallet && txResult && (
              <Text>
                <Link
                  href={`https://finder.terra.money/${connectedWallet.network.chainID}/tx/${txResult.result.txhash}`}
                  target="_blank"
                  rel="noreferrer"
                  external="true">
                  Open Tx Result in Terra Finder
                </Link>
              </Text>
            )}
            {txError && <Text color="red.500">{txError}</Text>}
          </VStack>
        </Card>
      </MotionBox>
    );
  }
};

export default FundDetail;
