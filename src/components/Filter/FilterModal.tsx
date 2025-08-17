import React from 'react'

import CloseIcon from '@icon/CloseIcon.tsx'
import { FilterItem } from 'src/shared/api/types/Filter'

import FilterList from '@components/Filter/FilterList.tsx'
import Button from '@components/ui/Button.tsx'

interface FilterData {
	filterItems: FilterItem[]
}
interface FilterModalProps {
	isOpen: boolean
	data: FilterData
	filters: Record<string, string[]>
	toggleOption: (filterId: string, optionId: string) => void
	handleApply: () => void
	handleClearFilters: () => void
	closeModal: () => void
}

const FilterModal: React.FC<FilterModalProps> = ({
	isOpen,
	data,
	filters,
	toggleOption,
	handleApply,
	handleClearFilters,
	closeModal
}) => {
	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity  duration-300 ${
				isOpen
					? 'opacity-100 pointer-events-auto'
					: 'opacity-0 pointer-events-none'
			}`}
			style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
		>
			<div
				className={`bg-white rounded-2xl flex flex-col py-10 px-8 w-full max-w-[1280px] h-[95vh] max-h-[95vh] overflow-y-auto transform transition-transform duration-300 ease-out ${
					isOpen ? 'scale-100' : 'scale-95'
				}`}
			>
				<div className="relative w-full flex items-center justify-center border-b-2 border-[#B4B4B4] mb-16 pb-6.5">
					<h2 className="font-inter font-medium text-[40px] leading-[40px] tracking-normal px-1 py-1 text-[#31393C]">
						{`Filter`}
					</h2>
					<Button
						variant="icon"
						onClick={closeModal}
						size="iconOnly"
						className="absolute right-0"
					>
						<CloseIcon />
					</Button>
				</div>

				<FilterList
					data={data.filterItems}
					filters={filters}
					toggleOption={toggleOption}
				/>

				<div className="mt-auto relative w-full flex items-center justify-center">
					<Button
						variant="primary"
						onClick={handleApply}
						className="px-18 py-6"
					>
						{`Apply`}
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={handleClearFilters}
						className={'absolute right-0'}
					>
						{`Clear all parameters`}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default FilterModal
