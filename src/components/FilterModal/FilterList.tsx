import React from 'react'

import { FilterChooseOption, FilterItem } from 'src/shared/api/types/Filter'
import { useFilterTranslation } from 'src/shared/hooks/useFilterTranslation.ts'

import CustomCheckbox from '@components/ui/CustomCheckbox.tsx'

interface FilterListProps {
	data: FilterItem[]
	filters: Record<string, string[]>
	toggleOption: (filterId: string, optionId: string) => void
}

const FilterList: React.FC<FilterListProps> = ({
	data,
	filters,
	toggleOption
}) => {
	const { translateFilter } = useFilterTranslation()

	return (
		<div className="flex-1 overflow-y-auto flex flex-col gap-8 pb-6">
			{data.map(filter => (
				<div
					key={filter.id}
					className="border-b-2 border-[#B4B4B4] pb-6"
				>
					<h3 className="font-inter font-medium text-[24px] leading-[24px] tracking-[0em] mb-6">
						{translateFilter(filter.id)}
					</h3>
					{filter.options?.length > 0 && (
						<div
							className={`flex flex-wrap gap-x-8 gap-y-2 ${
								filter.options.length === 1 || filter.options.length === 2
									? 'flex-col'
									: filter.options.length === 3
										? 'flex-row'
										: filter.options.length === 4
											? 'grid grid-cols-2 gap-2'
											: filter.options.length === 6
												? 'grid grid-cols-3 gap-2'
												: 'grid grid-cols-3'
							}`}
						>
							{filter.options.map((option: FilterChooseOption) => (
								<CustomCheckbox
									key={option.id}
									checked={filters[filter.id]?.includes(option.id) || false}
									onChange={() => toggleOption(filter.id, option.id)}
									label={translateFilter(filter.id, option.id)}
								/>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	)
}

export default FilterList
