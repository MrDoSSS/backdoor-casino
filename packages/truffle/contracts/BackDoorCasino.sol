// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "erc721a/contracts/extensions/ERC721AQueryable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./Presalable.sol";

contract BackDoorCasino is ERC721AQueryable, Ownable, Pausable, Presalable, ReentrancyGuard {
  using SafeMath for uint;
  using ECDSA for bytes32;

  string public baseTokenURI;

  uint256 public price = 0.01 ether;
  uint256 public presalePrice = 0.01 ether;
  uint256 public maxTotalSupply = 3333;

  address t1 = 0x402351069CFF2F0324A147eC0a138a1C21491591;
  address t2 = 0x66B60143Fe3388551a4749aCD5C07Bbd368874ad;

  constructor(string memory _baseTokenURI) ERC721A("Casino", "Casino")  {
    setBaseURI(_baseTokenURI);
    presale();
  }

  function totalMinted() public view returns (uint256) {
    return _totalMinted();
  }

  function totalBurned() public view returns (uint256) {
    return _totalBurned();
  }

  function numberMinted(address owner) public view returns (uint256) {
    return _numberMinted(owner);
  }

  function mint(uint256 _amount, bytes memory _signature) public payable whenAllowedPublic whenNotPaused {
    address signer = _recoverSigner(msg.sender, _signature);
    
    require(signer == owner(), "Not authorized to mint");
    require(_numberMinted(msg.sender) + _amount <= 3, "Can only mint 3 tokens at address");
    require(_totalMinted() + _amount <= maxTotalSupply, "Exceeds maximum supply");

    (, uint256 _nonFreeAmount) = _numberMinted(msg.sender) == 2 
                                 ? (true, 1) : (_numberMinted(msg.sender) + _amount).trySub(1);

    require(_nonFreeAmount == 0 || msg.value >= price * _nonFreeAmount, "Ether value sent is not correct");

    _safeMint(msg.sender, _amount);
  }

  function presaleMint(uint256 _amount, bytes memory _signature) public payable whenPresaled whenNotPaused {        
    address signer = _recoverSigner(msg.sender, _signature);

    require(signer == owner(), "Not authorized to mint");
    require(_numberMinted(msg.sender) + _amount <= 6, "Can only mint 6 tokens at address");
    require(_totalMinted() + _amount <= maxTotalSupply, "Exceeds maximum supply");

    uint256 _nonFreeAmount;

    if(_numberMinted(msg.sender) == 0 && _amount > 1) {
      _nonFreeAmount = _amount - 2;
    } else if(_numberMinted(msg.sender) < 2 && _amount == 1) {
      _nonFreeAmount = 0;
    } else if(_numberMinted(msg.sender) > 1) {
      _nonFreeAmount = _amount;
    }

    require(_nonFreeAmount == 0 || msg.value >= presalePrice * _nonFreeAmount, "Ether value sent is not correct");
  
    _safeMint(msg.sender, _amount);
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return baseTokenURI;
  }

  function setBaseURI(string memory _baseTokenURI) public onlyOwner {
    baseTokenURI = _baseTokenURI;
  }

  function setPrice(uint256 _newPrice) public onlyOwner{
    price = _newPrice;
  }

  function setPresalePrice(uint256 _newPrice) public onlyOwner{
    presalePrice = _newPrice;
  }

  function setMaxTotalSupply(uint256 _count) public onlyOwner{
    maxTotalSupply = _count;
  }

  function withdraw() external onlyOwner nonReentrant {
    uint256 _balance = address(this).balance / 100;

    require(payable(t1).send(_balance * 12));
    require(payable(t2).send(_balance * 88));
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  function presale() public onlyOwner {
    _presale();
  }

  function unpresale() public onlyOwner {
    _unpresale();
  }

  function allowPublic() public onlyOwner {
    _allowPublic();
  }

  function disallowPublic() public onlyOwner {
    _disallowPublic();
  }

  function _recoverSigner(address _wallet, bytes memory _signature) private pure returns (address){
    return keccak256(abi.encodePacked(_wallet)).toEthSignedMessageHash().recover(_signature);
  }

  function _startTokenId() internal view virtual override returns (uint256) {
    return 1;
  }
}