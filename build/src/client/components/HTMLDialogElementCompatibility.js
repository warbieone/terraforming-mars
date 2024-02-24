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
    dialogElement.showModal?.();
}
exports.showModal = showModal;
