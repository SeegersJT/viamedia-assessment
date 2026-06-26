import { call, put, takeLatest } from 'redux-saga/effects'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { axiosInstance } from '@/utils/api/setup/axios.instance'
import {
	AUTH_ACTIONS,
	setLoginLoading,
	setUserData,
	setAccessToken,
	setIsAuthenticated,
} from '../actions/Auth.action'
import type { requestLogin } from '../actions/Auth.action'
import type { UserItem } from '../types/Auth.type'
import { addSystemNotification } from '../actions/Notification.action'

interface DummyJsonLoginResponse {
	accessToken: string
	id: number
	email: string
	firstName: string
	lastName: string
	image: string
}

function* handleLoginRequest(action: ReturnType<typeof requestLogin>) {
	try {
		yield put(setLoginLoading(true))

		const response: AxiosResponse<DummyJsonLoginResponse> = yield call(
			[axiosInstance, axiosInstance.post],
			'/auth/login',
			action.payload
		)

		const { accessToken, id, email, firstName, lastName, image } = response.data

		const userData: UserItem = {
			id,
			email,
			name: `${firstName} ${lastName}`,
			avatar: image,
		}

		yield put(setAccessToken(accessToken))
		yield put(setUserData(userData))
		yield put(setIsAuthenticated(true))

		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Auth',
				message: `Welcome back, ${userData.name}!`,
			})
		)
	} catch (error: unknown) {
		const message = axios.isAxiosError(error)
			? (error.response?.data?.message ?? error.message)
			: error instanceof Error
				? error.message
				: 'Unknown error'
		yield put(addSystemNotification({ type: 'error', title: 'Auth', message }))
	} finally {
		yield put(setLoginLoading(false))
	}
}

function* handleLogoutRequest() {
	yield put(setAccessToken(null))
	yield put(setUserData(null))
	yield put(setIsAuthenticated(false))

	yield put(
		addSystemNotification({ type: 'info', title: 'Auth', message: "You've been signed out" })
	)
}

export function* authSaga() {
	yield takeLatest(AUTH_ACTIONS.REQUEST_LOGIN, handleLoginRequest)
	yield takeLatest(AUTH_ACTIONS.REQUEST_LOGOUT, handleLogoutRequest)
}
