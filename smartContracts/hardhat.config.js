require("@nomiclabs/hardhat-waffle");
//https://eth-sepolia.g.alchemy.com/v2/QitTIYktgcpuG1qErOUiISIL6NDO9MlD
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks:{
    sepolia:{
      url:"https://eth-sepolia.g.alchemy.com/v2/QitTIYktgcpuG1qErOUiISIL6NDO9MlD",
      accounts:[ "425fd0fe52c891c026b00773f55255e4cbf4e7a58cc20eea0537da2b48014b0e" ]
    }
  } 
};
