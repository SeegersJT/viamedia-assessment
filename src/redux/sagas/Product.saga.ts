import { all, call, put, takeLatest } from 'redux-saga/effects'
import type { AxiosResponse } from 'axios'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
	PRODUCT_ACTIONS,
	requestCreateProduct,
	requestDeleteProduct,
	requestUpdateProduct,
	setCategoryData,
	setCategoryDataLoading,
	setDeletingProductId,
	setFormSubmitLoading,
	setProductById,
	setProductByIdLoading,
	setProductData,
	setProductDataLoading,
	setTotalProductCount,
} from '../actions/Product.action'
import { productApi } from '@/utils/api/product.api'
import type { ProductItem, ProductQueryParams } from '../types/Product.type'
import { addSystemNotification } from '../actions/Notification.action'
import axios from 'axios'
import { axiosInstance } from '@/utils/api/setup/axios.instance'

interface ProductResponse {
	products: ProductItem[]
	total: number
	skip: number
	limit: number
}

interface ProductsByCategoryParams {
	categories: string[]
	limit: number
	skip: number
	search?: string
}

interface DummyJsonDeleteResponse {
	id: number
	isDeleted: boolean
	deletedOn: string
}

function* handleProductDataRequest(action: PayloadAction<ProductQueryParams>) {
	try {
		yield put(setProductDataLoading(true))

		const response: AxiosResponse<ProductResponse> = yield call(
			productApi.getAll,
			action.payload
		)

		yield put(setProductData(response.data.products))
		yield put(setTotalProductCount(response.data.total))
	} catch (error: unknown) {
		const message = axios.isAxiosError(error)
			? (error.response?.data?.message ?? error.message)
			: error instanceof Error
				? error.message
				: 'Unknown error'
		yield put(addSystemNotification({ type: 'error', title: 'Products', message }))
	} finally {
		yield put(setProductDataLoading(false))
	}
}

function* handleCategoryDataRequest() {
	try {
		yield put(setCategoryDataLoading(true))

		const response: AxiosResponse<string[]> = yield call(
			productApi.getFrom,
			'product/category-list'
		)

		yield put(setCategoryData(response.data))
	} catch (error: unknown) {
		const message = axios.isAxiosError(error)
			? (error.response?.data?.message ?? error.message)
			: error instanceof Error
				? error.message
				: 'Unknown error'
		yield put(addSystemNotification({ type: 'error', title: 'Categories', message }))
	} finally {
		yield put(setCategoryDataLoading(false))
	}
}

function* handleProductsByCategoryRequest(action: PayloadAction<ProductsByCategoryParams>) {
	try {
		yield put(setProductDataLoading(true))

		const { categories, limit, skip, search } = action.payload

		const responses: AxiosResponse<ProductResponse>[] = yield all(
			categories.map(category =>
				call(productApi.getByCategory, category, { limit, skip, search })
			)
		)

		const mergedProducts = responses.flatMap(r => r.data.products)
		const totalCount = responses.reduce((sum, r) => sum + r.data.total, 0)

		yield put(setProductData(mergedProducts))
		yield put(setTotalProductCount(totalCount))

		if (search && search.length > 0) {
			yield put(
				addSystemNotification({
					type: 'warning',
					title: 'DummyJSON',
					message:
						'DummyJson does not support search queries when fetching products by category',
				})
			)
		}
	} catch (error: unknown) {
		const message = axios.isAxiosError(error)
			? (error.response?.data?.message ?? error.message)
			: error instanceof Error
				? error.message
				: 'Unknown error'
		yield put(addSystemNotification({ type: 'error', title: 'Products', message }))
	} finally {
		yield put(setProductDataLoading(false))
	}
}

