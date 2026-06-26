import Dashboard from '@/components/root/dashboard/Dashboard.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestProductData } from '@/redux/actions/Product.action'
import type { RootState } from '@/redux/types/Root.types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function DashboardContainer() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
	const { productData, totalProducts, productDataLoading } = useAppSelector(
		(state: RootState) => state.product
	)

	const handleOnGoToNavigateClick = (path: string) => {
		navigate(path)
	}

	useEffect(() => {
		dispatch(requestProductData({ limit: 4 }))
	}, [dispatch])

	return (
		<>
			<Dashboard
				productData={productData}
				totalProducts={totalProducts}
				isAuthenticated={isAuthenticated}
				productDataLoading={productDataLoading}
				onGoToNavigateClick={handleOnGoToNavigateClick}
			/>
		</>
	)
}

export default DashboardContainer
