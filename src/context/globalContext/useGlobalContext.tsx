import { useContext } from 'react'

import GlobalContext from './GlobalContext'
import { GlobalContextType } from './GlobalProvider'

const useGlobalContext = (): GlobalContextType => useContext(GlobalContext)

export default useGlobalContext