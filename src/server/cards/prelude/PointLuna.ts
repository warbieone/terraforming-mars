import {Tag} from '../../../common/cards/Tag';
import {Player} from '../../Player';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {played} from '../Options';
import {DiscardCards} from '../../deferredActions/DiscardCards';
import {Resource} from '../../../common/Resource';

export class PointLuna extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      name: CardName.POINT_LUNA,
      tags: [Tag.SPACE, Tag.EARTH],
      startingMegaCredits: 48,

      metadata: {
        cardNumber: 'R10',
        description: 'You start with 1 titanium production and 48 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.titanium(1)).nbsp.megacredits(48);
          b.corpBox('effect', (ce) => {
            ce.effect('When you play an Earth tag, including this, draw a card then discard a card.', (eb) => {
              eb.earth(1, {played}).startEffect.cards(1).minus().cards(1);
            });
          });
        }),
      },
    });
  }
  public onCorpCardPlayed(player: Player, card: ICorporationCard) {
    return this.onCardPlayed(player, card);
  }

  public onCardPlayed(player: Player, card: IProjectCard | ICorporationCard) {
    if (player.isCorporation(this.name)) {
      const tagCount = player.tags.cardTagCount(card, Tag.EARTH);
      if (tagCount > 0) {
        player.drawCard(tagCount),{log: true};
        player.game.defer(new DiscardCards(player,1));
      }
    }
    return undefined;
  }

  public override play(player: Player) {
    player.production.add(Resource.TITANIUM, 1);
    player.drawCard();
    player.game.defer(new DiscardCards(player, 1));
    return undefined;
  }

}
