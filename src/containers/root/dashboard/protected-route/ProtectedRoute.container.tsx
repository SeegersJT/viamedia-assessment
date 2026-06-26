import ProtectedRoute from '@/components/root/dashboard/protected-route/ProtectedRoute.component'
import type { RootState } from '@/redux/types/Root.types'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRouteContainer() {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth)
	const location = useLocation()

	if (isAuthenticated && location.pathname === '/dashboard/login') {
		return <Navigate to="/dashboard/profile" replace />
	}

	if (!isAuthenticated && location.pathname !== '/dashboard/login') {
		return <Navigate to="/dashboard/login" replace state={{ from: location }} />
	}

	return <ProtectedRoute />
}

export default ProtectedRouteContainer
