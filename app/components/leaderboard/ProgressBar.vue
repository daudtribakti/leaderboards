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
    class="h-1 w-full overflow-hidden rounded-full bg-slate-100"
    role="progressbar"
    :aria-valuenow="Math.round(percent)"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="label"
  >
    <div
      ref="barRef"
      class="h-full w-0 rounded-full bg-gradient-to-r from-kalbe-green to-kalbe-lime"
    />
  </div>
</template>
