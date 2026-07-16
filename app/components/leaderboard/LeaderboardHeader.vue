<script setup lang="ts">
import { Flame, Trophy, Zap } from 'lucide-vue-next'

defineProps<{
  lastUpdatedAt?: Date | null
}>()

function formatTime(value: Date | null | undefined) {
  if (!value) return null
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(value)
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-white/5 bg-[var(--bg-purple-deep)]/90 backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8">
      <div class="flex min-w-0 items-center gap-3 sm:gap-4">
        <div
          class="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-br from-[var(--kalbe-red)]/30 to-[var(--gold)]/20 shadow-neon-red sm:h-12 sm:w-12"
          aria-hidden="true"
        >
          <Trophy class="h-5 w-5 text-[var(--gold)] sm:h-6 sm:w-6" />
          <span class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--kalbe-red)]">
            <Zap class="h-2.5 w-2.5 text-white" />
          </span>
        </div>
        <div class="min-w-0 text-left">
          <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45 sm:text-xs">
            Kalbe Donor Kalori Challenge
          </p>
          <h1 class="font-display text-xl font-extrabold tracking-tight text-white sm:text-2xl lg:text-3xl">
            Leaderboard
          </h1>
        </div>
      </div>

      <div class="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-3">
        <p
          v-if="lastUpdatedAt"
          class="hidden text-xs text-white/40 sm:block"
        >
          Updated {{ formatTime(lastUpdatedAt) }}
        </p>
        <span
          class="inline-flex items-center gap-1.5 rounded-full border border-[var(--kalbe-red)]/40 bg-[var(--kalbe-red)]/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--kalbe-red)] shadow-neon-red sm:text-xs"
        >
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--kalbe-red)] opacity-60" />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-[var(--kalbe-red)]" />
          </span>
          <Flame class="h-3.5 w-3.5" aria-hidden="true" />
          Live
        </span>
        <p
          v-if="lastUpdatedAt"
          class="text-[10px] text-white/40 sm:hidden"
        >
          {{ formatTime(lastUpdatedAt) }}
        </p>
      </div>
    </div>
  </header>
</template>
