export interface LanguageSupported {
    name: string;
    locale: string;
    icon: string;
}

export const LANGUAGES_SUPPORTED: LanguageSupported[] = [
    { name: 'English', locale: 'en', icon: '' } as LanguageSupported,
    { name: 'Español', locale: 'es', icon: '' } as LanguageSupported
];
