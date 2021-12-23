import { useState, useEffect, useRef } from 'react'

const minutesToMillis = (min: number) => min * 60 * 1000
const formatTime = (time: number) => time < 10 ? `0${time}` : time

interface CountdownProps {
  minutes: number
  isPaused: boolean
  onEnd: () => void
}

export const useCountdown = ({ minutes, isPaused, onEnd }: CountdownProps) => {
  const interval = useRef<number>(null!)
  const onEndRef = useRef<() => void>(null!)
  const [millis, setMillis] = useState(minutesToMillis(minutes))

  const countDown = () => {
    setMillis(prev => {
      if(prev === 0) {
        window.clearInterval(interval.current)
        return prev
      }
      const timeLeft = prev - 1000
      return timeLeft
    })
  }

  useEffect(() => {
    onEndRef.current = onEnd 
  }, [onEnd])

  useEffect(() => { 
    if (millis === 0) onEndRef.current()
  }, [millis])

  useEffect(() => {
    if (isPaused) {
      if(interval.current) window.clearInterval(interval.current) 
      return
    } 
    interval.current = window.setInterval(countDown, 1000)
    return () => window.clearInterval(interval.current)
  }, [isPaused, millis])

  useEffect(() => setMillis(minutesToMillis(minutes)), [minutes])

  const minutesLeft = Math.floor(millis / 1000 / 60) % 60 
  const secondsLeft = Math.floor(millis / 1000) % 60 

  return [`${formatTime(minutesLeft)}:${formatTime(secondsLeft)}`]
}