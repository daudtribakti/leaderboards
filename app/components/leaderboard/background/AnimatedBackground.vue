<script setup lang="ts">
const blobRefs = ref<HTMLElement[]>([])
const { x, y } = useMouse()
const { parallaxBlobs } = useLeaderboardAnimations()

function setBlobRef(el: Element | ComponentPublicInstance | null, index: number) {
  if (el && '$el' in (el as object)) return
  if (el instanceof HTMLElement) {
    blobRefs.value[index] = el
  }
}

onMounted(() => {
  nextTick(() => {
    parallaxBlobs(blobRefs.value.filter(Boolean), x, y)
  })
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div class="absolute inset-0 bg-[var(--bg-page)]" />

    <div
      class="absolute inset-0"
      style="
        background:
          radial-gradient(ellipse 60% 40% at 50% -5%, rgba(132, 204, 22, 0.1), transparent 55%),
          radial-gradient(ellipse 35% 30% at 95% 10%, rgba(56, 189, 248, 0.06), transparent 50%);
      "
    />

    <div
      :ref="(el) => setBlobRef(el, 0)"
      class="absolute -left-24 top-10 h-[280px] w-[280px] rounded-full bg-kalbe-lime/15 blur-[80px] will-change-transform"
    />
    <div
      :ref="(el) => setBlobRef(el, 1)"
      class="absolute -right-16 top-1/4 h-[240px] w-[240px] rounded-full bg-kalbe-green/8 blur-[90px] will-change-transform"
    />
  </div>
</template>
