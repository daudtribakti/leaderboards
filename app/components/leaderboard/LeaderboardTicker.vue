<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import type { LeaderboardEntry } from '~/types/leaderboard'
import { avatarColorFromName, entryKey, formatCalories, getInitials } from '~/utils/leaderboard'

defineProps<{
  entries: LeaderboardEntry[]
}>()
</script>

<template>
  <section
    aria-label="Top performers ticker"
    class="mx-auto w-full max-w-7xl px-4 pt-3 sm:px-6 lg:px-8"
  >
    <div class="mb-2 flex items-center justify-between gap-2">
      <p class="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40 sm:text-xs">
        Hot performers
      </p>
      <p class="text-[10px] text-white/30 sm:text-xs">
        Swipe to explore →
      </p>
    </div>
    <div
      class="-mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1 snap-x snap-mandatory scrollbar-none sm:gap-3"
      style="scrollbar-width: none; -ms-overflow-style: none;"
    >
      <article
        v-for="entry in entries"
        :key="entryKey(entry)"
        class="neon-border flex w-[160px] shrink-0 snap-start items-center gap-2.5 rounded-2xl px-3 py-2.5 transition-transform duration-200 hover:-translate-y-0.5 sm:w-[180px] sm:px-3.5 sm:py-3"
      >
        <div class="relative shrink-0">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white ring-2 ring-white/15 sm:h-11 sm:w-11 sm:text-sm"
            :style="{ background: avatarColorFromName(entry.employeeName) }"
            aria-hidden="true"
          >
            {{ getInitials(entry.employeeName) }}
          </div>
          <span
            class="absolute -bottom-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--gold)] px-1 text-[9px] font-extrabold text-[#3b2a00]"
          >
            #{{ entry.rank }}
          </span>
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-xs font-semibold text-white sm:text-sm">
            {{ entry.employeeName }}
          </p>
          <p class="score-text mt-0.5 inline-flex items-center gap-0.5 text-xs sm:text-sm">
            <TrendingUp class="h-3 w-3" aria-hidden="true" />
            {{ formatCalories(entry.currentPoints) }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
