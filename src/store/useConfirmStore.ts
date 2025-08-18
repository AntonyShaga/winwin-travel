import { create } from 'zustand'

interface ConfirmStore {
	isOpen: boolean
	onConfirm: () => void
	open: (onConfirm: () => void) => void
	close: () => void
}

export const useConfirmStore = create<ConfirmStore>(set => ({
	isOpen: false,
	onConfirm: () => {},
	open: onConfirm => set({ isOpen: true, onConfirm }),
	close: () => set({ isOpen: false })
}))
