import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Mohole extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.MOHOLE,
      tags: [Tag.BUILDING],

      behavior: {
        production: {heat: 2,energy: 1},
        stock: {heat: 5, energy: 3},
      },

      metadata: {
        cardNumber: 'P22',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.heat(2).energy(1)).br;
          b.heat(5);
          b.energy(3)
        }),
        description: 'Increase your heat production 2 steps and energy production 1 step. Gain 3 energy and 5 heat',
      },
    });
  }
}
