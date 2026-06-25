import Login from '@/components/root/dashboard/login/Login.component'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { requestLogin } from '@/redux/actions/Auth.action'
import type { RootState } from '@/redux/store'
import { useAppSelector } from '@/hooks/useAppSelector'

function LoginContainer() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const authenticationLoading = useAppSelector(
		(state: RootState) => state.auth.authenticationLoading
	)

	const [username, setUsername] = useState('emilys')
	const [password, setPassword] = useState('emilyspass')

	const handleOnSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(requestLogin(username, password, navigate))
	}

	const handleOnGoToNavigateClick = (path: string) => {
		navigate(path)
	}

	return (
		<Login
			username={username}
			password={password}
			authenticationLoading={authenticationLoading}
			onSubmit={handleOnSubmit}
			onUsernameChange={setUsername}
			onPasswordChange={setPassword}
			onGoToNavigateClick={handleOnGoToNavigateClick}
		/>
	)
}

export default LoginContainer
