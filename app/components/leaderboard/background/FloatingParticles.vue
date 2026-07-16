<script setup lang="ts">
interface Particle {
  id: number
  left: number
  top: number
  size: number
  delay: number
  duration: number
  opacity: number
}

const prefersReducedMotion = usePreferredReducedMotion()

const particles = computed<Particle[]>(() => {
  if (prefersReducedMotion.value) return []
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1.5 + Math.random() * 2,
    delay: Math.random() * 6,
    duration: 10 + Math.random() * 8,
    opacity: 0.15 + Math.random() * 0.2,
  }))
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <span
      v-for="p in particles"
      :key="p.id"
      class="absolute rounded-full bg-kalbe-lime"
      :style="{
        left: `${p.left}%`,
        top: `${p.top}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        opacity: p.opacity,
        animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
      }"
    />
  </div>
</template>

<style scoped>
@keyframes particle-float {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-12px) translateX(4px); }
}
</style>
