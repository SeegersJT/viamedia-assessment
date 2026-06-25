import { all } from 'redux-saga/effects'
import { authSaga } from './Auth.saga'
import { notificationSaga } from './Notification.saga'
import { productSaga } from './Product.saga'

export function* RootSaga() {
	yield all([authSaga(), notificationSaga(), productSaga()])
}
