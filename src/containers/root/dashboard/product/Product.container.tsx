import Product from '@/components/root/dashboard/product/Product.component'
import ProductSkeleton from '@/components/root/dashboard/product/ProductSkeleton.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestProductById } from '@/redux/actions/Product.action'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ProductContainer() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { context } = useParams<{ context: string }>()

	const { productById, productByIdLoading } = useAppSelector(state => state.product)

	const finalPrice = productById
		? productById.price * (1 - productById.discountPercentage / 100)
		: 0

	const handleOnGoToNavigateClick = (path: string) => {
		navigate(path)
	}

	useEffect(() => {
		const id = Number(context)

		if (!context || isNaN(id)) {
			navigate('/dashboard/catalog', { replace: true })
			return
		}

		dispatch(requestProductById(id))
	}, [context, dispatch, navigate])

	if (productById === null || productByIdLoading) return <ProductSkeleton />

	return (
		<>
			<Product
				product={productById}
				finalPrice={finalPrice}
				onGoToNavigateClick={handleOnGoToNavigateClick}
			/>
		</>
	)
}

export default ProductContainer
