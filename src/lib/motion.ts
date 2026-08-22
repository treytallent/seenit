export const specs = {
  transitions: {
    snap: transition(0.15, 1218.47, 69.81, [0.27, 0.17, 0.21, 0.77]),
    ui: transition(0.25, 438.65, 41.89, [0.27, 0.17, 0.21, 0.77]),
    gentle: transition(0.35, 223.8, 29.92, [0.27, 0.17, 0.21, 0.77]),
    lively: transition(0.3, 304.62, 20.25, [0.23, 0.04, 0.36, 1.53]),
    ambient: transition(0.7, 55.95, 14.96, [0.27, 0.17, 0.21, 0.77]),
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
