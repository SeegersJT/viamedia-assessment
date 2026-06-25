import Dashboard from '@/components/root/dashboard/Dashboard.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestProductData } from '@/redux/actions/Product.action'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function DashboardContainer() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { productData, totalProducts, productDataLoading } = useAppSelector(
		state => state.product
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
				productDataLoading={productDataLoading}
				onGoToNavigateClick={handleOnGoToNavigateClick}
			/>
		</>
	)
}

export default DashboardContainer
