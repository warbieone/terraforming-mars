import {ICorporationCard} from '../corporation/ICorporationCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {all} from '../Options';

export class Aphrodite extends Card implements ICorporationCard {
  constructor() {
    super({
      name: CardName.APHRODITE,
      tags: [Tag.PLANT, Tag.VENUS],
      startingMegaCredits: 50,
      type: CardType.CORPORATION,

      behavior: {
        production: {plants: 2},
      },

      metadata: {
        cardNumber: 'R01',
        description: 'You start with 2 plant production and 50 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.plants(2)).nbsp.megacredits(50);
          b.corpBox('effect', (ce) => {
            ce.effect('Whenever Venus is terraformed 1 step, you gain 3 M€ and the player (not WGT) who raised it gain 2 M€.', (eb) => {
              eb.venus(1, {all}).startEffect;
              eb.megacredits(2).asterix().nbsp.megacredits(3);
            });
          });
        }),
      },
    });
  }
}
