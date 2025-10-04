// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract VerificationNFT is ERC721, Ownable {
//     // Structure to hold information about the issuer (government entity)
//     struct Issuer {
//         string name;
//         address issuerAddress;
//     }

//     // Mapping from token ID to issuer
//     mapping(uint256 => Issuer) private issuers;
//     mapping(address => uint256) campaignNFT;

//     // Event to log minting of a new token
//     event Minted(address indexed to, uint256 indexed tokenId, address issuer);

//     constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

//     // Function to mint a new NFT
//     function mint(address to, uint256 tokenId, string memory tokenURI, string memory issuerName) external onlyOwner {
//         _mint(to, tokenId);
//         _setTokenURI(tokenId, tokenURI);

//         // Record the issuer of the token
//         issuers[tokenId] = Issuer(issuerName, msg.sender);

//         emit Minted(to, tokenId, msg.sender);
//     }

//     // Function to get issuer information for a token
//     function getIssuer(uint256 tokenId) external view returns (string memory, address) {
//         Issuer memory issuer = issuers[tokenId];
//         return (issuer.name, issuer.issuerAddress);
//     }
// }
