web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// abi = JSON.parse('[{""constant"":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},
// {"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},
// {"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"},{"name":"account","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"bytes32"}],"name":"registeredAccount","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')



// [ { constant: true,
//     inputs: [ [Object] ],
//     name: 'totalVotesFor',
//     outputs: [ [Object] ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function' },
//   { constant: true,
//     inputs: [ [Object] ],
//     name: 'votesReceived',
//     outputs: [ [Object] ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function' },
//   { constant: false,
//     inputs: [ [Object], [Object] ],
//     name: 'voteForCandidate',
//     outputs: [],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'function' },
//   { constant: true,
//     inputs: [ [Object] ],
//     name: 'registeredAccount',
//     outputs: [ [Object] ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function' },
//   { constant: true,
//     inputs: [ [Object] ],
//     name: 'candidateList',
//     outputs: [ [Object] ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function' },
//   { inputs: [ [Object] ],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'constructor' } ]



VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0xe44ce2a7b9ff4b4629d049102da493a3950b74b2');
candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

function voteForCandidate() {
  blockchainAccount = $("#bcAccount").val();
  candidateName = $("#candidate").val();
  contractInstance.voteForCandidate(candidateName, blockchainAccount, {from: web3.eth.accounts[0]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});
