import { useTranslation } from 'react-i18next'

import { useConfirmStore } from 'src/store/useConfirmStore'
import { useFilterStore } from 'src/store/useFilterStore'

import { useGetFilterData } from '@api/filters'

import ConfirmModal from '@components/ConfirmModal'
import FilterModal from '@components/FilterModal/FilterModal'
import { LanguageSwitcher } from '@components/LanguageSwitcher.tsx'
import Button from '@components/ui/Button.tsx'

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
	const { t } = useTranslation('filter')
	if (isLoading || !data) {
		return <p>Loading filters...</p>
	}

	const handleApplyWithConfirm = () => {
		closeModal()
		openConfirm(() => {
			applyFilters(() => {
				closeConfirm()
			})
		})
	}

	return (
		<div className="text-lg">
			<div className="flex items-center justify-around w-full">
				<LanguageSwitcher />
				<Button onClick={openModal}>{t('openFilters')}</Button>
			</div>

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
