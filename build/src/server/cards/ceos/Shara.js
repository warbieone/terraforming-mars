"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shara = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Tag_1 = require("../../../common/cards/Tag");
const DeclareCloneTag_1 = require("../../pathfinders/DeclareCloneTag");
const Resource_1 = require("../../../common/Resource");
const Options_1 = require("../Options");
class Shara extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.SHARA,
            metadata: {
                cardNumber: 'LXXX',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('ACTIVATE THE BELOW ABILITY').br;
                    b.planetaryTrack().text('2').nbsp.megacredits(0, { clone: Options_1.clone }).asterix();
                }),
                description: 'Once per game, choose a planet tag. This card counts as having immediately played 2 of that tag. Then gain M€ equal to that tags planety influence track.',
            },
        });
        this.cloneTag = Tag_1.Tag.CLONE;
    }
    get tags() {
        return [this.cloneTag, this.cloneTag];
    }
    action(player) {
        this.isDisabled = true;
        const data = player.game.pathfindersData;
        if (data === undefined) {
            return undefined;
        }
        player.game.defer(new DeclareCloneTag_1.DeclareCloneTag(player, this, (tag) => {
            const value = data[tag];
            player.addResource(Resource_1.Resource.MEGACREDITS, value, { log: true });
        }));
        return undefined;
    }
}
exports.Shara = Shara;
