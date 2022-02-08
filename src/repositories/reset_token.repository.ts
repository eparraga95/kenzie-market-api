import { EntityRepository, Repository } from "typeorm";
import { ResetToken } from "../entities/reset_token.entity";

@EntityRepository(ResetToken)
class ResetTokenRepository extends Repository<ResetToken> {}

export { ResetTokenRepository }