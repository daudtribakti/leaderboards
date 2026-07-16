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

const rootRef = ref<HTMLElement | null>(null)
const { fadeSlideUp } = useLeaderboardAnimations()

const cards = computed(() => [
  {
    key: 'total',
    label: 'Total Participants',
    value: props.stats.totalParticipants,
    icon: Users,
    accent: 'from-rose-500/20 to-transparent',
  },
  {
    key: 'highest',
    label: 'Highest Calories',
    value: props.stats.highestCalories,
    icon: Flame,
    accent: 'from-amber-500/20 to-transparent',
  },
  {
    key: 'average',
    label: 'Average Calories',
    value: props.stats.averageCalories,
    icon: ChartNoAxesColumn,
    accent: 'from-orange-500/20 to-transparent',
  },
  {
    key: 'companies',
    label: 'Companies Displayed',
    value: props.stats.companiesDisplayed,
    icon: Building2,
    accent: 'from-sky-500/20 to-transparent',
  },
  {
    key: 'male',
    label: 'Male Participants',
    value: props.stats.maleParticipants,
    icon: Mars,
    accent: 'from-blue-500/20 to-transparent',
  },
  {
    key: 'female',
    label: 'Female Participants',
    value: props.stats.femaleParticipants,
    icon: Venus,
    accent: 'from-pink-500/20 to-transparent',
  },
])

onMounted(() => {
  if (rootRef.value) {
    fadeSlideUp(rootRef.value.querySelectorAll('[data-stat-card]'), {
      delay: 0.15,
      stagger: 0.07,
    })
  }
})
</script>

<template>
  <section ref="rootRef" aria-labelledby="stats-heading" class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 id="stats-heading" class="sr-only">
      Leaderboard statistics
    </h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="card in cards"
        :key="card.key"
        data-stat-card
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
          <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors duration-200 group-hover:text-[var(--gold)]">
            <component :is="card.icon" class="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
