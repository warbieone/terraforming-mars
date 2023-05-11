import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';

export class SupplyDrop extends PreludeCard {
  constructor() {
    super({
      name: CardName.SUPPLY_DROP,

      behavior: {
        stock: {titanium: 3, steel: 7, plants: 3},
      },

      metadata: {
        cardNumber: 'P33',
        renderData: CardRenderer.builder((b) => {
          b.titanium(3, {digit}).steel(7, {digit}).plants(3, {digit});
        }),
        description: 'Gain 3 titanium, 7 steel and 3 plants.',
      },
    });
  }
}
