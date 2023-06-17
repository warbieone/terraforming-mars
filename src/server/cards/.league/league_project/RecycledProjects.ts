import {IProjectCard} from '../../IProjectCard';
import {Tag} from '../../../../common/cards/Tag';
import {CardType} from '../../../../common/cards/CardType';
import {CardName} from '../../../../common/cards/CardName';
import {Card} from '../../Card';
import {CardRenderer} from '../../render/CardRenderer';
import {CardRequirements} from '../../CardRequirements';
import {played} from '../../Options';
import {IPlayer} from '../../../IPlayer';


export class RecycledProjects extends Card implements IProjectCard {
  // author: ThreadPacifist
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.RECYCLED_PROJECTS,
      cost: 12,
      tags: [Tag.SCIENCE],

      victoryPoints: 1,

      requirements: CardRequirements.builder((b) => b.tag(Tag.SCIENCE, 4)),
      metadata: {
        cardNumber: 'L304',
        renderData: CardRenderer.builder((b) => {
          b.effect(undefined, (eb) => {
            eb.building(1,{played}).slash().space({played}).startEffect.steel(1);
          }).br;
        }),
        description: 'After playing a building or space tag, receive a steel resource.',
      },
    });
  }

  public onCardPlayed(player: IPlayer, card: IProjectCard): void {
    const numBuildingTags = card.tags.filter((tag) => tag === Tag.BUILDING).length;
    const numSpaceTags = card.tags.filter((tag) => tag === Tag.SPACE).length;
    if (numBuildingTags > 0 || numSpaceTags > 0) player.steel += numBuildingTags + numSpaceTags;
    return undefined;
  }

}
