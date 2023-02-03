import { createContext } from 'react'
import { BillRow } from '../../BillRow'
import { GlobalContextType } from './GlobalProvider'

export type GlobalStateType = {
  source: BillRow[]
  selectedDate: Date,
  billDates: Set<string>,
  bills: BillRow[]
}

/**
 * The initial state
 */
export const initialState: GlobalStateType = {
  source: [],
  selectedDate: new Date(),
  billDates: new Set(),
  bills: []
}

/**
 * The context
 */
export const GlobalContext = createContext<GlobalContextType>({
  state: initialState,
  dispatch: () => undefined,
})

export default GlobalContext