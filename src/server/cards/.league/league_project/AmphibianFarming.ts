import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import { CardRequirements } from '../../requirements/CardRequirements';
import {max} from '../../Options';

export class AmphibianFarming extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.AMPHIBIAN_FARMING,
      tags: [Tag.PLANT],
      cost: 7,

      behavior: {
        production: {plants: 1},
      },

      requirements: CardRequirements.builder((b) => b.oceans(2, {max})),

      metadata: {
        cardNumber: 'L406',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.plants(1));
        }),
        description: 'Requires 2 or less ocean tiles. Increase your Plant production 1 step.',
      },
    });
  }
}
