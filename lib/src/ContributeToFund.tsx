import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import {Wallet} from '@terra-money/wallet-provider';
import React, {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import Card from '../../components/Card';
import {useCrowdFund} from '../../modules/crowdfund';
import {usePostContributeFund} from '../../modules/crowdfund/hooks/usePostContributeFund';
import LibWrapper from './util/LibWrapper';

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
  const form = useForm<{amount: number}>({
    mode: 'onChange',
    defaultValues: {
      amount: 0,
    },
  });

  const {submit: submitContribution} = usePostContributeFund({
    fundAmount: form.watch('amount'),
    contractAddress: fundAddress,
  });

  const fundProject = useCallback(async () => {
    // setTxError(null);
    // setTxResult(null);
    try {
      const res = await submitContribution();
      // setTxResult(res);
    } catch (error) {
      // setTxError(error.toString);
    }
  }, [submitContribution]);

  return (
    <>
      <div
        style={{
          height: '100%',
          width: '100%',
          overflowX: 'hidden',
          position: 'relative',
          backgroundColor: '#000D37',
          borderRadius: '1rem',
        }}>
        <Card>
          <Text variant="content" fontSize="3xl">
            Pool Name
          </Text>
          <Text variant="cardDescription" fontSize="xl">
            {data?.pool_name}
          </Text>
          <Divider mt="8" mb="8" />
          <form>
            <FormControl isInvalid={!!form.formState.errors.amount}>
              <FormLabel htmlFor="amount">Amount ($UST)</FormLabel>
              <InputGroup size="md">
                <Input
                  type="number"
                  id="amount"
                  {...form.register('amount', {
                    required: 'This is required',
                    min: {value: 0.1, message: 'Min value is 0.1'},
                    valueAsNumber: true,
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    variant="simple"
                    bg="brand.purple"
                    color="white"
                    width="256px"
                    disabled={!form?.formState?.isValid}
                    onClick={e => {
                      e.preventDefault();
                      fundProject();
                    }}>
                    Fund
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{form.formState.errors?.amount?.message}</FormErrorMessage>
            </FormControl>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ContributeToFund;
