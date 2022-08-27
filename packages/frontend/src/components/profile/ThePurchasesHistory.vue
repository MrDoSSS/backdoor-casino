<script lang="ts" setup>
import { useRewardStore } from '@/store/rewards'
import dayjs from 'dayjs'
import { ref } from 'vue'
import capitalize from 'lodash'
import Modal from '@/components/Modal.vue'

const rewardStore = useRewardStore()
const modalRef = ref()

const showModal = () => modalRef.value.show()

await rewardStore.fetch()

const showedCredential = ref<BD.Reward>()

const showCredential = (reward: BD.Reward) => {
  showedCredential.value = reward
  showModal()
}

const copyCredentials = () => {
  if (!showedCredential.value) return

  navigator.clipboard.writeText(
    Object.entries(showedCredential.value)
      .map(([key, value]) => `${capitalize(key)}: ${value}`)
      .join('\n')
  )
}
</script>

<template>
  <table class="purchases-history">
    <thead>
      <tr>
        <th>Item</th>
        <th>Credentials</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="reward in rewardStore.items" :key="reward._id">
        <td>{{ reward.product.name }}</td>
        <td class="text-success cursor-pointer" @click="showCredential(reward)">
          View Login →
        </td>
        <td>{{ dayjs(reward.updatedAt).format('MM/DD/YYYY') }}</td>
      </tr>
    </tbody>
  </table>

  <Modal class="modal-xs" ref="modalRef">
    <div class="d-flex align-items-center">
      <div>
        <div v-if="showedCredential?.login">
          <span class="text-success">Login:</span> {{ showedCredential.login }}
        </div>
        <div v-if="showedCredential?.password">
          <span class="text-success">Password:</span>
          {{ showedCredential.password }}
        </div>
        <div v-if="showedCredential?.key">
          <span class="text-success">Key:</span> {{ showedCredential.key }}
        </div>
        <button
          @click="copyCredentials"
          class="btn btn-primary btn-round btn-sm mt-1"
        >
          Copy Access
        </button>
      </div>
    </div>
  </Modal>
</template>

<style lang="scss">
.purchases-history {
  table-layout: fixed;
  th {
    font-weight: 400;
    font-size: 1.8rem;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      width: 2.5rem;
      height: 0.1rem;
      background-color: #fff;
      left: 0;
      bottom: 1.3rem;
    }
  }

  th,
  td {
    width: 33%;
    padding-bottom: 1.5rem;
    &:not(:last-child) {
      padding-right: 3rem;
    }
    line-height: 1;
  }
}
</style>
