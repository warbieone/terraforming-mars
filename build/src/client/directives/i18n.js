"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$t = exports.translateTextNode = exports.translateTextWithParams = exports.translateText = exports.translateMessage = exports.setTranslationContext = void 0;
const LogMessageDataType_1 = require("@/common/logs/LogMessageDataType");
const PreferencesManager_1 = require("@/client/utils/PreferencesManager");
const Log_1 = require("@/common/logs/Log");
const context = {
    playerView: undefined,
    players: new Map(),
};
function setTranslationContext(game) {
    context.playerView = game;
    context.players.clear();
    for (const player of game.players) {
        context.players.set(player.color, player.name);
    }
}
exports.setTranslationContext = setTranslationContext;
function translateMessage(message) {
    message.message = translateText(message.message);
    return Log_1.Log.applyData(message, (datum) => {
        var _a;
        if (datum === undefined) {
            return '';
        }
        switch (datum.type) {
            case LogMessageDataType_1.LogMessageDataType.RAW_STRING:
                return datum.value;
            case LogMessageDataType_1.LogMessageDataType.PLAYER:
                return (_a = context.players.get(datum.value)) !== null && _a !== void 0 ? _a : datum.value;
            case LogMessageDataType_1.LogMessageDataType.CARD:
            case LogMessageDataType_1.LogMessageDataType.GLOBAL_EVENT:
                return translateText(datum.value);
            default:
                return translateText(datum.value);
        }
    });
}
exports.translateMessage = translateMessage;
let translated;
function translateText(englishText) {
    const lang = (0, PreferencesManager_1.getPreferences)().lang;
    const translations = window._translations;
    if (lang === 'en' || translations === undefined) {
        return englishText;
    }
    englishText = normalizeText(englishText);
    if (/^(\W|\d)*$/.test(englishText)) {
        return englishText;
    }
    let translatedText = translations[englishText];
    if (translatedText === undefined) {
        const isTextInBrackets = englishText.startsWith('(') && englishText.endsWith(')');
        if (isTextInBrackets) {
            const translationAttempt = translations[englishText.slice(1, -1)];
            if (translationAttempt) {
                translatedText = `(${translationAttempt})`;
            }
        }
    }
    if (translatedText === undefined) {
        if (translated === undefined) {
            translated = new Set();
            for (const k in translations) {
                if (translations.hasOwnProperty(k))
                    translated.add(translations[k]);
            }
        }
        if (!translated.has(englishText)) {
            console.log(`${lang} - please translate: ${englishText}`);
        }
    }
    return translatedText || englishText;
}
exports.translateText = translateText;
function translateTextWithParams(englishText, params) {
    const data = params.map((p) => {
        return {
            type: LogMessageDataType_1.LogMessageDataType.RAW_STRING,
            value: p,
        };
    });
    const message = {
        message: englishText,
        data: data,
    };
    return translateMessage(message);
}
exports.translateTextWithParams = translateTextWithParams;
function normalizeText(text) {
    return text.replace(/[\n\r]/g, '').replace(/[ ]+/g, ' ');
}
function translateChildren(node) {
    for (let i = 0, length = node.childNodes.length; i < length; i++) {
        const child = node.childNodes[i];
        if (child.nodeType === Node.TEXT_NODE) {
            const text = child;
            const translatedText = translateText(text.data);
            if (translatedText !== text.data) {
                text.data = translatedText;
            }
        }
        else {
            translateChildren(child);
        }
    }
}
function translateTextNode(el) {
    translateChildren(el);
}
exports.translateTextNode = translateTextNode;
const $t = function (msg) {
    if (!msg)
        return '';
    if (typeof msg === 'number')
        return msg.toString();
    if (typeof msg === 'string')
        return translateText(msg);
    return translateMessage(msg);
};
exports.$t = $t;
