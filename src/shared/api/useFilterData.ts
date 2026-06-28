import { useQuery } from '@tanstack/react-query'

import type { FilterItem } from './types/Filter'

export interface FilterDataResponse {
	filterItems: FilterItem[]
}

const filterDataQueryKey = ['filterData'] as const

const fetchFilterData = async (): Promise<FilterDataResponse> => {
	const module = await import('../temp/filterData.json')
	return module.default as unknown as FilterDataResponse
}

export const useFilterData = () =>
	useQuery({
		queryKey: filterDataQueryKey,
		queryFn: fetchFilterData
	})
