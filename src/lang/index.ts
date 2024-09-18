type csvRows = { key: string; enValue: string; frValue: string }[];
interface LocaleMessages {
    [key: string]: { [name: string]: string };
}

import { createI18n } from 'vue-i18n';
import mainRows from '@/lang/lang.csv';
import mapRows from '@/components/map/lang/lang.csv'
import layerRows from '@/components/layers/lang/lang.csv'
import helperRows from '@/components/helpers/lang/lang.csv'
import fixtureRows from '@/components/fixtures/lang/lang.csv'

const lang = document.documentElement.getAttribute('lang');
const allRows = mainRows.concat(mapRows, layerRows, helperRows, fixtureRows)

/**
 * Fold the imported CSV file in the form of `{ key: string, enValue: string, frValue: string }[]` to the form understood by VueI18n: `{ en: { [name: string]: string }, fr: { [name: string]: string } }`.
 *
 * @param {csvRows} rows
 * @returns {LocaleMessages}
 */
function fold(rows: csvRows): LocaleMessages {
    return rows.reduce(
        (map, item) => {
            map.en[item.key] = item.enValue;
            // TODO: Change this once we have French translations
            map.fr[item.key] = `[FR] ${item.enValue}`;
            return map;
        },
        { en: {}, fr: {} } as LocaleMessages
    );
}

const i18n = createI18n({
    legacy: false,
    locale: lang || 'en',
    fallbackLocale: 'en',
    globalInjection: true,
    messages: fold(allRows)
});

export { i18n };