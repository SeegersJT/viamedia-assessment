export interface BaseQueryParams {
	limit?: number
	skip?: number
	select?: string
	sortBy?: string
	order?: 'asc' | 'desc'
	search?: string
}

export function buildQueryString(params: BaseQueryParams): string {
	const { search, limit, skip, select, sortBy, order } = params
	const query = new URLSearchParams()

	if (search) query.set('q', search)
	if (limit !== undefined) query.set('limit', String(limit))
	if (skip !== undefined) query.set('skip', String(skip))
	if (select) query.set('select', select)
	if (sortBy) query.set('sortBy', sortBy)
	if (order) query.set('order', order)

	return query.toString()
}
