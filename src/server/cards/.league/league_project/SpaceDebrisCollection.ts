import {IProjectCard} from '../../IProjectCard';
import {IActionCard} from '../../ICard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {Player} from '../../../Player';
import {CardRequirements} from '../../requirements/CardRequirements';
import {max} from '../../Options';
import {OrOptions} from '../../../inputs/OrOptions';
import {SelectOption} from '../../../inputs/SelectOption';
import {CardResource} from '../../../../common/CardResource';

export class SpaceDebrisCollection extends Card implements IActionCard, IProjectCard {
  public override resourceCount = 0;

  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.SPACE_DEBRIS_COLLECTION,
      tags: [Tag.SPACE],
      cost: 10,
      resourceType: CardResource.ASTEROID,

      requirements: CardRequirements.builder((b) => b.tag(Tag.SCIENCE, 3, {max})),
      
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

  public override bespokePlay() {
    this.resourceCount = 2;
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    const hasAsteroids = this.resourceCount > 0;

    const drawCardOption = new SelectOption('Remove 1 asteroid on this card to draw a card', 'Remove asteroid', () => {
      this.resourceCount--;
      player.drawCard(1);
      return undefined;
    });

    const addAsteroidToSelf = new SelectOption('Add 1 asteroid to this card', 'Add asteroid', () => {
      player.addResourceTo(this, {log: true});
      return undefined;
    });

    if (hasAsteroids) {
      return new OrOptions(drawCardOption, addAsteroidToSelf);
    } else {
      player.addResourceTo(this, {log: true});
      return undefined;
    }
  }
}
