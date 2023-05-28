import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';

export class TitaniumIsotopes extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 12,
      tags: [Tag.SPACE],
      name: CardName.TITANIUM_ISOTOPES,
      type: CardType.AUTOMATED,

      behavior: {
        production: {titanium: 1},
      },

      victoryPoints: 1,

      metadata: {
        cardNumber: 'L407',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.titanium(1));
        }),
        description: 'Increase your Titanium production 1 step.',
      },
    });
  }
}
