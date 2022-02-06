import React from "react";
import { VStack } from "@chakra-ui/react";

import GoFundIntroduction from "components/GoFundIntroduction";

const GoFundIntro = () => {
  return (
    <VStack my="12" spacing="16" align="stretch">
      <GoFundIntroduction />
    </VStack>
  );
};

export default GoFundIntro;
