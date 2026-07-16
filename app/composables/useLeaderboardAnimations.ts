import type { gsap as GsapType } from 'gsap'

export function useLeaderboardAnimations() {
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof GsapType
  const prefersReducedMotion = usePreferredReducedMotion()

  const duration = (ms: number) => (prefersReducedMotion.value ? 0 : ms)

  function fadeSlideUp(
    targets: gsap.TweenTarget,
    options: { delay?: number, stagger?: number, y?: number } = {},
  ) {
    if (!import.meta.client || !gsap) return

    gsap.fromTo(
      targets,
      { opacity: 0, y: options.y ?? 28 },
      {
        opacity: 1,
        y: 0,
        duration: duration(0.65),
        delay: options.delay ?? 0,
        stagger: prefersReducedMotion.value ? 0 : (options.stagger ?? 0.08),
        ease: 'power3.out',
        clearProps: prefersReducedMotion.value ? '' : undefined,
      },
    )
  }

  function revealPodium(cards: gsap.TweenTarget) {
    if (!import.meta.client || !gsap) return

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.88 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: duration(0.75),
        stagger: prefersReducedMotion.value ? 0 : 0.15,
        ease: 'back.out(1.4)',
      },
    )
  }

  function floatElement(el: gsap.TweenTarget) {
    if (!import.meta.client || !gsap || prefersReducedMotion.value) return null

    return gsap.to(el, {
      y: -10,
      duration: 2.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }

  function animateProgress(el: HTMLElement | null, percent: number) {
    if (!el || !import.meta.client || !gsap) return

    gsap.to(el, {
      width: `${Math.min(100, Math.max(0, percent))}%`,
      duration: duration(0.8),
      ease: 'power2.out',
    })
  }

  function parallaxBlobs(
    blobs: HTMLElement[],
    mouseX: Ref<number>,
    mouseY: Ref<number>,
  ) {
    if (!import.meta.client || !gsap || prefersReducedMotion.value) return

    const setters = blobs.map((blob, i) => ({
      x: gsap.quickSetter(blob, 'x', 'px'),
      y: gsap.quickSetter(blob, 'y', 'px'),
      factor: 12 + i * 8,
    }))

    watchEffect(() => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (mouseX.value - cx) / cx
      const dy = (mouseY.value - cy) / cy

      setters.forEach(({ x, y, factor }) => {
        x(dx * factor)
        y(dy * factor)
      })
    })
  }

  return {
    gsap,
    prefersReducedMotion,
    duration,
    fadeSlideUp,
    revealPodium,
    floatElement,
    animateProgress,
    parallaxBlobs,
  }
}
