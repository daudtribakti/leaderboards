<script setup lang="ts">
import {
  Users,
  Flame,
  ChartNoAxesColumn,
  Building2,
  Mars,
  Venus,
} from 'lucide-vue-next'
import type { LeaderboardStats } from '~/types/leaderboard'

const props = defineProps<{
  stats: LeaderboardStats
  embedded?: boolean
}>()

const cards = computed(() => [
  { key: 'total', label: 'Participants', value: props.stats.totalParticipants, icon: Users, bg: 'bg-emerald-50', tone: 'text-kalbe-green' },
  { key: 'highest', label: 'Highest', value: props.stats.highestCalories, icon: Flame, bg: 'bg-amber-50', tone: 'text-amber-600' },
  { key: 'average', label: 'Average', value: props.stats.averageCalories, icon: ChartNoAxesColumn, bg: 'bg-sky-50', tone: 'text-sky-600' },
  { key: 'companies', label: 'Companies', value: props.stats.companiesDisplayed, icon: Building2, bg: 'bg-emerald-50', tone: 'text-kalbe-green-deep' },
  { key: 'male', label: 'Male', value: props.stats.maleParticipants, icon: Mars, bg: 'bg-blue-50', tone: 'text-blue-600' },
  { key: 'female', label: 'Female', value: props.stats.femaleParticipants, icon: Venus, bg: 'bg-pink-50', tone: 'text-pink-600' },
])
</script>

<template>
  <section
    :aria-labelledby="embedded ? undefined : 'stats-heading'"
    :class="embedded ? '' : 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'"
  >
    <h2 v-if="!embedded" id="stats-heading" class="sr-only">
      Challenge overview
    </h2>

    <div class="grid grid-cols-3 gap-2 lg:grid-cols-6">
      <article
        v-for="card in cards"
        :key="card.key"
        data-stat-card
        class="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/50 px-2.5 py-2 sm:gap-2.5 sm:px-3 sm:py-2.5"
      >
        <div
          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg sm:h-8 sm:w-8"
          :class="[card.bg, card.tone]"
        >
          <component :is="card.icon" class="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
        </div>
        <div class="min-w-0">
          <p class="truncate text-2xs font-medium text-slate-400">
            {{ card.label }}
          </p>
          <p class="stat-value text-sm text-kalbe-green-dark sm:text-base">
            <LeaderboardAnimatedCounter :value="card.value" />
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
