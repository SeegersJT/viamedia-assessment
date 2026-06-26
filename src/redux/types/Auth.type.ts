export interface UserItem {
	id: number
	email: string
	name: string
	avatar: string
}

export interface AuthState {
	userData: UserItem | null
	accessToken: string | null
	isAuthenticated: boolean
	authenticationLoading: boolean
}
