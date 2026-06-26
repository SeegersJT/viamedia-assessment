import Footer from '@/components/root/Footer.component'
import Header from '@/components/root/Header.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestLogout } from '@/redux/actions/Auth.action'
import type { RootState } from '@/redux/types/Root.types'
import { Outlet, useNavigate } from 'react-router-dom'

function RootContainer() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { userData, isAuthenticated } = useAppSelector((state: RootState) => state.auth)

	const handleOnGoToNavigateClick = (path: string) => {
		navigate(path)
	}

	const handleOnSignOutClick = () => {
		dispatch(requestLogout())
	}

	return (
		<>
			<Header
				isAuthenticated={isAuthenticated}
				user={userData}
				onGoToNavigateClick={handleOnGoToNavigateClick}
				onSignOutClick={handleOnSignOutClick}
			/>
			<Outlet />
			<Footer />
		</>
	)
}

export default RootContainer
