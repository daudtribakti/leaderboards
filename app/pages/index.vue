<script setup lang="ts">
definePageMeta({
  ssr: false,
})

useSeoMeta({
  title: 'Pilih Perusahaan — Kalbe Donor Kalori Leaderboard',
  description: 'Pilih PT Agroveta Husada Dharma atau Corporate Function untuk melihat leaderboard Donor Kalori.',
})
</script>

<template>
  <LeaderboardCompanyPicker />
</template>
