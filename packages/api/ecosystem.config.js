console.log(process.env.COLLECTION_CONTRACT_ADDRESS)
console.log(process.env.CONTRACT_OWNER_PK)

module.exports = {
  apps: [
    {
      name: 'api',
      script: 'yarn start',
    },
  ],
}
