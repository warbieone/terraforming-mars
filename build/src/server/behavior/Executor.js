"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
const Units_1 = require("../../common/Units");
const AddResourcesToCard_1 = require("../deferredActions/AddResourcesToCard");
const BuildColony_1 = require("../deferredActions/BuildColony");
const DecreaseAnyProduction_1 = require("../deferredActions/DecreaseAnyProduction");
const DeferredAction_1 = require("../deferredActions/DeferredAction");
const PlaceCityTile_1 = require("../deferredActions/PlaceCityTile");
const PlaceGreeneryTile_1 = require("../deferredActions/PlaceGreeneryTile");
const PlaceOceanTile_1 = require("../deferredActions/PlaceOceanTile");
const RemoveAnyPlants_1 = require("../deferredActions/RemoveAnyPlants");
const MoonExpansion_1 = require("../moon/MoonExpansion");
const PlaceMoonHabitatTile_1 = require("../moon/PlaceMoonHabitatTile");
const PlaceMoonMineTile_1 = require("../moon/PlaceMoonMineTile");
const PlaceMoonRoadTile_1 = require("../moon/PlaceMoonRoadTile");
const PlaceSpecialMoonTile_1 = require("../moon/PlaceSpecialMoonTile");
const Counter_1 = require("./Counter");
const Turmoil_1 = require("../turmoil/Turmoil");
const SendDelegateToArea_1 = require("../deferredActions/SendDelegateToArea");
const PlaceTile_1 = require("../deferredActions/PlaceTile");
const Resource_1 = require("../../common/Resource");
const SelectPaymentDeferred_1 = require("../deferredActions/SelectPaymentDeferred");
const OrOptions_1 = require("../inputs/OrOptions");
const SelectOption_1 = require("../inputs/SelectOption");
const Payment_1 = require("../../common/inputs/Payment");
class Executor {
    canExecute(behavior, player, card) {
        var _a, _b, _c;
        const ctx = new Counter_1.Counter(player, card);
        if (behavior.production && !player.production.canAdjust(ctx.countUnits(behavior.production))) {
            return false;
        }
        if (behavior.or) {
            if (!behavior.or.behaviors.some((behavior) => this.canExecute(behavior, player, card))) {
                return false;
            }
        }
        if (behavior.stock !== undefined) {
            const stock = behavior.stock;
            if (Units_1.Units.keys.some((key) => {
                const v = stock[key];
                return (typeof v === 'number') ? v < 0 : false;
            })) {
                throw new Error('Not supporting negative units for now: ' + card.name);
            }
        }
        if (behavior.spend !== undefined) {
            const spend = behavior.spend;
            if (spend.megacredits && !player.canAfford(spend.megacredits)) {
                return false;
            }
            if (spend.steel && player.steel < spend.steel) {
                return false;
            }
            if (spend.titanium && player.titanium < spend.titanium) {
                return false;
            }
            if (spend.plants && player.plants < spend.plants) {
                return false;
            }
            if (spend.energy && player.energy < spend.energy) {
                return false;
            }
            if (spend.resourcesHere && card.resourceCount < spend.resourcesHere) {
                return false;
            }
            if (spend.heat) {
                throw new Error('spending heat not yet supported.');
            }
        }
        if (behavior.decreaseAnyProduction !== undefined) {
            if (!player.canReduceAnyProduction(behavior.decreaseAnyProduction.type, behavior.decreaseAnyProduction.count)) {
                return false;
            }
        }
        if (((_a = behavior.colonies) === null || _a === void 0 ? void 0 : _a.buildColony) !== undefined) {
            if (player.colonies.getPlayableColonies(behavior.colonies.buildColony.allowDuplicates).length === 0) {
                return false;
            }
        }
        if (behavior.city !== undefined) {
            if (behavior.city.space === undefined) {
                if (player.game.board.getAvailableSpacesForType(player, (_b = behavior.city.on) !== null && _b !== void 0 ? _b : 'city').length === 0) {
                    return false;
                }
            }
        }
        if (behavior.greenery !== undefined) {
            if (player.game.board.getAvailableSpacesForType(player, (_c = behavior.greenery.on) !== null && _c !== void 0 ? _c : 'greenery').length === 0) {
                return false;
            }
        }
        if (behavior.tile !== undefined) {
            if (player.game.board.getAvailableSpacesForType(player, behavior.tile.on).length === 0) {
                return false;
            }
        }
        if (behavior.addResourcesToAnyCard !== undefined) {
            const arctac = behavior.addResourcesToAnyCard;
            if (!Array.isArray(arctac) && arctac.mustHaveCard === true) {
                const action = new AddResourcesToCard_1.AddResourcesToCard(player, arctac.type, { count: ctx.count(arctac.count), restrictedTag: arctac.tag });
                if (action.getCards().length === 0) {
                    return false;
                }
            }
        }
        if (behavior.turmoil) {
            if (behavior.turmoil.sendDelegates) {
                if (Turmoil_1.Turmoil.getTurmoil(player.game).getAvailableDelegateCount(player.id) < behavior.turmoil.sendDelegates.count) {
                    return false;
                }
            }
        }
        if (behavior.moon !== undefined) {
            const moon = behavior.moon;
            const moonData = MoonExpansion_1.MoonExpansion.moonData(player.game);
            if (moon.habitatTile !== undefined && moon.habitatTile.space === undefined) {
                if (moonData.moon.getAvailableSpacesOnLand(player).length === 0) {
                    return false;
                }
            }
            if (moon.mineTile !== undefined && moon.mineTile.space === undefined) {
                if (moonData.moon.getAvailableSpacesForMine(player).length === 0) {
                    return false;
                }
            }
            if (moon.roadTile !== undefined && moon.roadTile.space === undefined) {
                if (moonData.moon.getAvailableSpacesOnLand(player).length === 0) {
                    return false;
                }
            }
        }
        return true;
    }
    execute(behavior, player, card) {
        var _a, _b;
        const ctx = new Counter_1.Counter(player, card);
        if (behavior.or !== undefined) {
            const options = behavior.or.behaviors
                .filter((behavior) => this.canExecute(behavior, player, card))
                .map((behavior) => {
                return new SelectOption_1.SelectOption(behavior.title, undefined, () => {
                    this.execute(behavior, player, card);
                    return undefined;
                });
            });
            if (options.length === 1 && behavior.or.autoSelect === true) {
                options[0].cb();
            }
            else {
                player.defer(new OrOptions_1.OrOptions(...options));
            }
        }
        if (behavior.spend !== undefined) {
            const spend = behavior.spend;
            if (spend.megacredits) {
                player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, spend.megacredits, {
                    title: 'Select how to pay for action',
                    afterPay: () => {
                        const copy = Object.assign({}, behavior);
                        delete copy['spend'];
                        this.execute(copy, player, card);
                    },
                }));
                return;
            }
            player.pay(Payment_1.Payment.of({
                steel: (_a = spend.steel) !== null && _a !== void 0 ? _a : 0,
                titanium: (_b = spend.titanium) !== null && _b !== void 0 ? _b : 0,
            }));
            if (spend.plants) {
                player.deductResource(Resource_1.Resource.PLANTS, spend.plants);
            }
            if (spend.energy) {
                player.deductResource(Resource_1.Resource.ENERGY, spend.energy);
            }
            if (spend.heat) {
                throw new Error('Spending heat not supported yet.');
            }
            if (spend.resourcesHere) {
                player.removeResourceFrom(card, spend.resourcesHere);
            }
        }
        if (behavior.production !== undefined) {
            const units = ctx.countUnits(behavior.production);
            player.production.adjust(units, { log: true });
        }
        if (behavior.stock) {
            const units = ctx.countUnits(behavior.stock);
            player.addUnits(units, { log: true });
        }
        if (behavior.steelValue === 1) {
            player.increaseSteelValue();
        }
        if (behavior.titanumValue === 1) {
            player.increaseTitaniumValue();
        }
        if (behavior === null || behavior === void 0 ? void 0 : behavior.greeneryDiscount) {
            player.plantsNeededForGreenery -= behavior.greeneryDiscount;
        }
        if (behavior.drawCard !== undefined) {
            const drawCard = behavior.drawCard;
            if (typeof (drawCard) === 'number') {
                player.drawCard(drawCard);
            }
            else {
                if (drawCard.keep === undefined && drawCard.pay === undefined) {
                    player.drawCard(ctx.count(drawCard.count), { tag: drawCard.tag, resource: drawCard.resource, cardType: drawCard.type });
                }
                else {
                    const input = player.drawCardKeepSome(ctx.count(drawCard.count), {
                        tag: drawCard.tag,
                        resource: drawCard.resource,
                        cardType: drawCard.type,
                        keepMax: drawCard.keep,
                        paying: drawCard.pay,
                    });
                    player.defer(input, DeferredAction_1.Priority.DRAW_CARDS);
                }
            }
        }
        if (behavior.global !== undefined) {
            const g = behavior.global;
            if (g.temperature !== undefined)
                player.game.increaseTemperature(player, g.temperature);
            if (g.oxygen !== undefined)
                player.game.increaseOxygenLevel(player, g.oxygen);
            if (g.venus !== undefined)
                player.game.increaseVenusScaleLevel(player, g.venus);
        }
        if (behavior.tr !== undefined) {
            player.increaseTerraformRating(behavior.tr);
        }
        const addResources = behavior.addResources;
        if (addResources !== undefined) {
            const count = ctx.count(addResources);
            player.game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => {
                player.addResourceTo(card, count);
                return undefined;
            }));
        }
        if (behavior.addResourcesToAnyCard) {
            const array = Array.isArray(behavior.addResourcesToAnyCard) ? behavior.addResourcesToAnyCard : [behavior.addResourcesToAnyCard];
            for (const entry of array) {
                const count = ctx.count(entry.count);
                if (count > 0) {
                    player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, entry.type, { count, restrictedTag: entry.tag }));
                }
            }
        }
        if (behavior.decreaseAnyProduction !== undefined) {
            player.game.defer(new DecreaseAnyProduction_1.DecreaseAnyProduction(player, behavior.decreaseAnyProduction.type, { count: behavior.decreaseAnyProduction.count }));
        }
        if (behavior.removeAnyPlants !== undefined) {
            player.game.defer(new RemoveAnyPlants_1.RemoveAnyPlants(player, behavior.removeAnyPlants));
        }
        if (behavior.colonies !== undefined) {
            const colonies = behavior.colonies;
            if (colonies.buildColony !== undefined) {
                player.game.defer(new BuildColony_1.BuildColony(player, { allowDuplicate: colonies.buildColony.allowDuplicates }));
            }
            if (colonies.addTradeFleet !== undefined) {
                for (let idx = 0; idx < colonies.addTradeFleet; idx++) {
                    player.colonies.increaseFleetSize();
                }
            }
            if (colonies.tradeDiscount !== undefined) {
                player.colonies.tradeDiscount += colonies.tradeDiscount;
            }
            if (colonies.tradeOffset !== undefined) {
                player.colonies.tradeOffset += colonies.tradeOffset;
            }
        }
        if (behavior.ocean !== undefined) {
            if (behavior.ocean.count === 2) {
                player.game.defer(new PlaceOceanTile_1.PlaceOceanTile(player, { title: 'Select space for first ocean' }));
                player.game.defer(new PlaceOceanTile_1.PlaceOceanTile(player, { title: 'Select space for second ocean' }));
            }
            else {
                player.game.defer(new PlaceOceanTile_1.PlaceOceanTile(player, { on: behavior.ocean.on }));
            }
        }
        if (behavior.city !== undefined) {
            if (behavior.city.space !== undefined) {
                const space = player.game.board.getSpace(behavior.city.space);
                player.game.addCity(player, space);
            }
            else {
                player.game.defer(new PlaceCityTile_1.PlaceCityTile(player, { on: behavior.city.on }));
            }
        }
        if (behavior.greenery !== undefined) {
            player.game.defer(new PlaceGreeneryTile_1.PlaceGreeneryTile(player, behavior.greenery.on));
        }
        if (behavior.tile !== undefined) {
            const tile = behavior.tile;
            player.game.defer(new PlaceTile_1.PlaceTile(player, {
                tile: {
                    tileType: tile.type,
                    card: card.name,
                },
                on: tile.on,
                title: tile.title,
                adjacencyBonus: tile.adjacencyBonus,
            }));
        }
        if (behavior.turmoil) {
            const turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
            if (behavior.turmoil.influenceBonus === 1) {
                turmoil.addInfluenceBonus(player);
            }
            if (behavior.turmoil.sendDelegates) {
                const sendDelegates = behavior.turmoil.sendDelegates;
                if (sendDelegates.manyParties) {
                    for (let i = 0; i < sendDelegates.count; i++) {
                        player.game.defer(new SendDelegateToArea_1.SendDelegateToArea(player, 'Select where to send delegate'));
                    }
                }
                else {
                    player.game.defer(new SendDelegateToArea_1.SendDelegateToArea(player, `Select where to send ${sendDelegates.count} delegates`, { count: sendDelegates.count }));
                }
            }
        }
        if (behavior.moon !== undefined) {
            const moon = behavior.moon;
            if (moon.habitatTile !== undefined) {
                if (moon.habitatTile.space === undefined) {
                    player.game.defer(new PlaceMoonHabitatTile_1.PlaceMoonHabitatTile(player));
                }
                else {
                    MoonExpansion_1.MoonExpansion.addHabitatTile(player, moon.habitatTile.space, card === null || card === void 0 ? void 0 : card.name);
                    MoonExpansion_1.MoonExpansion.raiseHabitatRate(player);
                }
            }
            if (moon.mineTile !== undefined) {
                if (moon.mineTile.space === undefined) {
                    player.game.defer(new PlaceMoonMineTile_1.PlaceMoonMineTile(player));
                }
                else {
                    MoonExpansion_1.MoonExpansion.addMineTile(player, moon.mineTile.space, card === null || card === void 0 ? void 0 : card.name);
                    MoonExpansion_1.MoonExpansion.raiseMiningRate(player);
                }
            }
            if (moon.roadTile !== undefined) {
                if (moon.roadTile.space === undefined) {
                    player.game.defer(new PlaceMoonRoadTile_1.PlaceMoonRoadTile(player));
                }
                else {
                    MoonExpansion_1.MoonExpansion.addRoadTile(player, moon.roadTile.space, card === null || card === void 0 ? void 0 : card.name);
                    MoonExpansion_1.MoonExpansion.raiseLogisticRate(player);
                }
            }
            if (moon.tile !== undefined) {
                if (moon.tile.space !== undefined) {
                    MoonExpansion_1.MoonExpansion.addTile(player, moon.tile.space, { tileType: moon.tile.type, card: card === null || card === void 0 ? void 0 : card.name });
                }
                else {
                    player.game.defer(new PlaceSpecialMoonTile_1.PlaceSpecialMoonTile(player, { tileType: moon.tile.type, card: card === null || card === void 0 ? void 0 : card.name }, moon.tile.title));
                }
            }
            if (moon.habitatRate !== undefined)
                MoonExpansion_1.MoonExpansion.raiseHabitatRate(player, moon.habitatRate);
            if (moon.miningRate !== undefined)
                MoonExpansion_1.MoonExpansion.raiseMiningRate(player, moon.miningRate);
            if (moon.logisticsRate !== undefined)
                MoonExpansion_1.MoonExpansion.raiseLogisticRate(player, moon.logisticsRate);
        }
    }
    onDiscard(behavior, player, _card) {
        if (behavior.steelValue === 1) {
            player.decreaseSteelValue();
        }
        if (behavior.titanumValue === 1) {
            player.decreaseTitaniumValue();
        }
        if (behavior === null || behavior === void 0 ? void 0 : behavior.greeneryDiscount) {
            player.plantsNeededForGreenery += behavior.greeneryDiscount;
        }
        if (behavior.colonies !== undefined) {
            const colonies = behavior.colonies;
            if (colonies.addTradeFleet !== undefined) {
                for (let idx = 0; idx < colonies.addTradeFleet; idx++) {
                    player.colonies.decreaseFleetSize();
                }
            }
            if (colonies.tradeDiscount !== undefined) {
                player.colonies.tradeDiscount -= colonies.tradeDiscount;
            }
            if (colonies.tradeOffset !== undefined) {
                player.colonies.tradeOffset -= colonies.tradeOffset;
            }
        }
    }
    toTRSource(behavior) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        const trSource = {
            tr: behavior.tr,
            temperature: (_a = behavior.global) === null || _a === void 0 ? void 0 : _a.temperature,
            oxygen: ((_c = (_b = behavior.global) === null || _b === void 0 ? void 0 : _b.oxygen) !== null && _c !== void 0 ? _c : 0) + (behavior.greenery !== undefined ? 1 : 0),
            venus: (_d = behavior.global) === null || _d === void 0 ? void 0 : _d.venus,
            oceans: behavior.ocean !== undefined ? 1 : undefined,
            moonHabitat: ((_f = (_e = behavior.moon) === null || _e === void 0 ? void 0 : _e.habitatRate) !== null && _f !== void 0 ? _f : 0) + (((_g = behavior.moon) === null || _g === void 0 ? void 0 : _g.habitatTile) !== undefined ? 1 : 0),
            moonMining: ((_j = (_h = behavior.moon) === null || _h === void 0 ? void 0 : _h.miningRate) !== null && _j !== void 0 ? _j : 0) + (((_k = behavior.moon) === null || _k === void 0 ? void 0 : _k.mineTile) !== undefined ? 1 : 0),
            moonLogistics: ((_m = (_l = behavior.moon) === null || _l === void 0 ? void 0 : _l.logisticsRate) !== null && _m !== void 0 ? _m : 0) + (((_o = behavior.moon) === null || _o === void 0 ? void 0 : _o.roadTile) !== undefined ? 1 : 0),
        };
        return trSource;
    }
}
exports.Executor = Executor;
//# sourceMappingURL=Executor.js.map