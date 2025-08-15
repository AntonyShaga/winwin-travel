import { useQuery } from '@tanstack/react-query'

const fetchFilterData = async () => {
	const res = await fetch('src/shared/temp/filterData.json')
	if (!res.ok) {
		throw new Error('Failed to fetch filter data')
	}
	return res.json()
}

export const useGetFilterData = () => {
	return useQuery({
		queryKey: ['filterData'],
		queryFn: fetchFilterData
	})
}
