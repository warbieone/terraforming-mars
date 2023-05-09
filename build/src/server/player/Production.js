"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Production = void 0;
const CardName_1 = require("../../common/cards/CardName");
const LawSuit_1 = require("../cards/promo/LawSuit");
const Manutech_1 = require("../cards/venusNext/Manutech");
const Player_1 = require("../Player");
const Resource_1 = require("../../common/Resource");
const Units_1 = require("../../common/Units");
class Production {
    constructor(player, units = Units_1.Units.EMPTY) {
        this.player = player;
        this.units = Units_1.Units.of(units);
    }
    get megacredits() {
        return this.units.megacredits;
    }
    get steel() {
        return this.units.steel;
    }
    get titanium() {
        return this.units.titanium;
    }
    get plants() {
        return this.units.plants;
    }
    get energy() {
        return this.units.energy;
    }
    get heat() {
        return this.units.heat;
    }
    get(resource) {
        return this.units[resource];
    }
    override(units) {
        this.units = Units_1.Units.of(Object.assign({}, units));
    }
    asUnits() {
        return Object.assign({}, this.units);
    }
    add(resource, amount, options) {
        const adj = resource === Resource_1.Resource.MEGACREDITS ? -5 : 0;
        const delta = (amount >= 0) ? amount : Math.max(amount, -(this.units[resource] - adj));
        this.units[resource] += delta;
        if ((options === null || options === void 0 ? void 0 : options.log) === true) {
            this.player.logUnitDelta(resource, amount, 'production', options.from, options.stealing);
        }
        if ((options === null || options === void 0 ? void 0 : options.from) instanceof Player_1.Player) {
            LawSuit_1.LawSuit.resourceHook(this.player, resource, delta, options.from);
        }
        if ((options === null || options === void 0 ? void 0 : options.from) !== undefined && delta < 0 && (options.from instanceof Player_1.Player && options.from.id !== this.player.id)) {
            this.player.resolveInsurance();
        }
        if (this.player.isCorporation(CardName_1.CardName.MANUTECH)) {
            Manutech_1.Manutech.onProductionGain(this.player, resource, amount);
        }
    }
    canAdjust(units) {
        return this.units.megacredits + units.megacredits >= -5 &&
            this.units.steel + units.steel >= 0 &&
            this.units.titanium + units.titanium >= 0 &&
            this.units.plants + units.plants >= 0 &&
            this.units.energy + units.energy >= 0 &&
            this.units.heat + units.heat >= 0;
    }
    adjust(units, options) {
        if (units.megacredits !== undefined) {
            this.add(Resource_1.Resource.MEGACREDITS, units.megacredits, options);
        }
        if (units.steel !== undefined) {
            this.add(Resource_1.Resource.STEEL, units.steel, options);
        }
        if (units.titanium !== undefined) {
            this.add(Resource_1.Resource.TITANIUM, units.titanium, options);
        }
        if (units.plants !== undefined) {
            this.add(Resource_1.Resource.PLANTS, units.plants, options);
        }
        if (units.energy !== undefined) {
            this.add(Resource_1.Resource.ENERGY, units.energy, options);
        }
        if (units.heat !== undefined) {
            this.add(Resource_1.Resource.HEAT, units.heat, options);
        }
    }
}
exports.Production = Production;
