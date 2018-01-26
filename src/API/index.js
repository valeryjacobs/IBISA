const fs = require("fs");
const solc = require('solc')
var Web3 = require('web3');
var web3 = new Web3();
var express = require('express');
var app = express();

app.use(express.static('public'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//a comment
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})


app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
})

app.get('/web3-light.js', function (req, res) {
    res.sendFile(__dirname + "/public/" + "web3-light.js");
})

//Connecting to the running ethereum node
web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

console.log('Ethereum-NodeJS App started.');
console.log('Web3.js - Api version: ' + web3.version.api + ' Node: ' + web3.version.node + ' Ethereum: ' + web3.version.ethereum + '\n');


app.get('/', function (req, res) {
    res.send('Hello World');
})

app.post('/createUser', urlencodedParser, function (req, res) {
    // Prepare output in JSON format

    let source = fs.readFileSync('./contracts/User.sol', 'utf8');
    let compiledContract = solc.compile(source, 1);

    let abi;
    let bytecode;
    for (var contractName in compiledContract.contracts) {

        abi = compiledContract.contracts[contractName].interface;
        bytecode = compiledContract.contracts[contractName].bytecode;
    }

    let gasEstimate = web3.eth.estimateGas({
        data: bytecode
    });


    let MyContract = web3.eth.contract(JSON.parse(abi));

    var newContractAddress;

    //uint _userID, string _userName, uint _region, bool _inscope
    var myContractReturned = MyContract.new(req.body.userID, req.body.userName, req.body.regio, req.body.inscope, {
        from: addr_account_0,
        data: bytecode,
        gas: (gasEstimate + 1000000)}, function (err, myContract) {
        if (!err) {
            // NOTE: The callback will fire twice!
            // Once the contract has the transactionHash property set and once its deployed on an address.

            // e.g. check tx hash on the first call (transaction send)
            if (!myContract.address) {
                console.log(myContract.transactionHash); // The hash of the transaction, which deploys the contract

                // check address on the second call (contract deployed)
            } else {

                var hubDefinition = JSON.parse(fs.readFileSync('./build/contracts/Hub.json'));
                var addr = "0xf25186b5081ff5ce73482ad761db0eb0d25abfbf";

                // App.contracts.Hub.deployed().then(function (instance) {
                //     adoptionInstance = instance;



                newContractAddress = myContract.address;
                console.log(myContract.address); // the contract address
                //    var hubContract = new web3.eth.Contract(abi, addr);
                var MyContract = web3.eth.contract(hubDefinition.abi);

                // initiate contract for an address
                var myContractInstance = MyContract.at('0xf25186b5081ff5ce73482ad761db0eb0d25abfbf');

                var result = myContractInstance.registerUser(req.body.userID, myContract.address,{from:"0x627306090abaB3A6e1400e9345bC60c78a8BEf57",gas:1000000})
                

                var result2 = myContractInstance. getUsers();
                




               // hubContract.methods.registerUser(req.body.userID, myContract.address).call().then(console.log);

            }

            // Note that the returned "myContractReturned" === "myContract",
            // so the returned "myContractReturned" object will also get the address set.
        }
    });

    response = {
        contractAddress: newContractAddress
    };

    console.log(response);

    res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

function CreateUserContract() {



}


// // // Store the hash of the transaction sent
// // var trxSent;

// // //Get accounts's address
var addr_account_0 = web3.eth.accounts[0];
// // var addr_account_1 = web3.eth.accounts[1];

// // console.log('A');
// // //Unlock the account to be able to execute the transaction
// // //web3.personal.unlockAccount(addr_account_0,'password');

// // console.log('B');
// // //Listen the blockchain and wait the block with the transaction
// // web3.eth.filter('latest', function (error, result) {
// //     if (error) {
// //         console.log("Error occurred: " + err);
// //     } else {
// //         var block = web3.eth.getBlock(result);
// //         console.log('---BLOCK MINED [' + block.number + ']---');
// //         //Check if trx is in this block
// //         if (block.transactions.indexOf(trxSent) > -1) {
// //             var balance_0 = web3.fromWei(web3.eth.getBalance(addr_account_0), 'ether');
// //             var balance_1 = web3.fromWei(web3.eth.getBalance(addr_account_1), 'ether');
// //             console.log('Transaction mined: ' + trxSent + '\nBalance[0]: ' + balance_0 + '\nBalance[1]: ' + balance_1 + '\n');
// //         }
// //     }
// // });

// // //Execute the transaction (value expressed in Wei)
// // web3.eth.sendTransaction({
// //     from: addr_account_0,
// //     to: addr_account_1,
// //     value: '1000000000000000000'
// // }, function (err, trx) {
// //     if (err) {
// //         console.log('Error occurred: ' + err);
// //     } else {
// //         trxSent = trx;
// //         var balance_0 = web3.fromWei(web3.eth.getBalance(addr_account_0), 'ether');
// //         var balance_1 = web3.fromWei(web3.eth.getBalance(addr_account_1), 'ether');
// //         console.log('Transaction executed - HASH: ' + trx + '- WAITING TO BE MINED');
// //         console.log('Sent 1 ether from ACCOUNT_0 (' + addr_account_0 + ') to ACCOUNT_1 (' + addr_account_1 + ')\nBalance[0]: ' + balance_0 + '\nBalance[1]: ' + balance_1 + '\n');
// //     }
// // });