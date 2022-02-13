import {useAddress} from '@arthuryeti/terra';
import {Box, Flex} from '@chakra-ui/react';
import PageLoading from 'components/common/PageLoading';
import FundAdminDenied from 'components/FundAdminDenied';
import FundAdminDetail from 'components/FundAdminDetail';
import FundFailed from 'components/FundFailed';
import {useCrowdFund, useCrowdFundState} from 'modules/crowdfund';
import {useRouter} from 'next/router';
import React, {FC} from 'react';

const FundAdmin: FC = () => {
  const router = useRouter();
  const address = router.query.address as string;
  const {isLoading, data} = useCrowdFund(address);
  const cwState = useCrowdFundState(address);
  const userAddress = useAddress();

  const handleClose = () => {
    router.push('/');
  };

  const renderFund = () => {
    if (!isLoading && data == null) {
      return <FundFailed onCloseClick={handleClose} />;
    }
    if (!cwState.isLoading && cwState.data == null) {
      return <FundFailed onCloseClick={handleClose} />;
    }

    if (data.beneficiary !== userAddress && data.fee_collector !== userAddress) {
      return <FundAdminDenied onCloseClick={handleClose} />;
    } else {
      return (
        <FundAdminDetail
          detail={data}
          claimable={cwState.data}
          address={address}
          onCloseClick={handleClose}
        />
      );
    }
  };

  if (isLoading || cwState.isLoading) {
    return <PageLoading />;
  }

  return (
    <Box m="0 auto" pt="12">
      <Flex gridGap="8">
        <Box w="container.sm">{renderFund()}</Box>
      </Flex>
    </Box>
  );
};

export default FundAdmin;
