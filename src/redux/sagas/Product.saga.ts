import type { AxiosResponse } from 'axios'
import type { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
	PRODUCT_ACTIONS,
	setProductData,
	setProductDataLoading,
	setTotalProductCount,
} from '../actions/Product.action'
import { productApi } from '@/utils/api/product.api'
import type { ProductItem, ProductQueryParams } from '../types/Product.type'
import { addSystemNotification } from '../actions/Notification.action'
import axios from 'axios'

interface ProductResponse {
	products: ProductItem[]
	total: number
	skip: number
	limit: number
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
		yield put(addSystemNotification({ type: 'error', title: 'Products', message: message }))
	} finally {
		yield put(setProductDataLoading(false))
	}
}

export function* productSaga() {
	yield takeLatest(PRODUCT_ACTIONS.REQUEST_PRODUCT_DATA, handleProductDataRequest)
}
