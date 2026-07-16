<script setup lang="ts">
defineProps<{
  category: string
}>()

const toneMap: Record<string, string> = {
  Purpose: 'bg-violet-50 text-violet-700',
  Growth: 'bg-lime-50 text-lime-800',
  Hope: 'bg-sky-50 text-sky-700',
  Journey: 'bg-amber-50 text-amber-700',
}
</script>

<template>
  <span
    class="inline-flex items-center rounded px-1 py-px text-[9px] font-medium sm:rounded-md sm:px-1.5 sm:py-0.5 sm:text-2xs"
    :class="toneMap[category] ?? 'bg-slate-50 text-slate-600'"
  >
    {{ category }}
  </span>
</template>
