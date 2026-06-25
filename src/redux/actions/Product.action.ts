import type { ProductItem, ProductQueryParams } from '../types/Product.type'

export const PRODUCT_ACTIONS = {
	REQUEST_PRODUCT_DATA: '[PRODUCT] - PRODUCT DATA - REQUEST',
	SET_PRODUCT_DATA_LOADING: '[PRODUCT] - PRODUCT DATA - REQUEST - LOADING',
	SET_PRODUCT_DATA: '[PRODUCT] - PRODUCT DATA - SET',

	SET_TOTAL_PRODUCT_COUNT: '[PRODUCT] - TOTAL PRODUCT COUNT - SET',
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

export type ProductAction =
	| ReturnType<typeof requestProductData>
	| ReturnType<typeof setProductDataLoading>
	| ReturnType<typeof setProductData>
	| ReturnType<typeof setTotalProductCount>
