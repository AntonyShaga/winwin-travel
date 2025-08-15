import React from 'react'

import CloseIcon from '@icon/CloseIcon.tsx'
import NetworkIcon from '@icon/NetworkIcon.tsx'
import { FilterItem } from 'src/shared/api/types/Filter'

import FilterList from '@components/Filter/FilterList.tsx'

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
	isSubmitting: boolean
}

const FilterModal: React.FC<FilterModalProps> = ({
	isOpen,
	data,
	filters,
	toggleOption,
	handleApply,
	handleClearFilters,
	closeModal,
	isSubmitting
}) => {
	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
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
						{/*Filter*/}
					</h2>
					<button
						onClick={closeModal}
						className="absolute right-0 px-1 py-1 rounded-full cursor-pointer"
					>
						<CloseIcon />
					</button>
				</div>

				<FilterList
					data={data.filterItems}
					filters={filters}
					toggleOption={toggleOption}
				/>

				<div className="mt-auto relative w-full flex items-center justify-center">
					<button
						onClick={handleApply}
						className="relative px-18 py-6 bg-orange-600 hover:bg-orange-600/70 active:bg-orange-700 text-white rounded-2xl text-base leading-4 font-semibold text-center font-inter transition-colors duration-200 ease-in-out flex justify-center items-center"
					>
						{isSubmitting && (
							<NetworkIcon
								width={24}
								height={24}
								fill="white"
								className="absolute left-4 animate-spin"
							/>
						)}
						<span>{isSubmitting ? 'Apply filter' : 'Apply'}</span>
					</button>

					<button
						onClick={handleClearFilters}
						className="absolute right-0 cursor-pointer font-inter font-medium text-[16px] leading-[16px] tracking-[0em] text-center underline text-[#078691] px-4 py-2 rounded transition-colors duration-200 ease-in-out hover:text-[#7E7E7E] active:text-[#31393C]"
					>
						{/*Clear all parameters*/}
					</button>
				</div>
			</div>
		</div>
	)
}

export default FilterModal
