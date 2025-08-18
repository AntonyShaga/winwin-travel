import { useTranslation } from 'react-i18next'

export const useFilterTranslation = () => {
	const { t } = useTranslation('filter')

	const translateFilter = (filterId: string, optionId?: string) => {
		const key = optionId
			? `${filterId}.options.${optionId}.name`
			: `${filterId}.name`
		return t(key as string, key)
	}

	return { translateFilter }
}
