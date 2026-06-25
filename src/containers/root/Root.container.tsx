import Footer from '@/components/root/Footer.component'
import Header from '@/components/root/Header.component'
import { Outlet, useNavigate } from 'react-router-dom'

function RootContainer() {
	const navigate = useNavigate()

	const handleOnGoToNavigateClick = (path: string) => {
		navigate(path)
	}

	return (
		<>
			<Header onGoToNavigateClick={handleOnGoToNavigateClick} />
			<Outlet />
			<Footer />
		</>
	)
}

export default RootContainer
