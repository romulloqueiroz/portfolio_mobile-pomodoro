import { createSlice, PayloadAction, configureStore, combineReducers } from '@reduxjs/toolkit'
import { Pomodoro } from './type'

const POMODORO_TIME = 25
const SHORT_BREAK_TIME = 0.1
const LONG_BREAK_TIME = 15

const initialState: Pomodoro = {
  isStarted: false,
  minutes: POMODORO_TIME,
  selected: 'Pomodoro',
  round: 1
}

const pomodoroSlice = createSlice({
  name: 'pomodoro',
  initialState: initialState,
  reducers: {
    start: (state, action: PayloadAction<boolean>) => {
      state.isStarted = action.payload
    },
    minutes: (state, action: PayloadAction<number>) => {
      state.minutes = action.payload
    },
    selected: (state, {payload}: PayloadAction<string>) => {
      state.selected = payload
      switch (payload) {
        case 'pomodoro':
          state.minutes = POMODORO_TIME
          break
        case 'Short Break':
          state.minutes = SHORT_BREAK_TIME
          break
        case 'Long Break':
          state.minutes = LONG_BREAK_TIME
          break
        default:
          state.minutes = POMODORO_TIME
          break
      }
    },
    next: (state) => {
      state.round += 1
    }
  }
})

export const { 
  start: isStartedActionCreator,
  minutes: minutesActionCreator,
  selected: selectedActionCreator,
  next: nextActionCreator
} = pomodoroSlice.actions

const reducer = combineReducers({
  pomodoro: pomodoroSlice.reducer
})

export default configureStore({reducer})