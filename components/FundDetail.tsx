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
import FundAmountCard from 'components/common/FundAmountCard';
import PageLoading from 'components/common/PageLoading';
import {motion} from 'framer-motion';
import {CrowdFundConfigResponse, CrowdFundStateResponse, useCrowdFund} from 'modules/crowdfund';
import {
  useCrowdFundDepositPool,
  useCrowdFundDepositPoolBalance,
} from 'modules/crowdfund/hooks/useCrowdDepositPool';
import {usePostContributeFund} from 'modules/crowdfund/hooks/usePostContributeFund';
import {usePostRedeemFund} from 'modules/crowdfund/hooks/usePostRedeemFund';
import {useWithdrawEarnings} from 'modules/crowdfund/hooks/useWithdrawEarnings';
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
  const connectedWallet = useConnectedWallet();
  const depositPoolDetails = useCrowdFundDepositPool(detail.dp_token);
  const depositPoolBalance = useCrowdFundDepositPoolBalance(detail.dp_token, userAddress);
  const {data: fundData} = useCrowdFund(address);
  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);
  const form = useForm<{amount: number}>({
    mode: 'onChange',
    defaultValues: {
      amount: 0,
    },
  });

  const {submit: submitContribution} = usePostContributeFund({
    fundAmount: form.watch('amount'),
    contractAddress: address,
  });

  const {submit: submitRedeem} = usePostRedeemFund({
    redeemAmount: form.watch('amount'),
    contractAddress: detail.dp_token,
    bodyContract: address,
  });

  const {submit: submitWithdraw} = useWithdrawEarnings({
    contractAddress: address,
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

  const withdrawEarnings = useCallback(async () => {
    setTxError(null);
    setTxResult(null);

    try {
      const res = await submitWithdraw();
      setTxResult(res);
    } catch (error) {
      setTxError(error.toString);
    }
  }, [submitWithdraw]);

  const isAdmin = useCallback(() => {
    return fundData.beneficiary === userAddress;
  }, [fundData.beneficiary, userAddress]);

  const getAdminButtons = () => {
    return (
      <>
        {claimable.claimable > 0 && (
          <Button
            mt={4}
            variant="sencadry"
            width="256px"
            onClick={e => {
              e.preventDefault();
              withdrawEarnings();
            }}>
            Withdraw earnings
          </Button>
        )}
      </>
    );
  };

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
            fundProject();
          }}>
          Fund
        </Button>
        {depositPoolBalance.data.balance > 0 && (
          <Button
            variant="primary"
            width="256px"
            m="20px"
            disabled={!form?.formState?.isValid}
            onClick={e => {
              e.preventDefault();
              redeem();
            }}>
            Redeem
          </Button>
        )}
      </>
    );
  };

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
          <FundAmountCard
            detail={detail}
            claimable={claimable}
            account_details={depositPoolBalance.data}
          />
          <Divider mt="8" mb="8" />
          <form>
            <FormControl isInvalid={!!form.formState.errors.amount}>
              <FormLabel htmlFor="amount">Amount ($UST)</FormLabel>
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
            <Flex justifyContent="space-evenly">{getUserButtons()}</Flex>
            <Flex justifyContent="space-evenly">{isAdmin() && getAdminButtons()}</Flex>
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
  }
};

export default FundDetail;
