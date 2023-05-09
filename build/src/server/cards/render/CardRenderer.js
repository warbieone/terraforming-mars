"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRenderer = void 0;
const CardRenderItem_1 = require("./CardRenderItem");
const CardRenderSymbol_1 = require("./CardRenderSymbol");
const Size_1 = require("../../../common/cards/render/Size");
const CardRenderItemType_1 = require("../../../common/cards/render/CardRenderItemType");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class CardRenderer {
    static builder(f) {
        const builder = new RootBuilder();
        f(builder);
        return builder.build();
    }
}
exports.CardRenderer = CardRenderer;
class CardRenderRoot {
    constructor(rows = [[]]) {
        this.rows = rows;
        this.is = 'root';
    }
}
class CardRenderProductionBox {
    constructor(rows) {
        this.rows = rows;
        this.is = 'production-box';
    }
    static builder(f) {
        const builder = new ProductionBoxBuilder();
        f(builder);
        return builder.build();
    }
}
class CardRenderTile {
    constructor(tile, hasSymbol, isAres) {
        this.tile = tile;
        this.hasSymbol = hasSymbol;
        this.isAres = isAres;
        this.is = 'tile';
    }
}
class CardRenderEffect {
    constructor(rows) {
        this.rows = rows;
        this.is = 'effect';
    }
    static builder(f) {
        const builder = new EffectBuilder();
        f(builder);
        return builder.build().validate();
    }
    validate() {
        if (this.rows.length !== 3) {
            throw new Error('Card effect must have 3 arrays representing cause, delimiter and effect. If there is no cause, start with `empty`.');
        }
        if (this.rows[1].length !== 1) {
            throw new Error('Card effect delimiter array must contain exactly 1 item');
        }
        if (!(this.rows[1][0] instanceof CardRenderSymbol_1.CardRenderSymbol)) {
            throw new Error('Effect delimiter must be a symbol');
        }
        return this;
    }
    set description(content) {
        this.rows[2].push(content);
    }
}
class CardRenderCorpBoxEffect {
    constructor(rows) {
        this.rows = rows;
        this.is = 'corp-box-effect';
    }
    static builder(f) {
        const builder = new CorpEffectBuilderEffect();
        f(builder);
        return builder.build();
    }
}
class CardRenderCorpBoxAction {
    constructor(rows) {
        this.rows = rows;
        this.is = 'corp-box-action';
    }
    static builder(f) {
        const builder = new CorpEffectBuilderAction();
        f(builder);
        return builder.build();
    }
}
class Builder {
    constructor() {
        this._data = [[]];
    }
    _currentRow() {
        if (this._data.length === 0) {
            throw new Error('No items in builder data!');
        }
        return this._data[this._data.length - 1];
    }
    _appendToRow(thing) {
        this._currentRow().push(thing);
        return this;
    }
    temperature(amount) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.TEMPERATURE, amount));
    }
    oceans(amount, options) {
        var _a;
        const opts = options !== null && options !== void 0 ? options : { size: Size_1.Size.MEDIUM };
        opts.size = (_a = opts.size) !== null && _a !== void 0 ? _a : Size_1.Size.MEDIUM;
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.OCEANS, amount, options);
        return this._appendToRow(item);
    }
    oxygen(amount) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.OXYGEN, amount));
    }
    venus(amount, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.VENUS, amount, options));
    }
    plants(amount, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.PLANTS, amount, options));
    }
    microbes(amount, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MICROBES, amount, options));
    }
    animals(amount, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.ANIMALS, amount, options));
    }
    heat(amount, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.HEAT, amount, options));
    }
    energy(amount, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.ENERGY, amount, options));
    }
    titanium(amount, options) {
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.TITANIUM, amount, options);
        return this._appendToRow(item);
    }
    steel(amount, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.STEEL, amount, options));
    }
    tr(amount, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.TR, amount, options));
    }
    megacredits(amount, options) {
        var _a;
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MEGACREDITS, amount, options);
        item.amountInside = true;
        item.showDigit = false;
        item.size = (_a = options === null || options === void 0 ? void 0 : options.size) !== null && _a !== void 0 ? _a : Size_1.Size.MEDIUM;
        return this._appendToRow(item);
    }
    cards(amount, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.CARDS, amount, options));
    }
    floaters(amount, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.FLOATERS, amount, options));
    }
    asteroids(amount, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.ASTEROIDS, amount, options));
    }
    event(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.EVENT, -1, options));
    }
    space(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.SPACE, -1, options));
    }
    earth(amount = -1, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.EARTH, amount, options));
    }
    building(amount = -1, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.BUILDING, amount, options));
    }
    jovian(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.JOVIAN, -1, options));
    }
    science(amount = 1, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.SCIENCE, amount, options));
    }
    trade(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.TRADE, -1, options));
    }
    tradeFleet() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.TRADE_FLEET));
    }
    colonies(amount = 1, options) {
        var _a;
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.COLONIES, amount, options);
        item.size = (_a = options === null || options === void 0 ? void 0 : options.size) !== null && _a !== void 0 ? _a : Size_1.Size.MEDIUM;
        return this._appendToRow(item);
    }
    tradeDiscount(amount) {
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.TRADE_DISCOUNT, amount * -1);
        item.amountInside = true;
        return this._appendToRow(item);
    }
    placeColony(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.PLACE_COLONY, -1, options));
    }
    influence(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.INFLUENCE, 1, options));
    }
    city(options) {
        var _a;
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.CITY, -1, options);
        item.size = (_a = options === null || options === void 0 ? void 0 : options.size) !== null && _a !== void 0 ? _a : Size_1.Size.MEDIUM;
        return this._appendToRow(item);
    }
    greenery(size = Size_1.Size.MEDIUM, withO2 = true, any = false) {
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.GREENERY);
        item.size = size;
        if (withO2) {
            item.secondaryTag = AltSecondaryTag_1.AltSecondaryTag.OXYGEN;
        }
        if (any === true) {
            item.anyPlayer = true;
        }
        return this._appendToRow(item);
    }
    delegates(amount, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.DELEGATES, amount, options));
    }
    partyLeaders(amount = -1) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.PARTY_LEADERS, amount));
    }
    chairman(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.CHAIRMAN, -1, options));
    }
    globalEvent() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.GLOBAL_EVENT));
    }
    noTags() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.NO_TAGS, -1));
    }
    wild(amount, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.WILD, amount, options));
    }
    preservation(amount) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.PRESERVATION, amount));
    }
    diverseTag(amount = 1) {
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.DIVERSE_TAG, amount);
        item.isPlayed = true;
        return this._appendToRow(item);
    }
    fighter(amount = 1) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.FIGHTER, amount));
    }
    camps(amount = 1) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.CAMPS, amount));
    }
    selfReplicatingRobots() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.SELF_REPLICATING));
    }
    prelude() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.PRELUDE));
    }
    award() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.AWARD));
    }
    milestone(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MILESTONE, 1, options));
    }
    corporation() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.CORPORATION));
    }
    firstPlayer() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.FIRST_PLAYER));
    }
    rulingParty() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.RULING_PARTY));
    }
    vpIcon() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.VP));
    }
    community() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.COMMUNITY));
    }
    disease() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.DISEASE));
    }
    data(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.DATA_RESOURCE, 1, options));
    }
    venusianHabitat(amount) {
        this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.VENUSIAN_HABITAT, amount));
        return this;
    }
    specializedRobot(amount) {
        this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.SPECIALIZED_ROBOT, amount));
        return this;
    }
    agenda(options) {
        this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.AGENDA, 1, options));
        return this;
    }
    multiplierWhite() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MULTIPLIER_WHITE));
    }
    description(description = undefined) {
        return this._appendToRow(description);
    }
    moon(amount = -1, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MOON, amount, options));
    }
    resourceCube(amount = 1) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.RESOURCE_CUBE, amount));
    }
    moonHabitat(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MOON_HABITAT, 1, options));
    }
    moonHabitatRate(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MOON_HABITAT_RATE, 1, options));
    }
    moonRoad(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MOON_ROAD, 1, options));
    }
    moonLogisticsRate(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MOON_LOGISTICS_RATE, 1, options));
    }
    moonMine(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MOON_MINE, 1, options));
    }
    moonMiningRate(options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MOON_MINING_RATE, 1, options));
    }
    syndicateFleet(amount = 1) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.SYNDICATE_FLEET, amount));
    }
    mars(amount, options) {
        this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MARS, amount, options));
        return this;
    }
    planetaryTrack() {
        this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.PLANETARY_TRACK, 1));
        return this;
    }
    seed() {
        this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.SEED, 1));
        return this;
    }
    orbital() {
        this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.ORBITAL, 1));
        return this;
    }
    specialTile(options) {
        this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.EMPTY_TILE_SPECIAL, 1, options));
        return this;
    }
    emptyTile(type = 'normal', options) {
        var _a, _b;
        if (type === 'normal') {
            const normal = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.EMPTY_TILE, -1, options);
            normal.size = (_a = options === null || options === void 0 ? void 0 : options.size) !== null && _a !== void 0 ? _a : Size_1.Size.MEDIUM;
            this._appendToRow(normal);
        }
        else if (type === 'golden') {
            const golden = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.EMPTY_TILE_GOLDEN, -1, options);
            golden.size = (_b = options === null || options === void 0 ? void 0 : options.size) !== null && _b !== void 0 ? _b : Size_1.Size.MEDIUM;
            this._appendToRow(golden);
        }
        return this;
    }
    production(pb) {
        return this._appendToRow(CardRenderProductionBox.builder(pb));
    }
    standardProject(description, eb) {
        const builder = CardRenderEffect.builder(eb);
        builder.description = description;
        return this._appendToRow(builder);
    }
    action(description, eb) {
        const builder = CardRenderEffect.builder(eb);
        builder.description = description !== undefined ? 'Action: ' + description : undefined;
        return this._appendToRow(builder);
    }
    effect(description, eb) {
        const builder = CardRenderEffect.builder(eb);
        builder.description = description !== undefined ? 'Effect: ' + description : undefined;
        return this._appendToRow(builder);
    }
    corpBox(type, eb) {
        this.br;
        if (type === 'action') {
            return this._appendToRow(CardRenderCorpBoxAction.builder(eb));
        }
        else {
            return this._appendToRow(CardRenderCorpBoxEffect.builder(eb));
        }
    }
    or(size = Size_1.Size.SMALL) {
        return this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.or(size));
    }
    asterix(size = Size_1.Size.MEDIUM) {
        return this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.asterix(size));
    }
    plus(size = Size_1.Size.MEDIUM) {
        return this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.plus(size));
    }
    minus(size = Size_1.Size.MEDIUM) {
        return this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.minus(size));
    }
    slash(size = Size_1.Size.MEDIUM) {
        return this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.slash(size));
    }
    colon(size = Size_1.Size.MEDIUM) {
        return this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.colon(size));
    }
    arrow(size = Size_1.Size.MEDIUM) {
        return this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.arrow(size));
    }
    equals(size = Size_1.Size.MEDIUM) {
        return this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.equals(size));
    }
    surveyMission() {
        return this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.surveyMission());
    }
    empty() {
        return this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.empty());
    }
    plate(text) {
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.PLATE);
        item.text = text;
        item.isPlate = true;
        item.isBold = true;
        return this._appendToRow(item);
    }
    text(text, size = Size_1.Size.MEDIUM, uppercase = false, isBold = true) {
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.TEXT);
        item.text = text;
        item.size = size;
        item.isUppercase = uppercase;
        item.isBold = isBold;
        return this._appendToRow(item);
    }
    text2(text, options) {
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.TEXT);
        item.text = text;
        item.size = options.size || Size_1.Size.MEDIUM;
        item.isUppercase = options.caps || false;
        item.isBold = options.bold || true;
        item.anyPlayer = options.all;
        return this._appendToRow(item);
    }
    vpText(text) {
        return this.text(text, Size_1.Size.TINY, true);
    }
    get br() {
        this._data.push([]);
        return this;
    }
    tile(tile, hasSymbol = false, isAres = false) {
        return this._appendToRow(new CardRenderTile(tile, hasSymbol, isAres));
    }
    projectRequirements() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.IGNORE_GLOBAL_REQUIREMENTS));
    }
    get nbsp() {
        return this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.nbsp());
    }
    vSpace(size = Size_1.Size.MEDIUM) {
        return this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.vSpace(size));
    }
    get openBrackets() {
        return this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.bracketOpen());
    }
    get closeBrackets() {
        return this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.bracketClose());
    }
    get startEffect() {
        this.br;
        this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.colon());
        this.br;
        return this;
    }
    get startAction() {
        this.br;
        this._appendToRow(CardRenderSymbol_1.CardRenderSymbol.arrow());
        this.br;
        return this;
    }
    opgArrow() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.ARROW_OPG));
    }
    reds() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.REDS));
    }
    redsInactive() {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.REDS_DEACTIVATED));
    }
    hazardTile(amount = 1, options) {
        return this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.HAZARD_TILE, amount, options));
    }
    adjacencyBonus() {
        this._appendToRow(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.ADJACENCY_BONUS));
        return this;
    }
}
class RootBuilder extends Builder {
    build() {
        return new CardRenderRoot(this._data);
    }
}
class ProductionBoxBuilder extends Builder {
    build() {
        return new CardRenderProductionBox(this._data);
    }
}
class EffectBuilder extends Builder {
    build() {
        return new CardRenderEffect(this._data);
    }
}
class CorpEffectBuilderEffect extends Builder {
    build() {
        return new CardRenderCorpBoxEffect(this._data);
    }
}
class CorpEffectBuilderAction extends Builder {
    build() {
        return new CardRenderCorpBoxAction(this._data);
    }
}
