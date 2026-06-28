import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '../../../shared/store'
import { FilterModal } from '../../../shared/ui/FilterModal'

export const App = () => {
	const { t } = useTranslation('filter')
	const filters = useFilterStore(state => state.filters)
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<section className="flex min-h-dvh flex-col items-center justify-center gap-6 p-8">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-6xl text-gray-600">
				WinWinTravel frontend test task
			</h1>

			<button
				onClick={() => setIsModalOpen(true)}
				className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
			>
				{t('home.openButton')}
			</button>

			<div className="w-full max-w-lg">
				<p className="mb-2 text-sm font-semibold text-gray-500">
					{t('home.selectedFilters')}
				</p>
				<pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
					{JSON.stringify(filters, null, 2)}
				</pre>
			</div>

			<FilterModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</section>
	)
}
