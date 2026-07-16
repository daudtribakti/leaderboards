<script setup lang="ts">
import confetti from 'canvas-confetti'
import type { LeaderboardEntry } from '~/types/leaderboard'

const props = defineProps<{
  entries: LeaderboardEntry[]
}>()

const rootRef = ref<HTMLElement | null>(null)
const { revealPodium, prefersReducedMotion } = useLeaderboardAnimations()
const hasFiredConfetti = useState('podium-confetti-fired', () => false)

const first = computed(() => props.entries.find(e => e.rank === 1) ?? props.entries[0])
const second = computed(() => props.entries.find(e => e.rank === 2) ?? props.entries[1])
const third = computed(() => props.entries.find(e => e.rank === 3) ?? props.entries[2])

function fireConfetti() {
  if (prefersReducedMotion.value || hasFiredConfetti.value || props.entries.length === 0) return
  hasFiredConfetti.value = true

  const defaults = {
    origin: { y: 0.35 },
    zIndex: 40,
    disableForReducedMotion: true,
  }

  confetti({
    ...defaults,
    particleCount: 80,
    spread: 70,
    colors: ['#E4002B', '#F5C542', '#3B82F6', '#F97316', '#ffffff'],
  })

  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.45 },
      colors: ['#F5C542', '#E4002B'],
    })
    confetti({
      ...defaults,
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.45 },
      colors: ['#3B82F6', '#F97316'],
    })
  }, 250)
}

onMounted(() => {
  nextTick(() => {
    if (rootRef.value) {
      revealPodium(rootRef.value.querySelectorAll('[data-podium-card]'))
    }
    fireConfetti()
  })
})

watch(
  () => props.entries.length,
  (len) => {
    if (len > 0 && !hasFiredConfetti.value) {
      nextTick(fireConfetti)
    }
  },
)
</script>

<template>
  <section
    ref="rootRef"
    aria-labelledby="podium-heading"
    class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
  >
    <div class="mb-8 text-center">
      <h2 id="podium-heading" class="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
        Top Performers
      </h2>
      <p class="mt-2 text-sm text-white/50">
        The podium of Kalbe Donor Kalori champions
      </p>
    </div>

    <div
      v-if="entries.length > 0"
      class="flex flex-col items-center justify-center gap-5 md:flex-row md:items-end md:gap-6"
    >
      <!-- Mobile order: 1, 2, 3 · Desktop: 2, 1, 3 -->
      <div
        v-if="second"
        data-podium-card
        class="order-2 w-full max-w-sm md:order-1 md:w-1/3"
      >
        <LeaderboardPodiumCard :entry="second" :place="2" />
      </div>

      <div
        v-if="first"
        data-podium-card
        class="order-1 w-full max-w-sm md:order-2 md:w-[36%]"
      >
        <LeaderboardPodiumCard :entry="first" :place="1" />
      </div>

      <div
        v-if="third"
        data-podium-card
        class="order-3 w-full max-w-sm md:w-1/3"
      >
        <LeaderboardPodiumCard :entry="third" :place="3" />
      </div>
    </div>
  </section>
</template>
