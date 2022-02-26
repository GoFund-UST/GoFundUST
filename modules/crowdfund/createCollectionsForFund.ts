import {MsgExecuteContract} from '@terra-money/terra.js';

type CreateContributeFundMsgsOptions = {
  factory: string;
  contract: string;
  imageActive: string;
  imageInActive: string;
  name: string;
};

export const createCollectionsForFund = (
  options: CreateContributeFundMsgsOptions,
  sender: string
) => {
  const {contract, imageActive, name, imageInActive, factory} = options;
  const today = new Date();
  let active_collection = JSON.stringify({
    collection_uri: 'active/' + contract + '/' + today.getMilliseconds(),
    collection_image: imageActive,
    token_image: imageActive,
    collection_image_data: null,
    token_image_data: null,
    external_url: 'https://gofundust.money/fund/' + contract,
    description: name + ' Active',
    collection_name: name + ' active',
    token_name: name + ' Active Participant',
    attributes: [
      {display_type: null, trait_type: 'event-date', value: today},
      {
        display_type: null,
        trait_type: 'homepage',
        value: 'https://gofundust.money/fund/' + contract,
      },
      {
        display_type: null,
        trait_type: 'fund',
        value: contract,
      },
      {display_type: null, trait_type: 'active', value: 'true'},
    ],
    background_color: null,
    animation_url: null,
    youtube_url: null,
    max_issuance: 0,
    embargo_until: 0,
    has_unique_tokens: false,
    can_change_max_issuance: false,
    transferable: false,
    royalty: '0.02',
  });
  let inactive_collection = JSON.stringify({
    collection_uri: 'redeemed/' + contract + '/' + today.getMilliseconds(),
    collection_image: imageInActive,
    token_image: imageInActive,
    collection_image_data: null,
    token_image_data: null,
    external_url: 'https://gofundust.money/fund/' + contract,
    description: name + ' Redeemed',
    collection_name: name + ' redeemed',
    token_name: name + ' Redeemed Participant',
    attributes: [
      {display_type: null, trait_type: 'event-date', value: today},
      {
        display_type: null,
        trait_type: 'homepage',
        value: 'https://gofundust.money/fund/' + contract,
      },
      {
        display_type: null,
        trait_type: 'fund',
        value: contract,
      },
      {display_type: null, trait_type: 'active', value: 'false'},
    ],
    background_color: null,
    animation_url: null,
    youtube_url: null,
    max_issuance: 0,
    embargo_until: 0,
    has_unique_tokens: false,
    can_change_max_issuance: false,
    transferable: true,
    royalty: '0.02',
  });

  const executeMsg = {
    create_collections_for_fund: {
      contract: contract,
      active_meta: new Buffer(active_collection).toString('base64'),
      redeemed_meta: new Buffer(inactive_collection).toString('base64'),
    },
  };

  const msg = new MsgExecuteContract(sender, factory, executeMsg, []);

  return [msg];
};
