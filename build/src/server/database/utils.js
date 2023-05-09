"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daysAgoToSeconds = exports.dayStringToDays = exports.dateToSeconds = exports.addDays = void 0;
function addDays(date, days) {
    const ms = Math.round(date.getTime());
    const daysInMs = days * 86400 * 1000;
    return new Date(ms + daysInMs);
}
exports.addDays = addDays;
function dateToSeconds(date) {
    return Math.round(date.getTime() / 1000);
}
exports.dateToSeconds = dateToSeconds;
function dayStringToDays(dayString, defaultValue) {
    const parsed = parseInt(dayString || '');
    return Number.isInteger(parsed) ? parsed : defaultValue;
}
exports.dayStringToDays = dayStringToDays;
function daysAgoToSeconds(dayString, defaultValue) {
    const days = dayStringToDays(dayString, defaultValue);
    const date = addDays(new Date(), -days);
    return dateToSeconds(date);
}
exports.daysAgoToSeconds = daysAgoToSeconds;
