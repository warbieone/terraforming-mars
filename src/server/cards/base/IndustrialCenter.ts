import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {ActionCard} from '../ActionCard';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {TileType} from '../../../common/TileType';
import {SelectSpace} from '../../inputs/SelectSpace';
import {ISpace} from '../../boards/ISpace';
import {CardName} from '../../../common/cards/CardName';
import {Board} from '../../boards/Board';
import {AdjacencyBonus} from '../../ares/AdjacencyBonus';
import {CardRenderer} from '../render/CardRenderer';

export class IndustrialCenter extends ActionCard implements IProjectCard {
  constructor(
    name = CardName.INDUSTRIAL_CENTER,
    adjacencyBonus: AdjacencyBonus | undefined = undefined,
    metadata = {
      cardNumber: '123',
      renderData: CardRenderer.builder((b) => {
        b.action('Spend 6 M€ to increase your steel production 1 step.', (eb) => {
          eb.megacredits(6).startAction.production((pb) => pb.steel(1));
        }).br;
        b.tile(TileType.INDUSTRIAL_CENTER, true, false).asterix();
      }),
      description: 'Place this tile adjacent to a city tile.',
    }) {
    super({
      type: CardType.ACTIVE,
      name,
      tags: [Tag.BUILDING],
      cost: 4,
      adjacencyBonus,

      action: {
        spend: {
          megacredits: 6,
        },
        production: {steel: 1},
      },
      metadata,
    });
  }

  private getAvailableSpaces(player: IPlayer): Array<ISpace> {
    return player.game.board.getAvailableSpacesOnLand(player)
      .filter((space) => player.game.board.getAdjacentSpaces(space).some((adjacentSpace) => Board.isCitySpace(adjacentSpace)));
  }
  public override bespokeCanPlay(player: IPlayer): boolean {
    return this.getAvailableSpaces(player).length > 0;
  }
  public override bespokePlay(player: IPlayer) {
    return new SelectSpace('Select space adjacent to a city tile', this.getAvailableSpaces(player), (space: ISpace) => {
      player.game.addTile(player, space, {tileType: TileType.INDUSTRIAL_CENTER});
      space.adjacency = this.adjacencyBonus;
      return undefined;
    });
  }
}
