<script setup lang="ts">
import { Trophy, Flame } from 'lucide-vue-next'

defineProps<{
  lastUpdatedAt?: Date | null
}>()

const rootRef = ref<HTMLElement | null>(null)
const { fadeSlideUp } = useLeaderboardAnimations()

function formatTime(value: Date | null | undefined) {
  if (!value) return null
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(value)
}

onMounted(() => {
  if (rootRef.value) {
    fadeSlideUp(rootRef.value.querySelectorAll('[data-hero-animate]'), {
      stagger: 0.12,
      y: 32,
    })
  }
})
</script>

<template>
  <header ref="rootRef" class="relative overflow-hidden pb-4 pt-10 text-center sm:pt-14">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[var(--kalbe-red)]/15 to-transparent"
      aria-hidden="true"
    />

    <div
      data-hero-animate
      class="relative mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/70 backdrop-blur-md"
    >
      <Flame class="h-3.5 w-3.5 text-[var(--kalbe-red)]" aria-hidden="true" />
      Live Challenge
    </div>

    <h1
      data-hero-animate
      class="relative mx-auto max-w-4xl font-display text-[clamp(2.25rem,6vw,4.25rem)] font-extrabold leading-[1.05] tracking-tight"
    >
      <span class="inline-flex items-center justify-center gap-3">
        <Trophy class="h-8 w-8 shrink-0 text-[var(--gold)] drop-shadow-[0_0_16px_rgba(245,197,66,0.55)] sm:h-12 sm:w-12" aria-hidden="true" />
        <span class="bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
          Kalbe Donor Kalori
        </span>
      </span>
      <span class="mt-2 block bg-gradient-to-r from-[var(--kalbe-red)] via-[var(--gold)] to-[var(--accent-orange)] bg-clip-text text-transparent">
        Leaderboard
      </span>
    </h1>

    <p
      data-hero-animate
      class="relative mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
    >
      Track the best performers from PT Agroveta Husada Dharma and Corporate Function.
    </p>

    <p
      v-if="lastUpdatedAt"
      data-hero-animate
      class="relative mt-4 text-xs text-white/40"
    >
      Terakhir diperbarui: {{ formatTime(lastUpdatedAt) }}
      <span class="ml-2 inline-flex items-center gap-1 text-emerald-400/80">
        <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        Live
      </span>
    </p>
  </header>
</template>
