"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndoActionOption = void 0;
const SelectOption_1 = require("./SelectOption");
class UndoActionOption extends SelectOption_1.SelectOption {
    constructor() {
        super('Undo last action', 'Undo', () => undefined);
    }
}
exports.UndoActionOption = UndoActionOption;
