import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import {
  registerCustomer,
  loginCustomer
  } from '../controllers/customer.controller.js';

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


export default router;