import { JsonType } from '@/utils/contract/JsonType.ts';

export enum StandardInterfaceId {
  NEP141 = 'nep141',
  NEP145 = 'nep145',
  NEP148 = 'nep148',
  NEP171 = 'nep171',
  NEP177 = 'nep177',
  NEP178 = 'nep178',
  NEP199 = 'nep199',
  NEP330 = 'nep330',
}

/**
 * Well-known smart contract interface specification
 */
export interface StandardInterface {
  /** Unique interface ID */
  id: StandardInterfaceId;
  /** Human-readable interface name */
  name: string;
  /** Methods provided by interface */
  methods: StandardInterfaceMethod[];
}

export interface StandardInterfaceArgument {
  name: string;
  /**
   * An argument can support one or multiple types
   * (e.g. Rust's `Option<String>` becomes `['string', 'null']`)
   */
  type: JsonType | JsonType[];
}

export interface StandardInterfaceMethod {
  name: string;
  args: StandardInterfaceArgument[];
}

/**
 * Mapping interface ID to interface specification
 */
export const interfaces: Readonly<
  Record<StandardInterfaceId, StandardInterface>
> = Object.freeze({
  [StandardInterfaceId.NEP141]: {
    id: StandardInterfaceId.NEP141,
    name: 'FT Core (NEP-141)',
    methods: [
      {
        name: 'ft_transfer',
        args: [
          { name: 'receiver_id', type: 'string' },
          { name: 'amount', type: 'string' },
          { name: 'memo', type: ['string', 'null'] },
        ],
      },
      {
        name: 'ft_transfer_call',
        args: [
          { name: 'receiver_id', type: 'string' },
          { name: 'amount', type: 'string' },
          { name: 'memo', type: ['string', 'null'] },
          { name: 'msg', type: 'string' },
        ],
      },
      {
        name: 'ft_total_supply',
        args: [],
      },
      {
        name: 'ft_balance_of',
        args: [{ name: 'account_id', type: 'string' }],
      },
    ],
  },
  [StandardInterfaceId.NEP145]: {
    id: StandardInterfaceId.NEP145,
    name: 'Storage Management (NEP-145)',
    methods: [
      {
        name: 'storage_deposit',
        args: [
          { name: 'account_id', type: ['string', 'null'] },
          { name: 'registration_only', type: ['boolean', 'null'] },
        ],
      },
      {
        name: 'storage_withdraw',
        args: [{ name: 'amount', type: ['string', 'null'] }],
      },
      {
        name: 'storage_unregister',
        args: [{ name: 'force', type: ['boolean', 'null'] }],
      },
      {
        name: 'storage_balance_bounds',
        args: [],
      },
      {
        name: 'storage_balance_of',
        args: [{ name: 'account_id', type: 'string' }],
      },
    ],
  },
  [StandardInterfaceId.NEP148]: {
    id: StandardInterfaceId.NEP148,
    name: 'FT Metadata (NEP-148)',
    methods: [
      {
        name: 'ft_metadata',
        args: [],
      },
    ],
  },
  [StandardInterfaceId.NEP171]: {
    id: StandardInterfaceId.NEP171,
    name: 'NFT Core (NEP-171)',
    methods: [
      {
        name: 'nft_transfer',
        args: [
          { name: 'receiver_id', type: 'string' },
          { name: 'token_id', type: 'string' },
          { name: 'approval_id', type: ['number', 'null'] },
          { name: 'memo', type: ['string', 'null'] },
        ],
      },
      {
        name: 'nft_transfer_call',
        args: [
          { name: 'receiver_id', type: 'string' },
          { name: 'token_id', type: 'string' },
          { name: 'approval_id', type: ['number', 'null'] },
          { name: 'memo', type: ['string', 'null'] },
          { name: 'msg', type: 'string' },
        ],
      },
      {
        name: 'nft_token',
        args: [{ name: 'token_id', type: 'string' }],
      },
    ],
  },
  [StandardInterfaceId.NEP177]: {
    id: StandardInterfaceId.NEP177,
    name: 'NFT Metadata (NEP-177)',
    methods: [
      {
        name: 'nft_metadata',
        args: [],
      },
    ],
  },
  [StandardInterfaceId.NEP178]: {
    id: StandardInterfaceId.NEP178,
    name: 'NFT Approval Management (NEP-178)',
    methods: [
      {
        name: 'nft_approve',
        args: [
          { name: 'token_id', type: 'string' },
          { name: 'account_id', type: 'string' },
          { name: 'msg', type: ['string', 'null'] },
        ],
      },
      {
        name: 'nft_revoke',
        args: [
          { name: 'token_id', type: 'string' },
          { name: 'account_id', type: 'string' },
        ],
      },
      {
        name: 'nft_revoke_all',
        args: [{ name: 'token_id', type: 'string' }],
      },
      {
        name: 'nft_is_approved',
        args: [
          { name: 'token_id', type: 'string' },
          { name: 'approved_account_id', type: 'string' },
          { name: 'approval_id', type: ['number', 'null'] },
        ],
      },
    ],
  },
  [StandardInterfaceId.NEP199]: {
    id: StandardInterfaceId.NEP199,
    name: 'Royalties and Payouts (NEP-199)',
    methods: [
      {
        name: 'nft_payout',
        args: [
          { name: 'token_id', type: 'string' },
          { name: 'balance', type: 'string' },
          { name: 'max_len_payout', type: 'number' },
        ],
      },
      {
        name: 'nft_transfer_payout',
        args: [
          { name: 'receiver_id', type: 'string' },
          { name: 'token_id', type: 'string' },
          { name: 'approval_id', type: 'number' },
          { name: 'balance', type: 'string' },
          { name: 'max_len_payout', type: 'number' },
        ],
      },
    ],
  },
  [StandardInterfaceId.NEP330]: {
    id: StandardInterfaceId.NEP330,
    name: 'Source Metadata (NEP-330)',
    methods: [
      {
        name: 'contract_source_metadata',
        args: [],
      },
    ],
  },
});
