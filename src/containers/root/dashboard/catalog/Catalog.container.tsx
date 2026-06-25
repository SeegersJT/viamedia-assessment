import Catalog from '@/components/root/dashboard/catalog/Catalog.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { requestProductData } from '@/redux/actions/Product.action'
import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_LIMIT, DEFAULT_PAGE, type PaginationState } from './Catalog.helper'
import { Utils } from '@/utils/Utils'

function CatalogContainer() {
	const dispatch = useAppDispatch()

	const { productData, productDataLoading, totalProducts } = useAppSelector(
		state => state.product
	)

	const [pagination, setPagination] = useState<PaginationState>({
		page: DEFAULT_PAGE,
		limit: DEFAULT_LIMIT,
	})
	const [search, setSearch] = useState('')

	const totalPages = Utils.roundUp(totalProducts / pagination.limit)

	const fetchProducts = useCallback(() => {
		dispatch(
			requestProductData({
				limit: pagination.limit,
				skip: (pagination.page - 1) * pagination.limit,
				search,
			})
		)
	}, [dispatch, pagination, search])

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	const handlePageChange = (page: number) => {
		setPagination(prev => ({ ...prev, page }))
	}

	const handleSearchChange = (value: string) => {
		setSearch(value)
		setPagination(prev => ({ ...prev, page: DEFAULT_PAGE }))
	}

	return (
		<>
			<Catalog
				productData={productData}
				productDataLoading={productDataLoading}
				pagination={{ ...pagination, totalPages }}
				search={search}
				onPageChange={handlePageChange}
				onSearchChange={handleSearchChange}
			/>
		</>
	)
}

export default CatalogContainer
