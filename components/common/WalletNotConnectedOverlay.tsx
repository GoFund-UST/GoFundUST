import {Flex, Text} from '@chakra-ui/react';
import {useWallet, WalletStatus} from '@terra-money/wallet-provider';

export const WalletNotConnectedOverlay: React.FC = () => {
  const {status} = useWallet();

  if (status === WalletStatus.WALLET_NOT_CONNECTED) {
    return (
      <div
        style={{
          backdropFilter: 'blur(25px)',
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
        }}>
        <Flex flex="1" justifyContent={'center'}>
          <Text variant="cardHeader" fontSize="5xl">
            Connect your wallet!
          </Text>
        </Flex>
      </div>
    );
  } else {
    return <></>;
  }
};
