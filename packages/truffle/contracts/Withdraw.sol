// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Withdraw is Ownable, ReentrancyGuard {
  using ECDSA for bytes32;

  event EthDeposited(uint256 amount);
  event EthClaimed(string nonce, uint256 amount);

  mapping(string => bool) private _usedNonces;

  function deposit() public payable {
    emit EthDeposited(msg.value);
  }

  function claim(uint256 _amount, string memory _nonce, bytes memory _signature) public nonReentrant {
    address signer = recoverSigner(_amount, msg.sender, _nonce, _signature);
    require(signer == owner(), "Not authorized to claim");
    require(!_usedNonces[_nonce], "Not authorized to claim");

    require(_amount > 0, "There is no amount left to claim");
    require(payable(msg.sender).send(_amount));

    _usedNonces[_nonce] = true;

    emit EthClaimed(_nonce, _amount);
  }

  function recoverSigner(uint256 _amount, address _wallet, string memory _nonce, bytes memory _signature) private pure returns (address){
    return keccak256(abi.encodePacked(_amount, _wallet, _nonce)).toEthSignedMessageHash().recover(_signature);
  }
}