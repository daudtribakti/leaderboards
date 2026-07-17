<script setup lang="ts">
import { CORP_IT_EMPLOYEE_NAMES } from '~/constants/leaderboard'

definePageMeta({
  ssr: false,
})

useSeoMeta({
  title: 'Corporate IT — Kalbe Donor Kalori Leaderboard',
  description: 'Track the best performers from Corporate IT (Corporate Function subset).',
})
</script>

<template>
  <LeaderboardPage
    company-slug="corporate"
    :name-allowlist="CORP_IT_EMPLOYEE_NAMES"
    company-label-override="Corporate IT"
    state-key="corp-it"
  />
</template>
