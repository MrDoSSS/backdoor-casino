// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Payment is Ownable, ReentrancyGuard {

  event ChipsPurchased(address receiver, string size, uint256 price, uint256 amount);

  address t1 = 0x402351069CFF2F0324A147eC0a138a1C21491591;
  address t2 = 0x66B60143Fe3388551a4749aCD5C07Bbd368874ad;

  mapping (string => uint256) public prices;
  mapping (string => uint256) public amounts;

  constructor() {
    prices["small"] = 0.02 ether;
    prices["medium"] = 0.05 ether;
    prices["big"] = 0.1 ether;

    amounts["small"] = 100;
    amounts["medium"] = 400;
    amounts["big"] = 1000;
  }

  function purchaseChips(string memory _size) public payable {
    uint256 _price = prices[_size];
    uint256 _amount = amounts[_size];

    require(msg.value >= _price, "Ether value sent is not correct");

    emit ChipsPurchased(msg.sender, _size, _price, _amount);
  }

  function setPrice(string memory _size, uint256 _price) public onlyOwner {
    prices[_size] = _price;
  }

  function setAmount(string memory _size, uint256 _amount) public onlyOwner {
    prices[_size] = _amount;
  }

  function withdraw() external onlyOwner nonReentrant {
    uint256 _balance = address(this).balance / 100;

    require(payable(t1).send(_balance * 5));
    require(payable(t2).send(_balance * 95));
  }

}