import type { PersistPartial } from 'redux-persist/es/persistReducer'
import type { AuthState } from './Auth.type'
import type { NotificationState } from './Notification.type'
import type { ProductState } from './Product.type'

export interface RootState {
	auth: AuthState
	notification: NotificationState
	product: ProductState
}

export type PersistedRootState = RootState & PersistPartial
