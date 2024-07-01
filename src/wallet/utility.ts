import { providers } from 'web3-api-js';
import { distinctUntilChanged, map } from 'rxjs';
import '@web3-wallet-selector/modal-ui/styles.css';
import { ModalOptions, setupModal } from '@web3-wallet-selector/modal-ui';
import {
  setupWalletSelector,
  WalletSelector,
} from '@web3-wallet-selector/core';
import { setupMywallets } from '@web3-wallet-selector/mywallets';
import type { NetworkId } from '@web3-wallet-selector/core/src/lib/options.types';
import {
  CodeResult,
  FinalExecutionOutcome,
} from '@web3-utnet-js/types/lib/provider/response';

const THIRTY_TGAS = '30000000000000';
const NO_DEPOSIT = '0';

interface WalletOptions {
  networkId: string;
  createAccessKeyFor?: string;
}

interface ViewMethodOptions {
  contractId: string;
  method: string;
  args?: Record<string, unknown>;
}

interface CallMethodOptions {
  contractId: string;
  method: string;
  args?: Record<string, unknown>;
  gas?: string;
  deposit?: string;
}

export class Wallet {
  createAccessKeyFor?: string;
  networkId: string;
  selector: Promise<WalletSelector>;

  constructor({ networkId = 'testnet', createAccessKeyFor }: WalletOptions) {
    this.createAccessKeyFor = createAccessKeyFor;
    this.networkId = networkId;
    this.selector = setupWalletSelector({
      network: this.networkId as NetworkId,
      modules: [setupMywallets()],
    });
  }

  startUp = async (
    accountChangeHook: (signedAccountId: string | undefined) => void,
  ): Promise<string> => {
    const walletSelector = await this.selector;
    const isSignedIn = walletSelector.isSignedIn();
    const accountId = isSignedIn
      ? walletSelector.store.getState().accounts[0].accountId
      : '';

    walletSelector.store.observable
      .pipe(
        map(state => state.accounts),
        distinctUntilChanged(),
      )
      .subscribe(accounts => {
        const signedAccount = accounts.find(account => account.active)
          ?.accountId;
        accountChangeHook(signedAccount);
      });

    return accountId;
  };

  signIn = async (): Promise<void> => {
    const modal = setupModal(await this.selector, <ModalOptions>{
      contractId: this.createAccessKeyFor,
    });
    modal.show();
  };

  signOut = async (): Promise<void> => {
    const selectedWallet = await (await this.selector).wallet();
    await selectedWallet.signOut();
  };

  viewMethod = async ({
    contractId,
    method,
    args = {},
  }: ViewMethodOptions): Promise<unknown> => {
    const url = `https://unc-test.jongun2038.win`;
    const provider = new providers.JsonRpcProvider({ url });

    const res = await provider.query({
      request_type: 'call_function',
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
      finality: 'optimistic',
    });

    return JSON.parse(Buffer.from((res as CodeResult).result).toString());
  };

  callMethod = async ({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT,
  }: CallMethodOptions): Promise<string> => {
    const selectedWallet = await (await this.selector).wallet();
    const accounts = await selectedWallet.getAccounts();
    const accountId = accounts.length > 0 ? accounts[0].accountId : '';

    const result = await selectedWallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: contractId,
      actions: [
        {
          type: 'FunctionCall',
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });

    const { transaction_outcome: txo } = result as FinalExecutionOutcome;
    console.log('txhash:', txo.id);

    return txo.id;
  };

  getTransactionResult = async (txhash: string): Promise<unknown> => {
    const walletSelector = await this.selector;
    const { network } = walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const transaction = await provider.txStatus(txhash, 'unnused');
    return providers.getTransactionLastResult(transaction);
  };
}
