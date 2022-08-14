console.log(process.env.COLLECTION_CONTRACT_ADDRESS)
console.log(process.env.CONTRACT_OWNER_PK)

module.exports = {
  apps: [
    {
      name: 'api',
      script: 'yarn start',
      env: {
        CONTRACT_OWNER_ADDRESS: process.env.CONTRACT_OWNER_ADDRESS,
        CONTRACT_OWNER_PK: process.env.CONTRACT_OWNER_PK,
        COLLECTION_CONTRACT_ADDRESS: process.env.COLLECTION_CONTRACT_ADDRESS,
        PAYMENT_CONTRACT_ADDRESS: process.env.PAYMENT_CONTRACT_ADDRESS,
        WITHDRAW_CONTRACT_ADDRESS: process.env.WITHDRAW_CONTRACT_ADDRESS,
        MONGODB_URL: process.env.MONGODB_URL,
        ETH_NETWORK: process.env.ETH_NETWORK,
        INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID,
        NODE_ENV: process.env.NODE_ENV,
        NODE_APP_INSTANCE: process.env.NODE_APP_INSTANCE,
      },
    },
  ],
}
