<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import TheHero from '@/components/home/TheHero.vue'
import TheMint from '@/components/home/TheMint.vue'
import TheSlotMachine from '@/components/home/TheSlotMachine.vue'
import TheBottom from '@/components/home/TheBottom.vue'

import '@lottiefiles/lottie-player'

const countdownDate = dayjs(Date.UTC(2021, 7, 28, 23, 0, 0))

const countdown = ref<{
  days: string
  hours: string
  minutes: string
  seconds: string
}>()

const calculateCountdown = () => {
  const days = Math.floor(countdownDate.diff(dayjs(), 'd', true))
  const hours = Math.floor(countdownDate.diff(dayjs(), 'h', true) - days * 24)
  const minutes = Math.floor(
    countdownDate.diff(dayjs(), 'm', true) - days * 1440 - hours * 60
  )
  const seconds = Math.ceil(
    countdownDate.diff(dayjs(), 's') -
      minutes * 60 -
      hours * 3600 -
      days * 86400
  )

  countdown.value = {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }

  if ((days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) || days < 0) {
    clearInterval(countdownInterval)
    countdown.value = undefined
  }
}

let countdownInterval: NodeJS.Timeout

onMounted(() => {
  countdownInterval = setInterval(calculateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})

calculateCountdown()
</script>

<template>
  <div class="home">
    <TheHero :countdown="countdown" />
    <TheMint :countdown="countdown" />
    <TheSlotMachine />
    <TheBottom :countdown-date="countdownDate" />
  </div>
</template>

<style lang="scss" scoped></style>
