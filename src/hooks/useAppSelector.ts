import { useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '../redux/types/Root.types'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
