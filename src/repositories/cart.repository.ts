import { EntityRepository, Repository } from "typeorm";
import { Cart } from "../entities";

@EntityRepository(Cart)
class CartRepository extends Repository<Cart> {}

export { CartRepository }