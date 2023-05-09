"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalAgenda = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
class PersonalAgenda extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.PERSONAL_AGENDA,
            behavior: {
                production: { megacredits: 3 },
            },
            metadata: {
                cardNumber: 'P08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(3)).br;
                    b.cards(3, { secondaryTag: Tag_1.Tag.EVENT }).asterix();
                }),
                description: 'Increase your M€ production 3 steps. Draw 3 event cards that do not have a space tag.',
            },
        });
    }
    bespokePlay(player) {
        player.drawCard(3, {
            include: (card) => {
                return card.type === CardType_1.CardType.EVENT &&
                    (card.tags.includes(Tag_1.Tag.SPACE) === false);
            }
        });
        return undefined;
    }
}
exports.PersonalAgenda = PersonalAgenda;
