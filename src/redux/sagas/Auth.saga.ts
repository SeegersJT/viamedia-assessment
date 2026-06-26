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

interface DummyJsonUserResponse {
	id: number
	email: string
	firstName: string
	lastName: string
	maidenName: string
	image: string
	phone: string
	age: number
	gender: string
	birthDate: string
	university: string
	bloodGroup: string
	height: number
	weight: number
	eyeColor: string
	hair: { color: string; type: string }
	address: { address: string; city: string; state: string; postalCode: string; country: string }
	company: { name: string; title: string; department: string }
	username: string
	role: string
	accessToken?: string
}

function mapToUserItem(data: DummyJsonUserResponse): UserItem {
	return {
		id: data.id,
		email: data.email,
		name: `${data.firstName} ${data.lastName}`,
		avatar: data.image,
		phone: data.phone,
		age: data.age,
		gender: data.gender,
		birthDate: data.birthDate,
		university: data.university,
		bloodGroup: data.bloodGroup,
		height: data.height,
		weight: data.weight,
		eyeColor: data.eyeColor,
		hair: data.hair,
		address: data.address,
		company: data.company,
		username: data.username,
		firstName: data.firstName,
		lastName: data.lastName,
		maidenName: data.maidenName,
		role: data.role,
	}
}

function* handleLoginRequest(action: ReturnType<typeof requestLogin>) {
	try {
		yield put(setLoginLoading(true))

		const response: AxiosResponse<DummyJsonUserResponse> = yield call(
			[axiosInstance, axiosInstance.post],
			'/auth/login',
			action.payload
		)

		const userData = mapToUserItem(response.data)

		yield put(setAccessToken(response.data.accessToken ?? null))
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

function* handleMeRequest() {
	try {
		yield put(setLoginLoading(true))

		const response: AxiosResponse<DummyJsonUserResponse> = yield call(
			[axiosInstance, axiosInstance.get],
			'/auth/me'
		)

		const userData = mapToUserItem(response.data)

		yield put(setUserData(userData))
		yield put(setIsAuthenticated(true))
	} catch (error: unknown) {
		const message = axios.isAxiosError(error)
			? (error.response?.data?.message ?? error.message)
			: error instanceof Error
				? error.message
				: 'Unknown error'

		yield put(setAccessToken(null))
		yield put(setIsAuthenticated(false))
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
	yield takeLatest(AUTH_ACTIONS.REQUEST_ME, handleMeRequest)
}
