"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectResources = void 0;
const AndOptions_1 = require("./AndOptions");
const SelectAmount_1 = require("./SelectAmount");
const Units_1 = require("../../common/Units");
const utils_1 = require("../../common/utils/utils");
class SelectResources extends AndOptions_1.AndOptions {
    constructor(player, count, title, units = Units_1.Units.of({})) {
        super(() => {
            const array = Object.values(units);
            if (array.some((count) => count < 0)) {
                throw new Error('All units must be positive');
            }
            if ((0, utils_1.sum)(array) !== this.count) {
                throw new Error(`Select ${this.count} resources.`);
            }
            this.player.addUnits(this.units, { log: true });
            return undefined;
        }, ...SelectResources.makeOptions(count, units));
        this.player = player;
        this.count = count;
        this.title = title;
        this.units = units;
    }
    static makeOptions(count, units) {
        const selectMegacredits = new SelectAmount_1.SelectAmount('Megacredits', 'Select', (amount) => {
            units.megacredits = amount;
            return undefined;
        }, 0, count);
        const selectSteel = new SelectAmount_1.SelectAmount('Steel', 'Select', (amount) => {
            units.steel = amount;
            return undefined;
        }, 0, count);
        const selectTitanium = new SelectAmount_1.SelectAmount('Titanium', 'Select', (amount) => {
            units.titanium = amount;
            return undefined;
        }, 0, count);
        const selectPlants = new SelectAmount_1.SelectAmount('Plants', 'Select', (amount) => {
            units.plants = amount;
            return undefined;
        }, 0, count);
        const selectEnergy = new SelectAmount_1.SelectAmount('Energy', 'Select', (amount) => {
            units.energy = amount;
            return undefined;
        }, 0, count);
        const selectHeat = new SelectAmount_1.SelectAmount('Heat', 'Select', (amount) => {
            units.heat = amount;
            return undefined;
        }, 0, count);
        return [selectMegacredits, selectSteel, selectTitanium, selectPlants, selectEnergy, selectHeat];
    }
}
exports.SelectResources = SelectResources;
