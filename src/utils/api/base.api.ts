import { axiosInstance } from './setup/axios.instance'
import { buildQueryString, type BaseQueryParams } from './setup/url-builder'
import type { AxiosResponse } from 'axios'

export function createApiService<TPayload extends object>(resource: string) {
	return {
		getAll: (params: BaseQueryParams = {}): Promise<AxiosResponse> => {
			const queryString = buildQueryString(params)
			const url = params.search
				? `/${resource}/search${queryString ? `?${queryString}` : ''}`
				: `/${resource}${queryString ? `?${queryString}` : ''}`
			return axiosInstance.get(url)
		},

		getById: (
			id: number,
			params: Pick<BaseQueryParams, 'select'> = {}
		): Promise<AxiosResponse> => {
			const queryString = buildQueryString(params)
			return axiosInstance.get(`/${resource}/${id}${queryString ? `?${queryString}` : ''}`)
		},

		getByCategory: (category: string, params: BaseQueryParams = {}): Promise<AxiosResponse> => {
			const queryString = buildQueryString(params)
			return axiosInstance.get(
				`/${resource}/category/${category}${queryString ? `?${queryString}` : ''}`
			)
		},

		getFrom: (path: string, params: BaseQueryParams = {}): Promise<AxiosResponse> => {
			const queryString = buildQueryString(params)
			return axiosInstance.get(`/${path}${queryString ? `?${queryString}` : ''}`)
		},

		create: (payload: TPayload): Promise<AxiosResponse> => {
			return axiosInstance.post(`/${resource}/add`, payload)
		},

		update: (id: number, payload: TPayload): Promise<AxiosResponse> => {
			return axiosInstance.put(`/${resource}/${id}`, payload)
		},

		remove: (id: number): Promise<AxiosResponse> => {
			return axiosInstance.delete(`/${resource}/${id}`)
		},
	}
}
