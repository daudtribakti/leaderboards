<script setup lang="ts">
const rootRef = ref<HTMLElement | null>(null)
const { fadeSlideUp } = useLeaderboardAnimations()

onMounted(() => {
  nextTick(() => {
    if (rootRef.value) {
      fadeSlideUp(rootRef.value.querySelectorAll('[data-skeleton-block]'), {
        y: 20,
        stagger: 0.08,
        duration: 0.5,
      })
    }
  })
})
</script>

<template>
  <div
    ref="rootRef"
    class="mx-auto w-full max-w-7xl space-y-4 px-4 py-3 sm:px-6 lg:px-8"
    aria-busy="true"
    aria-label="Loading leaderboard"
  >
    <div data-skeleton-block class="shimmer-block h-10 rounded-2xl" />
    <div data-skeleton-block class="shimmer-block h-32 rounded-2xl" />
    <div data-skeleton-block class="shimmer-block h-56 rounded-3xl" />
    <div class="space-y-2">
      <div
        v-for="i in 5"
        :key="`r-${i}`"
        data-skeleton-block
        class="shimmer-block h-14 rounded-2xl"
      />
    </div>
  </div>
</template>
