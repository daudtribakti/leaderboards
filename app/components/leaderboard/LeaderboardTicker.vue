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
      class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      <article
        v-for="entry in entries"
        :key="entryKey(entry)"
        data-ticker-card
        class="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-2.5 py-2 transition-colors hover:bg-white hover:shadow-soft"
      >
        <div class="relative shrink-0">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full text-2xs font-semibold text-white"
            :style="{ background: avatarColorFromName(entry.employeeName) }"
            aria-hidden="true"
          >
            {{ getInitials(entry.employeeName) }}
          </div>
          <span
            class="absolute -bottom-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-kalbe-green px-0.5 text-[8px] font-bold text-white"
          >
            {{ entry.rank }}
          </span>
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-xs font-medium text-slate-700">
            {{ entry.employeeName }}
          </p>
          <p class="score-text mt-0.5 inline-flex items-center gap-0.5 text-xs">
            <TrendingUp class="h-2.5 w-2.5 text-kalbe-lime" aria-hidden="true" />
            {{ formatCalories(entry.currentPoints) }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
