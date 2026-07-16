<script setup lang="ts">
const props = withDefaults(defineProps<{
  rank: number
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md',
})

const gradientId = useId()
const isTopThree = computed(() => props.rank >= 1 && props.rank <= 3)

const ordinal = computed(() => {
  const n = props.rank
  if (!isTopThree.value) return `${n}`
  if (n === 1) return '1st'
  if (n === 2) return '2nd'
  return '3rd'
})

const sizeClass = computed(() => {
  if (props.size === 'lg') return 'h-14 w-14 text-sm'
  if (props.size === 'sm') return 'h-8 w-8 text-[10px]'
  return 'h-10 w-10 text-xs'
})

const metalClass = computed(() => {
  if (props.rank === 1) {
    return 'from-[#FFE082] via-[var(--gold)] to-[#B8860B] text-[#3b2a00] shadow-gold'
  }
  if (props.rank === 2) {
    return 'from-white via-[var(--silver)] to-[#8a9099] text-[#2a2e35] shadow-[0_0_20px_rgba(192,197,206,0.25)]'
  }
  if (props.rank === 3) {
    return 'from-[#E8A862] via-[var(--bronze)] to-[#8B5A2B] text-[#2e1a08] shadow-[0_0_20px_rgba(205,127,50,0.3)]'
  }
  return 'border border-[var(--gold)]/60 bg-[var(--bg-purple-mid)] text-[var(--gold)]'
})
</script>

<template>
  <div
    class="relative inline-flex shrink-0 items-center justify-center font-display font-extrabold"
    :class="sizeClass"
    :aria-label="`Rank ${rank}`"
  >
    <!-- Laurel-style ring for top 3 -->
    <svg
      v-if="isTopThree"
      class="absolute inset-0 h-full w-full"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient :id="gradientId" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" :stop-color="rank === 1 ? '#FFE082' : rank === 2 ? '#FFFFFF' : '#E8A862'" />
          <stop offset="100%" :stop-color="rank === 1 ? '#B8860B' : rank === 2 ? '#8a9099' : '#8B5A2B'" />
        </linearGradient>
      </defs>
      <!-- Left laurel -->
      <path
        d="M18 8c-4 3-7 8-7 14 0 4 1.5 7 3.5 9M16 12c-2 2.5-3 5.5-3 8.5M14 18c-1 2-1.5 4-1.5 6"
        :stroke="`url(#${gradientId})`"
        stroke-width="1.6"
        stroke-linecap="round"
      />
      <!-- Right laurel -->
      <path
        d="M30 8c4 3 7 8 7 14 0 4-1.5 7-3.5 9M32 12c2 2.5 3 5.5 3 8.5M34 18c1 2 1.5 4 1.5 6"
        :stroke="`url(#${gradientId})`"
        stroke-width="1.6"
        stroke-linecap="round"
      />
      <!-- Bottom ribbon tips -->
      <path
        d="M14.5 31c2 2.5 5 4 9.5 4s7.5-1.5 9.5-4"
        :stroke="`url(#${gradientId})`"
        stroke-width="1.4"
        stroke-linecap="round"
      />
    </svg>

    <span
      class="relative z-[1] flex h-[70%] w-[70%] items-center justify-center rounded-full"
      :class="[isTopThree ? 'bg-gradient-to-br' : '', metalClass]"
    >
      {{ ordinal }}
    </span>
  </div>
</template>
