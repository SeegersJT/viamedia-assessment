import Catalog from '@/components/root/dashboard/catalog/Catalog.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
	requestCategoryData,
	requestDeleteProduct,
	requestProductById,
	requestProductData,
	requestProductsByCategory,
	setProductById,
} from '@/redux/actions/Product.action'
import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_LIMIT, DEFAULT_PAGE, type PaginationState } from './Catalog.helper'
import { Utils } from '@/utils/Utils'
import { useAppDebounce } from '@/hooks/useAppDebounce'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '@/redux/types/Root.types'
import ProductFormModalContainer from '../product/ProductFormModal.container'

function CatalogContainer() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const {
		productData,
		categoryData,
		totalProducts,
		productDataLoading,
		categoryDataLoading,
		deletingProductId,
	} = useAppSelector((state: RootState) => state.product)
	const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)

	const [pagination, setPagination] = useState<PaginationState>({
		page: DEFAULT_PAGE,
		limit: DEFAULT_LIMIT,
	})
	const [search, setSearch] = useState('')
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const [productFormModalOpen, setProductFormModalOpen] = useState(false)

	const debouncedSearch = useAppDebounce(search, 400)

	const totalPages = Utils.roundUp(totalProducts / pagination.limit)

	const fetchProducts = useCallback(() => {
		if (selectedCategories.length > 0) {
			dispatch(
				requestProductsByCategory({
					categories: selectedCategories,
					limit: pagination.limit,
					skip: (pagination.page - 1) * pagination.limit,
					search: debouncedSearch,
				})
			)
		} else {
			dispatch(
				requestProductData({
					limit: pagination.limit,
					skip: (pagination.page - 1) * pagination.limit,
					search: debouncedSearch,
				})
			)
		}
	}, [dispatch, pagination, debouncedSearch, selectedCategories])

	const fetchCategories = useCallback(() => {
		dispatch(requestCategoryData())
	}, [dispatch])

	const handlePageChange = (page: number) => {
		setPagination(prev => ({ ...prev, page }))
	}

	const handleSearchChange = (value: string) => {
		setSearch(value)
	}

	const handleOnCategoryToggle = (category: string) => {
		setSelectedCategories(prev => {
			if (prev.includes(category)) {
				return prev.filter(c => c !== category)
			} else {
				return [...prev, category]
			}
		})
		setPagination(prev => ({ ...prev, page: DEFAULT_PAGE }))
	}

	const handleOnClearCategories = () => {
		setSelectedCategories([])
		setPagination(prev => ({ ...prev, page: DEFAULT_PAGE }))
	}

	const handleOnGoToNavigateClick = (path: string) => {
		navigate(path)
	}

	const handleOnProductFormOpenClick = (productId: number, open: boolean, clear: boolean) => {
		setProductFormModalOpen(open)

		if (clear) {
			dispatch(setProductById(null))
		} else {
			dispatch(requestProductById(productId))
		}
	}

	const handleOnRemoveClick = (productId: number) => {
		dispatch(requestDeleteProduct(productId))
	}

	useEffect(() => {
		setPagination(prev => ({ ...prev, page: DEFAULT_PAGE }))
	}, [debouncedSearch])

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	useEffect(() => {
		fetchCategories()
	}, [fetchCategories])

	return (
		<>
			<Catalog
				productData={productData}
				categoryData={categoryData}
				pagination={{ ...pagination, totalPages }}
				search={search}
				selectedCategories={selectedCategories}
				isAuthenticated={isAuthenticated}
				productDataLoading={productDataLoading}
				categoryDataLoading={categoryDataLoading}
				deletingProductId={deletingProductId}
				onPageChange={handlePageChange}
				onSearchChange={handleSearchChange}
				onCategoryToggle={handleOnCategoryToggle}
				onClearCategories={handleOnClearCategories}
				onGoToNavigateClick={handleOnGoToNavigateClick}
				onProductFormOpenClick={handleOnProductFormOpenClick}
				onRemoveClick={handleOnRemoveClick}
			/>

			{productFormModalOpen && (
				<ProductFormModalContainer
					onClose={() => handleOnProductFormOpenClick(0, false, true)}
				/>
			)}
		</>
	)
}

export default CatalogContainer
