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
    ListItem, Link,
} from '@chakra-ui/react';

import { useAstroApp } from 'modules/common';

import DateNumber from 'components/DateNumber';
import CardHeader from 'components/CardHeader';
import Card from 'components/Card';

const Disclaimer = () => {

    return (
        <Box>
            <CardHeader label="Disclaimer"/>

            <Card p={['6', null, null, '12']}>
                <Text>This project is not affiliated with Astroport.
                    The smart contracts used in this project are under heavy development, and have not been audited.
                    The authors of this project plan to collect fees from the use of this website.
                    If you are a charity, feel free to contact the authors, to create fee-free alternatives</Text>
                <Text><Link href="/disclaimer">legal disclaimer (draft)</Link></Text>

            </Card>
        </Box>
    );
};

export default Disclaimer;
