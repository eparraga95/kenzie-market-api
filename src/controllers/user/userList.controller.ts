
import { Request, Response } from "express"
import { ISafeUser } from "../../interfaces/user/user.interface"
import userListService from "../../services/user/userList.service"

class userListController {

    async handle(req: Request, res: Response) {

        const userList = new userListService()

        const users: ISafeUser[] = await userList.execute()

        users.map(user => delete user.password)

        return res.json(users)
    }
}

export default userListController