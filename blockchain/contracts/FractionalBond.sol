// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FractionalBond {
    IERC20 public stablecoin;
    uint256 public constant APY = 500; // 5%
    uint256 public constant SECONDS_IN_YEAR = 31536000;

    mapping(address => uint256) public principalBalance;
    mapping(address => uint256) public lastUpdate;

    constructor(address _stablecoin) {
        stablecoin = IERC20(_stablecoin);
    }

    function invest(uint256 _amount) external {
        if (principalBalance[msg.sender] > 0) {
            principalBalance[msg.sender] += calculateYield(msg.sender);
        }
        stablecoin.transferFrom(msg.sender, address(this), _amount);
        principalBalance[msg.sender] += _amount;
        lastUpdate[msg.sender] = block.timestamp;
    }

    function calculateYield(address _user) public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - lastUpdate[_user];
        return (principalBalance[_user] * APY * timeElapsed) / (SECONDS_IN_YEAR * 10000);
    }

    function withdraw(uint256 _amount) external {
        uint256 total = principalBalance[msg.sender] + calculateYield(msg.sender);
        require(_amount <= total, "Insufficient balance");
        principalBalance[msg.sender] = total - _amount;
        lastUpdate[msg.sender] = block.timestamp;
        stablecoin.transfer(msg.sender, _amount);
    }
}