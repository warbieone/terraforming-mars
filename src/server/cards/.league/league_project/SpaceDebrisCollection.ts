import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {max} from '../../Options';
import {CardResource} from '../../../../common/CardResource';

export class SpaceDebrisCollection extends Card implements IProjectCard {
  public override resourceCount = 0;

  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.SPACE_DEBRIS_COLLECTION,
      tags: [Tag.SPACE],
      cost: 10,
      resourceType: CardResource.ASTEROID,

      requirements: {tag: Tag.SCIENCE, count: 5, max},

      action: {
        or: {
          behaviors: [
            {
              title: 'Add asteroid',
              addResources: 1,
            },
            {
              title: 'Remove asteroid',
              spend: {resourcesHere: 1},
              drawCard: 1,
            },
          ],
          autoSelect: true,
        },
      },
      
      metadata: {
        cardNumber: 'L417',
        description: 'Add 2 asteroids to this card.',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 1 asteroid to this card.', (eb) => {
            eb.empty().startAction.asteroids(1).nbsp.or();
          }).br;
          b.action('Spend 1 asteroid here to draw a card.', (eb) => {
            eb.asteroids(1).startAction.cards(1);
          }).br;
          b.asteroids(2);
        }),
      },
    });
  }


}
