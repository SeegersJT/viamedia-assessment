import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

export const AppRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route path={'/'} element={<Navigate to={'/dashboard'} replace />} />

			<Route index element={<h1>NOTHING TO SEE HERE...</h1>} />

			{/* THIS IS MY BASIC STRUCTURE OF THE ROUTES AND WILL ADD ROUTES AND COMPONENTS AS I GO ALONG */}
			{/* <Route path="/dashboard" element={<RootContainer />}>
				<Route index element={<DashboardContainer />} />
			</Route> */}

			<Route path="*" element={<Navigate to={'/'} replace />} />
		</Routes>
	</BrowserRouter>
)
