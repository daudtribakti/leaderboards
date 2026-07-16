<script setup lang="ts">
import { Activity, Crown, Medal, TrendingUp } from 'lucide-vue-next'
import type { LeaderboardEntry } from '~/types/leaderboard'
import { HEART_RATE_CALORIES_LABEL } from '~/constants/leaderboard'
import { avatarColorFromName, getInitials, isDeveloperEmployee } from '~/utils/leaderboard'

const props = defineProps<{
  entry: LeaderboardEntry
  place: 1 | 2 | 3
  scoreDelay?: number
  hrScoreDelay?: number
  animationKey?: number
}>()

const displayName = computed(() => props.entry.employeeName.trim())
const isDeveloper = computed(() => isDeveloperEmployee(props.entry.employeeName))
const initials = computed(() => getInitials(props.entry.employeeName))
const avatarBg = computed(() => avatarColorFromName(props.entry.employeeName))
const scoreStartDelay = computed(() => props.scoreDelay ?? 0.5)
const hrScoreStartDelay = computed(() => props.hrScoreDelay ?? scoreStartDelay.value + 0.45)
const countersReady = computed(() => (props.animationKey ?? 0) > 0)
const mainCounterKey = computed(() => `main-${props.animationKey}-${props.entry.employeeId}`)
const hrCounterKey = computed(() => `hr-${props.animationKey}-${props.entry.employeeId}`)

const theme = computed(() => {
  if (props.place === 1) {
    return {
      block: 'podium-block--gold',
      ring: 'podium-avatar-ring--gold',
      avatar: 'h-9 w-9 text-2xs sm:h-14 sm:w-14 sm:text-base md:h-16 md:w-16 md:text-lg',
      medal: 'podium-medal--gold',
      label: '1st',
      lift: 'sm:-translate-y-2',
      info: 'podium-info-card--gold',
      score: 'text-xs sm:text-base md:text-lg',
    }
  }
  if (props.place === 2) {
    return {
      block: 'podium-block--silver',
      ring: 'podium-avatar-ring--silver',
      avatar: 'h-8 w-8 text-[9px] sm:h-12 sm:w-12 sm:text-sm md:h-14 md:w-14 md:text-base',
      medal: 'podium-medal--silver',
      label: '2nd',
      lift: '',
      info: 'podium-info-card--silver',
      score: 'text-[11px] sm:text-sm md:text-base',
    }
  }
  return {
    block: 'podium-block--bronze',
    ring: 'podium-avatar-ring--bronze',
    avatar: 'h-8 w-8 text-[9px] sm:h-12 sm:w-12 sm:text-sm md:h-14 md:w-14 md:text-base',
    medal: 'podium-medal--bronze',
    label: '3rd',
    lift: '',
    info: 'podium-info-card--bronze',
    score: 'text-[11px] sm:text-sm md:text-base',
  }
})
</script>

<template>
  <article
    class="podium-card w-full min-w-0"
    :class="[theme.lift, place === 1 && 'podium-card--champion']"
    :aria-label="`Rank ${entry.rank}, ${displayName}${isDeveloper ? ' IT' : ''}, ${entry.currentPoints} calories`"
  >
    <div data-podium-medal class="mb-1 flex justify-center sm:mb-1.5">
      <div
        class="podium-medal inline-flex h-5 items-center gap-0.5 rounded-full px-1.5 text-[8px] font-bold sm:h-7 sm:gap-1 sm:px-2.5 sm:text-2xs"
        :class="theme.medal"
      >
        <Crown v-if="place === 1" class="h-2.5 w-2.5 shrink-0 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
        <Medal v-else class="h-2.5 w-2.5 shrink-0 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
        {{ theme.label }}
      </div>
    </div>

    <div class="relative mx-auto mb-1.5 w-fit sm:mb-2.5">
      <div
        data-podium-avatar
        class="podium-avatar flex shrink-0 items-center justify-center rounded-full font-bold text-white"
        :class="[theme.avatar, theme.ring]"
        :style="{ background: avatarBg }"
        aria-hidden="true"
      >
        {{ initials }}
      </div>
      <LeaderboardEmployeeName
        v-if="isDeveloper"
        :name="entry.employeeName"
        size="podium"
        badge-only
        class="absolute -bottom-0.5 -right-1 z-10 sm:-bottom-1 sm:-right-1"
      />
    </div>

    <div
      data-podium-info
      class="podium-info-card mb-1.5 w-full rounded-lg sm:mb-2.5 sm:rounded-xl sm:px-2.5 sm:py-2"
      :class="theme.info"
    >
      <div class="flex justify-center px-0.5">
        <LeaderboardEmployeeName
          :name="entry.employeeName"
          size="podium"
          multiline
          centered
          hide-badge
        />
      </div>

      <p
        data-podium-score
        class="score-text mt-1 flex items-center justify-center gap-0.5 font-bold sm:mt-1.5 sm:gap-1"
        :class="theme.score"
      >
        <TrendingUp class="h-2.5 w-2.5 shrink-0 text-kalbe-lime sm:h-3.5 sm:w-3.5" aria-hidden="true" />
        <LeaderboardAnimatedCounter
          :key="mainCounterKey"
          :value="entry.currentPoints"
          :play="countersReady"
          :start-delay="scoreStartDelay"
          :duration="2.4"
        />
      </p>

      <p class="mt-1 flex items-center justify-center gap-0.5 text-[8px] text-slate-400 sm:text-[10px]">
        <Activity class="h-2 w-2 shrink-0 text-slate-300 sm:h-2.5 sm:w-2.5" aria-hidden="true" />
        <span class="sm:hidden">HR</span>
        <span class="hidden sm:inline">{{ HEART_RATE_CALORIES_LABEL }}</span>
        <LeaderboardAnimatedCounter
          :key="hrCounterKey"
          :value="entry.totalPoints"
          :play="countersReady"
          :start-delay="hrScoreStartDelay"
          :duration="1.8"
        />
      </p>

      <div class="mt-1 hidden flex-wrap items-center justify-center gap-1 sm:mt-1.5 sm:flex">
        <LeaderboardCompanyBadge :company="entry.company" compact />
        <LeaderboardCategoryBadge :category="entry.category" />
      </div>
    </div>

    <div
      data-podium-block-wrap
      class="w-full overflow-hidden rounded-b-xl"
    >
      <div
        data-podium-block
        class="podium-block w-full origin-bottom"
        :class="theme.block"
        aria-hidden="true"
      >
        <span class="podium-block-rank font-display text-base font-extrabold sm:text-xl md:text-2xl">
          {{ place }}
        </span>
      </div>
    </div>
  </article>
</template>
