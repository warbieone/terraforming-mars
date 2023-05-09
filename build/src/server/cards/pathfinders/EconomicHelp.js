"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomicHelp = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const PathfindersData_1 = require("../../pathfinders/PathfindersData");
const PathfindersExpansion_1 = require("../../pathfinders/PathfindersExpansion");
const Tag_1 = require("../../../common/cards/Tag");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class EconomicHelp extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.ECONOMIC_HELP,
            cost: 9,
            behavior: {
                production: { megacredits: 1 },
            },
            metadata: {
                cardNumber: 'Pf42',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.planetaryTrack().text('3').or().text('2')
                        .venus(1, { played: Options_1.played }).or(Size_1.Size.SMALL)
                        .earth(1, { played: Options_1.played }).or(Size_1.Size.SMALL).br;
                    b.mars(1, { played: Options_1.played }).or(Size_1.Size.SMALL)
                        .jovian({ amount: 1, played: Options_1.played }).or(Size_1.Size.SMALL)
                        .moon(1, { played: Options_1.played }).br;
                    b.production((pb) => pb.megacredits(1));
                }),
                description: 'Raise the lowest non-completed planetary influence track 3 steps. When tied, raise all lowest tracks 2 steps. ' +
                    'Increase your M€ production 1 step',
            },
        });
    }
    trackOffset(tag, data) {
        const value = data[tag];
        const maxValue = PathfindersExpansion_1.TRACKS[tag].spaces.length - 1;
        return maxValue === value ? -1 : value;
    }
    bespokePlay(player) {
        const data = player.game.pathfindersData;
        if (data === undefined) {
            return undefined;
        }
        const tags = player.game.tags.filter(PathfindersData_1.isPlanetaryTag);
        const values = tags.map((tag) => this.trackOffset(tag, data));
        const lowest = Math.min(...(values.filter((v) => v >= 0)));
        const count = values.filter((v) => v === lowest).length;
        const increment = (count === 1) ? 3 : 2;
        if (data.earth === lowest)
            PathfindersExpansion_1.PathfindersExpansion.raiseTrack(Tag_1.Tag.EARTH, player, increment);
        if (data.jovian === lowest)
            PathfindersExpansion_1.PathfindersExpansion.raiseTrack(Tag_1.Tag.JOVIAN, player, increment);
        if (data.mars === lowest)
            PathfindersExpansion_1.PathfindersExpansion.raiseTrack(Tag_1.Tag.MARS, player, increment);
        if (data.moon === lowest && player.game.gameOptions.moonExpansion === true)
            PathfindersExpansion_1.PathfindersExpansion.raiseTrack(Tag_1.Tag.MOON, player, increment);
        if (data.venus === lowest && player.game.gameOptions.venusNextExtension === true)
            PathfindersExpansion_1.PathfindersExpansion.raiseTrack(Tag_1.Tag.VENUS, player, increment);
        return undefined;
    }
}
exports.EconomicHelp = EconomicHelp;
