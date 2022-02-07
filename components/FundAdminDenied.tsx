import React, { FC } from "react";
import { Box, Flex, HStack, Text, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";

import Card from "components/Card";
import CloseModalIcon from "components/icons/CloseModalIcon";

type Props = {
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const FundAdminDenied: FC<Props> = ({ onCloseClick }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      w="800px"
      m="0 auto"
      mt="10"
    >
      <Card>
        <Flex justify="space-between" align="center" mb="4">
          <HStack>
            <Text fontSize="lg" color="yellow.500">
              Only the beneficiary has access to this page
            </Text>
          </HStack>
          <IconButton
            aria-label="Close"
            icon={<CloseModalIcon w="1.5rem" h="1.5rem" />}
            variant="icon"
            onClick={onCloseClick}
          />
        </Flex>
      </Card>
    </MotionBox>
  );
};

export default FundAdminDenied;
