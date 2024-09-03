"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrewTraining = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const DeclareCloneTag_1 = require("../../pathfinders/DeclareCloneTag");
const Size_1 = require("../../../common/cards/render/Size");
class CrewTraining extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.CREW_TRAINING,
            behavior: {
                tr: 2,
            },
            metadata: {
                cardNumber: 'PfP06',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.planetaryTrack().text('2')
                        .tag(Tag_1.Tag.VENUS).or(Size_1.Size.SMALL)
                        .tag(Tag_1.Tag.EARTH).or(Size_1.Size.SMALL).br;
                    b.tag(Tag_1.Tag.MARS).or(Size_1.Size.SMALL)
                        .tag(Tag_1.Tag.JOVIAN).or(Size_1.Size.SMALL)
                        .tag(Tag_1.Tag.MOON).br;
                    b.tr(2);
                }),
                description: 'Choose a planet tag. This card counts as having 2 of that tag. ' +
                    'Raise the corresponding planetary track 2 steps. Gain 2 TR.',
            },
        });
        this.cloneTag = Tag_1.Tag.CLONE;
    }
    get tags() {
        return [this.cloneTag, this.cloneTag];
    }
    bespokePlay(player) {
        player.game.defer(new DeclareCloneTag_1.DeclareCloneTag(player, this));
        return undefined;
    }
}
exports.CrewTraining = CrewTraining;
