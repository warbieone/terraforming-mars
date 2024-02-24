"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const TrimWhitespace_1 = require("@/client/directives/TrimWhitespace");
const App_1 = require("@/client/components/App");
const PreferencesManager_1 = require("@/client/utils/PreferencesManager");
const i18n_plugin_1 = require("@/client/plugins/i18n.plugin");
async function bootstrap() {
    const lang = (0, PreferencesManager_1.getPreferences)().lang;
    if (lang !== 'en') {
        try {
            window._translations = await fetch(`assets/locales/${lang}.json`).then((res) => res.json());
        }
        catch (err) {
            console.warn(`Cannot load ${lang} translations. See network for details.`);
        }
    }
    vue_1.default.use(i18n_plugin_1.default);
    vue_1.default.directive('trim-whitespace', {
        inserted: TrimWhitespace_1.trimEmptyTextNodes,
        componentUpdated: TrimWhitespace_1.trimEmptyTextNodes,
    });
    if (window.isSecureContext && 'serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('sw.js').then(function (registration) {
                console.log('registered the service worker', registration);
            });
        });
    }
    new vue_1.default(App_1.mainAppSettings);
}
bootstrap();
