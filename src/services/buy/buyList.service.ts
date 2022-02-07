import { BuyRepository } from "../../repositories/buy.repository";
import { getCustomRepository } from "typeorm";

class buyListService {

    async execute() {

        const buyRepository = getCustomRepository(BuyRepository)
    
        const buy_list = await buyRepository.find()

        return buy_list
    
    }
}

export default buyListService