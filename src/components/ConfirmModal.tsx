import NetworkIcon from '@icon/NetworkIcon.tsx'
import { useConfirmStore } from 'src/store/useConfirmStore.ts'
import { useFilterStore } from 'src/store/useFilterStore.ts'

const ConfirmModal = () => {
	const { isOpen, message, onConfirm, close } = useConfirmStore()
	const { isSubmitting } = useFilterStore()
	if (!isOpen) {
		return null
	}
	const handleConfirm = () => {
		if (onConfirm) {
			onConfirm()
		}
	}
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
			<div className="bg-white p-6 rounded-lg flex items-center flex-col w-full max-w-[1280px]">
				<p className="mb-4">{message}</p>
				<div className="flex justify-end gap-4">
					<button
						onClick={close}
						disabled={isSubmitting}
						className={` box-border bg-white max-h-16 py-6 border-2 
						border-[#FF5F00] rounded-2xl text-[#FF5F00] transition-colors
						duration-200 ease-in-out hover:border-[#FF3D00] 
						hover:text-[#FF3D00] active:border-[#FF5F00] 
						active:bg-[#FF5F00] active:text-white`}
					>
						<p className="px-8.5 text-base font-semibold font-inter leading-3 text-center tracking-[0.03em]">
							{`Use old filter`}
						</p>
					</button>

					<button
						onClick={handleConfirm}
						disabled={isSubmitting}
						className={`relative max-h-16 py-6 bg-orange-600 hover:bg-orange-600/70 
							active:bg-orange-700 text-white rounded-2xl text-base 
							leading-4 font-semibold text-center font-inter transition-colors
							 duration-200 ease-in-out flex justify-center items-center`}
					>
						{isSubmitting && (
							<div className={'pr-2 pl-9.5'}>
								<NetworkIcon
									width={24}
									height={24}
									fill="white"
									className=" left-4 animate-spin"
								/>
							</div>
						)}

						<p
							className={`pr-[39px] text-base font-semibold font-inter leading-3 text-center tracking-[0.03em] ${isSubmitting ? '' : 'pl-[39px]'}`}
						>
							{`Apply new filter`}
						</p>
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal
