module.exports = {
  apps: [
    {
      name: 'api',
      script: 'yarn start',
      env: {
        MONGODB_URL: process.env.MONGODB_URL,
        ETH_NETWORK: process.env.ETH_NETWORK,
        INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID,
        CONTRACT_OWNER_PK: process.env.CONTRACT_OWNER_PK,
        CONTRACT_OWNER_ADDRESS: process.env.CONTRACT_OWNER_ADDRESS,
      },
    },
  ],
}
