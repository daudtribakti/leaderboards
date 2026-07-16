<script setup lang="ts">
import { Crown, Medal, TrendingUp } from 'lucide-vue-next'
import type { LeaderboardEntry } from '~/types/leaderboard'
import { avatarColorFromName, formatCalories, getInitials } from '~/utils/leaderboard'

const props = defineProps<{
  entry: LeaderboardEntry
  place: 1 | 2 | 3
}>()

const initials = computed(() => getInitials(props.entry.employeeName))
const avatarBg = computed(() => avatarColorFromName(props.entry.employeeName))

const theme = computed(() => {
  if (props.place === 1) {
    return {
      block: 'podium-block--gold',
      ring: 'podium-avatar-ring--gold',
      avatar: 'h-16 w-16 text-lg sm:h-20 sm:w-20 sm:text-xl',
      medal: 'bg-gradient-to-br from-amber-400 to-amber-600 text-white',
      label: '1st',
      offset: 'sm:-translate-y-3',
    }
  }
  if (props.place === 2) {
    return {
      block: 'podium-block--silver',
      ring: 'podium-avatar-ring--silver',
      avatar: 'h-13 w-13 text-sm sm:h-16 sm:w-16 sm:text-lg',
      medal: 'bg-gradient-to-br from-slate-300 to-slate-500 text-white',
      label: '2nd',
      offset: '',
    }
  }
  return {
    block: 'podium-block--bronze',
    ring: 'podium-avatar-ring--bronze',
    avatar: 'h-13 w-13 text-sm sm:h-16 sm:w-16 sm:text-lg',
    medal: 'bg-gradient-to-br from-orange-400 to-orange-600 text-white',
    label: '3rd',
    offset: '',
  }
})
</script>

<template>
  <article
    class="podium-card w-full px-1 sm:px-2"
    :class="theme.offset"
    :aria-label="`Rank ${entry.rank}, ${entry.employeeName}, ${entry.currentPoints} calories`"
  >
    <!-- Medal badge -->
    <div
      class="mb-2 flex items-center justify-center gap-1"
    >
      <div
        class="flex h-6 items-center gap-1 rounded-full px-2.5 text-2xs font-bold shadow-sm sm:h-7 sm:px-3 sm:text-xs"
        :class="theme.medal"
      >
        <Crown v-if="place === 1" class="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
        <Medal v-else class="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
        {{ theme.label }}
      </div>
    </div>

    <!-- Avatar -->
    <div
      class="relative z-10 mb-3 flex items-center justify-center rounded-full font-bold text-white"
      :class="[theme.avatar, theme.ring]"
      :style="{ background: avatarBg }"
      aria-hidden="true"
    >
      {{ initials }}
    </div>

    <!-- Info card -->
    <div class="mb-3 w-full rounded-xl bg-white/80 px-2 py-2 shadow-soft backdrop-blur-sm sm:px-3 sm:py-2.5">
      <p class="truncate text-xs font-bold text-slate-800 sm:text-sm">
        {{ entry.employeeName }}
      </p>
      <p class="score-text mt-1 inline-flex items-center justify-center gap-1 text-sm sm:text-base">
        <TrendingUp class="h-3.5 w-3.5 text-kalbe-lime" aria-hidden="true" />
        {{ formatCalories(entry.currentPoints) }}
      </p>
      <p class="mt-0.5 text-2xs text-slate-400">
        Total {{ formatCalories(entry.totalPoints) }}
      </p>
      <div class="mt-1.5 flex flex-wrap items-center justify-center gap-1">
        <LeaderboardCompanyBadge :company="entry.company" compact />
        <LeaderboardCategoryBadge :category="entry.category" />
      </div>
    </div>

    <!-- Podium block -->
    <div
      class="podium-block w-full"
      :class="theme.block"
      aria-hidden="true"
    >
      <span class="font-display text-2xl font-extrabold text-white/40 sm:text-3xl">
        {{ place }}
      </span>
    </div>
  </article>
</template>

<style scoped>
.h-13 { height: 3.25rem; width: 3.25rem; }
</style>
