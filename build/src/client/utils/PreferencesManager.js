"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreferences = exports.PreferencesManager = void 0;
const defaults = {
    learner_mode: true,
    enable_sounds: true,
    magnify_cards: true,
    show_alerts: true,
    lang: 'en',
    hide_hand: false,
    hide_awards_and_milestones: false,
    show_milestone_details: true,
    show_award_details: true,
    hide_top_bar: false,
    small_cards: false,
    remove_background: false,
    hide_active_cards: false,
    hide_automated_cards: false,
    hide_event_cards: false,
    hide_tile_confirmation: false,
    hide_discount_on_cards: false,
    hide_animated_sidebar: false,
    experimental_ui: false,
    debug_view: false,
};
class PreferencesManager {
    constructor() {
        this._values = Object.assign({}, defaults);
        for (const key of Object.keys(defaults)) {
            const value = this.localStorageSupported() ? localStorage.getItem(key) : undefined;
            if (value)
                this._set(key, value);
        }
    }
    localStorageSupported() {
        return typeof localStorage !== 'undefined';
    }
    static resetForTest() {
        this.INSTANCE = new PreferencesManager();
    }
    _set(key, val) {
        if (key === 'lang') {
            this._values.lang = String(val);
        }
        else {
            this._values[key] = typeof (val) === 'boolean' ? val : (val === '1');
        }
    }
    values() {
        return this._values;
    }
    set(name, val, setOnChange = false) {
        if (setOnChange && this._values[name] === val)
            return;
        this._set(name, val);
        if (this.localStorageSupported()) {
            if (name === 'lang') {
                localStorage.setItem(name, this._values.lang);
            }
            else {
                localStorage.setItem(name, val ? '1' : '0');
            }
        }
    }
}
exports.PreferencesManager = PreferencesManager;
PreferencesManager.INSTANCE = new PreferencesManager();
function getPreferences() {
    return PreferencesManager.INSTANCE.values();
}
exports.getPreferences = getPreferences;
