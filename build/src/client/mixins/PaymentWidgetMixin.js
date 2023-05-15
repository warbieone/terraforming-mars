"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentWidgetMixin = exports.unit = void 0;
const CardName_1 = require("@/common/cards/CardName");
const constants_1 = require("@/common/constants");
const CardResource_1 = require("@/common/CardResource");
const ClientCardManifest_1 = require("../cards/ClientCardManifest");
exports.unit = ['megaCredits', 'titanium', 'steel', 'heat', 'microbes', 'floaters', 'science', 'seeds', 'data'];
exports.PaymentWidgetMixin = {
    name: 'PaymentWidgetMixin',
    methods: {
        asModel() {
            return this;
        },
        getMegaCreditsMax() {
            const model = this.asModel();
            return Math.min(model.playerView.thisPlayer.megaCredits, model.cost);
        },
        canUseTitanium() {
            throw new Error('Should be overridden');
        },
        canUseLunaTradeFederationTitanium() {
            throw new Error('Should be overridden');
        },
        canUseLunaTradeFederationTitaniumOnly() {
            return this.canUseTitanium() !== true && this.canUseLunaTradeFederationTitanium();
        },
        getResourceRate(resourceName) {
            switch (resourceName) {
                case 'titanium':
                    const v = this.asModel().playerView.thisPlayer.titaniumValue;
                    return this.canUseLunaTradeFederationTitaniumOnly() === true ? v - 1 : v;
                case 'steel':
                    return this.asModel().playerView.thisPlayer.steelValue;
                case 'microbes':
                    return 2;
                case 'floaters':
                    return 3;
                case 'seeds':
                    return constants_1.SEED_VALUE;
                case 'data':
                    return constants_1.DATA_VALUE;
                default:
                    return 1;
            }
        },
        reduceValue(target, delta) {
            const currentValue = this.asModel()[target];
            if (currentValue === undefined) {
                throw new Error(`can not reduceValue for ${target} on this`);
            }
            const adjustedDelta = Math.min(delta, currentValue);
            if (adjustedDelta === 0)
                return;
            this.asModel()[target] -= adjustedDelta;
            if (target !== 'megaCredits')
                this.setRemainingMCValue();
        },
        addValue(target, delta, max) {
            const currentValue = this.asModel()[target];
            if (currentValue === undefined) {
                throw new Error(`can not addValue for ${target} on this`);
            }
            let maxValue = max !== undefined ? max : this.getAmount(target);
            if (target === 'megaCredits') {
                maxValue = this.getMegaCreditsMax();
            }
            if (currentValue === maxValue)
                return;
            if (maxValue === undefined) {
                throw new Error(`unable to determine maxValue for ${target}`);
            }
            const adjustedDelta = Math.min(delta, maxValue - currentValue);
            if (adjustedDelta === 0)
                return;
            this.asModel()[target] += adjustedDelta;
            if (target !== 'megaCredits')
                this.setRemainingMCValue();
        },
        setRemainingMCValue() {
            var _a;
            const ta = this.asModel();
            let remainingMC = ta.$data.cost;
            for (const resource of exports.unit) {
                if (resource === 'megaCredits')
                    continue;
                const value = ((_a = ta[resource]) !== null && _a !== void 0 ? _a : 0) * this.getResourceRate(resource);
                remainingMC -= value;
            }
            ta['megaCredits'] = Math.max(0, Math.min(this.getMegaCreditsMax(), remainingMC));
        },
        setMaxValue(target, max) {
            let currentValue = this.asModel()[target];
            if (currentValue === undefined) {
                throw new Error(`can not setMaxValue for ${target} on this`);
            }
            const cost = this.asModel().$data.cost;
            const resourceRate = this.getResourceRate(target);
            const amountNeed = Math.floor(cost / resourceRate);
            const amountHave = this.getAmount(target);
            while (currentValue < amountHave && currentValue < amountNeed) {
                this.addValue(target, 1, max);
                currentValue++;
            }
        },
        getAmount(target) {
            var _a;
            let amount = undefined;
            const model = this.asModel();
            const thisPlayer = model.playerView.thisPlayer;
            switch (target) {
                case 'heat':
                    amount = this.availableHeat();
                    break;
                case 'steel':
                case 'titanium':
                case 'megaCredits':
                    amount = thisPlayer[target];
                    break;
                case 'floaters':
                case 'microbes':
                case 'science':
                case 'seeds':
                case 'data':
                    amount = model.playerinput[target];
                    break;
            }
            if (amount === undefined) {
                return 0;
            }
            if (target === 'floaters' && ((_a = this.asModel().$data.card) === null || _a === void 0 ? void 0 : _a.name) === CardName_1.CardName.STRATOSPHERIC_BIRDS) {
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
            if (stormcraft !== undefined && stormcraft.resources !== undefined) {
                return thisPlayer.heat + (stormcraft.resources * 2);
            }
            return thisPlayer.heat;
        },
    },
};
//# sourceMappingURL=PaymentWidgetMixin.js.map