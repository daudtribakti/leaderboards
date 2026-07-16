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
  return `−${formatCalories(props.entry.gapFromPrevious)} from #${props.entry.rank - 1}`
})
</script>

<template>
  <article
    class="gradient-border group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-glass backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-glow sm:p-4 lg:p-5"
    :aria-label="`Rank ${entry.rank}, ${entry.employeeName}, ${entry.currentPoints} calories`"
  >
    <div class="flex items-center gap-3 sm:gap-4">
      <!-- Mobile-first compact left: avatar + identity -->
      <div
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-white/15 transition-transform duration-200 group-hover:scale-105 sm:h-14 sm:w-14 sm:text-base"
        :style="{ background: avatarBg }"
        aria-hidden="true"
      >
        {{ initials }}
      </div>

      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <p class="truncate font-display text-sm font-bold text-white sm:text-lg">
            {{ entry.employeeName }}
          </p>
          <span
            class="hidden rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] capitalize text-white/50 sm:inline"
          >
            {{ entry.gender }}
          </span>
        </div>

        <p class="mt-0.5 truncate text-[11px] text-white/40 sm:text-xs">
          {{ companyShort }} · {{ entry.category }}
          <span class="hidden sm:inline"> · ID {{ entry.employeeId }}</span>
        </p>

        <!-- Badges: tablet+ -->
        <div class="mt-2 hidden flex-wrap gap-2 sm:flex">
          <LeaderboardCompanyBadge :company="entry.company" compact />
          <LeaderboardCategoryBadge :category="entry.category" />
        </div>

        <!-- Progress: tablet+ -->
        <div class="mt-2.5 hidden sm:block">
          <div class="mb-1 flex items-center justify-between gap-2 text-[11px] text-white/40">
            <span>{{ Math.round(entry.percentOfLeader) }}% of leader</span>
            <span
              v-if="gapLabel"
              class="inline-flex items-center gap-1"
            >
              <TrendingDown class="h-3 w-3" aria-hidden="true" />
              {{ gapLabel }}
            </span>
          </div>
          <LeaderboardProgressBar :percent="entry.percentOfLeader" />
        </div>

        <!-- Score on mobile under name -->
        <p class="score-text mt-1.5 inline-flex items-center gap-1 text-sm sm:hidden">
          <TrendingUp class="h-3.5 w-3.5" aria-hidden="true" />
          {{ formatCalories(entry.currentPoints) }}
        </p>
      </div>

      <!-- Desktop calories column -->
      <div class="hidden shrink-0 text-right sm:block sm:min-w-[110px] lg:min-w-[140px]">
        <p class="text-[10px] font-semibold uppercase tracking-wider text-white/40">
          Current
        </p>
        <p class="score-text font-display text-xl font-bold lg:text-2xl">
          <LeaderboardAnimatedCounter :value="entry.currentPoints" />
        </p>
        <p class="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
          Total
        </p>
        <p class="text-sm font-semibold text-white/70">
          <LeaderboardAnimatedCounter :value="entry.totalPoints" />
        </p>
      </div>

      <LeaderboardRankBadge :rank="entry.rank" size="md" class="shrink-0 sm:scale-110" />
    </div>
  </article>
</template>
