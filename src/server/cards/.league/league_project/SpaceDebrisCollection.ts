import {IActionCard} from '../../ICard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {max} from '../../Options';
import {CardResource} from '../../../../common/CardResource';
import {ActionCard} from '../../ActionCard';

export class SpaceDebrisCollection extends ActionCard implements IActionCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.SPACE_DEBRIS_COLLECTION,
      tags: [Tag.SPACE],
      cost: 10,
      resourceType: CardResource.ASTEROID,

      behavior: {
        addResources: 2,
      },

      requirements: {tag: Tag.SCIENCE, count: 5, max},

      action: {
        or: {
          behaviors: [
            {
              addResources: 1,
              title: 'Add asteroid',

            },
            {
              spend: {resourcesHere: 1},
              drawCard: 1,
              title: 'Remove asteroid',
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
            eb.empty().startAction.resource(CardResource.ASTEROID).nbsp.or();
          }).br;
          b.action('Spend 1 asteroid here to draw a card.', (eb) => {
            eb.resource(CardResource.ASTEROID).startAction.cards(1);
          }).br;
          b.resource(CardResource.ASTEROID,2);
        }),
      },
    });
  }


}
