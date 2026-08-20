export const specs = {
  transitions: {
    snap: transition(0.15, 1218.47, 69.81, [0.27, 0.77, 0.05, 1.06]),
    ui: transition(0.25, 438.65, 41.89, [0.27, 0.6, 0.07, 1.07]),
    gentle: transition(0.35, 223.8, 29.92, [0.27, 0.52, 0.08, 1.07]),
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
