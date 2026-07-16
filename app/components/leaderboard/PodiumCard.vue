<script setup lang="ts">
import { Crown, Medal, TrendingUp } from 'lucide-vue-next'
import type { LeaderboardEntry } from '~/types/leaderboard'
import { avatarColorFromName, formatCalories, getInitials } from '~/utils/leaderboard'

const props = defineProps<{
  entry: LeaderboardEntry
  place: 1 | 2 | 3
  scoreDelay?: number
}>()

const initials = computed(() => getInitials(props.entry.employeeName))
const avatarBg = computed(() => avatarColorFromName(props.entry.employeeName))
const scoreStartDelay = computed(() => props.scoreDelay ?? 1.2)

const theme = computed(() => {
  if (props.place === 1) {
    return {
      block: 'podium-block--gold',
      ring: 'podium-avatar-ring--gold',
      avatar: 'h-10 w-10 text-xs sm:h-14 sm:w-14 sm:text-base',
      medal: 'bg-gradient-to-br from-amber-400 to-amber-600 text-white',
      label: '1st',
      lift: 'sm:-translate-y-1',
    }
  }
  if (props.place === 2) {
    return {
      block: 'podium-block--silver',
      ring: 'podium-avatar-ring--silver',
      avatar: 'h-9 w-9 text-2xs sm:h-12 sm:w-12 sm:text-sm',
      medal: 'bg-gradient-to-br from-slate-300 to-slate-500 text-white',
      label: '2nd',
      lift: '',
    }
  }
  return {
    block: 'podium-block--bronze',
    ring: 'podium-avatar-ring--bronze',
    avatar: 'h-9 w-9 text-2xs sm:h-12 sm:w-12 sm:text-sm',
    medal: 'bg-gradient-to-br from-orange-400 to-orange-600 text-white',
    label: '3rd',
    lift: '',
  }
})
</script>

<template>
  <article
    class="podium-card w-full min-w-0"
    :class="theme.lift"
    :aria-label="`Rank ${entry.rank}, ${entry.employeeName}, ${entry.currentPoints} calories`"
  >
    <div data-podium-medal class="mb-1 flex justify-center sm:mb-1.5">
      <div
        class="inline-flex h-5 items-center gap-0.5 rounded-full px-1.5 text-[9px] font-bold shadow-sm sm:h-6 sm:px-2 sm:text-2xs"
        :class="theme.medal"
      >
        <Crown v-if="place === 1" class="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" aria-hidden="true" />
        <Medal v-else class="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" aria-hidden="true" />
        {{ theme.label }}
      </div>
    </div>

    <div
      data-podium-avatar
      class="mx-auto mb-1.5 flex shrink-0 items-center justify-center rounded-full font-bold text-white sm:mb-2"
      :class="[theme.avatar, theme.ring]"
      :style="{ background: avatarBg }"
      aria-hidden="true"
    >
      {{ initials }}
    </div>

    <div
      data-podium-info
      class="mb-1.5 w-full rounded-lg border border-slate-100 bg-white px-1.5 py-1 shadow-sm sm:mb-2 sm:px-2 sm:py-1.5"
    >
      <p class="line-clamp-2 text-[9px] font-bold leading-tight text-slate-800 sm:text-[10px]">
        {{ entry.employeeName }}
      </p>
      <p
        data-podium-score
        class="score-text mt-0.5 flex items-center justify-center gap-0.5 text-[11px] sm:text-sm"
      >
        <TrendingUp class="h-2.5 w-2.5 shrink-0 text-kalbe-lime sm:h-3 sm:w-3" aria-hidden="true" />
        <LeaderboardAnimatedCounter
          :value="entry.currentPoints"
          :start-delay="scoreStartDelay"
          :duration="0.9"
        />
      </p>
      <p class="mt-0.5 hidden text-[9px] text-slate-400 sm:block">
        Total {{ formatCalories(entry.totalPoints) }}
      </p>
      <div class="mt-0.5 flex flex-wrap items-center justify-center gap-0.5 sm:mt-1">
        <LeaderboardCompanyBadge :company="entry.company" compact />
        <LeaderboardCategoryBadge :category="entry.category" />
      </div>
    </div>

    <div
      data-podium-block-wrap
      class="w-full overflow-hidden rounded-b-lg"
    >
      <div
        data-podium-block
        class="podium-block w-full origin-bottom"
        :class="theme.block"
        aria-hidden="true"
      >
        <span class="font-display text-base font-extrabold text-white/40 sm:text-xl">
          {{ place }}
        </span>
      </div>
    </div>
  </article>
</template>
