import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Donation extends PreludeCard {
  constructor() {
    super({
      name: CardName.DONATION,

      behavior: {
        stock: {megacredits: 23},
      },

      metadata: {
        cardNumber: 'P08',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(23);
        }),
        description: 'Gain 23 M€.',
      },
    });
  }
}

