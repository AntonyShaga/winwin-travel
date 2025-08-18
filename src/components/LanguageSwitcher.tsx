import { useTranslation } from 'react-i18next'

import Button from '@components/ui/Button.tsx'

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation()
	const changeLanguage = (lang: string) => {
		i18n.changeLanguage(lang)
		localStorage.setItem('lang', lang)
	}
	const { t } = useTranslation('filter')
	return (
		<div className="flex gap-2">
			<Button
				variant="outline"
				onClick={() => changeLanguage('en')}
			>
				{t('english')}
			</Button>
			<Button
				variant="outline"
				onClick={() => changeLanguage('uk')}
			>
				{t('ukrainian')}
			</Button>
		</div>
	)
}
