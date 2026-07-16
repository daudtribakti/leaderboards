<script setup lang="ts">
import { WifiOff, RefreshCw } from 'lucide-vue-next'

defineProps<{
  message?: string
}>()

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-slate-100 bg-white px-6 py-10 text-center shadow-card">
    <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
      <WifiOff class="h-6 w-6 text-red-500" aria-hidden="true" />
    </div>
    <h3 class="text-lg font-bold text-kalbe-green-dark">
      Something went wrong
    </h3>
    <p class="mt-1.5 text-sm text-slate-400">
      {{ message || 'We could not load the live leaderboard.' }}
    </p>
    <button
      type="button"
      class="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-kalbe-green px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-kalbe-green-deep"
      @click="emit('retry')"
    >
      <RefreshCw class="h-4 w-4" aria-hidden="true" />
      Retry
    </button>
  </div>
</template>
