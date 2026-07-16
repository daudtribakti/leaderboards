<script setup lang="ts">
const props = defineProps<{
  place: 1 | 2 | 3
}>()

const heightClass = computed(() => {
  if (props.place === 1) return 'h-16 sm:h-24 lg:h-28'
  if (props.place === 2) return 'h-12 sm:h-16 lg:h-20'
  return 'h-10 sm:h-16 lg:h-16'
})

const accentClass = computed(() => {
  if (props.place === 1) return 'shadow-[0_0_28px_rgba(245,197,66,0.25)]'
  if (props.place === 2) return 'shadow-[0_0_20px_rgba(192,197,206,0.15)]'
  return 'shadow-[0_0_20px_rgba(205,127,50,0.15)]'
})
</script>

<template>
  <div
    class="podium-stage mt-3 flex w-full items-center justify-center"
    :class="[heightClass, accentClass]"
    aria-hidden="true"
  >
    <span
      class="font-display text-xl font-extrabold opacity-40 sm:text-2xl lg:text-3xl"
      :class="{
        'text-[var(--gold)]': place === 1,
        'text-[var(--silver)]': place === 2,
        'text-[var(--bronze)]': place === 3,
      }"
    >
      {{ place }}
    </span>
  </div>
</template>
