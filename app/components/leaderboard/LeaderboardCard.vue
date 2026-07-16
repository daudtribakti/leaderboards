<script setup lang="ts">
import { TrendingDown } from 'lucide-vue-next'
import type { LeaderboardEntry } from '~/types/leaderboard'
import { avatarColorFromName, formatCalories, getInitials } from '~/utils/leaderboard'

const props = defineProps<{
  entry: LeaderboardEntry
}>()

const initials = computed(() => getInitials(props.entry.employeeName))
const avatarBg = computed(() => avatarColorFromName(props.entry.employeeName))

const gapLabel = computed(() => {
  if (props.entry.gapFromPrevious == null) return null
  if (props.entry.gapFromPrevious === 0) return 'Tied with previous'
  return `−${formatCalories(props.entry.gapFromPrevious)} cal from #${props.entry.rank - 1}`
})
</script>

<template>
  <article
    class="gradient-border group relative cursor-default overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-glass backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-glow sm:p-5"
  >
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
      <!-- Rank + Avatar -->
      <div class="flex items-center gap-3 sm:w-48 sm:shrink-0">
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-display text-sm font-bold text-white/80"
        >
          #{{ entry.rank }}
        </div>
        <div
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-white/10 transition-transform duration-200 group-hover:scale-105"
          :style="{ background: avatarBg }"
          aria-hidden="true"
        >
          {{ initials }}
        </div>
        <div class="min-w-0 sm:hidden">
          <p class="truncate font-display text-base font-bold text-white">
            {{ entry.employeeName }}
          </p>
          <p class="text-xs text-white/45">
            ID {{ entry.employeeId }}
          </p>
        </div>
      </div>

      <!-- Info -->
      <div class="min-w-0 flex-1">
        <div class="hidden sm:block">
          <p class="truncate font-display text-lg font-bold text-white">
            {{ entry.employeeName }}
          </p>
          <p class="text-xs text-white/45">
            ID {{ entry.employeeId }}
          </p>
        </div>

        <div class="mt-2 flex flex-wrap gap-2">
          <LeaderboardCompanyBadge :company="entry.company" compact />
          <LeaderboardCategoryBadge :category="entry.category" />
          <span
            class="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs capitalize text-white/55"
          >
            {{ entry.gender }}
          </span>
        </div>

        <div class="mt-3">
          <div class="mb-1.5 flex items-center justify-between gap-2 text-xs text-white/45">
            <span>{{ Math.round(entry.percentOfLeader) }}% of leader</span>
            <span
              v-if="gapLabel"
              class="inline-flex items-center gap-1 text-white/40"
            >
              <TrendingDown class="h-3 w-3" aria-hidden="true" />
              {{ gapLabel }}
            </span>
          </div>
          <LeaderboardProgressBar :percent="entry.percentOfLeader" />
        </div>
      </div>

      <!-- Calories -->
      <div class="flex shrink-0 items-end justify-between gap-6 border-t border-white/5 pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0 sm:text-right">
        <div>
          <p class="text-[10px] font-semibold uppercase tracking-wider text-white/40">
            Current
          </p>
          <p class="font-display text-2xl font-bold text-[var(--gold)]">
            <LeaderboardAnimatedCounter :value="entry.currentPoints" />
          </p>
        </div>
        <div>
          <p class="text-[10px] font-semibold uppercase tracking-wider text-white/40">
            Total
          </p>
          <p class="text-sm font-semibold text-white/70">
            <LeaderboardAnimatedCounter :value="entry.totalPoints" />
          </p>
        </div>
      </div>
    </div>
  </article>
</template>
