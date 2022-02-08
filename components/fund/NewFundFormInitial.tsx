import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ListItem,
  Text,
  Textarea,
  UnorderedList,
} from '@chakra-ui/react';
import Card from 'components/Card';
import {NewFundFormValues} from 'components/fund/NewFundForm';
import NewFundFormFooter from 'components/fund/NewFundFormFooter';
import {WithdrawState} from 'modules/auction';
import React, {FC} from 'react';
import {useFormContext} from 'react-hook-form';

type Props = {
  state: WithdrawState;
  onClick: () => void;
};

const NewFundFormInitial: FC<Props> = ({state, onClick}) => {
  const {
    register,
    formState: {errors},
  } = useFormContext<NewFundFormValues>();

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
              This will create your GoFund. We have no way of controlling who sends you funds.
            </ListItem>
            <ListItem>Once created, we have no way of closing this.</ListItem>
            <ListItem>
              We will charge you 5% on your earnings. Depositors will not get a charged a fee
              (besides from the transaction fee for depositing and withdrawing funds)
            </ListItem>
            <ListItem>
              We have the ability to put your earnings into your wallet. We do not have the ability
              to modify the amount provided to you, we might do this if the fund appears dormant.
            </ListItem>
            <ListItem>
              <strong>
                Be aware: At the current stage we do not store the links to your GoFund. You are
                responsible for placing them where your donors will see them. We do have the ability
                to re-create these links, but do not rely on us being super responsive.
              </strong>
            </ListItem>
          </UnorderedList>
        </Text>
      </Card>

      <Card>
        <FormControl mt={4} isInvalid={!!errors.pool_name}>
          <FormLabel htmlFor="pool_name">Fund name</FormLabel>
          <Input
            id="pool_name"
            {...register('pool_name', {
              required: 'This is required',
              maxLength: {value: 4, message: 'Maximum length should be 4'},
            })}
          />
          <FormErrorMessage>{errors?.pool_name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={!!errors.pool_oneliner}>
          <FormLabel htmlFor="pool_oneliner">Title</FormLabel>
          <Input
            id="pool_oneliner"
            {...register('pool_oneliner', {
              required: 'This is required',
              maxLength: {value: 64, message: 'Maximum length should be 64'},
            })}
          />
          <FormErrorMessage>{errors?.pool_oneliner?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt={4} isInvalid={!!errors.pool_description}>
          <FormLabel htmlFor="pool_description">Description</FormLabel>
          <Textarea
            id="pool_description"
            {...register('pool_description', {
              maxLength: {value: 128, message: 'Maximum length should be 128'},
            })}
          />
          <FormErrorMessage>{errors?.pool_description?.message}</FormErrorMessage>
        </FormControl>
      </Card>

      {state.error && (
        <Card mt="3">
          <Text variant="light">{state.error}</Text>
        </Card>
      )}

      <NewFundFormFooter data={state} onConfirmClick={onClick} />
    </>
  );
};

export default NewFundFormInitial;
