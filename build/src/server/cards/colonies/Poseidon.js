"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poseidon = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
class Poseidon extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.POSEIDON,
            startingMegaCredits: 40,
            firstAction: {
                text: 'Place a colony',
                colonies: { buildColony: {} },
            },
            metadata: {
                cardNumber: 'R02',
                description: 'You start with 40 M€. As your first action, place a colony.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(45).nbsp.colonies(1);
                    b.corpBox('effect', (ce) => {
                        ce.effect('When anyone plays a colony, including this, raise your M€ production 1 step.', (eb) => {
                            eb.colonies(1).startEffect.production((pb) => pb.megacredits(1));
                        });
                    });
                }),
            },
        });
    }
    onColonyAdded(_player, cardOwner) {
        cardOwner.production.add(Resource_1.Resource.MEGACREDITS, 1, { log: true });
    }
}
exports.Poseidon = Poseidon;
