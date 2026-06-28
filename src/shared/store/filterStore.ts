import { create } from 'zustand'

import { SearchRequestFilter } from '../api/types/SearchRequest/SearchRequestFilter'

interface FilterStore {
	filters: SearchRequestFilter
	setFilter: (filter: SearchRequestFilter[number]) => void
	removeFilter: (id: string) => void
	clearFilters: () => void
}

export const useFilterStore = create<FilterStore>(set => ({
	filters: [],

	setFilter: filter =>
		set(state => {
			const exists = state.filters.some(item => item.id === filter.id)
			return {
				filters: exists
					? state.filters.map(item => (item.id === filter.id ? filter : item))
					: [...state.filters, filter]
			}
		}),

	removeFilter: id =>
		set(state => ({
			filters: state.filters.filter(item => item.id !== id)
		})),

	clearFilters: () => set({ filters: [] })
}))
