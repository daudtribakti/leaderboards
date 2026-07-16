<script setup lang="ts">
import { Crown, Sparkles, TrendingUp } from 'lucide-vue-next'
import type { LeaderboardEntry } from '~/types/leaderboard'
import { avatarColorFromName, formatCalories, getInitials } from '~/utils/leaderboard'

const props = defineProps<{
  entry: LeaderboardEntry
  place: 1 | 2 | 3
}>()

const initials = computed(() => getInitials(props.entry.employeeName))
const avatarBg = computed(() => avatarColorFromName(props.entry.employeeName))

const placeMeta = computed(() => {
  if (props.place === 1) {
    return {
      label: 'Champion',
      avatar: 'h-20 w-20 text-xl sm:h-28 sm:w-28 sm:text-3xl lg:h-32 lg:w-32',
      ring: 'ring-[var(--gold)] shadow-gold',
      name: 'text-sm sm:text-lg lg:text-xl',
      score: 'text-sm sm:text-lg lg:text-xl',
    }
  }
  if (props.place === 2) {
    return {
      label: 'Runner-up',
      avatar: 'h-14 w-14 text-sm sm:h-20 sm:w-20 sm:text-xl lg:h-24 lg:w-24',
      ring: 'ring-[var(--silver)] shadow-[0_0_24px_rgba(192,197,206,0.25)]',
      name: 'text-xs sm:text-base lg:text-lg',
      score: 'text-xs sm:text-base',
    }
  }
  return {
    label: 'Third place',
    avatar: 'h-14 w-14 text-sm sm:h-20 sm:w-20 sm:text-xl lg:h-24 lg:w-24',
    ring: 'ring-[var(--bronze)] shadow-[0_0_24px_rgba(205,127,50,0.3)]',
    name: 'text-xs sm:text-base lg:text-lg',
    score: 'text-xs sm:text-base',
  }
})
</script>

<template>
  <article
    class="relative flex w-full flex-col items-center text-center"
    :aria-label="`Rank ${entry.rank}, ${entry.employeeName}, ${entry.currentPoints} calories`"
  >
    <div
      v-if="place === 1"
      class="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center gap-1 sm:-top-6"
      aria-hidden="true"
    >
      <Sparkles class="h-3.5 w-3.5 animate-sparkle text-[var(--gold)] sm:h-4 sm:w-4" />
      <Crown class="h-6 w-6 text-[var(--gold)] drop-shadow-[0_0_12px_rgba(245,197,66,0.8)] sm:h-8 sm:w-8" />
      <Sparkles class="h-3.5 w-3.5 animate-sparkle text-[var(--gold)] sm:h-4 sm:w-4" style="animation-delay: 0.4s" />
    </div>

    <LeaderboardRankBadge
      :rank="place"
      :size="place === 1 ? 'lg' : 'md'"
      class="mb-2 sm:mb-3"
    />

    <div
      class="mb-2 flex items-center justify-center rounded-full font-bold text-white ring-4 ring-offset-2 ring-offset-[var(--bg-purple-deep)] sm:mb-3"
      :class="[placeMeta.avatar, placeMeta.ring, place === 1 ? 'animate-float' : '']"
      :style="{ background: avatarBg }"
      aria-hidden="true"
    >
      {{ initials }}
    </div>

    <p
      class="w-full truncate px-1 font-display font-bold leading-tight text-white"
      :class="placeMeta.name"
    >
      {{ entry.employeeName }}
    </p>

    <p class="mt-0.5 hidden text-[10px] text-white/40 sm:block sm:text-xs">
      ID {{ entry.employeeId }}
    </p>

    <p class="score-text mt-1.5 inline-flex items-center gap-1 font-bold" :class="placeMeta.score">
      <TrendingUp class="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
      {{ formatCalories(entry.currentPoints) }}
      <span class="text-[10px] font-medium text-white/40 sm:text-xs">cal</span>
    </p>

    <p class="mt-0.5 text-[10px] text-white/40 sm:text-xs">
      Total {{ formatCalories(entry.totalPoints) }}
    </p>

    <div class="mt-2 flex flex-wrap items-center justify-center gap-1.5">
      <LeaderboardCompanyBadge :company="entry.company" compact />
      <LeaderboardCategoryBadge :category="entry.category" />
    </div>

    <p class="mt-2 hidden text-[10px] font-semibold uppercase tracking-wider text-white/35 sm:block">
      {{ placeMeta.label }}
    </p>

    <LeaderboardPodiumStage :place="place" />
  </article>
</template>
