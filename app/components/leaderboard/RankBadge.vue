<script setup lang="ts">
const props = withDefaults(defineProps<{
  rank: number
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md',
})

const isTopThree = computed(() => props.rank >= 1 && props.rank <= 3)

const label = computed(() => {
  const n = props.rank
  if (n === 1) return '1'
  if (n === 2) return '2'
  if (n === 3) return '3'
  return `${n}`
})

const sizeClass = computed(() => {
  if (props.size === 'lg') return 'h-10 w-10 text-sm'
  if (props.size === 'sm') return 'h-6 w-6 text-[10px]'
  return 'h-8 w-8 text-xs'
})

const styleClass = computed(() => {
  if (props.rank === 1) {
    return 'bg-gradient-to-br from-amber-300 via-gold to-amber-700 text-white shadow-gold ring-2 ring-amber-200/60'
  }
  if (props.rank === 2) {
    return 'bg-gradient-to-br from-slate-200 via-silver to-slate-400 text-slate-700 ring-2 ring-slate-200'
  }
  if (props.rank === 3) {
    return 'bg-gradient-to-br from-orange-300 via-bronze to-orange-700 text-white ring-2 ring-orange-200/60'
  }
  return 'bg-kalbe-mint text-kalbe-green-deep ring-1 ring-kalbe-green/15 font-semibold'
})
</script>

<template>
  <div
    class="inline-flex shrink-0 items-center justify-center rounded-full font-display font-bold tabular-nums"
    :class="[sizeClass, styleClass]"
    :aria-label="`Rank ${rank}`"
  >
    <span v-if="isTopThree && size !== 'sm'" class="text-[0.65em] font-extrabold opacity-90">
      {{ label }}
    </span>
    <span v-else>{{ label }}</span>
  </div>
</template>
