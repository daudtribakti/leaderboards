import type { gsap as GsapType } from 'gsap'

type RevealOptions = {
  delay?: number
  stagger?: number
  y?: number
  x?: number
  scale?: number
  duration?: number
  ease?: string
  clearProps?: string | boolean
}

export function useLeaderboardAnimations() {
  const { $gsap } = useNuxtApp()
  const gsap = $gsap as typeof GsapType
  const prefersReducedMotion = usePreferredReducedMotion()

  const duration = (sec: number) => (prefersReducedMotion.value ? 0 : sec)

  function canAnimate() {
    return import.meta.client && !!gsap && !prefersReducedMotion.value
  }

  function revealFrom(
    targets: gsap.TweenTarget,
    from: gsap.TweenVars,
    to: gsap.TweenVars,
    options: RevealOptions = {},
  ) {
    if (!import.meta.client || !gsap) return

    gsap.fromTo(
      targets,
      from,
      {
        ...to,
        duration: duration(options.duration ?? 0.7),
        delay: options.delay ?? 0,
        stagger: prefersReducedMotion.value ? 0 : (options.stagger ?? 0),
        ease: options.ease ?? 'power3.out',
        clearProps: options.clearProps ?? (prefersReducedMotion.value ? '' : 'transform,opacity'),
      },
    )
  }

  function fadeSlideUp(
    targets: gsap.TweenTarget,
    options: RevealOptions = {},
  ) {
    revealFrom(
      targets,
      { opacity: 0, y: options.y ?? 24 },
      { opacity: 1, y: 0 },
      { ...options, ease: options.ease ?? 'power3.out' },
    )
  }

  function fadeSlideDown(
    targets: gsap.TweenTarget,
    options: RevealOptions = {},
  ) {
    revealFrom(
      targets,
      { opacity: 0, y: options.y ?? -16 },
      { opacity: 1, y: 0 },
      { ...options, ease: options.ease ?? 'power3.out' },
    )
  }

  function scaleIn(
    targets: gsap.TweenTarget,
    options: RevealOptions = {},
  ) {
    revealFrom(
      targets,
      { opacity: 0, scale: options.scale ?? 0.94 },
      { opacity: 1, scale: 1 },
      { ...options, ease: options.ease ?? 'power2.out' },
    )
  }

  function staggerIn(
    container: HTMLElement | null,
    selector: string,
    options: RevealOptions = {},
  ) {
    if (!container) return
    const items = container.querySelectorAll(selector)
    if (!items.length) return

    fadeSlideUp(items, {
      y: options.y ?? 18,
      stagger: options.stagger ?? 0.05,
      delay: options.delay ?? 0,
      duration: options.duration ?? 0.55,
      ...options,
    })
  }

  function revealPodium(
    root: HTMLElement | null,
    cards: gsap.TweenTarget,
  ) {
    if (!import.meta.client || !gsap || !root) return

    const heading = root.querySelector('[data-podium-heading]')
    const arena = root.querySelector('[data-podium-arena]')

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    })

    if (prefersReducedMotion.value) {
      gsap.set([heading, arena, cards], { opacity: 1, y: 0, scale: 1 })
      return
    }

    if (heading) {
      tl.fromTo(
        heading,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: duration(0.5) },
      )
    }

    if (arena) {
      tl.fromTo(
        arena,
        { opacity: 0, scale: 0.96, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: duration(0.65), ease: 'power2.out' },
        '-=0.2',
      )
    }

    tl.fromTo(
      cards,
      { opacity: 0, y: 48, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: duration(0.75),
        stagger: 0.12,
        ease: 'back.out(1.35)',
      },
      '-=0.35',
    )
  }

  function revealListRows(
    container: HTMLElement | null,
    selector = '[data-list-row]',
  ) {
    if (!container) return
    const rows = container.querySelectorAll(selector)
    if (!rows.length) return

    revealFrom(
      rows,
      { opacity: 0, y: 16, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1 },
      {
        stagger: 0.04,
        duration: 0.5,
        ease: 'power2.out',
      },
    )
  }

  function crossfadePanel(
    outgoing: HTMLElement | null,
    incoming: HTMLElement | null,
  ) {
    if (!canAnimate() || !outgoing || !incoming) return

    const tl = gsap.timeline({ defaults: { duration: 0.28, ease: 'power2.inOut' } })
    tl.to(outgoing, { opacity: 0, y: -6 })
    tl.fromTo(incoming, { opacity: 0, y: 8 }, { opacity: 1, y: 0 }, 0)
  }

  function floatElement(el: gsap.TweenTarget) {
    if (!canAnimate()) return null

    return gsap.to(el, {
      y: -6,
      duration: 2.8,
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
    if (!canAnimate()) return

    const setters = blobs.map((blob, i) => ({
      x: gsap.quickSetter(blob, 'x', 'px'),
      y: gsap.quickSetter(blob, 'y', 'px'),
      factor: 10 + i * 6,
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
    canAnimate,
    fadeSlideUp,
    fadeSlideDown,
    scaleIn,
    staggerIn,
    revealPodium,
    revealListRows,
    crossfadePanel,
    floatElement,
    animateProgress,
    parallaxBlobs,
  }
}
