<script lang="ts" setup>
import BuyCard from '@/components/profile/BuyCard.vue'
import BalanceCard from '@/components/profile/BalanceCard.vue'
import TheHistoryTable from '@/components/profile/TheHistoryTable.vue'
import ThePassiveStaking from '@/components/profile/ThePassiveStaking.vue'
import TheWithdraw from '@/components/profile/TheWithdraw.vue'
import TheSettings from '@/components/profile/TheSettings.vue'
import { useUserStore } from '@/store/user'
import { useWalletStore } from '@/store/wallet'

const userStore = useUserStore()
const walletStore = useWalletStore()

await userStore.get(walletStore.currentAccount)
</script>

<template>
  <div class="profile flex-grow-1">
    <div class="container">
      <h3>Buy Playing Chips</h3>
      <div class="row gy-2">
        <div class="col-12 col-sm-4 col-lg"><BuyCard size="xs" /></div>
        <div class="col-12 col-sm-4 col-lg">
          <BuyCard size="sm" />
        </div>
        <div class="col-12 col-sm-4 col-lg">
          <BuyCard size="md" discount="10" />
        </div>
        <div class="col-12 col-sm-4 col-lg">
          <BuyCard size="lg" discount="15" />
        </div>
        <div class="col-12 col-sm-4 col-lg">
          <BuyCard size="xl" discount="20" />
        </div>
      </div>
      <div class="row gy-4">
        <div class="col-12 col-lg-6">
          <h3>Settings</h3>
          <TheSettings />
        </div>
        <div class="col-12 col-lg-6">
          <h3>Balance</h3>
          <div class="row gy-2">
            <div class="col-6 col-sm-4 col-xxl-3">
              <BalanceCard
                :value="userStore.user?.playingChips"
                label="Playing Chips"
              />
            </div>
            <div class="col-6 col-sm-4 col-xxl-3">
              <BalanceCard
                :value="userStore.user?.prizeTickets"
                label="Prize Tickets"
              />
            </div>
            <div class="col-6 col-sm-4 col-xxl-3">
              <BalanceCard
                :value="userStore.user?.eth"
                type="eth"
                label="Ethereum"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row gy-4">
        <div class="col-12 col-lg-6">
          <h3>Passive Staking</h3>
          <ThePassiveStaking />
        </div>
        <div class="col-12 col-lg-6">
          <h3 class="">Withdraw ETH</h3>
          <TheWithdraw />
        </div>
      </div>
      <h3>Transaction History</h3>
      <TheHistoryTable />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  background: url('/backgrounds/bg-mint-details.jpg') no-repeat,
    url('/backgrounds/bg-slot-machine.png') no-repeat center -800%;

  padding: 8rem 0 15rem;

  .row {
    &:not(:last-child) {
      margin-bottom: 10rem;
    }
  }

  h3 {
    position: relative;
    margin-bottom: 4rem;

    &:after {
      content: '';
      position: absolute;
      width: 4rem;
      height: 0.6rem;
      background-color: $primary;
      left: 0;
      bottom: -0.5rem;
    }
  }
}
</style>
