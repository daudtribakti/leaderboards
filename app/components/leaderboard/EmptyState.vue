<script setup lang="ts">
import { SearchX } from 'lucide-vue-next'
</script>

<template>
  <div class="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-slate-100 bg-white px-6 py-10 text-center shadow-card">
    <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-kalbe-mint">
      <SearchX class="h-6 w-6 text-kalbe-green" aria-hidden="true" />
    </div>
    <h3 class="text-lg font-bold text-kalbe-green-dark">
      No participants found
    </h3>
    <p class="mt-1.5 text-sm text-slate-400">
      Try adjusting your filters or search.
    </p>
  </div>
</template>
