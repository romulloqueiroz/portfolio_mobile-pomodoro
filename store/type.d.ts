export interface Pomodoro {
  isStarted: boolean
  minutes: number
  selected : string
  round: number
}

export interface PomodoroState {
  pomodoro: Pomodoro
}