import { combineReducers } from 'redux'
import { AuthReducer } from './Auth.reducer'
import { notificationReducer } from './Notification.reducer'
import { ProductReducer } from './Product.reducer'

export const RootReducer = combineReducers({
	auth: AuthReducer,
	notification: notificationReducer,
	product: ProductReducer,
})
