<script setup lang="ts">
import { Code2 } from 'lucide-vue-next'
import { isDeveloperEmployee } from '~/utils/leaderboard'

const props = withDefaults(defineProps<{
  name: string
  size?: 'xs' | 'sm' | 'md' | 'podium'
  multiline?: boolean
  centered?: boolean
  /** When true, only render the IT badge (e.g. pinned on avatar). */
  badgeOnly?: boolean
  /** Hide the IT badge when name is shown elsewhere with badge on avatar. */
  hideBadge?: boolean
}>(), {
  size: 'sm',
  multiline: false,
  centered: false,
  badgeOnly: false,
  hideBadge: false,
})

const isDeveloper = computed(() => isDeveloperEmployee(props.name))
const displayName = computed(() => props.name.trim())
const showBadge = computed(() => isDeveloper.value && !props.hideBadge)

const nameClass = computed(() => {
  if (props.size === 'podium') {
    return 'text-[9px] font-bold leading-snug text-slate-800 sm:text-[10px] md:text-xs'
  }
  if (props.size === 'md') return 'text-[10px] font-bold text-slate-800 sm:text-xs'
  if (props.size === 'xs') return 'text-[10px] font-medium text-slate-700 sm:text-xs'
  return 'text-xs font-semibold text-slate-800 sm:text-sm'
})

const badgeClass = computed(() => {
  if (props.size === 'podium') return 'developer-badge--podium'
  if (props.size === 'md') return 'developer-badge--md'
  if (props.size === 'xs') return 'developer-badge--xs'
  return 'developer-badge--sm'
})
</script>

<template>
  <span
    v-if="badgeOnly"
    v-show="isDeveloper"
    class="developer-badge"
    :class="badgeClass"
    title="Platform Developer"
  >
    <span>IT</span>
  </span>

  <span
    v-else
    class="inline-flex min-w-0 max-w-full items-center gap-1"
    :class="[
      centered ? 'justify-center' : '',
      multiline ? 'flex-wrap' : '',
    ]"
  >
    <span
      class="text-slate-800"
      :class="[
        nameClass,
        multiline ? 'line-clamp-2 text-center leading-snug' : 'truncate',
      ]"
    >
      {{ displayName }}
    </span>

    <span
      v-if="showBadge"
      class="developer-badge shrink-0"
      :class="badgeClass"
      title="Platform Developer"
    >
      <Code2
        v-if="size !== 'podium' && size !== 'xs'"
        class="developer-badge__icon"
        aria-hidden="true"
      />
      <span>IT</span>
    </span>
  </span>
</template>
