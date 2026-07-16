<script setup lang="ts">
import { TrendingDown, TrendingUp } from 'lucide-vue-next'
import type { LeaderboardEntry } from '~/types/leaderboard'
import { avatarColorFromName, formatCalories, getInitials } from '~/utils/leaderboard'

const props = defineProps<{
  entry: LeaderboardEntry
}>()

const initials = computed(() => getInitials(props.entry.employeeName))
const avatarBg = computed(() => avatarColorFromName(props.entry.employeeName))

const companyShort = computed(() => {
  if (props.entry.company === 'PT Agroveta Husada Dharma') return 'Agroveta'
  if (props.entry.company === 'Corporate Function') return 'Corporate'
  return props.entry.company
})

const gapLabel = computed(() => {
  if (props.entry.gapFromPrevious == null) return null
  if (props.entry.gapFromPrevious === 0) return 'Tied'
  return `−${formatCalories(props.entry.gapFromPrevious)}`
})
</script>

<template>
  <article
    data-list-row
    class="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3 py-2.5 shadow-soft transition-all duration-200 hover:border-kalbe-green/20 hover:shadow-card sm:px-4 sm:py-3"
    :aria-label="`Rank ${entry.rank}, ${entry.employeeName}, ${entry.currentPoints} calories`"
  >
    <div
      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white sm:h-10 sm:w-10"
      :style="{ background: avatarBg }"
      aria-hidden="true"
    >
      {{ initials }}
    </div>

    <div class="min-w-0 flex-1">
      <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <p class="truncate text-sm font-semibold text-slate-800">
          {{ entry.employeeName }}
        </p>
        <p class="truncate text-2xs text-slate-400">
          {{ companyShort }} · {{ entry.category }}
        </p>
      </div>

      <div class="mt-1 flex items-center gap-3">
        <p class="score-text inline-flex items-center gap-1 text-sm">
          <TrendingUp class="h-3.5 w-3.5 text-kalbe-lime" aria-hidden="true" />
          {{ formatCalories(entry.currentPoints) }}
        </p>
        <p class="hidden text-2xs text-slate-400 sm:inline">
          Total {{ formatCalories(entry.totalPoints) }}
        </p>
        <span
          v-if="gapLabel"
          class="hidden items-center gap-0.5 text-2xs text-slate-400 md:inline-flex"
        >
          <TrendingDown class="h-3 w-3" aria-hidden="true" />
          {{ gapLabel }}
        </span>
      </div>

      <div class="mt-2 hidden sm:block">
        <LeaderboardProgressBar :percent="entry.percentOfLeader" />
      </div>
    </div>

    <div class="hidden shrink-0 text-right md:block">
      <p class="text-2xs font-medium text-slate-400">
        of leader
      </p>
      <p class="stat-value text-sm text-kalbe-green">
        {{ Math.round(entry.percentOfLeader) }}%
      </p>
    </div>

    <LeaderboardRankBadge :rank="entry.rank" size="sm" class="shrink-0" />
  </article>
</template>
