import {Tag} from '../../../common/cards/Tag';
import {CorporationCard} from './CorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';
import {Player} from '../../Player';
import {Resource} from '../../../common/Resource';


export class Thorgate extends CorporationCard {
  constructor() {
    super({
      name: CardName.THORGATE,
      tags: [Tag.POWER, Tag.SCIENCE],
      startingMegaCredits: 40,

      behavior: {
        production: {energy: 1},
      },

      cardDiscount: {tag: Tag.POWER, amount: 3},

      metadata: {
        cardNumber: 'R13',
        description: 'You start with 1 energy production and 40 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.energy(1)).nbsp.megacredits(40);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.action('Decr. energy prod. gain 6 M€.', (eb) => {
              eb.production((pb) => pb.energy(1)).startAction.megacredits(6);
            });
            ce.vSpace(Size.SMALL);
            ce.effect('When playing a power card OR SP POWER OR TURMOIL KELVINISTS ACTION, you pay 3 M€ less for it.', (eb) => {
              eb.energy(1).asterix().slash().production((pb) => {
                pb.energy(1).heat(1);
              }).asterix().startEffect.megacredits(-3);
            });
          });
        }),
      },
    });
  }

  public canAct(player: Player): boolean {
    return player.production.energy >= 1;
  }

  public action(player: Player) {
    if (player.production.energy >= 1) {
      return this.getMegacreditsOption(player);
    }
    return undefined;
  }

  private getMegacreditsOption(player: Player) {
    player.production.add(Resource.ENERGY, -1, {log: true});
    player.megaCredits += 6;
    player.game.log('${0} decreased energy production 1 step to gain 6 M€', (b) => b.player(player));
    return undefined;
  }

}

