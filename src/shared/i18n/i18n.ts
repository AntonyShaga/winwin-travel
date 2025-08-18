import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'

import { I18N_DEFAULT_LANGUAGE, I18N_DEFAULT_NS } from './i18nConstants'
import { resources } from './locales'

const savedLanguage =
	typeof window !== 'undefined'
		? localStorage.getItem('lang') || I18N_DEFAULT_LANGUAGE
		: I18N_DEFAULT_LANGUAGE

i18n.use(initReactI18next).init({
	resources: resources,
	debug: true,
	// Remove on connect language detector
	lng: savedLanguage,
	interpolation: {
		escapeValue: false
	},
	defaultNS: I18N_DEFAULT_NS
})
