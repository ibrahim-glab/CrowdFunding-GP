# CrowdFunding Smart Contracts

This directory contains the Ethereum smart contracts for the CrowdFunding-GP decentralized crowdfunding platform.

## 📋 Overview

The smart contracts implement a comprehensive crowdfunding system with multiple campaign types, factory pattern for campaign creation, and integrated NFT rewards.

## 🏗️ Contract Architecture

### Core Contracts

1. **CampaginFactory.sol**
   - Factory contract for creating and managing campaigns
   - Tracks all deployed campaigns
   - Admin authorization system
   - User campaign tracking

2. **BaseCampaign.sol**
   - Abstract base contract for all campaign types
   - Core functionality: contributions, status management, fund distribution
   - Campaign lifecycle management
   - Time-based and goal-based validation

3. **Campaign Type Implementations**
   - **CharityBasedCampaign.sol**: Charity campaigns with automatic fund distribution
   - **EquaityBasedCampaign.sol**: Investment campaigns with equity distribution
   - **RewardBasedCampaign.sol**: Reward-based campaigns for backers

4. **NFT.sol**
   - ERC721 token implementation for contributor rewards
   - Based on OpenZeppelin standards
   - Customizable token metadata

5. **Supporting Contracts**
   - **Admin.sol**: Admin management functionality
   - **UserManagement.sol**: User registration and management

## 🔧 Development

### Compile Contracts

```shell
npx hardhat compile
```

### Run Tests

```shell
npx hardhat test
```

### Run Tests with Gas Reporting

```shell
REPORT_GAS=true npx hardhat test
```

### Start Local Node

```shell
npx hardhat node
```

### Deploy Contracts

```shell
npx hardhat run scripts/deploy.js --network <network-name>
```

## 📊 Gas Reporting

This project includes gas reporting configuration. Gas reports are generated automatically when running tests with the `REPORT_GAS=true` flag.

Configuration in `hardhat.config.js`:
- Enabled by default
- Output file: `gas-report.txt`
- USD price tracking via CoinMarketCap
- Optimization enabled

## 🧪 Testing

Tests are located in the `test/` directory:
- **BaseCamp.js**: Tests for base campaign functionality
- **CampFace.js**: Tests for campaign factory operations

Run tests with detailed output:
```shell
npx hardhat test --verbose
```

## 📝 Contract Details

### Campaign Creation Flow

1. User calls `createProject()` on CampaginFactory
2. Factory deploys appropriate campaign type contract
3. Campaign is added to tracking mappings
4. Campaign starts in "Pending" status
5. Admin activates campaign
6. Campaign becomes "Active" and accepts contributions

### Contribution Flow

1. User sends ETH to campaign's `contribute()` function
2. Contract validates contribution amount and campaign status
3. Contribution is recorded
4. Contributor is added to contributors list
5. Campaign checks if goal is reached

### Campaign Completion

1. Campaign reaches end time or goal
2. Owner calls `endCampaign()`
3. Funds are distributed based on campaign type
4. Campaign status updated to "Successful" or "Failed"

## 🔐 Security Features

- Minimum contribution requirements
- Time-locked operations
- Admin authorization
- Campaign status validation
- Reentrancy protection (Solidity 0.8.19+)
- Overflow/underflow protection (built-in)

## 🛠️ Dependencies

```json
{
  "hardhat": "^2.19.5",
  "hardhat-gas-reporter": "^1.0.10",
  "@nomicfoundation/hardhat-chai-matchers": "^2.0.4",
  "@nomicfoundation/hardhat-toolbox": "^4.0.0"
}
```

## 📚 Additional Resources

For more information about the project, see the main [README](../README.md) in the root directory.
