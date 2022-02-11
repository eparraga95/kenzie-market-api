import { BuyRepository } from "../../repositories/buy.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error";

class buyByIdService {

    async execute(buy_id: string) {

        const buyRepository = getCustomRepository(BuyRepository)

        const uuidRegex = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/gm

        const isValid = uuidRegex.test(buy_id)

        if (!isValid) {
            throw new ErrorHandler(400, "Invalid buy id")
        }

        const buy = await buyRepository.findOne({ id: buy_id })

        if (!buy) {
            throw new ErrorHandler(404, "Buy not found")
        }

        return buy
    }
}

export default buyByIdService