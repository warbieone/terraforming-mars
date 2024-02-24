"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@/client/directives/i18n");
exports.default = {
    install: (Vue) => {
        Vue.prototype.$t = i18n_1.$t;
        Vue.directive('i18n', {
            inserted: i18n_1.translateTextNode,
            componentUpdated: i18n_1.translateTextNode,
        });
    },
};
