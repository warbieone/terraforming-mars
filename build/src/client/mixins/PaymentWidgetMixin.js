"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentWidgetMixin = void 0;
const CardName_1 = require("@/common/cards/CardName");
const CardResource_1 = require("@/common/CardResource");
const ClientCardManifest_1 = require("@/client/cards/ClientCardManifest");
const Payment_1 = require("@/common/inputs/Payment");
const Spendable_1 = require("@/common/inputs/Spendable");
exports.PaymentWidgetMixin = {
    name: 'PaymentWidgetMixin',
    methods: {
        asModel() {
            return this;
        },
        getMegaCreditsMax() {
            const model = this.asModel();
            return Math.min(this.getAvailableUnits('megaCredits'), model.cost);
        },
        getResourceRate(unit) {
            switch (unit) {
                case 'steel':
                    return this.asModel().playerView.thisPlayer.steelValue;
                case 'titanium':
                    return this.getTitaniumResourceRate();
                default:
                    return Payment_1.DEFAULT_PAYMENT_VALUES[unit];
            }
        },
        getTitaniumResourceRate() {
            const paymentOptions = this.asModel().playerinput.paymentOptions;
            const titaniumValue = this.asModel().playerView.thisPlayer.titaniumValue;
            if ((paymentOptions === null || paymentOptions === void 0 ? void 0 : paymentOptions.titanium) !== true &&
                (paymentOptions === null || paymentOptions === void 0 ? void 0 : paymentOptions.lunaTradeFederationTitanium) === true) {
                return titaniumValue - 1;
            }
            return titaniumValue;
        },
        reduceValue(unit) {
            const currentValue = this.asModel().payment[unit];
            if (currentValue === undefined) {
                throw new Error(`can not reduceValue for ${unit} on this`);
            }
            const adjustedDelta = Math.min(1, currentValue);
            if (adjustedDelta === 0)
                return;
            this.asModel().payment[unit] -= adjustedDelta;
            if (unit !== 'megaCredits')
                this.setRemainingMCValue();
        },
        addValue(unit) {
            const currentValue = this.asModel().payment[unit];
            if (currentValue === undefined) {
                throw new Error(`can not addValue for ${unit} on this`);
            }
            const maxValue = unit === 'megaCredits' ?
                this.getMegaCreditsMax() :
                this.getAvailableUnits(unit);
            if (currentValue === maxValue) {
                return;
            }
            const delta = Math.min(1, maxValue - currentValue);
            if (delta === 0) {
                return;
            }
            this.asModel().payment[unit] += delta;
            if (unit !== 'megaCredits') {
                this.setRemainingMCValue();
            }
        },
        setRemainingMCValue() {
            var _a;
            const ta = this.asModel();
            let remainingMC = ta.cost;
            for (const resource of Spendable_1.SPENDABLE_RESOURCES) {
                if (resource === 'megaCredits') {
                    continue;
                }
                const value = ((_a = ta.payment[resource]) !== null && _a !== void 0 ? _a : 0) * this.getResourceRate(resource);
                remainingMC -= value;
            }
            ta.payment.megaCredits = Math.max(0, Math.min(this.getMegaCreditsMax(), remainingMC));
        },
        setMaxValue(unit) {
            let currentValue = this.asModel().payment[unit];
            if (currentValue === undefined) {
                throw new Error(`can not setMaxValue for ${unit} on this`);
            }
            const cost = this.asModel().cost;
            const resourceRate = this.getResourceRate(unit);
            const amountNeed = Math.floor(cost / resourceRate);
            const amountHave = this.getAvailableUnits(unit);
            while (currentValue < amountHave && currentValue < amountNeed) {
                this.addValue(unit);
                currentValue++;
            }
        },
        hasUnits(unit) {
            return this.getAvailableUnits(unit) > 0;
        },
        getAvailableUnits(unit) {
            var _a, _b, _c, _d, _e;
            let amount = undefined;
            const model = this.asModel();
            const thisPlayer = model.playerView.thisPlayer;
            switch (unit) {
                case 'heat':
                    if (model.hasOwnProperty('available')) {
                        amount = (_b = (_a = model.available) === null || _a === void 0 ? void 0 : _a[unit]) !== null && _b !== void 0 ? _b : -1;
                    }
                    else {
                        amount = this.availableHeat();
                    }
                    break;
                case 'steel':
                case 'titanium':
                case 'plants':
                    if (model.hasOwnProperty('available')) {
                        amount = (_d = (_c = model.available) === null || _c === void 0 ? void 0 : _c[unit]) !== null && _d !== void 0 ? _d : -1;
                        break;
                    }
                case 'megaCredits':
                    amount = thisPlayer[unit];
                    break;
                case 'floaters':
                case 'microbes':
                case 'lunaArchivesScience':
                case 'spireScience':
                case 'seeds':
                case 'auroraiData':
                case 'graphene':
                case 'kuiperAsteroids':
                    amount = model.playerinput[unit];
                    break;
            }
            if (amount === undefined) {
                return 0;
            }
            if (unit === 'floaters' && ((_e = this.asModel().card) === null || _e === void 0 ? void 0 : _e.name) === CardName_1.CardName.STRATOSPHERIC_BIRDS) {
                if (!thisPlayer.tableau.some((card) => {
                    var _a, _b;
                    return card.name !== CardName_1.CardName.DIRIGIBLES && ((_a = (0, ClientCardManifest_1.getCard)(card.name)) === null || _a === void 0 ? void 0 : _a.resourceType) === CardResource_1.CardResource.FLOATER && ((_b = card.resources) !== null && _b !== void 0 ? _b : 0) > 0;
                })) {
                    amount = Math.max(amount - 1, 0);
                }
            }
            return amount;
        },
        availableHeat() {
            const model = this.asModel();
            const thisPlayer = model.playerView.thisPlayer;
            const stormcraft = thisPlayer.tableau.find((card) => card.name === CardName_1.CardName.STORMCRAFT_INCORPORATED);
            if ((stormcraft === null || stormcraft === void 0 ? void 0 : stormcraft.resources) !== undefined) {
                return thisPlayer.heat + (stormcraft.resources * 2);
            }
            return thisPlayer.heat;
        },
    },
    computed: {
        descriptions() {
            return {
                steel: 'Steel',
                titanium: 'Titanium',
                heat: 'Heat',
                seeds: 'Seeds',
                auroraiData: 'Data',
                kuiperAsteroids: 'Asteroids',
                spireScience: 'Science',
                megaCredits: 'M€',
                floaters: 'Floaters',
                graphene: 'Graphene',
                lunaArchivesScience: 'Science',
                microbes: 'Microbes',
                plants: 'Plants',
            };
        },
    },
};
//# sourceMappingURL=PaymentWidgetMixin.js.map