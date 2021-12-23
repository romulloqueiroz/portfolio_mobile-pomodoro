import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { isStartedActionCreator, nextActionCreator } from '../../store'
import { useCountdown } from '../../hooks/useCountdown'
import { Text } from 'react-native'
import { Audio } from 'expo-av'

interface CountdownProps {
  minutes: number
  isPaused: boolean
  size: number
}

const Countdown: React.FC<CountdownProps> = ({ minutes, isPaused, size = 60, ...props }) => {
  const [sound, setSound] = useState<Audio.Sound>()
  const dispatch = useDispatch()

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../../assets/audio/alarm.mp3'))
    setSound(sound)
    await sound.playAsync() 
  }

  const handleEnd = async () => {
    dispatch(isStartedActionCreator(false))
    await playSound()
    dispatch(nextActionCreator())
  }

  const [time] = useCountdown({
    minutes,
    isPaused,
    onEnd: () => handleEnd()
  })

  return (
    <Text style={{ fontSize: size, ...props }}>
      {time}
    </Text>
  )
}

export default Countdown