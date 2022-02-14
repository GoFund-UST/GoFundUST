import {fromTerraAmount, useAddress} from '@arthuryeti/terra';
import {Flex, Text} from '@chakra-ui/react';
import {CrowdFundConfigResponse, CrowdFundStateResponse} from 'modules/crowdfund';
import {CrowdFundDepositPoolBalanceResponse} from 'modules/crowdfund/hooks/useCrowdDepositPool';
import React, {FC} from 'react';

const TWO_DIGIT_PRECISION_FORMAT = '0,0.00a';
const FOUR_DIGIT_PRECISION_FORMAT = '0,0.0000a';
type Props = {
  detail: CrowdFundConfigResponse;
  claimable: CrowdFundStateResponse;
  account_details: CrowdFundDepositPoolBalanceResponse;
};

const getDescripton = (detail: CrowdFundConfigResponse) => {
  if (!detail.pool_description) {
    return <></>;
  }
  return (
    <>
      {' '}
      <Text variant="content" fontSize="3xl">
        Description
      </Text>
      <Text variant="cardDescription" fontSize="xl">
        {detail.pool_description}
      </Text>
    </>
  );
};

const FundAmountCard: FC<Props> = ({detail, claimable, account_details}) => {
  const address = useAddress();
  const amount = fromTerraAmount(claimable.pool_value, TWO_DIGIT_PRECISION_FORMAT);
  const earnedAmount = fromTerraAmount(claimable.earned, FOUR_DIGIT_PRECISION_FORMAT);
  const claimableAmount = fromTerraAmount(claimable.claimable, FOUR_DIGIT_PRECISION_FORMAT);
  const accountAmount = fromTerraAmount(account_details.balance, TWO_DIGIT_PRECISION_FORMAT);
  const isBeneficiary = detail?.beneficiary === address;
  const isFeeCollector = detail?.fee_collector === address;

  return (
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
        {isBeneficiary ? <>{` (It's you!)`}</> : <></>}
      </Text>
      <Text variant="cardDescription" fontSize="xl">
        {detail.beneficiary}
      </Text>
      <Text mt="4" variant="content" fontSize="3xl">
        Pool Details
      </Text>
      <Text variant="cardDescription" fontSize="xl">
        <span>Total Amount </span>
        <span>${amount} </span>
        <span>/ </span>
        <span>Generated </span>
        <span>${earnedAmount} </span>
        <span>/ </span>
        <span>Your Amount </span>
        <span>${accountAmount} </span>
      </Text>
      {(isBeneficiary || isFeeCollector) && (
        <Text variant="cardDescription" fontSize="xl">
          <span>Claimable </span>
          <span>${claimableAmount}</span>
        </Text>
      )}
    </Flex>
  );
};

export default FundAmountCard;
