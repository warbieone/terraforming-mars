import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';

export class BoringvillePopulationYou extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.BORINGVILLE_POPULATION_YOU,
      tags: [Tag.BUILDING, Tag.CITY],
      cost: 22,

      behavior: {
        production: {megacredits: 2},
        city: {},
      },

      metadata: {
        cardNumber: 'L424',
        description: 'Increase your M€ production 2 steps. Place a City tile.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.megacredits(2);
          }).nbsp.nbsp.city();
        }),
      },
    });
  }
}
