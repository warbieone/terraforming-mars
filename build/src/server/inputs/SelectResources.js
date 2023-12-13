"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectResources = void 0;
const AndOptions_1 = require("./AndOptions");
const SelectAmount_1 = require("./SelectAmount");
const Units_1 = require("../../common/Units");
const utils_1 = require("../../common/utils/utils");
class SelectResources extends AndOptions_1.AndOptions {
    static makeOptions(count, units) {
        const selectMegacredits = new SelectAmount_1.SelectAmount('Megacredits', 'Select', 0, count)
            .andThen((amount) => {
            units.megacredits = amount;
            return undefined;
        });
        const selectSteel = new SelectAmount_1.SelectAmount('Steel', 'Select', 0, count)
            .andThen((amount) => {
            units.steel = amount;
            return undefined;
        });
        const selectTitanium = new SelectAmount_1.SelectAmount('Titanium', 'Select', 0, count)
            .andThen((amount) => {
            units.titanium = amount;
            return undefined;
        });
        const selectPlants = new SelectAmount_1.SelectAmount('Plants', 'Select', 0, count)
            .andThen((amount) => {
            units.plants = amount;
            return undefined;
        });
        const selectEnergy = new SelectAmount_1.SelectAmount('Energy', 'Select', 0, count)
            .andThen((amount) => {
            units.energy = amount;
            return undefined;
        });
        const selectHeat = new SelectAmount_1.SelectAmount('Heat', 'Select', 0, count)
            .andThen((amount) => {
            units.heat = amount;
            return undefined;
        });
        return [selectMegacredits, selectSteel, selectTitanium, selectPlants, selectEnergy, selectHeat];
    }
    constructor(player, count, title, units = Units_1.Units.of({})) {
        super(...SelectResources.makeOptions(count, units));
        this.player = player;
        this.count = count;
        this.title = title;
        this.units = units;
        this.andThen(() => {
            const array = Object.values(units);
            if (array.some((count) => count < 0)) {
                throw new Error('All units must be positive');
            }
            if ((0, utils_1.sum)(array) !== this.count) {
                throw new Error(`Select ${this.count} resources.`);
            }
            this.player.stock.addUnits(this.units, { log: true });
            return undefined;
        });
    }
}
exports.SelectResources = SelectResources;
//# sourceMappingURL=SelectResources.js.map