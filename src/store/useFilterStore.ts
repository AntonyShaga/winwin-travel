import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface FilterStore {
	isModalOpen: boolean
	filters: Record<string, string[]>
	tempFilters: Record<string, string[]>
	isSubmitting: boolean

	openModal: () => void
	closeModal: () => void
	toggleOption: (filterId: string, optionId: string) => void
	applyFilters: (onSuccess?: () => void) => void
	cancelApply: () => void
	clearFilters: () => void
}

export const useFilterStore = create(
	persist<FilterStore>(
		set => ({
			isModalOpen: false,
			filters: {},
			tempFilters: {},
			isSubmitting: false,

			openModal: () =>
				set(state => ({
					isModalOpen: true,
					tempFilters: { ...state.filters }
				})),
			closeModal: () => set({ isModalOpen: false }),

			toggleOption: (filterId, optionId) =>
				set(state => {
					const current = state.tempFilters[filterId] || []
					const updated = current.includes(optionId)
						? current.filter(id => id !== optionId)
						: [...current, optionId]
					return { tempFilters: { ...state.tempFilters, [filterId]: updated } }
				}),
			applyFilters: onSuccess => {
				set({ isSubmitting: true })
				setTimeout(() => {
					set(state => ({
						filters: { ...state.tempFilters },
						isSubmitting: false
					}))
					if (onSuccess) {
						onSuccess()
					}
				}, 2000)
			},
			cancelApply: () =>
				set(state => ({
					tempFilters: { ...state.filters },
					isModalOpen: true
				})),

			clearFilters: () => set({ filters: {}, tempFilters: {} })
		}),
		{
			name: 'filter-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
