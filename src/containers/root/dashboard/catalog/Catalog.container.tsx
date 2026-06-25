import Catalog from '@/components/root/dashboard/catalog/Catalog.component'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
	requestCategoryData,
	requestProductData,
	requestProductsByCategory,
} from '@/redux/actions/Product.action'
import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_LIMIT, DEFAULT_PAGE, type PaginationState } from './Catalog.helper'
import { Utils } from '@/utils/Utils'
import { useAppDebounce } from '@/hooks/useAppDebounce'
import { useNavigate } from 'react-router-dom'

function CatalogContainer() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { productData, categoryData, totalProducts, productDataLoading, categoryDataLoading } =
		useAppSelector(state => state.product)

	const [pagination, setPagination] = useState<PaginationState>({
		page: DEFAULT_PAGE,
		limit: DEFAULT_LIMIT,
	})
	const [search, setSearch] = useState('')
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])

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
		<Catalog
			productData={productData}
			categoryData={categoryData}
			pagination={{ ...pagination, totalPages }}
			search={search}
			selectedCategories={selectedCategories}
			productDataLoading={productDataLoading}
			categoryDataLoading={categoryDataLoading}
			onPageChange={handlePageChange}
			onSearchChange={handleSearchChange}
			onCategoryToggle={handleOnCategoryToggle}
			onClearCategories={handleOnClearCategories}
			onGoToNavigateClick={handleOnGoToNavigateClick}
		/>
	)
}

export default CatalogContainer
