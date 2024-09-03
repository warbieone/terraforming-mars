import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {CardResource} from '../../../../common/CardResource';


export class DactylAndIda extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.DACTYL_AND_IDA,
      tags: [Tag.SPACE],
      cost: 18,

      behavior: {
        global: {temperature: 1, oxygen: 1},
        addResourcesToAnyCard: {count: 2, type: CardResource.ASTEROID}
      },

      metadata: {
        description: 'Raise temperature 1 step and raise oxygen 1 step. Add 2 asteroid resources to ANY card.',
        cardNumber: 'L411',
        renderData: CardRenderer.builder((b) => {
          b.temperature(1).oxygen(1).br;
          b.resource(CardResource.ASTEROID,2);
        }),
      },
    });
  }

}
