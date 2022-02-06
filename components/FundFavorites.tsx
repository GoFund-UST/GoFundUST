import React from "react";
import { Box, Text } from "@chakra-ui/react";

import CardHeader from "components/CardHeader";
import Card from "components/Card";

const FundFavorites = () => {
  return (
    <Box>
      <CardHeader label="List of popular GoFunds" />

      <Card p={["6", null, null, "12"]}>
        <Text>
          List of popular funds. no idea what defines popular. might just remove
          this bit, or put some FAQ here
        </Text>
      </Card>
    </Box>
  );
};

export default FundFavorites;
