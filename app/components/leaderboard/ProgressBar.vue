<script setup lang="ts">
const props = withDefaults(defineProps<{
  percent: number
  label?: string
}>(), {
  label: 'Progress toward leader',
})

const barRef = ref<HTMLElement | null>(null)
const { animateProgress } = useLeaderboardAnimations()

function syncWidth() {
  nextTick(() => animateProgress(barRef.value, props.percent))
}

onMounted(syncWidth)
watch(() => props.percent, syncWidth)
</script>

<template>
  <div
    class="h-2 w-full overflow-hidden rounded-full bg-white/10"
    role="progressbar"
    :aria-valuenow="Math.round(percent)"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="label"
  >
    <div
      ref="barRef"
      class="h-full w-0 rounded-full bg-gradient-to-r from-[var(--kalbe-red)] via-[var(--accent-orange)] to-[var(--gold)] shadow-[0_0_12px_rgba(245,197,66,0.45)]"
    />
  </div>
</template>
