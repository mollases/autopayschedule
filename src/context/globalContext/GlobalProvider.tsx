import { useReducer, Dispatch, ReactNode } from 'react'
import { BillRow } from '../../BillRow'

import GlobalContext, { initialState, GlobalStateType } from './GlobalContext'

export type UpdateBills = {
  source: BillRow[]
  bills: BillRow[]
  billDates: Set<string>
}

export type GlobalActionType =
  | {
      type: 'updateBills'
      payload: UpdateBills
    }
  | {
      type: 'setDate'
      payload: Date
    }

export type GlobalContextType = {
  state: GlobalStateType
  dispatch: Dispatch<GlobalActionType>
}

const globalContextReducer = (state: GlobalStateType, action: GlobalActionType): GlobalStateType => {
  switch (action.type) {
    case 'updateBills': {
      return {
        ...state,
        bills: action.payload.bills,
        billDates: action.payload.billDates,
        source: action.payload.source
      }
    }
    case 'setDate': {
      console.log(`Updating the date`)

      return {
        ...state,
        selectedDate: action.payload,
      }
    }
    default:
      return state
  }
}

export const GlobalProvider = (props: { children: ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(globalContextReducer, initialState)

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider