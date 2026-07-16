<script setup lang="ts">
import { COMPANY_SHORT_LABELS, type AllowedCompany } from '~/constants/leaderboard'

const props = defineProps<{
  company: string
  compact?: boolean
}>()

const isAllowed = computed(() =>
  props.company === 'PT Agroveta Husada Dharma' || props.company === 'Corporate Function',
)

const shortLabel = computed(() => {
  if (!isAllowed.value) return props.company
  return COMPANY_SHORT_LABELS[props.company as AllowedCompany]
})

const toneClass = computed(() => {
  if (props.company === 'PT Agroveta Husada Dharma') {
    return 'border-accent-blue/40 bg-accent-blue/15 text-sky-200'
  }
  if (props.company === 'Corporate Function') {
    return 'border-accent-orange/40 bg-accent-orange/15 text-orange-200'
  }
  return 'border-white/15 bg-white/10 text-white/80'
})
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide"
    :class="toneClass"
    :title="company"
  >
    {{ compact ? shortLabel : company }}
  </span>
</template>
