import {CardName} from '../../../common/cards/CardName';
import {Player} from '../../Player';
import {CardType} from '../../../common/cards/CardType';
import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {CardRenderer} from '../render/CardRenderer';
import {CardRequirements} from '../requirements/CardRequirements';
import {Card} from '../Card';
import {all, digit} from '../Options';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';
import {newMessage} from '../../logs/MessageBuilder';
import {AndOptions} from '../../inputs/AndOptions';
import {SelectAmount} from '../../inputs/SelectAmount';
import {Resource} from '../../../common/Resource';
import {sum} from '../../../common/utils/utils';
import {Message} from '../../../common/logs/Message';

export class RoadPiracy extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.ROAD_PIRACY,
      type: CardType.EVENT,
      tags: [Tag.MOON],
      cost: 10,
      requirements: CardRequirements.builder((b) => b.logisticRate(3)),

      metadata: {
        description: 'Requires 3 logistic rate. ' +
          'Steal up to 6 steel or 4 titanium from other players. ' +
          '(Resources may be stolen from more than 1 opponent.)',
        cardNumber: 'M54',
        renderData: CardRenderer.builder((b) => {
          b.text('STEAL').steel(6, {all}).slash().titanium(4, {all, digit}).asterix();
        }),
      },
    });
  }

  private generateOption(player: Player, resource: Resource, title: Message, limit: number) {
    const selectAmounts: Array<SelectAmount> = [];
    const ledger: Map<Player, number> = new Map();
    for (const opponent of player.game.getPlayers()) {
      if (opponent === player) {
        continue;
      }
      if (opponent.getResource(resource) > 0) {
        const cb = (amount: number) => {
          ledger.set(opponent, amount);
          return undefined;
        };
        const selectAmount =
          new SelectAmount(
            newMessage('${0}', (b) => b.player(opponent)),
            undefined,
            cb,
            0,
            opponent.getResource(resource));
        selectAmounts.push(selectAmount);
      }
    }
    if (selectAmounts.length === 0) {
      return undefined;
    }

    const cb = () => {
      const total = sum(Array.from(ledger.values()));
      if (total > limit) {
        // throw new Error(newMessage('You may only steal up to ${0} ${1} from all players', (b) => b.number(limit).string(resource)));
        ledger.clear();
        throw new Error(`You may only steal up to ${limit} ${resource} from all players`);
      }
      for (const entry of ledger) {
        entry[0].stealResource(resource, entry[1], player);
      }
      return undefined;
    };
    const option = new AndOptions(cb, ...selectAmounts);
    option.title = title;
    return option;
  }

  public override bespokePlay(player: Player) {
    const game = player.game;
    const stealSteel = newMessage('Steal ${0} steel', (b) => b.number(6));
    const stealTitanium = newMessage('Steal ${0} titanium', (b) => b.number(4));
    if (game.isSoloMode()) {
      return new OrOptions(
        new SelectOption(stealSteel, 'Steal steel', () => {
          player.steel += 6;
          return undefined;
        }),
        new SelectOption(stealTitanium, 'Steal titanium', () => {
          player.titanium += 4;
          return undefined;
        }),
      );
    }

    const options = new OrOptions();

    const steelOption = this.generateOption(player, Resource.STEEL, stealSteel, 6);
    if (steelOption !== undefined) {
      options.options.push(steelOption);
    }

    const titaniumOption = this.generateOption(player, Resource.TITANIUM, stealTitanium, 4);
    if (titaniumOption !== undefined) {
      options.options.push(titaniumOption);
    }

    if (options.options.length === 0) {
      return undefined;
    }

    options.options.push(new SelectOption('Do not steal', 'Confirm', () => {
      return undefined;
    }));
    return options;
  }
}
