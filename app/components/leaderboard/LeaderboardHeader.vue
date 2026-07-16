<script setup lang="ts">
import { ArrowLeft, Flame, Leaf } from 'lucide-vue-next'

defineProps<{
  lastUpdatedAt?: Date | null
  companyLabel?: string
}>()

const rootRef = ref<HTMLElement | null>(null)
const { fadeSlideDown, runAfterPaint } = useLeaderboardAnimations()

function formatTime(value: Date | null | undefined) {
  if (!value) return null
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(value)
}

runAfterPaint(() => {
  if (!rootRef.value) return
  fadeSlideDown(rootRef.value.querySelectorAll('[data-enter]'), {
    stagger: 0.06,
    y: -10,
    duration: 0.45,
  })
})
</script>

<template>
  <header
    ref="rootRef"
    class="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-2xl backdrop-saturate-150"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-5 sm:py-2.5 lg:px-6">
      <div data-enter class="flex min-w-0 items-center gap-2 sm:gap-2.5">
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-kalbe-lime to-kalbe-green shadow-lime"
          aria-hidden="true"
        >
          <Leaf class="h-4 w-4 text-white" stroke-width="2.5" />
        </div>
        <div class="min-w-0">
          <p class="text-[9px] font-semibold uppercase tracking-widest text-kalbe-green sm:text-2xs">
            Donor Kalori
          </p>
          <h1 class="truncate text-sm font-bold text-kalbe-green-dark sm:text-base">
            Leaderboard
            <span
              v-if="companyLabel"
              class="font-semibold text-kalbe-green"
            >
              · {{ companyLabel }}
            </span>
          </h1>
        </div>
      </div>

      <div data-enter class="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium text-slate-500 transition-colors hover:bg-kalbe-mint hover:text-kalbe-green-deep sm:text-2xs"
        >
          <ArrowLeft class="h-3 w-3" aria-hidden="true" />
          <span class="hidden sm:inline">Ganti</span>
        </NuxtLink>
        <p
          v-if="lastUpdatedAt"
          class="hidden text-[10px] text-slate-400 sm:block"
        >
          {{ formatTime(lastUpdatedAt) }}
        </p>
        <span
          class="inline-flex items-center gap-1 rounded-full bg-kalbe-mint px-2 py-1 text-[10px] font-semibold text-kalbe-green-deep ring-1 ring-kalbe-green/10 sm:text-2xs"
        >
          <span class="relative flex h-1.5 w-1.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-kalbe-green opacity-50" />
            <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-kalbe-green" />
          </span>
          <Flame class="h-2.5 w-2.5 text-kalbe-green" aria-hidden="true" />
          Live
        </span>
      </div>
    </div>
  </header>
</template>
