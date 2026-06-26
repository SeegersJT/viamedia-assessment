export interface UserItem {
	id: number
	email: string
	name: string
	avatar: string
	phone: string
	age: number
	gender: string
	birthDate: string
	university: string
	bloodGroup: string
	height: number
	weight: number
	eyeColor: string
	hair: {
		color: string
		type: string
	}
	address: {
		address: string
		city: string
		state: string
		postalCode: string
		country: string
	}
	company: {
		name: string
		title: string
		department: string
	}
	username: string
	firstName: string
	lastName: string
	maidenName: string
	role: string
}

export interface AuthState {
	userData: UserItem | null
	accessToken: string | null
	isAuthenticated: boolean
	authenticationLoading: boolean
}
