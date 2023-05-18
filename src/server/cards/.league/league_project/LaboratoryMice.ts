import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {CardResource} from '../../../../common/CardResource';
import {CardRequirements} from '../../CardRequirements';
import {ActionCard} from '../../ActionCard';

export class LaboratoryMice extends ActionCard implements IProjectCard {
  // author: yutaro

  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.LABORATORY_MICE,
      cost: 8,
      tags: [Tag.SCIENCE, Tag.ANIMAL],
      resourceType: CardResource.ANIMAL,

      requirements: CardRequirements.builder((b) => b.oxygen(3)),
      victoryPoints: {resourcesHere: {}, per: 3},

      action: {
        addResources: 1,
      },

      metadata: {
        cardNumber: 'L305',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 1 Animal to this card.', (eb) => {
            eb.empty().startAction.animals(1);
          }).br;
          b.animals(1).br;
          b.vpText('1 VP per 3 Animals on this card.');
        }),
        description: 'Add 1 Animal to this card.',
      },
    });
  }
}
