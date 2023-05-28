import {IProjectCard} from '../../IProjectCard';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';

export class SteelCasting extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 3,
      name: CardName.STEEL_CASTING,
      type: CardType.AUTOMATED,

      behavior: {
        production: {steel: 1},
      },

      metadata: {
        cardNumber: 'L408',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.steel(1));
        }),
        description: 'Increase your Steel production 1 step.',
      },
    });
  }

}
