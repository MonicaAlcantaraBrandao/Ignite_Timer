import {
  ReactNode,
  createContext,
  useState,
  useReducer,
  useEffect,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  // função q não tem retorno:
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextPropviderProps {
  // ReactNode qualquer html válido
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextPropviderProps) {
  /* setCycles */
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      // Salvar timers mesmo depois de recarregar a página no storage
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
      // caso o usuário não tenha  nada no storage, irá retornar o valor do segundo parâmetro como valor inicial - initialState =
      // cycles: [],
      // activeCycleId: null,

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState

  // essa variável vai percorrer o vetor de ciclos e vai encontrar(find) um ciclo em que o id do ciclo seja igual(===) ao id do ciclo ativo:
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    // otimizar o timer para quando reiniciar a página ele retornar com o valor correto:
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  // Salvar timers mesmo depois de recarregar a página
  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  // const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  // Para não enviar a função setAmountSecondsPassed inteira pelo context:
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  // Para não enviar a função setCycles inteira pelo context:
  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
  }

  function createNewCycle(data: CreateCycleData) {
    // get time= vai retornar o time value em milisegundos, data atual convertida em milisegundos, então nenhum ciclo será criado no mesmo ms que outro, sendo cada id único
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    // precisa de todos os ciclos que ja existem(...cycles), e adicionar o novo no final:
    // quando for alterar um estado que depende de sua info anterior é necessário que esse valor do estado seja setado com função(arrow function):
    // setCycles((state) => [...state, newCycle])

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
