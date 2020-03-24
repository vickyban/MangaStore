import Animated, { Easing } from 'react-native-reanimated';
const { Value, Clock, cond, not, set, clockRunning, startClock, stopClock, eq, timing, block } = Animated;

export const createValue = (val) => ({
  value: new Value(val),
  clock: new Clock(),
  hasSprung: new Value(0),
  hasSprungBack: new Value(0)
})

export const runSpring = (clock, from, to) => {
  const state = {
    finished: new Value(0),
    position: new Value(from),
    time: new Value(0),
    frameTime: new Value(0),
  }
  const config = {
    duration: 400,
    toValue: new Value(to),
    easing: Easing.linear,
  }

  return block([
    startClock(clock),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position
  ])
}

export const springBack = (v, from, to) => [
  cond(eq(v.hasSprung, 0), [
    stopClock(v.clock),
    set(v.hasSprung, 1)
  ]),
  spring(v, from, to, 'hasSprungBack')
]


export const spring = (v, from, to, back = 'hasSprung') => cond(
  eq(v[back], 0), // has not sprung
  [
    set(v.value, runSpring(v.clock, from, to)),
    cond(not(clockRunning(v.clock)), set(v[back], 1))
  ]
)