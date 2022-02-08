import { Router } from "express"

// controllers
// =======================

// user
import userCreateController from "./controllers/user/userCreate.controller"
import userLoginController from "./controllers/user/userLogin.controller"
import userByIdController from "./controllers/user/userById.controller"
import userListController from "./controllers/user/userList.controller"
import userRecoverPwdController from "./controllers/user/userRecoverPwd.controller"
import userChangePwdController from "./controllers/user/userChangePwd.controller"

// product
import productCreateController from "./controllers/product/productCreate.controller"
import productListController from "./controllers/product/productList.controller"
import productByIdController from "./controllers/product/productById.controller"

// cart
import cartAddProdController from "./controllers/cart/cartAddProd.controller"
import cartByUserIdController from "./controllers/cart/cartByUserId.controller"
import cartListController from "./controllers/cart/cartList.controller"
import cartDelProdController from "./controllers/cart/cartDelProd.controller"

// buy
import buyCreateController from "./controllers/buy/buyCreate.controller"
import buyByIdController from "./controllers/buy/buyById.controller"
import buyListController from "./controllers/buy/buyList.controller"

// mail
import sendMailController from "./controllers/mail/sendMail.controller"

// middlewares and schemas
// =======================

// user
import { validateNewUser } from "./middlewares/user/validateUserCreate"
import userCreateSchema from "./schemas/user/userCreate.schema"

import { validateLogin } from "./middlewares/user/validateLogin.middleware"
import userLoginSchema from "./schemas/user/userLogin.schema"

import { validateRecover } from "./middlewares/user/validateRecover.middleware"
import userRecoverSchema from "./schemas/user/userRecoverPwd.schema"

import { validateChangePwd } from "./middlewares/user/validateChangePwd.middleware"
import userChangePwdSchema from "./schemas/user/userChangePwd.schema"

import { userAuth } from "./middlewares/user/userAuth.middleware"
import { userIsAdmin } from "./middlewares/user/userIsAdmin.middleware"
import { userIsLoggedIn } from "./middlewares/user/userIsLoggedIn.middleware"

// product
import { validateNewProduct } from "./middlewares/product/validateProdCreate.middleware"
import productCreateSchema from "./schemas/product/productCreate.schema"

// cart
import { validateAddProd } from "./middlewares/cart/validateProductAdd.middleware"
import productAddSchema from "./schemas/cart/productAdd.schema"

// mail
import { validateNewEmail } from "./middlewares/mail/validateMail.middleware"
import mailSchema from "./schemas/mail/mail.schema"

const router = Router()

// controllers instances
// =======================

// user
const userCreateControl = new userCreateController()
const userLoginControl = new userLoginController()
const userByIdControl = new userByIdController()
const userListControl = new userListController()
const userRecoverPwdControl = new userRecoverPwdController()
const userChangePwdControl = new userChangePwdController()

// product
const productCreateControl = new productCreateController()
const productListControl = new productListController()
const productByIdControl = new productByIdController()

// cart
const cartAddProdControl = new cartAddProdController()
const cartByUserIdControl = new cartByUserIdController()
const cartListControl = new cartListController()
const cartDelProdControl = new cartDelProdController()

// buy
const buyCreateControl = new buyCreateController()
const buyByIdControl = new buyByIdController()
const buyListControl = new buyListController()

//mail
const sendMailControl = new sendMailController()

// routing
// =======================

// user
router.post('/user', [validateNewUser(userCreateSchema)], userCreateControl.handle)
router.post('/login', [validateLogin(userLoginSchema)], userLoginControl.handle)
router.post('/recover', [validateRecover(userRecoverSchema)], userRecoverPwdControl.handle)
router.post('/change_password', [validateChangePwd(userChangePwdSchema)], userChangePwdControl.handle)
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
router.delete('/cart/:product_id', [userIsLoggedIn], cartDelProdControl.handle)

// buy
router.post('/buy', [userIsLoggedIn], buyCreateControl.handle)
router.get('/buy/:buy_id', [userIsLoggedIn], buyByIdControl.handle)
router.get('/buy', [userIsAdmin], buyListControl.handle)

// mail
router.post('/email', [validateNewEmail(mailSchema), userIsAdmin], sendMailControl.handle)

export default router