"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoLine = void 0;
const CorporationCard_1 = require("./CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const Priority_1 = require("../../deferredActions/Priority");
class EcoLine extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.ECOLINE,
            tags: [Tag_1.Tag.PLANT],
            startingMegaCredits: 37,
            behavior: {
                production: { plants: 3 },
            },
            metadata: {
                cardNumber: 'R17',
                description: 'You start with 3 plant production, and 37 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.production((pb) => pb.plants(3)).nbsp.megacredits(37);
                    b.corpBox('effect', (ce) => {
                        ce.effect('Each time you play a plant, animal or microbe tag, including this, gain 2MC or 1 plant.', (eb) => {
                            eb.animals(1, { played: Options_1.played }).slash().plants(1, { played: Options_1.played }).slash().microbes(1, { played: Options_1.played });
                            eb.startEffect.megacredits(2).or().plants(1);
                        });
                    });
                }),
            },
        });
    }
    bespokePlay(player) {
        this.gainBonus(player, 1);
        return undefined;
    }
    gainBonus(player, amount) {
        for (let i = 0; i < amount; i++) {
            const options = new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Gain 2 MC', 'Gain MC')
                .andThen(() => {
                player.megaCredits += 2, { log: true };
                return undefined;
            }), new SelectOption_1.SelectOption('Gain 1 plant', 'Gain plant')
                .andThen(() => {
                player.plants += 1, { log: true };
                return undefined;
            }));
            player.defer(options, Priority_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        }
        return undefined;
    }
    onCardPlayed(player, card) {
        if (player.isCorporation(this.name)) {
            const amount = card.tags.filter((tag) => tag === Tag_1.Tag.ANIMAL || tag === Tag_1.Tag.PLANT || tag === Tag_1.Tag.MICROBE).length;
            if (amount > 0) {
                this.gainBonus(player, amount);
            }
        }
    }
}
exports.EcoLine = EcoLine;
