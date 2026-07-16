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
    <div class="absolute inset-0 bg-[var(--bg-purple-deep)]" />

    <!-- Purple-navy gradient wash -->
    <div
      class="absolute inset-0 opacity-70"
      style="
        background:
          radial-gradient(ellipse 80% 60% at 50% -20%, rgba(228, 0, 43, 0.2), transparent 55%),
          radial-gradient(ellipse 60% 50% at 100% 40%, rgba(168, 85, 247, 0.18), transparent 50%),
          radial-gradient(ellipse 50% 40% at 0% 80%, rgba(34, 211, 238, 0.08), transparent 50%),
          linear-gradient(to bottom, var(--bg-purple-mid), var(--bg-purple-deep));
      "
    />

    <div
      :ref="(el) => setBlobRef(el, 0)"
      class="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[var(--kalbe-red)]/20 blur-[100px] will-change-transform"
    />
    <div
      :ref="(el) => setBlobRef(el, 1)"
      class="absolute -right-24 top-1/3 h-[380px] w-[380px] rounded-full bg-neon-purple/20 blur-[110px] will-change-transform"
    />
    <div
      :ref="(el) => setBlobRef(el, 2)"
      class="absolute bottom-0 left-1/3 h-[340px] w-[340px] rounded-full bg-neon-cyan/10 blur-[100px] will-change-transform"
    />
    <div
      :ref="(el) => setBlobRef(el, 3)"
      class="absolute right-1/4 top-10 h-[200px] w-[200px] rounded-full bg-[var(--gold)]/10 blur-[80px] will-change-transform"
    />

    <!-- Subtle grid -->
    <div
      class="absolute inset-0 opacity-[0.03]"
      style="
        background-image:
          linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px);
        background-size: 64px 64px;
      "
    />
  </div>
</template>
