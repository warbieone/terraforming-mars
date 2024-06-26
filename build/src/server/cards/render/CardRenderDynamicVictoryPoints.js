"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRenderDynamicVictoryPoints = void 0;
const CardRenderItemType_1 = require("../../../common/cards/render/CardRenderItemType");
const CardRenderItem_1 = require("./CardRenderItem");
const Size_1 = require("../../../common/cards/render/Size");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
const RESOURCE_TO_ITEM_TYPE = {
    [CardResource_1.CardResource.MICROBE]: CardRenderItemType_1.CardRenderItemType.MICROBES,
    [CardResource_1.CardResource.ANIMAL]: CardRenderItemType_1.CardRenderItemType.ANIMALS,
    [CardResource_1.CardResource.CAMP]: CardRenderItemType_1.CardRenderItemType.CAMPS,
    [CardResource_1.CardResource.DATA]: CardRenderItemType_1.CardRenderItemType.DATA_RESOURCE,
    [CardResource_1.CardResource.SCIENCE]: CardRenderItemType_1.CardRenderItemType.SCIENCE,
    [CardResource_1.CardResource.RESOURCE_CUBE]: CardRenderItemType_1.CardRenderItemType.RESOURCE_CUBE,
    [CardResource_1.CardResource.PRESERVATION]: CardRenderItemType_1.CardRenderItemType.PRESERVATION,
    [CardResource_1.CardResource.ASTEROID]: CardRenderItemType_1.CardRenderItemType.ASTEROIDS,
    [CardResource_1.CardResource.FIGHTER]: CardRenderItemType_1.CardRenderItemType.FIGHTER,
    [CardResource_1.CardResource.FLOATER]: CardRenderItemType_1.CardRenderItemType.FLOATERS,
    [CardResource_1.CardResource.VENUSIAN_HABITAT]: CardRenderItemType_1.CardRenderItemType.VENUSIAN_HABITAT,
    [CardResource_1.CardResource.SPECIALIZED_ROBOT]: CardRenderItemType_1.CardRenderItemType.SPECIALIZED_ROBOT,
    [CardResource_1.CardResource.HYDROELECTRIC_RESOURCE]: CardRenderItemType_1.CardRenderItemType.HYDROELECTRIC_RESOURCE,
    [CardResource_1.CardResource.CLONE_TROOPER]: CardRenderItemType_1.CardRenderItemType.CLONE_TROOPER,
    [CardResource_1.CardResource.JOURNALISM]: CardRenderItemType_1.CardRenderItemType.JOURNALISM,
    [CardResource_1.CardResource.DISEASE]: undefined,
    [CardResource_1.CardResource.SYNDICATE_FLEET]: undefined,
    [CardResource_1.CardResource.SEED]: undefined,
    [CardResource_1.CardResource.AGENDA]: undefined,
    [CardResource_1.CardResource.ORBITAL]: undefined,
    [CardResource_1.CardResource.GRAPHENE]: undefined,
    [CardResource_1.CardResource.TOOL]: undefined,
    [CardResource_1.CardResource.WARE]: undefined,
    [CardResource_1.CardResource.SCOOP]: undefined,
    [CardResource_1.CardResource.ACTIVIST]: undefined,
    [CardResource_1.CardResource.SUPPLY_CHAIN]: undefined,
};
const TAG_TO_ITEM_TYPE = new Map([
    [Tag_1.Tag.JOVIAN, CardRenderItemType_1.CardRenderItemType.JOVIAN],
    [Tag_1.Tag.MOON, CardRenderItemType_1.CardRenderItemType.MOON],
    [Tag_1.Tag.VENUS, CardRenderItemType_1.CardRenderItemType.VENUS],
]);
class CardRenderDynamicVictoryPoints {
    constructor(item, points, target) {
        this.item = item;
        this.points = points;
        this.target = target;
        this.targetOneOrMore = false;
        this.anyPlayer = false;
        this.asterisk = undefined;
        this.asFraction = undefined;
    }
    static resource(type, points, target) {
        const itemType = RESOURCE_TO_ITEM_TYPE[type];
        if (itemType === undefined) {
            throw new Error('Unknown item type ' + type);
        }
        return new CardRenderDynamicVictoryPoints(new CardRenderItem_1.CardRenderItem(itemType), points, target);
    }
    static tag(type, points, target) {
        const itemType = TAG_TO_ITEM_TYPE.get(type);
        if (itemType === undefined) {
            throw new Error('Unknown item type ' + type);
        }
        return new CardRenderDynamicVictoryPoints(new CardRenderItem_1.CardRenderItem(itemType, 1, { played: true }), points, target);
    }
    static oceans(points, target) {
        const inner = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.OCEANS, -1, { size: Size_1.Size.SMALL });
        const item = new CardRenderDynamicVictoryPoints(inner, points, target);
        item.asterisk = true;
        return item;
    }
    static cities(points, target, any = false, asterisk = false) {
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.CITY);
        item.size = Size_1.Size.SMALL;
        item.anyPlayer = any;
        const vps = new CardRenderDynamicVictoryPoints(item, points, target);
        vps.asterisk = asterisk;
        return vps;
    }
    static searchForLife() {
        const item = new CardRenderDynamicVictoryPoints(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.SCIENCE), 3, 3);
        item.targetOneOrMore = true;
        return item;
    }
    static colonies(points, target, any = false) {
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.COLONIES);
        item.size = Size_1.Size.SMALL;
        item.anyPlayer = any;
        return new CardRenderDynamicVictoryPoints(item, points, target);
    }
    static moonMiningTile(points, any = false) {
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MOON_MINE);
        item.size = Size_1.Size.SMALL;
        item.anyPlayer = any;
        return new CardRenderDynamicVictoryPoints(item, points, points);
    }
    static moonHabitatTile(points) {
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MOON_HABITAT);
        item.size = Size_1.Size.SMALL;
        return new CardRenderDynamicVictoryPoints(item, points, 1);
    }
    static moonRoadTile(points, any = false) {
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.MOON_ROAD);
        item.size = Size_1.Size.SMALL;
        item.anyPlayer = any;
        return new CardRenderDynamicVictoryPoints(item, points, 1);
    }
    static cathedral() {
        const item = new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.CATHEDRAL);
        return new CardRenderDynamicVictoryPoints(item, 1, 1);
    }
    static questionmark(points = 0, per = 0) {
        return new CardRenderDynamicVictoryPoints(undefined, points, per);
    }
    static any(points) {
        const item = new CardRenderDynamicVictoryPoints(undefined, points, points);
        item.anyPlayer = true;
        return item;
    }
    static undergroundShelters() {
        const item = new CardRenderDynamicVictoryPoints(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.UNDERGROUND_SHELTERS), 1, 3);
        item.asterisk = true;
        item.asFraction = true;
        return item;
    }
}
exports.CardRenderDynamicVictoryPoints = CardRenderDynamicVictoryPoints;
