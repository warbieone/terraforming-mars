"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contractor = void 0;
const Tag_1 = require("../../common/cards/Tag");
class Contractor {
    constructor() {
        this.name = 'Contractor';
        this.description = 'Having the most building tags in play';
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.BUILDING, 'award');
    }
}
exports.Contractor = Contractor;
//# sourceMappingURL=Contractor.js.map