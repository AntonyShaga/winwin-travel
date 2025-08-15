import { useQuery } from '@tanstack/react-query'
import { FilterItem } from 'src/shared/api/types/Filter'

interface FilterData {
	filterItems: FilterItem[]
}

const fetchFilterData = async (): Promise<FilterData> => {
	const res = await fetch('src/shared/temp/filterData.json')
	if (!res.ok) {
		throw new Error('Failed to fetch filter data')
	}
	return res.json()
}

export const useGetFilterData = () => {
	return useQuery<FilterData>({
		queryKey: ['filterData'],
		queryFn: fetchFilterData
	})
}
