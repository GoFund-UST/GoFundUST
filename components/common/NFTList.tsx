import React from 'react';
import NFT from 'components/common/NFT';
import {Box} from '@chakra-ui/react';

const NFTList: ({nfts, nft_contract}: {nfts: any; nft_contract: any}) => JSX.Element = ({
  nfts,
  nft_contract,
}) => {
  if (nft_contract) {
    return nfts.map(token => (
      <Box key="nftmap">
        <NFT key={token} nft={token} nft_contract={nft_contract} />
      </Box>
    ));
  } else {
    // eslint-disable-next-line no-console
    console.log('nftlist: nft_contract undefined');
    return <></>;
  }
};

export default NFTList;
