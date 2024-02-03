"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBehavior = exports.Card = void 0;
const CardType_1 = require("../../common/cards/CardType");
const Tag_1 = require("../../common/cards/Tag");
const Units_1 = require("../../common/Units");
const CardRenderDynamicVictoryPoints_1 = require("./render/CardRenderDynamicVictoryPoints");
const CardRenderItemType_1 = require("../../common/cards/render/CardRenderItemType");
const MoonExpansion_1 = require("../moon/MoonExpansion");
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
        var _a;
        const name = external.name;
        if (external.type === CardType_1.CardType.CORPORATION && external.startingMegaCredits === undefined) {
            throw new Error(`${name}: corp cards must define startingMegaCredits`);
        }
        if (external.cost === undefined) {
            if (CARD_TYPES_WITHOUT_COST.includes(external.type) === false) {
                throw new Error(`${name} must have a cost property`);
            }
        }
        try {
            Card.autopopulateMetadataVictoryPoints(external);
            validateBehavior(external.behavior);
            validateBehavior(external.firstAction);
            validateBehavior(external.action);
        }
        catch (e) {
            throw new Error(`Cannot validate ${name}: ${e}`);
        }
        const translatedRequirements = (0, utils_1.asArray)((_a = external.requirements) !== null && _a !== void 0 ? _a : []).map((req) => populateCount(req));
        const compiledRequirements = CardRequirements_1.CardRequirements.compile(translatedRequirements);
        const internal = Object.assign(Object.assign({}, external), { reserveUnits: external.reserveUnits === undefined ? undefined : Units_1.Units.of(external.reserveUnits), requirements: translatedRequirements, compiledRequirements: compiledRequirements });
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
        var _a;
        return this.properties.initialActionText || ((_a = this.properties.firstAction) === null || _a === void 0 ? void 0 : _a.text);
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
        return this.properties.tilesBuilt || [];
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
        const bespokeCanPlay = this.bespokeCanPlay(player, canAffordOptions);
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
        var _a, _b;
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
        switch ((_a = vps.item) === null || _a === void 0 ? void 0 : _a.type) {
            case CardRenderItemType_1.CardRenderItemType.MICROBES:
            case CardRenderItemType_1.CardRenderItemType.ANIMALS:
            case CardRenderItemType_1.CardRenderItemType.FIGHTER:
            case CardRenderItemType_1.CardRenderItemType.FLOATERS:
            case CardRenderItemType_1.CardRenderItemType.ASTEROIDS:
            case CardRenderItemType_1.CardRenderItemType.PRESERVATION:
            case CardRenderItemType_1.CardRenderItemType.DATA_RESOURCE:
            case CardRenderItemType_1.CardRenderItemType.RESOURCE_CUBE:
            case CardRenderItemType_1.CardRenderItemType.SCIENCE:
            case CardRenderItemType_1.CardRenderItemType.CAMPS:
                units = (_b = this.resourceCount) !== null && _b !== void 0 ? _b : 0;
                break;
            case CardRenderItemType_1.CardRenderItemType.JOVIAN:
                units = player === null || player === void 0 ? void 0 : player.tags.count(Tag_1.Tag.JOVIAN, 'raw');
                break;
            case CardRenderItemType_1.CardRenderItemType.MOON:
                units = player === null || player === void 0 ? void 0 : player.tags.count(Tag_1.Tag.MOON, 'raw');
                break;
        }
        if (units === undefined) {
            throw new Error('Not yet handled');
        }
        return vps.points * Math.floor(units / vps.target);
    }
    static autopopulateMetadataVictoryPoints(properties) {
        var _a, _b;
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
        const each = (_a = vps.each) !== null && _a !== void 0 ? _a : 1;
        const per = (_b = vps.per) !== null && _b !== void 0 ? _b : 1;
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
    getCardDiscount(_player, card) {
        var _a;
        if (this.cardDiscount === undefined) {
            return 0;
        }
        let sum = 0;
        const discounts = Array.isArray(this.cardDiscount) ? this.cardDiscount : [this.cardDiscount];
        for (const discount of discounts) {
            if (discount.tag === undefined) {
                sum += discount.amount;
            }
            else {
                const tags = (_a = card === null || card === void 0 ? void 0 : card.tags.filter((tag) => tag === discount.tag).length) !== null && _a !== void 0 ? _a : 0;
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    requirement.count =
        (_u = (_t = (_s = (_r = (_q = (_p = (_o = (_m = (_l = (_k = (_j = (_h = (_g = (_f = (_e = (_d = (_c = (_b = (_a = requirement.count) !== null && _a !== void 0 ? _a : requirement.oceans) !== null && _b !== void 0 ? _b : requirement.oxygen) !== null && _c !== void 0 ? _c : requirement.temperature) !== null && _d !== void 0 ? _d : requirement.venus) !== null && _e !== void 0 ? _e : requirement.tr) !== null && _f !== void 0 ? _f : requirement.resourceTypes) !== null && _g !== void 0 ? _g : requirement.greeneries) !== null && _h !== void 0 ? _h : requirement.cities) !== null && _j !== void 0 ? _j : requirement.colonies) !== null && _k !== void 0 ? _k : requirement.floaters) !== null && _l !== void 0 ? _l : requirement.partyLeader) !== null && _m !== void 0 ? _m : requirement.habitatRate) !== null && _o !== void 0 ? _o : requirement.miningRate) !== null && _p !== void 0 ? _p : requirement.logisticRate) !== null && _q !== void 0 ? _q : requirement.habitatTiles) !== null && _r !== void 0 ? _r : requirement.miningTiles) !== null && _s !== void 0 ? _s : requirement.roadTiles) !== null && _t !== void 0 ? _t : requirement.corruption) !== null && _u !== void 0 ? _u : requirement.excavation;
    return requirement;
}
function validateBehavior(behavior) {
    var _a, _b, _c;
    function validate(condition, error) {
        if (condition === false) {
            throw new Error(error);
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
            validate(((_a = behavior.moon) === null || _a === void 0 ? void 0 : _a.habitatRate) === undefined, 'spend.megacredits is not yet compatible with moon.habitatRate');
            validate(((_b = behavior.moon) === null || _b === void 0 ? void 0 : _b.logisticsRate) === undefined, 'spend.megacredits is not yet compatible with moon.logisticsRate');
            validate(((_c = behavior.moon) === null || _c === void 0 ? void 0 : _c.miningRate) === undefined, 'spend.megacredits is not yet compatible with moon.miningRate');
        }
        if (spend.heat) {
            validate(Object.keys(spend).length === 1, 'spend.heat cannot be used with another spend');
        }
    }
}
exports.validateBehavior = validateBehavior;
//# sourceMappingURL=Card.js.map