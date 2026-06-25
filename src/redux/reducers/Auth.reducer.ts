import type { AuthState } from '../types/Auth.type'
import type { AuthAction } from '../actions/Auth.action'
import { AUTH_ACTIONS } from '../actions/Auth.action'

interface AuthStateWithLoading extends AuthState {
	authenticationLoading: boolean
}

const initialState: AuthStateWithLoading = {
	userData: null,
	accessToken: null,
	isAuthenticated: false,
	authenticationLoading: false,
}

export const AuthReducer = (state = initialState, action: AuthAction): AuthStateWithLoading => {
	switch (action.type) {
		case AUTH_ACTIONS.SET_LOGIN_LOADING:
			return { ...state, authenticationLoading: action.payload }

		case AUTH_ACTIONS.SET_USER_DATA:
			return { ...state, userData: action.payload }

		case AUTH_ACTIONS.SET_ACCESS_TOKEN:
			return { ...state, accessToken: action.payload }

		case AUTH_ACTIONS.SET_IS_AUTHENTICATED:
			return { ...state, isAuthenticated: action.payload }

		default:
			return state
	}
}
