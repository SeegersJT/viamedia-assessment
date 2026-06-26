import Login from '@/components/root/dashboard/protected-route/login/Login.component'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { requestLogin } from '@/redux/actions/Auth.action'
import { useAppSelector } from '@/hooks/useAppSelector'
import type { RootState } from '@/redux/types/Root.types'

function LoginContainer() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { authenticationLoading, isAuthenticated } = useAppSelector(
		(state: RootState) => state.auth
	)

	const [username, setUsername] = useState('emilys')
	const [password, setPassword] = useState('emilyspass')

	useEffect(() => {
		if (isAuthenticated) navigate('/dashboard/profile')
	}, [isAuthenticated, navigate])

	const handleOnSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(requestLogin(username, password))
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
