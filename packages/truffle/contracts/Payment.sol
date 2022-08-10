// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Payment is Ownable, ReentrancyGuard {

  event ChipsPurchased(address receiver, uint256 amount);

  address t1 = 0x402351069CFF2F0324A147eC0a138a1C21491591;
  address t2 = 0x66B60143Fe3388551a4749aCD5C07Bbd368874ad;

  uint256 public price = 0.1 ether;

  function purchaseChips(uint256 _amount) public payable {
    require(msg.value >= price * _amount, "Ether value sent is not correct");

    emit ChipsPurchased(msg.sender, _amount);
  }

  function setPrice(uint256 _price) public onlyOwner{
    price = _price;
  }

  function withdraw() external onlyOwner nonReentrant {
    uint256 _balance = address(this).balance / 100;

    require(payable(t1).send(_balance * 5));
    require(payable(t2).send(_balance * 95));
  }

}