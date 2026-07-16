<template>
  <div
    class="mx-auto w-full max-w-7xl space-y-6 px-4 py-4 sm:space-y-8 sm:px-6 lg:px-8"
    aria-busy="true"
    aria-label="Loading leaderboard"
  >
    <!-- Ticker -->
    <div class="flex gap-2.5 overflow-hidden sm:gap-3">
      <div
        v-for="i in 6"
        :key="`ticker-${i}`"
        class="shimmer-block h-14 w-[160px] shrink-0 rounded-2xl sm:h-16 sm:w-[180px]"
      />
    </div>

    <!-- Stats -->
    <div>
      <div class="shimmer-block mb-3 h-6 w-48" />
      <div class="flex gap-2.5 overflow-hidden md:hidden">
        <div
          v-for="i in 4"
          :key="`stat-m-${i}`"
          class="shimmer-block h-14 w-28 shrink-0 rounded-2xl"
        />
      </div>
      <div class="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="i in 6"
          :key="`stat-${i}`"
          class="glass-card h-28 p-5"
        >
          <div class="shimmer-block mb-3 h-4 w-24" />
          <div class="shimmer-block h-9 w-20" />
        </div>
      </div>
    </div>

    <!-- Filter -->
    <div class="glass-panel h-28 w-full sm:h-36" />

    <!-- Podium -->
    <div class="flex items-end justify-center gap-3 pt-4 sm:gap-6">
      <div class="shimmer-block h-44 w-[30%] max-w-[200px] rounded-2xl sm:h-56" />
      <div class="shimmer-block h-56 w-[38%] max-w-[240px] rounded-2xl sm:h-72" />
      <div class="shimmer-block h-40 w-[30%] max-w-[200px] rounded-2xl sm:h-52" />
    </div>

    <!-- Rows -->
    <div class="space-y-2 sm:space-y-3">
      <div class="section-divider mb-3">
        <div class="shimmer-block h-4 w-28" />
      </div>
      <div
        v-for="i in 6"
        :key="`row-${i}`"
        class="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 sm:p-4"
      >
        <div class="shimmer-block h-11 w-11 shrink-0 rounded-full sm:h-14 sm:w-14" />
        <div class="flex-1 space-y-2">
          <div class="shimmer-block h-4 w-1/3" />
          <div class="shimmer-block h-3 w-1/2" />
          <div class="shimmer-block hidden h-2 w-full sm:block" />
        </div>
        <div class="hidden shimmer-block h-12 w-20 sm:block" />
        <div class="shimmer-block h-10 w-10 shrink-0 rounded-full" />
      </div>
    </div>
  </div>
</template>
