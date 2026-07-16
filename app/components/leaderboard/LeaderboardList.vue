<script setup lang="ts">
import type { LeaderboardEntry } from '~/types/leaderboard'
import { entryKey } from '~/utils/leaderboard'

defineProps<{
  entries: LeaderboardEntry[]
}>()
</script>

<template>
  <section
    aria-labelledby="list-heading"
    class="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
  >
    <div class="section-divider mb-4 sm:mb-6">
      <h2
        id="list-heading"
        class="shrink-0 font-display text-sm font-bold tracking-wide text-[var(--gold)] sm:text-base lg:text-lg"
      >
        Top Ranking
      </h2>
    </div>

    <div class="mb-4 flex flex-wrap items-center justify-between gap-2">
      <p class="text-xs text-white/45 sm:text-sm">
        Full standings ranked by current calories
      </p>
      <p class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60">
        {{ entries.length }} competitors
      </p>
    </div>

    <!-- Desktop column hints -->
    <div
      class="mb-2 hidden grid-cols-[1fr_auto_auto] gap-4 px-5 text-[10px] font-semibold uppercase tracking-wider text-white/30 lg:grid"
      aria-hidden="true"
    >
      <span>Competitor</span>
      <span class="w-[140px] text-right">Calories</span>
      <span class="w-10 text-center">Rank</span>
    </div>

    <TransitionGroup
      name="lb-list"
      tag="div"
      class="relative flex flex-col gap-2 sm:gap-3"
    >
      <LeaderboardRow
        v-for="entry in entries"
        :key="entryKey(entry)"
        :entry="entry"
      />
    </TransitionGroup>
  </section>
</template>

<style scoped>
.lb-list-move,
.lb-list-enter-active,
.lb-list-leave-active {
  transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.lb-list-enter-from,
.lb-list-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}

.lb-list-leave-active {
  position: absolute;
  width: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .lb-list-move,
  .lb-list-enter-active,
  .lb-list-leave-active {
    transition: none;
  }
}
</style>
