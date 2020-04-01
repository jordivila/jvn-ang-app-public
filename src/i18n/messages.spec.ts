import { LANGUAGES_SUPPORTED, LanguageSupported } from './LanguagesSupported';
import { messagesEs } from './messages.es';
import { messagesEn } from './messages.en';

describe('i18n Messages', () => {

    interface IsKeyComparisonOkResult {
        result: boolean;
        path: string;
    }

    const messagesAll = {
        es: messagesEs,
        en: messagesEn,
    };

    const isKeyComparisonOk = (a: any, b: any, path: string): IsKeyComparisonOkResult => {
        const aProps = Object.getOwnPropertyNames(a).sort();
        const bProps = Object.getOwnPropertyNames(b).sort();

        if (aProps.length !== bProps.length) {
            return { result: false, path: `Messages.All.${path} has different number of keys` } as IsKeyComparisonOkResult;
        }

        for (let i = 0; i < aProps.length; i++) {
            const aPropName = aProps[i];
            const bPropName = bProps[i];

            if (aPropName === bPropName) {
                if ((typeof a[aPropName] === 'object') || (typeof b[bPropName] === 'object')) {
                    const temp = isKeyComparisonOk(a[aPropName], b[bPropName], `${path}.${bPropName}`);
                    if (!temp.result) {
                        return temp;
                    }
                }
            } else {
                return {
                    result: false,
                    path: `Messages.All.${path}.${aPropName} is different than Messages.All.${path}.${bPropName}`
                } as IsKeyComparisonOkResult;
            }
        }

        return { result: true, path } as IsKeyComparisonOkResult;
    };

    beforeEach(() => {

    });

    it('All languages should have the same keys',
        () => {

            LANGUAGES_SUPPORTED.forEach((lang: LanguageSupported, index: number, array: LanguageSupported[]) => {
                if (index > 0) {
                    const currentLang = messagesAll[lang.locale];
                    const previousLang = messagesAll[array[index - 1].locale];
                    const result = isKeyComparisonOk(currentLang, previousLang, lang.locale);
                    expect(result.result).toBeTruthy(result.path);
                }
            });

        });
});
