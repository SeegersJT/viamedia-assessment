import type { ProductForm } from '@/containers/root/dashboard/product/ProductFormModal.helper'
import type { ProductItem, ProductQueryParams } from '../types/Product.type'

export const PRODUCT_ACTIONS = {
	REQUEST_PRODUCT_DATA: '[PRODUCT] - PRODUCT DATA - REQUEST',
	SET_PRODUCT_DATA_LOADING: '[PRODUCT] - PRODUCT DATA - REQUEST - LOADING',
	SET_PRODUCT_DATA: '[PRODUCT] - PRODUCT DATA - SET',

	SET_TOTAL_PRODUCT_COUNT: '[PRODUCT] - TOTAL PRODUCT COUNT - SET',

	REQUEST_CATEGORY_DATA: '[PRODUCT] - CATEGORY DATA - REQUEST',
	SET_CATEGORY_DATA_LOADING: '[PRODUCT] - CATEGORY DATA - REQUEST - LOADING',
	SET_CATEGORY_DATA: '[PRODUCT] - CATEGORY DATA - SET',

	REQUEST_PRODUCTS_BY_CATEGORY: '[PRODUCT] - PRODUCTS BY CATEGORY - REQUEST',

	REQUEST_PRODUCT_BY_ID: '[PRODUCT] - PRODUCT BY ID - REQUEST',
	SET_PRODUCT_BY_ID_LOADING: '[PRODUCT] - PRODUCT BY ID - REQUEST - LOADING',
	SET_PRODUCT_BY_ID: '[PRODUCT] - PRODUCT BY ID - SET',

	REQUEST_CREATE_PRODUCT: '[PRODUCT] - CREATE - REQUEST',
	REQUEST_UPDATE_PRODUCT: '[PRODUCT] - UPDATE - REQUEST',
	REQUEST_DELETE_PRODUCT: '[PRODUCT] - DELETE - REQUEST',

	SET_FORM_SUBMIT_LOADING: '[PRODUCT] - FORM SUBMIT - LOADING',
	SET_DELETING_PRODUCT_ID: '[PRODUCT] - DELETING PRODUCT ID - SET',
} as const

export const requestProductData = (parameters: ProductQueryParams) => ({
	type: PRODUCT_ACTIONS.REQUEST_PRODUCT_DATA,
	payload: parameters,
})

export const setProductDataLoading = (loading: boolean) => ({
	type: PRODUCT_ACTIONS.SET_PRODUCT_DATA_LOADING,
	payload: loading,
})

export const setProductData = (data: ProductItem[]) => ({
	type: PRODUCT_ACTIONS.SET_PRODUCT_DATA,
	payload: data,
})

export const setTotalProductCount = (count: number) => ({
	type: PRODUCT_ACTIONS.SET_TOTAL_PRODUCT_COUNT,
	payload: count,
})

export const requestCategoryData = () => ({
	type: PRODUCT_ACTIONS.REQUEST_CATEGORY_DATA,
})

export const setCategoryDataLoading = (loading: boolean) => ({
	type: PRODUCT_ACTIONS.SET_CATEGORY_DATA_LOADING,
	payload: loading,
})

export const setCategoryData = (data: string[]) => ({
	type: PRODUCT_ACTIONS.SET_CATEGORY_DATA,
	payload: data,
})

export const requestProductsByCategory = (parameters: {
	categories: string[]
	limit: number
	skip: number
	search?: string
}) => ({
	type: PRODUCT_ACTIONS.REQUEST_PRODUCTS_BY_CATEGORY,
	payload: parameters,
})

export const requestProductById = (id: number) => ({
	type: PRODUCT_ACTIONS.REQUEST_PRODUCT_BY_ID,
	payload: id,
})

export const setProductByIdLoading = (loading: boolean) => ({
	type: PRODUCT_ACTIONS.SET_PRODUCT_BY_ID_LOADING,
	payload: loading,
})

export const setProductById = (data: ProductItem | null) => ({
	type: PRODUCT_ACTIONS.SET_PRODUCT_BY_ID,
	payload: data,
})

export const requestCreateProduct = (form: ProductForm, onSuccess: () => void) => ({
	type: PRODUCT_ACTIONS.REQUEST_CREATE_PRODUCT,
	payload: { form, onSuccess },
})

export const requestUpdateProduct = (id: number, form: ProductForm, onSuccess: () => void) => ({
	type: PRODUCT_ACTIONS.REQUEST_UPDATE_PRODUCT,
	payload: { id, form, onSuccess },
})

export const setFormSubmitLoading = (loading: boolean) => ({
	type: PRODUCT_ACTIONS.SET_FORM_SUBMIT_LOADING,
	payload: loading,
})

export const requestDeleteProduct = (id: number) => ({
	type: PRODUCT_ACTIONS.REQUEST_DELETE_PRODUCT,
	payload: { id },
})

export const setDeletingProductId = (id: number | null) => ({
	type: PRODUCT_ACTIONS.SET_DELETING_PRODUCT_ID,
	payload: id,
})

export type ProductAction =
	| ReturnType<typeof requestProductData>
	| ReturnType<typeof setProductDataLoading>
	| ReturnType<typeof setProductData>
	| ReturnType<typeof setTotalProductCount>
	| ReturnType<typeof requestCategoryData>
	| ReturnType<typeof setCategoryDataLoading>
	| ReturnType<typeof setCategoryData>
	| ReturnType<typeof requestProductsByCategory>
	| ReturnType<typeof requestProductById>
	| ReturnType<typeof setProductByIdLoading>
	| ReturnType<typeof setProductById>
	| ReturnType<typeof requestCreateProduct>
	| ReturnType<typeof requestUpdateProduct>
	| ReturnType<typeof setFormSubmitLoading>
	| ReturnType<typeof requestDeleteProduct>
	| ReturnType<typeof setDeletingProductId>
