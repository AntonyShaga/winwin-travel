import { create } from 'zustand'

interface ConfirmStore {
	isOpen: boolean
	message: string
	onConfirm: () => void
	open: (message: string, onConfirm: () => void) => void
	close: () => void
}

export const useConfirmStore = create<ConfirmStore>(set => ({
	isOpen: false,
	message: '',
	onConfirm: () => {},
	open: (message, onConfirm) => set({ isOpen: true, message, onConfirm }),
	close: () => set({ isOpen: false })
}))
