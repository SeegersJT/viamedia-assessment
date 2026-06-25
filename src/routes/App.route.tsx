import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RootContainer from '@/containers/root/Root.container'
import DashboardContainer from '@/containers/root/dashboard/Dashboard.container'
import CatalogContainer from '@/containers/root/dashboard/catalog/Catalog.container'
import Notification from '@/components/notification/Notification.component'
import ProductContainer from '@/containers/root/dashboard/product/Product.container'
import LoginContainer from '@/containers/root/dashboard/login/Login.container'

export const AppRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route path={'/'} element={<Navigate to={'/dashboard'} replace />} />

			<Route path="/dashboard" element={<RootContainer />}>
				<Route index element={<DashboardContainer />} />

				<Route path="catalog" element={<CatalogContainer />} />
				<Route path="product/:context" element={<ProductContainer />} />

				<Route path="login" element={<LoginContainer />} />

				{/* <Route path="profile" element={<LoginContainer />}>
					<Route path="profile" element={<LoginContainer />} />
				</Route> */}
			</Route>

			<Route path="*" element={<Navigate to={'/'} replace />} />
		</Routes>

		<Notification />
	</BrowserRouter>
)
