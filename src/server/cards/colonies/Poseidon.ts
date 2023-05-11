import {ICorporationCard} from '../corporation/ICorporationCard';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';

export class Poseidon extends Card implements ICorporationCard {
  constructor() {
    super({
      name: CardName.POSEIDON,
      startingMegaCredits: 40,
      type: CardType.CORPORATION,

      firstAction: {
        text: 'Place a colony',
        // title: 'Poseidon first action - Select where to build colony
        colonies: {buildColony: {}},
      },
      metadata: {
        cardNumber: 'R02',
        description: 'You start with 40 M€. As your first action, place a colony.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(45).nbsp.colonies(1);
          b.corpBox('effect', (ce) => {
            ce.effect('When you place a colony, including this, raise your M€ production 2 step.', (eb) => {
              eb.colonies(1).startEffect.production((pb) => pb.megacredits(2));
            });
          });
        }),
      },
    });
  }
}
