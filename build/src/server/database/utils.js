"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daysAgoToSeconds = exports.stringToNumber = exports.dateToSeconds = exports.addDays = void 0;
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
function stringToNumber(s, defaultValue) {
    const parsed = parseInt(s || '');
    return Number.isInteger(parsed) ? parsed : defaultValue;
}
exports.stringToNumber = stringToNumber;
function daysAgoToSeconds(dayString, defaultValue) {
    const days = stringToNumber(dayString, defaultValue);
    const date = addDays(new Date(), -days);
    return dateToSeconds(date);
}
exports.daysAgoToSeconds = daysAgoToSeconds;
