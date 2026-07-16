<script setup lang="ts">
import { SearchX } from 'lucide-vue-next'
</script>

<template>
  <div class="glass-panel mx-auto flex max-w-lg flex-col items-center px-8 py-16 text-center">
    <div class="relative mb-6">
      <div class="absolute inset-0 rounded-full bg-[var(--kalbe-red)]/20 blur-2xl" />
      <svg
        viewBox="0 0 120 120"
        class="relative h-28 w-28 text-white/30"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="60" cy="60" r="52" stroke="currentColor" stroke-width="2" opacity="0.4" />
        <path
          d="M40 78c6-14 14-22 20-22s14 8 20 22"
          stroke="var(--gold)"
          stroke-width="3"
          stroke-linecap="round"
        />
        <path
          d="M48 42h24l-2 18H50L48 42Z"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linejoin="round"
        />
        <circle cx="60" cy="34" r="8" stroke="var(--gold)" stroke-width="2.5" />
      </svg>
      <SearchX class="absolute -bottom-1 -right-1 h-8 w-8 text-white/50" aria-hidden="true" />
    </div>
    <h3 class="font-display text-2xl font-bold tracking-tight text-white">
      No participants found.
    </h3>
    <p class="mt-2 max-w-sm text-sm leading-relaxed text-white/55">
      Try adjusting your gender, company, or search filters to see more results.
    </p>
  </div>
</template>
