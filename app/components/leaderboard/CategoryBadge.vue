<script setup lang="ts">
defineProps<{
  category: string
}>()

const toneMap: Record<string, string> = {
  Purpose: 'border-rose-400/30 bg-rose-500/10 text-rose-200',
  Growth: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
  Hope: 'border-violet-400/30 bg-violet-500/10 text-violet-200',
  Journey: 'border-amber-400/30 bg-amber-500/10 text-amber-200',
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
    :class="toneMap[category] ?? 'border-white/15 bg-white/10 text-white/70'"
  >
    {{ category }}
  </span>
</template>
