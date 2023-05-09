"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathfindersData = exports.isPlanetaryTag = exports.PLANETARY_TAGS = void 0;
const Tag_1 = require("../../common/cards/Tag");
exports.PLANETARY_TAGS = [Tag_1.Tag.VENUS, Tag_1.Tag.EARTH, Tag_1.Tag.MARS, Tag_1.Tag.JOVIAN, Tag_1.Tag.MOON];
function isPlanetaryTag(tag) {
    return exports.PLANETARY_TAGS.includes(tag);
}
exports.isPlanetaryTag = isPlanetaryTag;
var PathfindersData;
(function (PathfindersData) {
    function serialize(pathfindersData) {
        if (pathfindersData === undefined) {
            return undefined;
        }
        return {
            venus: pathfindersData.venus,
            earth: pathfindersData.earth,
            mars: pathfindersData.mars,
            jovian: pathfindersData.jovian,
            moon: pathfindersData.moon,
            vps: pathfindersData.vps,
        };
    }
    PathfindersData.serialize = serialize;
    function deserialize(pathfindersData) {
        return {
            venus: pathfindersData.venus,
            earth: pathfindersData.earth,
            mars: pathfindersData.mars,
            jovian: pathfindersData.jovian,
            moon: pathfindersData.moon,
            vps: pathfindersData.vps,
        };
    }
    PathfindersData.deserialize = deserialize;
})(PathfindersData = exports.PathfindersData || (exports.PathfindersData = {}));
