<script setup lang="ts">
definePageMeta({
  ssr: false,
})

useSeoMeta({
  title: 'Kalbe Donor Kalori Leaderboard',
  description: 'Track the best performers from PT Agroveta Husada Dharma and Corporate Function.',
})

const {
  genderFilter,
  companyFilter,
  searchQuery,
  sortBy,
  lastUpdatedAt,
  error,
  refresh,
  topThree,
  restEntries,
  filteredEntries,
  stats,
  isEmpty,
  hasError,
  hasLoaded,
  isLoading,
} = useLeaderboard()

const tickerEntries = computed(() => {
  const ranked = filteredEntries.value.length
    ? filteredEntries.value
    : topThree.value
  return ranked.slice(0, 10)
})
</script>

<template>
  <main class="relative min-h-screen overflow-x-hidden pb-12">
    <LeaderboardBackgroundAnimatedBackground />
    <LeaderboardBackgroundFloatingParticles />

    <div class="relative z-10 mx-auto min-h-screen w-full max-w-7xl">
      <LeaderboardHeader :last-updated-at="lastUpdatedAt" />

      <LeaderboardLoadingSkeleton v-if="isLoading" />

      <div v-else-if="hasError" class="px-4 py-10 sm:px-6 lg:px-8">
        <LeaderboardErrorState
          :message="error?.message || 'Failed to fetch live leaderboard data.'"
          @retry="refresh()"
        />
      </div>

      <div v-else-if="hasLoaded" class="space-y-4 pt-2 sm:space-y-5">
        <!-- Filter always visible -->
        <LeaderboardFilter
          v-model:gender="genderFilter"
          v-model:company="companyFilter"
          v-model:search="searchQuery"
          v-model:sort="sortBy"
        />

        <!-- Stats & Hot in tabs (not stacked) -->
        <LeaderboardOverviewTabs
          :stats="stats"
          :ticker-entries="tickerEntries"
        />

        <div v-if="isEmpty" class="px-4 py-8 sm:px-6 lg:px-8">
          <LeaderboardEmptyState />
        </div>

        <template v-else>
          <LeaderboardPodium v-if="topThree.length" :entries="topThree" />

          <LeaderboardList
            v-if="restEntries.length"
            :entries="restEntries"
          />
        </template>
      </div>
    </div>
  </main>
</template>
