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
}>()

const cards = computed(() => [
  {
    key: 'total',
    label: 'Total Participants',
    short: 'Participants',
    value: props.stats.totalParticipants,
    icon: Users,
    accent: 'from-[var(--kalbe-red)]/25 to-transparent',
    iconColor: 'text-[var(--kalbe-red)]',
  },
  {
    key: 'highest',
    label: 'Highest Calories',
    short: 'Highest',
    value: props.stats.highestCalories,
    icon: Flame,
    accent: 'from-[var(--gold)]/25 to-transparent',
    iconColor: 'text-[var(--gold)]',
  },
  {
    key: 'average',
    label: 'Average Calories',
    short: 'Average',
    value: props.stats.averageCalories,
    icon: ChartNoAxesColumn,
    accent: 'from-[var(--accent-orange)]/25 to-transparent',
    iconColor: 'text-[var(--accent-orange)]',
  },
  {
    key: 'companies',
    label: 'Companies',
    short: 'Companies',
    value: props.stats.companiesDisplayed,
    icon: Building2,
    accent: 'from-neon-cyan/20 to-transparent',
    iconColor: 'text-neon-cyan',
  },
  {
    key: 'male',
    label: 'Male Participants',
    short: 'Male',
    value: props.stats.maleParticipants,
    icon: Mars,
    accent: 'from-sky-500/25 to-transparent',
    iconColor: 'text-sky-300',
  },
  {
    key: 'female',
    label: 'Female Participants',
    short: 'Female',
    value: props.stats.femaleParticipants,
    icon: Venus,
    accent: 'from-pink-500/25 to-transparent',
    iconColor: 'text-pink-300',
  },
])
</script>

<template>
  <section
    aria-labelledby="stats-heading"
    class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
  >
    <div class="mb-3 flex items-end justify-between gap-3 sm:mb-4">
      <div>
        <h2 id="stats-heading" class="font-display text-lg font-bold text-white sm:text-xl">
          Challenge Overview
        </h2>
        <p class="mt-0.5 text-xs text-white/45 sm:text-sm">
          Live snapshot across Agroveta &amp; Corporate Function
        </p>
      </div>
    </div>

    <!-- Mobile: horizontal chips -->
    <div
      class="flex gap-2.5 overflow-x-auto pb-1 md:hidden"
      style="scrollbar-width: none; -ms-overflow-style: none;"
    >
      <article
        v-for="card in cards"
        :key="`m-${card.key}`"
        class="neon-border flex shrink-0 items-center gap-2.5 rounded-2xl px-3.5 py-2.5"
      >
        <div
          class="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5"
          :class="card.iconColor"
        >
          <component :is="card.icon" class="h-4 w-4" aria-hidden="true" />
        </div>
        <div>
          <p class="text-[10px] font-medium uppercase tracking-wider text-white/40">
            {{ card.short }}
          </p>
          <p class="font-display text-base font-bold text-white">
            <LeaderboardAnimatedCounter :value="card.value" />
          </p>
        </div>
      </article>
    </div>

    <!-- Tablet/Desktop: informative grid -->
    <div class="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="card in cards"
        :key="card.key"
        class="gradient-border group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-glass backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-glow"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80"
          :class="card.accent"
          aria-hidden="true"
        />
        <div class="relative flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-medium uppercase tracking-wider text-white/45">
              {{ card.label }}
            </p>
            <p class="mt-2 font-display text-3xl font-bold tracking-tight text-white">
              <LeaderboardAnimatedCounter :value="card.value" />
            </p>
          </div>
          <div
            class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors duration-200"
            :class="card.iconColor"
          >
            <component :is="card.icon" class="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
