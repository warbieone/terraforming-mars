"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRenderDynamicVictoryPoints = void 0;
const CardRenderItemType_1 = require("../../../common/cards/render/CardRenderItemType");
const CardRenderItem_1 = require("./CardRenderItem");
const Size_1 = require("../../../common/cards/render/Size");
const CardResource_1 = require("../../../common/CardResource");
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
    static resource(resource, points, target) {
        return new CardRenderDynamicVictoryPoints(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.RESOURCE, 1, { resource: resource }), points, target);
    }
    static tag(tag, points, target) {
        return new CardRenderDynamicVictoryPoints(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.TAG, 1, { tag: tag }), points, target);
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
        const item = new CardRenderDynamicVictoryPoints(new CardRenderItem_1.CardRenderItem(CardRenderItemType_1.CardRenderItemType.RESOURCE, 1, { resource: CardResource_1.CardResource.SCIENCE }), 3, 3);
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
