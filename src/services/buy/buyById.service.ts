import { BuyRepository } from "../../repositories/buy.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error";

class buyByIdService {

    async execute(buy_id: string) {

        const buyRepository = getCustomRepository(BuyRepository)

        const buy = await buyRepository.findOne({ id: buy_id })

        if (!buy) {
            throw new ErrorHandler(404, "Buy not found.")
        }

        return buy
    }
}

export default buyByIdService