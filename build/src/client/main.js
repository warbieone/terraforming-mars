"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const TrimWhitespace_1 = require("@/client/directives/TrimWhitespace");
const App_1 = require("@/client/components/App");
const PreferencesManager_1 = require("@/client/utils/PreferencesManager");
const i18n_plugin_1 = require("@/client/plugins/i18n.plugin");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const lang = (0, PreferencesManager_1.getPreferences)().lang;
        if (lang !== 'en') {
            try {
                window._translations = yield fetch(`assets/locales/${lang}.json`).then((res) => res.json());
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
    });
}
bootstrap();
