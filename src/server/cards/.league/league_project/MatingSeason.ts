import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {IPlayer} from '../../../../server/IPlayer';


export class MatingSeason extends Card implements IProjectCard {
  // author: Kyshantry
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.MATING_SEASON,
      cost: 5,
      tags: [Tag.ANIMAL],

      metadata: {
        cardNumber: 'L306',
        renderData: CardRenderer.builder((b) => {
          b.action(undefined, (eb) => {
            eb.text('2').animals(1).startAction.text('+1').animals(1);
          }).br;
        }),
        description: 'Add an animal to each of your cards with at least two animals on it.',
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    player.getCardsWithResources().forEach((card) => {
      if (card.tags.filter((tag) => tag === Tag.ANIMAL).length === 0 || card.resourceCount === undefined) return undefined;
      if (card.resourceCount >= 2) player.addResourceTo(card);
      return undefined;
    });
    return undefined;
  }
}
