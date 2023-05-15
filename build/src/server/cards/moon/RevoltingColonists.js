"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevoltingColonists = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../CardRequirements");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
class RevoltingColonists extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.REVOLTING_COLONISTS,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.MOON],
            cost: 3,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.habitatRate(4)),
            metadata: {
                description: 'Requires 4 habitat rate. All players pay 3M€ for each habitat tile they own.',
                cardNumber: 'M51',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(3, { all: Options_1.all }).slash().moonHabitat({ size: Size_1.Size.SMALL, all: Options_1.all });
                }),
            },
        });
    }
    bespokePlay(player) {
        const game = player.game;
        const colonies = MoonExpansion_1.MoonExpansion.spaces(game, TileType_1.TileType.MOON_HABITAT);
        game.getPlayers().forEach((habitatTileOwner) => {
            const owned = colonies.filter((colony) => { var _a; return ((_a = colony.player) === null || _a === void 0 ? void 0 : _a.id) === habitatTileOwner.id; }).length;
            if (owned > 0) {
                const bill = owned * 3;
                const owes = Math.min(bill, habitatTileOwner.spendableMegacredits());
                game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(habitatTileOwner, owes, {
                    title: 'You must pay ' + owes + 'M€ for ' + owned + ' habitat tiles',
                    afterPay: () => {
                        game.log('${0} spends ${1} M€ for the ${2} habitat tiles they own.', (b) => b.player(habitatTileOwner).number(owes).number(owned));
                    }
                }));
            }
        });
        return undefined;
    }
}
exports.RevoltingColonists = RevoltingColonists;
//# sourceMappingURL=RevoltingColonists.js.map