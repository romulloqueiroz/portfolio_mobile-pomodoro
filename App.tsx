import { useState } from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'
import { Countdown, Button, Selector } from './components'
import { color } from './styles'
import { Provider } from 'react-redux'
import store from './store'
import { useSelector, useDispatch } from 'react-redux'
import { PomodoroState } from './store/type'
import { selectedActionCreator, isStartedActionCreator } from './store'
import { useKeepAwake } from 'expo-keep-awake'

const Wrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

const App = () => {
  useKeepAwake()
  const dispatch = useDispatch()
  const { isStarted, minutes, round } = useSelector((state: PomodoroState) => state.pomodoro)

  return (
    <Container>
      <Text>POMODORO</Text>
      <Countdown
        minutes={minutes}
        isPaused={!isStarted}
        size={80}
      />
      <Button 
        color='redDark' 
        onPress={() => dispatch(isStartedActionCreator(!isStarted))}
      >
        {!isStarted ? 'Start' : 'Pause'}
      </Button>
      <Selector onClick={(val: string) => dispatch(selectedActionCreator(val))} />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: ${color.white};
  align-items: center;
  justify-content: center;
`

export default Wrapper