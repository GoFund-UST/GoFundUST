import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React, {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import Card from '../../components/Card';
import {useCrowdFund} from '../../modules/crowdfund';
import {usePostContributeFund} from '../../modules/crowdfund/hooks/usePostContributeFund';
import LibWrapper from './util/LibWrapper';
import LoadingIcon from '../../components/icons/LoadingIcon';

type FundButtonText = 'Fund' | '✔️' | '❌';

const ContributeToFund: React.FC<{fundAddress: string}> = ({fundAddress}) => {
  return (
    <LibWrapper>
      <Component fundAddress={fundAddress} />
    </LibWrapper>
  );
};

const Component: React.FC<{fundAddress: string}> = ({fundAddress}) => {
  const {isLoading, data} = useCrowdFund(fundAddress);
  const [fundButtonText, setFundButtonText] = useState<FundButtonText>('Fund');
  const hasTxCompleted = fundButtonText === '✔️' || fundButtonText === '❌';
  const form = useForm<{amount: number}>({
    mode: 'onChange',
    defaultValues: {
      amount: 0,
    },
  });

  const getFundButtonTooltip = (): string => {
    switch (fundButtonText) {
      case '✔️':
        return 'Transaction has succeed!';
      case '❌':
        return 'Transaction has failed!';
      default:
        return '';
    }
  };

  const {submit: submitContribution} = usePostContributeFund({
    fundAmount: form.watch('amount'),
    contractAddress: fundAddress,
  });

  const fundProject = useCallback(async () => {
    try {
      await submitContribution();
      setFundButtonText('✔️');
    } catch (error) {
      console.error(error);
      setFundButtonText('❌');
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
          {isLoading ? (
            <Flex justifyContent="center">
              <LoadingIcon />
            </Flex>
          ) : (
            <>
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
                  <Tooltip label={getFundButtonTooltip()} fontSize="md" placement="top">
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
                          disabled={!form?.formState?.isValid || hasTxCompleted}
                          onClick={e => {
                            e.preventDefault();
                            fundProject();
                          }}>
                          {fundButtonText}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </Tooltip>
                  <FormErrorMessage>{form.formState.errors?.amount?.message}</FormErrorMessage>
                </FormControl>
              </form>
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default ContributeToFund;
