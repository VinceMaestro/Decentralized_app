pragma solidity ^0.4.11;
// We have to specify what version of compiler this code will compile with

contract Voting {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is candidate name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */

  mapping (bytes32 => uint8) public votesReceived;

  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */

  bytes32[] public candidateList;
  bytes32[] public registeredAccount;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function Voting(bytes32[] candidateNames) public {
    candidateList = candidateNames;
  }

  // This function returns the total votes a candidate has received so far
  function totalVotesFor(bytes32 candidate) public returns (uint8) {
    /*require(validCandidate(candidate));*/
    if (validCandidate(candidate) == false) throw; 
    if (validCandidate(candidate) == true) {
      return votesReceived[candidate];
    }
    return 0;
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForCandidate(bytes32 candidate, bytes32 account) public {
    /*require(validCandidate(candidate) && validAccount(account));*/
    if (validCandidate(candidate) == false || validAccount(account) == false) throw;
    if (validCandidate(candidate) == true && validAccount(account) == true) {
      registerAccount(account);
      registerVote(candidate);
    }
  }

  function validCandidate(bytes32 candidate) internal view returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }

  function validAccount(bytes32 account) internal view returns (bool) {
    for(uint i = 0; i < registeredAccount.length; i++) {
      if (registeredAccount[i] == account) {
        return false;
      }
    }
    return true;
  }

  function registerVote(bytes32 candidate) internal {
    votesReceived[candidate] += 1;
  }

  function registerAccount(bytes32 account) internal {
    registeredAccount.push(account);
  }
}
