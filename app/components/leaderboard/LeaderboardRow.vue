<script setup lang="ts">
import { TrendingDown, TrendingUp } from 'lucide-vue-next'
import type { LeaderboardEntry } from '~/types/leaderboard'
import {
  COMPANY_SHORT_LABELS,
  HEART_RATE_CALORIES_LABEL,
  type AllowedCompany,
} from '~/constants/leaderboard'
import { avatarColorFromName, formatCalories, getInitials, isDeveloperEmployee } from '~/utils/leaderboard'

const props = defineProps<{
  entry: LeaderboardEntry
}>()

const displayName = computed(() => props.entry.employeeName.trim())
const isDeveloper = computed(() => isDeveloperEmployee(props.entry.employeeName))
const initials = computed(() => getInitials(props.entry.employeeName))
const avatarBg = computed(() => avatarColorFromName(props.entry.employeeName))

const companyShort = computed(() => {
  if (props.entry.company in COMPANY_SHORT_LABELS) {
    return COMPANY_SHORT_LABELS[props.entry.company as AllowedCompany]
  }
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
    class="group flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-2.5 py-1.5 shadow-soft transition-all duration-200 hover:border-kalbe-green/20 hover:shadow-card sm:gap-2.5 sm:px-3 sm:py-2"
    :aria-label="`Rank ${entry.rank}, ${displayName}${isDeveloper ? ' IT' : ''}, ${entry.currentPoints} calories`"
  >
    <div
      class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white sm:h-8 sm:w-8 sm:text-xs"
      :style="{ background: avatarBg }"
      aria-hidden="true"
    >
      {{ initials }}
    </div>

    <div class="min-w-0 flex-1">
      <div class="flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-1.5 sm:gap-y-0">
        <LeaderboardEmployeeName :name="entry.employeeName" class="min-w-0 max-w-full" />
        <p class="truncate text-[10px] text-slate-400 sm:text-2xs">
          {{ companyShort }} · {{ entry.category }}
        </p>
      </div>

      <div class="mt-0.5 flex items-center gap-2 sm:gap-2.5">
        <p class="score-text inline-flex items-center gap-0.5 text-xs sm:text-sm">
          <TrendingUp class="h-3 w-3 text-kalbe-lime" aria-hidden="true" />
          {{ formatCalories(entry.currentPoints) }}
        </p>
        <p class="hidden text-[10px] text-slate-400 min-[400px]:inline">
          <span class="min-[400px]:inline sm:hidden">HR</span>
          <span class="hidden sm:inline">{{ HEART_RATE_CALORIES_LABEL }}</span>
          {{ formatCalories(entry.totalPoints) }}
        </p>
        <span
          v-if="gapLabel"
          class="hidden items-center gap-0.5 text-[10px] text-slate-400 md:inline-flex"
        >
          <TrendingDown class="h-2.5 w-2.5" aria-hidden="true" />
          {{ gapLabel }}
        </span>
      </div>

      <div class="mt-1 hidden sm:block">
        <LeaderboardProgressBar :percent="entry.percentOfLeader" />
      </div>
    </div>

    <div class="hidden shrink-0 text-right md:block">
      <p class="text-[9px] font-medium text-slate-400">
        of leader
      </p>
      <p class="stat-value text-xs text-kalbe-green">
        {{ Math.round(entry.percentOfLeader) }}%
      </p>
    </div>

    <LeaderboardRankBadge :rank="entry.rank" size="sm" class="shrink-0" />
  </article>
</template>
