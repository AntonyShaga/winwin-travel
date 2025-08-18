import { useTranslation } from 'react-i18next'

import CloseIcon from '@icon/CloseIcon.tsx'
import NetworkIcon from '@icon/NetworkIcon.tsx'
import { useConfirmStore } from 'src/store/useConfirmStore.ts'
import { useFilterStore } from 'src/store/useFilterStore.ts'

import Button from '@components/ui/Button.tsx'

const ConfirmModal = () => {
	const { isOpen, onConfirm, close } = useConfirmStore()
	const { isSubmitting } = useFilterStore()

	const handleConfirm = () => {
		if (onConfirm) {
			onConfirm()
		}
	}

	const { t } = useTranslation('filter')

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-50 
        bg-black/50 transition-opacity duration-300
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
		>
			<div
				className={`bg-white p-8 rounded-lg flex items-center flex-col gap-30 
          w-full max-w-[1280px] transition-all duration-300 ease-out
          transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
			>
				<div className="relative w-full flex items-center justify-center mb-16 pb-6.5">
					<p className="font-inter font-medium text-[40px] leading-[40px] text-[#31393C]">
						{t('confirmNewFilter')}
					</p>
					<Button
						variant="icon"
						onClick={close}
						size="iconOnly"
						className="absolute right-0"
					>
						<CloseIcon />
					</Button>
				</div>

				<div className="flex justify-end gap-4">
					<Button
						variant="secondary"
						onClick={close}
						disabled={isSubmitting}
						size={'lg'}
					>
						<p className="text-base font-semibold font-inter leading-3 text-center tracking-[0.03em]">
							{t('oldFilter')}
						</p>
					</Button>
					<Button
						variant="primary"
						loading={isSubmitting}
						onClick={handleConfirm}
						size={'iconOnly'}
						loadingIcon={
							<NetworkIcon
								width={24}
								height={24}
								fill="white"
								className="animate-spin"
							/>
						}
					>
						<p
							className={`pr-[39px] text-base font-semibold font-inter leading-3 text-center tracking-[0.03em] ${
								isSubmitting ? '' : 'pl-[39px]'
							}`}
						>
							{t('newFilter')}
						</p>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal
