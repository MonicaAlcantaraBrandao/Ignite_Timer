import { produce } from 'immer'

import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
  // caso tenha muitos ifs podemos usar o switch:
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      // sem o immer - produce:
      // return {
      //   ...state,
      //   cycles: [state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // }

      // com o immer:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // Sem o Immer:
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleId: null,
      // }

      // Com o immer-produce:
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })
      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      // sem o immer-produce:
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, finishedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   activeCycleId: null,
      // }

      // com o immer:
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })
      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }

  // if (action.type === 'ADD_NEW_CYCLE') {
  //   return {
  //     ...state,
  //     cycles: [state.cycles, action.payload.newCycle],
  //     activeCycleId: action.payload.newCycle.id,
  //   }
  // }

  // if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
  //   return {
  //     ...state,
  //     cycles: state.cycles.map((cycle) => {
  //       if (cycle.id === state.activeCycleId) {
  //         return { ...cycle, interruptedDate: new Date() }
  //       } else {
  //         return cycle
  //       }
  //     }),
  //     activeCycleId: null,
  //   }
  // }

  // if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED') {
  //   return {
  //     ...state,
  //     cycles: state.cycles.map((cycle) => {
  //       if (cycle.id === state.activeCycleId) {
  //         return { ...cycle, finishedDate: new Date() }
  //       } else {
  //         return cycle
  //       }
  //     }),
  //     activeCycleId: null,
  //   }
  // }
}
