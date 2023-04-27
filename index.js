const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const { Account, Call, constants, ec, EstimateFee, InvokeFunctionResponse, KeyPair, number, Provider, ProviderOptions, stark } = require("starknet");

const app = express();
const port = 5001;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/transfer', (req, res) => {

// ===== Script for just stransfer ====
console.log('---- start ----');
        const senderAddress = '0x70bdb4da1c7153682bd9760f3cb297addb3a15e30cc77be7194434ebaa24ad9'

        const txnInvocation = {
        contractAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
        entrypoint: 'transfer',
        calldata: ["0x0535377e2fA496930E0358Ae7ddFDbb5aBEaAeB4EC431bdff518BC5D3150b2B","10","0"]
        }

        const maxFee = number.toBN('440005097511309')

        console.log(maxFee);

        const pk = '1188213934273022935890293708434664722187072329437599921063646353986905980672'
        const senderKeyPair = ec.getKeyPair(pk)

        const account = new Account(new Provider(), senderAddress, senderKeyPair);
        account.execute(txnInvocation, undefined, {
        maxFee,
        }).then((txhash) => {
        console.log(txhash)
        });

        // console.log(txhash);
        console.log('---- end ----');
        res.send("transfer submitted");
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
