<script setup lang="ts">
definePageMeta({
  // Live leaderboard data is fetched client-side only — avoid SSR/client hydration mismatch
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
  pending,
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
</script>

<template>
  <main class="relative min-h-screen pb-8">
    <LeaderboardBackgroundAnimatedBackground />
    <LeaderboardBackgroundFloatingParticles />

    <div class="relative z-10">
      <LeaderboardHeroSection :last-updated-at="lastUpdatedAt" />

      <!-- Loading -->
      <LeaderboardLoadingSkeleton v-if="isLoading" />

      <!-- Error -->
      <div v-else-if="hasError" class="px-4 py-12">
        <LeaderboardErrorState
          :message="error?.message || 'Failed to fetch live leaderboard data.'"
          @retry="refresh()"
        />
      </div>

      <!-- Loaded -->
      <div v-else-if="hasLoaded" class="space-y-10">
        <LeaderboardStats :stats="stats" />

        <LeaderboardFilter
          v-model:gender="genderFilter"
          v-model:company="companyFilter"
          v-model:search="searchQuery"
          v-model:sort="sortBy"
        />

        <div v-if="isEmpty" class="px-4 py-8">
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