function* handleProductByIdRequest(action: PayloadAction<number>) {
	try {
		yield put(setProductByIdLoading(true))

		const response: AxiosResponse<ProductItem> = yield call(productApi.getById, action.payload)

		yield put(setProductById(response.data))
	} catch (error: unknown) {
		const message = axios.isAxiosError(error)
			? (error.response?.data?.message ?? error.message)
			: error instanceof Error
				? error.message
				: 'Unknown error'
		yield put(addSystemNotification({ type: 'error', title: 'Products', message }))
	} finally {
		yield put(setProductByIdLoading(false))
	}
}

function* handleCreateProduct(action: ReturnType<typeof requestCreateProduct>) {
	try {
		yield put(setFormSubmitLoading(true))

		const { form, onSuccess } = action.payload

		const response: AxiosResponse<ProductItem> = yield call(
			[axiosInstance, axiosInstance.post],
			'/products/add',
			{
				...form,
				price: Number(form.price),
				stock: Number(form.stock),
			}
		)

		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Product',
				message: `"${response.data.title}" created successfully.`,
			})
		)

		onSuccess()
	} catch (error: unknown) {
		const message = axios.isAxiosError(error)
			? (error.response?.data?.message ?? error.message)
			: error instanceof Error
				? error.message
				: 'Unknown error'
		yield put(addSystemNotification({ type: 'error', title: 'Product', message }))
	} finally {
		yield put(setFormSubmitLoading(false))
	}
}

function* handleUpdateProduct(action: ReturnType<typeof requestUpdateProduct>) {
	try {
		yield put(setFormSubmitLoading(true))

		const { id, form, onSuccess } = action.payload

		const response: AxiosResponse<ProductItem> = yield call(
			[axiosInstance, axiosInstance.patch],
			`/products/${id}`,
			{
				...form,
				price: Number(form.price),
				stock: Number(form.stock),
			}
		)

		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Product',
				message: `"${response.data.title}" updated successfully.`,
			})
		)

		onSuccess()
	} catch (error: unknown) {
		const message = axios.isAxiosError(error)
			? (error.response?.data?.message ?? error.message)
			: error instanceof Error
				? error.message
				: 'Unknown error'
		yield put(addSystemNotification({ type: 'error', title: 'Product', message }))
	} finally {
		yield put(setFormSubmitLoading(false))
	}
}

function* handleDeleteProduct(action: ReturnType<typeof requestDeleteProduct>) {
	try {
		yield put(setDeletingProductId(action.payload.id))

		const { id } = action.payload

		const response: AxiosResponse<DummyJsonDeleteResponse> = yield call(
			[axiosInstance, axiosInstance.delete],
			`/products/${id}`
		)

		yield put(
			addSystemNotification({
				type: 'success',
				title: 'Product',
				message: `Product #${response.data.id} deleted successfully.`,
			})
		)
	} catch (error: unknown) {
		const message = axios.isAxiosError(error)
			? (error.response?.data?.message ?? error.message)
			: error instanceof Error
				? error.message
				: 'Unknown error'
		yield put(addSystemNotification({ type: 'error', title: 'Product', message }))
	} finally {
		yield put(setDeletingProductId(null))
	}
}

export function* productSaga() {
	yield takeLatest(PRODUCT_ACTIONS.REQUEST_PRODUCT_DATA, handleProductDataRequest)
	yield takeLatest(PRODUCT_ACTIONS.REQUEST_CATEGORY_DATA, handleCategoryDataRequest)
	yield takeLatest(PRODUCT_ACTIONS.REQUEST_PRODUCTS_BY_CATEGORY, handleProductsByCategoryRequest)
	yield takeLatest(PRODUCT_ACTIONS.REQUEST_PRODUCT_BY_ID, handleProductByIdRequest)
	yield takeLatest(PRODUCT_ACTIONS.REQUEST_CREATE_PRODUCT, handleCreateProduct)
	yield takeLatest(PRODUCT_ACTIONS.REQUEST_UPDATE_PRODUCT, handleUpdateProduct)
	yield takeLatest(PRODUCT_ACTIONS.REQUEST_DELETE_PRODUCT, handleDeleteProduct)
}
