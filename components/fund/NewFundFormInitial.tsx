import React, { FC } from "react";
import { Box, Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { num } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import { WithdrawState, useUserInfo, useAuctionLogic } from "modules/auction";

import Card from "components/Card";
import AmountInput from "components/AmountInput";
import AstroSlider from "components/AstroSlider";
import NewFundFormFooter from "components/fund/NewFundFormFooter";

type Props = {
  token: {
    asset: string;
    amount: string;
  };
  state: WithdrawState;
  onClick: () => void;
};

const NewFundFormInitial: FC<Props> = ({ token, state, onClick }) => {
  const { control, setValue } = useFormContext();
  const userInfo = useUserInfo();
  const balance = userInfo?.ust_delegated ?? "0";

  const { max, realMax } = useAuctionLogic();

  const _providedBalance = num(balance).times(ONE_TOKEN).toString();

  const handleChange = (value: number) => {
    setValue("token", {
      ...token,
      amount: String(value),
    });
  };

  return (
    <>
      <Box px="6" mb="4">
        <Text fontSize="xl" color="white">
          Create a new GoFund US(T) pool
        </Text>
      </Box>
      <Card mb="2">
        <Text fontSize="xs" color="white.500">
          <UnorderedList fontWeight="500">
            <ListItem>
              This will create your GoFund. We have no way of controlling who
              sends you funds.
            </ListItem>
            <ListItem>Once created, we have no way of closing this.</ListItem>
            <ListItem>
              We will charge you 5% on your earnings. Depositors will not get a
              charged a fee (besides from the transaction fee for depositing and
              withdrawing funds)
            </ListItem>
            <ListItem>
              We have the ability to put your earnings into your wallet. We do
              not have the ability to modify the amount provided to you, we
              might do this if the fund appears dormant.
            </ListItem>
            <ListItem>
              <strong>
                Be aware: At the current stage we do not store the links to your
                GoFund. You are responsible for placing them where your donors
                will see them. We do have the ability to re-create these links,
                but do not rely on us being super responsive.
              </strong>
            </ListItem>
          </UnorderedList>
        </Text>
      </Card>

      <Card>
        <Controller
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (

            <AmountInput
              {...field}
              balanceLabel="Provided"
              limit={+realMax}
              balance={balance}
              isSingle={true}
              hideMaxButton={true}
            />
          )}
        />
      </Card>

      {state.error && (
        <Card mt="3">
          <Text variant="light">{state.error}</Text>
        </Card>
      )}

      <NewFundFormFooter
        data={state}
        amount={+token.amount}
        onConfirmClick={onClick}
      />
    </>
  );
};

export default NewFundFormInitial;
