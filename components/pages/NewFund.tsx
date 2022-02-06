import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import NewFundForm from "components/fund/NewFundForm";

const NewFund: FC = () => {
  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">
          <NewFundForm />
        </Box>
      </Flex>
    </Box>
  );
};

export default NewFund;
