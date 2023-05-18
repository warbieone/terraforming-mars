import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {all, played} from '../Options';
import {Player} from '../../Player';
import {Resource} from '../../../common/Resource';


export class TollStation extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.TOLL_STATION,
      tags: [Tag.SPACE],
      cost: 18,

/*       behavior: {
        production: {megacredits: {tag: Tag.SPACE, others: true}},
      }, */

      metadata: {
        cardNumber: '099',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.megacredits(1).slash().space({played, all}).asterix();
          });
        }),
        description: 'Increase your M€ production 1 step for each space tag of the OPPONENT who has the most space tags.',
      },
    });
  }
  
  public override play(player: Player) {
    if (player.game.isSoloMode()) {
      return undefined;
    }

    const opponentSpaceTagCounts = player.game.getPlayers()
      .filter((aPlayer) => aPlayer !== player)
      .map((opponent) => opponent.tags.count(Tag.SPACE, 'raw'));
    const maxOpponentSpaceTagCount = Math.max(...opponentSpaceTagCounts);
    player.production.add(Resource.MEGACREDITS, maxOpponentSpaceTagCount, {log: true});
    return undefined;
  }
}
