import { useConfirmStore } from 'src/store/useConfirmStore'
import { useFilterStore } from 'src/store/useFilterStore'

import { useGetFilterData } from '@api/filters'

import ConfirmModal from '@components/ConfirmModal'
import FilterModal from '@components/Filter/FilterModal'

const FilterPage = () => {
	const { data, isLoading } = useGetFilterData()
	const {
		isModalOpen,
		tempFilters,
		filters,
		openModal,
		closeModal,
		toggleOption,
		applyFilters,
		clearFilters
	} = useFilterStore()

	const { open: openConfirm, close: closeConfirm } = useConfirmStore()

	if (isLoading || !data) {
		return <p>Loading filters...</p>
	}

	const handleApplyWithConfirm = () => {
		closeModal()
		openConfirm('Do you want to apply new filter', () => {
			applyFilters(() => {
				closeConfirm()
			})
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
				filters={tempFilters}
				toggleOption={toggleOption}
				handleApply={handleApplyWithConfirm}
				handleClearFilters={clearFilters}
				closeModal={closeModal}
			/>

			<h2 className="mt-6 font-bold text-lg">{`Selected Filters (Debug)`}</h2>
			<pre className="bg-gray-100 p-4 rounded">
				{JSON.stringify(filters, null, 2)}
			</pre>

			<ConfirmModal />
		</div>
	)
}

export default FilterPage
