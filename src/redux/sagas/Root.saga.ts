import { all } from 'redux-saga/effects'
import { productSaga } from './Product.saga'
import { notificationSaga } from './Notification.saga'

export function* RootSaga() {
	yield all([notificationSaga(), productSaga()])
}
