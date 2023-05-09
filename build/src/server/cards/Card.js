"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBehavior = exports.Card = exports.staticCardProperties = void 0;
const CardType_1 = require("../../common/cards/CardType");
const Tag_1 = require("../../common/cards/Tag");
const Units_1 = require("../../common/Units");
const CardRenderDynamicVictoryPoints_1 = require("./render/CardRenderDynamicVictoryPoints");
const CardRenderItemType_1 = require("../../common/cards/render/CardRenderItemType");
const MoonExpansion_1 = require("../moon/MoonExpansion");
const ICorporationCard_1 = require("./corporation/ICorporationCard");
const BehaviorExecutor_1 = require("../behavior/BehaviorExecutor");
const Counter_1 = require("../behavior/Counter");
const NO_COST_CARD_TYPES = [
    CardType_1.CardType.CORPORATION,
    CardType_1.CardType.PRELUDE,
    CardType_1.CardType.CEO,
    CardType_1.CardType.STANDARD_ACTION,
];
exports.staticCardProperties = new Map();
class Card {
    constructor(properties) {
        var _a;
        this.resourceCount = 0;
        let staticInstance = exports.staticCardProperties.get(properties.name);
        if (staticInstance === undefined) {
            if (properties.type === CardType_1.CardType.CORPORATION && properties.startingMegaCredits === undefined) {
                throw new Error('must define startingMegaCredits for corporation cards');
            }
            if (properties.cost === undefined) {
                if (NO_COST_CARD_TYPES.includes(properties.type) === false) {
                    throw new Error(`${properties.name} must have a cost property`);
                }
            }
            try {
                Card.autopopulateMetadataVictoryPoints(properties);
                validateBehavior(properties.behavior);
                validateBehavior(properties.firstAction);
            }
            catch (e) {
                throw new Error(`Cannot validate ${properties.name}: ${e}`);
            }
            const p = Object.assign(Object.assign({}, properties), { reserveUnits: properties.reserveUnits === undefined ? undefined : Object.assign(Object.assign({}, Units_1.Units.of(properties.reserveUnits)), { deduct: (_a = properties.reserveUnits.deduct) !== null && _a !== void 0 ? _a : true }) });
            exports.staticCardProperties.set(properties.name, p);
            staticInstance = p;
        }
        this.properties = staticInstance;
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
        return this.properties.reserveUnits || Object.assign(Object.assign({}, Units_1.Units.EMPTY), { deduct: true });
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
    canPlay(player) {
        var _a;
        if (((_a = this.requirements) === null || _a === void 0 ? void 0 : _a.satisfies(player)) === false) {
            return false;
        }
        if (this.behavior !== undefined && !(0, BehaviorExecutor_1.getBehaviorExecutor)().canExecute(this.behavior, player, this)) {
            return false;
        }
        return this.bespokeCanPlay(player);
    }
    bespokeCanPlay(_player) {
        return true;
    }
    play(player) {
        if (!(0, ICorporationCard_1.isICorporationCard)(this) && this.reserveUnits.deduct === true) {
            const adjustedReserveUnits = MoonExpansion_1.MoonExpansion.adjustedReserveCosts(player, this);
            player.deductUnits(adjustedReserveUnits);
        }
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
}
exports.Card = Card;
function validateBehavior(behavior) {
    var _a, _b, _c, _d;
    function validate(condition, error) {
        if (condition === false) {
            throw new Error(error);
        }
    }
    if (behavior === undefined) {
        return;
    }
    if (behavior.spend) {
        if ((_a = behavior.spend.megacredits) !== null && _a !== void 0 ? _a : behavior.spend.heat) {
            validate(behavior.tr === undefined, 'spend.megacredits and spend.heat are not yet compatible with tr');
            validate(behavior.global === undefined, 'spend.megacredits and spend.heat are not yet compatible with global');
            validate(((_b = behavior.moon) === null || _b === void 0 ? void 0 : _b.habitatRate) === undefined, 'spend.megacredits and spend.heat are not yet compatible with moon.habitatRate');
            validate(((_c = behavior.moon) === null || _c === void 0 ? void 0 : _c.logisticsRate) === undefined, 'spend.megacredits and spend.heat are not yet compatible with moon.logisticsRate');
            validate(((_d = behavior.moon) === null || _d === void 0 ? void 0 : _d.miningRate) === undefined, 'spend.megacredits and spend.heat are not yet compatible with moon.miningRate');
        }
    }
}
exports.validateBehavior = validateBehavior;
