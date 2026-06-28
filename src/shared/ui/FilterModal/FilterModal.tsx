import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterType } from '../../api/types/Filter'
import type { SearchRequestOptions } from '../../api/types/SearchRequest/SearchRequestFilter'
import { useFilterData } from '../../api/useFilterData'
import { useFilterStore } from '../../store'

interface FilterModalProps {
	isOpen: boolean
	onClose: () => void
}

export const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const { filters, setFilter, clearFilters } = useFilterStore()
	const { data } = useFilterData()

	const [draft, setDraft] = useState<SearchRequestOptions[]>([...filters])

	useEffect(() => {
		if (isOpen) {
			setDraft([...filters])
		}
	}, [isOpen])

	const isChecked = (filterId: string, optionId: string): boolean => {
		const found = draft.find(item => item.id === filterId)
		return found?.optionsIds.includes(optionId) ?? false
	}

	const toggleOption = (filterId: string, optionId: string) => {
		setDraft(prev => {
			const existing = prev.find(item => item.id === filterId)
			if (existing) {
				const newOptionsIds = existing.optionsIds.includes(optionId)
					? existing.optionsIds.filter(oid => oid !== optionId)
					: [...existing.optionsIds, optionId]
				if (newOptionsIds.length === 0) {
					return prev.filter(item => item.id !== filterId)
				}
				return prev.map(item =>
					item.id === filterId ? { ...item, optionsIds: newOptionsIds } : item
				)
			}
			return [
				...prev,
				{ id: filterId, type: FilterType.OPTION, optionsIds: [optionId] }
			]
		})
	}

	const handleApply = () => {
		clearFilters()
		draft.forEach(filter => setFilter(filter))
		onClose()
	}

	const handleClear = () => {
		setDraft([])
	}

	if (!isOpen) {
		return null
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
			onClick={onClose}
		>
			<div
				className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-xl"
				onClick={e => e.stopPropagation()}
			>
				{/* Header */}
				<div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
					<h2 className="text-xl font-semibold text-gray-900">
						{t('modal.title')}
					</h2>
					<button
						onClick={onClose}
						aria-label={t('modal.close')}
						className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line
								x1="18"
								y1="6"
								x2="6"
								y2="18"
							/>
							<line
								x1="6"
								y1="6"
								x2="18"
								y2="18"
							/>
						</svg>
					</button>
				</div>

				{/* Body */}
				<div className="flex-1 overflow-y-auto px-6 py-4">
					{data?.filterItems.map(section => (
						<div
							key={section.id}
							className="mb-6 border-b border-gray-100 pb-6 last:mb-0 last:border-0 last:pb-0"
						>
							<h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
								{section.name}
							</h3>
							<div className="grid grid-cols-3 gap-3">
								{section.options.map(option => (
									<label
										key={option.id}
										className="group flex cursor-pointer items-center gap-2"
									>
										<input
											type="checkbox"
											checked={isChecked(section.id, option.id)}
											onChange={() => toggleOption(section.id, option.id)}
											className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-blue-600"
										/>
										<span className="text-sm text-gray-700 group-hover:text-gray-900">
											{option.name}
										</span>
									</label>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
					<button
						onClick={handleClear}
						className="text-sm text-blue-600 underline hover:text-blue-800"
					>
						{t('modal.clearAll')}
					</button>
					<button
						onClick={handleApply}
						className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
					>
						{t('modal.apply')}
					</button>
				</div>
			</div>
		</div>
	)
}
