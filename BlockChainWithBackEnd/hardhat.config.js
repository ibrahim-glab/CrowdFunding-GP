require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter")

module.exports = {
  networks: {
    hardhat: {      
        chainId: 1337
    },
},
  solidity: "0.8.19",
  gasReporter:{
    enabled :true,
    outputfile : "gas-report.txt",
    noColor : false,
    Currency: "USD",
    coinmarketcap:"8ca9a64e-2c3f-4db7-8257-4d3f7bd98e5f",
    optimize:true
  }
};
