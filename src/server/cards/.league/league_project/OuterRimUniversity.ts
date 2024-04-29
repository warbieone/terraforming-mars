import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import { SimpleDeferredAction} from '../../../deferredActions/DeferredAction';
import { OrOptions } from '../../../../server/inputs/OrOptions';
import { SelectOption } from '../../../../server/inputs/SelectOption';
import {SelectCard} from '../../../inputs/SelectCard';
import {IPlayer} from '../../../IPlayer';
import {Priority} from '../../../deferredActions/Priority';



export class OuterRimUniversity extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.OUTER_RIM_UNIVERSITY,
      tags: [Tag.JOVIAN],
      cost: 10,

      victoryPoints: 1,

      metadata: {
        cardNumber: 'L418',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play a Jovian tag, including this, you may discard a card from hand to draw a card.', (eb) => {
            eb.jovian().startEffect.minus().cards(1).nbsp.plus().cards(1);
          });
        }),
      },
    });
  }

  public onCardPlayed(player: IPlayer, card: IProjectCard) {
    const jovianTags = player.tags.cardTagCount(card, Tag.JOVIAN);
    for (let i = 0; i < jovianTags; i++) {
      player.game.defer(new SimpleDeferredAction(
        player,
        () => {
          // No card to discard
          if (player.cardsInHand.length === 0) {
            return undefined;
          }
          return new OrOptions(
            new SelectCard('Select a card to discard', 'Discard', player.cardsInHand)
              .andThen(([card]) => {
                player.game.log('${0} is using their ${1} effect to draw a card by discarding a card.', (b) => b.player(player).card(this));
                player.discardCardFromHand(card, {log: true});
                player.drawCard();
                return undefined;
              }),
            new SelectOption('Do nothing'),
          );
        },
      ),
      Priority.DISCARD_AND_DRAW);
    }
    return undefined;
  }
}
