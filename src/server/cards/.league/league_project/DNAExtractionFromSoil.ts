import {ActionCard} from '../../ActionCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {CardResource} from '../../../../common/CardResource';

export class DNAExtractionFromSoil extends ActionCard{

  constructor() {
    super({
      cost: 6,
      tags: [Tag.MICROBE],
      name: CardName.DNA_EXTRACTION_FROM_SOIL,
      type: CardType.ACTIVE,
      resourceType: CardResource.MICROBE,
      
      action: {
        or: {
          behaviors: [
            {
              addResources: 1,
              title: 'Add 1 microbe to this card',
            },
            {
              spend: {resourcesHere: 1},
              drawCard: 1,
              title: 'Remove microbe',
            },
          ],
          autoSelect: true,
        },
      },

      metadata: {
        cardNumber: 'L415',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 1 microbe to this card, or remove 1 microbe here to draw a card.', (eb) => {
            eb.empty().arrow().resource(CardResource.MICROBE).or();
            eb.resource(CardResource.MICROBE).startAction.cards(1);
          });
        }),
      },
    });
  }

}
