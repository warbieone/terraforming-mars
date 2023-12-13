import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {Resource} from '../../../../common/Resource';
import {SelectOption} from '../../../inputs/SelectOption';
import {OrOptions} from '../../../inputs/OrOptions';
import {Player} from '../../../Player';
import { SelectAmount } from '../../../../server/inputs/SelectAmount';
import {IPlayer} from '../../../IPlayer';


export class MarsHeavyIndustry extends Card implements IProjectCard {
  // author: ch0ka
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.MARS_HEAVY_INDUSTRY,
      cost: 8,
      tags: [Tag.BUILDING],

      victoryPoints: 1,

      metadata: {
        cardNumber: 'L302',
        renderData: CardRenderer.builder((b) => {
          b.action(undefined, (eb) => {
            eb.text('x').steel(1).startAction.text('x').energy(1);
          }).br;
          b.or().br;
          b.action(undefined, (eb) => {
            eb.text('x').steel(1).startAction.text('2x').heat(1);
          }).br;
        }),
        description: 'Spend X (up to 5) steel to get X energy OR 2X heat.',
      },
    });
  }

  public canAct(player: Player): boolean {
    return player.steel > 0;
  }

  public action(player: Player) {
    const availableSteel = Math.min(5, player.steel);
    if (availableSteel >= 1) {
      return new OrOptions(
        new SelectOption('Spend X (up to 5) steel to gain X energy', 'Get energy')
        .andThen(() => {
          return this.getEnergyOption(player);
        }),
        new SelectOption('Spend X (up to 5) steel to gain 2X heat', 'Get heat')
        .andThen(() => {
          return this.getHeatOption(player);
        }),
      );
    }
    return undefined;
  }


  private getEnergyOption(player: IPlayer) {
    return new SelectAmount('Select amount of steel to spend','OK', 1, player.steel)
      .andThen((amount) => {
        player.stock.deduct(Resource.STEEL, amount);
        player.stock.add(Resource.ENERGY, amount);
        player.game.log('${0} spent ${1} energy', (b) => b.player(player).number(amount));
        return undefined;
      });
  }
  
  private getHeatOption(player: IPlayer) {
    return new SelectAmount('Select amount of steel to spend','OK', 1, player.steel)
      .andThen((amount) => {
        player.stock.add(Resource.HEAT, (amount * 2));
        player.stock.deduct(Resource.STEEL, (amount));
        player.game.log('${0} spent ${1} energy', (b) => b.player(player).number(amount));
        return undefined;
      });
  }
}
