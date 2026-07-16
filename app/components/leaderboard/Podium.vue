<script setup lang="ts">
import type { LeaderboardEntry } from '~/types/leaderboard'

const props = defineProps<{
  entries: LeaderboardEntry[]
}>()

const rootRef = ref<HTMLElement | null>(null)
const { playPodiumEntrance, gsap } = useLeaderboardAnimations()
let podiumCtx: ReturnType<typeof gsap.context> | null = null
let podiumTimeline: gsap.core.Timeline | null = null
let hasPlayed = false

const first = computed(() => props.entries.find(e => e.rank === 1) ?? props.entries[0])
const second = computed(() => props.entries.find(e => e.rank === 2) ?? props.entries[1])
const third = computed(() => props.entries.find(e => e.rank === 3) ?? props.entries[2])

function playEntrance() {
  if (!import.meta.client || !rootRef.value || props.entries.length === 0) return

  nextTick(() => {
    requestAnimationFrame(() => {
      if (!rootRef.value) return

      podiumTimeline?.kill()
      podiumCtx?.revert()
      podiumCtx = gsap.context(() => {
        podiumTimeline = playPodiumEntrance(rootRef.value)
      }, rootRef.value)
      hasPlayed = true
    })
  })
}

defineExpose({ playEntrance })

onMounted(() => {
  playEntrance()
})

watch(
  () => props.entries.map(e => `${e.gender}-${e.employeeId}`).join(','),
  () => {
    if (hasPlayed) playEntrance()
  },
)

onUnmounted(() => {
  podiumTimeline?.kill()
  podiumCtx?.revert()
})
</script>

<template>
  <section
    ref="rootRef"
    data-podium-root
    aria-labelledby="podium-heading"
    class="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-6"
  >
    <div data-podium-heading class="mb-2 text-center sm:mb-2.5">
      <h2 id="podium-heading" class="text-sm font-bold text-kalbe-green-dark sm:text-base">
        Top Performers
      </h2>
      <p class="mt-0.5 text-[10px] text-slate-400 sm:text-2xs">
        Burn for Good champions
      </p>
    </div>

    <div
      v-if="entries.length > 0"
      data-podium-arena
      class="podium-arena px-2 pb-2.5 pt-3 sm:px-4 sm:pb-3.5 sm:pt-4"
    >
      <div class="relative flex items-end justify-center gap-1.5 px-0.5 sm:gap-3 lg:gap-4">
        <div
          v-if="second"
          data-podium-card
          class="min-w-0 flex-1 basis-0 sm:max-w-[180px]"
        >
          <LeaderboardPodiumCard :entry="second" :place="2" :score-delay="0.55" />
        </div>

        <div
          v-if="first"
          data-podium-card
          data-podium-champion
          class="min-w-0 flex-[1.12] basis-0 sm:max-w-[200px]"
        >
          <LeaderboardPodiumCard :entry="first" :place="1" :score-delay="0.7" />
        </div>

        <div
          v-if="third"
          data-podium-card
          class="min-w-0 flex-1 basis-0 sm:max-w-[180px]"
        >
          <LeaderboardPodiumCard :entry="third" :place="3" :score-delay="0.85" />
        </div>
      </div>
    </div>
  </section>
</template>
