require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */


module.exports = {
  networks: {
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 5,
      saveDeployments: true,
    }
  },
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
