import React from 'react';
import dayjs from 'dayjs';
import {
  Box,
  HStack,
  Flex,
  Text,
  Image,
  StackDivider,
  Stack,
  VStack,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

import { useAstroApp } from 'modules/common';

import DateNumber from 'components/DateNumber';
import CardHeader from 'components/CardHeader';
import Card from 'components/Card';

const LaunchTimelineIntro = () => {


  return (
    <Box>
      <CardHeader label="List of popular GoFunds" />

      <Card p={['6', null, null, '12']}>
        <Text>List of popular funds. no idea what defines popular. might just remove this bit, or put some FAQ here</Text>

      </Card>
    </Box>
  );
};

export default LaunchTimelineIntro;
