import Web3 from 'web3';
import i18n from '@/lang';

type AccountChangeCallback = (newAccount: string) => void;

class Wallet {
  web3: Web3 | null = null;
  currentAccount: string | null = null;
  onAccountChange: AccountChangeCallback | null = null;

  constructor() {
    if ((window as any).ethereum) {
      this.web3 = new Web3((window as any).ethereum);
      this.setupListeners();
    } else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      );
    }
  }

  async connectWallet(): Promise<string | null> {
    try {
      const accounts = await (window as any).ethereum.request({
        method: 'eth_requestAccounts',
      });
      this.currentAccount = accounts[0];
      console.log(`Connected to account: ${this.currentAccount}`);
      return this.currentAccount;
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      return null;
    }
  }

  disconnectWallet(): string {
    // 断开连接的逻辑
    this.currentAccount = i18n.global.t('home.connect_wallet');
    return this.currentAccount;
  }

  setupListeners() {
    (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== this.currentAccount) {
        this.currentAccount = accounts[0];
        console.log(`Account changed to: ${this.currentAccount}`);
        if (this.onAccountChange) {
          this.onAccountChange(this.currentAccount);
        }
      }
    });

    (window as any).ethereum.on('chainChanged', (chainId: string) => {
      console.log(`Chain changed to: ${chainId}`);
      window.location.reload();
    });
  }

  registerAccountChangeCallback(callback: AccountChangeCallback) {
    this.onAccountChange = callback;
  }
}

export default Wallet;
