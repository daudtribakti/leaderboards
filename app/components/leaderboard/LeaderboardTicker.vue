<script setup lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import type { LeaderboardEntry } from '~/types/leaderboard'
import { avatarColorFromName, entryKey, formatCalories, getInitials } from '~/utils/leaderboard'

defineProps<{
  entries: LeaderboardEntry[]
  embedded?: boolean
}>()
</script>

<template>
  <section
    aria-label="Top performers ticker"
    :class="embedded ? '' : 'mx-auto w-full max-w-7xl px-4 pt-3 sm:px-6 lg:px-8'"
  >
    <div
      class="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      <article
        v-for="entry in entries"
        :key="entryKey(entry)"
        data-ticker-card
        class="flex items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50/50 px-2 py-1.5 transition-colors hover:bg-white hover:shadow-soft"
      >
        <div class="relative shrink-0">
          <div
            class="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-semibold text-white sm:h-7 sm:w-7 sm:text-2xs"
            :style="{ background: avatarColorFromName(entry.employeeName) }"
            aria-hidden="true"
          >
            {{ getInitials(entry.employeeName) }}
          </div>
          <span
            class="absolute -bottom-0.5 -right-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-kalbe-green px-0.5 text-[7px] font-bold text-white"
          >
            {{ entry.rank }}
          </span>
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-[10px] font-medium text-slate-700 sm:text-xs">
            {{ entry.employeeName }}
          </p>
          <p class="score-text mt-0.5 inline-flex items-center gap-0.5 text-[10px] sm:text-xs">
            <TrendingUp class="h-2.5 w-2.5 text-kalbe-lime" aria-hidden="true" />
            {{ formatCalories(entry.currentPoints) }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
