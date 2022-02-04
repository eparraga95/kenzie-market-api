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
import productByIdController from "./controllers/product/productById.controller"

// cart
import cartAddProdController from "./controllers/cart/cartAddProd.controller"
import cartByUserIdController from "./controllers/cart/cartByUserId.controller"
import cartListController from "./controllers/cart/cartList.controller"

// middlewares and schemas
// =======================

// user
import { validateNewUser } from "./middlewares/user/validateUserCreate"
import userCreateSchema from "./schemas/user/userCreate.schema"

import { validateLogin } from "./middlewares/user/validateLogin.middleware"
import userLoginSchema from "./schemas/user/userLogin.schema"

import { userAuth } from "./middlewares/user/userAuth.middleware"
import { userIsAdmin } from "./middlewares/user/userIsAdmin.middleware"
import { userIsLoggedIn } from "./middlewares/user/userIsLoggedIn.middleware"

// product
import { validateNewProduct } from "./middlewares/product/validateProdCreate.middleware"
import productCreateSchema from "./schemas/product/productCreate.schema"

// cart
import { validateAddProd } from "./middlewares/cart/validateProductAdd.middleware"
import productAddSchema from "./schemas/cart/productAdd.schema"

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
const productByIdControl = new productByIdController()

// cart
const cartAddProdControl = new cartAddProdController()
const cartByUserIdControl = new cartByUserIdController()
const cartListControl = new cartListController()




// routing
// =======================

// user
router.post('/user', [validateNewUser(userCreateSchema)], userCreateControl.handle)
router.post('/login', [validateLogin(userLoginSchema)], userLoginControl.handle)
router.get('/user/:user_id', [userAuth], userByIdControl.handle)
router.get('/user', [userIsAdmin], userListControl.handle)

// product
router.post('/product', [userIsAdmin, validateNewProduct(productCreateSchema)], productCreateControl.handle)
router.get('/product', [userIsLoggedIn], productListControl.handle)
router.get('/product/:product_id', [userIsLoggedIn], productByIdControl.handle)

// cart
router.post('/cart', [userIsLoggedIn, validateAddProd(productAddSchema)], cartAddProdControl.handle)
router.get('/cart/:user_id', [userAuth], cartByUserIdControl.handle)
router.get('/cart', [userIsAdmin], cartListControl.handle)

export default router