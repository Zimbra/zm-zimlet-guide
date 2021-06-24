import { withIntlWrapper } from '@zimbra-client/enhancers';

/**
 * @method withIntlWrapper
 * accepts three arguments which can be use to load zimlet locale.
 * @param {Object} - with following values
 * @param {Function} importFn which returns `import` with intl locale path of the zimlet.
 * @param {Boolean} showLoader Show loader on container or not
 *
 */
export const withIntl = () => withIntlWrapper(
    {
        importFn: locale => import(/* webpackMode: "eager" */`./intl/${locale}.json`),
        showLoader: false
    }
);