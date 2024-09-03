"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBehavior = exports.Card = void 0;
const CardType_1 = require("../../common/cards/CardType");
const Units_1 = require("../../common/Units");
const CardRenderDynamicVictoryPoints_1 = require("./render/CardRenderDynamicVictoryPoints");
const CardRenderItemType_1 = require("../../common/cards/render/CardRenderItemType");
const MoonExpansion_1 = require("../moon/MoonExpansion");
const TileType_1 = require("../../common/TileType");
const BehaviorExecutor_1 = require("../behavior/BehaviorExecutor");
const Counter_1 = require("../behavior/Counter");
const CardRequirements_1 = require("./requirements/CardRequirements");
const utils_1 = require("../../common/utils/utils");
const CARD_TYPES_WITHOUT_COST = [
    CardType_1.CardType.CORPORATION,
    CardType_1.CardType.PRELUDE,
    CardType_1.CardType.CEO,
    CardType_1.CardType.STANDARD_ACTION,
];
const cardProperties = new Map();
class Card {
    internalize(external) {
        const name = external.name;
        if (external.type === CardType_1.CardType.CORPORATION && external.startingMegaCredits === undefined) {
            throw new Error(`${name}: corp cards must define startingMegaCredits`);
        }
        if (external.cost === undefined) {
            if (CARD_TYPES_WITHOUT_COST.includes(external.type) === false) {
                throw new Error(`${name} must have a cost property`);
            }
        }
        let step = 0;
        try {
            Card.autopopulateMetadataVictoryPoints(external);
            step = 1;
            validateBehavior(external.behavior, name);
            step = 2;
            validateBehavior(external.firstAction, name);
            step = 3;
            validateBehavior(external.action, name);
            step = 4;
            Card.validateTilesBuilt(external);
            step = 5;
        }
        catch (e) {
            throw new Error(`Cannot validate ${name} (${step}): ${e}`);
        }
        const translatedRequirements = (0, utils_1.asArray)(external.requirements ?? []).map((req) => populateCount(req));
        const compiledRequirements = CardRequirements_1.CardRequirements.compile(translatedRequirements);
        const tilesBuilt = [...external.tilesBuilt ?? []];
        if (external.behavior?.tile?.type !== undefined) {
            tilesBuilt.push(external.behavior?.tile.type);
        }
        if (external.behavior?.moon?.tile?.type !== undefined) {
            tilesBuilt.push(external.behavior.moon.tile.type);
        }
        if (external.behavior?.moon?.habitatTile !== undefined) {
            tilesBuilt.push(TileType_1.TileType.MOON_HABITAT);
        }
        if (external.behavior?.moon?.mineTile !== undefined) {
            tilesBuilt.push(TileType_1.TileType.MOON_MINE);
        }
        if (external.behavior?.moon?.roadTile !== undefined) {
            tilesBuilt.push(TileType_1.TileType.MOON_ROAD);
        }
        const internal = {
            ...external,
            reserveUnits: external.reserveUnits === undefined ? undefined : Units_1.Units.of(external.reserveUnits),
            requirements: translatedRequirements,
            compiledRequirements: compiledRequirements,
            tilesBuilt: tilesBuilt,
        };
        return internal;
    }
    constructor(external) {
        this.resourceCount = 0;
        this.warnings = new Set();
        const name = external.name;
        let internal = cardProperties.get(name);
        if (internal === undefined) {
            internal = this.internalize(external);
            cardProperties.set(name, internal);
        }
        this.properties = internal;
    }
    get adjacencyBonus() {
        return this.properties.adjacencyBonus;
    }
    get behavior() {
        return this.properties.behavior;
    }
    get cardCost() {
        return this.properties.cardCost;
    }
    get type() {
        return this.properties.type;
    }
    get cost() {
        return this.properties.cost === undefined ? 0 : this.properties.cost;
    }
    get initialActionText() {
        return this.properties.initialActionText || this.properties.firstAction?.text;
    }
    get firstAction() {
        return this.properties.firstAction;
    }
    get metadata() {
        return this.properties.metadata;
    }
    get requirements() {
        return this.properties.requirements;
    }
    get name() {
        return this.properties.name;
    }
    get resourceType() {
        return this.properties.resourceType;
    }
    get protectedResources() {
        return this.properties.protectedResources;
    }
    get startingMegaCredits() {
        return this.properties.startingMegaCredits === undefined ? 0 : this.properties.startingMegaCredits;
    }
    get tags() {
        return this.properties.tags === undefined ? [] : this.properties.tags;
    }
    get cardDiscount() {
        return this.properties.cardDiscount;
    }
    get reserveUnits() {
        return this.properties.reserveUnits || Units_1.Units.EMPTY;
    }
    get tr() {
        return this.properties.tr;
    }
    get victoryPoints() {
        return this.properties.victoryPoints;
    }
    get tilesBuilt() {
        return this.properties.tilesBuilt;
    }
    canPlay(player, canAffordOptions) {
        let yesAnd = undefined;
        const satisfied = this.properties.compiledRequirements.satisfies(player);
        if (satisfied === false) {
            return false;
        }
        if (satisfied !== true) {
            yesAnd = satisfied;
        }
        if (this.behavior !== undefined) {
            if ((0, BehaviorExecutor_1.getBehaviorExecutor)().canExecute(this.behavior, player, this, canAffordOptions) === false) {
                return false;
            }
        }
        const bespokeCanPlay = this.bespokeCanPlay(player, canAffordOptions ?? { cost: 0 });
        if (bespokeCanPlay === false) {
            return false;
        }
        if (yesAnd !== undefined) {
            return yesAnd;
        }
        return true;
    }
    bespokeCanPlay(_player, _canAffordOptions) {
        return true;
    }
    play(player) {
        player.stock.deductUnits(MoonExpansion_1.MoonExpansion.adjustedReserveCosts(player, this));
        if (this.behavior !== undefined) {
            (0, BehaviorExecutor_1.getBehaviorExecutor)().execute(this.behavior, player, this);
        }
        return this.bespokePlay(player);
    }
    bespokePlay(_player) {
        return undefined;
    }
    onDiscard(player) {
        if (this.behavior !== undefined) {
            (0, BehaviorExecutor_1.getBehaviorExecutor)().onDiscard(this.behavior, player, this);
        }
        this.bespokeOnDiscard(player);
    }
    bespokeOnDiscard(_player) {
    }
    getVictoryPoints(player) {
        const vp = this.properties.victoryPoints;
        if (typeof (vp) === 'number') {
            return vp;
        }
        if (typeof (vp) === 'object') {
            return new Counter_1.Counter(player, this).count(vp, 'vps');
        }
        if (vp === 'special') {
            throw new Error('When victoryPoints is \'special\', override getVictoryPoints');
        }
        const vps = this.properties.metadata.victoryPoints;
        if (vps === undefined) {
            return 0;
        }
        if (typeof (vps) === 'number')
            return vps;
        if (vps.targetOneOrMore === true || vps.anyPlayer === true) {
            throw new Error('Not yet handled');
        }
        let units = 0;
        switch (vps.item?.type) {
            case CardRenderItemType_1.CardRenderItemType.RESOURCE:
                units = this.resourceCount;
                break;
            case CardRenderItemType_1.CardRenderItemType.TAG:
                if (vps.item.tag === undefined) {
                    throw new Error('tag attribute missing');
                }
                units = player.tags.count(vps.item.tag, 'raw');
                break;
        }
        if (units === undefined) {
            throw new Error('Not yet handled');
        }
        return vps.points * Math.floor(units / vps.target);
    }
    static autopopulateMetadataVictoryPoints(properties) {
        const vps = properties.victoryPoints;
        if (vps === undefined) {
            return;
        }
        if (vps === 'special') {
            if (properties.metadata.victoryPoints === undefined) {
                throw new Error('When card.victoryPoints is \'special\', metadata.vp and getVictoryPoints must be supplied');
            }
            return;
        }
        else {
            if (properties.metadata.victoryPoints !== undefined) {
                throw new Error('card.victoryPoints and metadata.victoryPoints cannot be on the same card');
            }
        }
        if (typeof (vps) === 'number') {
            properties.metadata.victoryPoints = vps;
            return;
        }
        const each = vps.each ?? 1;
        const per = vps.per ?? 1;
        if (vps.resourcesHere !== undefined) {
            if (properties.resourceType === undefined) {
                throw new Error('When defining a card-resource based VP, resourceType must be defined.');
            }
            properties.metadata.victoryPoints = CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.resource(properties.resourceType, each, per);
            return;
        }
        else if (vps.tag !== undefined) {
            properties.metadata.victoryPoints = CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.tag(vps.tag, each, per);
        }
        else if (vps.cities !== undefined) {
            properties.metadata.victoryPoints = CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.cities(each, per, vps.all);
        }
        else if (vps.colonies !== undefined) {
            properties.metadata.victoryPoints = CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.colonies(each, per, vps.all);
        }
        else if (vps.moon !== undefined) {
            if (vps.moon.road !== undefined) {
                properties.metadata.victoryPoints = CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.moonRoadTile(each, vps.all);
            }
            else {
                throw new Error('moon defined, but no valid sub-object defined');
            }
        }
        else {
            throw new Error('Unknown VPs defined');
        }
    }
    static validateTilesBuilt(properties) {
        if (properties.tilesBuilt !== undefined) {
            if (properties.behavior?.tile?.type !== undefined) {
                throw new Error('tilesBuilt and behavior.tile.tileType both defined: ' + properties.name);
            }
            if (properties.behavior?.moon?.tile?.type !== undefined) {
                throw new Error('tilesBuilt and behavior.moon.tile.tileType both defined: ' + properties.name);
            }
            if (properties.behavior?.moon?.habitatTile !== undefined) {
                throw new Error('tilesBuilt and behavior.moon.habitatTile both defined: ' + properties.name);
            }
            if (properties.behavior?.moon?.mineTile !== undefined) {
                throw new Error('tilesBuilt and behavior.moon.mineTile both defined: ' + properties.name);
            }
            if (properties.behavior?.moon?.roadTile !== undefined) {
                throw new Error('tilesBuilt and behavior.moon.roadTile both defined: ' + properties.name);
            }
        }
    }
    getCardDiscount(_player, card) {
        if (this.cardDiscount === undefined) {
            return 0;
        }
        let sum = 0;
        const discounts = (0, utils_1.asArray)(this.cardDiscount);
        for (const discount of discounts) {
            if (discount.tag === undefined) {
                sum += discount.amount;
            }
            else {
                const tags = card?.tags.filter((tag) => tag === discount.tag).length ?? 0;
                if (discount.per !== 'card') {
                    sum += discount.amount * tags;
                }
                else if (tags > 0) {
                    sum += discount.amount;
                }
            }
        }
        return sum;
    }
    getGlobalParameterRequirementBonus(player, parameter) {
        if (this.properties.globalParameterRequirementBonus !== undefined) {
            const globalParameterRequirementBonus = this.properties.globalParameterRequirementBonus;
            if (globalParameterRequirementBonus.nextCardOnly === true) {
                if (player.lastCardPlayed !== this.name) {
                    return 0;
                }
            }
            if (globalParameterRequirementBonus.parameter !== undefined) {
                if (globalParameterRequirementBonus.parameter !== parameter) {
                    return 0;
                }
            }
            return globalParameterRequirementBonus.steps;
        }
        return 0;
    }
}
exports.Card = Card;
function populateCount(requirement) {
    requirement.count =
        requirement.count ??
            requirement.oceans ??
            requirement.oxygen ??
            requirement.temperature ??
            requirement.venus ??
            requirement.tr ??
            requirement.resourceTypes ??
            requirement.greeneries ??
            requirement.cities ??
            requirement.colonies ??
            requirement.floaters ??
            requirement.partyLeader ??
            requirement.habitatRate ??
            requirement.miningRate ??
            requirement.logisticRate ??
            requirement.habitatTiles ??
            requirement.miningTiles ??
            requirement.roadTiles ??
            requirement.corruption ??
            requirement.excavation;
    return requirement;
}
function validateBehavior(behavior, name) {
    function validate(condition, error) {
        if (condition === false) {
            throw new Error(`for ${name}: ${error}`);
        }
    }
    if (behavior === undefined) {
        return;
    }
    if (behavior.spend) {
        const spend = behavior.spend;
        if (spend.megacredits) {
            validate(behavior.tr === undefined, 'spend.megacredits is not yet compatible with tr');
            validate(behavior.global === undefined, 'spend.megacredits is not yet compatible with global');
            validate(behavior.moon?.habitatRate === undefined, 'spend.megacredits is not yet compatible with moon.habitatRate');
            validate(behavior.moon?.logisticsRate === undefined, 'spend.megacredits is not yet compatible with moon.logisticsRate');
            validate(behavior.moon?.miningRate === undefined, 'spend.megacredits is not yet compatible with moon.miningRate');
        }
        if (spend.heat) {
            validate(Object.keys(spend).length === 1, 'spend.heat cannot be used with another spend');
        }
    }
}
exports.validateBehavior = validateBehavior;
