import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities"

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {}

export { ProductRepository }