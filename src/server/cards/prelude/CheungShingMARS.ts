import {Tag} from '../../../common/cards/Tag';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {played} from '../Options';
import {IProjectCard} from '../IProjectCard';
import {Player} from '../../Player';

export class CheungShingMARS extends Card implements ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      name: CardName.CHEUNG_SHING_MARS,
      tags: [Tag.BUILDING],
      startingMegaCredits: 46,

      behavior: {
        production: {megacredits: 3},
      },

      // cardDiscount: {tag: Tag.BUILDING, amount: 2},
      metadata: {
        cardNumber: 'R16',
        description: 'You start with 3 M€ production and 44 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.production((pb) => pb.megacredits(3)).nbsp.megacredits(44);
          b.corpBox('effect', (ce) => {
            ce.effect('When you play a building tag, gain 2 M€.', (eb) => {
              eb.building(1, {played}).startEffect.megacredits(2);
            });
          });
        }),
      },
    });
  }
  public onCardPlayed(player: Player, card: IProjectCard) {
    if (player.isCorporation(this.name)) {
      const tagCount = player.tags.cardTagCount(card, Tag.BUILDING);
      if (tagCount > 0) {
        player.megaCredits += 2,{log: true};
      }
    }
  }
}
