import type { NavigateFunction } from 'react-router-dom'
import type { UserItem } from '../types/Auth.type'

export const AUTH_ACTIONS = {
	REQUEST_LOGIN: '[AUTH] - LOGIN - REQUEST',
	SET_LOGIN_LOADING: '[AUTH] - LOGIN - REQUEST - LOADING',
	SET_USER_DATA: '[AUTH] - USER DATA - SET',

	SET_ACCESS_TOKEN: '[AUTH] - ACCESS TOKEN - SET',

	SET_IS_AUTHENTICATED: '[AUTH] - IS AUTHENTICATED - SET',

	REQUEST_LOGOUT: '[AUTH] - LOGOUT - REQUEST',
} as const

export const requestLogin = (username: string, password: string) => ({
	type: AUTH_ACTIONS.REQUEST_LOGIN,
	payload: { username, password },
})

export const setLoginLoading = (loading: boolean) => ({
	type: AUTH_ACTIONS.SET_LOGIN_LOADING,
	payload: loading,
})

export const setUserData = (data: UserItem | null) => ({
	type: AUTH_ACTIONS.SET_USER_DATA,
	payload: data,
})

export const setAccessToken = (token: string | null) => ({
	type: AUTH_ACTIONS.SET_ACCESS_TOKEN,
	payload: token,
})

export const setIsAuthenticated = (isAuthenticated: boolean) => ({
	type: AUTH_ACTIONS.SET_IS_AUTHENTICATED,
	payload: isAuthenticated,
})

export const requestLogout = () => ({
	type: AUTH_ACTIONS.REQUEST_LOGOUT,
})

export type AuthAction =
	| ReturnType<typeof requestLogin>
	| ReturnType<typeof setLoginLoading>
	| ReturnType<typeof setUserData>
	| ReturnType<typeof setAccessToken>
	| ReturnType<typeof setIsAuthenticated>
	| ReturnType<typeof requestLogout>
