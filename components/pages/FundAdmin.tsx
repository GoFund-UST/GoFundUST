import {Box, Flex, Text} from '@chakra-ui/react';
import PageLoading from 'components/common/PageLoading';

import FundFailed from 'components/FundFailed';
import {useCrowdFund} from 'modules/crowdfund';
import {useRouter} from 'next/router';
import React, {FC} from 'react';
import FundAdminDetail from 'components/FundAdminDetail';
import {useFactoryConfig} from 'modules/crowdfund/hooks/useFactoryConfig';
import {useContracts} from 'modules/common';
type Props = {};
const FundAdmin: FC<Props> = () => {
  const router = useRouter();
  const address = router.query.address as string;
  const {isLoading, data} = useCrowdFund(address);
  const factoryConfig = useFactoryConfig();
  const {fundFactory} = useContracts();
  const handleClose = () => {
    router.push('/');
  };

  const renderFund = () => {
    if (!isLoading && data == null) {
      return <FundFailed onCloseClick={handleClose} />;
    }

    return (
      <FundAdminDetail
        detail={data}
        factory={fundFactory}
        address={address}
        onCloseClick={handleClose}
      />
    );
  };
  if (factoryConfig.isLoading || factoryConfig.data == null || isLoading) {
    return <PageLoading />;
  }
  if (factoryConfig.data.nft_contract) {
    // eslint-disable-next-line no-console
    // console.log('FundAdmin nft=', factoryConfig.data.nft_contract);

    return (
      <Box>
        <Flex flex="1" flexWrap={'wrap'} justifyContent="center">
          <Box>{renderFund()}</Box>
        </Flex>
      </Box>
    );
  } else {
    return (
      <Box>
        <Flex flex="1" flexWrap={'wrap'} justifyContent="center">
          <Text color="red">Nothing to configure. you&apos;re all set</Text>
        </Flex>
      </Box>
    );
  }
};

export default FundAdmin;
