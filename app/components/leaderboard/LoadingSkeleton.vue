<template>
  <div class="mx-auto w-full max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8" aria-busy="true" aria-label="Loading leaderboard">
    <!-- Hero -->
    <div class="space-y-4 text-center">
      <div class="shimmer-block mx-auto h-12 w-3/4 max-w-xl" />
      <div class="shimmer-block mx-auto h-5 w-2/3 max-w-md" />
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in 6"
        :key="`stat-${i}`"
        class="glass-card h-28 p-5"
      >
        <div class="shimmer-block mb-3 h-4 w-24" />
        <div class="shimmer-block h-9 w-20" />
      </div>
    </div>

    <!-- Filter -->
    <div class="glass-panel h-20 w-full" />

    <!-- Podium -->
    <div class="flex flex-col items-end justify-center gap-4 md:flex-row md:items-end">
      <div class="shimmer-block order-2 h-48 w-full max-w-xs rounded-2xl md:order-1 md:h-52" />
      <div class="shimmer-block order-1 h-56 w-full max-w-xs rounded-2xl md:order-2 md:h-64" />
      <div class="shimmer-block order-3 h-44 w-full max-w-xs rounded-2xl md:h-48" />
    </div>

    <!-- Cards -->
    <div class="space-y-3">
      <div
        v-for="i in 6"
        :key="`card-${i}`"
        class="glass-card h-28 p-4"
      >
        <div class="flex items-center gap-4">
          <div class="shimmer-block h-12 w-12 shrink-0 rounded-full" />
          <div class="flex-1 space-y-2">
            <div class="shimmer-block h-4 w-1/3" />
            <div class="shimmer-block h-3 w-1/2" />
            <div class="shimmer-block h-2 w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
