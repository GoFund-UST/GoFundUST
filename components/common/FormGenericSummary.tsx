import {Flex, Text} from '@chakra-ui/react';
import React, {FC} from 'react';

type Props = {
  fields: {
    label: string;
    value: string | number;
  }[];
};

const FormGenericSummary: FC<Props> = ({fields}) => {
  return (
    <>
      {fields.map(({label, value}, index) => {
        return (
          <Flex key={index} justify="space-between" align="center" mt="12" w="full">
            <Text variant="content" fontSize="md">
              {label}
            </Text>
            <Text variant="cardDescription" fontSize="md" maxW={'70%'}>
              {value}
            </Text>
          </Flex>
        );
      })}
    </>
  );
};

export default FormGenericSummary;
