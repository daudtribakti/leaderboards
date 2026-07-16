<script setup lang="ts">
import { formatCalories } from '~/utils/leaderboard'

const props = withDefaults(defineProps<{
  value: number
  duration?: number
  startDelay?: number
  play?: boolean
}>(), {
  duration: 2.2,
  startDelay: 0,
  play: true,
})

const display = ref(0)
const isClient = ref(false)
let delayTimer: ReturnType<typeof setTimeout> | null = null
let rafId = 0
let animationStart = 0
let animationFrom = 0
let animationTo = 0

const formatted = computed(() => formatCalories(display.value))

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3
}

function cancelAnimation() {
  if (delayTimer) {
    clearTimeout(delayTimer)
    delayTimer = null
  }
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
  animationStart = 0
}

function setDisplay(value: number) {
  display.value = Math.round(value)
}

function runCountUp(from: number, to: number) {
  cancelAnimation()
  animationFrom = from
  animationTo = to
  setDisplay(from)

  if (to === from) return

  const durationMs = Math.max(props.duration, 0.8) * 1000

  const step = (timestamp: number) => {
    if (!animationStart) animationStart = timestamp

    const elapsed = timestamp - animationStart
    const progress = Math.min(elapsed / durationMs, 1)
    const current = animationFrom + (animationTo - animationFrom) * easeOutCubic(progress)

    setDisplay(current)

    if (progress < 1) {
      rafId = requestAnimationFrame(step)
      return
    }

    setDisplay(animationTo)
    rafId = 0
    animationStart = 0
  }

  rafId = requestAnimationFrame(step)
}

function scheduleStart(fromZero = true) {
  cancelAnimation()

  if (!isClient.value || !props.play) {
    setDisplay(fromZero ? 0 : display.value)
    return
  }

  const start = () => {
    if (!props.play) return
    runCountUp(fromZero ? 0 : display.value, props.value)
  }

  if (props.startDelay > 0) {
    delayTimer = setTimeout(start, props.startDelay * 1000)
    return
  }

  start()
}

onMounted(() => {
  isClient.value = true
  if (props.play) scheduleStart(true)
})

watch(
  () => props.play,
  (play) => {
    if (!isClient.value) return

    if (play) {
      nextTick(() => scheduleStart(true))
      return
    }

    cancelAnimation()
    setDisplay(0)
  },
)

watch(
  () => props.value,
  (next, prev) => {
    if (!isClient.value || !props.play || next === prev) return
    runCountUp(display.value, next)
  },
)

onUnmounted(() => {
  cancelAnimation()
})
</script>

<template>
  <span class="tabular-nums">{{ formatted }}</span>
</template>
