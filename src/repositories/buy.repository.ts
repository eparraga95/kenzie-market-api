import { EntityRepository, Repository } from "typeorm";
import { Buy } from "../entities";

@EntityRepository(Buy)
class BuyRepository extends Repository<Buy> {}

export { BuyRepository }