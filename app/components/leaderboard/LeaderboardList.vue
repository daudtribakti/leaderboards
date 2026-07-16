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
    <div class="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 id="list-heading" class="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
          Full Standings
        </h2>
        <p class="mt-1 text-sm text-white/45">
          Ranked by current calories · {{ entries.length }} competitors
        </p>
      </div>
    </div>

    <TransitionGroup
      name="lb-list"
      tag="div"
      class="relative flex flex-col gap-3"
    >
      <LeaderboardCard
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
