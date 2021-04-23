import express from 'express';

import Web3 from 'web3';

const mainnetProviderUrl = 'https://bsc-dataseed1.binance.org:443';
const testnetProviderUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545';
const providerUrl = mainnetProviderUrl;

const web3 = new Web3(providerUrl);

function getWalletAddress() {
    web3.eth.accounts.create();
    return account.address;
}

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    const addresses = getWalletAddress();
    console.log("addresses: ", addresses);
    res.send(addresses);
});

app.get('/balance', async (req, res) => {
    const balance = await web3.eth.getBalance('0xb218C5D6aF1F979aC42BC68d98A5A0D796C6aB01');
    console.log("balance: ", balance);
    res.send(balance);
});

app.get('/transaction', async (req, res) => {
    web3.eth.getTransaction('0xb2f188e9562f72191be2e71a1ea9c3328aa7fdb78dad5a53f7006a1bc87af885', (error, data) => {
        console.log("error, data: ", error, `${data}`);
    });
    //console.log("transaction: ", transaction);
    res.send({});
});

app.get('/account', async (req, res) => {
    web3.eth.getAccounts([], (error, accounts) => {
        console.log("error: ", error);
        console.log("accounts: ", accounts);
        res.send(accounts);
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});