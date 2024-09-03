import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardResource} from '../../../common/CardResource';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class AerobrakedAmmoniaAsteroid extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.AEROBRAKED_AMMONIA_ASTEROID,
      tags: [Tag.SPACE],
      cost: 26,

      behavior: {
        production: {heat: 4, plants: 1},
        addResourcesToAnyCard: {count: 3, type: CardResource.MICROBE},
      },

      metadata: {
        description: 'Increase your heat production 4 steps and your plant production 1 step. Add 3 Microbes to ANOTHER card.',
        cardNumber: '170',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.heat(4).br;
            pb.plants(1);
          }).br;
          b.resource(CardResource.MICROBE, 3).asterix();
        }),
      },
    });
  }
}
