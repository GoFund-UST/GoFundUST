import React, {FC} from 'react';
import {Box, Flex, HStack, Text, IconButton, Link} from '@chakra-ui/react';
import {motion} from 'framer-motion';

import Card from 'components/Card';
import CloseModalIcon from 'components/icons/CloseModalIcon';
import FailedIcon from 'components/icons/FailedIcon';

type Props = {
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const FundFailed: FC<Props> = ({onCloseClick}) => {
  return (
    <MotionBox
      initial={{opacity: 0, scale: 0.8}}
      animate={{opacity: 1, scale: 1}}
      w="470px"
      m="0 auto"
      mt="10">
      <Card>
        <Flex justify="space-between" align="center" mb="6">
          <HStack>
            <Box>
              <FailedIcon />
            </Box>
            <Text fontSize="lg" color="red.500">
              Address not doesn&apos;t appear to be a Crowd Fund Address.
            </Text>
          </HStack>
          <IconButton
            aria-label="Close"
            icon={<CloseModalIcon w="1.5rem" h="1.5rem" />}
            variant="icon"
            onClick={onCloseClick}
          />
        </Flex>

        <Text variant="light">
          Learn more about Crowd Funds{' '}
          <Link
            href="https://www.loop.markets/what-is-go-fund-ust/"
            isExternal={true}
            color="brand.purple">
            <a>in this article</a>
          </Link>
        </Text>
      </Card>
    </MotionBox>
  );
};

export default FundFailed;
