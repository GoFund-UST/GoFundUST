import React, {FC} from 'react';
import {Image, Link} from '@chakra-ui/react';

import {useNFTInfo} from 'modules/crowdfund/hooks/useQueryNFT';

type Props = {
  nft_contract: string;
  nft: string;
};

const NFT: FC<Props> = ({nft, nft_contract}) => {
  let info = useNFTInfo(nft_contract, nft);

  if (info.isLoading || info.data == null) {
    return <>Loading</>;
  } else {
    const image = info.data?.extension.image;
    const fund_trait = info.data?.extension.attributes.find(t => {
      return t.trait_type === 'fund';
    });
    let fund_id = null;
    if (fund_trait && fund_trait?.value) {
      fund_id = fund_trait?.value;
    }

    return (
      <>
        {fund_id && (
          <Link href={'/fund/' + fund_id}>
            <Image src={image} width={20} alt="fund name? and if active/redeemed?" />
          </Link>
        )}
        {!fund_id && <Image src={image} width={20} alt="fund name? and if active/redeemed?" />}
      </>
    );
  }
};

export default NFT;
