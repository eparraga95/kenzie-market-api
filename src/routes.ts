import { Router } from "express"


// controllers
import userCreateController from "./controllers/user/userCreate.controller"
import userLoginController from "./controllers/user/userLogin.controller"
import userByIdController from "./controllers/user/userById.controller"
import userListController from "./controllers/user/userList.controller"

// middlewares and schemas
import { validateNewUser } from "./middlewares/user/validateUserCreate.middleware"
import userCreateSchema from "./schemas/user/userCreate.schema"

import { validateLogin } from "./middlewares/user/validateUserLogin.middleware"
import userLoginSchema from "./schemas/user/userLogin.schema"

import { userAuth } from "./middlewares/user/userAuth.middleware"
import { userIsAdmin } from "./middlewares/user/userIsAdm.middleware"

const router = Router()

// controllers instances
const userCreateControl = new userCreateController()
const userLoginControl = new userLoginController()
const userByIdControl = new userByIdController()
const userListControl = new userListController()

// routing
router.post('/user', [validateNewUser(userCreateSchema)], userCreateControl.handle)
router.post('/login', [validateLogin(userLoginSchema)], userLoginControl.handle)
router.get('/user/:id', [userAuth], userByIdControl.handle)
router.get('/user', [userIsAdmin], userListControl.handle)

export default router