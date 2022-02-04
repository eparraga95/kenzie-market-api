import { Router } from "express"

// controllers
// =======================

// user
import userCreateController from "./controllers/user/userCreate.controller"
import userLoginController from "./controllers/user/userLogin.controller"
import userByIdController from "./controllers/user/userById.controller"
import userListController from "./controllers/user/userList.controller"

// product
import productCreateController from "./controllers/product/productCreate.controller"
import productListController from "./controllers/product/productList.controller"

// middlewares and schemas
// =======================

// user
import { validateNewUser } from "./middlewares/user/validateUserCreate"
import userCreateSchema from "./schemas/user/userCreate.schema"

import { validateLogin } from "./middlewares/user/validateLogin.middleware"
import userLoginSchema from "./schemas/user/userLogin.schema"

import { userAuth } from "./middlewares/user/userAuth.middleware"
import { userIsAdmin } from "./middlewares/user/userIsAdmin.middleware"

// product
import { validateNewProduct } from "./middlewares/product/validateProdCreate.middleware"
import productCreateSchema from "./schemas/product/productCreate.schema"


const router = Router()

// controllers instances
// =======================

// user
const userCreateControl = new userCreateController()
const userLoginControl = new userLoginController()
const userByIdControl = new userByIdController()
const userListControl = new userListController()

// product
const productCreateControl = new productCreateController()
const productListControl = new productListController()




// routing
// =======================

// user
router.post('/user', [validateNewUser(userCreateSchema)], userCreateControl.handle)
router.post('/login', [validateLogin(userLoginSchema)], userLoginControl.handle)
router.get('/user/:id', [userAuth], userByIdControl.handle)
router.get('/user', [userIsAdmin], userListControl.handle)

// product
router.post('/product', [userIsAdmin, validateNewProduct(productCreateSchema)], productCreateControl.handle)
router.get('/product', [userAuth], productListControl.handle)


export default router