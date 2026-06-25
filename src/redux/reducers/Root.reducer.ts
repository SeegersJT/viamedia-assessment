import { combineReducers } from 'redux'
import { ProductReducer } from './Product.reducer'
import { notificationReducer } from './Notification.reducer'

export const RootReducer = combineReducers({
	notification: notificationReducer,
	product: ProductReducer,
})
