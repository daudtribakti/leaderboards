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
    return 'bg-emerald-50 text-emerald-700'
  }
  if (props.company === 'Corporate Function') {
    return 'bg-sky-50 text-sky-700'
  }
  return 'bg-slate-50 text-slate-600'
})
</script>

<template>
  <span
    class="inline-flex items-center rounded-md px-1.5 py-0.5 text-2xs font-medium"
    :class="toneClass"
    :title="company"
  >
    {{ compact ? shortLabel : company }}
  </span>
</template>
