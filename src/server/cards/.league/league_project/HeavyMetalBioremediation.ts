import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import { CardRequirements } from '../../requirements/CardRequirements';
import {Resource} from '../../../../common/Resource';
import {Player} from '../../../Player';
import { OrOptions } from '../../../../server/inputs/OrOptions';
import { SelectOption } from '../../../../server/inputs/SelectOption';
import { SelectAmount } from '../../../../server/inputs/SelectAmount';

export class HeavyMetalBioremediation extends Card implements IProjectCard {
  // author: MartyM
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.HEAVY_METAL_BIOREMEDIATION,
      cost: 10,
      tags: [Tag.MICROBE, Tag.BUILDING],

      victoryPoints: 1,

      requirements: CardRequirements.builder((b) => b.oxygen(9)),
      metadata: {
        cardNumber: 'L309',
        renderData: CardRenderer.builder((b) => {
          b.action(undefined, (eb) => {
            eb.text('x').steel(1).startAction.megacredits(0);
          }).br;
          b.or().br;
          b.action(undefined, (eb) => {
            eb.text('x').titanium(1).startAction.megacredits(0);
          }).br;
        }),
        description: 'Convert up to 3 of a metal for it\'s monetary value (including bonuses).',
      },
    });
  }

  public canAct(player: Player): boolean {
    return player.steel > 0 || player.titanium > 0;
  }

  public action(player: Player) {
    const availableSteel = Math.min(3, player.steel);
    const availableTitanium = Math.min(3, player.titanium);

    const orOptions = new OrOptions();

    if (availableSteel >= 1) {
      orOptions.options.push(new SelectOption('Convert up to 3 steel for it\'s monetary value (including bonuses).',
        'Convert steel', () => {
          return this.convSteelOption(player, availableSteel);
        }));
    }

    if (availableTitanium >= 1) {
      orOptions.options.push(new SelectOption('Convert up to 3 titanium for it\'s monetary value (including bonuses).',
        'Convert titanium', () => {
          return this.convTitaniumOption(player, availableTitanium);
        }));
    }

    if (orOptions.options.length === 1) return orOptions.options[0].cb();
    return orOptions;
  }

  private convSteelOption(player: Player, availableSteel: number): SelectAmount {
    return new SelectAmount(
      'Select amount of steel to spend',
      'Gain MC',
      (amount: number) => {
        player.stock.add(Resource.MEGACREDITS, player.getSteelValue() * amount);
        player.stock.deduct(Resource.STEEL, (amount));

        player.game.log('${0} gained ${1} MC', (b) => b.player(player).number(player.getSteelValue() * amount));
        return undefined;
      },
      1,
      availableSteel,
    );
  }

  private convTitaniumOption(player: Player, availableTitanium: number): SelectAmount {
    return new SelectAmount(
      'Select amount of titanium to spend',
      'Gain MC',
      (amount: number) => {
        player.stock.add(Resource.MEGACREDITS, player.getTitaniumValue() * amount);
        player.stock.deduct(Resource.TITANIUM, (amount));

        player.game.log('${0} gained ${1} MC', (b) => b.player(player).number(player.getTitaniumValue() * amount));
        return undefined;
      },
      1,
      availableTitanium,
    );
  }
}
