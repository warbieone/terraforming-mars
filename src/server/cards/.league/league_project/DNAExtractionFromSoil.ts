import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {CardResource} from '../../../../common/CardResource';
import {SelectOption} from '../../../inputs/SelectOption';
import {OrOptions} from '../../../inputs/OrOptions';
import {Player} from '../../../Player';

export class DNAExtractionFromSoil extends Card implements IProjectCard {

  constructor() {
    super({
      cost: 6,
      tags: [Tag.MICROBE],
      name: CardName.DNA_EXTRACTION_FROM_SOIL,
      type: CardType.ACTIVE,
      resourceType: CardResource.MICROBE,

      metadata: {
        cardNumber: 'L415',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 1 microbe to this card, or remove 1 microbe here to draw a card.', (eb) => {
            eb.empty().arrow().microbes(1).or();
            eb.microbes(1).startAction.cards(1);
          });
        }),
      },
    });
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: Player) {
    if (this.resourceCount < 1) {
      player.addResourceTo(this, 1);
      return undefined;
    }

    const opts: Array<SelectOption> = [];

    const addResource = new SelectOption('Add 1 floater on this card', 'Add microbe', () => this.addResource(player));
    const spendResource = new SelectOption('Remove 1 floater on this card to draw a card', 'Remove microbe', () => this.spendResource(player));

    opts.push(spendResource);
    opts.push(addResource);

    return new OrOptions(...opts);
  }

  private addResource(player: Player) {
    player.addResourceTo(this, 1);
    return undefined;
  }

  private spendResource(player: Player) {
    this.resourceCount--;
    player.drawCard();
    return undefined;
  }
}
