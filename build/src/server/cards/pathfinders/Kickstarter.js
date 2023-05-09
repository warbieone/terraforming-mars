"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kickstarter = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const DeclareCloneTag_1 = require("../../pathfinders/DeclareCloneTag");
const PathfindersExpansion_1 = require("../../pathfinders/PathfindersExpansion");
class Kickstarter extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.KICKSTARTER,
            cost: 12,
            metadata: {
                cardNumber: 'PfTBD',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.planetaryTrack().text('3');
                }),
                description: 'Choose a planet tag. This card counts as having 1 of that tag. Raise the corresponding planetary track 3 steps in total.',
            },
        });
        this.cloneTag = Tag_1.Tag.CLONE;
    }
    get tags() {
        return [this.cloneTag];
    }
    bespokePlay(player) {
        player.game.defer(new DeclareCloneTag_1.DeclareCloneTag(player, this, (tag) => PathfindersExpansion_1.PathfindersExpansion.raiseTrack(tag, player, 2)));
        return undefined;
    }
}
exports.Kickstarter = Kickstarter;
