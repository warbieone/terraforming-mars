"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showModal = exports.hasShowModal = exports.windowHasHTMLDialogElement = void 0;
function windowHasHTMLDialogElement() {
    return window.HTMLDialogElement !== undefined;
}
exports.windowHasHTMLDialogElement = windowHasHTMLDialogElement;
function hasShowModal(dialogElement) {
    const de = dialogElement;
    return de.showModal !== undefined && typeof (de.showModal) === 'function';
}
exports.hasShowModal = hasShowModal;
function showModal(dialogElement) {
    var _a, _b;
    (_b = (_a = dialogElement).showModal) === null || _b === void 0 ? void 0 : _b.call(_a);
}
exports.showModal = showModal;
