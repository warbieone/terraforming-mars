import {Player} from '../../Player';
import {RequirementType} from '../../../common/cards/RequirementType';
import { InequalityRequirement } from './InequalityRequirement';

export class GenerationRequirement extends InequalityRequirement {
  public readonly type = RequirementType.GENERATION;
  public override getScore(player: Player): number {
    return player.game.getGeneration();
  }
}
