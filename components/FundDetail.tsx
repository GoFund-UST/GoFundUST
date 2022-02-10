import React, {FC, useCallback, useState} from 'react';
import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Button,
  Heading,
  VStack,
  Input,
  Link,
} from '@chakra-ui/react';
import {motion} from 'framer-motion';
import {useAddress} from '@arthuryeti/terra';

import {truncate} from 'libs/text';

import Card from 'components/Card';
import CloseModalIcon from 'components/icons/CloseModalIcon';
import SuccessIcon from 'components/icons/SuccessIcon';
import {CrowdFundConfigResponse, CrowdFundStateResponse} from 'modules/crowdfund';
import FundAmountCard from 'components/common/FundAmountCard';
import {
  useCrowdFundDepositPool,
  useCrowdFundDepositPoolBalance,
} from 'modules/crowdfund/hooks/useCrowdDepositPool';
import * as animationData from 'libs/animations/66643-waitwhite.json';
import Lottie from 'react-lottie';
import {Coin, MsgExecuteContract} from '@terra-money/terra.js';
import {TxResult, useConnectedWallet} from '@terra-money/wallet-provider';

type Props = {
  detail: CrowdFundConfigResponse;
  claimable: CrowdFundStateResponse;
  address: string;
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const FundDetail: FC<Props> = ({detail, claimable, address, onCloseClick}) => {
  const truncatedAddress = truncate(address);
  const userAddress = useAddress();
  const depositPoolDetails = useCrowdFundDepositPool(detail.dp_token);
  const depositPoolBalance = useCrowdFundDepositPoolBalance(detail.dp_token, userAddress);
  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);

  const connectedWallet = useConnectedWallet();

  const fundProject = useCallback(() => {
    setTxError(null);
    setTxResult(null);
    let fundAmount = document.getElementById('fundamount') as HTMLInputElement;
    let fundAmountStr = fundAmount?.value;
    if (!fundAmountStr) {
      alert('you need to enter an amount');
      return;
    }
    let fundNum = parseFloat(fundAmountStr);
    if (fundNum <= 0.0) {
      alert('you need a numeric above zero.');
    }
    let coin = new Coin('uusd', fundNum * 1_000_000);

    let msg = new MsgExecuteContract(
      userAddress,
      address,
      {
        deposit: {},
      },
      [coin]
    );

    // eslint-disable-next-line no-console
    console.log(msg.toJSON());
    return connectedWallet
      .post({memo: 'GoFund US(T)', msgs: [msg]})
      .then(txResultReturned => {
        // eslint-disable-next-line no-console
        console.log(txResultReturned);
        setTxResult(txResultReturned);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('ERROR', error);
        setTxError(error.toString);
      });
  }, [connectedWallet, userAddress, address]);

  const redeem = useCallback(() => {
    setTxError(null);
    setTxResult(null);
    let fundAmount = document.getElementById('fundamount') as HTMLInputElement;
    let fundAmountStr = fundAmount?.value;
    if (!fundAmountStr) {
      alert('you need to enter an amount');
      return;
    }
    let fundNum = parseFloat(fundAmountStr);
    if (fundNum <= 0.0) {
      alert('you need a numeric above zero.');
    }
    const amount = fundNum * 1_000_000;

    let msg = new MsgExecuteContract(userAddress, detail.dp_token, {
      send: {
        msg: 'eyJyZWRlZW0iOnt9fQ==',
        amount: amount.toString(10),
        contract: address,
      },
    });

    // eslint-disable-next-line no-console
    console.log(msg.toJSON());
    return connectedWallet
      .post({memo: 'GoFund US(T)', msgs: [msg]})
      .then(txResultReturned => {
        // eslint-disable-next-line no-console
        console.log(txResultReturned);
        setTxResult(txResultReturned);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('ERROR', error);
        setTxError(error.toString);
      });
  }, [connectedWallet, userAddress, address, detail.dp_token]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (depositPoolDetails.isLoading || depositPoolBalance.isLoading) {
    return (
      <Box m="0 auto" pt="12">
        <Flex direction="column" gridGap="8" color="white">
          <Lottie
            options={defaultOptions}
            height={400}
            width={400}
            isStopped={false}
            isPaused={false}
          />

          <Card>
            <Heading fontSize="xl" fontWeight="500" textAlign="center">
              Loading...
            </Heading>
          </Card>
        </Flex>
      </Box>
    );
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
            description={truncatedAddress}
            token_details={depositPoolDetails.data}
            account_details={depositPoolBalance.data}
          />
          <VStack>
            <HStack>
              <VStack>
                <form color="black">
                  <label>$UST</label>
                  <Input type="text" id="fundamount" name="fundamount" defaultValue={0} />
                  <Button
                    variant="primary"
                    width="256px"
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
                  external={true}>
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
