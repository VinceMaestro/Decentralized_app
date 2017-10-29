# Decentralized_app
Test for first decentralized app using inmemory blockchain : ethereumjs-testrpc web3 & solidity

Thanks to [Siraj Raval](https://www.youtube.com/watch?v=gSQXq2_j-mw&t=456s) & [Mahesh Murthy](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) for their amazing work

### Requirements
[node](https://nodejs.org/en/download/package-manager/)

Use Managed Software Center on school's mac (NodeJS LTS)

### Install packages
<!-- npm install package.json -->
npm install ethereumjs-testrpc web3@0.20.1
npm install solc

(More about dependencies [here](https://stackoverflow.com/questions/22343224/whats-the-difference-between-tilde-and-caret-in-package-json))

(For atom users, install package: "language-etherium" to support solidity syntax)

## Launch testrpc (environnement simulating etherium blockchain) - Terminal 1:
./node_modules/.bin/testrpc

### Launch node - Terminal 2:
node

### Here we go:
Web3 = require('web3')

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

web3.eth.accounts

code = fs.readFileSync('Voting.sol').toString()

solc = require('solc')

compiledCode = solc.compile(code)

abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)

VotingContract = web3.eth.contract(abiDefinition)

byteCode = compiledCode.contracts[':Voting'].bytecode

deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})

contractInstance = VotingContract.at(deployedContract.address)

------

## 1 : Interact threw Web Browser:
In order to test your contract directly from your web browser, just type in nodejs console:

'''deployedContract.address'''

and copy past the address into index.js :

line 10: contractInstance = VotingContract.at(address)

Now you can type in the address into you we browser: PathToRepo/Decentralized_app/index.html

You must enter an account witch has'nt been used and a valid candidate name in order to vote

To get a list of existing accounts you can enter in your nodejs console : web3.eth.accounts

------

## 2 : Interact from nodejs console:
