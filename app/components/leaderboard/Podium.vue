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
    colors: ['#E4002B', '#F5C542', '#a855f7', '#22d3ee', '#ffffff'],
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
      colors: ['#a855f7', '#22d3ee'],
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
    <div class="mb-5 text-center sm:mb-8">
      <h2
        id="podium-heading"
        class="font-display text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl"
      >
        Top Performers
      </h2>
      <p class="mt-1 text-xs text-white/45 sm:text-sm">
        The podium of Kalbe Donor Kalori champions
      </p>
    </div>

    <div
      v-if="entries.length > 0"
      class="flex items-end justify-center gap-2 sm:gap-6 lg:gap-10"
    >
      <!-- Order: 2 | 1 | 3 -->
      <div
        v-if="second"
        data-podium-card
        class="w-[30%] max-w-[200px] sm:max-w-[240px] lg:max-w-[280px]"
      >
        <LeaderboardPodiumCard :entry="second" :place="2" />
      </div>

      <div
        v-if="first"
        data-podium-card
        class="w-[38%] max-w-[240px] sm:max-w-[280px] lg:max-w-[320px]"
      >
        <LeaderboardPodiumCard :entry="first" :place="1" />
      </div>

      <div
        v-if="third"
        data-podium-card
        class="w-[30%] max-w-[200px] sm:max-w-[240px] lg:max-w-[280px]"
      >
        <LeaderboardPodiumCard :entry="third" :place="3" />
      </div>
    </div>
  </section>
</template>
