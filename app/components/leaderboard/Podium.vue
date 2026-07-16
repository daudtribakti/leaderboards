<script setup lang="ts">
import confetti from 'canvas-confetti'
import type { LeaderboardEntry } from '~/types/leaderboard'

const props = defineProps<{
  entries: LeaderboardEntry[]
}>()

const rootRef = ref<HTMLElement | null>(null)
const championRef = ref<HTMLElement | null>(null)
const { revealPodium, floatElement, prefersReducedMotion } = useLeaderboardAnimations()
const hasFiredConfetti = useState('podium-confetti-fired', () => false)
let floatTween: ReturnType<typeof floatElement> = null

const first = computed(() => props.entries.find(e => e.rank === 1) ?? props.entries[0])
const second = computed(() => props.entries.find(e => e.rank === 2) ?? props.entries[1])
const third = computed(() => props.entries.find(e => e.rank === 3) ?? props.entries[2])

function fireConfetti() {
  if (prefersReducedMotion.value || hasFiredConfetti.value || props.entries.length === 0) return
  hasFiredConfetti.value = true

  setTimeout(() => {
    confetti({
      origin: { y: 0.32 },
      zIndex: 40,
      particleCount: 50,
      spread: 55,
      disableForReducedMotion: true,
      colors: ['#15803D', '#84CC16', '#CA8A04', '#FDE047', '#ffffff'],
    })
  }, 600)
}

function playEntrance() {
  nextTick(() => {
    if (!rootRef.value) return
    const cards = rootRef.value.querySelectorAll('[data-podium-card]')
    revealPodium(rootRef.value, cards)

    if (championRef.value && !prefersReducedMotion.value) {
      floatTween?.kill()
      floatTween = floatElement(championRef.value)
    }

    fireConfetti()
  })
}

onMounted(playEntrance)

watch(
  () => props.entries.map(e => `${e.gender}-${e.employeeId}`).join(','),
  () => {
    playEntrance()
  },
)

onUnmounted(() => {
  floatTween?.kill()
})
</script>

<template>
  <section
    ref="rootRef"
    aria-labelledby="podium-heading"
    class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
  >
    <div data-podium-heading class="mb-4 text-center sm:mb-5">
      <h2 id="podium-heading" class="text-base font-bold text-kalbe-green-dark sm:text-lg">
        Top Performers
      </h2>
      <p class="mt-0.5 text-xs text-slate-400">
        Burn for Good champions
      </p>
    </div>

    <div
      v-if="entries.length > 0"
      data-podium-arena
      class="podium-arena px-3 pb-4 pt-6 sm:px-6 sm:pb-6 sm:pt-8"
    >
      <div class="relative flex items-end justify-center gap-2 sm:gap-4 lg:gap-6">
        <div
          v-if="second"
          data-podium-card
          class="w-[30%] max-w-[220px]"
        >
          <LeaderboardPodiumCard :entry="second" :place="2" />
        </div>

        <div
          v-if="first"
          ref="championRef"
          data-podium-card
          class="w-[36%] max-w-[260px]"
        >
          <LeaderboardPodiumCard :entry="first" :place="1" />
        </div>

        <div
          v-if="third"
          data-podium-card
          class="w-[30%] max-w-[220px]"
        >
          <LeaderboardPodiumCard :entry="third" :place="3" />
        </div>
      </div>
    </div>
  </section>
</template>
