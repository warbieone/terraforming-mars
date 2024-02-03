"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
const Units_1 = require("../../common/Units");
const AddResourcesToCard_1 = require("../deferredActions/AddResourcesToCard");
const BuildColony_1 = require("../deferredActions/BuildColony");
const DecreaseAnyProduction_1 = require("../deferredActions/DecreaseAnyProduction");
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
const SelectResources_1 = require("../inputs/SelectResources");
const titles_1 = require("../inputs/titles");
const MessageBuilder_1 = require("../logs/MessageBuilder");
const IdentifySpacesDeferred_1 = require("../underworld/IdentifySpacesDeferred");
const ExcavateSpacesDeferred_1 = require("../underworld/ExcavateSpacesDeferred");
const UnderworldExpansion_1 = require("../underworld/UnderworldExpansion");
const SelectResource_1 = require("../inputs/SelectResource");
const RemoveResourcesFromCard_1 = require("../deferredActions/RemoveResourcesFromCard");
const IProjectCard_1 = require("../cards/IProjectCard");
const constants_1 = require("../../common/constants");
class Executor {
    canExecute(behavior, player, card, canAffordOptions) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const ctx = new Counter_1.Counter(player, card);
        const asTrSource = this.toTRSource(behavior, ctx);
        const game = player.game;
        if (behavior.production && !player.production.canAdjust(ctx.countUnits(behavior.production))) {
            return false;
        }
        if (behavior.or) {
            if (!behavior.or.behaviors.some((behavior) => this.canExecute(behavior, player, card, canAffordOptions))) {
                return false;
            }
        }
        if (behavior.global !== undefined) {
            const g = behavior.global;
            if (g.temperature !== undefined && game.getTemperature() >= constants_1.MAX_TEMPERATURE) {
                card.warnings.add('maxtemp');
            }
            if (g.oxygen !== undefined && game.getOxygenLevel() >= constants_1.MAX_OXYGEN_LEVEL) {
                card.warnings.add('maxoxygen');
            }
            if (g.venus !== undefined && game.getVenusScaleLevel() >= constants_1.MAX_VENUS_SCALE) {
                card.warnings.add('maxvenus');
            }
        }
        if (behavior.ocean !== undefined && game.board.getOceanSpaces().length >= constants_1.MAX_OCEAN_TILES) {
            card.warnings.add('maxoceans');
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
            if (spend.heat) {
                if (player.availableHeat() < spend.heat) {
                    return false;
                }
                if (!player.canAfford({
                    cost: 0,
                    reserveUnits: Units_1.Units.of({ heat: spend.heat }),
                    tr: asTrSource,
                })) {
                    return false;
                }
            }
            if (spend.resourcesHere && card.resourceCount < spend.resourcesHere) {
                return false;
            }
            if (spend.resourceFromAnyCard && player.getCardsWithResources(spend.resourceFromAnyCard.type).length === 0) {
                return false;
            }
            if (spend.corruption && player.underworldData.corruption < spend.corruption) {
                return false;
            }
        }
        if (behavior.decreaseAnyProduction !== undefined) {
            if (!game.isSoloMode()) {
                const dap = behavior.decreaseAnyProduction;
                const targets = game.getPlayers().filter((p) => p.canHaveProductionReduced(dap.type, dap.count, player));
                if (targets.length === 0) {
                    return false;
                }
                if (targets.length === 1 && targets[0] === player) {
                    card.warnings.add('decreaseOwnProduction');
                }
            }
        }
        if (((_a = behavior.colonies) === null || _a === void 0 ? void 0 : _a.buildColony) !== undefined) {
            if (player.colonies.getPlayableColonies(behavior.colonies.buildColony.allowDuplicates).length === 0) {
                return false;
            }
        }
        if (behavior.city !== undefined) {
            if (behavior.city.space === undefined) {
                if (game.board.getAvailableSpacesForType(player, (_b = behavior.city.on) !== null && _b !== void 0 ? _b : 'city', canAffordOptions).length === 0) {
                    return false;
                }
            }
        }
        if (behavior.greenery !== undefined) {
            if (game.board.getAvailableSpacesForType(player, (_c = behavior.greenery.on) !== null && _c !== void 0 ? _c : 'greenery', canAffordOptions).length === 0) {
                return false;
            }
        }
        if (behavior.tile !== undefined) {
            if (game.board.getAvailableSpacesForType(player, behavior.tile.on, canAffordOptions).length === 0) {
                return false;
            }
        }
        if (behavior.addResourcesToAnyCard !== undefined) {
            const arctac = behavior.addResourcesToAnyCard;
            if (!Array.isArray(arctac) && arctac.mustHaveCard === true) {
                const action = new AddResourcesToCard_1.AddResourcesToCard(player, arctac.type, {
                    count: ctx.count(arctac.count),
                    restrictedTag: arctac.tag,
                    min: arctac.min,
                    robotCards: arctac.robotCards !== undefined,
                });
                const cards = action.getCards();
                const count = cards[0].length + cards[1].length;
                if (count === 0) {
                    return false;
                }
                if (count === 1 && ((_e = (_d = behavior.spend) === null || _d === void 0 ? void 0 : _d.resourcesHere) !== null && _e !== void 0 ? _e : 0 > 0)) {
                    if (((_f = cards[0][0]) === null || _f === void 0 ? void 0 : _f.name) === card.name) {
                        return false;
                    }
                }
            }
        }
        if (behavior.turmoil) {
            if (behavior.turmoil.sendDelegates) {
                if (Turmoil_1.Turmoil.getTurmoil(game).getAvailableDelegateCount(player) < behavior.turmoil.sendDelegates.count) {
                    return false;
                }
            }
        }
        if (behavior.moon !== undefined) {
            const moon = behavior.moon;
            const moonData = MoonExpansion_1.MoonExpansion.moonData(game);
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
            if ((_g = moon.habitatRate) !== null && _g !== void 0 ? _g : 0 >= constants_1.MAXIMUM_HABITAT_RATE) {
                card.warnings.add('maxHabitatRate');
            }
            if ((_h = moon.miningRate) !== null && _h !== void 0 ? _h : 0 >= constants_1.MAXIMUM_MINING_RATE) {
                card.warnings.add('maxMiningRate');
            }
            if ((_j = moon.logisticsRate) !== null && _j !== void 0 ? _j : 0 >= constants_1.MAXIMUM_LOGISTICS_RATE) {
                card.warnings.add('maxLogisticsRate');
            }
        }
        return true;
    }
    execute(behavior, player, card) {
        var _a, _b, _c, _d;
        const ctx = new Counter_1.Counter(player, card);
        if (behavior.or !== undefined) {
            const options = behavior.or.behaviors
                .filter((behavior) => this.canExecute(behavior, player, card))
                .map((behavior) => {
                return new SelectOption_1.SelectOption(behavior.title)
                    .andThen(() => {
                    this.execute(behavior, player, card);
                    return undefined;
                });
            });
            if (options.length === 1 && behavior.or.autoSelect === true) {
                options[0].cb(undefined);
            }
            else {
                player.defer(new OrOptions_1.OrOptions(...options));
            }
        }
        if (behavior.spend !== undefined) {
            const spend = behavior.spend;
            const remainder = Object.assign({}, behavior);
            delete remainder['spend'];
            if (spend.megacredits) {
                player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, spend.megacredits, {
                    title: titles_1.TITLES.payForCardAction(card.name),
                })).andThen(() => this.execute(remainder, player, card));
                return;
            }
            player.pay(Payment_1.Payment.of({
                steel: (_a = spend.steel) !== null && _a !== void 0 ? _a : 0,
                titanium: (_b = spend.titanium) !== null && _b !== void 0 ? _b : 0,
            }));
            if (spend.plants) {
                player.stock.deduct(Resource_1.Resource.PLANTS, spend.plants);
            }
            if (spend.energy) {
                player.stock.deduct(Resource_1.Resource.ENERGY, spend.energy);
            }
            if (spend.heat) {
                player.defer(player.spendHeat(spend.heat, () => {
                    this.execute(remainder, player, card);
                    return undefined;
                }));
                return;
            }
            if (spend.resourcesHere) {
                player.removeResourceFrom(card, spend.resourcesHere);
            }
            if (spend.resourceFromAnyCard) {
                player.game.defer(new RemoveResourcesFromCard_1.RemoveResourcesFromCard(player, spend.resourceFromAnyCard.type, 1, { ownCardsOnly: true, blockable: false }))
                    .andThen(() => this.execute(remainder, player, card));
                return;
            }
            if (spend.corruption) {
                UnderworldExpansion_1.UnderworldExpansion.loseCorruption(player, spend.corruption);
            }
        }
        if (behavior.production !== undefined) {
            const units = ctx.countUnits(behavior.production);
            player.production.adjust(units, { log: true });
        }
        if (behavior.stock) {
            const units = ctx.countUnits(behavior.stock);
            player.stock.addUnits(units, { log: true });
        }
        if (behavior.standardResource) {
            const entry = behavior.standardResource;
            const count = typeof (entry) === 'number' ? entry : entry.count;
            const same = typeof (entry) === 'number' ? false : (_c = entry.same) !== null && _c !== void 0 ? _c : false;
            if (same === false) {
                player.defer(new SelectResources_1.SelectResources(player, count, (0, MessageBuilder_1.message)('Gain ${0} standard resources', (b) => b.number(count))));
            }
            else {
                player.defer(new SelectResource_1.SelectResource((0, MessageBuilder_1.message)('Gain ${0} units of a standard resource', (b) => b.number(count)), Units_1.Units.keys, (unit) => {
                    player.stock.add(Units_1.Units.ResourceMap[unit], count, { log: true });
                    return undefined;
                }));
            }
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
                    player.drawCardKeepSome(ctx.count(drawCard.count), {
                        tag: drawCard.tag,
                        resource: drawCard.resource,
                        cardType: drawCard.type,
                        keepMax: drawCard.keep,
                        paying: drawCard.pay,
                    });
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
            player.increaseTerraformRating(ctx.count(behavior.tr));
        }
        const addResources = behavior.addResources;
        if (addResources !== undefined) {
            const count = ctx.count(addResources);
            player.defer(() => {
                player.addResourceTo(card, { qty: count, log: true });
                return undefined;
            });
        }
        if (behavior.addResourcesToAnyCard) {
            const array = Array.isArray(behavior.addResourcesToAnyCard) ? behavior.addResourcesToAnyCard : [behavior.addResourcesToAnyCard];
            for (const arctac of array) {
                const count = ctx.count(arctac.count);
                if (count > 0) {
                    player.game.defer(new AddResourcesToCard_1.AddResourcesToCard(player, arctac.type, {
                        count,
                        restrictedTag: arctac.tag,
                        min: arctac.min,
                        robotCards: arctac.robotCards !== undefined,
                    }));
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
                title: (_d = tile.title) !== null && _d !== void 0 ? _d : (0, MessageBuilder_1.message)('Select space for ${0} tile', (b) => b.cardName(card.name)),
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
                    player.game.defer(new PlaceSpecialMoonTile_1.PlaceSpecialMoonTile(player, { tileType: moon.tile.type, card: card === null || card === void 0 ? void 0 : card.name }));
                }
            }
            if (moon.habitatRate !== undefined)
                MoonExpansion_1.MoonExpansion.raiseHabitatRate(player, moon.habitatRate);
            if (moon.miningRate !== undefined)
                MoonExpansion_1.MoonExpansion.raiseMiningRate(player, moon.miningRate);
            if (moon.logisticsRate !== undefined)
                MoonExpansion_1.MoonExpansion.raiseLogisticRate(player, moon.logisticsRate);
        }
        if (behavior.underworld !== undefined) {
            const underworld = behavior.underworld;
            if (underworld.identify !== undefined) {
                player.game.defer(new IdentifySpacesDeferred_1.IdentifySpacesDeferred(player, ctx.count(underworld.identify)));
            }
            if (underworld.excavate !== undefined) {
                const excavate = underworld.excavate;
                if (typeof (excavate) === 'number') {
                    player.game.defer(new ExcavateSpacesDeferred_1.ExcavateSpacesDeferred(player, excavate));
                }
                else {
                    player.game.defer(new ExcavateSpacesDeferred_1.ExcavateSpacesDeferred(player, ctx.count(excavate.count), excavate.ignorePlacementRestrictions));
                }
            }
            if (underworld.corruption !== undefined) {
                UnderworldExpansion_1.UnderworldExpansion.gainCorruption(player, ctx.count(underworld.corruption), { log: true });
            }
            if (underworld.markThisGeneration !== undefined) {
                if ((0, IProjectCard_1.isIProjectCard)(card)) {
                    card.generationUsed = player.game.generation;
                }
            }
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
    toTRSource(behavior, ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        let tr = undefined;
        if (behavior.tr !== undefined) {
            if (typeof (behavior.tr) === 'number') {
                tr = behavior.tr;
            }
            else {
                tr = ctx.count(behavior.tr);
            }
        }
        const trSource = {
            tr: tr,
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