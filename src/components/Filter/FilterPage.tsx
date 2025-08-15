import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useGetFilterData } from '@api/filters.ts'

import FilterModal from '@components/Filter/FilterModal.tsx'

const FilterPage = () => {
	const { data, isLoading } = useGetFilterData()
	const [searchParams, setSearchParams] = useSearchParams()
	const isModalOpen = searchParams.get('modal') === 'true'
	const filters = JSON.parse(searchParams.get('filters') || '{}')
	const [isSubmitting, setIsSubmitting] = useState(false)

	if (isLoading || !data) {
		return <p>Loading filters...</p>
	}

	const openModal = () =>
		setSearchParams({ ...Object.fromEntries(searchParams), modal: 'true' })

	const closeModal = () => {
		const params = Object.fromEntries(searchParams)
		delete params.modal
		setSearchParams(params)
	}

	const handleApply = () => {
		setIsSubmitting(true)
		setTimeout(() => {
			setIsSubmitting(false)
			closeModal()
		}, 2000)
	}

	const handleClearFilters = () => {
		const params = Object.fromEntries(searchParams)
		delete params.filters
		setSearchParams(params)
	}

	const toggleOption = (filterId: string, optionId: string) => {
		const currentFilters = { ...filters }
		const current = currentFilters[filterId] || []
		if (current.includes(optionId)) {
			currentFilters[filterId] = current.filter((id: string) => id !== optionId)
		} else {
			currentFilters[filterId] = [...current, optionId]
		}
		setSearchParams({
			...Object.fromEntries(searchParams),
			filters: JSON.stringify(currentFilters)
		})
	}

	return (
		<div className="text-lg">
			<button
				onClick={openModal}
				className="px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600"
			>
				{`Open Filters`}
			</button>

			<FilterModal
				isOpen={isModalOpen}
				data={data}
				filters={filters}
				toggleOption={toggleOption}
				handleApply={handleApply}
				handleClearFilters={handleClearFilters}
				closeModal={closeModal}
				isSubmitting={isSubmitting}
			/>

			<h2 className="mt-6 font-bold text-lg">{`Selected Filters (Debug)`}</h2>
			<pre className="bg-gray-100 p-4 rounded">
				{JSON.stringify(filters, null, 2)}
			</pre>
		</div>
	)
}

export default FilterPage
