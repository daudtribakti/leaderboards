<script setup lang="ts">
import { WifiOff } from 'lucide-vue-next'
import { ArrowPathIcon } from '@heroicons/vue/24/solid'

defineProps<{
  message?: string
}>()

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="glass-panel mx-auto flex max-w-lg flex-col items-center px-8 py-16 text-center">
    <div class="relative mb-6">
      <div class="absolute inset-0 rounded-full bg-[var(--kalbe-red)]/25 blur-2xl" />
      <div class="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/5">
        <WifiOff class="h-12 w-12 text-[var(--kalbe-red)]" aria-hidden="true" />
      </div>
    </div>
    <h3 class="font-display text-2xl font-bold tracking-tight text-white">
      Something went wrong
    </h3>
    <p class="mt-2 max-w-sm text-sm leading-relaxed text-white/55">
      {{ message || 'We could not load the live leaderboard. Please try again.' }}
    </p>
    <button
      type="button"
      class="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--kalbe-red)] px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-colors duration-200 hover:bg-[#ff1a40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
      @click="emit('retry')"
    >
      <ArrowPathIcon class="h-4 w-4" aria-hidden="true" />
      Retry
    </button>
  </div>
</template>
