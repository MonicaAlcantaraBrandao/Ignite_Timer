import { useEffect, useContext } from 'react'
import { CountDownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../../contexts/CyclesContexts'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  // ? se tiver um ciclo ativo essa variável será o numemro de minutos ativo divido por 60, : se não tiver essa variável será 0
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  // sempre que usamos uma variável externa, obrigatóriamnete devemos incluir essa variável como uma dependência do useEffect
  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          // setCycles((state) =>
          //   state.map((cycle) => {
          //     if (cycle.id === activeCycleId) {
          //       return { ...cycle, finishedDate: new Date() }
          //     } else {
          //       return cycle
          //     }
          //   }),
          // )
          setSecondsPassed(totalSeconds)

          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  // ? Se eu tiver um ciclo ativo vai ser o total de segundos menos quantos segundos se passaram, : se não vai ser 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // Math.floor(arredonda o resuldado para baixo), Math.ceil(arrenda para cima), Math.round (0,5)
  const minutesAmount = Math.floor(currentSeconds / 60)
  // % Resto
  const secondsAmount = currentSeconds % 60

  // padStart = método que preenche uma string até um tamanho específico, caso ela n tenha aquele tamanho ainda com algum caractere: no caso=> quero que ela tenha 2 caracteres, caso não tenha add 0 antes.
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
