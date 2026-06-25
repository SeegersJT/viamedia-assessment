import type { NotificationState } from './Notification.type'
import type { ProductState } from './Product.type'

export interface RootState {
	notification: NotificationState
	product: ProductState
}
