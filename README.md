# CrowdFunding-GP

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.19-363636?logo=solidity)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.19.5-yellow)](https://hardhat.org/)

A decentralized blockchain-based crowdfunding platform built on Ethereum, enabling transparent and secure fundraising through smart contracts.

## 🌟 Features

- **Multiple Campaign Types**
  - 🎗️ **Charity-Based Campaigns**: Non-profit fundraising with automatic fund distribution
  - 💼 **Equity-Based Campaigns**: Investment opportunities with equity distribution
  - 🎁 **Reward-Based Campaigns**: Backer rewards for project support

- **Secure Smart Contracts**
  - Factory pattern for campaign creation
  - Admin authorization and campaign approval system
  - Automatic fund management and distribution
  - Contributor tracking and verification

- **Transparent Operations**
  - Real-time campaign status tracking
  - Minimum contribution requirements
  - Time-based campaign deadlines
  - Goal-based success criteria

- **NFT Integration**
  - Reward distribution through NFTs
  - ERC721 token implementation
  - Custom NFT minting for contributors

## 🛠️ Technology Stack

- **Blockchain**: Ethereum
- **Smart Contracts**: Solidity ^0.8.19
- **Development Framework**: Hardhat
- **Testing**: Chai, Mocha
- **Token Standards**: ERC721 (OpenZeppelin)
- **Gas Reporting**: hardhat-gas-reporter

## 📁 Project Structure

```
CrowdFunding-GP/
├── BlockChainWithBackEnd/
│   ├── contracts/              # Smart contracts
│   │   ├── BaseCampaign.sol   # Base campaign contract
│   │   ├── CampaginFactory.sol # Factory for creating campaigns
│   │   ├── CharityBasedCampaign.sol
│   │   ├── EquaityBasedCampaign.sol
│   │   ├── RewardBasedCampaign.sol
│   │   ├── NFT.sol            # NFT token contract
│   │   ├── UserManagement.sol
│   │   └── Admin.sol
│   ├── scripts/               # Deployment scripts
│   │   └── deploy.js
│   ├── test/                  # Contract tests
│   │   ├── BaseCamp.js
│   │   └── CampFace.js
│   ├── hardhat.config.js      # Hardhat configuration
│   └── package.json
├── Designs/                   # UI/UX designs
│   ├── Home.png
│   └── request.png
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MetaMask or another Web3 wallet (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ibrahim-glab/CrowdFunding-GP.git
   cd CrowdFunding-GP
   ```

2. **Install dependencies**
   ```bash
   cd BlockChainWithBackEnd
   npm install
   ```

### Configuration

The Hardhat configuration includes:
- Solidity compiler version: 0.8.19
- Gas reporter integration
- Network configurations (can be customized in `hardhat.config.js`)

## 💻 Usage

### Compile Contracts

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

### Run Tests with Gas Reporting

```bash
REPORT_GAS=true npx hardhat test
```

### Deploy to Local Network

1. Start a local Hardhat node:
   ```bash
   npx hardhat node
   ```

2. Deploy contracts:
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

### Deploy to Testnet/Mainnet

Update `hardhat.config.js` with your network configuration and run:
```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

## 📝 Smart Contract Architecture

### CampaginFactory

The factory contract manages the creation and tracking of all campaigns.

**Key Functions:**
- `createProject()`: Creates a new campaign of specified type
- `getDeployedProjects()`: Returns all deployed campaigns
- `getDeployedProjectsByUser()`: Returns campaigns created by a specific user

### BaseCampaign

The abstract base contract that defines common campaign functionality.

**Key Features:**
- Contribution management
- Campaign status tracking (Active, Successful, Pending, Failed)
- Time-based deadlines
- Goal-based success criteria
- Contributor tracking

### Campaign Types

1. **CharityBasedCampaign**: Extends BaseCampaign with automatic fund distribution to campaign owner
2. **EquaityBasedCampaign**: Includes equity distribution logic for investment-based campaigns
3. **RewardBasedCampaign**: Implements reward distribution system for backers

### NFT Contract

ERC721-compliant NFT contract for reward distribution and contributor recognition.

## 🧪 Testing

The project includes comprehensive tests for:
- Campaign factory functionality
- Base campaign operations
- Contribution handling
- Campaign lifecycle management

Run tests with:
```bash
npx hardhat test
```

View detailed gas reports:
```bash
REPORT_GAS=true npx hardhat test
```

## 🔐 Security Considerations

- All contracts use Solidity ^0.8.19 with built-in overflow protection
- OpenZeppelin contracts for standard implementations
- Admin authorization for campaign activation
- Minimum contribution requirements
- Time-locked fund distribution
- Campaign status verification

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write comprehensive tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the contract headers for details.

## 👥 Authors

- Ibrahim Glab - [@ibrahim-glab](https://github.com/ibrahim-glab)

## 🙏 Acknowledgments

- OpenZeppelin for secure contract implementations
- Hardhat development framework
- Ethereum community

## 📞 Contact & Support

For questions, issues, or suggestions:
- Open an issue on [GitHub](https://github.com/ibrahim-glab/CrowdFunding-GP/issues)
- Check existing documentation in the repository

## 🗺️ Roadmap

Future enhancements may include:
- [ ] Frontend dApp interface
- [ ] Multi-signature wallet integration
- [ ] Advanced campaign analytics
- [ ] Mobile application
- [ ] Additional payment token support
- [ ] Governance mechanisms
- [ ] Campaign milestone tracking

---

**Note**: This project is currently in development. Use at your own risk on mainnet.
