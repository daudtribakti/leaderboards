<script setup lang="ts">
import { Crown, Sparkles } from 'lucide-vue-next'
import type { LeaderboardEntry } from '~/types/leaderboard'
import { avatarColorFromName, getInitials } from '~/utils/leaderboard'

const props = defineProps<{
  entry: LeaderboardEntry
  place: 1 | 2 | 3
}>()

const metal = computed(() => {
  if (props.place === 1) {
    return {
      ring: 'from-[#FFE082] via-[var(--gold)] to-[#B8860B]',
      glow: 'shadow-gold',
      badge: 'bg-gradient-to-br from-[#FFE082] to-[var(--gold)] text-[#3b2a00]',
      height: 'md:min-h-[300px] md:-translate-y-6',
      label: 'Champion',
    }
  }
  if (props.place === 2) {
    return {
      ring: 'from-white via-[var(--silver)] to-[#8a9099]',
      glow: 'shadow-[0_0_36px_rgba(192,197,206,0.25)]',
      badge: 'bg-gradient-to-br from-white to-[var(--silver)] text-[#2a2e35]',
      height: 'md:min-h-[260px]',
      label: 'Runner-up',
    }
  }
  return {
    ring: 'from-[#E8A862] via-[var(--bronze)] to-[#8B5A2B]',
    glow: 'shadow-[0_0_36px_rgba(205,127,50,0.3)]',
    badge: 'bg-gradient-to-br from-[#E8A862] to-[var(--bronze)] text-[#2e1a08]',
    height: 'md:min-h-[240px]',
    label: 'Third place',
  }
})

const initials = computed(() => getInitials(props.entry.employeeName))
const avatarBg = computed(() => avatarColorFromName(props.entry.employeeName))
</script>

<template>
  <article
    class="relative flex w-full max-w-sm flex-col items-center rounded-3xl border border-white/10 bg-white/[0.05] p-6 text-center shadow-glass backdrop-blur-xl transition-transform duration-200"
    :class="[metal.height, metal.glow, place === 1 ? 'animate-float' : '']"
    :aria-label="`Rank ${entry.rank}, ${entry.employeeName}, ${entry.currentPoints} calories`"
  >
    <!-- Metal top accent -->
    <div
      class="absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r opacity-90"
      :class="metal.ring"
      aria-hidden="true"
    />

    <div
      v-if="place === 1"
      class="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1"
      aria-hidden="true"
    >
      <Sparkles class="h-4 w-4 animate-sparkle text-[var(--gold)]" />
      <Crown class="h-8 w-8 text-[var(--gold)] drop-shadow-[0_0_12px_rgba(245,197,66,0.8)]" />
      <Sparkles class="h-4 w-4 animate-sparkle text-[var(--gold)]" style="animation-delay: 0.4s" />
    </div>

    <div
      class="mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold shadow-lg"
      :class="metal.badge"
    >
      #{{ entry.rank }}
    </div>

    <div
      class="mb-4 flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold text-white ring-4 ring-white/10"
      :style="{ background: avatarBg }"
      aria-hidden="true"
    >
      {{ initials }}
    </div>

    <p class="font-display text-lg font-bold leading-tight text-white sm:text-xl">
      {{ entry.employeeName }}
    </p>
    <p class="mt-1 text-xs text-white/45">
      ID {{ entry.employeeId }}
    </p>

    <div class="mt-3 flex flex-wrap items-center justify-center gap-2">
      <LeaderboardCompanyBadge :company="entry.company" compact />
      <LeaderboardCategoryBadge :category="entry.category" />
    </div>

    <p class="mt-5 text-xs font-medium uppercase tracking-wider text-white/40">
      {{ metal.label }} · Current calories
    </p>
    <p class="mt-1 font-display text-3xl font-extrabold tracking-tight text-white">
      <LeaderboardAnimatedCounter :value="entry.currentPoints" />
    </p>
    <p class="mt-1 text-xs text-white/40">
      Total <LeaderboardAnimatedCounter :value="entry.totalPoints" />
    </p>
  </article>
</template>
