import Footer from '@/components/root/Footer.component'
import Header from '@/components/root/Header.component'
import { useAppSelector } from '@/hooks/useAppSelector'
import type { RootState } from '@/redux/store'
import { Outlet, useNavigate } from 'react-router-dom'

function RootContainer() {
	const navigate = useNavigate()

	const { userData, isAuthenticated } = useAppSelector((state: RootState) => state.auth)

	const handleOnGoToNavigateClick = (path: string) => {
		navigate(path)
	}

	return (
		<>
			<Header
				isAuthenticated={isAuthenticated}
				user={userData}
				onGoToNavigateClick={handleOnGoToNavigateClick}
			/>
			<Outlet />
			<Footer />
		</>
	)
}

export default RootContainer
