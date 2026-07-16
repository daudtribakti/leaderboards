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
  return Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1.5 + Math.random() * 3,
    delay: Math.random() * 6,
    duration: 8 + Math.random() * 10,
    opacity: 0.15 + Math.random() * 0.35,
  }))
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <span
      v-for="p in particles"
      :key="p.id"
      class="absolute rounded-full bg-white"
      :style="{
        left: `${p.left}%`,
        top: `${p.top}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        opacity: p.opacity,
        animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
        boxShadow: '0 0 6px rgba(245, 197, 66, 0.35)',
      }"
    />
  </div>
</template>

<style scoped>
@keyframes particle-float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  33% {
    transform: translateY(-18px) translateX(8px);
  }
  66% {
    transform: translateY(10px) translateX(-6px);
  }
}
</style>
