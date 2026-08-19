export const specs = {
  transitions: {
    snap: transition(0.2, 685.39, 52.36, [0.27, 0.59, 0.07, 1.07]),
    ui: transition(0.4, 171.35, 26.18, [0.26, 0.45, 0.09, 1.07]),
    gentle: transition(0.55, 90.63, 19.04, [0.26, 0.37, 0.11, 1.06]),
    lively: transition(0.3, 304.62, 20.25, [0.42, 1.69, 0.01, 0.9]),
    ambient: transition(0.7, 55.95, 14.96, [0.25, 0.34, 0.12, 1.05]),
  },
  stagger: { tight: 0.06, base: 0.09, relaxed: 0.18 },
  travel: { hover: 4, enter: 16, section: 32 },
}

function transition(
  duration: number,
  stiffness: number,
  damping: number,
  ease: readonly [number, number, number, number]
) {
  return { type: 'spring' as const, duration, stiffness, damping, ease }
}
