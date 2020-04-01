export const DEFAULT_THEME: Theme = { name: 'Default Theme', key: 'default-theme' };
export const ERROR_THEME: Theme = { name: 'Error Theme', key: 'error-theme' };
export const THEMES: Array<ThemeAvailable> = [
    { ...DEFAULT_THEME, ...{ isActive: true } },
    { ...ERROR_THEME, ...{ isActive: false } }
];

export interface Theme {
    name: string;
    key: string;
}

export interface ThemeAvailable extends Theme {
    isActive: boolean;
}
