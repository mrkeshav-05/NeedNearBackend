import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
// import {
//   registerCustomer,
//   loginCustomer
//   } from '../controllers/customer/customer.controller.js';

import { registerCustomer } from '../controllers/customer/registerCustomer.controller.js';
import { loginCustomer } from '../controllers/customer/loginCustomer.controller.js';
import { logoutCustomer } from '../controllers/customer/logoutCustomer.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(
  upload.fields([
    {
      name: "profilePicture",
      maxCount: 1,
    }
  ]),
  registerCustomer
);

router.route('/login').post(loginCustomer);
router.route('/logout').post(verifyJWT, logoutCustomer);

export default router;